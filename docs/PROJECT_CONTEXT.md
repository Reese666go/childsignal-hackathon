# ChildSignal 项目连续上下文

更新时间：2026-08-14

## 聊天记录在哪里

昨天的完整聊天仍保留在 Codex/ChatGPT 原任务 **「黑客松参赛指南」** 中，conversation ID：

`6a7d5d89-9fb0-83e8-a0f3-dd89f0c7bcb7`

今天的新任务通过引用继续了那段对话。聊天本身没有被删除或移动；本文件把两天已经确认的成果合并成可继续开发的项目上下文。

## 昨天完成的工作

1. 从 8 个幼儿园真实教学案例中提炼共性需求。
2. 明确真正的问题不是“老师不会写观察记录”，而是老师难以长期连接跨日期、跨情境、跨同伴和跨支持方式的微小信号。
3. 确立 ChildSignal 的定位：长期观察 Agent，而非儿童诊断或行为分析工具。
4. 明确必须同时寻找四类信号：
   - Challenge Signals：持续出现的困难。
   - Strength Signals：孩子表现良好或兴趣突出的情境。
   - Context Signals：环境变化与表现变化的关系。
   - Support Signals：哪些支架带来了可观察变化。
5. 冻结 Product Brief v0.1，包括用户、问题、Why now、核心场景、Agent Workflow、MVP、产品红线、Demo、AWS/Strands 架构和评分策略。

## 今天完成的工作

1. 重新连接并核对昨天的原任务，确认 Product Brief v0.1 是当前基线。
2. 确认下一阶段不再扩产品范围，正式转入开发。
3. 新建本地项目文件夹 `C:\Users\Lenovo\Documents\Codex\黑客松`。
4. 将两天的关键成果整理为项目文档，作为后续开发的统一上下文。

## 已冻结的核心定义

**English**

> ChildSignal is a longitudinal observation agent that helps preschool teachers turn scattered classroom moments into patterns worth investigating — without diagnosing children or replacing teacher judgment.

**中文**

> ChildSignal 是一个面向幼儿教师的长期观察 Agent，把教师每天看到的零散瞬间连接成值得进一步验证的儿童发展信号，同时不诊断儿童，也不替教师做专业判断。

核心提问不是“这个孩子怎么了”，而是：

> What are we missing?

## 已冻结的 MVP

1. 自然语言或语音输入观察。
2. 分离 Observation 与 Interpretation。
3. 建立儿童长期 Timeline。
4. Pattern Detection。
5. Follow-up 与 Intervention Tracking。

## 产品红线

- 不诊断 Autism、ADHD、Selective Mutism 或其他状况。
- 不给儿童贴“正常、异常、高风险、问题儿童”等标签。
- 不依据一次事件推断人格或发展状况。
- 不替代教师的专业判断。
- 不自动联系家长；敏感沟通必须由教师确认。
- 不把“懒、调皮、固执、故意”等解释当作观察事实。
- 所有模式提示都应表达为待验证信号，例如：`This is a pattern, not a diagnosis.`

## Demo 基线

只使用完全虚构的 synthetic data，展示三个案例：

- Maya：熟悉同伴支架与活动参与变化，展示 Pattern Detection。
- Leo：集体活动中的困难与绘画中的持续投入，展示 Challenge + Strength。
- Emma：完整成人帮助与部分支架的效果比较，展示 Intervention Tracking。

结尾信息：

> Teachers don't need AI to write 28 better reports. They need help noticing what 147 tiny moments are trying to tell them.

## 技术方向

- Strands Agents SDK：Agent 框架与编排。
- Amazon Bedrock：模型推理。
- AgentCore Runtime：部署方向。
- Memory / Database：长期观察记录。
- Tool calling：保存和检索观察、查询时间线、创建 follow-up。
- Human-in-the-loop：教师确认观察与敏感操作。

具体数据库和前端方案尚未锁定，避免为了展示而堆叠 AWS 服务。

## 下一步

1. 检查开发环境与比赛最新规则。
2. 初始化代码仓库和最小应用结构。
3. 准备一条 synthetic observation。
4. 跑通 Capture Agent：自然语言输入 → Observation/Interpretation 分离 → 结构化结果 → 教师确认。
5. 保存确认后的观察，为 Timeline 和 Pattern Detection 打基础。

