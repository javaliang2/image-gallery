# 📸 图片网站 - 在线图库

一个功能完整的响应式图片网站，支持网格布局、模糊搜索、分类、标签过滤等功能。完美适配手机、平板和桌面设备。

## ✨ 功能特性

### 🎯 核心功能
- **📱 响应式设计** - 移动优先设计，完美适配所有设备
  - 📱 手机 (≤480px)
  - 📱 平板 (≤768px)
  - 🖥️ 桌面 (>768px)
- **🔍 模糊搜索** - 实时搜索标题、描述、标签
- **🏷️ 分类菜单** - 全部、风景、建筑、人物、美食
- **🎯 标签过滤** - 多标签快速筛选
- **🖼️ 网格略缩图** - 自适应网格布局，鼠标悬停放大效果
- **📖 分页加载** - 加载更多按钮，支持渐进式加载
- **🔗 图床链接支持** - 支持任何图床的外链图片
- **🎨 平滑动画** - 流畅的过渡和动画效果
- **💾 图片下载** - 一键下载图片
- **📋 链接复制** - 快速复制图片链接

### 📦 技术特点
- 纯 HTML/CSS/JavaScript，无框架依赖
- 优化的性能和加载速度
- 完整的键盘快捷键支持（ESC 关闭模态框）
- XSS 防护（HTML 转义）
- 响应式图片处理

## 📁 项目结构

```
image-gallery/
├── index.html          # HTML 主页面
├── styles.css          # 响应式样式表
├── app.js              # 核心应用逻辑
├── data.js             # 图片数据配置
└── README.md           # 项目文档
```

## 🚀 快速开始

### 本地运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/javaliang2/image-gallery.git
   cd image-gallery
   ```

2. **打开网站**
   - 直接在浏览器中打开 `index.html`
   - 或使用本地服务器
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (需要安装 http-server)
   npx http-server
   ```

3. **在浏览器中访问**
   ```
   http://localhost:8000
   ```

## 📝 数据配置

### 添加图片

编辑 `data.js` 文件，向 `imageData` 数组中添加图片：

```javascript
{
    id: 1,
    title: '图片标题',
    description: '图片描述',
    url: 'https://example.com/image.jpg',  // 图床链接
    category: 'nature',                     // 分类
    tags: ['标签1', '标签2']               // 标签
}
```

### 支持的分类

| 分类 ID | 中文名 | 用途 |
|---------|-------|------|
| `all` | 全部 | 显示所有图片 |
| `nature` | 风景 | 风景摄影 |
| `architecture` | 建筑 | 建筑摄影 |
| `people` | 人物 | 人物肖像 |
| `food` | 美食 | 美食摄影 |

### 图床推荐

- **Unsplash** - https://unsplash.com (免费高质量图片)
- **Pexels** - https://pexels.com (免费图片)
- **Pixabay** - https://pixabay.com (免费图片)
- **Picsum Photos** - https://picsum.photos (随机占位图)
- **阿里云 OSS** - 自己的图床服务
- **腾讯云 COS** - 自己的图床服务

## 🎨 自定义样式

编辑 `styles.css` 文件中的 CSS 变量来自定义颜色：

```css
:root {
    --primary-color: #667eea;      /* 主色调 */
    --secondary-color: #764ba2;    /* 辅助色 */
    --text-color: #333;            /* 文字颜色 */
    --bg-color: #f8f9fa;           /* 背景颜色 */
    --border-color: #e0e0e0;       /* 边框颜色 */
}
```

## 📱 响应式设计

网站在不同设备上的表现：

### 桌面版 (>768px)
- 3-4 列网格布局
- 侧边栏导航
- 完整功能显示

### 平板版 (481px - 768px)
- 2-3 列网格布局
- 响应式导航
- 优化的触摸操作

### 手机版 (≤480px)
- 1-2 列网格布局
- 移动优化
- 触摸友好的按钮

## 🔍 搜索功能

### 搜索对象
- 图片标题
- 图片描述
- 图片标签

### 搜索示例
```
搜索 "山" → 标题或描述包含"山"的图片
搜索 "自然" → 标签包含"自然"的图片
搜索 "日落" → 所有匹配的图片
```

## 🏷️ 标签和分类

### 分类 vs 标签 的区别

**分类**：一个图片只能属于一个分类（互斥）
```
一个图片要么是 "风景"，要么是 "建筑"
```

**标签**：一个图片可以有多个标签（可组合）
```
一个图片可以同时有 "日落"、"海滩"、"自然" 三个标签
```

## ⌨️ 键盘快捷键

| 快捷键 | 功能 |
|-------|------|
| `ESC` | 关闭图片详情模态框 |

## 📊 性能优化

- 图片懒加载支持
- 防抖搜索
- CSS Grid 高效布局
- 最小化 DOM 操作
- 事件委托优化

## 🐛 常见问题

### Q: 图片不显示怎么办？
A: 检查图片链接是否有效，确保图床服务可访问。

### Q: 如何添加更多分类？
A: 编辑 `index.html` 中的导航，和 `app.js` 中的 `categoryNames` 对象。

### Q: 可以改变网格列数吗？
A: 编辑 `styles.css` 中的 `grid-template-columns` 属性。

### Q: 如何部署到生产环境？
A: 上传所有文件到网络服务器，或使用 GitHub Pages。

## 🚀 部署

### GitHub Pages 部署

1. 在 GitHub 上创建仓库
2. 上传文件
3. 转到 Settings → Pages
4. 选择 Source 为 main branch
5. 访问 `https://javaliang2.github.io/image-gallery`

### 静态服务器部署

上传所有文件到服务器即可。

## 📄 许可证

MIT License - 可自由使用和修改

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受使用图片网站！** 📸✨
