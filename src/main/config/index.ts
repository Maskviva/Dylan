import yaml from "js-yaml";
import getProjectConfigFile from "../utils/config";

async function getDataBasePoolConfig(): Promise<any> {
    // 缓存项目配置文件内容
    const projectConfig: string = await getProjectConfigFile();
    // 解析项目配置文件内容转为 json 对象 并导出
    return await yaml.load(projectConfig)
}

export default getDataBasePoolConfig;