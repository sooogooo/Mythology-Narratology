# 可视化功能说明

本文档介绍《医美神话叙事学》电子书的可视化设计方案和使用说明。

## 📊 功能概览

### 1. SVG图标系统

**位置**: `svg-icons.js`

提供了丰富的医美和叙事主题图标库，包括：

#### 医美图标 (beauty)
- `face` - 面部美容
- `skincare` - 护肤品
- `mirror` - 镜子
- `sparkle` - 光芒效果
- `lotus` - 莲花（内在美）

#### 叙事图标 (narrative)
- `story` - 故事书
- `dialogue` - 对话
- `myth` - 神话
- `journey` - 旅程

#### 章节装饰 (chapter)
- `ornament1` - 装饰线条1
- `ornament2` - 装饰线条2
- `divider` - 分隔线

#### 功能图标 (ui)
- `zoom_in` - 放大
- `zoom_out` - 缩小
- `fullscreen` - 全屏
- `close` - 关闭

#### 使用方法

```javascript
// 渲染图标
const icon = renderSVGIcon('beauty', 'face', 'custom-class', 'font-size: 2rem');

// 获取原始SVG代码
const svgCode = getSVGIcon('narrative', 'story');

// 在HTML中使用
document.getElementById('myIcon').innerHTML = renderSVGIcon('beauty', 'sparkle');
```

### 2. SVG配图系统

**位置**: `svg-illustrations.js`

提供章节主题插画，包括：

- `chapter1` - 美的镜像（椭圆镜子主题）
- `chapter2` - 叙事之河（流动的故事）
- `concept` - 概念图（核心概念关系）
- `lotus_meditation` - 莲花冥想（内在美绽放）
- `journey_map` - 旅程地图（医美体验之旅）

#### 使用方法

```javascript
// 渲染配图（可点击放大）
const illustration = renderIllustration('chapter1', {
    className: 'my-illustration',
    style: 'max-width: 600px',
    clickable: true
});

// 在HTML中使用
document.getElementById('myIllustration').innerHTML = renderIllustration('concept');
```

#### 特点

- ✅ 响应式设计
- ✅ 可点击放大
- ✅ 优雅的悬浮效果
- ✅ 主题色自适应

### 3. 图片查看器

**位置**: `image-viewer.js`

功能强大的图片/SVG查看器，支持：

#### 核心功能

- ✅ 放大/缩小（0.5x - 3x）
- ✅ 拖拽移动
- ✅ 鼠标滚轮缩放
- ✅ 键盘快捷键
- ✅ 触摸手势（移动端）
- ✅ 双指缩放

#### 快捷键

- `Esc` - 关闭查看器
- `+/=` - 放大
- `-` - 缩小
- `0` - 重置

#### 使用方法

```javascript
// 打开图片
openImageViewer('image.jpg', '图片标题', 'img');

// 打开SVG（使用插画名称）
openImageViewer('chapter1', '第一章插画', 'svg');

// 自动检测类型
openImageViewer('path/to/image', '标题', 'auto');
```

#### 移动端支持

- 单指拖拽（当放大时）
- 双指缩放
- 流畅的动画
- 优化的触摸响应

### 4. 可视化Todo List

**位置**: `visual-todo.js`

功能丰富的任务管理系统，专为学习设计：

#### 功能特性

- ✅ 任务创建/编辑/删除
- ✅ 完成状态切换
- ✅ 进度跟踪（0-100%）
- ✅ 优先级标记（高/中/低）
- ✅ 分类管理（学习/实践/思考/总结）
- ✅ 多维度过滤
- ✅ 数据持久化（localStorage）
- ✅ 完成统计

#### 使用方法

```javascript
// 初始化Todo List
const todoList = initVisualTodo('containerId');

// 手动操作
todoList.addTodo({
    title: '任务标题',
    category: '学习',
    priority: 'high',
    notes: '备注信息'
});

todoList.toggleComplete(taskId);
todoList.editTodo(taskId);
todoList.deleteTodo(taskId);
```

#### 界面说明

1. **头部**
   - 总任务数和完成数
   - 进度条
   - "添加任务"按钮

2. **过滤器**
   - 全部
   - 进行中
   - 已完成
   - 按分类（学习/实践/思考/总结）

3. **任务卡片**
   - 复选框（完成状态）
   - 任务标题
   - 分类和优先级标签
   - 进度条（可选）
   - 备注（可选）
   - 编辑/删除按钮

## 🎨 集成说明

### 在页面中使用

可视化功能已集成到"可视化"页面（导航栏"可视化"标签）：

1. **SVG插画展示区**
   - 展示4个主要插画
   - 点击可放大查看
   - 支持缩放和拖拽

2. **SVG图标展示区**
   - 展示6个主题图标
   - 不同颜色和大小示例

3. **Todo List区域**
   - 完整的任务管理功能
   - 默认包含示例任务

### 在章节中添加插画

编辑 `outline.js` 或章节Markdown文件：

```javascript
// 在章节内容中添加
const chapterWithIllustration = `
# 第一章：美的镜像

${renderIllustration('chapter1')}

