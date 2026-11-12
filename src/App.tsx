import { useState } from 'react'
import { BlurFade } from './components/ui/blur-fade'
import { KpiCard } from './components/KpiCard'
import { BudgetRow } from './components/BudgetRow'
import { MonthlyChart } from './components/MonthlyChart'
import { WeeklyTransactions } from './components/WeeklyTransactions'
import { ThemeToggle } from './components/ThemeToggle'
import {
  discretionary, fixed, allCategories,
  totalActual, totalBudget, proratedBudget,
  discActual, fixActual, PRORATE_FRAC, MONTHS_ELAPSED,
  WEEK_LABEL,
} from './data/budget'

type Tab = 'budget' | 'weekly'

function App() {
  const [tab, setTab] = useState<Tab>('budget')
  const pctUsed = Math.round((totalActual / proratedBudget) * 100)
  const diff = proratedBudget - totalActual
  const overCount = allCategories.filter(c => {
    const projected = Math.round(c.actual / PRORATE_FRAC)
    return c.budget > 0 && projected > c.budget
  }).length

  return (
    <div className="max-w-[880px] mx-auto px-4 pb-12">
      {/* Header */}
      <header className="pt-10 pb-2">
        <div className="flex justify-between items-start">
          <BlurFade delay={0}>
            <div className="text-[13px] text-text-muted uppercase tracking-[0.06em] mb-2">
              Week of {WEEK_LABEL} · YTD through Nov 9
            </div>
          </BlurFade>
          <ThemeToggle />
        </div>
        <BlurFade delay={0.05}>
          <h1 className="font-title text-[32px] font-normal leading-tight m-0">
            We've spent ${totalActual.toLocaleString()} year to date
          </h1>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="text-base text-text-muted mt-2 leading-relaxed">
            That's {pctUsed}% of our prorated budget.{' '}
            {diff > 0
              ? `$${diff.toLocaleString()} remaining`
              : `$${(-diff).toLocaleString()} over`}{' '}
            through {MONTHS_ELAPSED} months.
          </p>
        </BlurFade>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 my-8">
        <KpiCard
          label="YTD Spent"
          value={totalActual}
          prefix="$"
          pill={`${pctUsed}% of prorated budget`}
          pillColor={pctUsed <= 100 ? 'good' : 'bad'}
          index={0}
        />
        <KpiCard
          label="Discretionary"
          value={discActual}
          prefix="$"
          pill={`${Math.round(discActual / totalActual * 100)}% of total`}
          pillColor="clay"
          index={1}
        />
        <KpiCard
          label="Fixed"
          value={fixActual}
          prefix="$"
          pill={`${Math.round(fixActual / totalActual * 100)}% of total`}
          pillColor="clay"
          index={2}
        />
        <KpiCard
          label="Categories over"
          value={overCount}
          pill={overCount === 0 ? 'All on track' : 'Need attention'}
          pillColor={overCount > 3 ? 'bad' : overCount > 0 ? 'watch' : 'good'}
          index={3}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg-soft rounded-full p-1 mb-8 w-fit">
        <button
          onClick={() => setTab('budget')}
          className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors cursor-pointer border-0 ${
            tab === 'budget'
              ? 'bg-card text-tab-budget shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
              : 'bg-transparent text-tab-budget'
          }`}
        >
          Annual Budget
        </button>
        <button
          onClick={() => setTab('weekly')}
          className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors cursor-pointer border-0 ${
            tab === 'weekly'
              ? 'bg-card text-tab-weekly shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
              : 'bg-transparent text-tab-weekly'
          }`}
        >
          This Week
        </button>
      </div>

      {tab === 'budget' ? (
        <>
          {/* Discretionary */}
          <BlurFade delay={0.15} inView>
            <h2 className="font-title text-[22px] font-normal mt-2 mb-1">
              Discretionary spending by category
            </h2>
            <p className="text-[13px] text-text-muted mb-5">
              Annual budget vs projected annual spend at current pace
            </p>
          </BlurFade>
          <div className="flex flex-col gap-2.5">
            {discretionary.map((c, i) => (
              <BudgetRow key={c.name} category={c} index={i} />
            ))}
          </div>

          {/* Fixed */}
          <BlurFade delay={0.1} inView>
            <h2 className="font-title text-[22px] font-normal mt-10 mb-1">
              Fixed expenses by category
            </h2>
            <p className="text-[13px] text-text-muted mb-5">
              Annual budget vs projected annual spend at current pace
            </p>
          </BlurFade>
          <div className="flex flex-col gap-2.5">
            {fixed.map((c, i) => (
              <BudgetRow key={c.name} category={c} index={i} />
            ))}
          </div>

          {/* Monthly Chart */}
          <BlurFade delay={0.1} inView>
            <h2 className="font-title text-[22px] font-normal mt-10 mb-5">
              Monthly spending trend — 2026
            </h2>
          </BlurFade>
          <MonthlyChart />
        </>
      ) : (
        <WeeklyTransactions />
      )}

      {/* Footer */}
      <BlurFade delay={0.15} inView>
        <footer className="pt-8 pb-10 text-[13px] text-text-muted border-t border-card-border mt-10">
          2027 annual budget: ${totalBudget.toLocaleString()} · Monthly target:{' '}
          ${Math.round(totalBudget / 12).toLocaleString()} · Weekly target:{' '}
          ${Math.round(totalBudget / 52).toLocaleString()}
          <br />
          Categories from Quicken · Updated Nov 11, 2026
        </footer>
      </BlurFade>
    </div>
  )
}

export default App
