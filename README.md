# BiteScore

A comprehensive food analysis application that combines computer vision and natural language processing to classify food images and analyze sentiment from food reviews.

## 🎯 Project Overview

BiteScore is a full-stack application that provides:
- **Food Image Classification**: Upload food images to get classification results
- **Sentiment Analysis**: Analyze sentiment from food reviews and comments
- **Interactive Dashboard**: View analysis history and results
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🏗️ Architecture

```
BiteScore/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/          # Utilities and helpers
│   └── public/           # Static assets
└── backend/           # Python FastAPI backend
    └── app/
        ├── main.py           # FastAPI application entry point
        ├── model_loader.py   # ML model loading utilities
        ├── predict_food.py   # Food classification logic
        ├── sentimemt_predict.py  # Sentiment analysis logic
        └── model/           # Trained ML models
```

## 🛠️ Technologies Used

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Backend
- **Python** with FastAPI
- **TensorFlow/Keras** for machine learning models
- **Food Classification Model** (5-class classifier)
- **Sentiment Analysis Model** with tokenizer

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Python 3.8 or higher
- pip (Python package manager)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`

## 📱 Features

### Image Upload Component
- Drag & drop functionality
- File selection via button
- Image preview
- Support for various image formats

### Food Classification
- 5-class food classification model
- Real-time image processing
- Confidence scores

### Sentiment Analysis
- Text-based sentiment prediction
- Pre-trained model with tokenizer
- Support for food review analysis

### Dashboard
- Analysis history
- Results visualization
- Interactive UI components

## 🔧 Development

### Frontend Development
The frontend uses modern React patterns with TypeScript. Key components include:

- [`ImageUpload`](frontend/src/components/ImageUpload.tsx) - Handles image upload functionality
- [`AnalysisResult`](frontend/src/components/AnalysisResult.tsx) - Displays analysis results
- [`Dashboard`](frontend/src/pages/Dashboard.tsx) - Main dashboard interface

### Backend Development
The backend provides RESTful APIs for:

- Food image classification via [`predict_food.py`](backend/app/predict_food.py)
- Sentiment analysis via [`sentimemt_predict.py`](backend/app/sentimemt_predict.py)
- Model management via [`model_loader.py`](backend/app/model_loader.py)

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for consistent styling
- Component-based architecture

## 📁 Project Structure

### Key Files
- [`frontend/src/App.tsx`](frontend/src/App.tsx) - Main React application
- [`backend/app/main.py`](backend/app/main.py) - FastAPI application entry point
- [`frontend/package.json`](frontend/package.json) - Frontend dependencies and scripts
- [`backend/requirements.txt`](backend/requirements.txt) - Python dependencies

### Configuration Files
- [`frontend/vite.config.ts`](frontend/vite.config.ts) - Vite configuration
- [`frontend/tailwind.config.ts`](frontend/tailwind.config.ts) - Tailwind CSS configuration
- [`frontend/tsconfig.json`](frontend/tsconfig.json) - TypeScript configuration

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to various platforms:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Deployment
The backend can be deployed using:

```bash
# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of an academic assignment for CoE Y.3 T.1 240-318.

## 🎓 Academic Context

This project is developed as part of the Computer Engineering curriculum, demonstrating:
- Full-stack web development
- Machine learning integration
- Modern frontend frameworks
- API development with Python
- UI/UX design principles

---

**Note**: Make sure both frontend and backend servers are running for full functionality.