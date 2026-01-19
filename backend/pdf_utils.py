import os
from typing import Dict, List, Optional, Tuple

from fastapi import UploadFile


def extract_text_from_pdf(file: UploadFile) -> str:
    """
    Extract readable text from a PDF UploadFile.

    Tries PyPDF2 first. If unavailable or extraction fails, returns an empty string.
    """
    try:
        import PyPDF2  # type: ignore
    except Exception:
        return ""

    try:
        # Read bytes from UploadFile
        file_bytes = file.file.read()
        # Create a PDF reader from bytes
        from io import BytesIO

        reader = PyPDF2.PdfReader(BytesIO(file_bytes))
        texts: List[str] = []
        for page in reader.pages:
            try:
                txt = page.extract_text() or ""
                if txt:
                    texts.append(txt)
            except Exception:
                continue
        return "\n\n".join(texts).strip()
    except Exception:
        return ""


def _build_gemini_payload(text: str, mode: str) -> Tuple[str, Dict]:
    """
    Build strict JSON instruction and payload for Gemini generateContent.
    mode: "day" or "hour"
    """
    assert mode in {"day", "hour"}

    required_keys_day = [
        "season",
        "month",
        "day_of_week",
        "temperature",
        "humidity",
        "wind_speed",
        "weather",
        "holiday",
        "working_day",
    ]
    required_keys_hour = required_keys_day + ["hour"]

    expected_keys = required_keys_hour if mode == "hour" else required_keys_day

    system_instruction = (
        "You are an extractor for bike demand features from PDF text. "
        "Return ONLY a single valid JSON object. No prose, no markdown, no code fences. "
        "Keys must be: " + ", ".join(expected_keys) + ". "
        "If a parameter is missing and cannot be confidently inferred, set it to null. "
        "Constraints: \n"
        "- season: one of spring, summer, fall, winter (string)\n"
        "- month: 1-12 (integer)\n"
        "- day_of_week: 0-6 where 0=Sunday (integer)\n"
        "- temperature: Celsius (number) or null\n"
        "- humidity: percentage 0-100 (number) or null\n"
        "- wind_speed: km/h (number) or null\n"
        "- weather: one of clear, cloudy, rain, storm (string)\n"
        "- holiday: 0 or 1 (integer)\n"
        "- working_day: 0 or 1 (integer)\n"
        + ("- hour: 0-23 (integer) or null\n" if mode == "hour" else "")
    )

    user_prompt = (
        "Extract the features from the following text and return ONLY a JSON object with the required keys.\n\n"
        f"TEXT:\n{text}"
    )

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": system_instruction + "\n\n" + user_prompt}
                ],
            }
        ],
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 512,
        },
    }

    return ("gemini-2.5-flash", payload)


async def call_gemini_for_features(text: str, mode: str) -> Dict:
    """
    Call Gemini generateContent API and parse JSON response safely.
    Returns a dict with keys for mode and a list of missing_fields.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {"error": "Missing GEMINI_API_KEY", "features": {}, "missing_fields": []}

    model, payload = _build_gemini_payload(text, mode)
    import json
    import httpx

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            resp = await client.post(url, json=payload)
        if resp.status_code != 200:
            return {"error": f"Gemini API error: {resp.status_code} {resp.text}", "features": {}, "missing_fields": []}
        data = resp.json()
    except Exception as e:
        return {"error": f"Gemini request failed: {e}", "features": {}, "missing_fields": []}

    # Extract text parts
    try:
        parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
        combined = "\n".join([p.get("text", "") for p in parts if isinstance(p, dict)])
    except Exception:
        combined = ""

    # The model should return a pure JSON string. Attempt to parse.
    parsed: Dict = {}
    if combined:
        try:
            parsed = json.loads(combined)
        except Exception:
            # Try to find JSON substring heuristically
            import re
            m = re.search(r"\{[\s\S]*\}", combined)
            if m:
                try:
                    parsed = json.loads(m.group(0))
                except Exception:
                    parsed = {}

    # Normalize keys
    keys_day = [
        "season",
        "month",
        "day_of_week",
        "temperature",
        "humidity",
        "wind_speed",
        "weather",
        "holiday",
        "working_day",
    ]
    keys_hour = keys_day + ["hour"]
    expected = keys_hour if mode == "hour" else keys_day

    features: Dict = {k: parsed.get(k, None) for k in expected}
    missing = [k for k, v in features.items() if v is None]

    return {"features": features, "missing_fields": missing}
