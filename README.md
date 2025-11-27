# Property Insights API

Express.js API for generating AI-powered property insights using Google Genkit AI.

## Features

- 🏠 AI-powered property insights generation
- Bearer token authentication
- ✅ Zod schema validation
- 🌐 CORS support
- 📝 TypeScript support

## Setup

### 1. Install Dependencies

```bash
npm install
```

Required environment variables:

- `PORT` - Server port (default: 3000)
- `GOOGLE_AI_API_KEY` - Your Google AI API key
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

### 3. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Live Demo

View the live application at: https://mervelhomes.web.app/properties/GRwxZeq5vLKoHqzTFeTB

You can try out the property insights feature with different properties on the live site.

## Project Documentation

- **Video Demo**: [Watch Demo](https://www.loom.com/share/97d16ceb45b549e8b3125bd5a6ed288e)
- **PowerPoint Slides**: [View Presentation](https://docs.google.com/presentation/d/1GP9ucwYidOXeqp-QGpUpiz3SuLbjt_hGQDOujhgV6_I/edit?usp=sharing)
- **Project Proposal**: [View Document](https://docs.google.com/document/d/1SQwAJDS0LHYA9G3QCMaYsA5GEQ4X11um7UEZI9aBUvE/edit?usp=sharing)

## API Endpoints

### POST /api/getInsight

Generate property insights using AI.

**Headers:**

```
Authorization: Bearer YOUR_AUTH_TOKEN
Content-Type: application/json
```

> **Note**: Replace `YOUR_AUTH_TOKEN` with a valid authentication token. The Bearer token is required for API authentication.

**Request Body:**

```json
{
  "property": {
    "id": "optional-id",
    "name": "Luxury 3BR Apartment",
    "address": "Kilimani, Nairobi",
    "price": 15000000,
    "area": 1500,
    "bedrooms": 3,
    "bathrooms": 2,
    "category": "apartment",
    "ammenities": ["Swimming Pool", "Gym", "Parking"],
    "nearby_places": ["Yaya Centre", "Junction Mall", "Nairobi Hospital"]
  }
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "property": {
      "id": "optional-id",
      "name": "Luxury 3BR Apartment"
    },
    "insights": {
      "title": "AI-generated compelling title",
      "description": "AI-generated description",
      "featuresAdvantages": "AI-generated features and advantages",
      "locationAdvantages": "AI-generated location advantages"
    }
  },
  "message": "Property insights generated successfully."
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Project Structure

```
src/
├── config/
│   ├── cors.ts          # CORS configuration
│   └── index.ts         # AI setup
├── models/
│   └── property.ts      # Property interface
├── routes/
│   └── insights.ts      # Insights API routes
├── services/
│   └── propertyInsights.ts  # AI flow logic
└── index.ts             # Express app entry point
```

## Usage Example

```typescript
import { setCorsHeaders } from "./config/cors";
import { AI } from "./config";
import { propertyInsightsFlow } from "./services/propertyInsights";

// In your route handler
const insights = await propertyInsightsFlow({
  property: propertyData,
});
```

Replace `YOUR_AUTH_TOKEN` with your actual authentication token:

```bash
curl -X POST http://localhost:3000/api/getInsight \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN
curl -X POST http://localhost:3000/api/getInsight \
  -H "Authorization: Bearer test_token" \
  -H "Content-Type: application/json" \
  -d '{
    "property": {
      "name": "Luxury 3BR Apartment in Kilimani",
      "address": "Kilimani, Nairobi",
      "price": 15000000,
      "area": 1500,
      "bedrooms": 3,
      "bathrooms": 2,
      "category": "apartment",
      "ammenities": ["Swimming Pool", "Gym", "Parking"],
      "nearby_places": ["Yaya Centre", "Junction Mall"]
    }
  }'
```

## License

ISC
