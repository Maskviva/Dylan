import { NextFunction, Request, Response } from 'express';
import path from "path";
import jwt from 'jsonwebtoken';

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || 'your_secure_secret';
const allowedDomains: Array<string | RegExp> = [
    /^https?:\/\/yourdomain\.com$/,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.227.9',
    'http://fuzhou-dae5e406.ofalias.net:53668/'
];

// 验证 Cookie 有效性
const verifyCaptchaCookie = (req: Request): boolean => {
    const token = req.cookies?.captcha_verified;

    if (!token) return false;

    try {
        const decoded = jwt.verify(token, CAPTCHA_SECRET) as { valid: boolean };
        return decoded.valid;
    } catch {
        return false;
    }
};

// 中间件逻辑
const checkDomain = (req: Request, res: Response, next: NextFunction): void => {
    if (req.url === '/api/verify-captcha') {
        next();
        return;
    }

    // 已通过验证的直接放行
    if (verifyCaptchaCookie(req)) {
        next();
        return;
    }

    // 域名白名单验证
    const isValidDomain = allowedDomains.some(domain => {
        const pattern = typeof domain === 'string' ?
            new RegExp(`^${domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) :
            domain;
        return pattern.test(req.headers.referer || '') || pattern.test(req.headers.origin || '');
    });

    if (isValidDomain) {
        next();
    } else {
        res.render(path.join(__dirname, "./CAPTCHA.ejs"), {
            img: `/assets/images/CAPTCHA/${Math.floor(Math.random() * 3) + 1}.png`
        });
    }
};

export default checkDomain;