import { motion } from 'motion/react'
import { BlurFade } from './ui/blur-fade'
import type { Category } from '../data/budget'
import { fmt, PRORATE_FRAC } from '../data/budget'

interface BudgetRowProps {
  category: Category
  index: number
}

function BarLine({
  label,
  value,
  maxVal,
  color,
  delay,
}: {
  label: string
  value: number
  maxVal: number
  color: string
  delay: number
}) {
  const w = maxVal > 0 ? Math.min((value / maxVal) * 100, 100) : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] text-text-muted w-[72px] shrink-0 text-right">{label}</span>
      <div className="flex-1 h-[10px] bg-bar-track rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${w}%` }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[13px] font-semibold tabular-nums w-[72px] shrink-0">{fmt(value)}</span>
    </div>
  )
}

export function BudgetRow({ category, index }: BudgetRowProps) {
  const annualBudget = category.budget
  const projectedAnnual = Math.round(category.actual / PRORATE_FRAC)
  const ytdActual = category.actual
  const diff = annualBudget - projectedAnnual
  const pct = annualBudget > 0 ? Math.round((projectedAnnual / annualBudget) * 100) : 0
  const maxVal = Math.max(annualBudget, projectedAnnual, ytdActual)
  const baseDelay = index * 0.03

  return (
    <BlurFade delay={0.05 + index * 0.04} inView direction="up" offset={8}>
      <div className="bg-card border border-card-border rounded-[14px] px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-base font-medium">{category.name}</span>
          <span className={`text-[13px] font-semibold tabular-nums ${diff >= 0 ? 'text-good' : 'text-bad'}`}>
            {diff >= 0 ? `${fmt(diff)} under budget` : `${fmt(-diff)} over budget`}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <BarLine label="Budget" value={annualBudget} maxVal={maxVal} color="bg-clay" delay={baseDelay} />
          <BarLine label="Projected" value={projectedAnnual} maxVal={maxVal} color={pct > 100 ? 'bg-bad' : pct > 85 ? 'bg-watch' : 'bg-good'} delay={baseDelay + 0.05} />
          <BarLine label="YTD Actual" value={ytdActual} maxVal={maxVal} color="bg-text-muted opacity-60" delay={baseDelay + 0.1} />
        </div>
      </div>
    </BlurFade>
  )
}
