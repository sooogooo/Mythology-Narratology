/**
 * Mermaid.js 集成模块
 * 支持图表、流程图、思维导图等可视化
 */

const MermaidIntegration = {
    /**
     * 初始化Mermaid
     */
    init() {
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'neutral',
                themeVariables: {
                    primaryColor: '#f5f5f5',
                    primaryTextColor: '#333',
                    primaryBorderColor: '#999',
                    lineColor: '#666',
                    secondaryColor: '#fafafa',
                    tertiaryColor: '#fff',
                    fontSize: '14px',
                    fontFamily: 'Noto Sans SC, sans-serif'
                },
                flowchart: {
                    htmlLabels: true,
                    curve: 'basis',
                    padding: 15
                },
                sequence: {
                    diagramMarginX: 50,
                    diagramMarginY: 10,
                    actorMargin: 50,
                    width: 150,
                    height: 65,
                    boxMargin: 10,
                    boxTextMargin: 5,
                    noteMargin: 10,
                    messageMargin: 35
                },
                gantt: {
                    titleTopMargin: 25,
                    barHeight: 20,
                    barGap: 4,
                    topPadding: 50,
                    leftPadding: 75,
                    gridLineStartPadding: 35,
                    fontSize: 11,
                    numberSectionStyles: 4
                }
            });
            console.log('Mermaid.js 已初始化');
        } else {
            console.warn('Mermaid.js 未加载');
        }
    },

    /**
     * 渲染Mermaid图表
     * @param {string} code - Mermaid代码
     * @param {string} containerId - 容器ID
     */
    async render(code, containerId) {
        if (typeof mermaid === 'undefined') {
            console.error('Mermaid.js 未加载');
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`容器 ${containerId} 不存在`);
            return;
        }

        try {
            // 生成唯一ID
            const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            // 渲染图表
            const { svg } = await mermaid.render(id, code);

            // 插入容器
            container.innerHTML = `
                <div class="mermaid-container" style="
                    background: var(--color-surface);
                    padding: var(--spacing-lg);
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    overflow-x: auto;
                    text-align: center;
                ">
                    ${svg}
                </div>
            `;

            // 添加可点击放大功能
            const svgElement = container.querySelector('svg');
            if (svgElement) {
                svgElement.style.cursor = 'pointer';
                svgElement.style.maxWidth = '100%';
                svgElement.style.height = 'auto';

                svgElement.addEventListener('click', () => {
                    if (typeof imageViewer !== 'undefined') {
                        // 将SVG转为data URL
                        const svgData = new XMLSerializer().serializeToString(svgElement);
                        const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
                        imageViewer.open(`data:image/svg+xml;base64,${svgBase64}`, '图表', 'svg');
                    }
                });
            }

            return true;
        } catch (error) {
            console.error('Mermaid渲染失败:', error);
            container.innerHTML = `
                <div style="color: var(--color-error); padding: var(--spacing-md);">
                    <i class="ri-error-warning-line"></i> 图表渲染失败
                </div>
            `;
            return false;
        }
    },

    /**
     * 批量渲染页面中所有Mermaid代码块
     */
    async renderAll() {
        const codeBlocks = document.querySelectorAll('pre code.language-mermaid, .mermaid-code');

        for (let i = 0; i < codeBlocks.length; i++) {
            const block = codeBlocks[i];
            const code = block.textContent;
            const container = document.createElement('div');
            container.id = `mermaid-auto-${i}`;
            block.parentNode.replaceWith(container);

            await this.render(code, container.id);
        }
    }
};

/**
 * Mermaid图表模板库
 */
