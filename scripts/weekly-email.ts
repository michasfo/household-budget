// Builds the Weekly Spending Report email HTML from src/data/budget.ts.
// Run: node scripts/weekly-email.ts > weekly-email.html   (Node 22.6+)
import {
  weeklyCategories, weeklyTotal, weeklyBudgetTarget, discBudget, discretionary, fixed,
  fmt, WEEK_LABEL, MONTH_LABEL, monthToDate,
} from '../src/data/budget.ts'
import type { WeeklyCategory } from '../src/data/budget.ts'

const RED = '#b5292c', GREEN = '#1a7a2e', AMBER = '#8a5a06'
const allCats = [...discretionary, ...fixed]
const sum = (wc: WeeklyCategory) => wc.transactions.reduce((s, t) => s + t.amount, 0)
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#39;')
const money2 = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function categoryBlock(wc: WeeklyCategory): string {
  const monthly = Math.round((allCats.find(c => c.name === wc.category)?.budget ?? 0) / 12)
  const pct = monthly > 0 ? Math.round((monthToDate(wc) / monthly) * 100) : 0
  const color = pct > 100 ? RED : pct > 85 ? AMBER : GREEN
  const rows = wc.transactions.map((t, i) => {
    const last = i === wc.transactions.length - 1
    return `<tr${last ? '' : ' style="border-bottom:1px solid #f0f0f0"'}><td style="padding:4px 0;color:#888${i === 0 ? ';width:50px' : ''}">${t.date}</td><td style="padding:4px 0">${esc(t.description)}</td><td style="text-align:right;padding:4px 0">${money2(t.amount)}</td></tr>`
  }).join('\n')
  return `
<h3 style="font-size:14px;font-weight:600;margin:16px 0 2px;color:#555">${esc(wc.category)} — ${fmt(sum(wc))}</h3>
<p style="font-size:12px;color:#999;margin:0 0 6px">${fmt(monthly)}/mo budget · <span style="color:${color};font-weight:600">${pct}% spent in ${MONTH_LABEL}</span></p>
<table style="width:100%;border-collapse:collapse;font-size:13px">
${rows}
</table>
`
}

const byTotal = (a: WeeklyCategory, b: WeeklyCategory) => sum(b) - sum(a)
const disc = weeklyCategories.filter(w => w.section === 'discretionary' && w.transactions.length).sort(byTotal)
const fix = weeklyCategories.filter(w => w.section === 'fixed' && w.transactions.length).sort(byTotal)
const discTotal = disc.reduce((s, w) => s + sum(w), 0)
const fixTotal = fix.reduce((s, w) => s + sum(w), 0)
const discTarget = Math.round(discBudget / 52)
const fixTarget = weeklyBudgetTarget - discTarget

function diffCell(actual: number, target: number, bold = false) {
  const over = actual > target
  return `<td style="text-align:right;padding:8px 0;color:${over ? RED : GREEN};font-weight:${bold ? 700 : 600}">${over ? '+' : '-'}${fmt(Math.abs(actual - target))} ${over ? 'over' : 'under'}</td>`
}

console.log(`
<h1 style="font-size:22px;font-weight:600;margin-bottom:4px">Weekly Spending Report</h1>
<p style="color:#888;font-size:14px;margin-top:0">Week of ${WEEK_LABEL} (Mon–Sun)</p>
<hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
<h2 style="font-size:17px;font-weight:600;margin-bottom:12px">Summary</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px">
<thead><tr style="border-bottom:2px solid #ddd">
<th style="text-align:left;padding:6px 0;color:#888;font-weight:500"></th>
<th style="text-align:right;padding:6px 0;color:#888;font-weight:500">Week Total</th>
<th style="text-align:right;padding:6px 0;color:#888;font-weight:500">Weekly Target</th>
<th style="text-align:right;padding:6px 0;color:#888;font-weight:500">Difference</th>
</tr></thead>
<tbody>
<tr style="border-bottom:1px solid #eee"><td style="padding:8px 0;font-weight:500">Discretionary</td><td style="text-align:right;padding:8px 0">${fmt(discTotal)}</td><td style="text-align:right;padding:8px 0;color:#888">${fmt(discTarget)}</td>${diffCell(discTotal, discTarget)}</tr>
<tr style="border-bottom:1px solid #eee"><td style="padding:8px 0;font-weight:500">Fixed (Groceries + Health Care)</td><td style="text-align:right;padding:8px 0">${fmt(fixTotal)}</td><td style="text-align:right;padding:8px 0;color:#888">${fmt(fixTarget)}</td>${diffCell(fixTotal, fixTarget)}</tr>
<tr style="border-top:2px solid #ddd"><td style="padding:8px 0;font-weight:700">Total</td><td style="text-align:right;padding:8px 0;font-weight:700">${fmt(weeklyTotal)}</td><td style="text-align:right;padding:8px 0;color:#888;font-weight:700">${fmt(weeklyBudgetTarget)}</td>${diffCell(weeklyTotal, weeklyBudgetTarget, true)}</tr>
</tbody></table>
<p style="font-size:13px;color:#888;margin-top:4px">Excludes monthly bills (Mortgage, Condo Dues, Telephone, Insurance, Property Tax). "% spent" is ${MONTH_LABEL} to date vs. the monthly budget.</p>
<hr style="border:none;border-top:1px solid #ddd;margin:20px 0">
<h2 style="font-size:17px;font-weight:600;margin-bottom:12px">Discretionary – ${fmt(discTotal)}</h2>
${disc.map(categoryBlock).join('')}
<hr style="border:none;border-top:1px solid #ddd;margin:20px 0">
<h2 style="font-size:17px;font-weight:600;margin-bottom:12px">Fixed (Variable) – ${fmt(fixTotal)}</h2>
${fix.map(categoryBlock).join('')}
<hr style="border:none;border-top:1px solid #ddd;margin:20px 0">
<p style="font-size:12px;color:#aaa">Source: Quicken CSV export · View the full dashboard at <a href="https://michasfo.github.io/household-budget/" style="color:#7c3aed">michasfo.github.io/household-budget</a></p>
`)
