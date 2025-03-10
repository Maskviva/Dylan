interface userDataBase {
    id: number;
    name: string;
    email: string;
    password: string;
    cookie: string;
    portrait: string | null,
    age: number;
    birthday: string;
}

interface userDataBasePoolConfig {
    "host": string;
    "port": number;
    "user": string;
    "password": string;
    "database": string;
    "waitForConnections": boolean;
    "connectionLimit": number;
}

type UserUpdateData = {
    name?: string; password?: string; portrait?: string; age?: number; birthday?: string; cookie?: string;
};

export {userDataBase, userDataBasePoolConfig, UserUpdateData}