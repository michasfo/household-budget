import { motion } from 'motion/react'
import { BlurFade } from './ui/blur-fade'
import type { Category } from '../data/budget'
import { fmt, PRORATE_FRAC } from '../data/budget'

const barColors = {
  good: 'bg-good',
  watch: 'bg-watch',
  bad: 'bg-bad',
  accent: 'bg-clay',
}

function barClass(pct: number) {
  if (pct > 100) return 'bad' as const
  if (pct > 85) return 'watch' as const
  if (pct > 60) return 'accent' as const
  return 'good' as const
}

interface BudgetRowProps {
  category: Category
  index: number
}

export function BudgetRow({ category, index }: BudgetRowProps) {
  const annualBudget = category.budget
  const projectedAnnual = Math.round(category.actual / PRORATE_FRAC)
  const diff = annualBudget - projectedAnnual
  const pct = annualBudget > 0 ? Math.round((projectedAnnual / annualBudget) * 100) : 0
  const fillW = Math.min(pct, 100)

  return (
    <BlurFade delay={0.05 + index * 0.04} inView direction="up" offset={8}>
      <div className="bg-card border border-card-border rounded-[14px] px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-baseline mb-1 gap-2 flex-wrap">
          <span className="text-base font-medium">{category.name}</span>
          <div className="flex gap-4 text-[13px] tabular-nums whitespace-nowrap">
            <span className="text-text-muted">
              Budget <strong className="text-text font-semibold">{fmt(annualBudget)}</strong>
            </span>
            <span className="text-text-muted">
              Projected <strong className="text-text font-semibold">{fmt(projectedAnnual)}</strong>
            </span>
            <span className={diff >= 0 ? 'text-good font-semibold' : 'text-bad font-semibold'}>
              {diff >= 0 ? `−${fmt(diff)} under` : `+${fmt(-diff)} over`}
            </span>
          </div>
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
          <span className={`text-[13px] font-semibold tabular-nums ${pct > 100 ? 'text-bad' : pct > 85 ? 'text-watch' : 'text-good'}`}>
            {pct}% of annual budget
          </span>
          <span className="text-[12px] text-text-muted tabular-nums">
            YTD actual: {fmt(category.actual)}
          </span>
        </div>
      </div>
    </BlurFade>
  )
}
