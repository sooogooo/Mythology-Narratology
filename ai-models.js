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

        // 发送请求
        const response = await fetch(model.endpoint, requestConfig);

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
    }
};

// 初始化
AIModels.init();

// 导出到全局
if (typeof window !== 'undefined') {
    window.AIModels = AIModels;
}
