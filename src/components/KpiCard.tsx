import { NumberTicker } from './ui/number-ticker'
import { BlurFade } from './ui/blur-fade'

interface KpiCardProps {
  label: string
  value: number
  prefix?: string
  pill: string
  pillColor: 'good' | 'bad' | 'watch' | 'clay'
  index: number
}

const pillStyles = {
  good: 'text-good bg-good-bg',
  bad: 'text-bad bg-bad-bg',
  watch: 'text-watch bg-watch-bg',
  clay: 'text-clay bg-clay/12',
}

export function KpiCard({ label, value, prefix = '', pill, pillColor, index }: KpiCardProps) {
  return (
    <BlurFade delay={0.1 + index * 0.08}>
      <div className="bg-card border border-card-border rounded-[14px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full">
        <div className="text-[13px] text-text-muted uppercase tracking-[0.06em] mb-2">
          {label}
        </div>
        <div className="font-title text-[clamp(28px,5vw,40px)] leading-none tabular-nums whitespace-nowrap">
          {prefix}<NumberTicker value={value} />
        </div>
        <span
          className={`inline-block text-[13px] font-medium px-2.5 py-0.5 rounded-full mt-3 ${pillStyles[pillColor]}`}
        >
          {pill}
        </span>
      </div>
    </BlurFade>
  )
}
