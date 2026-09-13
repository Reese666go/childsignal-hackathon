import { describe, expect, it } from 'vitest'

import { captureObservation } from '../src/capture-agent.js'
import { DEMO_OBSERVATION } from '../src/demo-data.js'

describe('Capture Agent', () => {
  it('separates observable events from interpretation', async () => {
    const result = await captureObservation(DEMO_OBSERVATION)

    expect(result.childAlias).toBe('Maya')
    expect(result.observations).toContain('教师进行了多次语言邀请。')
    expect(result.interpretations.join(' ')).toContain('胆小')
    expect(result.interpretations.join(' ')).toContain('没用')
    expect(result.requiresTeacherConfirmation).toBe(true)
    expect(result.safetyNotice).toBe('This is an observation record, not a diagnosis.')
  })

  it('rejects empty input', async () => {
    await expect(captureObservation('   ')).rejects.toThrow('cannot be empty')
  })
})
