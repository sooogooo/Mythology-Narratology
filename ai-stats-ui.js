/**
 * AI Token使用统计UI组件
 */

const AIStatsUI = {
    /**
     * 渲染模型连通性测试界面
     * @param {string} containerId - 容器ID
     */
    renderConnectivityTest(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const models = AIModels.getAllModels('all');

        let html = `
            <div class="connectivity-test" style="padding: var(--spacing-lg);">
                <h3 style="margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
                    <i class="ri-wifi-line"></i>
                    模型连通性测试
                </h3>

                <div class="model-test-list">
        `;

        Object.entries(models).forEach(([modelId, model]) => {
            html += `
                <div class="model-test-item" data-model-id="${modelId}" style="
                    padding: var(--spacing-md);
                    margin-bottom: var(--spacing-sm);
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-weight: 500; margin-bottom: var(--spacing-xs);">${model.name}</div>
                            <div style="font-size: 0.85rem; color: var(--color-text-secondary);">${model.provider}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                            <div class="test-status" data-model="${modelId}" style="
                                min-width: 60px;
                                text-align: center;
                                font-size: 0.85rem;
                                color: var(--color-text-tertiary);
                            ">
                                未测试
                            </div>
                            <button class="test-btn" data-model="${modelId}" style="
                                padding: var(--spacing-xs) var(--spacing-md);
                                background: var(--color-primary);
                                color: var(--color-surface);
                                border: none;
                                border-radius: var(--radius-sm);
                                cursor: pointer;
                                font-size: 0.85rem;
                            ">
                                <i class="ri-play-line"></i> 测试
                            </button>
                        </div>
                    </div>
                    <div class="test-result" data-model="${modelId}" style="
                        margin-top: var(--spacing-sm);
                        font-size: 0.85rem;
                        display: none;
                    "></div>
                </div>
            `;
        });

        html += `
                </div>
                <div style="margin-top: var(--spacing-lg); text-align: center;">
                    <button id="testAllModels" style="
                        padding: var(--spacing-sm) var(--spacing-lg);
                        background: var(--color-accent);
                        color: var(--color-surface);
                        border: none;
                        border-radius: var(--radius-md);
                        cursor: pointer;
                    ">
                        <i class="ri-play-list-line"></i> 测试所有模型
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // 绑定事件
        container.querySelectorAll('.test-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const modelId = e.currentTarget.dataset.model;
                await this.testModel(modelId);
            });
        });

        container.querySelector('#testAllModels')?.addEventListener('click', async () => {
            for (const modelId of Object.keys(models)) {
                await this.testModel(modelId);
                await new Promise(resolve => setTimeout(resolve, 500)); // 间隔500ms
            }
        });
    },

    /**
     * 测试单个模型
     * @param {string} modelId - 模型ID
     */
    async testModel(modelId) {
        const statusEl = document.querySelector(`.test-status[data-model="${modelId}"]`);
        const resultEl = document.querySelector(`.test-result[data-model="${modelId}"]`);
        const btnEl = document.querySelector(`.test-btn[data-model="${modelId}"]`);

        if (!statusEl || !resultEl || !btnEl) return;

        // 显示测试中状态
        statusEl.textContent = '测试中...';
        statusEl.style.color = 'var(--color-primary)';
        btnEl.disabled = true;
        btnEl.style.opacity = '0.5';
        resultEl.style.display = 'none';

        try {
            const result = await AIModels.testConnectivity(modelId);

            if (result.success) {
                statusEl.innerHTML = '<i class="ri-checkbox-circle-fill"></i> 连接成功';
                statusEl.style.color = '#4caf50';
                resultEl.innerHTML = `<span style="color: var(--color-text-secondary);">延迟: ${result.latency}ms</span>`;
                resultEl.style.display = 'block';

                if (typeof Toast !== 'undefined') {
                    Toast.success(`${AIModels.presets[modelId]?.name || modelId} 连接成功`);
                }
            } else {
                statusEl.innerHTML = '<i class="ri-close-circle-fill"></i> 连接失败';
                statusEl.style.color = '#f44336';
                resultEl.innerHTML = `<span style="color: #f44336;">${result.error}</span>`;
                resultEl.style.display = 'block';

                if (typeof Toast !== 'undefined') {
                    Toast.error(`${AIModels.presets[modelId]?.name || modelId}: ${result.error}`);
                }
            }
        } catch (error) {
            statusEl.innerHTML = '<i class="ri-error-warning-fill"></i> 测试失败';
            statusEl.style.color = '#f44336';
            resultEl.innerHTML = `<span style="color: #f44336;">${error.message}</span>`;
            resultEl.style.display = 'block';
        } finally {
            btnEl.disabled = false;
            btnEl.style.opacity = '1';
        }
    },

    /**
     * 渲染Token使用统计
     * @param {string} containerId - 容器ID
     */
    renderTokenStats(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const allStats = AIModels.tokenStats.getAll();
        const statsArray = Object.entries(allStats).map(([modelId, stats]) => {
            const model = AIModels.presets[modelId] || AIModels.customModels[modelId];
            return {
                id: modelId,
                name: model?.name || modelId,
                ...stats
            };
        });

        // 按总token数排序
        statsArray.sort((a, b) => b.totalTokens - a.totalTokens);

        let html = `
            <div class="token-stats" style="padding: var(--spacing-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg);">
                    <h3 style="margin: 0; display: flex; align-items: center; gap: var(--spacing-sm);">
                        <i class="ri-bar-chart-box-line"></i>
                        Token使用统计
                    </h3>
                    <div style="display: flex; gap: var(--spacing-sm);">
                        <button id="exportStatsBtn" style="
                            padding: var(--spacing-xs) var(--spacing-md);
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-sm);
                            cursor: pointer;
                            font-size: 0.85rem;
                        ">
                            <i class="ri-download-line"></i> 导出
                        </button>
                        <button id="clearStatsBtn" style="
                            padding: var(--spacing-xs) var(--spacing-md);
                            background: var(--color-surface);
                            border: 1px solid var(--color-border);
                            border-radius: var(--radius-sm);
                            cursor: pointer;
                            font-size: 0.85rem;
                            color: #f44336;
                        ">
                            <i class="ri-delete-bin-line"></i> 清空
                        </button>
                    </div>
                </div>
        `;

        if (statsArray.length === 0) {
            html += `
                <div style="
                    text-align: center;
                    padding: var(--spacing-xl);
                    color: var(--color-text-secondary);
                ">
                    <i class="ri-inbox-line" style="font-size: 3rem; opacity: 0.3;"></i>
                    <p>暂无使用记录</p>
                </div>
            `;
        } else {
            // 总计
            const totalTokens = statsArray.reduce((sum, s) => sum + s.totalTokens, 0);
            const totalRequests = statsArray.reduce((sum, s) => sum + s.requests, 0);

            html += `
                <div class="stats-summary" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: var(--spacing-md);
                    margin-bottom: var(--spacing-lg);
                    padding: var(--spacing-md);
                    background: var(--color-bg-secondary);
                    border-radius: var(--radius-md);
                ">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--color-primary);">
                            ${totalTokens.toLocaleString()}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-secondary);">总Token数</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--color-primary);">
                            ${totalRequests.toLocaleString()}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-secondary);">总请求数</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--color-primary);">
                            ${statsArray.length}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--color-text-secondary);">使用模型数</div>
                    </div>
                </div>

                <div class="stats-chart" id="tokenStatsChart" style="margin-bottom: var(--spacing-lg);"></div>

                <div class="stats-list">
            `;

            statsArray.forEach(stats => {
                const lastUsedStr = stats.lastUsed
                    ? new Date(stats.lastUsed).toLocaleString('zh-CN')
                    : '从未使用';

                html += `
                    <div class="stats-item" style="
                        padding: var(--spacing-md);
                        margin-bottom: var(--spacing-sm);
                        background: var(--color-surface);
                        border: 1px solid var(--color-border);
                        border-radius: var(--radius-md);
                    ">
                        <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
                            <div style="font-weight: 500;">${stats.name}</div>
                            <div style="color: var(--color-primary); font-weight: 600;">
                                ${stats.totalTokens.toLocaleString()} tokens
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: var(--spacing-sm); font-size: 0.85rem; color: var(--color-text-secondary);">
                            <div>输入: ${(stats.inputTokens || 0).toLocaleString()}</div>
                            <div>输出: ${(stats.outputTokens || 0).toLocaleString()}</div>
                            <div>请求: ${stats.requests.toLocaleString()}次</div>
                            <div>最后使用: ${lastUsedStr}</div>
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
        }

        html += `</div>`;

        container.innerHTML = html;

        // 渲染图表
        if (statsArray.length > 0 && typeof DataCharts !== 'undefined') {
            const chartData = statsArray.slice(0, 5).map(s => ({
                label: s.name,
                value: s.totalTokens
            }));

            DataCharts.render('tokenStatsChart', 'bar', chartData, {
                title: 'Token使用量 Top 5',
                color: '#666',
                showValues: true
            });
        }

        // 绑定导出按钮
        container.querySelector('#exportStatsBtn')?.addEventListener('click', () => {
            const report = AIModels.tokenStats.exportReport();
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `token-stats-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            if (typeof Toast !== 'undefined') {
                Toast.success('统计报告已导出');
            }
        });

        // 绑定清空按钮
        container.querySelector('#clearStatsBtn')?.addEventListener('click', () => {
            if (confirm('确定要清空所有Token使用统计吗？')) {
                AIModels.tokenStats.clear();
                this.renderTokenStats(containerId);

                if (typeof Toast !== 'undefined') {
                    Toast.success('统计已清空');
                }
            }
        });
    },

    /**
     * 自动初始化
     */
    init() {
        // 如果页面上有对应容器，自动渲染
        if (document.getElementById('connectivityTestContainer')) {
            this.renderConnectivityTest('connectivityTestContainer');
        }
        if (document.getElementById('tokenStatsContainer')) {
            this.renderTokenStats('tokenStatsContainer');
        }
    }
};

// 页面加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AIStatsUI.init();
    });
} else {
    AIStatsUI.init();
}
