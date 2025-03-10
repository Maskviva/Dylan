import path from 'path';
import {userDataBase} from "./DataBase/User";

type ReturnType = {
    success: boolean,
    message: string
}

type globalUsersDataBase = [userDataBase] | undefined;

type globalUserDataBase = userDataBase | undefined;

export {ReturnType, globalUsersDataBase, globalUserDataBase}