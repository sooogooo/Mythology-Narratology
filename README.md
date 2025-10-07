# 医美神话叙事学 - 如何发现美以及如何讲述美

一个现代化的电子书Web应用，集成AI对话、图片生成和交互式阅读功能。

## 📖 项目简介

《医美神话叙事学 - 如何发现美以及如何讲述美》是一本探索医美行业叙事艺术的150,000字专业著作。本应用提供了一个优雅、互动的在线阅读平台，让读者能够深入理解医美行业的叙事构建与美学表达。

**作者**: 于晓冬
**单位**: 联合丽格医美连锁投资股份有限公司西南中心
**邮箱**: yuxiaodong@beaucare.org
**微信**: sooogooo

## ✨ 主要功能

### 📚 完整书籍内容
- 10个主要章节（共150,000字）
- 序言、前言、后记、附录、专题文章
- 响应式章节阅读器，支持移动设备
- 章节导航和进度追踪

### 🤖 多AI模型支持
- **对话模型**:
  - Gemini 2.5 Flash (Google)
  - OpenAI GPT-4
  - OpenAI GPT-3.5 Turbo
  - Claude 3.5 Sonnet (Anthropic)
  - 自定义模型支持

- **图片生成模型**:
  - Gemini 2.5 Flash Image (Nano Banana)
  - 自定义模型支持

### 🎨 视觉设计
- 6个精心设计的配色主题
  - 优雅灰（默认）
  - 温暖玫瑰
  - 薄荷清新
  - 薰衣梦境
  - 珍珠白
  - 珊瑚粉

- 3种字号设置（小、中、大）
- 流畅的页面切换动画
- 优雅的微交互效果

### 💬 智能对话
- AI驱动的医美知识问答
- 划词查询功能
- 对话历史记录（最多50条）
- 3种输出风格（轻松幽默、标准日常、科学严谨）
- 3种输出长度（详细、标准、简约）

### 🖼️ 图片生成
- AI生成医美相关图片
- 图片历史记录（最多30条）
- 支持PNG/PDF导出

### 📱 移动优化
- 完全响应式设计
- iOS Safari优化
- 触摸友好的交互
- 防止双击缩放

## 🚀 快速开始

### 在线访问

直接访问部署好的网站：[您的部署URL]

### 本地运行

1. 克隆仓库
```bash
git clone https://github.com/yourusername/ebook-mathlogy.git
cd ebook-mathlogy
```

2. 使用本地服务器运行
```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js http-server
npx http-server -p 8000
```

3. 在浏览器中打开
```
http://localhost:8000
```

### AI模型配置

1. 点击右上角"设置"按钮
2. 选择"AI模型配置"
3. 点击"管理 API Keys"
4. 根据需要配置各AI服务商的API Key：
   - **Gemini**: https://aistudio.google.com/apikey
   - **OpenAI**: https://platform.openai.com/api-keys
   - **Anthropic**: https://console.anthropic.com/

## 📂 项目结构

```
ebook-mathlogy/
├── index.html              # 主HTML文件
├── style.css               # 主样式文件
├── ui-enhancements.css     # UI增强样式
├── app.js                  # 应用逻辑
├── toast.js                # Toast通知系统
├── ai-models.js            # AI模型管理系统
├── outline.js              # 书籍大纲和章节加载
├── chapters/               # 章节内容（Markdown格式）
│   ├── foreword.md
│   ├── preface.md
│   ├── chapter-1.md
│   ├── ...
│   ├── afterword.md
│   ├── appendix.md
│   └── essay.md
├── README.md               # 项目说明
├── LICENSE                 # 许可证
└── .gitignore              # Git忽略文件
```

## 🛠️ 技术栈

- **前端框架**: 原生JavaScript (ES6+)
- **样式**: CSS3 (CSS自定义属性、Flexbox、Grid)
- **Markdown解析**: Marked.js
- **图标**: Remix Icon
- **字体**: Noto Sans SC、Noto Serif SC (Google Fonts)

### AI集成
- Gemini API (Google AI Studio)
- OpenAI API
- Anthropic Claude API
- 自定义API支持

## 🎯 浏览器支持

- ✅ Chrome/Edge (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (iOS 14+, macOS 11+)
- ✅ 移动浏览器（iOS Safari、Chrome Mobile）

## 🌐 部署

### Netlify

```bash
# 一键部署
netlify deploy --prod
```

或通过GitHub集成自动部署

### Vercel

```bash
# 一键部署
vercel --prod
```

或通过GitHub集成自动部署

### GitHub Pages

```bash
# 推送到gh-pages分支
git subtree push --prefix . origin gh-pages
```

## 📝 开发指南

### 添加新章节

1. 在 `chapters/` 目录创建Markdown文件
2. 在 `outline.js` 中添加章节配置
3. 确保文件路径正确

### 添加自定义AI模型

在设置面板中：
1. 选择"自定义模型"
2. 配置API端点
3. 设置请求/响应格式
4. 保存API Key

### 自定义主题

在 `style.css` 中添加新的主题配置：

```css
[data-theme="your-theme"] {
    --color-primary: #YOUR_COLOR;
    --color-accent: #YOUR_COLOR;
    /* ... 其他颜色变量 */
}
```

## 🔒 隐私与安全

- **API Keys**: 仅存储在浏览器本地存储（localStorage）中
- **对话历史**: 仅保存在用户浏览器本地
- **无服务器跟踪**: 不收集用户数据
- **HTTPS**: 建议部署时使用HTTPS

## 📄 许可证

Copyright © 2025 重庆联合丽格科技有限公司

本项目内容受版权保护。未经授权，禁止商业使用。

详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 贡献指南
1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📞 联系方式

**作者**: 于晓冬
**邮箱**: yuxiaodong@beaucare.org
**微信**: sooogooo
**公司**: 重庆联合丽格科技有限公司
**地址**: 重庆市渝中区临江支路28号
**电话**: 023-63326559
**ICP**: 渝ICP备2024023473号

## 🙏 致谢

感谢所有为本书提供帮助和支持的人：
- 联合丽格医美连锁投资股份有限公司团队
- 所有接受访谈的医美从业者和消费者
- 提供宝贵意见和建议的专业人士

## 📊 更新日志

### v1.0.0 (2025年秋)
- ✨ 首次发布
- 📚 完整的150,000字书籍内容
- 🤖 多AI模型支持系统
- 🎨 6个精美主题
- 💬 智能对话功能
- 🖼️ AI图片生成
- 📱 完整的移动端优化

---

**Built with ❤️ by 于晓冬 @ 联合丽格医美连锁投资股份有限公司**
