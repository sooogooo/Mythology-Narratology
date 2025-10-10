/**
 * 章节专属SVG插图库（懒加载优化版本）
 * 每章配有精心设计的可视化插图
 * 设计原则：细线条、克制用色、黑白灰为主、避免拥挤
 *
 * 优化策略：
 * - SVG文件已分离到 illustrations/ 目录
 * - 按需加载，减少首次加载时间
 * - 使用缓存避免重复加载
 */

const ChapterIllustrations = {
    // 缓存已加载的插图
    cache: {},

    // 可用的插图列表
    available: [
        'foreword', 'preface', 'afterword', 'appendix', 'essay',
        'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5',
        'chapter6', 'chapter7', 'chapter8', 'chapter9', 'chapter10'
    ],

    // concepts子目录下的概念配图列表
    concepts: [
        // 第一章（4个）
        'aphrodite-birth', 'beauty-cultures', 'narrative-framework',
        'beauty-evolution-timeline',
        // 第二章（4个）
        'hero-journey', 'conflict-resolution', 'emotional-resonance',
        'anxiety-solution-cycle',
        // 第三章（5个）
        'golden-ratio', 'culture-spectrum', 'psychology-maze', 'power-pyramid',
        'beauty-dimensions',
        // 第四章（4个）
        'visual-timeline', 'text-narrative-tree', 'multimodal-network',
        'before-after-narrative',
        // 第五章（4个）
        'brand-archetypes', 'myth-spiral', 'ip-personality',
        'brand-emotion-bridge',
        // 第六章（4个）
        'listening-funnel', 'reframing', 'co-creation',
        'consultation-dialogue',
        // 第七章（4个）
        'social-network', 'data-personalization', 'virtual-real',
        'digital-ecosystem',
        // 第八章（4个）
        'truth-balance', 'empowerment-paradox', 'age-protection',
        'ethics-decision-tree',
        // 第九章（4个）
        'global-brands', 'domestic-innovation', 'ip-growth',
        'success-elements-radar',
        // 第十章（4个）
        'tech-tree', 'values-web', 'responsible-ecosystem',
        'future-vision-panorama'
    ],

    /**
     * 加载指定插图
     * @param {string} illustrationId - 插图ID
     * @returns {Promise<string>} SVG内容
     */
    async load(illustrationId) {
        // 检查缓存
        if (this.cache[illustrationId]) {
            return this.cache[illustrationId];
        }

        // 确定插图路径
        let path = null;
        if (this.available.includes(illustrationId)) {
            // 章节主配图
            path = `illustrations/${illustrationId}.svg`;
        } else if (this.concepts.includes(illustrationId)) {
            // 概念配图
            path = `illustrations/concepts/${illustrationId}.svg`;
        } else {
            console.warn(`插图 ${illustrationId} 不存在`);
            return null;
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load illustration: ${illustrationId}`);
            }

            const svg = await response.text();

            // 缓存
            this.cache[illustrationId] = svg;

            return svg;
        } catch (error) {
            console.error(`加载插图失败: ${illustrationId}`, error);
            return null;
        }
    },

    /**
     * 预加载插图
     * @param {string[]} illustrationIds - 要预加载的插图ID列表
     */
    async preload(illustrationIds) {
        const promises = illustrationIds.map(id => this.load(id));
        await Promise.all(promises);
    },

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache = {};
    }
};

/**
 * 渲染章节插图
 * @param {string} illustrationId - 插图ID
 * @param {Object} options - 渲染选项
 * @param {boolean} options.clickable - 是否可点击放大
 * @param {string} options.style - 自定义样式
 * @returns {string} HTML字符串
 */
async function renderChapterIllustration(illustrationId, options = {}) {
    const {
        clickable = true,
        style = ''
    } = options;

    // 加载SVG
    const svg = await ChapterIllustrations.load(illustrationId);

    if (!svg) {
        return '';
    }

    const containerId = `illustration-${illustrationId}-${Date.now()}`;
    const clickClass = clickable ? 'illustration-clickable' : '';
    const clickAttr = clickable ? 'data-zoom="true"' : '';

    return `
        <div id="${containerId}"
             class="chapter-illustration ${clickClass}"
             ${clickAttr}
             style="${style}">
            ${svg}
        </div>
    `;
}

// 为向后兼容保留的同步渲染函数（返回占位符，异步加载）
function renderChapterIllustrationSync(illustrationId, options = {}) {
    const {
        clickable = true,
        style = ''
    } = options;

    const containerId = `illustration-${illustrationId}-${Date.now()}`;
    const clickClass = clickable ? 'illustration-clickable' : '';
    const clickAttr = clickable ? 'data-zoom="true"' : '';

    // 创建占位符
    const placeholder = `
        <div id="${containerId}"
             class="chapter-illustration ${clickClass}"
             ${clickAttr}
             style="${style}">
            <div class="illustration-loading">
                <i class="ri-loader-4-line"></i>
                <p>加载插图中...</p>
            </div>
        </div>
    `;

    // 异步加载并替换占位符
    setTimeout(async () => {
        const svg = await ChapterIllustrations.load(illustrationId);
        if (svg) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = svg;

                // 添加点击放大功能
                if (clickable && typeof ImageViewer !== 'undefined') {
                    const svgElement = container.querySelector('svg');
                    if (svgElement) {
                        svgElement.style.cursor = 'pointer';
                        svgElement.addEventListener('click', () => {
                            // 将SVG转换为base64用于查看
                            const svgData = new XMLSerializer().serializeToString(svgElement);
                            const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
                            const svgUrl = `data:image/svg+xml;base64,${svgBase64}`;

                            ImageViewer.open(svgUrl, `章节插图 - ${illustrationId}`, 'svg');
                        });
                    }
                }
            }
        }
    }, 10);

    return placeholder;
}
