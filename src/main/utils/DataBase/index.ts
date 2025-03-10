import {UserUpdateData} from "../../../types/DataBase/User";

function delUnwarranted(updateData: UserUpdateData): UserUpdateData {
    for (const key in updateData) {
        const k = key as keyof UserUpdateData; // 类型断言
        if (!updateData[k] || updateData[k] === '')  {
            delete updateData[k];
        }
    }
    return updateData;
}

export {delUnwarranted};