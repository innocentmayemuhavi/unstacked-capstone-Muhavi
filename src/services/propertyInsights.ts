import { AI } from '../config';
import { IProperty } from '../models/property';

// Define simplified property insights schema without decoration
const PropertyInsightsOnlySchema = AI.z.object({
    title: AI.z.string()
        .describe('Compelling property title - max 80 words, professional and catchy'),

    description: AI.z.string()
        .describe('Concise property description max 80 words, highlight key benefits and location'),

    featuresAdvantages: AI.z.string()
        .describe('Brief features and competitive advantages max 150 words, focus on what makes it superior'),

    locationAdvantages: AI.z.string()
        .describe(`Write one compelling 150-word paragraph about the property's location advantages. Include: (1) Specific distances and travel times to key amenities using real place names (e.g., "3km to City Mall", "15-minute drive to Moi International Airport"), (2) Nearby lifestyle and recreational opportunities with actual location names - be specific about activities like "morning runs at Karura Forest", "weekend hikes at Ngong Hills", "sunset views from Fort Jesus", "beach access at Nyali Beach", "shopping at Village Market", "dining at Carnivore Restaurant", (3) Community character and investment appeal. Use experiential, vivid language that helps buyers imagine their daily life. Always reference real, specific places in the property's actual Kenyan location (Nairobi, Mombasa, Kisumu, etc.). Write as one flowing paragraph without bullet points or line breaks.`)
});

// Define property insights generator flow
export const propertyInsightsFlow = AI.ai.defineFlow(
    {
        name: 'propertyInsightsFlow',
        outputSchema: PropertyInsightsOnlySchema,
    },
    async (input: { property: IProperty }) => {
        const { property: propertyData } = input;

        const prompt = `Generate CONCISE, PROFESSIONAL property insights for this Kenyan property. Keep responses SHORT and IMPACTFUL.

Property Data:
- Name: ${propertyData?.name || 'Not specified'}
- Location: ${propertyData?.address || 'Not specified'}
- Price: KSh ${propertyData?.price ? propertyData.price.toLocaleString() : 'Not specified'}
- Size: ${propertyData?.area || 'Not specified'} sqft | ${propertyData?.bedrooms || 'Not specified'}BR/${propertyData?.bathrooms || 'Not specified'}BA
- Features: ${propertyData?.ammenities?.slice(0, 5).join(', ') || 'Not specified'}
- Nearby: ${propertyData?.nearby_places?.slice(0, 5).join(', ') || 'Not specified'}

OUTPUT REQUIREMENTS - BE BRIEF & PROFESSIONAL:

1. TITLE (max 400 words):
   - Catchy, highlights key selling point
   - Include location or unique feature
   - Professional tone but more convincing

2. DESCRIPTION (max 400 words):
   - Concise overview
   - Emphasize location benefits and key features
   - Show competitive advantage
   - Create urgency

3. LOCATION ADVANTAGES (max 150-word paragraph):
   Write ONE compelling flowing paragraph about the property's location advantages. Include:
   - Specific distances and travel times to key amenities using real place names from ${propertyData?.nearby_places?.join(', ') || 'the area'}
   - Example format: "3km to [actual mall name]", "15-minute drive to [actual airport]"
   - Nearby lifestyle and recreational opportunities with actual location names
   - Be specific about activities: "morning runs at [actual park]", "weekend shopping at [actual mall]", "dining at [actual restaurants]"
   - Community character and investment appeal
   - Use experiential, vivid language that helps buyers imagine their daily life
   - Reference real, specific places based on the property location: ${propertyData?.address || 'Kenya'}
   - Write as ONE flowing paragraph without bullet points or line breaks

4. FEATURES & ADVANTAGES (max 400 words):
   - What makes it BETTER than competitors
   - Focus on value proposition
   - Highlight nearby amenities and unique features
   - Be specific and convincing

STYLE GUIDELINES:
✓ Professional and persuasive tone and words
✓ Short, punchy sentences 
✓ Professional but persuasive
✓ Focus on benefits, not just features
✓ Use numbers and specifics
✓ Avoid fluff and long explanations
✓ Make every word count`;

        const output = await AI.ai.generate({
            prompt,
            output: { schema: PropertyInsightsOnlySchema },
        });

        if (!output.output) throw new Error('Failed to generate property insights');

        return output.output;
    }
);

export const validateRequest = (body: any) => {
    const schema = AI.z.object({
        property: AI.z.object({
            id: AI.z.string().optional(),
            name: AI.z.string(),
            address: AI.z.string(),
            price: AI.z.number(),
            area: AI.z.number(),
            bedrooms: AI.z.number(),
            bathrooms: AI.z.number(),
            category: AI.z.string(),
            ammenities: AI.z.array(AI.z.string()).optional(),
            nearby_places: AI.z.array(AI.z.string()).optional()
        })
    });

    const result = schema.safeParse(body);
    if (!result.success) {
        throw new Error("Validation error: " + result.error.errors.map(e => e.message).join(', '));
    }
    return result.data;
};
