import dotenv from 'dotenv';
dotenv.config();

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required');
}

console.log('API Key loaded:', apiKey ? '✓ Present' : '✗ Missing');

// Initialize Genkit AI
const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: googleAI.model('gemini-2.5-flash', {
        temperature: 0.8,
    }),
});

export const AI = {
    ai,
    z,
};