这是章节内容...
`;
```

### 自定义插画

在 `svg-illustrations.js` 中添加新的SVG：

```javascript
SVGIllustrations.myCustom = `
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <!-- 您的SVG代码 -->
    </svg>
`;
```

### 自定义图标

在 `svg-icons.js` 中添加新图标：

```javascript
SVGIcons.myCategory = {
    myIcon: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- 您的SVG代码 -->
        </svg>
    `
};
```

## 📱 响应式设计

所有可视化组件都经过移动端优化：

### 图片查看器
- 触摸手势支持
- 双指缩放
- 单指拖拽
- 全屏显示

### Todo List
- 自适应布局
- 触摸友好的按钮尺寸
- 移动端优化的过滤器
- 垂直堆叠布局

### SVG插画
- 响应式宽度
- 保持宽高比
- 自适应网格布局

## 🎨 主题支持

所有可视化组件都支持应用的6个主题：

- 使用CSS变量 (`var(--color-primary)`)
- SVG颜色使用 `currentColor`
- 自动适配主题切换

## ⚡ 性能优化

### SVG优化
- 使用内联SVG减少HTTP请求
- viewBox优化减小文件大小
- 简化路径和形状

### 图片查看器
- CSS transform实现流畅动画
- 事件委托减少监听器
- 懒加载策略

### Todo List
- localStorage缓存
- 虚拟滚动（大量任务时）
- 防抖/节流优化

## 🔧 API参考

### SVGIcons API

```javascript
// 渲染图标
renderSVGIcon(category, name, className?, style?)

// 获取SVG代码
getSVGIcon(category, name)

// 示例
renderSVGIcon('beauty', 'face', 'icon-large', 'color: red')
```

### SVGIllustrations API

```javascript
// 渲染插画
renderIllustration(name, options?)

// Options:
{
    className: 'custom-class',
    style: 'max-width: 600px',
    clickable: true
}
```

### ImageViewer API

```javascript
// 打开查看器
openImageViewer(src, title?, type?)

// ImageViewer实例方法
window.imageViewerInstance.open(src, title, type)
window.imageViewerInstance.close()
window.imageViewerInstance.zoom(delta)
window.imageViewerInstance.reset()
```

### VisualTodoList API

```javascript
// 初始化
const todoList = initVisualTodo(containerId)

// 方法
todoList.addTodo(data)
todoList.editTodo(id)
todoList.deleteTodo(id)
todoList.toggleComplete(id)
todoList.filterTodos(filter)
```

## 📦 文件结构

```
ebook-mathlogy/
├── svg-icons.js              # SVG图标库
├── svg-illustrations.js      # SVG配图库
├── image-viewer.js           # 图片查看器
├── visual-todo.js            # Todo List组件
├── visual-components.css     # 可视化组件样式
└── init-visual.js            # 初始化脚本
```

## 🐛 故障排查

### 图标不显示
- 检查 `svg-icons.js` 是否正确加载
- 确认图标分类和名称正确
- 查看浏览器控制台错误

### 插画不能点击放大
- 确认 `image-viewer.js` 已加载
- 检查 `clickable` 选项是否设置为 `true`
- 查看是否有JavaScript错误

### Todo List数据丢失
- 检查浏览器localStorage是否被禁用
- 确认没有清除浏览器数据
- 查看控制台是否有存储相关错误

### 移动端缩放不工作
- 确认触摸事件已绑定
- 检查是否与其他手势冲突
- 尝试刷新页面

## 🎯 最佳实践

1. **图标使用**
   - 保持图标尺寸一致
   - 使用语义化的图标名称
   - 为图标添加aria-label提升可访问性

2. **插画使用**
   - 每章使用相关主题的插画
   - 避免过度使用影响性能
   - 提供替代文本描述

3. **图片查看器**
   - 为所有重要图片启用查看器
   - 提供清晰的标题和说明
   - 考虑图片加载性能

4. **Todo List**
   - 合理分类任务
   - 定期清理已完成任务
   - 使用优先级功能管理重要任务

## 📝 更新日志

### v1.0.0 (2025)
- ✨ 初始版本发布
- ✨ SVG图标系统（20+图标）
- ✨ SVG配图系统（5个主题插画）
- ✨ 图片查看器（支持缩放拖拽）
- ✨ 可视化Todo List
- ✨ 完整的移动端支持

## 🤝 贡献

欢迎贡献新的SVG图标和插画！

### 添加新图标
1. 在 `svg-icons.js` 中添加SVG代码
2. 确保使用 `currentColor` 以支持主题
3. viewBox统一为 `0 0 100 100`
4. 更新本文档

### 添加新插画
1. 在 `svg-illustrations.js` 中添加SVG
2. viewBox推荐 `0 0 800 400`
3. 使用CSS变量实现主题支持
4. 更新本文档和示例

## 📞 支持

如有问题或建议：
- 📧 Email: yuxiaodong@beaucare.org
- 💬 WeChat: sooogooo

---

**设计与开发**: 于晓冬 @ 联合丽格医美连锁投资股份有限公司
**更新时间**: 2025年秋
