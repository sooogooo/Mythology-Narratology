// 应用状态管理
const AppState = {
    currentPage: 'home',
    currentTheme: 'elegant-gray',
    fontSize: 'medium',
    aiStyle: 'standard',
    aiLength: 'concise',
    chatHistory: [],
    imageHistory: [],
    currentSelection: null,
    geminiApiKey: null
};

// 本地存储键
const STORAGE_KEYS = {
    THEME: 'medbeauty_theme',
    FONT_SIZE: 'medbeauty_font_size',
    AI_STYLE: 'medbeauty_ai_style',
    AI_LENGTH: 'medbeauty_ai_length',
    CHAT_HISTORY: 'medbeauty_chat_history',
    IMAGE_HISTORY: 'medbeauty_image_history'
};

// 初始化应用
function initApp() {
    loadSettings();
    setupEventListeners();
    setupTextSelection();
    loadHistory();
    generateSuggestedQuestions();
}

// 加载用户设置
function loadSettings() {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'elegant-gray';
    const fontSize = localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || 'medium';
    const aiStyle = localStorage.getItem(STORAGE_KEYS.AI_STYLE) || 'standard';
    const aiLength = localStorage.getItem(STORAGE_KEYS.AI_LENGTH) || 'concise';
    const geminiApiKey = localStorage.getItem('gemini_api_key');

    applyTheme(theme);
    applyFontSize(fontSize);
    AppState.aiStyle = aiStyle;
    AppState.aiLength = aiLength;
    AppState.geminiApiKey = geminiApiKey;

    // 更新UI状态
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === fontSize);
    });
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === aiStyle);
    });
    document.querySelectorAll('.length-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.length === aiLength);
    });
}

// 应用主题
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    AppState.currentTheme = theme;
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

// 应用字体大小
function applyFontSize(size) {
    document.body.classList.remove('font-small', 'font-large');
    if (size === 'small') {
        document.body.classList.add('font-small');
    } else if (size === 'large') {
        document.body.classList.add('font-large');
    }
    AppState.fontSize = size;
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, size);
}

// 设置事件监听器
function setupEventListeners() {
    // 头部导航
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            if (page) {
                navigateToPage(page);
            }
        });
    });

    // 设置按钮
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');

    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('active');
    });

    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
    });

    // 点击面板外部关闭
    settingsPanel.addEventListener('click', (e) => {
        if (e.target === settingsPanel) {
            settingsPanel.classList.remove('active');
        }
    });

    // 主题切换
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyTheme(this.dataset.theme);
        });
    });

    // 字体大小切换
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyFontSize(this.dataset.size);
        });
    });

    // AI风格切换
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            AppState.aiStyle = this.dataset.style;
            localStorage.setItem(STORAGE_KEYS.AI_STYLE, this.dataset.style);
        });
    });

    // AI长度切换
    document.querySelectorAll('.length-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.length-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            AppState.aiLength = this.dataset.length;
            localStorage.setItem(STORAGE_KEYS.AI_LENGTH, this.dataset.length);
        });
    });

    // 底部导航
    document.querySelectorAll('.footer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            navigateToPage(this.dataset.page);
        });
    });

    // 聊天功能
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    sendBtn.addEventListener('click', () => sendMessage());
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 图片生成
    const generateImageBtn = document.getElementById('generateImageBtn');
    generateImageBtn.addEventListener('click', () => generateImage());

    // API Key 管理
    const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
    const clearApiKeyBtn = document.getElementById('clearApiKeyBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');

    saveApiKeyBtn.addEventListener('click', () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('gemini_api_key', apiKey);
            AppState.geminiApiKey = apiKey;
            apiKeyInput.value = '';
            showApiKeyStatus('API Key 已保存', 'success');
        } else {
            showApiKeyStatus('请输入有效的 API Key', 'error');
        }
    });

    clearApiKeyBtn.addEventListener('click', () => {
        if (confirm('确定要清除已保存的 API Key 吗？')) {
            localStorage.removeItem('gemini_api_key');
            AppState.geminiApiKey = null;
            apiKeyInput.value = '';
            showApiKeyStatus('API Key 已清除', 'success');
        }
    });

    // 历史标签切换
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.dataset.tab;
            document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.history-list').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabType + 'History').classList.add('active');
        });
    });

    // 导出按钮
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.dataset.format;
            exportReport(format);
        });
    });
}

// 页面导航
function navigateToPage(pageName) {
    // 更新页面显示
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName + 'Page').classList.add('active');

    // 更新底部导航状态
    document.querySelectorAll('.footer-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageName);
    });

    // 关闭设置面板
    document.getElementById('settingsPanel').classList.remove('active');

    AppState.currentPage = pageName;
}

