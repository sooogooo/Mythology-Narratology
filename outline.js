// 书籍大纲数据（动态加载）
let bookOutline = null;

// 加载书籍数据
async function loadBookData() {
    if (bookOutline) {
        return bookOutline;
    }

    try {
        const response = await fetch('book-data.json');
        if (!response.ok) {
            throw new Error('Failed to load book data');
        }
        bookOutline = await response.json();
        return bookOutline;
    } catch (error) {
        console.error('加载书籍数据失败:', error);
        // 返回空数据结构防止应用崩溃
        return {
            title: "医美神话叙事学",
            totalWords: 150000,
            chapters: []
        };
    }
}

// 渲染大纲到页面
async function renderOutline() {
    const container = document.getElementById('outlineContent');
    if (!container) return;

    // 先加载书籍数据
    await loadBookData();

    let html = '';

    // 添加首页插画装饰
    html += `
        <div class="hero-illustration" style="margin-bottom: var(--spacing-xl);">
            <div id="heroIllustration"></div>
        </div>
    `;

    // 添加序言章节（与正文相同样式）
    html += `
        <div class="chapter intro-chapter" data-chapter-id="foreword">
            <div class="chapter-header">
                <div>
                    <h3 class="chapter-title">
                        ${renderSVGIcon('narrative', 'story', '', 'margin-right: 8px; font-size: 1.2rem;')}
                        序言
                        <span style="color: var(--color-primary); margin-left: 8px; font-size: 0.9rem;">📖 推荐阅读</span>
                    </h3>
                </div>
                <i class="ri-arrow-down-s-line toggle-icon"></i>
            </div>
            <div class="chapter-content">
                <div class="section-item">
                    <p class="section-description">从医美叙事学的视角，探讨美的发现与讲述，为全书奠定理论基础。</p>
                </div>
                <div style="margin-top: var(--spacing-lg); text-align: center;">
                    <button class="read-chapter-btn" data-chapter="foreword" style="
                        display: inline-flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        padding: var(--spacing-md) var(--spacing-xl);
                        background: var(--color-primary);
                        color: var(--color-surface);
                        border: none;
                        border-radius: var(--radius-md);
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all var(--transition-fast);
                    ">
                        <i class="ri-book-read-line"></i>
                        阅读序言
                    </button>
                </div>
            </div>
        </div>
    `;

    // 添加前言章节（与正文相同样式）
    html += `
        <div class="chapter intro-chapter" data-chapter-id="preface">
            <div class="chapter-header">
                <div>
                    <h3 class="chapter-title">
                        ${renderSVGIcon('narrative', 'dialogue', '', 'margin-right: 8px; font-size: 1.2rem;')}
                        前言
                        <span style="color: var(--color-primary); margin-left: 8px; font-size: 0.9rem;">✍️ 作者自述</span>
                    </h3>
                </div>
                <i class="ri-arrow-down-s-line toggle-icon"></i>
            </div>
            <div class="chapter-content">
                <div class="section-item">
                    <p class="section-description">本书的写作缘起、研究历程、方法论说明以及致谢。重庆江北城与北京团结湖，2022春至2025秋。</p>
                </div>
                <div style="margin-top: var(--spacing-lg); text-align: center;">
                    <button class="read-chapter-btn" data-chapter="preface" style="
                        display: inline-flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        padding: var(--spacing-md) var(--spacing-xl);
                        background: var(--color-primary);
                        color: var(--color-surface);
                        border: none;
                        border-radius: var(--radius-md);
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all var(--transition-fast);
                    ">
                        <i class="ri-book-read-line"></i>
                        阅读前言
                    </button>
                </div>
            </div>
        </div>
    `;

    // 添加章节分隔装饰
    html += `
        <div style="text-align: center; margin: var(--spacing-xl) 0;">
            ${renderSVGIcon('chapter', 'ornament1', '', 'font-size: 2rem; opacity: 0.6;')}
        </div>
    `;

    bookOutline.chapters.forEach(chapter => {
        html += `
            <div class="chapter" data-chapter-id="${chapter.id}">
                <div class="chapter-header">
                    <div>
                        <h3 class="chapter-title">${chapter.title}${chapter.id >= 1 && chapter.id <= 10 ? ' <span style="color: var(--color-primary); margin-left: 8px; font-size: 0.9rem;">📖 已完成</span>' : ''}</h3>
                    </div>
                    <i class="ri-arrow-down-s-line toggle-icon"></i>
                </div>
                <div class="chapter-content">
                    ${chapter.sections.map(section => `
                        <div class="section-item">
                            <div class="section-header">
                                <span class="section-number">${section.number}</span>
                                <h4 class="section-title-text">${section.title}</h4>
                            </div>
                            <p class="section-description">${section.description}</p>
                            ${section.keyPoints ? `
                                <div class="key-points">
                                    <ul>
                                        ${section.keyPoints.map(point => `<li>${point}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                    ${chapter.id >= 1 && chapter.id <= 10 ? `
                        <div style="margin-top: var(--spacing-lg); text-align: center;">
                            <button class="read-chapter-btn" data-chapter="${chapter.id}" style="
                                display: inline-flex;
                                align-items: center;
                                gap: var(--spacing-sm);
                                padding: var(--spacing-md) var(--spacing-xl);
                                background: var(--color-primary);
                                color: var(--color-surface);
                                border: none;
                                border-radius: var(--radius-md);
                                font-size: 1rem;
                                cursor: pointer;
                                transition: all var(--transition-fast);
                            ">
                                <i class="ri-book-read-line"></i>
                                阅读本章
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    // 添加章节分隔装饰
    html += `
        <div style="text-align: center; margin: var(--spacing-xl) 0;">
            ${renderSVGIcon('chapter', 'divider', '', 'font-size: 2rem; opacity: 0.6;')}
        </div>
    `;

    // 添加后记、附录和专题文章部分
    html += `
        <div class="special-chapters-end" style="margin-top: var(--spacing-xl); padding-top: var(--spacing-xl);">
            <h3 style="text-align: center; color: var(--color-text); margin-bottom: var(--spacing-lg); font-size: 1.2rem; display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm);">
                ${renderSVGIcon('beauty', 'lotus', '', 'font-size: 1.5rem;')}
                <span>补充内容</span>
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-lg);">
                <div class="special-chapter-card" style="
                    padding: var(--spacing-xl);
                    background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-secondary) 100%);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-base);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                ">
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
                        <i class="ri-edit-box-line" style="color: var(--color-primary); font-size: 1.8rem;"></i>
                        <h4 style="margin: 0; font-size: 1.15rem; color: var(--color-text); font-weight: 500;">后记</h4>
                    </div>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-md); line-height: 1.6;">
                        研究的心路历程，写作过程的挑战与收获，以及对未来的思考与展望。
                    </p>
                    <button class="read-chapter-btn" data-chapter="afterword" style="
                        display: inline-flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        padding: var(--spacing-sm) var(--spacing-lg);
                        background: var(--color-primary);
                        color: var(--color-surface);
                        border: none;
                        border-radius: var(--radius-sm);
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: all var(--transition-fast);
                        width: 100%;
                        justify-content: center;
                    ">
                        <i class="ri-book-open-line"></i>
                        阅读后记
                    </button>
                </div>

                <div class="special-chapter-card" style="
                    padding: var(--spacing-xl);
                    background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-secondary) 100%);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-base);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                ">
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
                        <i class="ri-book-2-line" style="color: var(--color-primary); font-size: 1.8rem;"></i>
                        <h4 style="margin: 0; font-size: 1.15rem; color: var(--color-text); font-weight: 500;">附录</h4>
                    </div>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-md); line-height: 1.6;">
                        术语表、研究方法说明、延伸阅读推荐和相关资源索引。
                    </p>
                    <button class="read-chapter-btn" data-chapter="appendix" style="
                        display: inline-flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        padding: var(--spacing-sm) var(--spacing-lg);
                        background: var(--color-primary);
                        color: var(--color-surface);
                        border: none;
                        border-radius: var(--radius-sm);
                        font-size: 0.9rem;
                        cursor: pointer;
                        transition: all var(--transition-fast);
                        width: 100%;
                        justify-content: center;
                    ">
                        <i class="ri-book-open-line"></i>
                        阅读附录
                    </button>
                </div>

                <div class="special-chapter-card" style="
                    padding: var(--spacing-xl);
                    background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 100%);
                    border: 2px solid var(--color-primary);
                    border-radius: var(--radius-lg);
                    transition: all var(--transition-base);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                ">
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-md);">
                        <i class="ri-lightbulb-flash-line" style="color: var(--color-primary); font-size: 1.8rem;"></i>
                        <h4 style="margin: 0; font-size: 1.15rem; color: var(--color-text); font-weight: 600;">专题文章</h4>
                    </div>
                    <h5 style="color: var(--color-primary-dark); font-size: 1rem; margin-bottom: var(--spacing-sm); line-height: 1.4;">
                        智能时代的医美神话与我们具身体验的精神慰籍
                    </h5>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-md); line-height: 1.6;">
                        深度探讨智能技术如何重构身体经验，医美如何成为现代人精神慰籍的来源。
                    </p>
                    <p style="color: var(--color-accent); font-size: 0.85rem; margin-bottom: var(--spacing-md);">
                        ⭐ 特别推荐
                    </p>
                    <button class="read-chapter-btn" data-chapter="essay" style="
                        display: inline-flex;
                        align-items: center;
                        gap: var(--spacing-sm);
                        padding: var(--spacing-md) var(--spacing-xl);
                        background: var(--color-primary);
                        color: var(--color-surface);
                        border: none;
                        border-radius: var(--radius-sm);
                        font-size: 0.95rem;
                        cursor: pointer;
                        transition: all var(--transition-fast);
                        width: 100%;
                        justify-content: center;
                        font-weight: 500;
                    ">
                        <i class="ri-star-line"></i>
                        阅读专题文章
                    </button>
                </div>
            </div>
        </div>
    `;

    // 添加快速访问区（移到页尾）
    html += `
        <div class="quick-access" style="
            margin: var(--spacing-xl) 0 0 0;
            padding: var(--spacing-xl) var(--spacing-lg);
            background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-surface) 100%);
            border-radius: var(--radius-lg);
            border: 1px solid var(--color-primary);
            text-align: center;
        ">
            <div style="margin-bottom: var(--spacing-md);">
                ${renderSVGIcon('ui', 'fullscreen', '', 'font-size: 2rem; color: var(--color-primary);')}
            </div>
            <h4 style="
                margin: 0 0 var(--spacing-sm) 0;
                color: var(--color-primary-dark);
                font-size: 1.1rem;
            ">
                快速访问
            </h4>
            <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-lg);">
                一键直达补充内容
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-sm); justify-content: center;">
                <button class="read-chapter-btn" data-chapter="afterword" style="
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: var(--color-surface);
                    color: var(--color-primary);
                    border: 1px solid var(--color-primary);
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    font-weight: 500;
                ">
                    <i class="ri-edit-box-line"></i>
                    后记
                </button>
                <button class="read-chapter-btn" data-chapter="appendix" style="
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: var(--color-surface);
                    color: var(--color-primary);
                    border: 1px solid var(--color-primary);
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    font-weight: 500;
                ">
                    <i class="ri-book-2-line"></i>
                    附录
                </button>
                <button class="read-chapter-btn" data-chapter="essay" style="
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: var(--color-primary);
                    color: var(--color-surface);
                    border: none;
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    font-weight: 600;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                ">
                    <i class="ri-star-line"></i>
                    专题文章
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // 渲染首页插画
    setTimeout(() => {
        const heroIllustration = document.getElementById('heroIllustration');
        if (heroIllustration) {
            heroIllustration.innerHTML = renderIllustration('concept', {
                clickable: false,
                style: 'max-width: 600px; margin: 0 auto;'
            });
        }
    }, 100);

    // 添加折叠/展开功能
    document.querySelectorAll('.chapter-header').forEach(header => {
        header.addEventListener('click', function() {
            const chapter = this.closest('.chapter');
            chapter.classList.toggle('expanded');
        });
    });

    // 添加阅读章节按钮事件
    document.querySelectorAll('.read-chapter-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const chapterIdStr = this.dataset.chapter;
            // 如果是数字字符串，转换为数字；否则保持字符串（用于 'foreword' 和 'preface'）
            const chapterId = /^\d+$/.test(chapterIdStr) ? parseInt(chapterIdStr) : chapterIdStr;
            loadChapter(chapterId);
        });

        btn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--color-primary-dark)';
            this.style.transform = 'translateY(-2px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--color-primary)';
            this.style.transform = 'translateY(0)';
        });
    });

    // 默认展开第一章
    const firstChapter = document.querySelector('.chapter');
    if (firstChapter) {
        firstChapter.classList.add('expanded');
    }
}

