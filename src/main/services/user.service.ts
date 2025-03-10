import bcrypt from 'bcrypt';

import {userService} from '../core/DataBase/user.repository';
import {emailVerification} from "../utils/Email";
import {userDataBase, UserUpdateData} from "../../types/DataBase/User";
import {delUnwarranted} from "../utils/DataBase";
import {globalUsersDataBase, ReturnType} from '../../types'

export class UserService {
    // 私有构造函数，用于防止直接实例化
    private constructor() {
    }

    static async getUserByEmail(email: string): Promise<globalUsersDataBase> {
        const db: userService = await userService.create();
        return await db.getUser('email', email);
    }

    static async getUserByName(name: string): Promise<globalUsersDataBase> {
        const db: userService = await userService.create();
        return await db.getUser('name', name);
    }

    static async getUserByCookies(cookies: Record<string, any>): Promise<userDataBase | undefined> {
        const db: userService = await userService.create();
        for (const i in cookies) {
            const users: globalUsersDataBase = await db.getUser('cookie', cookies[i]);
            if (users) return users[0];
        }
        return undefined;
    }

    static async addUser(username: string, email: string, captcha: string, password: string): Promise<ReturnType> {
        if (!username || !password) return {success: false, message: "用户名或密码不能为空"};

        const db: userService = await userService.create();
        username = encodeURIComponent(username); // 名称转码

        const nameUser: globalUsersDataBase = await db.getUser('name', username);
        const emailUser: globalUsersDataBase = await db.getUser('email', email);

        // 检查用户名是否已被注册
        if (nameUser != undefined) return {success: false, message: "该用户名已被注册"};

        if (emailUser != undefined) return {success: false, message: "该邮箱已被注册"};

        // 验证验证码
        if (emailVerification.get(email) !== captcha) return {success: false, message: "验证码错误"};

        const state = await db.addUser(username, email, bcrypt.hashSync(password, 10));

        return {success: state.success, message: state.success ? "注册成功" : state.message};
    }

    static async deleteUser(email: string): Promise<boolean> {
        const db: userService = await userService.create();
        return await db.deleteUser('email', email);
    }

    static async updateUser(email: string, data: Partial<UserUpdateData>): Promise<ReturnType> {
        const db: userService = await userService.create();
        return await db.updateUser(email, delUnwarranted(data));
    }
}