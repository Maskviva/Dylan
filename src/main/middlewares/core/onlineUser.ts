import {NextFunction, Request, Response} from 'express';
import {UserService} from "../../services/user.service";

const unOnlineUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cookies = req.cookies;
    const user = await UserService.getUserByCookies(cookies)

    if (!user) {
        res.redirect('/404.html');
        return;
    } else {
        next();
    }
}

const onlineUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cookies = req.cookies;
    const user = await UserService.getUserByCookies(cookies)

    if (!!user) {
        res.redirect('/404.html');
        return;
    } else {
        next();
    }
}

export {unOnlineUser, onlineUser};