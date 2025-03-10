import {validateMouseBehavior} from "../../utils/Route/verifyCaptcha";
import jwt from "jsonwebtoken";
import {Response} from "express";
import {ReturnType} from "../../../types";

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || 'your_secure_secret';

export class RoutesAutoService {
    // 私有构造函数 用于防止直接实例化
    private constructor() {
    }

    static verifyCaptcha(mousePath: Array<string>, puzzle_slot_left: number, puzzle_piece_left: number, res: Response): ReturnType {
        // 高级验证逻辑
        const isHuman: boolean = validateMouseBehavior(mousePath, puzzle_slot_left, puzzle_piece_left);
        if (isHuman) {
            const token: string = jwt.sign({valid: true}, CAPTCHA_SECRET, {expiresIn: '2h'});
            res.cookie('captcha_verified', token, {
                httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 30 * 24 * 60 * 60 * 1000
            });
            return {success: true, message: "验证成功"};
        } else {
            return {success: false, message: "验证失败"};
        }
    }
}