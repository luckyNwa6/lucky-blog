# 网站性能优化指南

## 已完成的优化

### 1. 启用图片懒加载
- 在 `themes/acryple/_config.yml` 中启用 `lazyload: true`
- 图片将在滚动到可视区域时才加载，大幅减少初始加载时间

### 2. 添加资源压缩配置
- 创建了 `gulpfile.js` 配置文件
- 添加了 `npm run build:min` 命令，自动压缩 HTML、CSS、JS

## 使用方法

### 开发环境（不压缩）
```bash
npm run dev
# 或
npm run server
```

### 生产构建（带压缩）
```bash
npm run build:min
```

### 部署前优化
```bash
npm run build:min && npm run deploy
```

## 进一步优化建议

### 1. 启用 CDN 加速
修改 `themes/acryple/_config.yml` 中的 CDN 配置：

```yaml
CDN:
  internal_provider: jsdelivr  # 改为 jsdelivr
  third_party_provider: jsdelivr
```

### 2. 减少不必要的插件
检查并禁用以下未使用的插件：
- `hexo-theme-volantis`（已安装但未使用）
- `hexo-theme-landscape`（默认主题，可删除）
- `live2d-widget-model-koharu`（如果只用 hibiki）

### 3. 优化图片
- 使用 WebP 格式替代 PNG/JPG
- 压缩图片大小（推荐使用 TinyPNG 或 Squoosh）
- 为不同屏幕尺寸提供响应式图片

### 4. 启用 Gzip 压缩
在服务器配置中启用 Gzip 压缩，可减少 60-80% 的传输大小。

### 5. 使用浏览器缓存
配置服务器缓存策略，静态资源缓存 1 年。

### 6. 减少外部请求
- 将部分外部 JS/CSS 文件下载到本地
- 合并小的 CSS/JS 文件

### 7. 启用 HTTP/2
确保服务器支持 HTTP/2，提升资源加载效率。

## 性能监控工具

推荐使用以下工具监控网站性能：
- Google PageSpeed Insights
- GTmetrix
- Lighthouse（Chrome 开发者工具）

## 预期效果

实施以上优化后，预期可达到：
- 首次内容绘制 (FCP) 减少 30-50%
- 最大内容绘制 (LCP) 减少 40-60%
- 总页面大小减少 40-50%
- 加载时间减少 50% 以上

## 注意事项

1. 压缩后的代码难以调试，建议只在生产环境使用
2. 图片懒加载可能影响 SEO，确保重要图片有适当的 alt 属性
3. CDN 配置需要根据实际网络环境选择最优节点
4. 定期检查性能指标，持续优化