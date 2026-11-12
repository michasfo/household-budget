import { motion } from 'motion/react'
import { BlurFade } from './ui/blur-fade'
import type { Category } from '../data/budget'
import { fmt, statusOf, statusLabel, PRORATE_FRAC } from '../data/budget'

const barColors = {
  good: 'bg-good',
  watch: 'bg-watch',
  bad: 'bg-bad',
  accent: 'bg-clay',
}

const pillStyles = {
  good: 'text-good bg-good-bg',
  watch: 'text-watch bg-watch-bg',
  bad: 'text-bad bg-bad-bg',
}

function barClass(pct: number): keyof typeof barColors {
  if (pct > 100) return 'bad'
  if (pct > 85) return 'watch'
  if (pct > 60) return 'accent'
  return 'good'
}

interface BudgetRowProps {
  category: Category
  index: number
}

export function BudgetRow({ category, index }: BudgetRowProps) {
  const prorated = Math.round(category.budget * PRORATE_FRAC)
  const pct = prorated > 0 ? Math.round((category.actual / prorated) * 100) : 0
  const s = statusOf(pct)
  const fillW = Math.min(pct, 100)

  return (
    <BlurFade delay={0.05 + index * 0.04} inView direction="up" offset={8}>
      <div className="bg-card border border-card-border rounded-[14px] px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-baseline mb-1 gap-2 flex-wrap">
          <span className="text-base font-medium">{category.name}</span>
          <span className="text-[13px] text-text-muted tabular-nums whitespace-nowrap">
            <strong className="text-text font-semibold">{fmt(category.actual)}</strong>
            {' / '}
            {fmt(prorated)} prorated
          </span>
        </div>
        <div className="h-2 bg-bar-track rounded-full mt-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${fillW}%` }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 0.7,
              ease: [0.23, 1, 0.32, 1],
              delay: index * 0.03,
            }}
            className={`h-full rounded-full ${barColors[barClass(pct)]}`}
          />
        </div>
        <div className="flex justify-between items-center mt-2 gap-2">
          <span className={`text-[13px] font-semibold tabular-nums text-${s}`}>
            {pct}%
          </span>
          <span className="text-[12px] text-text-muted tabular-nums">
            2027 target: {fmt(category.budget)}/yr
          </span>
          <span
            className={`text-[12px] font-medium px-2.5 py-0.5 rounded-full ${pillStyles[s]}`}
          >
            {statusLabel(pct)}
          </span>
        </div>
      </div>
    </BlurFade>
  )
}
