# 可视化功能快速上手指南

## 🎯 所有功能已完成

### ✅ 1. SVG图标 + Web Fonts

**位置**: 全站使用
**文件**: `svg-icons.js`

**已集成图标**:
- 🎨 美学类: face, skincare, mirror, sparkle, lotus
- 📖 叙事类: story, dialogue, myth, journey
- 🎭 章节装饰: ornament1, ornament2, divider
- 🖼️ UI功能: zoom_in, zoom_out, fullscreen, close

**查看位置**:
- 首页：序言/前言标题旁的图标
- 首页：章节分隔装饰线
- 可视化页面：图标展示区

---

### ✅ 2. 图表 + 思维导图 + Mermaid

**文件**: `mermaid-integration.js`, `data-charts.js`

**Mermaid支持9种图表**:
```
- 流程图 (Flowchart)
- 思维导图 (Mindmap)
- 时间线 (Timeline)
- 序列图 (Sequence)
- 类图 (Class Diagram)
- 甘特图 (Gantt)
- 状态图 (State Diagram)
- 实体关系图 (ER Diagram)
- 关系图 (Graph)
```

**数据图表5种**:
```
- 柱状图 (Bar Chart)
- 折线图 (Line Chart)
- 饼图 (Pie Chart)
- 雷达图 (Radar Chart)
- 热力图 (Heatmap)
```

**查看位置**: 可视化页面 → 图表展示区

**在Markdown中使用**:
\`\`\`mermaid
flowchart TD
    A[开始] --> B[处理]
    B --> C[结束]
\`\`\`

---

### ✅ 3. 章节专属SVG配图（可放大缩小）

**文件**: `chapter-illustrations.js`

**设计特点**:
- ✓ 细线条 (0.3-1px stroke)
- ✓ 细字体 (Noto Sans SC 300-500)
- ✓ 黑白灰配色 (#333, #666, #999, #fafafa)
- ✓ 不拥挤、不重叠
- ✓ 点击放大查看

**10章专属插图**:
| 章节 | 主题 | 视觉元素 |
|------|------|----------|
| 第1章 | 美的形而上学 | 同心圆、辐射线、几何抽象 |
| 第2章 | 美的符号学 | 能指所指、符号网络 |
| 第3章 | 医美神话结构 | 层次椭圆、神话元素 |
| 第4章 | 身体叙事文化维度 | 多维交织网络 |
| 第5章 | 美的技术哲学 | 齿轮与思维融合 |
| 第6章 | 叙事伦理向度 | 伦理坐标系 |
| 第7章 | 美的经济学 | 价值链流动图 |
| 第8章 | 跨文化对话 | 东西方交流 |
| 第9章 | 数字时代重构 | 技术网络节点 |
| 第10章 | 美的未来 | 时间轴与趋势 |

**查看位置**: 阅读任意正文章节，插图自动显示在标题后

---

### ✅ 4. 自定义AI模型 + 连通性测试 + Token统计

**文件**: `ai-models.js`, `ai-stats-ui.js`

#### 4.1 AI模型配置

**位置**: 设置面板 → AI模型配置

**预置模型**:
- Gemini 2.5 Flash (对话)
- Gemini 2.5 Flash Image (图片)
- OpenAI GPT-4
- OpenAI GPT-3.5 Turbo
- Claude 3.5 Sonnet
- 自定义模型（可添加任意API）

**自定义模型**:
```javascript
AIModels.addCustomModel('my-model', {
    name: '我的模型',
    endpoint: 'https://api.example.com/chat',
    apiKeyParam: 'Authorization',
    requiresApiKey: true,
    supportsChat: true,
    supportsImage: false,
    formatRequest: (prompt, apiKey) => ({...}),
    formatResponse: (data) => data.response
});
```

#### 4.2 连通性测试

**位置**: 设置面板 → 模型连通性测试

**功能**:
- ✓ 单个模型测试
- ✓ 批量测试所有模型
- ✓ 显示延迟（毫秒）
- ✓ 错误诊断（未配置API Key、连接超时、HTTP错误等）
- ✓ 10秒超时保护

**结果示例**:
```
✓ 连接成功 | 延迟: 352ms
✗ 连接失败 | 未配置 API Key
✗ 连接失败 | 连接超时
```

#### 4.3 Token使用统计

**位置**: 设置面板 → Token使用统计

**统计内容**:
- 总Token数
- 输入Token数
- 输出Token数
- 总请求数
- 对话请求数
- 图片请求数
- 最后使用时间
- 首次使用时间

**可视化**:
- 📊 总览卡片（3个指标）
- 📈 Top 5柱状图
- 📋 详细列表

**导出功能**:
点击"导出"按钮 → 下载JSON报告
```json
{
  "exportTime": "2025-01-08T...",
  "models": [{
    "id": "gemini-flash",
    "name": "Gemini 2.5 Flash",
    "totalTokens": 15234,
    "inputTokens": 8120,
    "outputTokens": 7114,
    "requests": 42,
    ...
  }]
}
```

---

### ✅ 5. 其他可视化元素

#### 5.1 图片/SVG查看器
**文件**: `image-viewer.js`

**功能**:
- 缩放 (0.5x - 3x)
- 拖动移动
- 鼠标滚轮缩放
- 键盘快捷键 (Esc, +, -, 0)
- 触摸手势（移动端）
- 双指缩放

#### 5.2 可视化Todo列表
**文件**: `visual-todo.js`

**功能**:
- 创建/编辑/删除任务
- 完成度切换
- 进度跟踪 (0-100%)
- 优先级（高/中/低）
- 4大分类（学习/实践/思考/总结）
- 多维度筛选
- localStorage持久化

**位置**: 可视化页面 → 任务清单

#### 5.3 Toast通知系统
**文件**: `toast.js`

**类型**: success, error, warning, info
**使用**:
```javascript
Toast.success('操作成功');
Toast.error('连接失败');
```

#### 5.4 响应式设计
- ✓ 移动端优化
- ✓ 触摸手势支持
- ✓ iOS Safari特别优化
- ✓ 视口高度修正

---

## 📱 快速访问路径

### 查看所有可视化功能
1. 打开应用 → 点击底部"可视化"按钮
2. 查看：
   - SVG插画展示
   - 图标库展示
   - 任务清单

### 查看章节插图
1. 首页 → 点击任意章节"阅读本章"
2. 标题下方自动显示章节专属插图
3. 点击插图可放大查看

### 测试AI模型
1. 点击"设置"按钮
2. 滚动到"模型连通性测试"
3. 点击"测试"或"测试所有模型"

### 查看Token统计
1. 点击"设置"按钮
2. 滚动到"Token使用统计"
3. 查看图表和详细数据
4. 点击"导出"下载报告

### 管理API Keys
1. 点击"设置"按钮
2. 点击"管理 API Keys"
3. 配置各模型的API密钥

---

## 🎨 设计规范

### 颜色使用
```css
主文字: #333
次文字: #666
辅助文字: #999
边框/网格: #ddd
背景: #fafafa
强调色: #ffd700 (谨慎使用)
```

### 线条粗细
```
细线: 0.3px - 0.5px (装饰、网格)
中线: 0.5px - 0.8px (图标、边框)
粗线: 1px - 2px (强调、主要元素)
```

### 字体粗细
```
Light: 300 (辅助文字)
Regular: 400 (正文)
Medium: 500 (小标题)
Bold: 600-700 (大标题)
```

### 间距系统
```
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

