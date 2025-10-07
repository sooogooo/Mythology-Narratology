/**
 * API Keys 管理模块
 * 提供可视化的API密钥管理界面
 */

const APIKeysManager = {
    /**
     * 初始化API Keys管理器
     */
    init() {
        // 绑定"管理 API Keys"按钮
        const manageBtn = document.getElementById('manageApiKeysBtn');
        if (manageBtn) {
            manageBtn.addEventListener('click', () => {
                this.openModal();
            });
        }

        // 绑定关闭按钮
        const closeBtn = document.getElementById('closeApiKeysModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // 点击遮罩层关闭
        const modal = document.getElementById('apiKeysModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    },

    /**
     * 打开模态窗口
     */
    openModal() {
        const modal = document.getElementById('apiKeysModal');
        if (!modal) return;

        // 渲染内容
        this.renderContent();

        // 显示模态窗口
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    /**
     * 关闭模态窗口
     */
    closeModal() {
        const modal = document.getElementById('apiKeysModal');
        if (!modal) return;

        modal.style.display = 'none';
        document.body.style.overflow = '';
    },

    /**
     * 渲染API Keys管理内容
     */
    renderContent() {
        const container = document.getElementById('apiKeysModalBody');
        if (!container) return;

        // 获取所有支持的提供商
        const providers = [
            { id: 'google', name: 'Google (Gemini)', models: ['Gemini 2.5 Flash', 'Gemini 2.5 Flash Image'] },
            { id: 'openai', name: 'OpenAI', models: ['GPT-4', 'GPT-3.5 Turbo'] },
            { id: 'anthropic', name: 'Anthropic (Claude)', models: ['Claude 3.5 Sonnet'] }
        ];

        let html = `
            <div style="padding: var(--spacing-md);">
                <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-lg); line-height: 1.6;">
                    <i class="ri-information-line"></i>
                    API密钥将安全存储在您的浏览器本地，不会上传到任何服务器。
                </p>
        `;

        providers.forEach(provider => {
            const currentKey = AIModels.getApiKey(provider.id);
            const hasKey = currentKey && currentKey.length > 0;

            html += `
                <div class="api-key-section" style="
                    margin-bottom: var(--spacing-lg);
                    padding: var(--spacing-lg);
                    background: var(--color-bg-secondary);
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md);">
                        <div>
                            <h4 style="margin: 0 0 var(--spacing-xs) 0; font-size: 1rem; color: var(--color-text);">
                                ${provider.name}
                            </h4>
                            <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-secondary);">
                                ${provider.models.join(', ')}
                            </p>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                            ${hasKey ? '<i class="ri-checkbox-circle-fill" style="color: #4caf50; font-size: 1.2rem;"></i>' : '<i class="ri-close-circle-fill" style="color: #999; font-size: 1.2rem;"></i>'}
                            <span style="font-size: 0.85rem; color: ${hasKey ? '#4caf50' : '#999'};">
                                ${hasKey ? '已配置' : '未配置'}
                            </span>
                        </div>
                    </div>

                    <div style="display: flex; gap: var(--spacing-sm);">
                        <input
                            type="password"
                            id="apiKey_${provider.id}"
                            placeholder="${hasKey ? '••••••••••••••••' : '输入 API Key'}"
                            value="${hasKey ? currentKey : ''}"
                            style="
                                flex: 1;
                                padding: var(--spacing-sm) var(--spacing-md);
                                border: 1px solid var(--color-border);
                                border-radius: var(--radius-sm);
                                background: var(--color-surface);
                                color: var(--color-text);
                                font-size: 0.9rem;
                                font-family: monospace;
                            "
                        />
                        <button
                            onclick="APIKeysManager.toggleVisibility('${provider.id}')"
                            style="
                                padding: var(--spacing-sm) var(--spacing-md);
                                background: var(--color-surface);
                                border: 1px solid var(--color-border);
                                border-radius: var(--radius-sm);
                                cursor: pointer;
                                color: var(--color-text-secondary);
                            "
                            title="显示/隐藏"
                        >
                            <i class="ri-eye-line"></i>
                        </button>
                        <button
                            onclick="APIKeysManager.saveKey('${provider.id}')"
                            style="
                                padding: var(--spacing-sm) var(--spacing-lg);
                                background: var(--color-primary);
                                color: var(--color-surface);
                                border: none;
                                border-radius: var(--radius-sm);
                                cursor: pointer;
                                font-size: 0.9rem;
                            "
                        >
                            <i class="ri-save-line"></i> 保存
                        </button>
                        ${hasKey ? `
                        <button
                            onclick="APIKeysManager.clearKey('${provider.id}')"
                            style="
                                padding: var(--spacing-sm) var(--spacing-md);
                                background: var(--color-surface);
                                color: #f44336;
                                border: 1px solid #f44336;
                                border-radius: var(--radius-sm);
                                cursor: pointer;
                            "
                            title="清除"
                        >
                            <i class="ri-delete-bin-line"></i>
                        </button>
                        ` : ''}
                    </div>

                    <div style="margin-top: var(--spacing-sm);">
                        <a href="${this.getProviderUrl(provider.id)}"
                           target="_blank"
                           style="
                               font-size: 0.85rem;
                               color: var(--color-primary);
                               text-decoration: none;
                               display: inline-flex;
                               align-items: center;
                               gap: 4px;
                           ">
                            <i class="ri-external-link-line"></i>
                            获取 ${provider.name} API Key
                        </a>
                    </div>
                </div>
            `;
        });

        html += `
                <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background: var(--color-bg); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
                    <h4 style="margin: 0 0 var(--spacing-sm) 0; font-size: 0.9rem; color: var(--color-text);">
                        <i class="ri-shield-check-line"></i> 安全说明
                    </h4>
                    <ul style="margin: 0; padding-left: var(--spacing-lg); font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.8;">
                        <li>API密钥存储在浏览器localStorage中</li>
                        <li>密钥不会发送到除官方API以外的任何服务器</li>
                        <li>清除浏览器数据会同时清除密钥</li>
                        <li>建议定期更换API密钥以保证安全</li>
                    </ul>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * 获取API Key获取页面链接
     */
    getProviderUrl(providerId) {
        const urls = {
            'google': 'https://makersuite.google.com/app/apikey',
            'openai': 'https://platform.openai.com/api-keys',
            'anthropic': 'https://console.anthropic.com/settings/keys'
        };
        return urls[providerId] || '#';
    },

    /**
     * 切换密钥可见性
     */
    toggleVisibility(providerId) {
        const input = document.getElementById(`apiKey_${providerId}`);
        if (!input) return;

        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    },

    /**
     * 保存API密钥
     */
    saveKey(providerId) {
        const input = document.getElementById(`apiKey_${providerId}`);
        if (!input) return;

        const apiKey = input.value.trim();

        if (!apiKey) {
            if (typeof Toast !== 'undefined') {
                Toast.error('请输入API Key');
            } else {
                alert('请输入API Key');
            }
            return;
        }

        // 简单验证API Key格式
        if (apiKey.length < 20) {
            if (typeof Toast !== 'undefined') {
                Toast.error('API Key格式不正确（长度过短）');
            } else {
                alert('API Key格式不正确');
            }
            return;
        }

        // 保存到localStorage
        AIModels.saveApiKey(providerId, apiKey);

        // 显示成功提示
        if (typeof Toast !== 'undefined') {
            Toast.success('API Key 已保存');
        } else {
            alert('API Key 已保存');
        }

        // 刷新显示
        setTimeout(() => {
            this.renderContent();
        }, 500);
    },

    /**
     * 清除API密钥
     */
    clearKey(providerId) {
        if (!confirm('确定要清除此API Key吗？')) {
            return;
        }

        // 清除localStorage
        AIModels.clearApiKey(providerId);

        // 显示成功提示
        if (typeof Toast !== 'undefined') {
            Toast.success('API Key 已清除');
        } else {
            alert('API Key 已清除');
        }

        // 刷新显示
        this.renderContent();
    }
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        APIKeysManager.init();
    });
} else {
    APIKeysManager.init();
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.APIKeysManager = APIKeysManager;
}
