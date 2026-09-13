'use client';
/* oxlint-disable react/react-compiler */

import { useEffect, useState } from 'react';
import { ArrowRight, Check, CircleAlert, Leaf, LoaderCircle, LockKeyhole, PencilLine, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CaptureResult } from '@/lib/capture-schema';

const demoText = '今天Maya体锻还是一直站着，她就是胆小。我叫她几次都没用，她没有参加。后来Emma过来牵她，她就跟着Emma一起跑了。';
type TimelineItem = CaptureResult & { id: number; confirmedAt: string };

export default function Home() {
  const [text, setText] = useState(demoText);
  const [capture, setCapture] = useState<CaptureResult | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'saving'>('idle');
  const [message, setMessage] = useState('');

  async function loadTimeline(child = 'Maya') {
    const response = await fetch(`/api/observations?child=${encodeURIComponent(child)}`);
    if (response.ok) setTimeline((await response.json()) as TimelineItem[]);
  }
  useEffect(() => { void loadTimeline(); }, []);

  async function analyze() {
    setStatus('analyzing'); setMessage(''); setConfirmed(false);
    const response = await fetch('/api/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
    const body = (await response.json()) as CaptureResult & { error?: string };
    if (!response.ok) setMessage(body.error ?? '整理失败，请稍后重试。'); else setCapture(body);
    setStatus('idle');
  }

  function updateObservation(index: number, value: string) {
    if (!capture) return;
    const observations = [...capture.observations]; observations[index] = value;
    setCapture({ ...capture, observations });
  }

  async function save() {
    if (!capture || !confirmed) return;
    setStatus('saving'); setMessage('');
    const response = await fetch('/api/observations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...capture, originalText: text, confirmed: true }) });
    if (response.ok) {
      setMessage('已确认并加入 Maya 的观察时间线。'); await loadTimeline(capture.childAlias); setCapture(null); setConfirmed(false);
    } else {
      const body = (await response.json()) as { error?: string }; setMessage(body.error ?? '保存失败，请稍后重试。');
    }
    setStatus('idle');
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm"><Leaf className="size-5" /></div>
            <div><p className="font-heading text-lg font-semibold tracking-tight">ChildSignal</p><p className="text-xs text-muted-foreground">帮助教师看见长期变化</p></div>
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground"><LockKeyhole className="size-3.5 text-primary" />教师确认后才保存</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-5 py-6 lg:grid-cols-[0.92fr_1.18fr_0.9fr] lg:px-8">
        <section aria-labelledby="capture-title">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div><p className="eyebrow">01 · Capture</p><h1 id="capture-title" className="mt-1 font-heading text-2xl font-semibold tracking-tight">今天看到了什么？</h1></div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">Maya</span>
          </div>
          <Card className="shadow-soft">
            <CardHeader><CardTitle>用你平时说话的方式记录</CardTitle><CardDescription>不用整理术语，也不用先判断原因。</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <Textarea aria-label="教师观察原话" className="min-h-56 resize-none border-0 bg-secondary/55 p-4 text-[15px] leading-7 shadow-inner focus-visible:ring-primary/30" value={text} onChange={(event) => setText(event.target.value)} />
              <Button className="h-11 w-full rounded-xl text-sm" disabled={!text.trim() || status !== 'idle'} onClick={analyze}>
                {status === 'analyzing' ? <LoaderCircle className="animate-spin" /> : <Sparkles />}整理为客观观察<ArrowRight />
              </Button>
              <p className="flex gap-2 text-xs leading-5 text-muted-foreground"><CircleAlert className="mt-0.5 size-3.5 shrink-0" />当前使用完全虚构的演示数据，不录入真实儿童身份信息。</p>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="review-title">
          <div className="mb-4"><p className="eyebrow">02 · Review</p><h2 id="review-title" className="mt-1 font-heading text-2xl font-semibold tracking-tight">请老师确认，而不是让 AI 下结论</h2></div>
          {!capture ? (
            <Card className="min-h-[520px] border-dashed bg-card/55"><CardContent className="grid flex-1 place-items-center py-20 text-center"><div className="max-w-xs"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><PencilLine className="size-5" /></div><p className="font-medium">等待整理一条观察</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Agent 会把可观察事实和解释分开，再交给你修改与确认。</p></div></CardContent></Card>
          ) : (
            <Card className="shadow-soft">
              <CardHeader className="border-b"><div className="flex items-center justify-between gap-3"><div><CardTitle>{capture.childAlias} · {capture.context}</CardTitle><CardDescription>每一项都可以修改后再保存。</CardDescription></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">待确认</span></div></CardHeader>
              <CardContent className="space-y-5 pt-1">
                <div><p className="section-label"><Check /> 可观察事实</p><div className="space-y-2">{capture.observations.map((item, index) => <Input key={index} aria-label={`可观察事实 ${index + 1}`} className="h-auto min-h-10 bg-emerald-50/55 py-2.5" value={item} onChange={(event) => updateObservation(index, event.target.value)} />)}</div></div>
                {capture.interpretations.length > 0 && <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4"><p className="section-label text-amber-900"><CircleAlert /> 从事实中分离出的解释</p><ul className="space-y-2 text-sm leading-6 text-amber-950/75">{capture.interpretations.map((item) => <li key={item}>• {item}</li>)}</ul></div>}
                <div><p className="section-label"><Plus /> 支持与结果</p><p className="rounded-xl bg-secondary/60 p-3 text-sm leading-6">{capture.outcome}</p></div>
                <div className="flex items-start gap-3 rounded-xl border p-4 text-sm leading-6"><Checkbox id="teacher-confirmation" className="mt-0.5" checked={confirmed} onCheckedChange={(value) => setConfirmed(value === true)} /><label htmlFor="teacher-confirmation" className="cursor-pointer">我已核对以上内容，确认它准确反映了我看到的行为。</label></div>
                <Button className="h-11 w-full rounded-xl" disabled={!confirmed || status !== 'idle'} onClick={save}>{status === 'saving' ? <LoaderCircle className="animate-spin" /> : <Check />}确认并加入时间线</Button>
              </CardContent>
            </Card>
          )}
          {message && <p aria-live="polite" className="mt-3 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">{message}</p>}
        </section>

        <aside aria-labelledby="timeline-title">
          <div className="mb-4"><p className="eyebrow">03 · Timeline</p><h2 id="timeline-title" className="mt-1 font-heading text-2xl font-semibold tracking-tight">Maya 的观察时间线</h2></div>
          <Card className="min-h-[520px] bg-[#173f37] text-white shadow-soft">
            <CardHeader className="border-b border-white/10"><CardTitle className="text-white">已确认记录</CardTitle><CardDescription className="text-white/60">只有教师确认的内容会出现在这里。</CardDescription></CardHeader>
            <CardContent>{timeline.length === 0 ? <div className="py-16 text-center"><div className="mx-auto mb-4 grid size-11 place-items-center rounded-full bg-white/10"><Leaf className="size-5 text-[#b9df8b]" /></div><p className="font-medium">时间线还是空的</p><p className="mx-auto mt-2 max-w-56 text-sm leading-6 text-white/55">确认第一条观察后，它会在这里成为长期记忆的一部分。</p></div> : <ol className="space-y-5">{timeline.map((item) => <li key={item.id} className="relative border-l border-white/20 pl-5"><span className="absolute -left-1 top-1.5 size-2 rounded-full bg-[#b9df8b] ring-4 ring-[#173f37]" /><p className="text-xs font-semibold uppercase tracking-wider text-[#b9df8b]">{new Date(item.confirmedAt).toLocaleDateString('zh-CN')} · {item.context}</p><p className="mt-2 text-sm leading-6 text-white/80">{item.outcome}</p><p className="mt-2 text-xs text-white/45">{item.observations.length} 条可观察事实</p></li>)}</ol>}</CardContent>
          </Card>
        </aside>
      </div>
      <footer className="mx-auto flex max-w-[1500px] items-center justify-between px-5 pb-8 text-xs text-muted-foreground lg:px-8"><span>AI helps teachers notice more.</span><span>This is a pattern, not a diagnosis.</span></footer>
    </main>
  );
}
