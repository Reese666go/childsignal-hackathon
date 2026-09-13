# Development Log

## 2026-08-17 — First Capture Agent slice

Completed:

- Verified the Agents for Humans official dates, tracks, submission requirements, and judging criteria.
- Selected Professional Agents as ChildSignal's primary track.
- Verified Node.js 24, npm 11, and Git are available locally.
- Confirmed Python, AWS CLI, and AWS credentials are not currently configured.
- Initialized a TypeScript project with Strands Agents SDK 1.13.0.
- Added MIT license, README, architecture document, rule notes, and Git repository.
- Implemented a credential-free Strands custom model for deterministic local demonstrations.
- Added the production switch to Strands `BedrockModel` through `CHILDSIGNAL_MODEL=bedrock`.
- Ran a synthetic Maya observation end to end through the Capture Agent.
- Added runtime Zod validation and two automated tests.

Verified commands:

- `npm run typecheck` — passed.
- `npm test` — 2 tests passed.
- `npm run capture:demo` — returned a structured observation requiring teacher confirmation.

Current boundary:

- Local Capture Agent slice is working.
- Amazon Bedrock has not been invoked because AWS CLI, credentials, and model access are not configured.
- AgentCore has not been deployed; it is optional for eligibility and planned as a technical-score enhancement.

Next slice:

1. Build the smallest teacher confirmation screen around this working agent.
2. Save confirmed observations to a local timeline.
3. Configure AWS and run the same scenario through Bedrock.

## 2026-08-31 — Teacher confirmation and timeline

Completed:

- Added a three-column teacher workspace: Capture, Review, and Timeline.
- Connected the existing Strands Capture Agent to a web API.
- Made every extracted observable fact editable before confirmation.
- Kept interpretations visually separate from observable facts.
- Added an explicit teacher confirmation gate before saving.
- Added Cloudflare D1-backed observation persistence and a child/date index.
- Verified a synthetic Maya record can be captured, confirmed, saved, and read back after a separate request.
