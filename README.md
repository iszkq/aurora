主题特性

- 响应式布局与现代配色，支持 system/dark/light 三种模式
- 首页文章列表，文章详情与自定义页面（含评论组件入口）
- 归档、分类、标签、搜索页基础模板
- 全局 SEO 基础标签与站点标题/描述读取
- 主题设置表单：配色模式、主色、横幅图、搜索入口、文章目录显隐、社交链接
- 评论组件风格变量适配，融合插件的暗色模式与主色体系
- 模型元数据示例：在文章详情页读取 annotations['enable_read_limit'] 控制提醒条
主要文件

- 主题配置 themes/theme-aurora/theme.yaml:1
- 主题设置表单 themes/theme-aurora/settings.yaml:1
- 片段：页头 themes/theme-aurora/templates/fragments/header.html:1 ，页脚 themes/theme-aurora/templates/fragments/footer.html:1
- 首页 themes/theme-aurora/templates/index.html:1
- 文章页 themes/theme-aurora/templates/post.html:1
- 自定义页面 themes/theme-aurora/templates/sheet.html:1
- 归档页 themes/theme-aurora/templates/archives.html:1
- 分类页 themes/theme-aurora/templates/categories.html:1 、单分类页 themes/theme-aurora/templates/category.html:1
- 标签页 themes/theme-aurora/templates/tags.html:1 、单标签页 themes/theme-aurora/templates/tag.html:1
- 搜索页 themes/theme-aurora/templates/search.html:1
- 错误页 themes/theme-aurora/templates/404.html:1 、 themes/theme-aurora/templates/500.html:1
- 样式与脚本 themes/theme-aurora/templates/assets/css/main.css:1 、 themes/theme-aurora/templates/assets/js/main.js:1
功能细节

- 暗色模式
  - 模式由 theme.config.style.color_scheme 控制，类名注入在 <html> 上，例如 system/dark/light ，CSS 使用 :root 、 @media (prefers-color-scheme: dark) 实现跟随系统（参考“准备工作 | Halo 文档”关于 Thymeleaf）
  - JS 在系统模式下监听 prefers-color-scheme 自动切换 themes/theme-aurora/templates/assets/js/main.js:1
- 配色与注入
  - 主色由设置项 primary_color 提供，在页面 <style> 内注入 --primary 变量，例如首页 themes/theme-aurora/templates/index.html:8 、文章页 themes/theme-aurora/templates/post.html:8
- 评论组件
  - 在文章与页面模板底部插入 <halo:comment /> ，适配官方评论插件（参考“评论组件 | Halo 文档”和插件说明）
  - 配置了 CSS 变量以融合评论组件配色 themes/theme-aurora/templates/assets/css/main.css:39
- 列表与详情
  - 首页使用 posts.items 列表并展示标题、摘要与时间 themes/theme-aurora/templates/index.html:17
  - 文章详情使用 post.content.content 渲染内容，时间与标题同样基于 post.spec 字段 themes/theme-aurora/templates/post.html:13
- 模型元数据
  - 示例：文章页读取 post.metadata.annotations['enable_read_limit'] ，用于展示“评论后可见”提示条 themes/theme-aurora/templates/post.html:17 （与“模型元数据 | Halo 文档”一致，元数据为 metadata.annotations ）
- 静态资源
  - CSS/JS 以 @{/assets/...} 引入，存放在 /templates/assets （参考“静态资源 | Halo 文档”）
如何安装

- 将 themes/theme-aurora 放入 Halo 工作目录下的 themes 文件夹（文档约定）
- 访问管理端：外观 → 主题 → 切换主题 → 未安装 → 安装 → 启用（参考“准备工作 | Halo 文档”安装主题）
- 开发时建议关闭模板缓存：
  - Docker 环境设置 SPRING_THYMELEAF_CACHE=false
  - 源码运行在配置文件里设置 spring.thymeleaf.cache=false （参考“准备工作 | Halo 文档”）
- 主题设置表单会自动识别并出现在主题设置页面（参考“设置选项 | Halo 文档”）
  - 设置项位于 themes/theme-aurora/settings.yaml:1 ，名称需与 theme.yaml 的 spec.settingName 一致
可配置项与使用

- 配色
  - 配置路径 theme.config.style.color_scheme ，默认 system
  - 主色 theme.config.style.primary_color ，默认 #3b82f6
- 横幅图
  - 首页横幅图 theme.config.style.banner_image ，在首页顶部展示 themes/theme-aurora/templates/index.html:13
- 布局
  - 搜索入口显隐 theme.config.layout.show_search ，导航中条件渲染 themes/theme-aurora/templates/fragments/header.html:7
  - 文章目录显隐 theme.config.layout.show_toc ，在文章页预留 themes/theme-aurora/templates/post.html:19
- 社交
  - GitHub/Twitter 链接 theme.config.social.github 、 theme.config.social.twitter ，页脚展示 themes/theme-aurora/templates/fragments/footer.html:7
教育性说明

- Halo 2.x 使用 Thymeleaf 渲染，模板变量示例（参考官方“准备工作”示例）：
  - 首页：通过 ${posts.items} 遍历文章列表，并使用 th:href="@{${post.status.permalink}}"
  - 详情：使用 ${post.spec.title} 、 ${#temporals.format(post.spec.publishTime, 'yyyy-MM-dd')}
- 主题设置表单使用 FormKit Schema，主题内以 theme.config.[group].[name] 读取（参考“设置选项 | Halo 文档”）
- 静态资源在 HTML 标签中用 @{} 包裹路径，在 JS 字符串中用 #theme.assets() 生成（参考“静态资源 | Halo 文档”）
- 评论组件通过 <halo:comment /> 扩展点由插件渲染，且支持一组 CSS 变量自定义主题（参考官方评论插件文档）
- 模型元数据位于 metadata.annotations ，可在主题模板中按键读取（参考“模型元数据 | Halo 文档”分类页描述）
