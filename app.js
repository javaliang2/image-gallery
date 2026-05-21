// ========== 应用状态 ==========
const appState = {
    allImages: [],
    filteredImages: [],
    displayedImages: [],
    currentPage: 1,
    itemsPerPage: 12,
    selectedCategory: 'all',
    selectedTags: new Set(['all']),
    searchQuery: '',
    currentImageId: null
};

// ========== DOM 元素缓存 ==========
const dom = {
    searchInput: document.getElementById('searchInput'),
    clearBtn: document.getElementById('clearBtn'),
    imageGrid: document.getElementById('imageGrid'),
    imageCount: document.getElementById('imageCount'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    modal: document.getElementById('imageModal'),
    modalClose: document.querySelector('.modal-close'),
    modalImage: document.getElementById('modalImage'),
    modalTitle: document.getElementById('modalTitle'),
    modalDescription: document.getElementById('modalDescription'),
    modalCategory: document.getElementById('modalCategory'),
    modalTags: document.getElementById('modalTags'),
    downloadBtn: document.getElementById('downloadBtn'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    toast: document.getElementById('toast'),
    tagsFilter: document.getElementById('tagsFilter'),
    navLinks: document.querySelectorAll('.nav-link')
};

// ========== 分类翻译 ==========
const categoryNames = {
    'all': '全部',
    'nature': '风景',
    'architecture': '建筑',
    'people': '人物',
    'food': '美食'
};

// ========== 初始化应用 ==========
document.addEventListener('DOMContentLoaded', () => {
    appState.allImages = imageData.map((img, index) => ({
        ...img,
        id: index + 1
    }));
    
    initializeApp();
});

function initializeApp() {
    initializeTagsFilter();
    setupEventListeners();
    filterAndDisplayImages();
}

// ========== 初始化标签过滤 ==========
function initializeTagsFilter() {
    const allTags = new Set();
    
    appState.allImages.forEach(image => {
        image.tags.forEach(tag => {
            allTags.add(tag);
        });
    });
    
    const tagsArray = Array.from(allTags).sort();
    const tagsContainer = dom.tagsFilter;
    
    tagsArray.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.textContent = tag;
        btn.dataset.tag = tag;
        btn.addEventListener('click', () => toggleTag(tag, btn));
        tagsContainer.appendChild(btn);
    });
}

