@echo off
cd /d C:\Users\HP\Desktop\ridewise

echo Checking current status...
git status

echo.
echo Aborting any rebase...
git rebase --abort -q 2>nul

echo.
echo Pushing to GitHub...
git push origin Rishethavalli-kondi --force-with-lease

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Push successful!
    echo GitHub Branch: https://github.com/springboardmentor1000-del/RideWise-BikeDemandPrediction2/tree/Rishethavalli-kondi
) else (
    echo.
    echo ❌ Push failed. Try manual push...
    pause
)
