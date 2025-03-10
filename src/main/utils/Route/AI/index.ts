import axios, {AxiosResponse} from 'axios';

import getDataBasePoolConfig from "../../../config";
import {ReturnType} from "../../../../types";
import {ChatCompletionRequest, ChatCompletionResponse} from "../../../../types/Route/AI";

async function getQuestionConfig(subject: string, type: string): Promise<string> {
    const config: any = await getDataBasePoolConfig()
    return config['Routes']['AI']['question'][subject][type];
}

async function getApiKey(): Promise<string> {
    const config: any = await getDataBasePoolConfig()
    return config['Routes']['AI']['apiKey'];
}

function extractJSON(str: string): string {
    try {
        // 去除 Markdown 代码块符号和换行符
        const cleanedStr = str
            .replace(/```json|```/g, '')  // 删除 ```json 和 ```
            .replace(/\\n/g, '')          // 删除换行符
            .trim();

        // 修复属性名缺少双引号的问题
        const fixedStr = cleanedStr
            .replace(/(\w+):/g, '"$1":')

        // 提取并解析 JSON
        const startIndex = fixedStr.indexOf('{');
        const endIndex = fixedStr.lastIndexOf('}') + 1;
        const jsonStr = fixedStr.slice(startIndex, endIndex);

        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("JSON解析失败:", e);
        return str;
    }
}

async function createChatCompletionWithAxios(
    request: ChatCompletionRequest,
    apiKey: string,
    timeout = 60000
): Promise<ChatCompletionResponse> {
    try {
        const response: AxiosResponse<any, any> = await axios.post(
            'https://api.siliconflow.cn/v1/chat/completions',
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                timeout: timeout // 直接设置超时时间
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(`Request failed with error: ${error}`);
    }
}

async function ChatAI(message: string): Promise<ReturnType> {
    const apiKey: string = await getApiKey();
    const request: ChatCompletionRequest = {
        model: 'deepseek-ai/DeepSeek-R1',
        messages: [{role: 'user', content: String(message)},],
        temperature: 0.7,
        max_tokens: 2048,
    };

    try {
        const response: ChatCompletionResponse = await createChatCompletionWithAxios(request, apiKey);
        const result: string = extractJSON(response.choices[0].message.content);

        return {success: true, message: result}
    } catch (error) {
        console.error('Error:', error);
        return {success: false, message: error instanceof Error ? error.message : '未知错误'}
    }
}

export {getQuestionConfig, ChatAI, getApiKey, extractJSON}