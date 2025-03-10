import {learnService} from "../../core/DataBase/learn.repository";
import {learnDataBase} from "../../../types/DataBase/Learn";
import {ReturnType} from "../../../types";

export class LearnService {
    // 私有构造函数，用于防止直接实例化
    private constructor() {
    }

    static async getUserByEmail(email: string): Promise<learnDataBase | undefined> {
        const db: learnService = await learnService.create();
        const users: [learnDataBase] | undefined = await db.getUser('email', email);
        return users?.[0];
    }

    // 定义一个静态的异步方法 addUser，用于添加用户
    static async addUser(email: string): Promise<ReturnType> {
        // 调用 learnService 的 create 方法创建数据库实例
        const db: learnService = await learnService.create();

        // 使用数据库实例的 getUser 方法根据邮箱查询用户，返回用户信息数组或 undefined
        const emailUser: [learnDataBase] | undefined = await db.getUser('email', email);

        // 检查用户是否已被注册
        if (emailUser != undefined) return {success: false, message: "该邮箱已被注册"};

        const state: ReturnType = await db.addUser(email);

        return {success: state.success, message: state.success ? "注册成功" : state.message};
    }

    static async deleteUser(email: string): Promise<boolean> {
        const db: learnService = await learnService.create();
        return await db.deleteUser('email', email);
    }

    static async updateUser(email: string, data: Partial<learnDataBase>): Promise<ReturnType> {
        const db: learnService = await learnService.create();
        return await db.updateUser(email, data);
    }
}