import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts'
import { BlurFade } from './ui/blur-fade'
import { monthlyData, totalBudget } from '../data/budget'

const monthlyTarget = Math.round(totalBudget / 12)

export function MonthlyChart() {
  return (
    <BlurFade delay={0.2} inView direction="up">
      <div className="bg-card border border-card-border rounded-[14px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-x-auto">
        <ResponsiveContainer width="100%" height={300} minWidth={560}>
          <BarChart data={monthlyData} barGap={6} barSize={24}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-bar-track)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: 'var(--color-text-muted)', fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 10,
                color: 'var(--color-text)',
                fontSize: 13,
              }}
              formatter={(value: number) =>
                '$' + value.toLocaleString()
              }
              cursor={{ fill: 'var(--color-bar-track)', radius: 4 }}
            />
            <ReferenceLine
              y={monthlyTarget}
              stroke="var(--color-clay)"
              strokeDasharray="6 4"
              strokeWidth={2}
              label={{
                value: `2027 target $${(monthlyTarget / 1000).toFixed(1)}k/mo`,
                position: 'insideTopRight',
                fill: 'var(--color-clay)',
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="actual"
              name="Actual"
              radius={[4, 4, 0, 0]}
            >
              {monthlyData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.actual > monthlyTarget ? 'var(--color-bad)' : 'var(--color-clay)'}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BlurFade>
  )
}