---

## 🔧 开发者接口

### 渲染章节插图
```javascript
renderChapterIllustration('chapter1', {
    clickable: true,
    style: 'max-width: 600px;'
});
```

### 渲染Mermaid图表
```javascript
await MermaidIntegration.render(mermaidCode, 'containerId');
```

### 渲染数据图表
```javascript
DataCharts.render('containerId', 'bar', data, {
    title: '标题',
    color: '#666',
    showValues: true
});
```

### 测试AI连通性
```javascript
const result = await AIModels.testConnectivity('gemini-flash');
// { success: true, latency: 350, error: null }
```

### 记录Token使用
```javascript
AIModels.tokenStats.recordDetailed(
    'gemini-flash',
    128,  // input tokens
    128,  // output tokens
    'chat'
);
```

### 打开图片查看器
```javascript
imageViewer.open('image-url.jpg', '标题', 'image');
```

---

## 📊 文件结构

```
可视化系统文件（新增）:
├── chapter-illustrations.js   (15KB) - 10章专属SVG插图
├── mermaid-integration.js     (8KB)  - Mermaid图表集成
├── data-charts.js             (12KB) - 数据可视化图表
├── ai-stats-ui.js             (10KB) - AI统计UI界面
└── VISUALIZATION_FEATURES.md  (12KB) - 完整功能文档

核心文件（已更新）:
├── index.html                 - 添加Mermaid CDN、统计UI
├── outline.js                 - 自动嵌入插图、Mermaid渲染
└── ai-models.js               - 连通性测试、Token统计

现有文件（复用）:
├── svg-icons.js               - 20+图标库
├── svg-illustrations.js       - 通用插图
├── image-viewer.js            - 图片查看器
├── visual-todo.js             - 任务管理
├── data-charts.js             - 数据图表
└── toast.js                   - 通知系统
```

---

## ❓ 常见问题

### Q: 章节插图不显示？
**A**: 强制刷新浏览器（Ctrl+Shift+R 或 Cmd+Shift+R）

### Q: Mermaid图表渲染失败？
**A**: 检查Mermaid CDN是否加载，语法是否正确

### Q: Token统计不准确？
**A**: Token估算是简单算法，仅供参考。精确统计需要AI服务商返回真实Token数

### Q: 如何自定义章节插图？
**A**: 编辑 `chapter-illustrations.js`，修改对应章节的SVG代码

### Q: 如何添加新的AI模型？
**A**:
```javascript
AIModels.addCustomModel('model-id', {
    name: '模型名称',
    endpoint: 'API地址',
    // ... 其他配置
});
```

---

## 📝 更新日志

**v2.0.0 (2025-01-08)** - 完整可视化系统
- ✨ 10章专属SVG插图
- ✨ Mermaid.js图表支持（9种）
- ✨ 数据可视化图表（5种）
- ✨ AI模型连通性测试
- ✨ Token使用统计系统
- ✨ 20+个SVG图标库
- 🎨 细线条、黑白灰设计
- 📱 完整移动端优化

---

## 🚀 下一步

1. **浏览首页** - 查看优化后的布局和图标
2. **阅读章节** - 查看每章的专属插图
3. **打开可视化页面** - 探索所有可视化元素
4. **配置AI模型** - 测试连通性，查看统计
5. **强制刷新** - 确保加载最新代码

---

## 📞 支持

**项目**: 重庆联合丽格科技有限公司
**邮箱**: yuxiaodong@beaucare.org
**电话**: 023-63326559

🤖 Generated with [Claude Code](https://claude.com/claude-code)
