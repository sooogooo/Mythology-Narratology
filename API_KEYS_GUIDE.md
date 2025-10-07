# API Keys 配置指南

## 问题已修复

✅ **API Keys管理功能已完整实现**

之前的问题：模态窗口存在但无JavaScript代码
现在的状态：完整功能已实现

---

## 如何配置 API Keys

### 方法一：通过设置面板

1. **打开设置**
   - 点击页面右上角的"设置"按钮（齿轮图标）

2. **管理 API Keys**
   - 在设置面板中找到"AI模型配置"部分
   - 点击"管理 API Keys"按钮

3. **配置密钥**
   - 在弹出的模态窗口中，为需要的AI提供商输入API Key
   - 点击"保存"按钮

4. **验证配置**
   - 保存后会显示"已配置"状态（绿色✓图标）
   - 可以点击眼睛图标显示/隐藏密钥内容

---

## 支持的 AI 提供商

### 1. Google (Gemini)

**支持的模型**：
- Gemini 2.5 Flash（对话）
- Gemini 2.5 Flash Image（图片生成）

**获取 API Key**：
- 访问：https://makersuite.google.com/app/apikey
- 登录Google账号
- 创建新的API密钥
- 复制密钥并粘贴到输入框

**格式示例**：
```
AIzaSyC1234567890abcdefghijklmnopqrstuvw
```

---

### 2. OpenAI

**支持的模型**：
- GPT-4
- GPT-3.5 Turbo

**获取 API Key**：
- 访问：https://platform.openai.com/api-keys
- 登录OpenAI账号
- 点击"Create new secret key"
- 复制密钥（只显示一次！）
- 粘贴到输入框

**格式示例**：
```
sk-proj-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```

---

### 3. Anthropic (Claude)

**支持的模型**：
- Claude 3.5 Sonnet

**获取 API Key**：
- 访问：https://console.anthropic.com/settings/keys
- 登录Anthropic账号
- 创建新的API密钥
- 复制密钥并粘贴到输入框

**格式示例**：
```
sk-ant-api03-1234567890abcdefghijklmnopqrstuvwxyz-1234567890ABCDEFGHIJ
```

---

## 功能说明

### 1. 显示/隐藏密钥
- 默认：密钥显示为 `••••••••••••••••`
- 点击"眼睛"图标可以切换显示/隐藏
- 方便检查密钥是否正确

### 2. 保存密钥
- 输入完整的API Key
- 点击"保存"按钮
- 系统会验证密钥格式（最小长度20字符）
- 保存成功后显示提示

### 3. 清除密钥
- 点击"垃圾桶"图标
- 确认删除操作
- 密钥会从localStorage中清除

### 4. 配置状态
- **已配置**：绿色✓图标
- **未配置**：灰色✗图标
- 实时更新状态

---

## 安全说明

### ✅ 安全措施

1. **本地存储**
   - API密钥存储在浏览器的localStorage中
   - 仅在您的设备上存储
   - 不会发送到除官方API以外的任何服务器

2. **密码框保护**
   - 默认隐藏密钥内容
   - 防止他人偷看

3. **HTTPS传输**
   - API请求使用HTTPS加密传输
   - 密钥在传输过程中受到保护

### ⚠️ 安全建议

1. **定期更换密钥**
   - 建议每3-6个月更换一次API Key
   - 如果怀疑泄露，立即更换

2. **不要分享密钥**
   - API Key是您的私密凭证
   - 不要在公共场合展示或分享

3. **监控使用量**
   - 定期检查API使用统计
   - 发现异常立即更换密钥

4. **清除浏览器数据**
   - 清除浏览器数据会同时清除API Key
   - 在他人设备上使用后记得清除

---

## 常见问题

### Q1: 提示"API Key格式不正确"？
**A**:
- 检查是否复制了完整的密钥
- 确保没有多余的空格或换行
- 密钥长度应至少20字符

### Q2: 保存后仍然显示"未配置"？
**A**:
- 强制刷新浏览器（Ctrl+Shift+R）
- 检查浏览器是否允许localStorage
- 尝试重新输入并保存

### Q3: 如何测试API Key是否有效？
**A**:
1. 配置API Key后
2. 打开"设置" → "模型连通性测试"
3. 点击对应模型的"测试"按钮
4. 查看连接结果

### Q4: 可以同时配置多个提供商吗？
**A**:
可以！您可以同时配置Google、OpenAI、Anthropic的API Key，系统会根据选择的模型使用对应的密钥。

