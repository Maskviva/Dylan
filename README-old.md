# Dylan

## 运行环境要求

1. 系统要求：windows 10+(推荐win11 其他系统如mac、linux等理论上也可运行 但由于运行文件(`*.bat`)只有windows系统可运行)
2. Node.js 运行环境
   Node.js 版本：建议使用 Node.js 14.x 及以上（兼容 LTS 版本）\
   包管理工具：npm、yarn 或 pnpm（推荐使用最新版本）
   需要全局安装 [`typescript`](https://www.runoob.com/typescript/ts-tutorial.html) 和 [
   `ts-node`](https://www.npmjs.com/package/ts-node) 安装命令如下 **_`npm install -g ts-node typescript`_**
3. MySQL 数据库
   MySQL 服务：
   本地 MySQL 服务器（5.7+）
   确保服务已启动且网络可访问\
   数据库权限：
   用户需拥有目标数据库的所有权限 且\
   用户名需设置为 **`root`** 密码为 `1132` mysql的端口也得是`3306`(具体原因看
   `项目主文件夹 -> src -> config -> db -> pool.json`)
4. 运行方法：直接打开项目主文件夹下的 `启动.bat` 文件会自动打开浏览器进入对应的网页 运行时bat文件生成的运行窗口不能关闭(
   关闭就代表终止程序)

## 介绍

这是一个基于TypeScript、nodejs、Express和deepseek-v3的应用 \
前端的技术栈是 h5 + css + js + ejs 和 jquery库\
后端是 express + typescript + nodejs

该项目采用: **分层架构与模块化设计相结合的复合型架构**\
该架构在扩展性、维护性方面表现优异，特别适合需要快速迭代的中大型全栈项目

deepseek-v3的接口来自 [硅基流动](https://siliconflow.cn/zh-cn/) 由于token有限
有所以使用多了就不能用了需要购买[token](https://siliconflow.cn/zh-cn/pricing)

### 项目结构:

#### 大体
* 项目主文件夹
* ├── main.ts # 入口文件
* └── src
*   ├── main # 程序主文件夹
*   │ ├── config # 配置模块
*   │ ├── core # 核心模块
*   │ ├── middlewares # 中间件模块
*   │ ├── route # 路由模块
*   │ ├── service # 服务模块
*   │ └── utils # 工具模块
*   ├── resources # 资源文件夹
*   └── types # 类型文件夹


#### 细分
* 项目主文件夹
* ├── main.ts # 入口文件
* └── src
*   ├── main # 程序主文件夹
*   │ ├── app.ts # 程序主文件
*   │ ├── config # 配置模块
*   │ │ └── index.ts # 项目配置文件读取模块
*   │ ├── core # 核心模块
*   │ │ └── DataBase # 数据库模块
*   │ │   ├── learn.repository.ts # 学习数据库数据库操作模块
*   │ │   └── user.repository.ts  # 用户数据库操作模块
*   │ ├── middlewares # 中间件模块
*   │ │ ├── core # 核心中间件模块
*   │ │ │ ├── CAPTCHA.ts # 人机验证中间件
*   │ │ │ └── onlineUser.ts # 用户在线状态中间件
*   │ │ └── Routes # 路由中间件模块
*   │ │   └── upLoadPortrait.ts # 上传头像路由中间件
*   │ ├── route # 路由模块
*   │ │ ├── api.route.ts # api路由模块
*   │ │ ├── views.route.ts # 视图路由模块
*   │ │ └── index.ts # 路由入口文件
*   │ ├── service # 服务模块
*   │ │ ├── DataBase # 数据库服务模块
*   │ │ │ ├── learn.service.ts # 学习数据库服务模块
*   │ │ │ └── user.service.ts # 用户数据库服务模块
*   │ │ ├── Routes # 路由服务模块
*   │ │ │ ├── route.ai.service.ts # ai路由服务模块
*   │ │ │ ├── route.auto.service.ts # 认证路由服务模块
*   │ │ │ ├── route.updata.service.ts # 数据更新路由服务模块
*   │ │ │ └── route.user.service.ts # 用户路由服务模块
*   │ │ ├── WebSocket # WebSocket服务模块
*   │ │ │ └── websocket.chatroom.service.ts # 聊天室WebSocket服务模块
*   │ │ └── user.service.ts # 用户服务模块
*   │ └── utils # 工具模块
*   │   ├── config # 配置工具模块
*   │   │ └── index.ts # 项目配置工具模块入口文件
*   │   ├── DataBase # 数据库工具模块
*   │   │ └── index.ts # 数据库工具模块入口文件
*   │   ├── Email # 邮件工具模块
*   │   │ └── index.ts # 邮件工具模块入口文件
*   │   ├── Route # 文件工具模块
*   │   │ ├── AI # AI文件工具模块
*   │   │ │ └── index.ts # AI文件工具模块入口文件
*   │   │ └── verifyCaptcha.ts # 人机验证数据分析工具模块
*   │   └── Views # 视图文件工具模块
*   │       └── index.ts # 视图文件工具模块入口文件
*   ├── resources # 资源文件夹
*   │ ├── application.yml # 项目配置文件
*   │ ├── public # 静态资源文件夹
*   │ └── views # 视图文件夹
*   └── types # 类型文件夹