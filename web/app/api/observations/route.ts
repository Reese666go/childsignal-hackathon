import { desc, eq } from 'drizzle-orm';
import { ensureDbSchema, getDb } from '@/db';
import { observations } from '@/db/schema';
import { saveObservationSchema } from '@/lib/capture-schema';

const parseList = (value: string) => JSON.parse(value) as string[];

export async function GET(request: Request) {
  await ensureDbSchema();
  const child = new URL(request.url).searchParams.get('child') ?? 'Maya';
  const rows = await getDb().select().from(observations).where(eq(observations.childAlias, child)).orderBy(desc(observations.confirmedAt)).limit(20);
  return Response.json(rows.map((row) => ({ id: row.id, childAlias: row.childAlias, context: row.context, observations: parseList(row.observationsJson), interpretations: parseList(row.interpretationsJson), supports: parseList(row.supportsJson), outcome: row.outcome, uncertainties: parseList(row.uncertaintiesJson), confirmedAt: row.confirmedAt.toISOString() })));
}

export async function POST(request: Request) {
  try {
    await ensureDbSchema();
    const input = saveObservationSchema.parse(await request.json());
    const confirmedAt = new Date();
    const [saved] = await getDb().insert(observations).values({ childAlias: input.childAlias, context: input.context, originalText: input.originalText, observationsJson: JSON.stringify(input.observations), interpretationsJson: JSON.stringify(input.interpretations), supportsJson: JSON.stringify(input.supports), outcome: input.outcome, uncertaintiesJson: JSON.stringify(input.uncertainties), confirmedAt }).returning({ id: observations.id });
    return Response.json({ id: saved.id, confirmedAt: confirmedAt.toISOString() });
  } catch (error) {
    console.error(error);
    return Response.json({ error: '保存失败，请检查确认内容。' }, { status: 400 });
  }
}
