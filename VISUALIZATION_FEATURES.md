# 可视化功能完整指南

## 概述

本项目现已配备完整的可视化系统，包括章节专属插图、图表支持、思维导图、AI模型管理等多种可视化元素。

---

## 一、章节专属SVG插图

### 1.1 功能说明

**所有章节**（序言、前言、正文10章、后记、附录、专题文章）都配有专门设计的SVG插图，插图主题与章节内容相符：

**前置内容**：
- **序言**：开启探索之旅 - 展开的书页与起点标记
- **前言**：作者自述 - 思维脉络网络与时空标记（重庆江北城、北京团结湖，2022-2025）

**正文章节**：
- **第一章**：美的形而上学 - 抽象哲学概念的同心圆与辐射线
- **第二章**：美的符号学 - 能指/所指的符号系统图解
- **第三章**：医美的神话结构 - 神话叙事的层次结构
- **第四章**：身体叙事的文化维度 - 多维度文化交织网络
- **第五章**：美的技术哲学 - 技术与哲学的融合图示
- **第六章**：叙事的伦理向度 - 伦理坐标系
- **第七章**：美的经济学叙事 - 价值链流动图
- **第八章**：跨文化的美学对话 - 东西方文化交流网络
- **第九章**：数字时代的美学重构 - 数字化技术网络
- **第十章**：美的未来叙事 - 时间轴与趋势预测

**后续内容**：
- **后记**：回顾与展望 - 螺旋上升路径与新起点
- **附录**：术语与资源 - 知识树结构（术语、方法、资源）
- **专题文章**：智能时代的医美神话 - 人与AI、数字化、具身体验的关系网络

**总计**：15个专属SVG插图

### 1.2 设计原则

- **细线条**：stroke-width 0.3-1px
- **克制用色**：黑白灰为主（#333, #666, #999, #fafafa）
- **避免拥挤**：合理间距，清晰布局
- **可交互**：点击可放大查看

### 1.3 使用方式

插图会自动嵌入到**所有章节**的阅读页面中，显示在标题之后。包括：
- ✅ 序言 (foreword)
- ✅ 前言 (preface)
- ✅ 第1-10章 (chapter1-10)
- ✅ 后记 (afterword)
- ✅ 附录 (appendix)
- ✅ 专题文章 (essay)

**代码调用**（`chapter-illustrations.js`）：
```javascript
// 渲染章节插图
renderChapterIllustration('chapter1', {
    clickable: true,
    style: 'max-width: 600px; margin: 0 auto;'
});
```

---

## 二、Mermaid.js 图表支持

### 2.1 支持的图表类型

1. **流程图 (Flowchart)** - 医美决策流程
2. **思维导图 (Mindmap)** - 美学理论体系
3. **时间线 (Timeline)** - 技术演进历程
4. **关系图 (Graph)** - 伦理关系网络
5. **序列图 (Sequence Diagram)** - 价值链交互
6. **类图 (Class Diagram)** - 文化交流结构
7. **甘特图 (Gantt)** - 数字化转型路线
8. **状态图 (State Diagram)** - 流程状态转换
9. **实体关系图 (ER Diagram)** - 数据模型

### 2.2 使用方式

在Markdown文件中使用代码块：