// 发送聊天消息
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // 清空输入框
    input.value = '';

    // 添加用户消息
    addMessageToChat('user', message);

    // 显示加载状态
    showLoading();

    try {
        // 调用AI API
        const response = await callAIAPI(message, 'chat');

        // 添加AI回复
        addMessageToChat('assistant', response);

        // 保存到历史记录
        saveToHistory('chat', message, response);

        // 更新建议问题
        generateSuggestedQuestions();

    } catch (error) {
        console.error('AI API调用失败:', error);
        addMessageToChat('assistant', '抱歉，AI服务暂时不可用，请稍后再试。');
    } finally {
        hideLoading();
    }
}

// 添加消息到聊天界面
function addMessageToChat(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = renderMarkdown(content);

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 渲染Markdown
function renderMarkdown(text) {
    // 简单的Markdown渲染
    let html = text;

    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 斜体
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 列表
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // 段落
    html = html.split('\n\n').map(p => {
        if (!p.match(/^<[h|u|o|l]/)) {
            return `<p>${p}</p>`;
        }
        return p;
    }).join('');

    return html;
}

// 调用AI API (模拟)
async function callAIAPI(prompt, type = 'chat') {
    // 这里需要集成真实的AI API
    // 为了兼容iOS，使用fetch API而不是XMLHttpRequest

    return new Promise((resolve) => {
        setTimeout(() => {
            const stylePrompt = getStylePrompt();
            const lengthPrompt = getLengthPrompt();

            if (type === 'chat') {
                resolve(getMockChatResponse(prompt));
            } else if (type === 'selection') {
                resolve(getMockSelectionResponse(prompt));
            }
        }, 1000);
    });

    // 真实API调用示例:
    /*
    try {
        const response = await fetch('YOUR_AI_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                style: AppState.aiStyle,
                length: AppState.aiLength,
                type: type
            })
        });

        if (!response.ok) {
            throw new Error('API请求失败');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        throw error;
    }
    */
}

// 获取风格提示词
function getStylePrompt() {
    const styles = {
        casual: '请用轻松幽默、亲切友好的语气回答',
        standard: '请用专业但不失亲和力的标准语气回答',
        scientific: '请用严谨科学、专业医学的语气回答'
    };
    return styles[AppState.aiStyle] || styles.standard;
}

// 获取长度提示词
function getLengthPrompt() {
    const lengths = {
        detailed: '请提供详细完整的回答',
        standard: '请提供适中长度的回答',
        concise: '请提供简洁精炼的回答'
    };
    return lengths[AppState.aiLength] || lengths.concise;
}

// 模拟AI回复
function getMockChatResponse(prompt) {
    const responses = {
        default: `感谢您的提问。关于"${prompt.substring(0, 30)}..."，这是一个很好的医美相关话题。\n\n## 专业分析\n\n医美是一个综合性很强的领域，涉及医学、美学、心理学等多个维度。\n\n**关键要点：**\n- 个性化方案的重要性\n- 医患沟通的必要性\n- 合理期望的管理\n\n如需更详细的解答，欢迎继续提问。`
    };

    return responses.default;
}

// 模拟划词AI回复
function getMockSelectionResponse(text) {
    return `关于"${text}"的解释：\n\n这是医美领域的一个重要概念，涉及到专业的医学知识和美学原理。建议咨询专业医生获取更详细的个性化建议。`;
}

// 生成图片 - 使用 Gemini 2.5 Flash Image (Nano Banana)
async function generateImage() {
    const prompt = document.getElementById('imagePrompt').value.trim();

    if (!prompt) {
        alert('请输入图片描述');
        return;
    }

    // 检查API密钥配置
    const apiKey = AppState.geminiApiKey || localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        const userInput = prompt('请输入您的 Gemini API Key\n\n获取地址: https://aistudio.google.com/apikey\n\n输入后将保存到本地存储（仅保存在您的浏览器中）');
        if (userInput && userInput.trim()) {
            localStorage.setItem('gemini_api_key', userInput.trim());
            AppState.geminiApiKey = userInput.trim();
        } else {
            alert('未配置API Key，无法生成图片');
            return;
        }
    }

    showLoading();

    try {
        // 调用 Gemini 2.5 Flash Image API (Nano Banana)
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            text: `请生成一张与医美相关的图片：${prompt}`
                        }
                    ]
                }],
                generationConfig: {
                    responseModalities: ['image']
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API请求失败: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        // 从响应中提取图片数据 (base64)
        const imagePart = data.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (!imagePart || !imagePart.inlineData) {
            throw new Error('API返回的数据中没有图片');
        }

        const imageBase64 = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType || 'image/png';
        const imageUrl = `data:${mimeType};base64,${imageBase64}`;

        // 显示生成的图片
        const imageResult = document.getElementById('imageResult');
        imageResult.innerHTML = `
            <div style="text-align: center;">
                <img src="${imageUrl}" alt="生成的图片" style="max-width: 100%; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <p style="margin-top: var(--spacing-md); color: var(--color-text-secondary); font-size: 0.9rem;">
                    <i class="ri-lightbulb-line"></i> ${prompt}
                </p>
            </div>
        `;

        // 显示导出按钮
        document.getElementById('exportSection').style.display = 'flex';

        // 保存到历史
        saveToHistory('image', prompt, imageUrl);

    } catch (error) {
        console.error('图片生成失败:', error);

        const imageResult = document.getElementById('imageResult');
        imageResult.innerHTML = `
            <div style="padding: 40px; text-align: center; color: var(--color-text-secondary);">
                <i class="ri-error-warning-line" style="font-size: 64px; color: var(--color-accent);"></i>
                <p style="margin-top: 16px; color: var(--color-text);">图片生成失败</p>
                <p style="font-size: 0.9rem; margin-top: 8px;">${error.message}</p>
                <button onclick="clearApiKey()" style="
                    margin-top: var(--spacing-lg);
                    padding: var(--spacing-sm) var(--spacing-lg);
                    background: var(--color-primary);
                    color: var(--color-surface);
                    border: none;
                    border-radius: var(--radius-sm);
                    cursor: pointer;
                ">
                    <i class="ri-key-line"></i> 重新配置API Key
                </button>
            </div>
        `;
    } finally {
        hideLoading();
    }
}

