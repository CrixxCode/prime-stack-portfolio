/* Product UI compositions used in place of real screenshots. */
const Bar = ({ w, c = "bg-surface-2" }: { w: string; c?: string }) => <div className={`h-1.5 rounded ${c}`} style={{ width: w }} />;

export function HotelMock({ label }: { label: string }) {
  const days = Array.from({ length: 28 });
  const booked = new Set([2, 3, 4, 9, 10, 15, 16, 17, 18, 23]);
  return (
    <div className="grid h-full grid-cols-[110px_1fr] overflow-hidden rounded-xl border border-border-strong bg-card text-[10px] shadow-soft" role="img" aria-label={label}>
      <div className="space-y-1 border-r border-border bg-surface p-3 font-mono">
        <div className="mb-3 font-sans text-xs font-semibold">Hotel·OS</div>
        {["Dashboard", "Reservas", "Clientes", "Habitaciones", "Facturación", "Reportes"].map((x, i) => (
          <div key={x} className={`rounded px-2 py-1.5 ${i === 1 ? "bg-primary/8 text-primary" : "text-muted-foreground"}`}>{x}</div>
        ))}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between"><div className="text-sm font-semibold">Reservas · Octubre</div><div className="rounded-md bg-primary px-2 py-1 text-primary-foreground">+ Nueva</div></div>
        <div className="grid grid-cols-3 gap-2">
          {[["Ocupación", "—"], ["Check-ins", "—"], ["Habitaciones", "—"]].map(([l, v]) => (
            <div key={l} className="rounded-lg border border-border p-2"><div className="text-muted-foreground">{l}</div><div className="mt-1 font-mono text-base">{v}</div></div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((_, i) => <div key={i} className={`aspect-square rounded ${booked.has(i) ? "bg-primary/70" : "bg-surface-2"}`} />)}
        </div>
        <div className="space-y-2 rounded-lg border border-border p-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2"><div className="h-5 w-5 rounded-full bg-surface-2" /><div className="flex-1 space-y-1"><Bar w="60%" /><Bar w="35%" /></div><span className="rounded bg-success/15 px-1.5 py-0.5 font-mono text-[oklch(0.48_0.14_155)] dark:text-success">ok</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExamMock({ label }: { label: string }) {
  const bars = [62, 40, 78, 55, 70];
  return (
    <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-xl border border-border-strong bg-card text-[10px] shadow-soft" role="img" aria-label={label}>
      <header className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-semibold">Saber Pro</span>
        <span className="font-mono text-muted-foreground">simulacro · 24/35</span>
      </header>
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[1.3fr_1fr]">
        <div className="space-y-2 rounded-lg border border-border p-3">
          <div className="font-mono text-muted-foreground">Lectura crítica · P24</div>
          <Bar w="95%" /><Bar w="88%" /><Bar w="70%" />
          <div className="space-y-1.5 pt-2">
            {["A", "B", "C", "D"].map((o, i) => (
              <div key={o} className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${i === 2 ? "border-primary bg-primary/10" : "border-border"}`}>
                <span className="font-mono">{o}</span><Bar w={`${50 + i * 10}%`} />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-lg border border-border p-3">
          <div className="font-mono text-muted-foreground">Diagnóstico</div>
          <div className="flex h-24 items-end gap-1.5">
            {bars.map((b, i) => <div key={i} className={`flex-1 rounded-t ${i === 2 ? "bg-primary" : "bg-surface-2"}`} style={{ height: `${b}%` }} />)}
          </div>
          <div className="grid grid-cols-5 font-mono text-muted-foreground"><span>LC</span><span>RC</span><span>CC</span><span>IN</span><span>CE</span></div>
          <div className="rounded-md bg-surface p-2"><Bar w="80%" /><div className="h-1" /><Bar w="50%" /></div>
        </div>
      </div>
    </div>
  );
}
