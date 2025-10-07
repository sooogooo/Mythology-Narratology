/**
 * 数据可视化图表组件
 * 纯SVG实现，无外部依赖，黑白灰配色
 */

const DataCharts = {
    /**
     * 创建条形图
     * @param {Array} data - 数据数组 [{label: '', value: number}]
     * @param {object} options - 配置选项
     */
    barChart(data, options = {}) {
        const {
            width = 400,
            height = 300,
            title = '',
            color = '#666',
            showValues = true
        } = options;

        const maxValue = Math.max(...data.map(d => d.value));
        const barHeight = (height - 100) / data.length;
        const chartWidth = width - 150;

        let svg = `
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#fafafa"/>
        `;

        // 标题
        if (title) {
            svg += `<text x="${width/2}" y="25" font-family="Noto Sans SC" font-size="14" fill="#333" text-anchor="middle" font-weight="500">${title}</text>`;
        }

        // 绘制条形
        data.forEach((item, index) => {
            const barWidth = (item.value / maxValue) * chartWidth;
            const y = 60 + index * barHeight;

            // 标签
            svg += `<text x="10" y="${y + barHeight/2 + 4}" font-family="Noto Sans SC" font-size="11" fill="#666">${item.label}</text>`;

            // 条形
            svg += `<rect x="120" y="${y}" width="${barWidth}" height="${barHeight - 10}" fill="${color}" opacity="0.6" stroke="${color}" stroke-width="0.5"/>`;

            // 数值
            if (showValues) {
                svg += `<text x="${130 + barWidth}" y="${y + barHeight/2 + 4}" font-family="Noto Sans SC" font-size="10" fill="#999">${item.value}</text>`;
            }
        });

        svg += `</svg>`;
        return svg;
    },

    /**
     * 创建折线图
     * @param {Array} data - 数据数组 [{label: '', value: number}]
     * @param {object} options - 配置选项
     */
    lineChart(data, options = {}) {
        const {
            width = 400,
            height = 300,
            title = '',
            color = '#666',
            showPoints = true,
            smooth = true
        } = options;

        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const range = maxValue - minValue || 1;
        const chartWidth = width - 80;
        const chartHeight = height - 100;

        let svg = `
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#fafafa"/>
        `;

        // 标题
        if (title) {
            svg += `<text x="${width/2}" y="25" font-family="Noto Sans SC" font-size="14" fill="#333" text-anchor="middle" font-weight="500">${title}</text>`;
        }

        // 网格线
        for (let i = 0; i <= 4; i++) {
            const y = 50 + (chartHeight / 4) * i;
            svg += `<line x1="50" y1="${y}" x2="${50 + chartWidth}" y2="${y}" stroke="#ddd" stroke-width="0.5"/>`;
        }

        // 计算点位置
        const points = data.map((item, index) => {
            const x = 50 + (chartWidth / (data.length - 1)) * index;
            const y = 50 + chartHeight - ((item.value - minValue) / range) * chartHeight;
            return { x, y, value: item.value, label: item.label };
        });

        // 绘制折线
        let pathData = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            if (smooth && i > 0) {
                const prev = points[i - 1];
                const curr = points[i];
                const cpx = (prev.x + curr.x) / 2;
                pathData += ` Q ${cpx} ${prev.y}, ${cpx} ${(prev.y + curr.y) / 2} T ${curr.x} ${curr.y}`;
            } else {
                pathData += ` L ${points[i].x} ${points[i].y}`;
            }
        }

        svg += `<path d="${pathData}" stroke="${color}" stroke-width="2" fill="none"/>`;

        // 绘制数据点
        if (showPoints) {
            points.forEach(point => {
                svg += `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#fafafa" stroke="${color}" stroke-width="2"/>`;
            });
        }

        // X轴标签
        points.forEach(point => {
            svg += `<text x="${point.x}" y="${height - 20}" font-family="Noto Sans SC" font-size="10" fill="#999" text-anchor="middle">${point.label}</text>`;
        });

        svg += `</svg>`;
        return svg;
    },

    /**
     * 创建饼图
     * @param {Array} data - 数据数组 [{label: '', value: number, color: ''}]
     * @param {object} options - 配置选项
     */
    pieChart(data, options = {}) {
        const {
            width = 400,
            height = 300,
            title = '',
            showLabels = true,
            showPercentage = true
        } = options;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 60;

        const total = data.reduce((sum, item) => sum + item.value, 0);

        let svg = `
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#fafafa"/>
        `;

        // 标题
        if (title) {
            svg += `<text x="${width/2}" y="25" font-family="Noto Sans SC" font-size="14" fill="#333" text-anchor="middle" font-weight="500">${title}</text>`;
        }

        // 灰度色板
        const colors = ['#333', '#666', '#999', '#bbb', '#ddd'];

        let currentAngle = -90; // 从12点钟方向开始

        data.forEach((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 360;
            const endAngle = currentAngle + angle;

            // 计算弧形路径
            const startX = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
            const startY = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
            const endX = centerX + radius * Math.cos(endAngle * Math.PI / 180);
            const endY = centerY + radius * Math.sin(endAngle * Math.PI / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const pathData = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

            const color = item.color || colors[index % colors.length];
            svg += `<path d="${pathData}" fill="${color}" stroke="#fafafa" stroke-width="2" opacity="0.8"/>`;

            // 标签
            if (showLabels) {
                const labelAngle = currentAngle + angle / 2;
                const labelRadius = radius + 30;
                const labelX = centerX + labelRadius * Math.cos(labelAngle * Math.PI / 180);
                const labelY = centerY + labelRadius * Math.sin(labelAngle * Math.PI / 180);

                svg += `<text x="${labelX}" y="${labelY}" font-family="Noto Sans SC" font-size="10" fill="#666" text-anchor="middle">${item.label}</text>`;

                if (showPercentage) {
                    svg += `<text x="${labelX}" y="${labelY + 14}" font-family="Noto Sans SC" font-size="9" fill="#999" text-anchor="middle">${percentage.toFixed(1)}%</text>`;
                }
            }

            currentAngle = endAngle;
        });

        svg += `</svg>`;
        return svg;
    },

    /**
     * 创建雷达图
     * @param {Array} data - 数据数组 [{label: '', value: number}]
     * @param {object} options - 配置选项
     */
    radarChart(data, options = {}) {
        const {
            width = 400,
            height = 400,
            title = '',
            maxValue = 100,
            levels = 5,
            color = '#666'
        } = options;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 80;

        let svg = `
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#fafafa"/>
        `;

        // 标题
        if (title) {
            svg += `<text x="${width/2}" y="30" font-family="Noto Sans SC" font-size="14" fill="#333" text-anchor="middle" font-weight="500">${title}</text>`;
        }

        // 绘制同心圆背景
        for (let i = 1; i <= levels; i++) {
            const r = (radius / levels) * i;
            svg += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="#ddd" stroke-width="0.5"/>`;
        }

        // 绘制轴线
        const angleStep = (Math.PI * 2) / data.length;
        data.forEach((item, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            svg += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#ddd" stroke-width="0.5"/>`;

            // 标签
            const labelDistance = radius + 25;
            const labelX = centerX + labelDistance * Math.cos(angle);
            const labelY = centerY + labelDistance * Math.sin(angle);

            svg += `<text x="${labelX}" y="${labelY}" font-family="Noto Sans SC" font-size="11" fill="#666" text-anchor="middle">${item.label}</text>`;
        });

        // 绘制数据区域
        let pathData = '';
        data.forEach((item, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const value = Math.min(item.value, maxValue);
            const r = (value / maxValue) * radius;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            if (index === 0) {
                pathData = `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }

            // 数据点
            svg += `<circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="#fafafa" stroke-width="2"/>`;
        });

        pathData += ' Z';
        svg += `<path d="${pathData}" fill="${color}" opacity="0.3" stroke="${color}" stroke-width="2"/>`;

        svg += `</svg>`;
        return svg;
    },

    /**
     * 创建热力图
     * @param {Array} data - 二维数据数组 [[value, ...], ...]
     * @param {object} options - 配置选项
     */
    heatmap(data, options = {}) {
        const {
            width = 400,
            height = 300,
            title = '',
            xLabels = [],
            yLabels = [],
            minColor = '#f5f5f5',
            maxColor = '#333'
        } = options;

        const rows = data.length;
        const cols = data[0].length;
        const cellWidth = (width - 80) / cols;
        const cellHeight = (height - 80) / rows;

        // 找出最大最小值
        let minValue = Infinity;
        let maxValue = -Infinity;
        data.forEach(row => {
            row.forEach(value => {
                if (value < minValue) minValue = value;
                if (value > maxValue) maxValue = value;
            });
        });

        const range = maxValue - minValue || 1;

        let svg = `
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#fafafa"/>
        `;

        // 标题
        if (title) {
            svg += `<text x="${width/2}" y="25" font-family="Noto Sans SC" font-size="14" fill="#333" text-anchor="middle" font-weight="500">${title}</text>`;
        }

        // 绘制热力格子
        data.forEach((row, i) => {
            row.forEach((value, j) => {
                const x = 60 + j * cellWidth;
                const y = 50 + i * cellHeight;

                // 计算颜色（简单线性插值）
                const ratio = (value - minValue) / range;
                const grayValue = Math.round(245 - ratio * (245 - 51)); // 从#f5到#33
                const color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;

                svg += `<rect x="${x}" y="${y}" width="${cellWidth - 2}" height="${cellHeight - 2}" fill="${color}" stroke="#fff" stroke-width="1"/>`;

                // 显示数值
                svg += `<text x="${x + cellWidth/2}" y="${y + cellHeight/2 + 4}" font-family="Noto Sans SC" font-size="9" fill="${ratio > 0.5 ? '#fff' : '#333'}" text-anchor="middle">${value}</text>`;
            });

            // Y轴标签
            if (yLabels[i]) {
                svg += `<text x="50" y="${50 + i * cellHeight + cellHeight/2 + 4}" font-family="Noto Sans SC" font-size="10" fill="#666" text-anchor="end">${yLabels[i]}</text>`;
            }
        });

        // X轴标签
        xLabels.forEach((label, j) => {
            const x = 60 + j * cellWidth + cellWidth/2;
            svg += `<text x="${x}" y="${height - 10}" font-family="Noto Sans SC" font-size="10" fill="#666" text-anchor="middle">${label}</text>`;
        });

        svg += `</svg>`;
        return svg;
    },

    /**
     * 渲染图表到容器
     * @param {string} containerId - 容器ID
     * @param {string} chartType - 图表类型
     * @param {Array} data - 数据
     * @param {object} options - 配置选项
     */
    render(containerId, chartType, data, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`容器 ${containerId} 不存在`);
            return;
        }

        let svg = '';
        switch (chartType) {
            case 'bar':
                svg = this.barChart(data, options);
                break;
            case 'line':
                svg = this.lineChart(data, options);
                break;
            case 'pie':
                svg = this.pieChart(data, options);
                break;
            case 'radar':
                svg = this.radarChart(data, options);
                break;
            case 'heatmap':
                svg = this.heatmap(data, options);
                break;
            default:
                console.error(`未知图表类型: ${chartType}`);
                return;
        }

        container.innerHTML = `
            <div class="data-chart" style="
                background: var(--color-surface);
                padding: var(--spacing-md);
                border-radius: var(--radius-md);
                border: 1px solid var(--color-border);
                text-align: center;
            ">
                ${svg}
            </div>
        `;

        // 添加点击放大功能
        const svgElement = container.querySelector('svg');
        if (svgElement && typeof imageViewer !== 'undefined') {
            svgElement.style.cursor = 'pointer';
            svgElement.addEventListener('click', () => {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
                imageViewer.open(`data:image/svg+xml;base64,${svgBase64}`, options.title || '数据图表', 'svg');
            });
        }
    }
};

/**
 * 预设数据示例
 */
const ChartDataExamples = {
    // 医美项目受欢迎程度
    projectPopularity: [
        { label: '面部填充', value: 85 },
        { label: '激光美容', value: 72 },
        { label: '注射美容', value: 68 },
        { label: '皮肤管理', value: 90 },
        { label: '微整形', value: 76 }
    ],

    // 年龄分布
    ageDistribution: [
        { label: '18-25', value: 25 },
        { label: '26-35', value: 45 },
        { label: '36-45', value: 20 },
        { label: '46+', value: 10 }
    ],

    // 市场增长趋势
    marketGrowth: [
        { label: '2020', value: 520 },
        { label: '2021', value: 680 },
        { label: '2022', value: 850 },
        { label: '2023', value: 1020 },
        { label: '2024', value: 1280 },
        { label: '2025', value: 1500 }
    ],

    // 用户满意度维度
    satisfactionDimensions: [
        { label: '效果', value: 88 },
        { label: '服务', value: 92 },
        { label: '价格', value: 75 },
        { label: '环境', value: 85 },
        { label: '专业性', value: 90 }
    ]
};