// 加载章节内容
async function loadChapter(chapterId) {
    // 确保书籍数据已加载
    await loadBookData();

    // 切换到章节阅读页面
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('chapterPage').classList.add('active');

    // 更新章节标题
    let chapterTitle = '';
    let fileName = '';

    if (chapterId === 'foreword') {
        chapterTitle = '序言';
        fileName = 'foreword.md';
    } else if (chapterId === 'preface') {
        chapterTitle = '前言';
        fileName = 'preface.md';
    } else if (chapterId === 'afterword') {
        chapterTitle = '后记';
        fileName = 'afterword.md';
    } else if (chapterId === 'appendix') {
        chapterTitle = '附录';
        fileName = 'appendix.md';
    } else if (chapterId === 'essay') {
        chapterTitle = '智能时代的医美神话与我们具身体验的精神慰籍';
        fileName = 'essay.md';
    } else {
        const chapter = bookOutline.chapters.find(c => c.id === chapterId);
        if (chapter) {
            chapterTitle = chapter.title;
            fileName = `chapter${chapterId}.md`;
        }
    }

    document.getElementById('currentChapterTitle').textContent = chapterTitle;

    // 显示加载状态
    const contentDiv = document.getElementById('chapterContent');
    contentDiv.innerHTML = `
        <div class="loading-chapter">
            <i class="ri-loader-4-line"></i>
            <p>加载中...</p>
        </div>
    `;

    try {
        // 加载Markdown文件
        const response = await fetch(`chapters/${fileName}`);
        if (!response.ok) {
            throw new Error('章节文件不存在');
        }

        const markdown = await response.text();

        // 使用marked.js渲染Markdown
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true
            });
            contentDiv.innerHTML = marked.parse(markdown);
        } else {
            // 如果marked.js未加载，使用简单渲染
            contentDiv.innerHTML = `<pre>${markdown}</pre>`;
        }

        // 添加章节专属插图（所有章节：正文、序言、前言、后记、附录、专题）
        if (typeof renderChapterIllustrationSync !== 'undefined') {
            try {
                // 确定插图ID
                let illustrationId;
                if (typeof chapterId === 'number') {
                    illustrationId = `chapter${chapterId}`;
                } else {
                    // 字符串类型：foreword, preface, afterword, appendix, essay
                    illustrationId = chapterId;
                }

                const illustration = renderChapterIllustrationSync(illustrationId, {
                    clickable: true,
                    style: 'margin: var(--spacing-xl) auto; display: block;'
                });

                // 在内容开头插入插图
                if (illustration) {
                    const firstH1 = contentDiv.querySelector('h1');
                    if (firstH1) {
                        firstH1.insertAdjacentHTML('afterend', illustration);
                    } else {
                        contentDiv.insertAdjacentHTML('afterbegin', illustration);
                    }
                }
            } catch (error) {
                console.warn('章节插图加载失败:', error);
            }
        }

        // 处理概念配图
        if (typeof ChapterIllustrations !== 'undefined') {
            const conceptIllustrations = contentDiv.querySelectorAll('.concept-illustration[data-illustration]');
            conceptIllustrations.forEach(async (container) => {
                const illustrationId = container.getAttribute('data-illustration');
                if (illustrationId) {
                    // 显示加载状态
                    container.innerHTML = `
                        <div class="illustration-loading" style="text-align: center; padding: var(--spacing-lg); color: var(--color-text-secondary);">
                            <i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i>
                            <p style="margin-top: var(--spacing-sm); font-size: 0.9rem;">加载配图中...</p>
                        </div>
                    `;

                    try {
                        const svg = await ChapterIllustrations.load(illustrationId);
                        if (svg) {
                            container.innerHTML = svg;
                            container.style.cssText = 'margin: var(--spacing-xl) auto; max-width: 800px; text-align: center;';

                            // 添加点击放大功能
                            const svgElement = container.querySelector('svg');
                            if (svgElement && typeof ImageViewer !== 'undefined') {
                                svgElement.style.cursor = 'pointer';
                                svgElement.style.transition = 'transform 0.2s';
                                svgElement.addEventListener('mouseenter', () => {
                                    svgElement.style.transform = 'scale(1.02)';
                                });
                                svgElement.addEventListener('mouseleave', () => {
                                    svgElement.style.transform = 'scale(1)';
                                });
                                svgElement.addEventListener('click', () => {
                                    // 将SVG转换为base64用于查看
                                    const svgData = new XMLSerializer().serializeToString(svgElement);
                                    const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
                                    const svgUrl = `data:image/svg+xml;base64,${svgBase64}`;
                                    ImageViewer.open(svgUrl, `概念配图 - ${illustrationId}`, 'svg');
                                });
                            }
                        }
                    } catch (error) {
                        console.warn(`概念配图加载失败: ${illustrationId}`, error);
                        container.innerHTML = `
                            <div style="text-align: center; padding: var(--spacing-md); color: var(--color-text-tertiary); font-size: 0.9rem;">
                                <i class="ri-image-line"></i>
                                <p>配图加载失败</p>
                            </div>
                        `;
                    }
                }
            });
        }

        // 渲染Mermaid图表
        if (typeof MermaidIntegration !== 'undefined') {
            setTimeout(() => {
                try {
                    MermaidIntegration.renderAll();
                } catch (error) {
                    console.warn('Mermaid图表渲染失败:', error);
                }
            }, 100);
        }

        // 滚动到顶部
        window.scrollTo(0, 0);

        // 更新导航按钮
        updateChapterNavigation(chapterId);

    } catch (error) {
        console.error('加载章节失败:', error);
        contentDiv.innerHTML = `
            <div class="loading-chapter">
                <i class="ri-error-warning-line"></i>
                <p>章节加载失败</p>
                <p style="font-size: 0.9rem; margin-top: 8px;">${chapterTitle}内容暂未完成</p>
            </div>
        `;
    }
}

// 更新章节导航按钮
function updateChapterNavigation(currentChapterId) {
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');

    // 定义导航顺序
    const navigationOrder = ['foreword', 'preface', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'afterword', 'appendix', 'essay'];
    const currentIndex = navigationOrder.indexOf(currentChapterId);

    // 上一章
    if (currentIndex > 0) {
        prevBtn.style.display = 'flex';
        prevBtn.onclick = () => loadChapter(navigationOrder[currentIndex - 1]);
    } else {
        prevBtn.style.display = 'none';
    }

    // 下一章
    if (currentIndex < navigationOrder.length - 1) {
        nextBtn.style.display = 'flex';
        nextBtn.onclick = () => loadChapter(navigationOrder[currentIndex + 1]);
    } else {
        nextBtn.style.display = 'none';
    }
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderOutline);
} else {
    renderOutline();
}