const MermaidTemplates = {
    /**
     * 医美决策流程图
     */
    decisionFlow: `
        flowchart TD
            A[咨询需求] --> B{是否适合}
            B -->|是| C[制定方案]
            B -->|否| D[专业建议]
            C --> E[术前准备]
            E --> F[执行方案]
            F --> G[术后护理]
            G --> H[效果评估]
            H --> I{满意度}
            I -->|满意| J[完成]
            I -->|需调整| C
            D --> K[其他选择]

            style A fill:#f5f5f5,stroke:#333,stroke-width:1px
            style J fill:#f5f5f5,stroke:#333,stroke-width:1px
            style K fill:#f5f5f5,stroke:#333,stroke-width:1px
    `,

    /**
     * 美学理论思维导图
     */
    beautyTheoryMindmap: `
        mindmap
            root((美学理论))
                形而上学
                    本质论
                    现象学
                    存在论
                符号学
                    能指
                    所指
                    意义
                叙事学
                    结构
                    功能
                    转化
                文化维度
                    社会
                    历史
                    心理
    `,

    /**
     * 技术演进时间线
     */
    techTimeline: `
        timeline
            title 医美技术演进
            2000s : 传统手术 : 基础注射
            2010s : 激光技术 : 微创手术 : 填充材料升级
            2020s : AI诊断 : 精准定制 : 数字化管理
            未来 : 基因美容 : 再生医学 : 虚拟试妆
    `,

    /**
     * 伦理关系图
     */
    ethicsRelation: `
        graph LR
            A[个体自主] <--> B[医生责任]
            B <--> C[社会规范]
            C <--> D[文化价值]
            D <--> A

            E[知情同意] -.-> A
            F[专业标准] -.-> B
            G[法律法规] -.-> C
            H[审美多元] -.-> D

            style A fill:#fafafa,stroke:#333,stroke-width:1px
            style B fill:#fafafa,stroke:#333,stroke-width:1px
            style C fill:#fafafa,stroke:#333,stroke-width:1px
            style D fill:#fafafa,stroke:#333,stroke-width:1px
    `,

    /**
     * 价值链序列图
     */
    valueChainSequence: `
        sequenceDiagram
            participant P as 生产者
            participant D as 分销商
            participant C as 消费者
            participant M as 市场

            P->>D: 提供产品/服务
            D->>C: 营销推广
            C->>D: 需求反馈
            D->>P: 订单与数据
            C->>M: 消费体验
            M->>P: 市场趋势
            M->>D: 竞争分析

            Note over P,C: 价值创造与传递
            Note over C,M: 价值实现与反馈
    `,

    /**
     * 文化交流类图
     */
    culturalExchange: `
        classDiagram
            class 东方美学 {
                +含蓄
                +意境
                +整体观
                +和谐美
            }

            class 西方美学 {
                +直接
                +形式
                +个体性
                +力量美
            }

            class 现代融合 {
                +多元性
                +创新性
                +包容性
                +个性化
            }

            东方美学 <|-- 现代融合
            西方美学 <|-- 现代融合

            现代融合 : +文化对话()
            现代融合 : +审美创新()
            现代融合 : +价值重构()
    `,

    /**
     * 数字化转型甘特图
     */
    digitalTransformation: `
        gantt
            title 数字化美学转型路线图
            dateFormat YYYY-MM
            section 基础建设
            平台搭建           :a1, 2024-01, 6M
            数据收集           :a2, after a1, 3M
            section 技术应用
            AI诊断系统         :b1, 2024-04, 8M
            虚拟试妆           :b2, 2024-07, 6M
            个性化推荐         :b3, after b2, 4M
            section 生态构建
            用户社区           :c1, 2024-10, 9M
            内容生态           :c2, 2025-01, 6M
            section 持续优化
            效果追踪           :d1, 2025-04, 12M
            模型迭代           :d2, 2025-07, 12M
    `,

    /**
     * 状态转换图
     */
    stateTransition: `
        stateDiagram-v2
            [*] --> 咨询阶段
            咨询阶段 --> 评估阶段: 初步意向
            评估阶段 --> 方案设计: 评估通过
            评估阶段 --> 咨询阶段: 需更多信息
            方案设计 --> 决策阶段: 方案完成
            决策阶段 --> 执行阶段: 确认执行
            决策阶段 --> 方案设计: 需调整
            决策阶段 --> [*]: 放弃
            执行阶段 --> 恢复期: 完成操作
            恢复期 --> 评估效果: 恢复完成
            评估效果 --> [*]: 满意
            评估效果 --> 执行阶段: 需补充
    `,

    /**
     * 实体关系图
     */
    entityRelation: `
        erDiagram
            用户 ||--o{ 咨询记录 : 产生
            用户 ||--o{ 方案 : 拥有
            用户 ||--o{ 评价 : 发表
            医生 ||--o{ 咨询记录 : 接待
            医生 ||--o{ 方案 : 制定
            医生 }o--|| 机构 : 属于
            方案 ||--|{ 项目 : 包含
            项目 }o--|| 技术 : 使用
            方案 ||--o{ 效果记录 : 产生

            用户 {
                string 姓名
                int 年龄
                string 需求
            }

            医生 {
                string 姓名
                string 专长
                int 经验年限
            }

            方案 {
                string 编号
                date 日期
                string 描述
            }
    `
};

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        MermaidIntegration.init();
    });
} else {
    MermaidIntegration.init();
}
