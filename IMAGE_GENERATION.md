# 图片生成功能使用说明

本项目已集成 **Google Gemini 2.5 Flash Image**（又名 Nano Banana）AI图片生成功能。

## 功能特性

- ✅ 使用 Google 最新的 Gemini 2.5 Flash Image 模型
- ✅ 支持中文提示词，自动生成高质量图片
- ✅ API Key 安全存储在浏览器本地（localStorage）
- ✅ 在设置面板中可视化配置 API Key
- ✅ 生成的图片自动保存到历史记录
- ✅ 支持导出为 PNG/PDF（需集成导出库）

## 快速开始

### 1. 获取 Gemini API Key

访问 [Google AI Studio](https://aistudio.google.com/apikey) 获取免费的 API Key。

**注意**：
- 免费配额每分钟限制 15 次请求
- 每张图片消耗约 1290 tokens
- 价格：$30.00 / 1M tokens（约 $0.039/张图片）

### 2. 配置 API Key

有两种方式配置 API Key：

#### 方式 1：通过设置面板（推荐）

1. 点击右上角的 **设置** 按钮
2. 滚动到 **Gemini API配置** 部分
3. 在输入框中粘贴您的 API Key
4. 点击 **保存** 按钮
5. API Key 将安全保存在您的浏览器本地

#### 方式 2：首次使用时输入

1. 直接进入 **视觉设计** 页面
2. 输入图片描述后点击 **生成图片**
3. 系统会弹出对话框要求输入 API Key
4. 输入后 API Key 将自动保存

### 3. 生成图片

1. 进入 **视觉设计** 页面
2. 在输入框中输入图片描述，例如：
   - "一位优雅的女性正在接受面部美容护理"
   - "现代医美诊所的舒适等候区"
   - "科技感的医美设备展示"
3. 点击 **生成图片** 按钮
4. 等待几秒钟，AI 将生成并显示图片
5. 生成的图片会自动保存到 **历史** 记录

## API Key 管理

### 查看保存状态

API Key 保存后会显示提示信息：
- ✅ 绿色：成功保存
- ❌ 红色：保存失败或输入无效

### 更换 API Key

1. 打开设置面板
2. 在 **Gemini API配置** 中输入新的 API Key
3. 点击 **保存** 即可替换

### 清除 API Key

1. 打开设置面板
2. 点击 **清除已保存** 按钮
3. 确认后 API Key 将从浏览器中删除

## 技术细节

### API 端点

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent
```

### 请求格式

```javascript
{
  "contents": [{
    "parts": [{
      "text": "请生成一张与医美相关的图片：[用户输入]"
    }]
  }],
  "generationConfig": {
    "responseModalities": ["image"]
  }
}
```

### 响应格式

API 返回 Base64 编码的图片数据，系统会自动将其转换为可显示的图片。

```javascript
{
  "candidates": [{
    "content": {
      "parts": [{
        "inlineData": {
          "mimeType": "image/png",
          "data": "base64_encoded_image_data"
        }
      }]
    }
  }]
}
```

### 存储方式

- **localStorage Key**: `gemini_api_key`
- **仅存储在浏览器本地**，不会上传到任何服务器
- 清除浏览器数据会删除 API Key

## 常见问题

### Q: API Key 安全吗？

A: API Key 仅保存在您的浏览器本地存储中，不会发送到任何第三方服务器。但请注意：
- 不要在公共设备上保存 API Key
- 不要分享包含 API Key 的截图或代码
- 定期轮换您的 API Key

### Q: 生成失败怎么办？

A: 常见原因及解决方法：
1. **API Key 无效**：检查 Key 是否正确复制，尝试重新配置
2. **配额用尽**：等待配额重置或升级到付费计划
3. **网络问题**：检查网络连接，确保能访问 Google API
4. **提示词问题**：避免使用违规内容，使用更清晰的描述

### Q: 支持哪些图片格式？

A: 目前生成的图片为 PNG 格式（1024x1024 像素），以 Base64 编码显示。

### Q: 如何批量生成？

A: 目前每次只能生成一张图片。若需批量生成，请：
1. 逐个输入提示词
2. 所有生成的图片会保存在历史记录中
3. 注意 API 调用频率限制（免费版：15次/分钟）

### Q: 可以编辑已生成的图片吗？

A: Gemini 2.5 Flash Image 支持图片编辑功能，但目前项目中尚未集成。计划在未来版本中添加：
- 图片修改（基于自然语言描述）
- 多图融合
- 角色一致性维护

## 相关资源

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 文档](https://ai.google.dev/gemini-api/docs/image-generation)
- [定价信息](https://ai.google.dev/pricing)
- [开发者博客](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image/)

## 更新日志

### v1.0.0 (2024-10-07)

- ✅ 集成 Gemini 2.5 Flash Image API
- ✅ 支持设置面板中配置 API Key
- ✅ 自动保存 API Key 到 localStorage
- ✅ 错误处理和用户提示
- ✅ 历史记录保存

---

如有问题或建议，请联系：yuxiaodong@beaucare.org
