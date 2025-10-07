# 部署指南

本文档提供了将《医美神话叙事学》应用部署到各种平台的详细说明。

## 📋 目录

- [GitHub仓库设置](#github仓库设置)
- [Netlify部署](#netlify部署)
- [Vercel部署](#vercel部署)
- [GitHub Pages部署](#github-pages部署)
- [自定义服务器部署](#自定义服务器部署)
- [部署后配置](#部署后配置)

## GitHub仓库设置

### 1. 创建GitHub仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `ebook-mathlogy` (或您喜欢的名称)
   - **Description**: `医美神话叙事学 - 如何发现美以及如何讲述美`
   - **Visibility**: Public 或 Private
   - **不要**勾选"Add a README file"（我们已经有了）

3. 点击 "Create repository"

### 2. 推送代码到GitHub

```bash
# 如果还没有添加远程仓库，添加它
git remote add origin https://github.com/您的用户名/ebook-mathlogy.git

# 将默认分支改名为main（可选，推荐）
git branch -M main

# 推送代码
git push -u origin main
```

如果您使用SSH：
```bash
git remote add origin git@github.com:您的用户名/ebook-mathlogy.git
git branch -M main
git push -u origin main
```

## Netlify部署

### 方法一：通过GitHub集成（推荐）

1. 访问 [Netlify](https://app.netlify.com/)
2. 点击 "Add new site" > "Import an existing project"
3. 选择 "GitHub"，授权Netlify访问您的GitHub账户
4. 选择 `ebook-mathlogy` 仓库
5. 配置构建设置：
   - **Branch to deploy**: `main`
   - **Build command**: 留空（静态网站无需构建）
   - **Publish directory**: `.` （当前目录）
6. 点击 "Deploy site"

### 方法二：通过CLI

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化（在项目根目录）
netlify init

# 部署
netlify deploy --prod
```

### Netlify配置说明

项目已包含 `netlify.toml` 配置文件，包含：
- 发布目录设置
- 重定向规则（SPA支持）
- 安全头配置
- 缓存策略

## Vercel部署

### 方法一：通过GitHub集成（推荐）

1. 访问 [Vercel](https://vercel.com/)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择您的 `ebook-mathlogy` 仓库
5. 配置项目：
   - **Framework Preset**: Other
   - **Build Command**: 留空
   - **Output Directory**: `.`
6. 点击 "Deploy"

### 方法二：通过CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

### Vercel配置说明

项目已包含 `vercel.json` 配置文件，包含：
- 路由规则
- 安全头配置
- 缓存策略

## GitHub Pages部署

### 方法一：通过GitHub Actions（推荐）

1. 在GitHub仓库，进入 Settings > Pages
2. Source选择 "GitHub Actions"
3. 创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. 提交并推送
5. 访问 `https://您的用户名.github.io/ebook-mathlogy/`

### 方法二：通过gh-pages分支

```bash
# 安装gh-pages
npm install -g gh-pages

# 部署
gh-pages -d .

# 或者使用git subtree
git subtree push --prefix . origin gh-pages
```

然后在GitHub仓库设置中：
1. Settings > Pages
2. Source选择 `gh-pages` 分支
3. Root目录选择 `/` （根目录）

## 自定义服务器部署

### 要求

- Web服务器（Nginx、Apache等）
- Node.js（可选，用于开发服务器）
- HTTPS证书（推荐）

### Nginx配置示例

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL证书配置
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # 根目录
    root /var/www/ebook-mathlogy;
    index index.html;

    # 安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Markdown文件
    location ~* \.md$ {
        expires 1h;
        add_header Content-Type "text/markdown; charset=utf-8";
    }

    # HTML文件不缓存
    location ~* \.html$ {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache配置示例

创建 `.htaccess` 文件：

```apache
# 重定向到HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 安全头
<IfModule mod_headers.c>
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Gzip压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml text/javascript
</IfModule>

# 缓存策略
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType text/markdown "access plus 1 hour"
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Markdown MIME类型
AddType text/markdown .md

# SPA路由支持
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### 部署步骤

```bash
# 1. 在服务器上克隆代码
cd /var/www
git clone https://github.com/您的用户名/ebook-mathlogy.git

# 2. 设置权限
chown -R www-data:www-data ebook-mathlogy
chmod -R 755 ebook-mathlogy

# 3. 重新加载Web服务器
# Nginx:
sudo systemctl reload nginx
# Apache:
sudo systemctl reload apache2
```

## 部署后配置

### 1. 自定义域名

#### Netlify
1. 在Netlify控制台，进入 Site settings > Domain management
2. 点击 "Add custom domain"
3. 按照说明配置DNS记录

#### Vercel
1. 在Vercel控制台，进入 Project Settings > Domains
2. 添加您的域名
3. 按照说明配置DNS记录

#### GitHub Pages
1. 在仓库根目录创建 `CNAME` 文件
2. 内容为您的域名：`yourdomain.com`
3. 在域名提供商配置DNS：
   ```
   CNAME记录: www -> 您的用户名.github.io
   A记录: @ -> 185.199.108.153
   A记录: @ -> 185.199.109.153
   A记录: @ -> 185.199.110.153
   A记录: @ -> 185.199.111.153
   ```

### 2. SSL证书

所有推荐的平台（Netlify、Vercel、GitHub Pages）都自动提供免费的SSL证书。

对于自定义服务器，推荐使用 [Let's Encrypt](https://letsencrypt.org/)：

```bash
# 安装Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书（Nginx）
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 自动续期
sudo certbot renew --dry-run
```

### 3. CDN加速（可选）

推荐使用：
- **Cloudflare**: 免费CDN，简单易用
- **AWS CloudFront**: 强大但较复杂
- **阿里云CDN**: 国内访问速度快

### 4. 监控和分析（可选）

可以集成：
- **Google Analytics**: 用户行为分析
- **Sentry**: 错误追踪
- **Hotjar**: 用户体验分析
- **Umami**: 轻量级、隐私友好的分析工具

在 `index.html` 中添加相应的追踪代码。

## 环境变量配置

本应用不需要服务器端环境变量。所有配置（API Keys等）都存储在用户浏览器的localStorage中。

## 性能优化建议

1. **启用GZIP压缩**: 所有平台都应启用
2. **配置缓存策略**: 静态资源长期缓存，HTML短期缓存
3. **使用CDN**: 加速全球访问
4. **优化图片**: 使用WebP格式（如果有图片资源）
5. **启用HTTP/2**: 提高加载速度

## 故障排查

### 问题：页面404错误

**原因**: SPA路由没有正确配置

**解决方案**:
- Netlify: 确保 `netlify.toml` 包含重定向规则
- Vercel: 确保 `vercel.json` 配置正确
- GitHub Pages: 可能需要使用hash路由
- 自定义服务器: 检查Web服务器配置

### 问题：Markdown文件无法加载

**原因**: CORS策略或MIME类型不正确

**解决方案**:
1. 确保服务器返回正确的Content-Type头
2. 检查文件路径是否正确
3. 查看浏览器控制台的错误信息

### 问题：CSS/JS文件加载失败

**原因**: 路径问题或缓存问题

**解决方案**:
1. 清除浏览器缓存
2. 检查文件路径是否使用相对路径
3. 检查CDN链接是否可访问

## 持续集成/持续部署（CI/CD）

如果使用GitHub Actions，所有推送到main分支的代码都会自动部署。

### GitHub Actions示例（Netlify）

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: '.'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 更新部署

### 通过Git推送自动部署

```bash
# 做出更改后
git add .
git commit -m "Update: 描述您的更改"
git push

# 平台会自动检测更改并重新部署
```

### 手动触发部署

#### Netlify
```bash
netlify deploy --prod
```

#### Vercel
```bash
vercel --prod
```

## 回滚部署

### Netlify
1. 在Netlify控制台，进入 Deploys
2. 找到之前的成功部署
3. 点击 "Publish deploy"

### Vercel
```bash
# 查看部署历史
vercel ls

# 回滚到指定部署
vercel rollback [deployment-url]
```

## 安全检查清单

- [ ] 启用HTTPS
- [ ] 配置安全头（X-Frame-Options、CSP等）
- [ ] 不在代码中硬编码API Keys
- [ ] 定期更新依赖
- [ ] 配置内容安全策略（CSP）
- [ ] 启用速率限制（如果有API）
- [ ] 定期备份

## 支持

如有部署问题，请：
1. 查看平台的官方文档
2. 在GitHub仓库提交Issue
3. 联系作者：yuxiaodong@beaucare.org

---

**祝您部署顺利！** 🚀
