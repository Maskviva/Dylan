# Dylan 智能学习平台

## 📋 项目简介
#### 基于 TypeScript 全栈技术栈构建的智能学习平台，整合深度语义理解引擎 deepseek-v3，采用分层架构与模块化设计，具备以下特性：

### ✅ 技术特性

* 前端：H5/CSS3 + EJS 模板引擎 + jQuery 交互
* 后端：Express + TypeScript + 分层架构
* 智能引擎：deepseek-v3（硅基流动提供）
* 实时通信：WebSocket 聊天室
* 数据存储：MySQL 关系型数据库

### ✅ 架构优势

* 1.扩展性：模块化设计支持功能快速迭代
* 2.维护性：清晰的层级划分（Repository/Service/Controller/Utils）
* 3.稳定性：事务管理+连接池保障数据一致性
* 4.安全性：多层验证机制（人机校验+会话管理）

## 🚀 快速启动
### 运行环境要求

| 组件      | 要求                       |
|---------|--------------------------| 
| 操作系统    | 	Windows 10+/Linux/macOS |
| Node.js | ≥14.x（推荐 LTS 版本）         |
| MySQL   | ≥5.7（推荐 8.0））            |
| 内存      | ≥2GB 可用空间                |

### 环境配置步骤
##### 1. Node.js 环境
```bash
  # 安装全局依赖
  npm install -g typescript ts-node
```

##### 2. MySQL 配置
```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY '1132';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```
📌 建议使用 Docker 快速搭建：[MySQL Docker 指南](https://hub.docker.com/_/mysql)

##### 3.项目依赖安装
```bash
  npm install  # 或使用 yarn/pnpm
```

### 启动项目
双击运行 `启动.bat`，脚本将自动完成：
   1. 编译 TypeScript 源码
   2. 启动 Express 服务（默认端口 3000）
   3. 打开浏览器访问 http://localhost:3000
##### ⚠️ 注意事项
1. 保持 bat 文件所在终端常开
2. 首次启动会自动初始化数据库表结构
3. DeepSeek Token 配额有限，请注意用量

## 🏗️ 项目架构
### 目录结构
```aiignore
...
 ├── main.ts                 # 入口文件
 ├── src/
 │   ├── main/               # 核心逻辑
 │   │   ├── config/         # 配置管理
 │   │   ├── core/          # 核心组件
 │   │   │   └── DataBase/  # 数据库模块
 │   │   ├── middlewares/   # 中间件层
 │   │   ├── route/         # 路由控制器
 │   │   ├── service/       # 业务逻辑层
 │   │   └── utils/         # 工具库
 │   ├── resources/         # 静态资源
 │   └── types/             # TS 类型定义
```

### 核心模块说明
#### 1. 数据库层 (Repository)
* user.repository.ts：用户数据操作
* learn.repository.ts：对话记录管理
* 使用连接池提升查询效率
#### 2. 服务层 (Service)
* 业务逻辑处理（用户认证、对话生成）
* 事务管理确保数据一致性
#### 3. 路由层 (Controller)
* RESTFUL API 设计
* 包含四个子模块：
  * AI 对话服务
  * 用户认证管理
  * 数据更新接口
  * WebSocket 实时通信
#### 4. 工具层 (Utils)
* 验证码生成校验
* 邮件服务集成
* 配置文件加载器
## 🔧 配置指南
编辑 `application.yml`：
```yaml
DataBase: # 数据库配置
   pool: # 连接池配置
      ...

email: # 邮件服务配置
   server: # 邮件服务器配置
      ...
   options: # 邮件发送选项
      ...

Routes: # 路由配置
   AI: # AI 对话服务配置
      ...
WebSocket: # WebSocket 配置
   ChatRoom: # 聊天室配置
      ...
```

## ⚠️ 安全建议
#### 生产环境需修改以下默认配置：
* MySQL root 密码
* 数据库端口号
* DeepSeek API Key 存储方式（推荐 Vault）
* 启用 HTTPS 加密通信
定期清理会话日志