## 一个 vite5 + react 的模板(非后台)

- vite5
- react
- typescript
- unocss
- antd
- ahooks
- i18n
- lodash
- zustand
- react-query
- msw
- eslint

## 后台参考

- https://github.com/eternallycyf/ims-template

## 快速开始

### 获取项目代码

```bash
git clone https://github.com/eternallycyf/vite5-react-template.git
```

### 安装依赖

在项目根目录下运行以下命令安装项目依赖：

```bash
pnpm install
```

### 启动开发服务器

运行以下命令以启动开发服务器：

```bash
pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看您的应用程序。

### 构建生产版本

运行以下命令以构建生产版本：

```bash
pnpm build
```

构建后的文件将位于 `dist` 目录中。

## 容器化部署

### 构建镜像并运行容器

#### 构建镜像

在终端中进入项目根目录，并执行以下命令来构建 Docker 镜像:

```
docker build -t your-image-name .
```

确保将 `your-image-name` 替换为你自己的镜像名称

#### 运行容器

使用以下命令在 Docker 容器中运行你的应用：

```
docker run -p 3000:80 your-image-name
```

这将在容器的端口 `80` (暴露在`Dockerfile`中) 上运行你的应用，并将其映射到你主机的端口 `3000` 上。

现在，你可以通过访问 http://localhost:3000 来查看部署的应用。

### 使用docker-compose.yaml

在终端中进入项目根目录，并执行以下命令来启动 Docker Compose：

```
docker-compose up -d
```

Docker Compose 根据`docker-compose.yaml`定义的配置构建镜像并在后台运行容器.

容器运行成功后，同样可以通过访问 http://localhost:3000来查看部署的应用。


## 主题

### 暗黑 && 主题色切换

- 所有使用的全局less变量在 public/style/\* 下定义了下静态文件 通过插件即可获取提示
- html下的var变量 (也可以@xxx使用, 在最外层注入了)

```css
html {
  --primary-color: #fff;
  --primary-hover-color: #fff;
  --primary-active-color: #fff;
  --processing-color: #fff;
  --link-color: #fff;
  --text-color: #fff;
  --border-color: #fff;
  --component-background-color: #fff;
  --layout-body-background: #fff;
  --white-hover: #fff;
  --white-active: #fff;
  --ims-bg: #fff;
}
```

- unocss也享有所有Html注入的颜色变量

```tsx
<>
  <div className="html-var">html-variables</div>
  <div className="less-var">less-variables</div>
  <div color-primary-color>uno-theme-color</div>
</>
```

```less
.html-var {
  color: var(--primary-color);
}

.less-var {
  color: @primary-color;
}
```

### 如何维护全局的css变量

#### 新增html动态的变量

- vite5-react-template/src/theme/init/initLessVar.js
- vite5-react-template/src/layouts/core/GlobalHeader/ThemeModeBtn/index.tsx
- vite5-react-template/public/style/global-var.less
- uno.config.ts => theme.color

#### 其他

- 其他变量自行添加即可 但已全局注入antd所有的主题变量为less变量 使用antd的就行
- vite5-react-template/public/style/antd.less