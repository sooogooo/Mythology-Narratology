// 初始化可视化组件
function initVisualComponents() {
    // 渲染SVG插画
    if (document.getElementById('illustration1')) {
        document.getElementById('illustration1').innerHTML = renderIllustration('chapter1');
        document.getElementById('illustration2').innerHTML = renderIllustration('chapter2');
        document.getElementById('illustration3').innerHTML = renderIllustration('concept');
        document.getElementById('illustration4').innerHTML = renderIllustration('journey_map');
    }

    // 渲染SVG图标
    if (document.getElementById('icon1')) {
        document.getElementById('icon1').innerHTML = renderSVGIcon('beauty', 'face');
        document.getElementById('icon2').innerHTML = renderSVGIcon('beauty', 'skincare');
        document.getElementById('icon3').innerHTML = renderSVGIcon('beauty', 'mirror');
        document.getElementById('icon4').innerHTML = renderSVGIcon('beauty', 'sparkle');
        document.getElementById('icon5').innerHTML = renderSVGIcon('narrative', 'story');
        document.getElementById('icon6').innerHTML = renderSVGIcon('narrative', 'dialogue');
    }

    // 初始化Todo List
    if (document.getElementById('visualTodoContainer')) {
        initVisualTodo('visualTodoContainer');
    }
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualComponents);
} else {
    initVisualComponents();
}

// 页面切换时重新初始化（确保在页面激活时组件正常工作）
document.addEventListener('pagechange', initVisualComponents);
