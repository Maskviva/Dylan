type SiliconFlowModel =
    | 'deepseek-ai/DeepSeek-R1'
    | 'Pro/deepseek-ai/DeepSeek-R1'
    | 'deepseek-ai/DeepSeek-V3'
    | 'Pro/deepseek-ai/DeepSeek-V3'
    | 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B'
    | 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B'
    | 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B'
    | 'deepseek-ai/DeepSeek-R1-Distill-Llama-8B'
    | 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'
    | 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B'
    | 'Pro/deepseek-ai/DeepSeek-R1-Distill-Llama-8B'
    | 'Pro/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'
    | 'Pro/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B'
    | 'meta-llama/Llama-3.3-70B-Instruct'
    | 'AIDC-AI/Marco-o1'
    | 'deepseek-ai/DeepSeek-V2.5'
    | 'Qwen/Qwen2.5-72B-Instruct-128K'
    | 'Qwen/Qwen2.5-72B-Instruct'
    | 'Qwen/Qwen2.5-32B-Instruct'
    | 'Qwen/Qwen2.5-14B-Instruct'
    | 'Qwen/Qwen2.5-7B-Instruct'
    | 'Qwen/Qwen2.5-Coder-32B-Instruct'
    | 'Qwen/Qwen2.5-Coder-7B-Instruct'
    | 'Qwen/Qwen2-7B-Instruct'
    | 'Qwen/Qwen2-1.5B-Instruct'
    | 'Qwen/QwQ-32B-Preview'
    | 'TeleAI/TeleChat2'
    | '01-ai/Yi-1.5-34B-Chat-16K'
    | '01-ai/Yi-1.5-9B-Chat-16K'
    | '01-ai/Yi-1.5-6B-Chat'
    | 'THUDM/glm-4-9b-chat'
    | 'Vendor-A/Qwen/Qwen2.5-72B-Instruct'
    | 'internlm/internlm2_5-7b-chat'
    | 'internlm/internlm2_5-20b-chat'
    | 'nvidia/Llama-3.1-Nemotron-70B-Instruct'
    | 'meta-llama/Meta-Llama-3.1-405B-Instruct'
    | 'meta-llama/Meta-Llama-3.1-70B-Instruct'
    | 'meta-llama/Meta-Llama-3.1-8B-Instruct'
    | 'google/gemma-2-27b-it'
    | 'google/gemma-2-9b-it'
    | 'Pro/Qwen/Qwen2.5-7B-Instruct'
    | 'Pro/Qwen/Qwen2-7B-Instruct'
    | 'Pro/Qwen/Qwen2-1.5B-Instruct'
    | 'Pro/THUDM/chatglm3-6b'
    | 'Pro/THUDM/glm-4-9b-chat'
    | 'Pro/meta-llama/Meta-Llama-3.1-8B-Instruct'
    | 'Pro/google/gemma-2-9b-it';

interface ChatCompletionRequest {
    model: SiliconFlowModel;
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
    temperature?: number;
    max_tokens?: number;
}

interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: { role: 'assistant'; content: string };
        finish_reason: string;
    }>;
}

export {ChatCompletionRequest, ChatCompletionResponse, SiliconFlowModel}