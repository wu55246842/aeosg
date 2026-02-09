# AEO Strategy Website Builder MVP (NestJS + Vercel)

## 目录结构

```text
/apps
  /api     # NestJS API (必需)
  /web     # Next.js 管理台/站点壳
/packages
  /shared  # 共享类型
/prisma    # schema + migration
/.github/workflows/jobs.yml
/.env.example
/vercel.json
```

## MVP 功能
- 多租户：用户/组织/站点分层。
- Site/Page CRUD、发布。
- AEO：FAQ 自动抽取、JSON-LD schema 快照、llms.txt 快照。
- 审计：AEO 扫描并评分。
- MCP SSE：会话端点与摘要消息流。
- Billing：Stripe webhook 骨架。

## 本地启动
1. Node.js 20+
2. 安装依赖：`npm install`
3. 配置环境变量：`cp .env.example .env`
4. 生成 Prisma Client：`npm run prisma:generate`
5. 执行迁移：`npm run prisma:migrate`
6. 启动 API：`npm run -w apps/api start:dev`
7. Swagger: `http://localhost:3000/api/docs`

## 测试
- `npm run -w apps/api test:e2e`

## 数据库迁移
- 开发：`npm run prisma:migrate`
- 部署：`npm run prisma:deploy`

## Vercel 部署
1. 导入仓库到 Vercel。
2. 设置 Root 为仓库根目录。
3. 构建命令：`npm run build`
4. 配置环境变量（见 `.env.example`）。
5. 使用 serverless 部署 API。

## 后台任务（GitHub Actions Flow）
使用 `.github/workflows/jobs.yml`：
- 定时 `schedule` 执行。
- `workflow_dispatch` 手动触发。
- 通过调用 `/api/cron/*` 任务入口实现审计、schema/llms 刷新。

## 环境变量说明
- `DATABASE_URL`: PostgreSQL 连接串。
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`: JWT 密钥。
- `JWT_ACCESS_TTL` / `JWT_REFRESH_TTL`: token 生命周期（秒）。
- `CRON_SECRET`: Cron 入口校验。
- `STRIPE_WEBHOOK_SECRET`: 计费 webhook 验签。
- `BASE_PUBLIC_URL`: 外部访问地址。
