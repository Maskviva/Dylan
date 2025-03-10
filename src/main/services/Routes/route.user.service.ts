import {sendEmail} from "../DataBase/email.service";
import {generateSixDigitCode} from "../../utils/Email";
import {UserService} from "../user.service";
import {LearnService} from "../DataBase/learn.service";
import bcrypt from "bcrypt";
import {Response} from "express";
import {globalUsersDataBase, ReturnType} from "../../../types"
const internationalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const getSessionId: () => string = () => Math.random().toString(36).substring(2, 11);

export class RoutesUserService {
    // 私有构造函数 用于防止直接实例化
    private constructor() {
    }

    static async register(username: string, email: string, captcha: string, password: string): Promise<ReturnType> {
        if (!username || !email || !captcha || !password) return {success: false, message: "请填写所有信息!"};
        if (!internationalEmailRegex.test(email)) return {success: false, message: "请输入正确的邮箱"};
        if (username.length < 2 || username.length > 16) return {success: false, message: "用户名长度为2-16位"};
        if (password.length < 6 || password.length > 20) return {success: false, message: "密码长度应该在 6-20 位"};
        if (password !== password.replace(/[^a-zA-Z0-9._-]/g, '')) return {success: false, message: "密码不能包含特殊字符"};

        // 添加用户
        const addUserMessage = await UserService.addUser(username, email, captcha, password);
        const addUserLearnMessage = await LearnService.addUser(email);

        if (!addUserMessage.success || !addUserLearnMessage.success) return {
            success: false, message: addUserMessage.success ? addUserLearnMessage.message : addUserMessage.message
        };

        return {success: true, message: "注册成功"};
    }

    static async login(username: string, password: string, res: Response): Promise<ReturnType> {

        if (!username || !password) return {success: false, message: "用户名或密码不能为空"};

        const users: globalUsersDataBase = await UserService.getUserByName(encodeURIComponent(username));
        // 检查用户名是否存在
        if (!users) return {success: false, message: "用户名或密码错误"};

        // 检查密码是否正确
        if (!bcrypt.compareSync(password, users[0]['password'])) return {success: false, message: "用户名或密码错误"};

        // 缓存生成的 sessionId
        const sessionId: string = getSessionId();

        await UserService.updateUser(users[0].email, {cookie: sessionId});

        // 设置 cookie
        res.cookie(`${username}`, sessionId, {
            maxAge: 30 * 24 * 60 * 60 * 1000,  // 30天有效期
            path: '/',                         // 整个域名下有效
            httpOnly: true,                    // 禁止 JavaScript 访问
            sameSite: 'lax'                    // 跨站请求时的行为
        });

        return {success: true, message: "登录成功"};
    }

    static async send(email: string): Promise<ReturnType> {
        if (!email) return {success: false, message: "请输入邮箱地址"};
        const senderMessage: ReturnType = await sendEmail(email, generateSixDigitCode());
        return {success: senderMessage.success, message: senderMessage.message};
    }
}