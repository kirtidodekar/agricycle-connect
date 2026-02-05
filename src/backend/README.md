# Agricycle Connect Backend

Backend API for Agricycle Connect with Grok AI image analysis integration.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Grok API key
   GROK_API_KEY=your_actual_grok_api_key_here
   ```

3. **Start the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
backend/
├── routes/          # API route handlers
├── server.js        # Main Express server
├── .env.example     # Environment variable template
├── .gitignore       # Git ignore rules
└── package.json     # Dependencies and scripts
```

## API Endpoints

### Image Analysis
- **POST** `/api/ai/analyze-image`
  - Upload an image file for agricultural waste analysis
  - Returns detailed analysis including waste type, quality, pricing, etc.

### Health Check
- **GET** `/api/health`
  - Check if the backend server is running

- **GET** `/api/ai/health`
  - Check Grok AI service status

## Integration with Frontend

The frontend automatically connects to `http://localhost:5000` for AI analysis. Make sure the backend is running before testing image analysis features.

## Response Format

```json
{
  "wasteType": "Rice Husk",
  "quality": "Good",
  "confidence": 94,
  "suggestedPrice": "₹4 - ₹6 per kg",
  "industries": ["Biomass Energy", "Composting", "Animal Feed"],
  "estimatedWeight": "~500 kg",
  "fileName": "waste-image.jpg",
  "fileSize": 123456,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "success": true
}
```

## Error Handling

The API includes comprehensive error handling with fallback responses when the Grok API is unavailable or returns errors.