// 书籍大纲数据结构
const bookOutline = {
    title: "医美神话叙事学 - 如何发现美以及如何讲述美",
    totalWords: 150000,
    chapters: [
        {
            id: 1,
            title: "第一章 神话与美学的起源",
            wordCount: 15000,
            sections: [
                {
                    number: "1.1",
                    title: "美的神话基因",
                    description: "探索人类对美的追求如何从原始神话中萌芽，美的概念如何在不同文明的神话体系中得到阐释和传承。",
                    keyPoints: [
                        "古希腊神话中的美神阿芙洛狄忒与美的原型",
                        "东方神话体系中的美学观念",
                        "神话叙事如何塑造人类的审美标准",
                        "从神话到现代：美的标准演变"
                    ]
                },
                {
                    number: "1.2",
                    title: "医美的神话学溯源",
                    description: "医美并非现代发明，从古埃及的化妆术到中国的驻颜方，人类对容颜的修饰始终带有仪式性和神话色彩。",
                    keyPoints: [
                        "古埃及的美容神话与实践",
                        "中国古代的驻颜术与长生不老的追求",
                        "日本艺伎文化中的美学仪式",
                        "医美作为现代神话的延续"
                    ]
                },
                {
                    number: "1.3",
                    title: "叙事学的理论框架",
                    description: "引入叙事学理论，分析医美行业如何通过故事创造价值，如何构建美的话语权。",
                    keyPoints: [
                        "普罗普的叙事功能理论",
                        "格雷马斯的叙事语法",
                        "巴特的神话符号学",
                        "叙事在品牌建构中的应用"
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "第二章 医美神话的叙事结构",
            wordCount: 18000,
            sections: [
                {
                    number: "2.1",
                    title: "英雄之旅与蜕变叙事",
                    description: "医美顾客的心理历程如何映射坎贝尔的「英雄之旅」模式，从自我否定到自我实现的叙事弧。",
                    keyPoints: [
                        "启程：对美的渴望与焦虑",
                        "试炼：选择与决策的心理过程",
                        "归来：蜕变后的新生与自信",
                        "医美咨询中的叙事引导技巧"
                    ]
                },
                {
                    number: "2.2",
                    title: "冲突与解决的叙事模式",
                    description: "分析医美叙事中的核心冲突——理想自我与现实自我的张力，以及医美如何作为解决方案被叙述。",
                    keyPoints: [
                        "社会期待与个人认同的冲突",
                        "年龄焦虑与时间的对抗",
                        "自然美与人工美的辩证",
                        "问题-解决方案的叙事框架"
                    ]
                },
                {
                    number: "2.3",
                    title: "情感共鸣的叙事策略",
                    description: "如何通过叙事激发情感共鸣，让顾客在故事中看到自己，产生认同感和信任感。",
                    keyPoints: [
                        "真实案例的力量与叙事真实性",
                        "情感锚点的设置与激活",
                        "共情地图在医美沟通中的应用",
                        "从理性说服到情感共鸣"
                    ]
                }
            ]
        },
        {
            id: 3,
            title: "第三章 发现美的多维视角",
            wordCount: 16000,
            sections: [
                {
                    number: "3.1",
                    title: "医学视角下的美学标准",
                    description: "从解剖学、生理学角度解析美的客观标准，黄金比例、三庭五眼等医学美学原则。",
                    keyPoints: [
                        "面部黄金比例与美学标准",
                        "骨骼结构与软组织的关系",
                        "年轻化的医学指标",
                        "个性化美学评估体系"
                    ]
                },
                {
                    number: "3.2",
                    title: "文化视角下的美学差异",
                    description: "美是文化的产物，不同文化背景下的美学标准差异巨大，如何在全球化与本土化之间找到平衡。",
                    keyPoints: [
                        "东西方审美差异的根源",
                        "时代变迁中的美学流变",
                        "亚文化群体的独特审美",
                        "文化敏感性在医美实践中的重要性"
                    ]
                },
                {
                    number: "3.3",
                    title: "心理视角下的美学认知",
                    description: "美是主观的心理体验，探讨个体如何感知美、评价美，以及心理因素如何影响医美决策。",
                    keyPoints: [
                        "格式塔心理学与整体美",
                        "自我图式与美学自我认同",
                        "镜像自我与社会比较",
                        "美学满意度的心理机制"
                    ]
                },
                {
                    number: "3.4",
                    title: "社会学视角下的美学权力",
                    description: "美学标准的背后是权力结构，谁在定义美？谁从美的话语中获益？批判性地审视医美行业的社会角色。",
                    keyPoints: [
                        "媒体与消费主义对美的建构",
                        "性别政治与美学规训",
                        "阶层差异与美学资本",
                        "医美的赋权与异化悖论"
                    ]
                }
            ]
        },
        {
            id: 4,
            title: "第四章 讲述美的叙事艺术",
            wordCount: 17000,
            sections: [
                {
                    number: "4.1",
                    title: "视觉叙事：图像的力量",
                    description: "Before-After对比图、3D模拟图像如何构建视觉叙事，让未来的美变得可见、可信。",
                    keyPoints: [
                        "对比图像的叙事逻辑",
                        "视觉证据与信任建立",
                        "3D可视化技术的叙事潜力",
                        "社交媒体时代的视觉叙事策略"
                    ]
                },
                {
                    number: "4.2",
                    title: "文字叙事：故事的编织",
                    description: "如何用文字讲述美的故事，从医学报告到品牌故事，文字如何赋予医美以意义和温度。",
                    keyPoints: [
                        "医美文案的叙事技巧",
                        "个人故事与品牌故事的融合",
                        "科学话语与人文关怀的平衡",
                        "社交平台上的故事营销"
                    ]
                },
                {
                    number: "4.3",
                    title: "口述叙事：真实的声音",
                    description: "顾客见证、医生访谈等口述叙事的独特价值，真实的声音如何增强叙事的可信度和感染力。",
                    keyPoints: [
                        "顾客见证的叙事框架",
                        "医生专家的权威叙事",
                        "视频口述的情感传递",
                        "UGC内容的真实性与风险管理"
                    ]
                },
                {
                    number: "4.4",
                    title: "多模态叙事：整合的力量",
                    description: "在数字时代，文字、图像、声音、视频等多种媒介如何协同工作，创造沉浸式的叙事体验。",
                    keyPoints: [
                        "多模态叙事的理论基础",
                        "跨媒介叙事策略",
                        "沉浸式体验的设计",
                        "VR/AR技术在医美叙事中的应用"
                    ]
                }
            ]
        },
        {
            id: 5,
            title: "第五章 医美品牌的神话构建",
            wordCount: 15000,
            sections: [
                {
                    number: "5.1",
                    title: "品牌原型与神话原型",
                    description: "运用荣格的原型理论，分析医美品牌如何选择和塑造自己的品牌原型，与消费者建立深层心理连接。",
                    keyPoints: [
                        "十二种品牌原型在医美行业的应用",
                        "英雄、照顾者、创造者：医美品牌的常见原型",
                        "品牌原型与目标客群的匹配",
                        "原型叙事的一致性与连贯性"
                    ]
                },
                {
                    number: "5.2",
                    title: "品牌故事的神话化",
                    description: "如何将品牌故事升华为具有神话意义的叙事，让品牌超越产品本身，成为价值观和生活方式的象征。",
                    keyPoints: [
                        "创始故事的神话化叙事",
                        "使命愿景的崇高化表达",
                        "品牌仪式与象征符号",
                        "从品牌到信仰：粉丝经济的叙事基础"
                    ]
                },
                {
                    number: "5.3",
                    title: "医美IP的打造与运营",
                    description: "IP不仅是形象，更是叙事的载体。如何打造医美领域的IP，让其承载品牌价值和情感连接。",
                    keyPoints: [
                        "IP的叙事人格化",
                        "虚拟偶像与品牌代言人",
                        "IP的跨平台叙事延展",
                        "IP生态的构建与变现"
                    ]
                }
            ]
        },
        {
            id: 6,
            title: "第六章 医美咨询中的叙事沟通",
            wordCount: 14000,
            sections: [
                {
                    number: "6.1",
                    title: "倾听的艺术：解读顾客的叙事",
                    description: "有效的沟通始于倾听。如何从顾客的叙述中捕捉真实需求、情感状态和潜在顾虑。",
                    keyPoints: [
                        "积极倾听的技巧",
                        "识别显性需求与隐性需求",
                        "情绪解读与共情回应",
                        "叙事分析在咨询中的应用"
                    ]
                },
                {
                    number: "6.2",
                    title: "重述的力量：重构顾客的故事",
                    description: "通过专业的重述，帮助顾客重新理解自己的需求和期待，引导其做出明智决策。",
                    keyPoints: [
                        "重述的叙事技巧",
                        "从问题框架到解决方案框架",
                        "认知重构与期望管理",
                        "叙事治疗在医美咨询中的借鉴"
                    ]
                },
                {
                    number: "6.3",
                    title: "共创的叙事：医患合作的新模式",
                    description: "医美不应是单向的服务提供，而应是医患共同创造美的过程，如何通过叙事促进合作关系。",
                    keyPoints: [
                        "参与式决策的叙事框架",
                        "共同愿景的叙事构建",
                        "信任与透明度的叙事基础",
                        "长期关系的叙事维护"
                    ]
                }
            ]
        },
        {
            id: 7,
            title: "第七章 数字时代的医美叙事",
            wordCount: 16000,
            sections: [
                {
                    number: "7.1",
                    title: "社交媒体上的叙事传播",
                    description: "小红书、抖音、微博等平台如何改变医美叙事的生产与传播，UGC内容的兴起带来的机遇与挑战。",
                    keyPoints: [
                        "平台特性与叙事策略的适配",
                        "算法推荐机制下的叙事优化",
                        "KOL/KOC的叙事影响力",
                        "真实性危机与信任重建"
                    ]
                },
                {
                    number: "7.2",
                    title: "数据驱动的个性化叙事",
                    description: "大数据和AI技术如何赋能医美叙事，实现千人千面的个性化沟通和精准营销。",
                    keyPoints: [
                        "用户画像与叙事分群",
                        "行为数据驱动的内容推荐",
                        "AI生成内容的叙事应用",
                        "隐私保护与伦理边界"
                    ]
                },
                {
                    number: "7.3",
                    title: "虚拟与现实的叙事融合",
                    description: "元宇宙、AR滤镜等新技术如何创造新的叙事空间，虚拟形象与真实身体的叙事关系。",
                    keyPoints: [
                        "AR试妆/试脸的叙事体验",
                        "虚拟偶像与数字分身",
                        "元宇宙中的美学表达",
                        "虚拟与现实的身份认同"
                    ]
                }
            ]
        },
        {
            id: 8,
            title: "第八章 医美叙事的伦理与责任",
            wordCount: 13000,
            sections: [
                {
                    number: "8.1",
                    title: "真实性与夸张的边界",
                    description: "医美叙事常陷入夸大效果的诱惑，如何在吸引眼球与保持真实之间找到平衡，避免虚假宣传。",
                    keyPoints: [
                        "真实案例的选择与呈现",
                        "效果预期的合理管理",
                        "法律法规对医美广告的限制",
                        "行业自律与诚信建设"
                    ]
                },
                {
                    number: "8.2",
                    title: "赋权与规训的悖论",
                    description: "医美叙事声称赋予女性选择自由，但也可能强化外貌焦虑和社会规训，如何负责任地讲述美。",
                    keyPoints: [
                        "医美话语中的女性主义批判",
                        "容貌焦虑的社会建构",
                        "多元美学的倡导",
                        "去污名化的叙事策略"
                    ]
                },
                {
                    number: "8.3",
                    title: "未成年人保护与年龄适宜性",
                    description: "医美叙事如何影响年轻群体，特别是未成年人，行业需承担的社会责任和伦理义务。",
                    keyPoints: [
                        "未成年人医美的伦理争议",
                        "年龄适宜性的叙事限制",
                        "教育与引导的责任",
                        "行业规范与保护机制"
                    ]
                }
            ]
        },
        {
            id: 9,
            title: "第九章 案例分析：成功的医美叙事",
            wordCount: 12000,
            sections: [
                {
                    number: "9.1",
                    title: "国际品牌的叙事策略",
                    description: "分析Allergan（艾尔建）、Merz等国际医美品牌的叙事实践，总结其成功经验。",
                    keyPoints: [
                        "科学权威的叙事定位",
                        "全球化与本土化的叙事平衡",
                        "医生教育与患者教育的双轨叙事",
                        "品牌联盟与生态叙事"
                    ]
                },
                {
                    number: "9.2",
                    title: "国内机构的叙事创新",
                    description: "研究国内头部医美机构如何结合中国市场特点，创新叙事方法，建立品牌优势。",
                    keyPoints: [
                        "社交媒体营销的叙事策略",
                        "明星效应与案例叙事",
                        "线上线下融合的叙事体验",
                        "私域流量的叙事运营"
                    ]
                },
                {
                    number: "9.3",
                    title: "个人IP医生的叙事之道",
                    description: "在医美行业，个人品牌愈发重要，分析成功医生IP如何通过叙事建立专业形象和患者信任。",
                    keyPoints: [
                        "专业知识的科普叙事",
                        "个人故事与职业理想",
                        "案例分享的叙事技巧",
                        "社交平台的人设管理"
                    ]
                }
            ]
        },
        {
            id: 10,
            title: "第十章 未来的医美叙事图景",
            wordCount: 14000,
            sections: [
                {
                    number: "10.1",
                    title: "技术革新与叙事变革",
                    description: "AI、基因编辑、再生医学等前沿技术将如何重塑医美，带来全新的叙事可能性。",
                    keyPoints: [
                        "AI驱动的个性化美学方案",
                        "基因美学的伦理与叙事",
                        "再生医学的永恒青春叙事",
                        "科幻与现实的叙事边界"
                    ]
                },
                {
                    number: "10.2",
                    title: "价值观重构与叙事转向",
                    description: "社会价值观正在经历深刻变化，从单一审美到多元包容，医美叙事需要与时俱进。",
                    keyPoints: [
                        "身体积极性运动的影响",
                        "性别流动性与医美叙事",
                        "年龄多样性的拥抱",
                        "可持续美学的兴起"
                    ]
                },
                {
                    number: "10.3",
                    title: "构建负责任的医美叙事生态",
                    description: "展望未来，医美行业需要共同努力，建立健康、透明、负责任的叙事生态系统。",
                    keyPoints: [
                        "行业标准与叙事规范",
                        "跨界合作与知识共享",
                        "公众教育与媒介素养",
                        "美学民主化的愿景"
                    ]
                }
            ]
        }
    ]
};

// 渲染大纲到页面
function renderOutline() {
    const container = document.getElementById('outlineContent');
    if (!container) return;

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

        // 添加章节专属插图（对于正文章节）
        if (typeof chapterId === 'number' && typeof renderChapterIllustration !== 'undefined') {
            const illustration = renderChapterIllustration(`chapter${chapterId}`, {
                clickable: true,
                style: 'margin: var(--spacing-xl) auto; display: block;'
            });

            // 在内容开头插入插图
            if (illustration) {
                const firstH1 = contentDiv.querySelector('h1');
                if (firstH1) {
                    const illustrationDiv = document.createElement('div');
                    illustrationDiv.innerHTML = illustration;
                    firstH1.insertAdjacentElement('afterend', illustrationDiv.firstChild);
                } else {
                    contentDiv.insertAdjacentHTML('afterbegin', illustration);
                }
            }
        }

        // 渲染Mermaid图表
        if (typeof MermaidIntegration !== 'undefined') {
            setTimeout(() => {
                MermaidIntegration.renderAll();
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