\`\`\`mermaid
flowchart TD
    A[开始] --> B{判断}
    B -->|是| C[执行]
    B -->|否| D[结束]
\`\`\`

或通过JavaScript调用：
```javascript
await MermaidIntegration.render(mermaidCode, 'containerId');
```

### 2.3 预设模板

`mermaid-integration.js` 提供了9个预设模板：
- `decisionFlow` - 决策流程
- `beautyTheoryMindmap` - 美学理论思维导图
- `techTimeline` - 技术时间线
- `ethicsRelation` - 伦理关系
- `valueChainSequence` - 价值链序列
- `culturalExchange` - 文化交流类图
- `digitalTransformation` - 数字化甘特图
- `stateTransition` - 状态转换
- `entityRelation` - 实体关系

---

## 三、数据可视化图表

### 3.1 图表类型

**纯SVG实现，无外部依赖**（`data-charts.js`）：

1. **条形图 (Bar Chart)** - 横向对比数据
2. **折线图 (Line Chart)** - 趋势变化
3. **饼图 (Pie Chart)** - 占比分布
4. **雷达图 (Radar Chart)** - 多维度评估
5. **热力图 (Heatmap)** - 矩阵数据

### 3.2 使用方式

```javascript
// 渲染条形图
DataCharts.render('containerId', 'bar', [
    { label: '项目A', value: 85 },
    { label: '项目B', value: 72 }
], {
    title: '受欢迎程度',
    color: '#666',
    showValues: true
});
```

### 3.3 预设数据示例

- `projectPopularity` - 医美项目受欢迎程度
- `ageDistribution` - 年龄分布
- `marketGrowth` - 市场增长趋势
- `satisfactionDimensions` - 用户满意度维度

### 3.4 交互功能

- 所有图表支持点击放大
- 自动适配主题配色
- 黑白灰设计，打印友好

---

## 四、AI模型连通性测试

### 4.1 功能说明

在**设置面板**中，提供了"模型连通性测试"功能：

- 测试所有配置的AI模型
- 显示连接状态（成功/失败）
- 测量响应延迟（毫秒）
- 识别错误原因

### 4.2 测试流程

1. 打开设置面板
2. 滚动到"模型连通性测试"
3. 点击单个模型的"测试"按钮
4. 或点击"测试所有模型"批量测试

### 4.3 测试结果

```
✓ 连接成功 | 延迟: 352ms
✗ 连接失败 | 未配置 API Key
✗ 连接失败 | 连接超时
```

### 4.4 技术实现

```javascript
// 测试单个模型
const result = await AIModels.testConnectivity('gemini-flash');
// result: { success: true/false, latency: number, error: string }
```

---

## 五、Token使用统计系统

### 5.1 功能说明

完整的Token使用追踪和统计系统，支持：

- 总Token数统计
- 输入/输出Token分别统计
- 请求次数记录（对话/图片）
- 使用时间记录
- 图表可视化展示
- 导出统计报告

### 5.2 统计数据

每个模型记录以下信息：
- `totalTokens` - 总Token数
- `inputTokens` - 输入Token数
- `outputTokens` - 输出Token数
- `requests` - 总请求数
- `chatRequests` - 对话请求数
- `imageRequests` - 图片请求数
- `lastUsed` - 最后使用时间
- `firstUsed` - 首次使用时间

### 5.3 查看统计

**位置**：设置面板 → Token使用统计

**功能**：
- 总览卡片（总Token、总请求、使用模型数）
- Top 5 Token使用量柱状图
- 详细列表（每个模型的统计）

### 5.4 导出报告

点击"导出"按钮，下载JSON格式的统计报告：
```json
{
  "exportTime": "2025-01-08T10:30:00.000Z",
  "models": [
    {
      "id": "gemini-flash",
      "name": "Gemini 2.5 Flash",
      "totalTokens": 15234,
      "inputTokens": 8120,
      "outputTokens": 7114,
      "requests": 42,
      "chatRequests": 42,
      "imageRequests": 0,
      "lastUsedDate": "2025/1/8 18:30:00",
      "firstUsedDate": "2025/1/6 14:22:15"
    }
  ]
}
```

### 5.5 手动记录Token

在AI调用时自动记录：
```javascript
// 简单记录
AIModels.tokenStats.record('gemini-flash', 256, 'chat');

// 详细记录（输入/输出分开）
AIModels.tokenStats.recordDetailed('gemini-flash', 128, 128, 'chat');
```

### 5.6 Token估算

简单估算文本Token数：
```javascript
const tokens = AIModels.estimateTokens('这是一段测试文本');
// 中文约1.5字符/token，英文约4字符/token
```

---

## 六、SVG图标库

### 6.1 图标分类

**4大类，20+图标**（`svg-icons.js`）：

**美学类 (beauty)**：
- `face` - 面部
- `skincare` - 护肤
- `mirror` - 镜子
- `sparkle` - 光芒
- `lotus` - 莲花

**叙事类 (narrative)**：
- `story` - 故事
- `dialogue` - 对话
- `myth` - 神话
- `journey` - 旅程

**章节装饰类 (chapter)**：
- `ornament1` - 装饰1
- `ornament2` - 装饰2
- `divider` - 分隔线

**UI功能类 (ui)**：
- `zoom_in` - 放大
- `zoom_out` - 缩小
- `fullscreen` - 全屏
- `close` - 关闭

### 6.2 使用方式

```javascript
// 渲染图标
const iconHtml = renderSVGIcon('beauty', 'lotus', 'my-icon', 'font-size: 2rem; color: #666;');
```

### 6.3 主题适配

所有图标使用 `currentColor`，自动继承当前文本颜色，完美适配6种配色主题。

---

## 七、图片/SVG查看器

### 7.1 功能特性

完整的图片查看器（`image-viewer.js`）：

- 缩放（0.5x - 3x）
- 拖动移动
- 鼠标滚轮缩放
- 键盘快捷键（Esc, +, -, 0）
- 触摸手势（移动端）
- 双指缩放

### 7.2 快捷键

- `Esc` - 关闭查看器
- `+` - 放大
- `-` - 缩小
- `0` - 重置大小

### 7.3 使用方式

```javascript
// 打开图片
imageViewer.open('image-url.jpg', '图片标题', 'image');

