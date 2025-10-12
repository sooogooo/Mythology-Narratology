// AI模型配置系统
const AIModels = {
    // 预定义的AI模型
    presets: {
        'gemini-flash': {
            name: 'Gemini 2.5 Flash',
            provider: 'google',
            endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            apiKeyParam: 'x-goog-api-key',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            }),
            formatResponse: (data) => {
                return data.candidates?.[0]?.content?.parts?.[0]?.text || '无响应';
            }
        },
        'gemini-flash-image': {
            name: 'Gemini 2.5 Flash Image (Nano Banana)',
            provider: 'google',
            endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent',
            apiKeyParam: 'x-goog-api-key',
            requiresApiKey: true,
            supportsChat: false,
            supportsImage: true,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        responseModalities: ['image']
                    }
                })
            }),
            formatResponse: (data) => {
                const imagePart = data.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
                if (!imagePart || !imagePart.inlineData) {
                    throw new Error('API返回的数据中没有图片');
                }
                const imageBase64 = imagePart.inlineData.data;
                const mimeType = imagePart.inlineData.mimeType || 'image/png';
                return `data:${mimeType};base64,${imageBase64}`;
            }
        },
        'openai-gpt4': {
            name: 'OpenAI GPT-4',
            provider: 'openai',
            endpoint: 'https://api.openai.com/v1/chat/completions',
            apiKeyParam: 'Authorization',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: prompt }]
                })
            }),
            formatResponse: (data) => {
                return data.choices?.[0]?.message?.content || '无响应';
            }
        },
        'openai-gpt35': {
            name: 'OpenAI GPT-3.5 Turbo',
            provider: 'openai',
            endpoint: 'https://api.openai.com/v1/chat/completions',
            apiKeyParam: 'Authorization',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }]
                })
            }),
            formatResponse: (data) => {
                return data.choices?.[0]?.message?.content || '无响应';
            }
        },
        'claude-sonnet': {
            name: 'Claude 3.5 Sonnet',
            provider: 'anthropic',
            endpoint: 'https://api.anthropic.com/v1/messages',
            apiKeyParam: 'x-api-key',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 4096,
                    messages: [{ role: 'user', content: prompt }]
                })
            }),
            formatResponse: (data) => {
                return data.content?.[0]?.text || '无响应';
            }
        },
        'tongyi-qwen': {
            name: '通义千问 (Qwen)',
            provider: 'aliyun',
            endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
            apiKeyParam: 'Authorization',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'qwen-turbo',
                    input: {
                        messages: [{ role: 'user', content: prompt }]
                    },
                    parameters: {
                        result_format: 'message'
                    }
                })
            }),
            formatResponse: (data) => {
                return data.output?.choices?.[0]?.message?.content || data.output?.text || '无响应';
            }
        },
        'ernie-bot': {
            name: '文心一言 (ERNIE Bot)',
            provider: 'baidu',
            endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
            apiKeyParam: 'access_token',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }]
                })
            }),
            formatResponse: (data) => {
                return data.result || '无响应';
            },
            // 百度需要特殊处理：endpoint需要附加access_token参数
            getEndpoint: (apiKey) => {
                return `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${apiKey}`;
            }
        },
        'spark': {
            name: '讯飞星火 (Spark)',
            provider: 'xfyun',
            endpoint: 'https://spark-api-open.xf-yun.com/v1/chat/completions',
            apiKeyParam: 'Authorization',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'generalv3.5',
                    messages: [{ role: 'user', content: prompt }],
                    stream: false
                })
            }),
            formatResponse: (data) => {
                return data.choices?.[0]?.message?.content || '无响应';
            }
        },
        'chatglm': {
            name: '智谱AI (ChatGLM)',
            provider: 'zhipu',
            endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            apiKeyParam: 'Authorization',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'glm-4',
                    messages: [{ role: 'user', content: prompt }]
                })
            }),
            formatResponse: (data) => {
                return data.choices?.[0]?.message?.content || '无响应';
            }
        },
        'doubao': {
            name: '豆包 (Doubao)',
            provider: 'bytedance',
            endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
            apiKeyParam: 'Authorization',
            requiresApiKey: true,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'doubao-pro-4k',
                    messages: [{ role: 'user', content: prompt }]
                })
            }),
            formatResponse: (data) => {
                return data.choices?.[0]?.message?.content || '无响应';
            }
        },
        'custom': {
            name: '自定义模型',
            provider: 'custom',
            endpoint: '',
            apiKeyParam: 'Authorization',
            requiresApiKey: false,
            supportsChat: true,
            supportsImage: false,
            formatRequest: (prompt, apiKey) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            }),
            formatResponse: (data) => {
                return data.response || data.text || data.content || '无响应';
            }
        }
    },

    // 用户自定义模型
    customModels: {},

    // 当前选择的模型
    currentChatModel: 'gemini-flash',
    currentImageModel: 'gemini-flash-image',

    // 初始化
    init() {
        this.loadSettings();
    },

    // 加载设置
    loadSettings() {
        const settings = localStorage.getItem('ai_models_config');
        if (settings) {
            try {
                const config = JSON.parse(settings);
                this.customModels = config.customModels || {};
                this.currentChatModel = config.currentChatModel || 'gemini-flash';
                this.currentImageModel = config.currentImageModel || 'gemini-flash-image';
            } catch (e) {
                console.error('加载AI模型配置失败:', e);
            }
        }
    },

    // 保存设置
    saveSettings() {
        const config = {
            customModels: this.customModels,
            currentChatModel: this.currentChatModel,
            currentImageModel: this.currentImageModel
        };
        localStorage.setItem('ai_models_config', JSON.stringify(config));
    },

    // 获取所有可用模型
    getAllModels(type = 'chat') {
        const models = { ...this.presets, ...this.customModels };
        return Object.entries(models)
            .filter(([_, config]) => {
                if (type === 'chat') return config.supportsChat;
                if (type === 'image') return config.supportsImage;
                return true;
            })
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    },

    // 获取当前模型
    getCurrentModel(type = 'chat') {
        const modelId = type === 'chat' ? this.currentChatModel : this.currentImageModel;
        return this.presets[modelId] || this.customModels[modelId];
    },

    // 设置当前模型
    setCurrentModel(modelId, type = 'chat') {
        if (type === 'chat') {
            this.currentChatModel = modelId;
        } else {
            this.currentImageModel = modelId;
        }
        this.saveSettings();
    },

    // 添加自定义模型
    addCustomModel(id, config) {
        this.customModels[id] = {
            ...config,
            provider: 'custom'
        };
        this.saveSettings();
    },

    // 删除自定义模型
    removeCustomModel(id) {
        delete this.customModels[id];
        this.saveSettings();
    },

    // 调用AI模型
    async call(prompt, type = 'chat', modelId = null) {
        const model = modelId
            ? (this.presets[modelId] || this.customModels[modelId])
            : this.getCurrentModel(type);

        if (!model) {
            throw new Error('未找到指定的AI模型');
        }

        // 获取API密钥
        let apiKey = null;
        if (model.requiresApiKey) {
            const storageKey = `${model.provider}_api_key`;
            apiKey = localStorage.getItem(storageKey);

            if (!apiKey) {
                throw new Error(`请先配置 ${model.name} 的 API Key`);
            }
        }

        // 格式化请求
        const requestConfig = model.formatRequest(prompt, apiKey);

        // 获取endpoint（支持动态endpoint，如百度文心一言）
        const endpoint = model.getEndpoint ? model.getEndpoint(apiKey) : model.endpoint;

        // 发送请求
        const response = await fetch(endpoint, requestConfig);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API请求失败: ${response.statusText}`);
        }

        const data = await response.json();

        // 格式化响应
        return model.formatResponse(data);
    },

    // 获取API密钥存储键
    getApiKeyStorageKey(provider) {
        return `${provider}_api_key`;
    },

    // 保存API密钥
    saveApiKey(provider, apiKey) {
        const storageKey = this.getApiKeyStorageKey(provider);
        localStorage.setItem(storageKey, apiKey);
    },

    // 获取API密钥
    getApiKey(provider) {
        const storageKey = this.getApiKeyStorageKey(provider);
        return localStorage.getItem(storageKey);
    },

    // 清除API密钥
    clearApiKey(provider) {
        const storageKey = this.getApiKeyStorageKey(provider);
        localStorage.removeItem(storageKey);
    },

    /**
     * 测试模型连通性
     * @param {string} modelId - 模型ID
     * @returns {Promise<object>} 测试结果 {success: boolean, latency: number, error: string}
     */
    async testConnectivity(modelId) {
        const model = this.presets[modelId] || this.customModels[modelId];

        if (!model) {
            return {
                success: false,
                latency: 0,
                error: '未找到指定的AI模型'
            };
        }

        // 获取API密钥
        let apiKey = null;
        if (model.requiresApiKey) {
            const storageKey = `${model.provider}_api_key`;
            apiKey = localStorage.getItem(storageKey);

            if (!apiKey) {
                return {
                    success: false,
                    latency: 0,
                    error: `未配置 API Key`
                };
            }
        }

        const startTime = Date.now();

        try {
            // 发送简单测试消息
            const testPrompt = 'Hi';
            const requestConfig = model.formatRequest(testPrompt, apiKey);

            const response = await fetch(model.endpoint, {
                ...requestConfig,
                signal: AbortSignal.timeout(10000) // 10秒超时
            });

            const latency = Date.now() - startTime;

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    success: false,
                    latency,
                    error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`
                };
            }

            // 验证响应格式
            const data = await response.json();
            try {
                model.formatResponse(data);
                return {
                    success: true,
                    latency,
                    error: null
                };
            } catch (formatError) {
                return {
                    success: false,
                    latency,
                    error: `响应格式错误: ${formatError.message}`
                };
            }

        } catch (error) {
            const latency = Date.now() - startTime;
            return {
                success: false,
                latency,
                error: error.name === 'AbortError' ? '连接超时' : error.message
            };
        }
    },

    /**
     * Token使用统计系统
     */
    tokenStats: {
        // 统计数据结构
        data: {
            // modelId: { totalTokens: 0, requests: 0, lastUsed: timestamp }
        },

        // 初始化
        init() {
            const stored = localStorage.getItem('ai_token_stats');
            if (stored) {
                try {
                    this.data = JSON.parse(stored);
                } catch (e) {
                    console.error('加载Token统计失败:', e);
                    this.data = {};
                }
            }
        },

        // 保存
        save() {
            localStorage.setItem('ai_token_stats', JSON.stringify(this.data));
        },

        // 记录使用
        record(modelId, tokens, type = 'chat') {
            if (!this.data[modelId]) {
                this.data[modelId] = {
                    totalTokens: 0,
                    inputTokens: 0,
                    outputTokens: 0,
                    requests: 0,
                    chatRequests: 0,
                    imageRequests: 0,
                    lastUsed: null,
                    firstUsed: Date.now()
                };
            }

            const stats = this.data[modelId];
            stats.totalTokens += tokens;
            stats.requests += 1;
            stats.lastUsed = Date.now();

            if (type === 'chat') {
                stats.chatRequests += 1;
            } else if (type === 'image') {
                stats.imageRequests += 1;
            }

            this.save();
        },

        // 记录详细token使用（输入/输出）
        recordDetailed(modelId, inputTokens, outputTokens, type = 'chat') {
            if (!this.data[modelId]) {
                this.data[modelId] = {
                    totalTokens: 0,
                    inputTokens: 0,
                    outputTokens: 0,
                    requests: 0,
                    chatRequests: 0,
                    imageRequests: 0,
                    lastUsed: null,
                    firstUsed: Date.now()
                };
            }

            const stats = this.data[modelId];
            stats.inputTokens += inputTokens;
            stats.outputTokens += outputTokens;
            stats.totalTokens = stats.inputTokens + stats.outputTokens;
            stats.requests += 1;
            stats.lastUsed = Date.now();

            if (type === 'chat') {
                stats.chatRequests += 1;
            } else if (type === 'image') {
                stats.imageRequests += 1;
            }

            this.save();
        },

        // 获取统计
        get(modelId) {
            return this.data[modelId] || {
                totalTokens: 0,
                inputTokens: 0,
                outputTokens: 0,
                requests: 0,
                chatRequests: 0,
                imageRequests: 0,
                lastUsed: null,
                firstUsed: null
            };
        },

        // 获取所有统计
        getAll() {
            return this.data;
        },

        // 清空统计
        clear(modelId) {
            if (modelId) {
                delete this.data[modelId];
            } else {
                this.data = {};
            }
            this.save();
        },

        // 导出统计报告
        exportReport() {
            const report = {
                exportTime: new Date().toISOString(),
                models: []
            };

            Object.entries(this.data).forEach(([modelId, stats]) => {
                const model = AIModels.presets[modelId] || AIModels.customModels[modelId];
                report.models.push({
                    id: modelId,
                    name: model?.name || modelId,
                    ...stats,
                    lastUsedDate: stats.lastUsed ? new Date(stats.lastUsed).toLocaleString('zh-CN') : null,
                    firstUsedDate: stats.firstUsed ? new Date(stats.firstUsed).toLocaleString('zh-CN') : null
                });
            });

            return report;
        }
    },

    /**
     * 估算Token数量（简单估算）
     * @param {string} text - 文本内容
     * @returns {number} 估算的token数
     */
    estimateTokens(text) {
        // 简单估算：中文约1.5字符/token，英文约4字符/token
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const otherChars = text.length - chineseChars;
        return Math.ceil(chineseChars / 1.5 + otherChars / 4);
    }
};

// 初始化
AIModels.init();
AIModels.tokenStats.init();

// 导出到全局
if (typeof window !== 'undefined') {
    window.AIModels = AIModels;
}
