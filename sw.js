/**
 * Service Worker for PWA功能和离线缓存
 * 医美神话叙事学 - 性能优化
 */

const CACHE_NAME = 'medbeauty-v1.0.0';
const RUNTIME_CACHE = 'medbeauty-runtime';

// 需要缓存的静态资源
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/ui-enhancements.css',
    '/visual-components.css',
    '/toast.js',
    '/ai-models.js',
    '/api-keys-manager.js',
    '/outline.js',
    '/app.js',
    '/svg-icons.js',
    '/svg-illustrations.js',
    '/chapter-illustrations.js',
    '/image-viewer.js',
    '/visual-todo.js',
    '/mermaid-integration.js',
    '/data-charts.js',
    '/ai-stats-ui.js',
    '/init-visual.js'
];

// 需要缓存的章节文件
const CHAPTER_FILES = [
    '/chapters/foreword.md',
    '/chapters/preface.md',
    '/chapters/chapter1.md',
    '/chapters/chapter2.md',
    '/chapters/chapter3.md',
    '/chapters/chapter4.md',
    '/chapters/chapter5.md',
    '/chapters/chapter6.md',
    '/chapters/chapter7.md',
    '/chapters/chapter8.md',
    '/chapters/chapter9.md',
    '/chapters/chapter10.md',
    '/chapters/afterword.md',
    '/chapters/appendix.md',
    '/chapters/essay.md'
];

// 安装事件 - 预缓存静态资源
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets');
            // 分批缓存，避免一次性请求过多
            return Promise.all([
                cache.addAll(STATIC_ASSETS),
                cache.addAll(CHAPTER_FILES.slice(0, 5)), // 先缓存前5个章节
            ]);
        }).then(() => {
            // 强制激活新的Service Worker
            return self.skipWaiting();
        })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 立即控制所有客户端
            return self.clients.claim();
        })
    );
});

// Fetch事件 - 网络请求拦截
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // 跳过非GET请求
    if (request.method !== 'GET') {
        return;
    }

    // 跳过chrome扩展和其他协议
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // API请求 - 网络优先策略
    if (url.pathname.includes('/api/') || url.pathname.includes('generativelanguage.googleapis.com')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // 图片资源 - 缓存优先策略（CDN图片）
    if (url.hostname.includes('images.dev.stemcell.gold') ||
        url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // 静态资源 - 缓存优先策略
    if (url.pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/) ||
        url.pathname.match(/\.md$/)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // HTML文件 - 网络优先策略
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // 外部CDN资源 - 缓存优先策略
    if (url.hostname.includes('cdn.jsdelivr.net') ||
        url.hostname.includes('fonts.loli.net') ||
        url.hostname.includes('gstatic.loli.net')) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // 默认策略 - 网络优先
    event.respondWith(networkFirst(request));
});

/**
 * 缓存优先策略
 * 优先从缓存读取，缓存未命中时从网络获取并缓存
 */
async function cacheFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        // 只缓存成功的响应
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);

        // 返回离线页面（如果有）
        const offlineResponse = await cache.match('/offline.html');
        if (offlineResponse) {
            return offlineResponse;
        }

        throw error;
    }
}

/**
 * 网络优先策略
 * 优先从网络获取，网络失败时从缓存读取
 */
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const networkResponse = await fetch(request);

        // 只缓存成功的响应
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);

        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

/**
 * 后台同步 - 缓存剩余章节
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_CHAPTERS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                console.log('[SW] Caching remaining chapters');
                return cache.addAll(CHAPTER_FILES.slice(5)); // 缓存剩余章节
            })
        );
    }
});
