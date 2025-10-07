// 可视化Todo List系统
class VisualTodoList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.todos = this.loadTodos();
        this.categories = ['学习', '实践', '思考', '总结'];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    loadTodos() {
        const saved = localStorage.getItem('visual_todos');
        return saved ? JSON.parse(saved) : this.getDefaultTodos();
    }

    saveTodos() {
        localStorage.setItem('visual_todos', JSON.stringify(this.todos));
    }

    getDefaultTodos() {
        return [
            {
                id: 1,
                title: '阅读第一章：美的镜像',
                category: '学习',
                completed: false,
                priority: 'high',
                progress: 0,
                notes: '',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: '理解叙事学基本概念',
                category: '学习',
                completed: false,
                priority: 'medium',
                progress: 30,
                notes: '',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                title: '分析一个医美案例',
                category: '实践',
                completed: false,
                priority: 'high',
                progress: 0,
                notes: '',
                createdAt: new Date().toISOString()
            }
        ];
    }

    render() {
        if (!this.container) return;

        const html = `
            <div class="visual-todo-container">
                <!-- 头部 -->
                <div class="todo-header">
                    <div class="header-left">
                        <h3>
                            <i class="ri-task-line"></i>
                            学习任务清单
                        </h3>
                        <p class="todo-stats">
                            ${this.getCompletedCount()}/${this.todos.length} 已完成
                            <span class="progress-bar-mini">
                                <span class="progress-fill" style="width: ${this.getCompletionPercentage()}%"></span>
                            </span>
                        </p>
                    </div>
                    <div class="header-right">
                        <button class="btn-add-todo" id="addTodoBtn">
                            <i class="ri-add-line"></i>
                            添加任务
                        </button>
                    </div>
                </div>

                <!-- 过滤器 -->
                <div class="todo-filters">
                    <button class="filter-btn active" data-filter="all">
                        全部 <span class="count">${this.todos.length}</span>
                    </button>
                    <button class="filter-btn" data-filter="active">
                        进行中 <span class="count">${this.getActiveCount()}</span>
                    </button>
                    <button class="filter-btn" data-filter="completed">
                        已完成 <span class="count">${this.getCompletedCount()}</span>
                    </button>
                    ${this.categories.map(cat => `
                        <button class="filter-btn" data-filter="category:${cat}">
                            ${cat} <span class="count">${this.getCategoryCount(cat)}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- 任务列表 -->
                <div class="todo-list" id="todoList">
                    ${this.renderTodos()}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    renderTodos(filter = 'all') {
        let filteredTodos = this.todos;

        if (filter === 'active') {
            filteredTodos = this.todos.filter(t => !t.completed);
        } else if (filter === 'completed') {
            filteredTodos = this.todos.filter(t => t.completed);
        } else if (filter.startsWith('category:')) {
            const category = filter.split(':')[1];
            filteredTodos = this.todos.filter(t => t.category === category);
        }

        if (filteredTodos.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">
                        ${getSVGIcon('beauty', 'sparkle')}
                    </div>
                    <p>暂无任务</p>
                </div>
            `;
        }

        return filteredTodos.map(todo => this.renderTodoItem(todo)).join('');
    }

    renderTodoItem(todo) {
        const priorityColors = {
            high: 'var(--color-accent)',
            medium: 'var(--color-primary)',
            low: 'var(--color-text-tertiary)'
        };

        const priorityLabels = {
            high: '高优先级',
            medium: '中优先级',
            low: '低优先级'
        };

        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-main">
                    <div class="todo-check">
                        <input type="checkbox"
                               id="todo-${todo.id}"
                               ${todo.completed ? 'checked' : ''}
                               onchange="visualTodo.toggleComplete(${todo.id})">
                        <label for="todo-${todo.id}">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                    </div>

                    <div class="todo-content">
                        <div class="todo-title-row">
                            <h4 class="todo-title">${todo.title}</h4>
                            <div class="todo-badges">
                                <span class="badge badge-category">${todo.category}</span>
                                <span class="badge badge-priority" style="background: ${priorityColors[todo.priority]}20; color: ${priorityColors[todo.priority]}">
                                    ${priorityLabels[todo.priority]}
                                </span>
                            </div>
                        </div>

                        ${todo.progress > 0 ? `
                            <div class="todo-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${todo.progress}%"></div>
                                </div>
                                <span class="progress-text">${todo.progress}%</span>
                            </div>
                        ` : ''}

                        ${todo.notes ? `
                            <p class="todo-notes">${todo.notes}</p>
                        ` : ''}
                    </div>

                    <div class="todo-actions">
                        <button class="action-btn" onclick="visualTodo.editTodo(${todo.id})" title="编辑">
                            <i class="ri-edit-line"></i>
                        </button>
                        <button class="action-btn" onclick="visualTodo.deleteTodo(${todo.id})" title="删除">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // 添加任务
        const addBtn = document.getElementById('addTodoBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.showAddModal());
        }

        // 过滤器
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.dataset.filter;
                this.filterTodos(filter);
            });
        });
    }

    toggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            if (todo.completed) {
                todo.progress = 100;
            }
            this.saveTodos();
            this.render();
            this.bindEvents();

            // 显示完成动画
            if (todo.completed) {
                Toast.success('任务完成！🎉');
            }
        }
    }

    filterTodos(filter) {
        const list = document.getElementById('todoList');
        list.innerHTML = this.renderTodos(filter);
    }

    showAddModal() {
        const modal = this.createTodoModal();
        document.body.appendChild(modal);

        // 绑定表单提交
        const form = modal.querySelector('#todoForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo({
                title: form.todoTitle.value,
                category: form.todoCategory.value,
                priority: form.todoPriority.value,
                notes: form.todoNotes.value
            });
            this.closeModal(modal);
        });

        // 绑定关闭
        modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.close-btn').addEventListener('click', () => this.closeModal(modal));
    }

    createTodoModal(todo = null) {
        const isEdit = todo !== null;
        const modalHTML = `
            <div class="modal-overlay active">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${isEdit ? '编辑任务' : '添加任务'}</h3>
                        <button class="close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="todoForm">
                            <div class="form-group">
                                <label>任务标题 *</label>
                                <input type="text" name="todoTitle" required
                                       value="${todo ? todo.title : ''}"
                                       placeholder="请输入任务标题">
                            </div>

                            <div class="form-group">
                                <label>分类 *</label>
                                <select name="todoCategory" required>
                                    ${this.categories.map(cat => `
                                        <option value="${cat}" ${todo && todo.category === cat ? 'selected' : ''}>
                                            ${cat}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label>优先级 *</label>
                                <select name="todoPriority" required>
                                    <option value="high" ${todo && todo.priority === 'high' ? 'selected' : ''}>高优先级</option>
                                    <option value="medium" ${todo && todo.priority === 'medium' ? 'selected' : ''}>中优先级</option>
                                    <option value="low" ${todo && todo.priority === 'low' ? 'selected' : ''}>低优先级</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>备注</label>
                                <textarea name="todoNotes" rows="3" placeholder="添加备注...">${todo ? todo.notes : ''}</textarea>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn-secondary close-modal">取消</button>
                                <button type="submit" class="btn-primary">${isEdit ? '保存' : '添加'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        return div.firstElementChild;
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }

    addTodo(todoData) {
        const newTodo = {
            id: Date.now(),
            title: todoData.title,
            category: todoData.category,
            priority: todoData.priority,
            notes: todoData.notes || '',
            completed: false,
            progress: 0,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(newTodo);
        this.saveTodos();
        this.render();
        this.bindEvents();

        Toast.success('任务已添加');
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const modal = this.createTodoModal(todo);
        document.body.appendChild(modal);

        const form = modal.querySelector('#todoForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            todo.title = form.todoTitle.value;
            todo.category = form.todoCategory.value;
            todo.priority = form.todoPriority.value;
            todo.notes = form.todoNotes.value;

            this.saveTodos();
            this.render();
            this.bindEvents();
            this.closeModal(modal);

            Toast.success('任务已更新');
        });

        modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.close-btn').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.close-modal').addEventListener('click', () => this.closeModal(modal));
    }

    deleteTodo(id) {
        if (!confirm('确定要删除这个任务吗？')) return;

        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
        this.bindEvents();

        Toast.info('任务已删除');
    }

    getCompletedCount() {
        return this.todos.filter(t => t.completed).length;
    }

    getActiveCount() {
        return this.todos.filter(t => !t.completed).length;
    }

    getCategoryCount(category) {
        return this.todos.filter(t => t.category === category).length;
    }

    getCompletionPercentage() {
        if (this.todos.length === 0) return 0;
        return Math.round((this.getCompletedCount() / this.todos.length) * 100);
    }
}

// 全局实例
let visualTodo = null;

// 初始化函数
function initVisualTodo(containerId) {
    visualTodo = new VisualTodoList(containerId);
    return visualTodo;
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.VisualTodoList = VisualTodoList;
    window.initVisualTodo = initVisualTodo;
}
