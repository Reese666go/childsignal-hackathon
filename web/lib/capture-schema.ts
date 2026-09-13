import { z } from 'zod';

export const captureResultSchema = z.object({
  childAlias: z.string().min(1),
  context: z.string().min(1),
  observations: z.array(z.string().min(1)).min(1),
  interpretations: z.array(z.string().min(1)),
  supports: z.array(z.string().min(1)),
  outcome: z.string().min(1),
  uncertainties: z.array(z.string().min(1)),
  requiresTeacherConfirmation: z.literal(true),
  safetyNotice: z.literal('This is an observation record, not a diagnosis.'),
});

export type CaptureResult = z.infer<typeof captureResultSchema>;

export const saveObservationSchema = captureResultSchema.extend({
  originalText: z.string().min(1),
  confirmed: z.literal(true),
});