// 清除API Key
function clearApiKey() {
    if (confirm('确定要清除已保存的 API Key 吗？')) {
        localStorage.removeItem('gemini_api_key');
        AppState.geminiApiKey = null;
        alert('API Key 已清除，下次生成图片时需要重新输入');
    }
}

// 导出报告
function exportReport(format) {
    if (format === 'png') {
        exportAsPNG();
    } else if (format === 'pdf') {
        exportAsPDF();
    }
}

// 导出为PNG
function exportAsPNG() {
    // 这里需要使用html2canvas库
    alert('PNG导出功能需要集成 html2canvas 库');

    // 实现示例:
    /*
    import html2canvas from 'html2canvas';

    const element = document.getElementById('imageResult');
    html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.download = 'medbeauty-report.png';
        link.href = canvas.toDataURL();
        link.click();
    });
    */
}

// 导出为PDF
function exportAsPDF() {
    // 这里需要使用jsPDF库
    alert('PDF导出功能需要集成 jsPDF 库');

    // 实现示例:
    /*
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';

    const element = document.getElementById('imageResult');
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('medbeauty-report.pdf');
    });
    */
}

// 设置文本选择功能
function setupTextSelection() {
    const selectionPopup = document.getElementById('selectionPopup');
    let selectedText = '';

    document.addEventListener('mouseup', (e) => {
        const selection = window.getSelection();
        selectedText = selection.toString().trim();

        if (selectedText && selectedText.length > 0) {
            // 检查是否在AI输出的消息中
            const parentMessage = selection.anchorNode.parentElement.closest('.message.assistant');
            if (parentMessage) {
                showSelectionPopup(e.pageX, e.pageY, selectedText);
            } else {
                hideSelectionPopup();
            }
        } else {
            hideSelectionPopup();
        }
    });

    // 处理划词操作
    document.querySelectorAll('.popup-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const action = this.dataset.action;
            hideSelectionPopup();

            showLoading();

            try {
                let prompt = '';
                if (action === 'explain') {
                    prompt = `请解释: ${selectedText}`;
                } else if (action === 'expand') {
                    prompt = `请详细展开: ${selectedText}`;
                } else if (action === 'analyze') {
                    prompt = `请分析: ${selectedText}`;
                }

                const response = await callAIAPI(prompt, 'selection');
                addMessageToChat('assistant', response);

            } catch (error) {
                console.error('划词AI失败:', error);
            } finally {
                hideLoading();
            }
        });
    });

    // 点击其他地方隐藏弹窗
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.selection-popup')) {
            hideSelectionPopup();
        }
    });
}

// 显示选择弹窗
function showSelectionPopup(x, y, text) {
    const popup = document.getElementById('selectionPopup');
    popup.style.left = `${x}px`;
    popup.style.top = `${y - 50}px`;
    popup.classList.add('active');
    AppState.currentSelection = text;
}

// 隐藏选择弹窗
function hideSelectionPopup() {
    const popup = document.getElementById('selectionPopup');
    popup.classList.remove('active');
    AppState.currentSelection = null;
}

