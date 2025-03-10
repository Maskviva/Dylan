import express, {Request, Response, Router} from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import upLoadPortrait from "../middlewares/Routes/upLoadPortrait";
import {RoutesAutoService} from "../services/Routes/route.auto.service";
import {RoutesUserService} from "../services/Routes/route.user.service";
import {RoutesUpDataService} from "../services/Routes/route.updata.service";
import {RoutesAIService} from "../services/Routes/route.ai.service";
import checkDomain from "../middlewares/core/CAPTCHA";
import {ReturnType} from "../../types/index";

// 创建 Router 应用对象
const apiRouter: Router = Router();

apiRouter.use(express.urlencoded({extended: true}));
apiRouter.use(express.json({}));
apiRouter.use(cookieParser());
apiRouter.use(express.static(path.join(__dirname, '../../resources/public')));
apiRouter.use(cors({
    credentials: true
}));
apiRouter.use(checkDomain)

// 人机验证接口
apiRouter.post('/api/verify-captcha', (req: Request, res: Response): void => {
    const {mousePath, puzzle_slot_left, puzzle_piece_left} = req.body;
    const state: ReturnType = RoutesAutoService.verifyCaptcha(mousePath, puzzle_slot_left, puzzle_piece_left, res);
    res.json({success: state.success, message: state.message});
})


// 验证码发送接口
apiRouter.post("/api/send", async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;
    const state: ReturnType = await RoutesUserService.send(email);
    res.json({success: state.success, message: state.message});
})

// 注册接口
apiRouter.post("/api/register", async (req: Request, res: Response): Promise<void> => {
    const {username, email, captcha, password} = req.body;
    const state: ReturnType = await RoutesUserService.register(username, email, captcha, password);
    res.json({success: state.success, message: state.message});
})

// 登录接口
apiRouter.post("/api/login", async (req: Request, res: Response): Promise<void> => {
    const {username, password}: { username: string, password: string } = req.body;
    const state: ReturnType = await RoutesUserService.login(username, password, res);
    res.json({success: state.success, message: state.message});
})

// 登出接口
apiRouter.post("/api/logout", (req: Request, res: Response): void => {
    if (!req.cookies) return;
    Object.keys(req.cookies).forEach((key: string): Response => res.clearCookie(key));
    res.json({success: true, message: "登出成功"});
})

// 密码找回接口
apiRouter.post('/api/forget', async (req: Request, res: Response): Promise<void> => {
    const {email, captcha, password} = req.body;
    const state: ReturnType = await RoutesUpDataService.forget(email, captcha, password);
    res.json({success: state.success, message: state.message});
})

// 学习问题接口
apiRouter.post('/api/getQuestion/:id/:id2', async (req: Request, res: Response): Promise<void> => {
    const {id, id2} = req.params;
    const cookies: Record<string, any> = req.cookies;
    const state: ReturnType = await RoutesAIService.getQuestion(id, id2, cookies);
    res.json({success: state.success, data: state.message});
})

// 学习答案评价接口
apiRouter.post("/api/getAnswer", async (req: Request, res: Response): Promise<void> => {
    const {question, answer} = req.body;
    const state: ReturnType = await RoutesAIService.getAnswer(question, answer);
    res.json({success: state.success, data: state.message});
})


// 基本信息 修改
apiRouter.post('/api/upDateUserInfo', async (req: Request, res: Response): Promise<void> => {
    const {name, age, birthday} = req.body;
    const cookies: Record<string, any> = req.cookies;
    const state: ReturnType = await RoutesUpDataService.upDateUserInfo(name, age, birthday, cookies)
    res.json({success: state.success, message: state.message});
})

// 头像修改
apiRouter.post('/api/upLoadPortrait', upLoadPortrait.single('file'), async (req: Request, res: Response): Promise<void> => {
    const cookies: Record<string, any> = req.cookies;
    const filePath: string | undefined = req.file?.path;
    const state: ReturnType = await RoutesUpDataService.upLoadPortrait(cookies, filePath, req.file);
    res.json({success: state.success, message: state.message});
});

export default apiRouter;