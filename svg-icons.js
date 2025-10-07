// SVG图标库 - 医美主题
const SVGIcons = {
    // 医美相关图标
    beauty: {
        face: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="38" cy="45" r="3" fill="currentColor"/>
                <circle cx="62" cy="45" r="3" fill="currentColor"/>
                <path d="M 35 60 Q 50 70 65 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M 30 35 Q 35 32 40 35" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M 60 35 Q 65 32 70 35" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        skincare: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="20" width="40" height="60" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="40" r="8" fill="currentColor" opacity="0.3"/>
                <path d="M 40 55 L 60 55 M 35 65 L 65 65 M 40 75 L 60 75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        mirror: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="40" rx="25" ry="30" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M 50 70 L 50 90" stroke="currentColor" stroke-width="2"/>
                <ellipse cx="50" cy="90" rx="15" ry="3" fill="currentColor" opacity="0.3"/>
                <path d="M 35 35 L 45 45" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
            </svg>
        `,
        sparkle: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 20 L 53 45 L 78 48 L 53 51 L 50 76 L 47 51 L 22 48 L 47 45 Z" fill="currentColor" opacity="0.8"/>
                <circle cx="30" cy="30" r="3" fill="currentColor"/>
                <circle cx="70" cy="25" r="2" fill="currentColor"/>
                <circle cx="75" cy="70" r="3" fill="currentColor"/>
                <circle cx="25" cy="75" r="2" fill="currentColor"/>
            </svg>
        `,
        lotus: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 80 Q 35 65 35 50 Q 35 35 50 30 Q 65 35 65 50 Q 65 65 50 80" fill="currentColor" opacity="0.2"/>
                <path d="M 50 30 Q 30 35 25 50" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M 50 30 Q 70 35 75 50" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M 50 30 L 50 80" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="30" r="4" fill="currentColor"/>
            </svg>
        `
    },

    // 叙事相关图标
    narrative: {
        story: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="20" width="50" height="60" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M 35 35 L 65 35 M 35 45 L 65 45 M 35 55 L 60 55 M 35 65 L 65 65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M 45 15 L 45 25 M 55 15 L 55 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        dialogue: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20 30 L 60 30 L 60 55 L 35 55 L 25 65 L 25 55 L 20 55 Z" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M 40 45 L 80 45 L 80 70 L 75 70 L 75 80 L 65 70 L 40 70 Z" fill="currentColor" opacity="0.2"/>
                <path d="M 40 45 L 80 45 L 80 70 L 75 70 L 75 80 L 65 70 L 40 70 Z" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>
        `,
        myth: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="45" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M 50 25 L 50 15 M 70 45 L 80 45 M 50 65 L 50 75 M 30 45 L 20 45" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M 63 32 L 70 25 M 63 58 L 70 65 M 37 32 L 30 25 M 37 58 L 30 65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="50" cy="45" r="8" fill="currentColor" opacity="0.3"/>
            </svg>
        `,
        journey: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20 70 Q 35 50 50 50 T 80 30" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5"/>
                <circle cx="20" cy="70" r="5" fill="currentColor"/>
                <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.6"/>
                <circle cx="80" cy="30" r="5" fill="currentColor" opacity="0.3"/>
                <path d="M 75 25 L 80 30 L 75 35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `
    },

    // 章节装饰图标
    chapter: {
        ornament1: `
            <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10 25 Q 50 10 100 25 T 190 25" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
                <circle cx="10" cy="25" r="3" fill="currentColor" opacity="0.6"/>
                <circle cx="100" cy="25" r="4" fill="currentColor" opacity="0.6"/>
                <circle cx="190" cy="25" r="3" fill="currentColor" opacity="0.6"/>
            </svg>
        `,
        ornament2: `
            <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20 25 L 80 25 M 120 25 L 180 25" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
                <circle cx="100" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
                <path d="M 95 20 L 100 25 L 105 20 M 95 30 L 100 25 L 105 30" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            </svg>
        `,
        divider: `
            <svg viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 10 L 120 10 M 180 10 L 300 10" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                <circle cx="140" cy="10" r="4" fill="currentColor" opacity="0.4"/>
                <circle cx="150" cy="10" r="3" fill="currentColor" opacity="0.4"/>
                <circle cx="160" cy="10" r="4" fill="currentColor" opacity="0.4"/>
            </svg>
        `
    },

    // 功能图标
    ui: {
        zoom_in: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M 58 58 L 75 75" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M 40 30 L 40 50 M 30 40 L 50 40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        `,
        zoom_out: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M 58 58 L 75 75" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M 30 40 L 50 40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        `,
        fullscreen: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20 30 L 20 20 L 30 20 M 70 20 L 80 20 L 80 30 M 80 70 L 80 80 L 70 80 M 30 80 L 20 80 L 20 70" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `,
        close: `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 30 30 L 70 70 M 70 30 L 30 70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        `
    }
};

// SVG图标渲染函数
function renderSVGIcon(category, name, className = '', style = '') {
    const icon = SVGIcons[category]?.[name];
    if (!icon) {
        console.warn(`SVG icon not found: ${category}.${name}`);
        return '';
    }

    return `<span class="svg-icon ${className}" style="${style}">${icon}</span>`;
}

// 获取原始SVG代码
function getSVGIcon(category, name) {
    return SVGIcons[category]?.[name] || '';
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.SVGIcons = SVGIcons;
    window.renderSVGIcon = renderSVGIcon;
    window.getSVGIcon = getSVGIcon;
}