### Q5: 密钥会过期吗？
**A**:
- Google Gemini: 默认不过期（可在控制台设置）
- OpenAI: 默认不过期（可在控制台撤销）
- Anthropic: 默认不过期（可在控制台删除）

### Q6: 在不同设备上需要重新配置吗？
**A**:
是的。API Key存储在浏览器本地，不同设备需要分别配置。

### Q7: 忘记了之前配置的密钥怎么办？
**A**:
- 点击"眼睛"图标可以查看已保存的密钥
- 或者在对应平台的控制台重新生成新密钥

---

## 使用流程示例

### 示例1: 配置Gemini用于对话

```
1. 打开设置 → 管理 API Keys
2. 找到"Google (Gemini)"部分
3. 访问 https://makersuite.google.com/app/apikey
4. 创建并复制API Key
5. 粘贴到输入框
6. 点击"保存"
7. 关闭模态窗口
8. 在对话页面选择"Gemini 2.5 Flash"
9. 开始对话
```

### 示例2: 配置多个提供商

```
1. 打开设置 → 管理 API Keys
2. 配置 Google API Key → 保存
3. 配置 OpenAI API Key → 保存
4. 配置 Anthropic API Key → 保存
5. 关闭模态窗口
6. 在设置中选择需要的模型
7. 系统会自动使用对应的API Key
```

---

## 测试连通性

配置完API Key后，建议测试连通性：

1. **打开设置面板**
2. **滚动到"模型连通性测试"**
3. **点击对应模型的"测试"按钮**
4. **查看结果**：
   - ✓ 连接成功 | 延迟: XXXms
   - ✗ 连接失败 | 错误原因

---

## 故障排查

### 问题1: 点击"管理 API Keys"无反应

**解决方案**：
1. 检查浏览器控制台是否有错误
2. 确认 `api-keys-manager.js` 已加载
3. 强制刷新浏览器（Ctrl+Shift+R）

### 问题2: 保存后API调用失败

**检查清单**：
- [ ] API Key是否正确（没有多余空格）
- [ ] API Key是否有效（未过期/撤销）
- [ ] 网络连接是否正常
- [ ] 是否有足够的API配额

**解决步骤**：
1. 打开设置 → 模型连通性测试
2. 测试对应模型
3. 根据错误提示修复
4. 重新保存API Key

### 问题3: localStorage被清除

**原因**：
- 浏览器隐私模式
- 手动清除浏览器数据
- 浏览器设置禁用localStorage

**解决方案**：
1. 使用普通模式（非隐私模式）
2. 检查浏览器设置
3. 重新配置API Key

---

## 最佳实践

### 1. 开发环境
```
- 使用测试用的API Key
- 设置较低的使用限额
- 启用详细日志
```

### 2. 生产环境
```
- 使用生产级API Key
- 设置合理的使用限额
- 监控使用情况
- 定期更换密钥
```

### 3. 多人协作
```
- 每个人使用自己的API Key
- 不要共享同一个密钥
- 使用团队账号管理配额
```

---

## 相关文档

- **模型配置**：查看 `QUICK_START.md` 第4节
- **连通性测试**：查看 `VISUALIZATION_FEATURES.md` 第四节
- **Token统计**：查看 `VISUALIZATION_FEATURES.md` 第五节
- **AI模型系统**：查看 `ai-models.js` 代码注释

---

## 技术实现

### 代码结构

**文件**：`api-keys-manager.js`

**核心方法**：
```javascript
APIKeysManager.openModal()      // 打开模态窗口
APIKeysManager.closeModal()     // 关闭模态窗口
APIKeysManager.renderContent()  // 渲染界面
APIKeysManager.saveKey()        // 保存密钥
APIKeysManager.clearKey()       // 清除密钥
APIKeysManager.toggleVisibility() // 切换显示/隐藏
```

**依赖**：
- `ai-models.js` - AI模型管理（保存/获取/清除密钥）
- `toast.js` - 提示通知
- `index.html` - 模态窗口HTML结构

---

## 版本历史

**v2.1.1 (2025-01-08)**
- ✨ 实现完整的API Keys管理功能
- 🔧 修复"管理 API Keys"按钮无响应的问题
- 🎨 精美的UI界面
- 🔒 安全的本地存储

---

## 反馈与支持

如有问题，请联系：

**项目维护**: 重庆联合丽格科技有限公司
**邮箱**: yuxiaodong@beaucare.org
**电话**: 023-63326559

🤖 Generated with [Claude Code](https://claude.com/claude-code)
