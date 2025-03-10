import {UserService} from "../user.service";
import {emailVerification} from "../../utils/Email";
import bcrypt from "bcrypt";
import {globalUserDataBase, globalUsersDataBase, ReturnType} from "../../../types";

export class RoutesUpDataService {
    // 私有构造函数 用于防止直接实例化
    private constructor() {
    }

    static async forget(email: string, captcha: string, password: string): Promise<ReturnType> {
        if (!email || !captcha || !password) return {success: false, message: "参数错误"};

        const user: globalUsersDataBase = await UserService.getUserByEmail(email);

        if (!user) return {success: false, message: "用户不存在"};

        // 验证验证码
        if (emailVerification.get(email) !== captcha) return {success: false, message: "验证码错误"};

        if (bcrypt.compareSync(password, user[0].password)) return {success: false, message: "新密码不能与旧密码相同"};

        const state: ReturnType = await UserService.updateUser(email, {password: await bcrypt.hash(password, 10)});
        return {success: state.success, message: state.message};
    }

    static async upDateUserInfo(name: string, age: number, birthday: string, cookies: Record<string, any>): Promise<ReturnType> {
        if (!name && !age && !birthday) return {success: false, message: '参数错误'};
        if (name && name.length < 2 || name.length > 16) return {success: false, message: "用户名长度为2-16位"};

        const user: globalUserDataBase = await UserService.getUserByCookies(cookies)

        if (user == undefined) return {success: false, message: "用户不存在"};

        const state: ReturnType = await UserService.updateUser(user.email, {name, age, birthday})
        return {success: state.success, message: state.message}
    }

    static async upLoadPortrait(cookies: Record<string, any>, filePath: string | undefined, file: Express.Multer.File | undefined): Promise<ReturnType> {
        if (!file) return {success: false, message: '未选择文件'};
        if (!filePath) return {success: false, message: '文件上传失败'};

        const user: globalUserDataBase = await UserService.getUserByCookies(cookies)

        if (user == undefined) return {success: false, message: "用户不存在"};

        const state: ReturnType = await UserService.updateUser(user.email, {portrait: filePath.slice(6)})
        return {success: state.success, message: state.message}
    }
}