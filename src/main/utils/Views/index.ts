import {userDataBase} from "../../../types/DataBase/User";
import {learnDataBase} from "../../../types/DataBase/Learn";

// 预定义默认用户数据（避免重复创建对象）
const DEFAULT_USER_DATA = {
    userExist: false,
    userName: null,
    userEmail: null,
    userPortrait: null,
    userAge: "你还没有设置年龄",
    userBirthday: "你还没有设置生日",
    userGrade: null,
    userVolume: null,
    chineseTextbooks: null,
    mathematicsTextbooks: null,
    englishTextbooks: null,
    physicsTextbooks: null,
    chemistryTextbooks: null,
    biologyTextbooks: null,
    historyTextbooks: null,
    geographyTextbooks: null,
    morality_and_rule_of_lawTextbooks: null,
} as const;

// 学习数据缓存（降低数据库压力）
const learnDataCache = new Map<string, learnDataBase>();

function safeUserData(userData: userDataBase): {
    userName: string; userEmail: string; userPortrait: string | null; userAge: number; userBirthday: string
} {
    return {
        userName: userData.name,
        userEmail: userData.email,
        userPortrait: userData.portrait,
        userAge: userData.age ?? "你还没有设置年龄",
        userBirthday: userData.birthday ?? "你还没有设置生日",
    };
}

// 辅助方法：安全学习数据处理
function safeLearnData(learnData?: learnDataBase): {
    userGrade: string;
    userVolume: string;
    chineseTextbooks: string | null;
    mathematicsTextbooks: string | null;
    englishTextbooks: string | null;
    physicsTextbooks: string | null;
    chemistryTextbooks: string | null;
    biologyTextbooks: string | null;
    historyTextbooks: string | null;
    geographyTextbooks: string | null;
    morality_and_rule_of_lawTextbooks: string | null;
} | {} {
    if (!learnData) return {};

    // 缓存策略（5分钟有效期）
    if (!learnDataCache.has(learnData.email)) {
        learnDataCache.set(learnData.email, learnData);
        setTimeout((): boolean => learnDataCache.delete(learnData.email), 300_000);
    }

    return {
        userGrade: learnData.grade ?? "未设置年级",
        userVolume: learnData.volume ?? "未设置版本",
        chineseTextbooks: learnData.chineseTextbooks,
        mathematicsTextbooks: learnData.mathematicsTextbooks,
        englishTextbooks: learnData.englishTextbooks,
        physicsTextbooks: learnData.physicsTextbooks,
        chemistryTextbooks: learnData.chemistryTextbooks,
        biologyTextbooks: learnData.biologyTextbooks,
        historyTextbooks: learnData.historyTextbooks,
        geographyTextbooks: learnData.geographyTextbooks,
        morality_and_rule_of_lawTextbooks: learnData.morality_and_rule_of_lawTextbooks,
    };
}

export {safeUserData, safeLearnData, DEFAULT_USER_DATA};