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

### 2. Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

- `PORT` - Server port (default: 3000)
- `GOOGLE_AI_API_KEY` - Your Google AI API key
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### POST /api/getInsight

Generate property insights using AI.

**Headers:**

```
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

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

## License

ISC
