# 《医美神话叙事学》部署指南

本文档提供了将《医美神话叙事学》应用部署到各种环境的详细说明，**特别针对Linux服务器提供了完整的部署步骤**。

---

## 📋 目录

- [Linux服务器完整部署指南](#linux服务器完整部署指南) ⭐ **推荐**
  - [Ubuntu/Debian部署](#ubuntudebian部署)
  - [CentOS/RHEL部署](#centosrhel部署)
  - [使用Nginx](#使用nginx)
  - [使用Apache](#使用apache)
  - [SSL证书配置](#ssl证书配置)
  - [系统服务配置](#系统服务配置)
  - [防火墙配置](#防火墙配置)
- [云平台快速部署](#云平台快速部署)
  - [Netlify部署](#netlify部署)
  - [Vercel部署](#vercel部署)
  - [GitHub Pages部署](#github-pages部署)
- [Docker部署](#docker部署)
- [性能优化](#性能优化)
- [故障排查](#故障排查)
- [安全检查清单](#安全检查清单)

---

## Linux服务器完整部署指南

### 前置条件

- 一台Linux服务器（任意发行版）
- Root权限或sudo权限
- 域名（可选，推荐）
- 基本的Linux命令行知识

### 系统要求

| 项目 | 最低要求 | 推荐配置 |
|------|----------|----------|
| CPU | 1核 | 2核+ |
| 内存 | 512MB | 1GB+ |
| 硬盘 | 1GB | 5GB+ |
| 带宽 | 1Mbps | 10Mbps+ |

---

## Ubuntu/Debian部署

### 1. 系统准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装必要工具
sudo apt install -y git curl wget vim net-tools
```

### 2. 安装Web服务器（选择一种）

#### 方案A：安装Nginx（推荐）

```bash
# 安装Nginx
sudo apt install -y nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx

# 查看版本
nginx -v
```

#### 方案B：安装Apache

```bash
# 安装Apache
sudo apt install -y apache2

# 启动Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# 检查状态
sudo systemctl status apache2

# 查看版本
apache2 -v
```

### 3. 克隆项目代码

```bash
# 创建项目目录
sudo mkdir -p /var/www/ebook-mathlogy

# 切换到目录
cd /var/www/ebook-mathlogy

# 克隆代码（使用HTTPS）
sudo git clone https://github.com/yourusername/ebook-mathlogy.git .

# 或使用SSH（需要配置SSH密钥）
# sudo git clone git@github.com:yourusername/ebook-mathlogy.git .
```

### 4. 设置文件权限

```bash
# 设置所有者为www-data（Nginx/Apache的默认用户）
sudo chown -R www-data:www-data /var/www/ebook-mathlogy

# 设置目录权限为755
sudo find /var/www/ebook-mathlogy -type d -exec chmod 755 {} \;

# 设置文件权限为644
sudo find /var/www/ebook-mathlogy -type f -exec chmod 644 {} \;
```

### 5. 配置Nginx

```bash
# 创建Nginx配置文件
sudo vim /etc/nginx/sites-available/ebook-mathlogy
```

复制以下配置内容：

```nginx
# HTTP服务器（重定向到HTTPS）
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # 重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS服务器
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # 根目录
    root /var/www/ebook-mathlogy;
    index index.html;

    # SSL证书配置（Let's Encrypt）
    # 首次部署时可以注释掉，等获取证书后再启用
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Content-Security-Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://fonts.googleapis.com https://generativelanguage.googleapis.com https://api.openai.com https://api.anthropic.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; connect-src 'self' https://generativelanguage.googleapis.com https://api.openai.com https://api.anthropic.com https://images.dev.stemcell.gold;" always;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
    gzip_disable "MSIE [1-6]\.";

    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Markdown文件
    location ~* \.md$ {
        expires 1h;
        add_header Content-Type "text/markdown; charset=utf-8";
        add_header Cache-Control "no-cache";
    }

    # HTML文件不缓存
    location ~* \.html$ {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # JSON文件
    location ~* \.json$ {
        expires 1h;
        add_header Content-Type "application/json; charset=utf-8";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # 日志配置
    access_log /var/log/nginx/ebook-mathlogy-access.log;
    error_log /var/log/nginx/ebook-mathlogy-error.log;
}
```

启用站点配置：

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/ebook-mathlogy /etc/nginx/sites-enabled/

# 删除默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 如果测试通过，重新加载Nginx
sudo systemctl reload nginx
```

### 6. 配置Apache（如果使用Apache）

```bash
# 创建Apache配置文件
sudo vim /etc/apache2/sites-available/ebook-mathlogy.conf
```

复制以下配置内容：

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    ServerAdmin yuxiaodong@beaucare.org

    DocumentRoot /var/www/ebook-mathlogy

    <Directory /var/www/ebook-mathlogy>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # 日志配置
    ErrorLog ${APACHE_LOG_DIR}/ebook-mathlogy-error.log
    CustomLog ${APACHE_LOG_DIR}/ebook-mathlogy-access.log combined
</VirtualHost>

# 如果已有SSL证书，添加HTTPS配置
# <VirtualHost *:443>
#     ServerName yourdomain.com
#     ServerAlias www.yourdomain.com
#     ServerAdmin yuxiaodong@beaucare.org
#
#     DocumentRoot /var/www/ebook-mathlogy
#
#     SSLEngine on
#     SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
#     SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
#
#     <Directory /var/www/ebook-mathlogy>
#         Options -Indexes +FollowSymLinks
#         AllowOverride All
#         Require all granted
#     </Directory>
#
#     ErrorLog ${APACHE_LOG_DIR}/ebook-mathlogy-ssl-error.log
#     CustomLog ${APACHE_LOG_DIR}/ebook-mathlogy-ssl-access.log combined
# </VirtualHost>
```

创建 `.htaccess` 文件：

```bash
# 在项目根目录创建.htaccess
sudo vim /var/www/ebook-mathlogy/.htaccess
```

```apache
# 启用Rewrite引擎
RewriteEngine On

# 强制HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 安全头
<IfModule mod_headers.c>
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Gzip压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript text/xml application/xml text/javascript text/markdown
</IfModule>

# 缓存策略
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType text/markdown "access plus 1 hour"
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType application/json "access plus 1 hour"
</IfModule>

# Markdown MIME类型
AddType text/markdown .md

# SPA路由支持
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 禁止访问隐藏文件
RedirectMatch 404 /\..*$
```

启用站点和必要的Apache模块：

```bash
# 启用必要的模块
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo a2enmod expires
sudo a2enmod deflate

# 启用站点
sudo a2ensite ebook-mathlogy.conf

# 禁用默认站点（可选）
sudo a2dissite 000-default.conf

# 测试配置
sudo apache2ctl configtest

# 如果测试通过，重启Apache
sudo systemctl restart apache2
```

---

## CentOS/RHEL部署

### 1. 系统准备

```bash
# 更新系统
sudo yum update -y

# 安装EPEL仓库（某些包需要）
sudo yum install -y epel-release

# 安装必要工具
sudo yum install -y git curl wget vim net-tools
```

### 2. 安装Nginx

```bash
# 安装Nginx
sudo yum install -y nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

### 3. 配置SELinux

```bash
# 临时禁用SELinux（测试用）
sudo setenforce 0

# 永久配置SELinux（生产环境推荐）
sudo setsebool -P httpd_can_network_connect 1
sudo setsebool -P httpd_read_user_content 1

# 设置目录的SELinux上下文
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/ebook-mathlogy(/.*)?"
sudo restorecon -Rv /var/www/ebook-mathlogy
```

### 4. 其他步骤

CentOS/RHEL的其他步骤（克隆代码、配置Nginx等）与Ubuntu/Debian相同，参照上面的Ubuntu部署步骤。

---

## SSL证书配置

### 使用Let's Encrypt（推荐，免费）

#### Ubuntu/Debian

```bash
# 安装Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取证书（自动配置Nginx）
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 或者手动获取证书（不自动配置）
# sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# 测试自动续期
sudo certbot renew --dry-run

# 查看证书信息
sudo certbot certificates
```

#### CentOS/RHEL

```bash
# 安装Certbot
sudo yum install -y certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

#### 自动续期配置

Let's Encrypt证书有效期为90天，需要定期续期：

```bash
# Certbot会自动创建续期的cron任务或systemd timer
# 检查自动续期是否配置
sudo systemctl list-timers | grep certbot

# 或检查cron任务
sudo crontab -l | grep certbot

# 手动续期（测试）
sudo certbot renew
```

### 使用自签名证书（测试环境）

```bash
# 创建证书目录
sudo mkdir -p /etc/ssl/private

# 生成自签名证书（有效期365天）
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt

# 生成Diffie-Hellman参数（提高安全性）
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

# 在Nginx配置中使用
# ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
# ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
# ssl_dhparam /etc/ssl/certs/dhparam.pem;
```

---

## 系统服务配置

### 创建简单的HTTP服务器服务（使用Node.js）

如果想使用项目自带的 `server.sh`：

```bash
# 安装Node.js（Ubuntu/Debian）
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 或在CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 测试Node.js安装
node --version
npm --version
```

创建systemd服务文件：

```bash
sudo vim /etc/systemd/system/ebook-mathlogy.service
```

```ini
[Unit]
Description=Ebook Mathlogy Web Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ebook-mathlogy
ExecStart=/var/www/ebook-mathlogy/server.sh
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

启用并启动服务：

```bash
# 赋予执行权限
sudo chmod +x /var/www/ebook-mathlogy/server.sh

# 重新加载systemd
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start ebook-mathlogy

# 设置开机自启
sudo systemctl enable ebook-mathlogy

# 查看状态
sudo systemctl status ebook-mathlogy

# 查看日志
sudo journalctl -u ebook-mathlogy -f
```

---

## 防火墙配置

### UFW（Ubuntu/Debian）

```bash
# 安装UFW
sudo apt install -y ufw

# 允许SSH
sudo ufw allow 22/tcp

# 允许HTTP
sudo ufw allow 80/tcp

# 允许HTTPS
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status verbose
```

### Firewalld（CentOS/RHEL）

```bash
# 启动Firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# 允许HTTP
sudo firewall-cmd --permanent --add-service=http

# 允许HTTPS
sudo firewall-cmd --permanent --add-service=https

# 重新加载防火墙
sudo firewall-cmd --reload

# 查看状态
sudo firewall-cmd --list-all
```

---

## 云平台快速部署

### Netlify部署

#### 方法一：通过Git集成（推荐）

1. 登录 [Netlify](https://app.netlify.com/)
2. 点击 "Add new site" → "Import an existing project"
3. 选择您的Git提供商（GitHub/GitLab/Bitbucket）
4. 授权Netlify访问您的仓库
5. 选择 `ebook-mathlogy` 仓库
6. 配置构建设置：
   - **Branch**: `main`
   - **Build command**: 留空
   - **Publish directory**: `.`
7. 点击 "Deploy site"

#### 方法二：通过CLI

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化
cd /path/to/ebook-mathlogy
netlify init

# 部署
netlify deploy --prod
```

### Vercel部署

#### 通过Git集成

1. 登录 [Vercel](https://vercel.com/)
2. 点击 "New Project"
3. 选择您的GitHub仓库
4. 配置：
   - **Framework Preset**: Other
   - **Build Command**: 留空
   - **Output Directory**: `.`
5. 点击 "Deploy"

#### 通过CLI

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd /path/to/ebook-mathlogy
vercel --prod
```

### GitHub Pages部署

#### 方法一：通过GitHub Actions

1. 在仓库中创建 `.github/workflows/deploy.yml`：

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

2. 在仓库设置中启用GitHub Pages
   - Settings → Pages
   - Source: GitHub Actions

#### 方法二：使用gh-pages分支

```bash
# 安装gh-pages工具
npm install -g gh-pages

# 部署
gh-pages -d .
```

---

## Docker部署

创建 `Dockerfile`：

```dockerfile
FROM nginx:alpine

# 复制项目文件到Nginx目录
COPY . /usr/share/nginx/html

# 复制自定义Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA路由
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

构建和运行：

```bash
# 构建镜像
docker build -t ebook-mathlogy:latest .

# 运行容器
docker run -d -p 80:80 --name ebook-mathlogy ebook-mathlogy:latest

# 查看日志
docker logs ebook-mathlogy

# 停止容器
docker stop ebook-mathlogy

# 删除容器
docker rm ebook-mathlogy
```

使用docker-compose：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./:/usr/share/nginx/html
    restart: unless-stopped
```

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

---

## 性能优化

### 1. 启用HTTP/2

Nginx已在配置中启用（`listen 443 ssl http2`）

### 2. 配置浏览器缓存

已在Nginx/Apache配置中包含

### 3. 使用CDN

推荐使用：
- **Cloudflare**: 免费CDN，简单易用
- **AWS CloudFront**: 功能强大
- **阿里云CDN**: 国内访问快

### 4. 图片优化

项目的150张配图已托管在专用CDN上，无需额外优化。

### 5. 监控和日志

```bash
# 查看Nginx访问日志
sudo tail -f /var/log/nginx/ebook-mathlogy-access.log

# 查看Nginx错误日志
sudo tail -f /var/log/nginx/ebook-mathlogy-error.log

# 查看系统资源使用
htop
# 或
top
```

---

## 故障排查

### 问题1: 403 Forbidden错误

**可能原因**：
- 文件权限不正确
- SELinux阻止

**解决方案**：
```bash
# 检查文件权限
ls -la /var/www/ebook-mathlogy

# 修复权限
sudo chown -R www-data:www-data /var/www/ebook-mathlogy
sudo chmod -R 755 /var/www/ebook-mathlogy

# CentOS: 检查SELinux
sudo getenforce
sudo setenforce 0  # 临时禁用测试
```

### 问题2: 404 Not Found错误

**可能原因**：
- 路径配置错误
- SPA路由未正确配置

**解决方案**：
```bash
# 检查Nginx配置
sudo nginx -t

# 确保包含try_files指令
# location / {
#     try_files $uri $uri/ /index.html;
# }
```

### 问题3: Markdown文件无法加载

**可能原因**：
- CORS问题
- MIME类型不正确

**解决方案**：
```bash
# 检查Nginx是否正确设置Content-Type
# 在浏览器开发者工具查看响应头
```

### 问题4: SSL证书问题

**可能原因**：
- 证书未正确配置
- 证书过期

**解决方案**：
```bash
# 检查证书
sudo certbot certificates

# 手动续期
sudo certbot renew

# 测试HTTPS
curl -I https://yourdomain.com
```

### 问题5: 端口被占用

```bash
# 检查端口占用
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# 或使用ss命令
sudo ss -tulpn | grep :80

# 杀死占用端口的进程
sudo kill -9 PID
```

---

## 安全检查清单

- [ ] **HTTPS已启用**
  ```bash
  curl -I https://yourdomain.com
  ```

- [ ] **防火墙已配置**
  ```bash
  sudo ufw status  # Ubuntu
  sudo firewall-cmd --list-all  # CentOS
  ```

- [ ] **安全头已设置**
  ```bash
  curl -I https://yourdomain.com | grep -E "X-Frame-Options|X-Content-Type-Options|Strict-Transport-Security"
  ```

- [ ] **不必要的端口已关闭**
  ```bash
  sudo netstat -tulpn
  ```

- [ ] **系统已更新**
  ```bash
  sudo apt update && sudo apt upgrade -y  # Ubuntu
  sudo yum update -y  # CentOS
  ```

- [ ] **日志轮转已配置**
  ```bash
  # Nginx日志轮转通常已自动配置
  ls -la /etc/logrotate.d/nginx
  ```

- [ ] **定期备份已设置**
  ```bash
  # 创建备份脚本
  sudo vim /usr/local/bin/backup-ebook.sh
  ```

示例备份脚本：

```bash
#!/bin/bash
# 备份脚本

BACKUP_DIR="/backup/ebook-mathlogy"
SOURCE_DIR="/var/www/ebook-mathlogy"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# 创建备份
tar -czf $BACKUP_DIR/ebook-mathlogy-$DATE.tar.gz $SOURCE_DIR

# 保留最近7天的备份
find $BACKUP_DIR -name "ebook-mathlogy-*.tar.gz" -mtime +7 -delete

echo "Backup completed: ebook-mathlogy-$DATE.tar.gz"
```

设置定期备份：

```bash
# 赋予执行权限
sudo chmod +x /usr/local/bin/backup-ebook.sh

# 添加到crontab（每天凌晨2点备份）
sudo crontab -e
# 添加以下行：
# 0 2 * * * /usr/local/bin/backup-ebook.sh >> /var/log/ebook-backup.log 2>&1
```

---

## 更新部署

### 方式一：Git Pull更新

```bash
# 进入项目目录
cd /var/www/ebook-mathlogy

# 拉取最新代码
sudo git pull origin main

# 重新加载Web服务器
sudo systemctl reload nginx
# 或
sudo systemctl reload apache2
```

### 方式二：自动化更新脚本

```bash
# 创建更新脚本
sudo vim /usr/local/bin/update-ebook.sh
```

```bash
#!/bin/bash
# 自动更新脚本

PROJECT_DIR="/var/www/ebook-mathlogy"
LOG_FILE="/var/log/ebook-update.log"

echo "[$(date)] Starting update..." >> $LOG_FILE

cd $PROJECT_DIR

# 备份当前版本
git stash

# 拉取最新代码
git pull origin main >> $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
    echo "[$(date)] Update successful" >> $LOG_FILE

    # 重新加载Web服务器
    systemctl reload nginx >> $LOG_FILE 2>&1

    echo "[$(date)] Service reloaded" >> $LOG_FILE
else
    echo "[$(date)] Update failed" >> $LOG_FILE
    git stash pop
fi
```

```bash
# 赋予执行权限
sudo chmod +x /usr/local/bin/update-ebook.sh

# 手动执行测试
sudo /usr/local/bin/update-ebook.sh

# 或设置定期更新（谨慎使用）
# sudo crontab -e
# 0 3 * * 0 /usr/local/bin/update-ebook.sh
```

---

## 监控和维护

### 1. 设置监控

使用 `monit` 监控服务：

```bash
# 安装monit
sudo apt install -y monit  # Ubuntu
sudo yum install -y monit  # CentOS

# 配置monit
sudo vim /etc/monit/conf.d/nginx

```
check process nginx with pidfile /var/run/nginx.pid
  start program = "/bin/systemctl start nginx"
  stop program = "/bin/systemctl stop nginx"
  if failed host localhost port 80 then restart
  if 5 restarts within 5 cycles then timeout
```

```bash
# 启动monit
sudo systemctl start monit
sudo systemctl enable monit

# 查看状态
sudo monit status
```

### 2. 日志管理

```bash
# 查看实时日志
sudo tail -f /var/log/nginx/ebook-mathlogy-access.log

# 分析访问日志
sudo goaccess /var/log/nginx/ebook-mathlogy-access.log --log-format=COMBINED

# 或安装logwatch进行日志分析
sudo apt install -y logwatch
```

---

## 支持与帮助

如遇到部署问题：

1. **查看日志**：
   ```bash
   # Nginx日志
   sudo tail -100 /var/log/nginx/error.log

   # 系统日志
   sudo journalctl -xe
   ```

2. **检查配置**：
   ```bash
   sudo nginx -t
   sudo apache2ctl configtest
   ```

3. **联系支持**：
   - 📧 Email: yuxiaodong@beaucare.org
   - 💬 GitHub Issues: [提交问题](https://github.com/yourusername/ebook-mathlogy/issues)
   - 📱 微信: sooogooo

---

## 附录

### 常用命令速查

```bash
# Nginx
sudo systemctl start nginx      # 启动
sudo systemctl stop nginx       # 停止
sudo systemctl restart nginx    # 重启
sudo systemctl reload nginx     # 重新加载配置
sudo systemctl status nginx     # 查看状态
sudo nginx -t                   # 测试配置

# Apache
sudo systemctl start apache2    # 启动
sudo systemctl stop apache2     # 停止
sudo systemctl restart apache2  # 重启
sudo systemctl reload apache2   # 重新加载配置
sudo systemctl status apache2   # 查看状态
sudo apache2ctl configtest      # 测试配置

# 防火墙
sudo ufw status                 # UFW状态
sudo ufw allow 80/tcp           # 允许端口
sudo firewall-cmd --list-all    # Firewalld状态

# 文件权限
sudo chown -R www-data:www-data /var/www/ebook-mathlogy
sudo chmod -R 755 /var/www/ebook-mathlogy

# Git操作
git pull origin main            # 拉取更新
git status                      # 查看状态
git log --oneline -10           # 查看提交历史
```

---

**祝您部署顺利！🚀**

如有任何问题，请随时联系我们。
