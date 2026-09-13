import { Model, type BaseModelConfig, type Message, type ModelStreamEvent, type StreamOptions } from '@strands-agents/sdk';
import type { CaptureResult } from './capture-schema';

interface Config extends BaseModelConfig { modelId?: string }

function lastText(messages: Message[]): string {
  const message = messages.at(-1);
  return message?.content.filter((block) => block.type === 'textBlock').map((block) => block.text).join('\n') ?? '';
}

function analyze(input: string): CaptureResult {
  const childAlias = input.match(/Maya|Leo|Emma/i)?.[0] ?? 'Child A';
  const interpretations: string[] = [];
  if (/胆小/.test(input)) interpretations.push('“胆小”是对性格或原因的解释，不是直接观察。');
  if (/没用/.test(input)) interpretations.push('“没用”是对支持效果的概括，需要用行为结果表达。');
  return {
    childAlias,
    context: '户外体能活动',
    observations: [`${childAlias}在活动开始后站在原地。`, '教师进行了多次语言邀请。', `${childAlias}在教师邀请后没有加入活动。`, `同伴Emma走近并牵住${childAlias}的手。`, `${childAlias}随后与Emma一起跑动。`],
    interpretations,
    supports: ['教师语言邀请', '熟悉同伴牵手邀请'],
    outcome: '在同伴牵手邀请后加入活动；当前单次记录不能证明因果关系。',
    uncertainties: ['尚不清楚变化来自熟悉同伴、身体引导，还是活动已进行一段时间。', '需要在相似情境中继续比较教师邀请、同伴邀请和小组邀请。'],
    requiresTeacherConfirmation: true,
    safetyNotice: 'This is an observation record, not a diagnosis.',
  };
}

export class OfflineCaptureModel extends Model<Config> {
  private config: Config = { modelId: 'childsignal-offline-capture-v0', contextWindowLimit: 16_000 };
  updateConfig(next: Config) { this.config = { ...this.config, ...next }; }
  getConfig() { return { ...this.config }; }
  async *stream(messages: Message[], _options?: StreamOptions): AsyncIterable<ModelStreamEvent> {
    const output = JSON.stringify(analyze(lastText(messages)));
    yield { type: 'modelMessageStartEvent', role: 'assistant' };
    yield { type: 'modelContentBlockStartEvent' };
    yield { type: 'modelContentBlockDeltaEvent', delta: { type: 'textDelta', text: output } };
    yield { type: 'modelContentBlockStopEvent' };
    yield { type: 'modelMessageStopEvent', stopReason: 'endTurn' };
  }
}
