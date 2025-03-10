import {routeInitializer, routers} from "./views.route";
import api from "./api.route";
import express, {Express} from "express";
import {onlineUser, unOnlineUser} from "../middlewares/core/onlineUser";

const app: Express = express();

app.use('/', api)
routeInitializer.then( (): void => {
    app.use('/', routers['index'])
    app.use('/mine', unOnlineUser, routers['mine'])
    app.use('/setting', unOnlineUser, routers['setting'])
    app.use('/login', onlineUser, routers['login'])
    app.use('/register', onlineUser, routers['register'])
    app.use('/forget', routers['forget'])
    app.use('/chat_room', routers['chat_room'])

    app.use('/learn/chinese', routers['chinese'])
    app.use('/learn/mathematics', routers['mathematics'])
    app.use('/learn/english_vocabulary', routers['english_vocabulary'])
    app.use('/learn/english_composition', routers['english_composition'])
    app.use('/learn/physics', routers['physics'])
    app.use('/learn/chemistry', routers['chemistry'])
    app.use('/learn/history', routers['history'])
    app.use('/learn/biology', routers['biology'])
    app.use('/learn/geography', routers['geography'])
    app.use('/learn/morality_and_rule_of_law', routers['morality_and_rule_of_law'])

    app.use('/learn/chinese/PoetryDictation', unOnlineUser, routers['PoetryDictation'])
})

export {app}