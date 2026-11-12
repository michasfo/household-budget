import { BlurFade } from './ui/blur-fade'
import { weeklyTransactions, weeklyTotal, weeklyBudgetTarget, fmt, WEEK_LABEL } from '../data/budget'

export function WeeklyTransactions() {
  const discTxns = weeklyTransactions.filter(t => t.section === 'discretionary')
  const fixedTxns = weeklyTransactions.filter(t => t.section === 'fixed')
  const discTotal = discTxns.reduce((s, t) => s + t.amount, 0)
  const fixedTotal = fixedTxns.reduce((s, t) => s + t.amount, 0)
  const overTarget = weeklyTotal > weeklyBudgetTarget

  return (
    <div>
      <BlurFade delay={0.05} inView>
        <div className="bg-card border border-card-border rounded-[14px] px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <div>
              <div className="text-[13px] text-text-muted uppercase tracking-[0.06em] mb-1">
                Week total
              </div>
              <div className="text-[28px] font-title">{fmt(weeklyTotal)}</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] text-text-muted mb-1">Weekly target</div>
              <div className="text-[20px] font-title text-text-muted">{fmt(weeklyBudgetTarget)}</div>
            </div>
            <div className="text-right">
              <div className="text-[13px] text-text-muted mb-1">Difference</div>
              <div className={`text-[20px] font-title ${overTarget ? 'text-bad' : 'text-good'}`}>
                {overTarget ? '+' : '−'}{fmt(Math.abs(weeklyTotal - weeklyBudgetTarget))}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Discretionary */}
      <BlurFade delay={0.1} inView>
        <h3 className="font-title text-[18px] font-normal mt-6 mb-3">
          Discretionary · {fmt(discTotal)}
        </h3>
      </BlurFade>
      <div className="flex flex-col gap-2">
        {discTxns
          .sort((a, b) => b.amount - a.amount)
          .map((t, i) => (
            <BlurFade key={t.category} delay={0.05 + i * 0.03} inView direction="up" offset={6}>
              <div className="bg-card border border-card-border rounded-[10px] px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex justify-between items-center">
                <span className="text-[15px]">{t.category}</span>
                <span className="text-[15px] font-semibold tabular-nums">{fmt(t.amount)}</span>
              </div>
            </BlurFade>
          ))}
      </div>

      {/* Fixed */}
      <BlurFade delay={0.1} inView>
        <h3 className="font-title text-[18px] font-normal mt-8 mb-3">
          Fixed · {fmt(fixedTotal)}
        </h3>
      </BlurFade>
      <div className="flex flex-col gap-2">
        {fixedTxns
          .sort((a, b) => b.amount - a.amount)
          .map((t, i) => (
            <BlurFade key={t.category} delay={0.05 + i * 0.03} inView direction="up" offset={6}>
              <div className="bg-card border border-card-border rounded-[10px] px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex justify-between items-center">
                <span className="text-[15px]">{t.category}</span>
                <span className="text-[15px] font-semibold tabular-nums">{fmt(t.amount)}</span>
              </div>
            </BlurFade>
          ))}
      </div>

      <BlurFade delay={0.15} inView>
        <p className="text-[12px] text-text-muted mt-6 italic">
          {WEEK_LABEL} · Monday 12:00 AM – Sunday 11:59 PM
        </p>
      </BlurFade>
    </div>
  )
}
