import express, {Router} from "express";
import path from "path";
import ejs from "ejs";
import {readFile} from "fs/promises";

import {UserService} from "../services/user.service";
import {LearnService} from "../services/DataBase/learn.service";
import {userDataBase} from "../../types/DataBase/User";
import {DEFAULT_USER_DATA, safeLearnData, safeUserData} from "../utils/Views";

// 路由配置（相对路径）
const routeConfig = {
    index: "./home.ejs",
    mine: "./child/mine.ejs",
    setting: "./child/setting.ejs",
    login: "./child/login.ejs",
    register: "./child/register.ejs",
    forget: "./child/forget.ejs",
    chat_room: "./child/chat room.ejs",

    chinese: "./child/learn/chinese.ejs",
    mathematics: "./child/learn/mathematics.ejs",
    english_vocabulary: "./child/learn/english_vocabulary.ejs",
    english_composition: "./child/learn/english_composition.ejs",
    physics: "./child/learn/physics.ejs",
    chemistry: "./child/learn/chemistry.ejs",
    history: "./child/learn/history.ejs",
    biology: "./child/learn/biology.ejs",
    geography: "./child/learn/geography.ejs",
    morality_and_rule_of_law: "./child/learn/morality_and_rule_of_law.ejs",

    PoetryDictation: "./child/learn/child/PoetryDictation.ejs",
};

// 路由缓存
const routers: Record<string, Router> = {};
// 模板缓存（提升性能）
const templateCache = new Map<string, string>();

// 核心渲染器
async function createTemplateRenderer(relativePath: string) {
    const templatePath = path.join(__dirname, '../../resources/views', relativePath);

    // 缓存模板
    if (!templateCache.has(templatePath)) {
        templateCache.set(templatePath, await readFile(templatePath, 'utf-8'));
    }

    return async (req: express.Request, res: express.Response) => {
        try {
            const cookies = req.cookies;
            const userData = await UserService.getUserByCookies(cookies);
            let html: string;

            if (!userData) {
                html = ejs.render(templateCache.get(templatePath)!, {
                    ...DEFAULT_USER_DATA,
                });
            } else {
                const userLearnData = await LearnService.getUserByEmail(<string>userData?.email);
                html = ejs.render(templateCache.get(templatePath)!, {
                    userExist: true, ...safeUserData(<userDataBase>userData), ...safeLearnData(userLearnData),
                });
            }

            res.send(html)
        } catch (error) {
            console.error(`[${templatePath}] 渲染失败:`, error);
            res.status(500).send(`渲染错误: ${error instanceof Error ? error.message : error}`);
        }
    };
}

// 路由工厂函数
async function createRoute(relativePath: string): Promise<Router> {
    const router = Router();
    const renderer = await createTemplateRenderer(relativePath);
    router.get('/', renderer);
    return router;
}

// 初始化所有路由
async function initializeAllRoutes() {
    const routeEntries = Object.entries(routeConfig);

    // 并行初始化提升速度
    await Promise.all(routeEntries.map(async ([key, path]) => {
        routers[key] = await createRoute(path);
    }));

    return routers;
}

// 导出初始化完成的 Promise
const routeInitializer = initializeAllRoutes();

export {routers, routeInitializer};
