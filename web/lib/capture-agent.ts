import { Agent } from '@strands-agents/sdk';
import { captureResultSchema, type CaptureResult } from './capture-schema';
import { OfflineCaptureModel } from './offline-capture-model';

export async function captureObservation(input: string): Promise<CaptureResult> {
  const agent = new Agent({ name: 'ChildSignal Capture Agent', description: 'Turns teacher narratives into neutral observation records.', model: new OfflineCaptureModel(), systemPrompt: 'Separate directly observable classroom events from interpretation. Never diagnose, label, infer intent, or claim causation from one event. Return valid JSON only.', printer: false });
  const result = await agent.invoke(input);
  const raw = result.lastMessage.content.filter((block) => block.type === 'textBlock').map((block) => block.text).join('\n');
  return captureResultSchema.parse(JSON.parse(raw));
}
