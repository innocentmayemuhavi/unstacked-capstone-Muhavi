import { Router, Request, Response } from 'express';
import { setCorsHeaders } from '../config/cors';
import { propertyInsightsFlow, validateRequest } from '../services/propertyInsights';
import { IProperty } from '../models/property';

const router = Router();

router.post('/getInsight', async (req: Request, res: Response) => {
    setCorsHeaders(res);

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).send({
                status: "error",
                message: "Missing or invalid access token",
            });
            return;
        }

        const { property } = validateRequest(req.body);

        // Run the property insights flow with property data from API
        const insights = await propertyInsightsFlow({ property: property as IProperty });

        res.status(200).send({
            status: "success",
            data: {
                property: {
                    id: property.id,
                    name: property.name,
                },
                insights: insights,
            },
            message: "Property insights generated successfully.",
        });

    } catch (error: any) {
        console.error("Property insights error:", error);
        res.status(500).send({
            status: "error",
            message: error.message || "Failed to generate property insights",
        });
    }
});

export default router;
