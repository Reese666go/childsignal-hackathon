import { captureObservation } from '@/lib/capture-agent';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: unknown };
    if (typeof body.text !== 'string' || !body.text.trim()) return Response.json({ error: '请输入一段观察。' }, { status: 400 });
    return Response.json(await captureObservation(body.text));
  } catch (error) {
    console.error(error);
    return Response.json({ error: '暂时无法整理这条观察。' }, { status: 500 });
  }
}
