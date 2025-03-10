import fs from 'fs';
import path from "path";

/**
 * 获取项目配置文件内容
 * @return {string} 项目配置文件内容
 */
async function getProjectConfigFile(): Promise<string> {
    return fs.readFileSync(path.join(__dirname + '../../../../../src/resources/application.yml'), 'utf8');
}

export default getProjectConfigFile;
