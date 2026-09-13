import { Agent, type Model } from '@strands-agents/sdk'
import { BedrockModel } from '@strands-agents/sdk/models/bedrock'

import { CaptureResultSchema, type CaptureResult } from './capture-schema.js'
import { OfflineCaptureModel } from './offline-capture-model.js'

const SYSTEM_PROMPT = `
You are ChildSignal's Capture Agent for preschool teachers.

Convert a teacher's narrative into a neutral, structured observation.
Separate directly observable behavior from interpretation. Preserve context,
support attempts, and outcomes. Never diagnose, label, infer intent, or claim
causation from one event. State uncertainty and require teacher confirmation.
Return only valid JSON with these exact fields: childAlias, context,
observations (string array), interpretations (string array), supports (string
array), outcome, uncertainties (string array), requiresTeacherConfirmation
(always true), and safetyNotice (always "This is an observation record, not a
diagnosis."). Do not wrap the JSON in Markdown.
`.trim()

function createModel(): Model {
  if (process.env.CHILDSIGNAL_MODEL === 'bedrock') {
    return new BedrockModel({
      modelId: process.env.BEDROCK_MODEL_ID ?? 'global.anthropic.claude-sonnet-4-6',
      temperature: 0,
    })
  }

  return new OfflineCaptureModel()
}

export async function captureObservation(input: string): Promise<CaptureResult> {
  if (!input.trim()) throw new Error('Observation text cannot be empty.')

  const agent = new Agent({
    name: 'ChildSignal Capture Agent',
    description: 'Separates observable classroom events from interpretation.',
    model: createModel(),
    systemPrompt: SYSTEM_PROMPT,
    printer: false,
  })

  const result = await agent.invoke(input)
  const raw = result.lastMessage.content
    .filter((block) => block.type === 'textBlock')
    .map((block) => block.text)
    .join('\n')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')

  return CaptureResultSchema.parse(JSON.parse(raw))
}
