import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlurFade } from './ui/blur-fade'
import { weeklyCategories, weeklyTotal, weeklyBudgetTarget, fmt, WEEK_LABEL } from '../data/budget'
import type { WeeklyCategory } from '../data/budget'

function CategoryRow({ wc, index }: { wc: WeeklyCategory; index: number }) {
  const [open, setOpen] = useState(false)
  const total = wc.transactions.reduce((s, t) => s + t.amount, 0)

  return (
    <BlurFade delay={0.05 + index * 0.03} inView direction="up" offset={6}>
      <div className="bg-card border border-card-border rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-4 py-3 flex justify-between items-center cursor-pointer bg-transparent border-0 text-text hover:bg-bar-track transition-colors"
        >
          <span className="flex items-center gap-2 text-[15px]">
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-text-muted text-[12px] inline-block"
            >
              ▶
            </motion.span>
            {wc.category}
            <span className="text-[12px] text-text-muted">
              ({wc.transactions.length})
            </span>
          </span>
          <span className="text-[15px] font-semibold tabular-nums">{fmt(total)}</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-card-border">
                {wc.transactions.map((t, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2.5 flex justify-between items-center text-[13px] ${
                      i < wc.transactions.length - 1 ? 'border-b border-card-border' : ''
                    }`}
                  >
                    <span className="flex gap-3">
                      <span className="text-text-muted tabular-nums w-[40px] shrink-0">{t.date}</span>
                      <span>{t.description}</span>
                    </span>
                    <span className="tabular-nums font-medium">{fmt(t.amount)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BlurFade>
  )
}

export function WeeklyTransactions() {
  const discCats = weeklyCategories.filter(wc => wc.section === 'discretionary')
  const fixedCats = weeklyCategories.filter(wc => wc.section === 'fixed')
  const discTotal = discCats.reduce((s, wc) => s + wc.transactions.reduce((a, t) => a + t.amount, 0), 0)
  const fixedTotal = fixedCats.reduce((s, wc) => s + wc.transactions.reduce((a, t) => a + t.amount, 0), 0)
  const overTarget = weeklyTotal > weeklyBudgetTarget

  const sortByTotal = (a: WeeklyCategory, b: WeeklyCategory) => {
    const aTotal = a.transactions.reduce((s, t) => s + t.amount, 0)
    const bTotal = b.transactions.reduce((s, t) => s + t.amount, 0)
    return bTotal - aTotal
  }

  return (
    <div>
      <BlurFade delay={0.05} inView>
        <div className="bg-card border border-card-border rounded-[14px] px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-6">
          <div className="flex justify-between items-baseline flex-wrap gap-2 mb-3">
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
          <div className="border-t border-card-border pt-3 flex gap-6 text-[14px]">
            <span>Discretionary: <strong className="font-semibold">{fmt(discTotal)}</strong></span>
            <span>Fixed: <strong className="font-semibold">{fmt(fixedTotal)}</strong></span>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.1} inView>
        <h3 className="font-title text-[18px] font-normal mt-6 mb-3">
          Discretionary · {fmt(discTotal)}
        </h3>
      </BlurFade>
      <div className="flex flex-col gap-2">
        {discCats.sort(sortByTotal).map((wc, i) => (
          <CategoryRow key={wc.category} wc={wc} index={i} />
        ))}
      </div>

      <BlurFade delay={0.1} inView>
        <h3 className="font-title text-[18px] font-normal mt-8 mb-3">
          Fixed · {fmt(fixedTotal)}
        </h3>
      </BlurFade>
      <div className="flex flex-col gap-2">
        {fixedCats.sort(sortByTotal).map((wc, i) => (
          <CategoryRow key={wc.category} wc={wc} index={i} />
        ))}
      </div>

      <BlurFade delay={0.15} inView>
        <p className="text-[12px] text-text-muted mt-6 italic">
          {WEEK_LABEL} · Monday 12:00 AM – Sunday 11:59 PM · Vacation excluded
        </p>
      </BlurFade>
    </div>
  )
}
