# ChildSignal — Product Brief v0.1（冻结版）

## 一句话定义

面向幼儿教师的长期观察 Agent，把零散课堂瞬间连接成值得验证的模式，追踪哪些支持真正有效；不诊断儿童，也不替代教师判断。

## User

第一版只服务 Preschool / Kindergarten Classroom Teachers，尤其是同时面对许多孩子、每天产生大量碎片观察、缺少时间进行长期整理和回顾的一线教师。

暂不服务园长管理、家长端、儿童端或医疗与心理专业人员。

## Problem

老师每天看到很多行为碎片，但人脑很难长期连接跨时间、情境、同伴和支持方式的信息。这容易让“她就是胆小”“他就是调皮”等标签替代真正有价值的问题：什么时候发生、什么时候不发生、和谁在一起会改变、试过什么、什么有效，以及什么时候表现得很好。

## Why now

LLM 与 Agent 的价值不只在 Generate，而在：

`Remember → Connect → Follow up`

长期记忆、跨记录推理、主动追踪、工具调用和 human-in-the-loop，使 AI 能帮助教师 notice more，而不仅是 write more。

## 核心场景

教师放学后用自然语言描述一天中的一个瞬间。ChildSignal 将主观叙述拆成可观察的情境、行为、成人或同伴支持与结果，请教师确认。多次记录后，它提示值得继续观察的模式、提出下一个可验证问题、安排一个很小的支持尝试，并在之后主动追踪结果。

## Agent Workflow

`Teacher observation`

→ Capture：自然语言转结构化观察，分离事实与解释  
→ Memory：保存长期时间线  
→ Pattern：寻找 Context、Peer、Behavior、Strength、Intervention pattern  
→ Question：提出下一步该观察什么  
→ Planning：设计小范围、可比较的支持尝试  
→ Follow-up：主动回来追踪  
→ Reflection：形成 Observation → Intervention → Outcome  
→ Communication：经教师批准后生成阶段性沟通摘要

## MVP

1. 自然语言或语音观察输入。
2. Observation / Interpretation 分离。
3. 儿童长期 Timeline。
4. Pattern Detection。
5. Follow-up + Intervention Tracking。

## 不做什么

不做班级管理、考勤、教案、AI 备课、作业、家长聊天机器人、摄像头行为识别、自动拍摄儿童、医学诊断、复杂数据可视化或大而全的教育平台。

永远不做自动诊断、儿童标签、单次事件人格推断、替代教师判断或未经批准的家长联系。

## 90 秒 Demo

- Maya：熟悉同伴支架提高参与，展示跨记录模式。
- Leo：集体活动困难但绘画投入，展示困难与优势并存。
- Emma：完整帮助效果有限，部分支持提高独立尝试，展示干预追踪。
- 最后回到 28 名儿童、147 条观察的班级视图，强调教师需要的不是 28 篇更漂亮的报告，而是发现碎片正在表达什么。

## AWS / Strands 架构

Teacher → Web/Mobile UI → Strands Orchestrator → Capture/Pattern/Question/Follow-up/Reflection → Amazon Bedrock → Observation Memory Store → AgentCore Runtime → Human Approval → Teacher

技术服务于闭环，不为了数量堆叠 AWS 服务。

## Hackathon 评分策略

- Technical Implementation：Strands、Bedrock、AgentCore、Memory、Tools、Follow-up。
- Design：教师只需说一句话，复杂工作由 Agent 完成。
- Potential Impact：把教师的时间和注意力还给儿童。
- Originality：从“生成材料”转向“长期发现信号”。
- Presentation：三个清晰案例、模式反转和 human-in-the-loop。

重点争取 Originality、Impact 与 Presentation；技术以稳定跑通核心闭环为标准。

## 冻结规则

只有直接服务于以下闭环的功能才考虑进入 MVP：

`Observation → Pattern → Question → Intervention → Follow-up → Reflection`

