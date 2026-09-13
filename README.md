# ChildSignal 黑客松项目

ChildSignal 是面向幼儿教师的长期观察 Agent：把散落在不同日期、情境、同伴和支持方式中的课堂观察连接起来，发现值得继续验证的模式，并追踪哪些教师支持真正有效。

> AI usually helps teachers write more. ChildSignal helps teachers notice more.

## 当前状态

- Product Brief v0.1 已冻结。
- 已完成 8 个真实教学案例的需求提炼；项目中不保存儿童真实身份信息。
- 已锁定 MVP、产品红线、90 秒 Demo 故事和 AWS/Strands 技术方向。
- 已搭建 TypeScript 最小项目，并实现第一个 Strands Capture Agent。

## 项目文档

- `docs/PROJECT_CONTEXT.md`：昨天与今天的连续进度、关键决定和下一步。
- `docs/PRODUCT_BRIEF_v0.1.md`：已冻结的一页产品方案。
- `docs/HACKATHON_RULES.md`：官方比赛要求与项目约束。
- `docs/ARCHITECTURE.md`：当前与目标架构。

## 运行第一个 Capture Agent

要求：Node.js 20 或更高版本。

```bash
npm install
npm run capture:demo
```

默认运行离线演示模式：它仍然经过真实的 Strands `Agent` 调用链，但使用确定性的 custom model provider，因此无需 AWS 账户、不会产生模型费用，并且便于自动测试。

配置好 AWS 凭证与 Amazon Bedrock 模型访问后，可切换为 Bedrock：

```powershell
$env:CHILDSIGNAL_MODEL = 'bedrock'
$env:BEDROCK_MODEL_ID = 'global.anthropic.claude-sonnet-4-6'
npm run capture:demo
```

质量检查：

```bash
npm run typecheck
npm test
```

## 运行教师确认工作台

网页应用位于 `web/`，包含完整的第一个产品闭环：

`教师原话 → Strands Capture Agent → 教师修改与确认 → D1 时间线`

```bash
cd web
npm install
npm run dev
```

打开终端显示的本地地址。演示数据全部为虚构内容；只有勾选教师确认后，记录才会写入时间线。

## 唯一产品判断标准

新功能是否直接帮助完成：

`Observation → Pattern → Question → Intervention → Follow-up → Reflection`

如果不能，放入 Later，不进入 MVP。