// ========== 事件监听器 ==========
function setupEventListeners() {
    // 搜索输入
    dom.searchInput.addEventListener('input', (e) => {
        appState.searchQuery = e.target.value.trim().toLowerCase();
        dom.clearBtn.style.display = appState.searchQuery ? 'block' : 'none';
        appState.currentPage = 1;
        filterAndDisplayImages();
    });
    
    // 清除搜索
    dom.clearBtn.addEventListener('click', () => {
        appState.searchQuery = '';
        dom.searchInput.value = '';
        dom.clearBtn.style.display = 'none';
        appState.currentPage = 1;
        filterAndDisplayImages();
        dom.searchInput.focus();
    });
    
    // 分类导航
    dom.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(link);
        });
    });
    
    // 加载更多
    dom.loadMoreBtn.addEventListener('click', () => {
        appState.currentPage++;
        displayImages();
    });
    
    // 模态框关闭
    dom.modalClose.addEventListener('click', closeModal);
    dom.modal.addEventListener('click', (e) => {
        if (e.target === dom.modal) closeModal();
    });
    
    // 复制链接
    dom.copyLinkBtn.addEventListener('click', () => {
        const image = appState.allImages.find(img => img.id === appState.currentImageId);
        if (image) {
            navigator.clipboard.writeText(image.url).then(() => {
                showToast('链接已复制到剪贴板');
            }).catch(() => {
                showToast('复制失败，请重试');
            });
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ========== 分类选择 ==========
function selectCategory(link) {
    dom.navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    const category = link.dataset.category;
    appState.selectedCategory = category;
    appState.currentPage = 1;
    filterAndDisplayImages();
}

// ========== 标签切换 ==========
function toggleTag(tag, btn) {
    const tagBtns = dom.tagsFilter.querySelectorAll('.tag-btn');
    
    if (tag === 'all') {
        if (appState.selectedTags.has('all')) {
            appState.selectedTags.clear();
            appState.selectedTags.add('all');
        } else {
            appState.selectedTags.clear();
            appState.selectedTags.add('all');
        }
        // 更新所有按钮状态
        tagBtns.forEach(b => {
            if (b.dataset.tag === 'all') {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    } else {
        appState.selectedTags.delete('all');
        
        if (appState.selectedTags.has(tag)) {
            appState.selectedTags.delete(tag);
        } else {
            appState.selectedTags.add(tag);
        }
        
        // 如果没有选中任何标签，则选中"全部"
        if (appState.selectedTags.size === 0) {
            appState.selectedTags.add('all');
        }
        
        // 更新按钮状态
        tagBtns.forEach(b => {
            if (b.dataset.tag === 'all') {
                b.classList.toggle('active', appState.selectedTags.has('all'));
            } else {
                b.classList.toggle('active', appState.selectedTags.has(b.dataset.tag));
            }
        });
    }
    
    appState.currentPage = 1;
    filterAndDisplayImages();
}

// ========== 过滤和显示图片 ==========
function filterAndDisplayImages() {
    // 按分类过滤
    let filtered = appState.allImages;
    
    if (appState.selectedCategory !== 'all') {
        filtered = filtered.filter(img => img.category === appState.selectedCategory);
    }
    
    // 按标签过滤
    if (!appState.selectedTags.has('all')) {
        filtered = filtered.filter(img => {
            return Array.from(appState.selectedTags).some(tag => 
                img.tags.includes(tag)
            );
        });
    }
    
    // 按搜索词过滤（模糊搜索）
    if (appState.searchQuery) {
        filtered = filtered.filter(img => {
            const query = appState.searchQuery;
            return (
                img.title.toLowerCase().includes(query) ||
                img.description.toLowerCase().includes(query) ||
                img.tags.some(tag => tag.toLowerCase().includes(query))
            );
        });
    }
    
    appState.filteredImages = filtered;
    appState.currentPage = 1;
    
    // 更新统计
    dom.imageCount.textContent = filtered.length;
    
    // 显示图片
    displayImages();
}

// ========== 显示图片 ==========
function displayImages() {
    const startIndex = (appState.currentPage - 1) * appState.itemsPerPage;
    const endIndex = startIndex + appState.itemsPerPage;
    
    appState.displayedImages = appState.filteredImages.slice(0, endIndex);
    
    // 只在第一页时清空网格
    if (appState.currentPage === 1) {
        dom.imageGrid.innerHTML = '';
    }
    
    if (appState.displayedImages.length === 0) {
        if (appState.currentPage === 1) {
            dom.imageGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1;">
                    <div class="no-results-icon">🔍</div>
                    <p>未找到匹配的图片</p>
                </div>
            `;
        }
        dom.loadMoreBtn.style.display = 'none';
        return;
    }
    
    // 渲染新图片
    const newImages = appState.displayedImages.slice(
        appState.currentPage === 1 ? 0 : (appState.currentPage - 2) * appState.itemsPerPage + appState.itemsPerPage
    );
    
    newImages.forEach(image => {
        const card = createImageCard(image);
        dom.imageGrid.appendChild(card);
    });
    
    // 显示或隐藏加载更多按钮
    dom.loadMoreBtn.style.display = 
        endIndex < appState.filteredImages.length ? 'block' : 'none';
}

// ========== 创建图片卡片 ==========
function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'image-card';
    
    const tagsHtml = image.tags
        .slice(0, 2)
        .map(tag => `<span class="image-card-tag">${tag}</span>`)
        .join('');
    
    card.innerHTML = `
        <img src="${image.url}" alt="${image.title}" class="image-card-img" onerror="this.style.background='linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'">
        <div class="image-card-content">
            <h3 class="image-card-title">${escapeHtml(image.title)}</h3>
            <p class="image-card-description">${escapeHtml(image.description)}</p>
            <div class="image-card-tags">
                ${tagsHtml}
                ${image.tags.length > 2 ? `<span class="image-card-tag">+${image.tags.length - 2}</span>` : ''}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(image.id));
    
    return card;
}

// ========== 打开模态框 ==========
function openModal(imageId) {
    const image = appState.allImages.find(img => img.id === imageId);
    if (!image) return;
    
    appState.currentImageId = imageId;
    
    dom.modalImage.src = image.url;
    dom.modalImage.alt = image.title;
    dom.modalTitle.textContent = image.title;
    dom.modalDescription.textContent = image.description;
    dom.modalCategory.textContent = categoryNames[image.category] || image.category;
    
    // 标签
    dom.modalTags.innerHTML = image.tags
        .map(tag => `<span class="modal-tag">${escapeHtml(tag)}</span>`)
        .join('');
    
    // 下载链接
    dom.downloadBtn.href = image.url;
    dom.downloadBtn.download = `image-${image.id}.jpg`;
    
    dom.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ========== 关闭模态框 ==========
function closeModal() {
    dom.modal.style.display = 'none';
    document.body.style.overflow = '';
    appState.currentImageId = null;
}

// ========== 显示提示信息 ==========
function showToast(message, duration = 2000) {
    dom.toast.textContent = message;
    dom.toast.style.display = 'block';
    dom.toast.style.animation = 'slideUp 0.3s ease';
    
    setTimeout(() => {
        dom.toast.style.display = 'none';
    }, duration);
}

// ========== HTML 转义 ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== 搜索优化：防抖 ==========
let searchTimeout;
const originalSearchInput = dom.searchInput.addEventListener;
dom.searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        appState.searchQuery = e.target.value.trim().toLowerCase();
        dom.clearBtn.style.display = appState.searchQuery ? 'block' : 'none';
        appState.currentPage = 1;
        filterAndDisplayImages();
    }, 300);
});
