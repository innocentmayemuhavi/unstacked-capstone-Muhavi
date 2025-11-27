import { Response } from 'express';

export const setCorsHeaders = (res: Response) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];

    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0] || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '3600');
};
