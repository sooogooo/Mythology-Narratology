# 浏览器缓存清除指南

如果您看到 `[object Promise]` 而不是插图，这很可能是浏览器缓存了旧版本的 JavaScript 文件。

## 🔄 清除缓存的方法

### Chrome / Edge
1. **方法一**：硬刷新
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **方法二**：清除缓存
   - 按 `F12` 打开开发者工具
   - 右键点击浏览器刷新按钮
   - 选择"清空缓存并硬性重新加载"

### Firefox
1. **方法一**：硬刷新
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **方法二**：清除缓存
   - 按 `Ctrl + Shift + Delete`
   - 选择"缓存"
   - 点击"立即清除"

### Safari
1. **清除缓存**
   - `Cmd + Option + E` 清空缓存
   - 然后 `Cmd + R` 刷新页面

## 🔍 验证是否加载了新版本

打开浏览器开发者工具（F12），在控制台输入：

```javascript
typeof renderChapterIllustrationSync
```

应该显示 `"function"`，如果显示 `"undefined"`，说明还是旧版本。

## 📊 调试页面

访问以下页面进行测试：
- http://localhost:28008/debug-chapter.html

这个页面会显示详细的加载过程和调试信息。

## 🔧 如果问题依然存在

请提供以下信息：
1. 浏览器类型和版本
2. 是否看到加载动画（旋转的图标）
3. 浏览器控制台是否有错误信息
4. 在哪个具体位置看到 `[object Promise]`
