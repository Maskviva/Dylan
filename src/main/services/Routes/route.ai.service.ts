import {UserService} from "../user.service";
import {globalUserDataBase, ReturnType} from "../../../types";
import {getQuestionConfig} from "../../utils/Route/AI";
import {ChatAI} from "../../utils/Route/AI";

export class RoutesAIService  {
    // 私有构造函数 用于防止直接实例化
    private constructor() {
    }

    static async getQuestion(id1: string, id2: string, cookies: Record<string, any>): Promise<ReturnType> {
        if (!id1 || !id2) return {success: false, message: "参数错误"};

        const user: globalUserDataBase = await UserService.getUserByCookies(cookies)

        if (!user) return {success: false, message: "用户不存在"};

        let config: string = await getQuestionConfig(id1, id2);
        // config = config.replace(/\{0}/g, String(user.grade));

        const state: ReturnType = await ChatAI(config);
        return {success: state.success, message: state.message};
    }

    static async getAnswer(question: string, answer: string): Promise<ReturnType> {
        if (!question || !answer) return {success: false, message: "参数错误"};
        const state: ReturnType = await ChatAI(`评价我的回答用 {score: 分数(百分制), message: 评价内容}的json格式发给我 50字以内 这是我回答的问题: ${question} 我的回答是: ${answer}`);
        return {success: state.success, message: state.message};
    }
}