// 打开SVG
imageViewer.open('data:image/svg+xml;base64,...', 'SVG图表', 'svg');
```

---

## 八、可视化Todo列表

### 8.1 功能说明

完整的任务管理系统（`visual-todo.js`）：

- 创建/编辑/删除任务
- 完成度切换
- 进度跟踪（0-100%）
- 优先级（高/中/低）
- 4大分类（学习/实践/思考/总结）
- 多维度筛选
- localStorage持久化
- 完成统计

### 8.2 数据结构

```javascript
{
    id: 'unique-id',
    title: '任务标题',
    description: '任务描述',
    completed: false,
    progress: 60,
    priority: 'high', // high | medium | low
    category: '学习',  // 学习 | 实践 | 思考 | 总结
    createdAt: timestamp,
    completedAt: timestamp
}
```

### 8.3 访问方式

导航到**可视化**页面 → 任务清单

---

## 九、文件说明

### 9.1 新增文件

| 文件名 | 大小 | 功能 |
|--------|------|------|
| `chapter-illustrations.js` | ~15KB | 10章专属SVG插图 |
| `mermaid-integration.js` | ~8KB | Mermaid图表集成 |
| `data-charts.js` | ~12KB | 数据可视化图表 |
| `ai-stats-ui.js` | ~10KB | AI统计UI界面 |

### 9.2 修改文件

| 文件名 | 修改内容 |
|--------|---------|
| `index.html` | 添加Mermaid CDN、新JS文件、统计UI容器 |
| `outline.js` | 章节加载时嵌入插图、渲染Mermaid |
| `ai-models.js` | 添加连通性测试、Token统计系统 |

---

## 十、配色与设计

### 10.1 设计原则

1. **克制用色**：黑白灰为主（#333, #666, #999, #ccc, #f5f5f5）
2. **细线条**：stroke-width 0.3-1px
3. **充足间距**：避免元素拥挤和重叠
4. **字体细**：font-weight 300-500
5. **打印友好**：适合打印输出

### 10.2 颜色使用规范

```css
/* 主色调 */
--text-dark: #333;      /* 主要文字 */
--text-medium: #666;    /* 次要文字 */
--text-light: #999;     /* 辅助文字 */
--border-light: #ddd;   /* 边框/网格 */
--bg-white: #fafafa;    /* 背景 */

/* 强调色 */
--accent-gold: #ffd700; /* 金色点缀（谨慎使用） */
```

### 10.3 响应式设计

所有可视化组件均支持移动端：
- SVG自适应缩放
- 触摸手势支持
- 移动端优化布局

---

## 十一、最佳实践

### 11.1 SVG插图

✅ **推荐**：
- 使用viewBox保证缩放比例
- stroke-width不超过1px
- 使用currentColor继承主题色
- 提供点击放大功能

❌ **避免**：
- 过多渐变和滤镜效果
- 鲜艳颜色（红、绿、蓝等）
- 文字与图形重叠
- 过于复杂的路径

### 11.2 Mermaid图表

✅ **推荐**：
- 使用neutral主题
- 节点文字简洁
- 合理的层次结构
- 提供注释说明

❌ **避免**：
- 超过10个节点的复杂图
- 过长的文字标签
- 交叉连线过多
- 颜色过于丰富

### 11.3 数据图表

✅ **推荐**：
- 数据点不超过10个
- 使用简洁标签
- 显示数值便于阅读
- 保持灰度配色

❌ **避免**：
- 数据过于密集
- 3D效果
- 彩虹色板
- 过多图例

---

## 十二、常见问题

### Q1: 章节插图不显示？
**A**: 检查 `chapter-illustrations.js` 是否正确加载，确保在 `outline.js` 之前加载。

### Q2: Mermaid图表渲染失败？
**A**: 确认Mermaid CDN已加载，检查语法是否正确，可使用Mermaid官方编辑器验证。

### Q3: Token统计不准确？
**A**: Token估算是简单算法，仅供参考。如需精确统计，需要AI服务商返回真实Token数。

### Q4: 图表在移动端显示异常？
**A**: 所有图表使用响应式SVG，检查容器宽度是否正确。

### Q5: 如何自定义章节插图？
**A**: 编辑 `chapter-illustrations.js`，修改对应章节的SVG代码即可。

---

## 十三、未来扩展

### 13.1 计划功能

- [ ] 3D可视化（Three.js集成）
- [ ] 动画效果（GSAP动画库）
- [ ] 交互式数据探索
- [ ] WebGL图表渲染
- [ ] 实时协作标注
- [ ] AR/VR章节预览

### 13.2 优化方向

- [ ] SVG懒加载
- [ ] 图表缓存机制
- [ ] Service Worker离线支持
- [ ] WebAssembly加速渲染
- [ ] CDN优化

---

## 版本历史

**v2.0.0 (2025-01-08)**
- ✨ 新增10章专属SVG插图
- ✨ 集成Mermaid.js图表支持
- ✨ 添加5种数据可视化图表
- ✨ AI模型连通性测试
- ✨ Token使用统计系统
- ✨ 20+个SVG图标库
- 🎨 优化移动端体验
- 📝 完整可视化文档

**v1.0.0 (2025-01-07)**
- 基础应用功能

---

## 联系方式

**项目维护**: 重庆联合丽格科技有限公司
**邮箱**: yuxiaodong@beaucare.org
**电话**: 023-63326559

🤖 Generated with [Claude Code](https://claude.com/claude-code)
