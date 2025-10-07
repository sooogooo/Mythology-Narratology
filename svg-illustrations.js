// SVG配图库 - 医美叙事主题插画
const SVGIllustrations = {
    // 章节主题插画
    chapter1: `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <!-- 美的镜像 - 抽象镜子和反射 -->
            <defs>
                <linearGradient id="mirror-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:currentColor;stop-opacity:0.1" />
                    <stop offset="50%" style="stop-color:currentColor;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.1" />
                </linearGradient>
            </defs>

            <!-- 镜子框架 -->
            <ellipse cx="400" cy="200" rx="150" ry="180" fill="url(#mirror-gradient)" stroke="currentColor" stroke-width="3"/>

            <!-- 装饰线条 -->
            <path d="M 250 100 Q 300 80 350 100" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/>
            <path d="M 450 100 Q 500 80 550 100" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/>

            <!-- 反射光效 -->
            <path d="M 300 150 Q 320 180 300 210" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>

            <!-- 装饰花纹 -->
            <circle cx="400" cy="80" r="15" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            <circle cx="400" cy="320" r="15" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"/>

            <!-- 文字区域标记 -->
            <text x="400" y="370" text-anchor="middle" font-size="18" fill="currentColor" opacity="0.6">第一章：美的镜像</text>
        </svg>
    `,

    chapter2: `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <!-- 叙事之河 - 流动的故事 -->
            <defs>
                <linearGradient id="river-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:currentColor;stop-opacity:0.2" />
                    <stop offset="50%" style="stop-color:currentColor;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.2" />
                </linearGradient>
            </defs>

            <!-- 河流路径 -->
            <path d="M 50 200 Q 200 150 400 200 T 750 200" fill="none" stroke="url(#river-gradient)" stroke-width="60"/>
            <path d="M 50 200 Q 200 150 400 200 T 750 200" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/>

            <!-- 故事节点 -->
            <circle cx="150" cy="175" r="10" fill="currentColor" opacity="0.6"/>
            <circle cx="400" cy="200" r="12" fill="currentColor" opacity="0.6"/>
            <circle cx="650" cy="175" r="10" fill="currentColor" opacity="0.6"/>

            <!-- 涟漪效果 -->
            <circle cx="400" cy="200" r="20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            <circle cx="400" cy="200" r="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>

            <text x="400" y="370" text-anchor="middle" font-size="18" fill="currentColor" opacity="0.6">第二章：叙事的力量</text>
        </svg>
    `,

    concept: `
        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <!-- 概念图 - 医美与叙事的交织 -->

            <!-- 中心主题 -->
            <circle cx="300" cy="200" r="80" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="2"/>

            <!-- 四个核心概念 -->
            <g id="concept-nodes">
                <!-- 美学 -->
                <circle cx="150" cy="100" r="50" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="2"/>
                <text x="150" y="105" text-anchor="middle" font-size="16" fill="currentColor">美学</text>

                <!-- 叙事 -->
                <circle cx="450" cy="100" r="50" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="2"/>
                <text x="450" y="105" text-anchor="middle" font-size="16" fill="currentColor">叙事</text>

                <!-- 体验 -->
                <circle cx="450" cy="300" r="50" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="2"/>
                <text x="450" y="305" text-anchor="middle" font-size="16" fill="currentColor">体验</text>

                <!-- 价值 -->
                <circle cx="150" cy="300" r="50" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="2"/>
                <text x="150" y="305" text-anchor="middle" font-size="16" fill="currentColor">价值</text>
            </g>

            <!-- 连接线 -->
            <path d="M 200 120 L 260 180" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-dasharray="5,5"/>
            <path d="M 400 120 L 340 180" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-dasharray="5,5"/>
            <path d="M 400 280 L 340 220" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-dasharray="5,5"/>
            <path d="M 200 280 L 260 220" stroke="currentColor" stroke-width="1.5" opacity="0.4" stroke-dasharray="5,5"/>
        </svg>
    `,

    lotus_meditation: `
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <!-- 莲花冥想 - 内在美的绽放 -->

            <!-- 外层花瓣 -->
            <g transform="translate(300,300)">
                <path d="M 0 -120 Q -30 -90 -50 -60 Q -30 -40 0 -40 Z" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1.5"/>
                <path d="M 0 -120 Q 30 -90 50 -60 Q 30 -40 0 -40 Z" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1.5"/>

                <g transform="rotate(60)">
                    <path d="M 0 -120 Q -30 -90 -50 -60 Q -30 -40 0 -40 Z" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M 0 -120 Q 30 -90 50 -60 Q 30 -40 0 -40 Z" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.5"/>
                </g>

                <g transform="rotate(120)">
                    <path d="M 0 -120 Q -30 -90 -50 -60 Q -30 -40 0 -40 Z" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M 0 -120 Q 30 -90 50 -60 Q 30 -40 0 -40 Z" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1.5"/>
                </g>

                <!-- 内层花瓣 -->
                <circle cx="0" cy="0" r="40" fill="currentColor" opacity="0.2" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="0" r="20" fill="currentColor" opacity="0.3"/>

                <!-- 花蕊 -->
                <circle cx="0" cy="0" r="8" fill="currentColor" opacity="0.6"/>
            </g>

            <text x="300" y="550" text-anchor="middle" font-size="18" fill="currentColor" opacity="0.6">内在美的绽放</text>
        </svg>
    `,

    journey_map: `
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <!-- 旅程地图 - 医美体验之旅 -->

            <!-- 路径 -->
            <path d="M 50 350 Q 150 300 250 320 T 450 280 T 650 300 T 750 250"
                  fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="10,5" opacity="0.4"/>

            <!-- 起点 -->
            <circle cx="50" cy="350" r="15" fill="currentColor" opacity="0.6"/>
            <text x="50" y="380" text-anchor="middle" font-size="14" fill="currentColor">发现</text>

            <!-- 里程碑 -->
            <circle cx="250" cy="320" r="12" fill="currentColor" opacity="0.5"/>
            <text x="250" y="345" text-anchor="middle" font-size="14" fill="currentColor">咨询</text>

            <circle cx="450" cy="280" r="12" fill="currentColor" opacity="0.5"/>
            <text x="450" y="305" text-anchor="middle" font-size="14" fill="currentColor">决策</text>

            <circle cx="650" cy="300" r="12" fill="currentColor" opacity="0.5"/>
            <text x="650" y="325" text-anchor="middle" font-size="14" fill="currentColor">体验</text>

            <!-- 终点 -->
            <circle cx="750" cy="250" r="15" fill="currentColor" opacity="0.8"/>
            <path d="M 745 245 L 750 250 L 745 255" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="750" y="280" text-anchor="middle" font-size="14" fill="currentColor">蜕变</text>

            <!-- 装饰元素 -->
            <path d="M 150 200 Q 200 180 250 200" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            <path d="M 350 180 Q 400 160 450 180" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        </svg>
    `
};

// 配图渲染函数
function renderIllustration(name, options = {}) {
    const {
        className = 'svg-illustration',
        style = '',
        clickable = true
    } = options;

    const illustration = SVGIllustrations[name];
    if (!illustration) {
        console.warn(`SVG illustration not found: ${name}`);
        return '';
    }

    const clickHandler = clickable ? `onclick="openImageViewer('${name}')"` : '';

    return `
        <div class="${className} ${clickable ? 'clickable' : ''}"
             style="${style}"
             ${clickHandler}
             data-illustration="${name}">
            ${illustration}
        </div>
    `;
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.SVGIllustrations = SVGIllustrations;
    window.renderIllustration = renderIllustration;
}