// 生成建议问题
function generateSuggestedQuestions() {
    const container = document.getElementById('suggestedQuestions');
    const questions = [
        '什么是医美神话叙事学？',
        '如何评估自己的医美需求？',
        '医美咨询中需要注意什么？',
        '如何选择合适的医美项目？'
    ];

    let html = '<h4>建议话题：</h4>';
    questions.forEach(q => {
        html += `<button class="question-btn"><i class="ri-chat-3-line"></i>${q}</button>`;
    });

    container.innerHTML = html;

    // 添加点击事件
    container.querySelectorAll('.question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent.trim();
            document.getElementById('chatInput').value = question;
            sendMessage();
        });
    });
}

// 保存历史记录
function saveToHistory(type, prompt, response) {
    const timestamp = new Date().toISOString();
    const item = {
        id: Date.now(),
        timestamp,
        prompt,
        response
    };

    if (type === 'chat') {
        AppState.chatHistory.unshift(item);
        AppState.chatHistory = AppState.chatHistory.slice(0, 50); // 保留最近50条
        localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(AppState.chatHistory));
    } else if (type === 'image') {
        AppState.imageHistory.unshift(item);
        AppState.imageHistory = AppState.imageHistory.slice(0, 30); // 保留最近30条
        localStorage.setItem(STORAGE_KEYS.IMAGE_HISTORY, JSON.stringify(AppState.imageHistory));
    }

    updateHistoryDisplay();
}

// 加载历史记录
function loadHistory() {
    const chatHistory = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    const imageHistory = localStorage.getItem(STORAGE_KEYS.IMAGE_HISTORY);

    if (chatHistory) {
        AppState.chatHistory = JSON.parse(chatHistory);
    }
    if (imageHistory) {
        AppState.imageHistory = JSON.parse(imageHistory);
    }

    updateHistoryDisplay();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    // 更新聊天历史
    const chatHistoryContainer = document.getElementById('chatHistory');
    if (AppState.chatHistory.length === 0) {
        chatHistoryContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-tertiary); padding: 40px;">暂无聊天历史</p>';
    } else {
        chatHistoryContainer.innerHTML = AppState.chatHistory.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-item-header">
                    <span class="history-item-time">${formatTime(item.timestamp)}</span>
                </div>
                <div class="history-item-content">${item.prompt}</div>
            </div>
        `).join('');

        // 添加点击事件
        chatHistoryContainer.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                loadChatHistoryItem(id);
            });
        });
    }

    // 更新图片历史
    const imageHistoryContainer = document.getElementById('imageHistory');
    if (AppState.imageHistory.length === 0) {
        imageHistoryContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-tertiary); padding: 40px;">暂无图片历史</p>';
    } else {
        imageHistoryContainer.innerHTML = AppState.imageHistory.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-item-header">
                    <span class="history-item-time">${formatTime(item.timestamp)}</span>
                </div>
                <div class="history-item-content">${item.prompt}</div>
            </div>
        `).join('');

        // 添加点击事件
        imageHistoryContainer.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                loadImageHistoryItem(id);
            });
        });
    }
}

// 加载聊天历史项
function loadChatHistoryItem(id) {
    const item = AppState.chatHistory.find(h => h.id === id);
    if (item) {
        navigateToPage('chat');
        document.getElementById('chatInput').value = item.prompt;
    }
}

// 加载图片历史项
function loadImageHistoryItem(id) {
    const item = AppState.imageHistory.find(h => h.id === id);
    if (item) {
        navigateToPage('image');
        document.getElementById('imagePrompt').value = item.prompt;
    }
}

// 格式化时间
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) {
        return '刚刚';
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}小时前`;
    } else {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
}

// 显示加载状态
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

// 隐藏加载状态
function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

// 返回大纲按钮
document.addEventListener('DOMContentLoaded', function() {
    const backToOutlineBtn = document.getElementById('backToOutline');
    if (backToOutlineBtn) {
        backToOutlineBtn.addEventListener('click', function() {
            navigateToPage('home');
        });
    }
});

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// iOS兼容性增强
// 防止iOS Safari的双击缩放
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 防止iOS Safari的橡皮筋效果
document.addEventListener('touchmove', (e) => {
    if (e.target.closest('.chat-messages') || e.target.closest('.settings-panel')) {
        return;
    }
    // e.preventDefault(); // 注释掉以允许正常滚动
}, { passive: false });

// 确保iOS Safari中viewport高度正确
// 显示 API Key 状态消息
function showApiKeyStatus(message, type) {
    const statusDiv = document.getElementById('apiKeyStatus');
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = type === 'success' ? 'var(--color-primary-light)' : 'var(--color-accent-light)';
    statusDiv.style.color = type === 'success' ? 'var(--color-primary-dark)' : 'var(--color-accent)';

    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
