// 图片查看器 - 支持SVG和普通图片的放大缩小
class ImageViewer {
    constructor() {
        this.isOpen = false;
        this.currentImage = null;
        this.scale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;

        this.init();
    }

    init() {
        this.createViewer();
        this.bindEvents();
    }

    createViewer() {
        const viewerHTML = `
            <div id="imageViewer" class="image-viewer">
                <div class="image-viewer-overlay"></div>
                <div class="image-viewer-container">
                    <div class="image-viewer-toolbar">
                        <button class="viewer-btn" id="zoomOut" title="缩小">
                            <i class="ri-zoom-out-line"></i>
                        </button>
                        <span class="zoom-level">100%</span>
                        <button class="viewer-btn" id="zoomIn" title="放大">
                            <i class="ri-zoom-in-line"></i>
                        </button>
                        <button class="viewer-btn" id="resetZoom" title="重置">
                            <i class="ri-refresh-line"></i>
                        </button>
                        <button class="viewer-btn" id="closeViewer" title="关闭">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <div class="image-viewer-content" id="viewerContent">
                        <div class="viewer-image-wrapper" id="viewerImageWrapper">
                            <!-- 图片内容 -->
                        </div>
                    </div>
                    <div class="image-viewer-info" id="viewerInfo">
                        <!-- 图片信息 -->
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', viewerHTML);
    }

    bindEvents() {
        const viewer = document.getElementById('imageViewer');
        const overlay = viewer.querySelector('.image-viewer-overlay');
        const content = document.getElementById('viewerContent');
        const wrapper = document.getElementById('viewerImageWrapper');

        // 关闭查看器
        document.getElementById('closeViewer').addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());

        // 缩放控制
        document.getElementById('zoomIn').addEventListener('click', () => this.zoom(0.2));
        document.getElementById('zoomOut').addEventListener('click', () => this.zoom(-0.2));
        document.getElementById('resetZoom').addEventListener('click', () => this.reset());

        // 鼠标滚轮缩放
        content.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.zoom(delta);
        });

        // 拖拽移动
        wrapper.addEventListener('mousedown', (e) => {
            if (this.scale > 1) {
                this.isDragging = true;
                this.startX = e.clientX - this.translateX;
                this.startY = e.clientY - this.translateY;
                wrapper.style.cursor = 'grabbing';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.translateX = e.clientX - this.startX;
                this.translateY = e.clientY - this.startY;
                this.updateTransform();
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                wrapper.style.cursor = this.scale > 1 ? 'grab' : 'default';
            }
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case '+':
                case '=':
                    this.zoom(0.2);
                    break;
                case '-':
                    this.zoom(-0.2);
                    break;
                case '0':
                    this.reset();
                    break;
            }
        });

        // 触摸事件支持（移动端）
        let initialDistance = 0;
        let initialScale = 1;

        wrapper.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                // 双指缩放
                initialDistance = this.getDistance(e.touches[0], e.touches[1]);
                initialScale = this.scale;
            } else if (e.touches.length === 1 && this.scale > 1) {
                // 单指拖拽
                this.isDragging = true;
                this.startX = e.touches[0].clientX - this.translateX;
                this.startY = e.touches[0].clientY - this.translateY;
            }
        });

        wrapper.addEventListener('touchmove', (e) => {
            e.preventDefault();

            if (e.touches.length === 2) {
                // 双指缩放
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scaleChange = currentDistance / initialDistance;
                this.setScale(initialScale * scaleChange);
            } else if (e.touches.length === 1 && this.isDragging) {
                // 单指拖拽
                this.translateX = e.touches[0].clientX - this.startX;
                this.translateY = e.touches[0].clientY - this.startY;
                this.updateTransform();
            }
        });

        wrapper.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }

    open(imageSrc, title = '', type = 'auto') {
        const wrapper = document.getElementById('viewerImageWrapper');
        const info = document.getElementById('viewerInfo');

        // 检测类型
        if (type === 'auto') {
            if (imageSrc.includes('svg') || imageSrc.startsWith('<svg')) {
                type = 'svg';
            } else {
                type = 'img';
            }
        }

        // 加载图片
        if (type === 'svg') {
            // SVG内容
            if (SVGIllustrations[imageSrc]) {
                wrapper.innerHTML = SVGIllustrations[imageSrc];
            } else {
                wrapper.innerHTML = imageSrc;
            }
        } else {
            // 普通图片
            wrapper.innerHTML = `<img src="${imageSrc}" alt="${title}">`;
        }

        // 设置信息
        if (title) {
            info.innerHTML = `<p>${title}</p>`;
            info.style.display = 'block';
        } else {
            info.style.display = 'none';
        }

        this.currentImage = imageSrc;
        this.reset();

        const viewer = document.getElementById('imageViewer');
        viewer.classList.add('active');
        this.isOpen = true;

        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    }

    close() {
        const viewer = document.getElementById('imageViewer');
        viewer.classList.remove('active');
        this.isOpen = false;
        this.currentImage = null;

        // 恢复页面滚动
        document.body.style.overflow = '';
    }

    zoom(delta) {
        this.setScale(this.scale + delta);
    }

    setScale(newScale) {
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, newScale));
        this.updateTransform();
        this.updateZoomLevel();
    }

    reset() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
        this.updateZoomLevel();
    }

    updateTransform() {
        const wrapper = document.getElementById('viewerImageWrapper');
        wrapper.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        wrapper.style.cursor = this.scale > 1 ? 'grab' : 'default';
    }

    updateZoomLevel() {
        const zoomLevel = document.querySelector('.zoom-level');
        zoomLevel.textContent = `${Math.round(this.scale * 100)}%`;
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// 全局函数：打开图片查看器
function openImageViewer(src, title = '', type = 'auto') {
    if (!window.imageViewerInstance) {
        window.imageViewerInstance = new ImageViewer();
    }
    window.imageViewerInstance.open(src, title, type);
}

// 初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.imageViewerInstance = new ImageViewer();
    });
} else {
    window.imageViewerInstance = new ImageViewer();
}
