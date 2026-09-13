import { z } from 'zod'

export const CaptureResultSchema = z.object({
  childAlias: z.string(),
  context: z.string(),
  observations: z.array(z.string()),
  interpretations: z.array(z.string()),
  supports: z.array(z.string()),
  outcome: z.string(),
  uncertainties: z.array(z.string()),
  requiresTeacherConfirmation: z.literal(true),
  safetyNotice: z.literal('This is an observation record, not a diagnosis.'),
})

export type CaptureResult = z.infer<typeof CaptureResultSchema>

