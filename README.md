# 🚴 RideWise: Intelligent Bike Demand Prediction System

RideWise is a full-stack machine learning application that predicts bike-sharing demand based on weather conditions, temporal patterns, and environmental factors. The system combines a FastAPI backend with trained ML models and a modern Next.js frontend to provide real-time predictions and actionable insights for bike-sharing operations.

## 📋 Overview

### Backend (FastAPI + Machine Learning)
The backend serves as a RESTful API powered by FastAPI, utilizing pre-trained machine learning models (`.pkl` files) to predict bike demand at both hourly and daily granularities. Key features include:

- **Prediction Engine**: Uses XGBoost/LightGBM models trained on historical bike-sharing data
- **Model Files**: 
  - `hour_model.pkl` - Hourly demand predictions
  - `day_model.pkl` - Daily demand predictions
  - `hour_features.pkl` & `day_features.pkl` - Feature engineering pipelines
- **API Endpoints**: RESTful endpoints for demand forecasting based on weather and temporal inputs
- **CORS-Enabled**: Configured for seamless frontend-backend communication
- **Git LFS Integration**: Large model files managed via Git Large File Storage

### Frontend (Next.js + TypeScript)
The frontend provides an intuitive user interface built with Next.js 16, React 19, and modern UI components. Features include:

- **Interactive Prediction Interface**: Input weather and time parameters to get demand forecasts
- **Data Visualization**: Charts and graphs powered by Recharts for insights analysis
- **Responsive Design**: Tailwind CSS with Radix UI components for a polished user experience
- **Multiple Pages**:
  - Prediction dashboard
  - Historical insights
  - AI assistant for recommendations
  - User authentication (login/welcome)

## 📁 Repository Structure

```
ridewise/
├── backend/                    # FastAPI ML prediction service
│   ├── main.py                # Core FastAPI application
│   ├── app.py                 # Server entry point
│   ├── hour_model.pkl         # Hourly prediction model (Git LFS)
│   ├── day_model.pkl          # Daily prediction model (Git LFS)
│   ├── hour_features.pkl      # Feature engineering pipeline (Git LFS)
│   ├── day_features.pkl       # Feature engineering pipeline (Git LFS)
│   ├── requirements.txt       # Python dependencies
│   ├── render.yaml            # Deployment configuration for Render
│   └── runtime.txt            # Python version specification
│
├── frontend/                   # Next.js user interface
│   ├── app/                   # Next.js 16 App Router pages
│   │   ├── predict/           # Demand prediction interface
│   │   ├── insights/          # Data insights and analytics
│   │   ├── assistant/         # AI assistant page
│   │   ├── login/             # Authentication
│   │   └── api/               # API route handlers
│   ├── components/            # React components
│   │   └── ui/                # Reusable UI components (Radix + shadcn)
│   ├── lib/                   # Utilities and API clients
│   ├── package.json           # Node.js dependencies
│   └── next.config.mjs        # Next.js configuration
│
├── data/                       # Training datasets and raw data
├── notebooks/                  # Jupyter notebooks for model development
├── docs/                       # Comprehensive deployment guides
│   ├── DEPLOYMENT_GUIDE.md
│   ├── QUICK_START.md
│   ├── FRONTEND_BACKEND_CONNECTION.md
│   └── ...
│
├── requirements.txt            # Root-level Python dependencies
├── README.md                   # This file
└── LICENSE                     # Project license
```

## 🚀 Local Development Setup

### Prerequisites
- **Python 3.9+** (for backend)
- **Node.js 18+** and **npm/pnpm** (for frontend)
- **Git LFS** installed (`git lfs install`)

### Backend Setup

1. **Navigate to backend directory:**
	```bash
	cd backend
	```

2. **Install Python dependencies:**
	```bash
	pip install -r requirements.txt
	```

3. **Run the FastAPI server:**
	```bash
	python main.py
	```
   
	The API will be available at **http://localhost:8000**
   
	- API Documentation: http://localhost:8000/docs
	- Health Check: http://localhost:8000/

### Frontend Setup

1. **Navigate to frontend directory:**
	```bash
	cd frontend
	```

2. **Install Node.js dependencies:**
	```bash
	npm install
	# or
	pnpm install
	```

3. **Run the development server:**
	```bash
	npm run dev
	# or
	pnpm dev
	```
   
	The frontend will be available at **http://localhost:3000**

### Running Both Services

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then visit **http://localhost:3000** in your browser.

## 🌐 Live Deployment Links

- **Frontend**: `<TO BE ADDED AFTER DEPLOYMENT>`
- **Backend API**: `<TO BE ADDED AFTER DEPLOYMENT>`

> Deployment guides and checklists are available in the `/docs` folder.

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI
- **ML Libraries**: scikit-learn, XGBoost, LightGBM
- **Data Processing**: Pandas, NumPy
- **Model Serialization**: Joblib, Pickle
- **Server**: Uvicorn (ASGI)

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation

## 📊 Features

### Prediction Capabilities
- **Hourly Demand Forecasting**: Predict bike demand for specific hours
- **Daily Demand Forecasting**: Aggregate daily demand predictions
- **Weather Integration**: Factor in temperature, humidity, wind speed, and weather conditions
- **Seasonal Patterns**: Account for seasonal trends and holidays

### User Interface
- **Interactive Forms**: Easy-to-use prediction input forms
- **Real-time Results**: Instant demand predictions with visual feedback
- **Historical Insights**: View trends and patterns in historical data
- **AI Assistant**: Get recommendations and insights powered by AI
- **Responsive Design**: Optimized for desktop and mobile devices

## 📚 Documentation

Detailed documentation is available in the `/docs` folder:

- **[QUICK_START.md](docs/QUICK_START.md)** - Fast setup guide
- **[DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[FRONTEND_BACKEND_CONNECTION.md](docs/FRONTEND_BACKEND_CONNECTION.md)** - Integration details
- **[GEMINI_API_SETUP.md](docs/GEMINI_API_SETUP.md)** - AI assistant configuration

## 🔒 Git LFS

This project uses Git Large File Storage (Git LFS) to manage large model files (`.pkl`). Ensure Git LFS is installed before cloning:

```bash
git lfs install
git clone <repository-url>
cd ridewise
git lfs pull
```

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 👥 Contributing

This project was developed as part of an internship program. For questions or contributions, please refer to the project documentation.

---

**RideWise** - Making bike-sharing operations smarter through intelligent demand prediction.
