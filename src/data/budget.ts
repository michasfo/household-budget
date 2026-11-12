export interface Category {
  name: string
  actual: number
  budget: number
}

export const MONTHS_ELAPSED = 10
export const PRORATE_FRAC = MONTHS_ELAPSED / 12

// 2027 Budget Targets from "2027 Budget Target - 185K 3.numbers"
// Actuals from Quicken CSV export 2026-11-11, transactions through Mon 11/9
export const discretionary: Category[] = [
  { name: 'Amazon',           actual: 11732, budget: 9021 },
  { name: 'Auto',             actual: 2581,  budget: 1992 },
  { name: 'Cash',             actual: 10705, budget: 8030 },
  { name: 'Charity',          actual: 2306,  budget: 1823 },
  { name: 'Clothing',         actual: 28773, budget: 25185 },
  { name: 'Computer',         actual: 126,   budget: 100 },
  { name: 'Dining',           actual: 16803, budget: 12735 },
  { name: 'Gifts Given',      actual: 2886,  budget: 2282 },
  { name: 'Household',        actual: 1463,  budget: 1007 },
  { name: 'Misc',             actual: 189,   budget: 505 },
  { name: 'Movies',           actual: 8696,  budget: 6292 },
  { name: 'Personal Care',    actual: 4537,  budget: 3661 },
  { name: 'Subscriptions',    actual: 9767,  budget: 6819 },
  { name: 'Taxi & Transport', actual: 4215,  budget: 3089 },
  { name: 'Vacation',         actual: 33972, budget: 24524 },
]

export const fixed: Category[] = [
  { name: 'Condo Dues',    actual: 12159, budget: 14891 },
  { name: 'Groceries',     actual: 10298, budget: 11774 },
  { name: 'Health Care',   actual: 6794,  budget: 8497 },
  { name: 'Home Insurance', actual: 4439, budget: 4439 },
  { name: 'Mortgage',      actual: 18820, budget: 20532 },
  { name: 'Property Tax',  actual: 5016,  budget: 10320 },
  { name: 'Utilities',     actual: 5863,  budget: 6944 },
  { name: 'Other Fixed',   actual: 517,   budget: 538 },
]

export const monthlyData = [
  { month: 'Jan', actual: 17399, budget: 15417 },
  { month: 'Feb', actual: 13029, budget: 15417 },
  { month: 'Mar', actual: 25009, budget: 15417 },
  { month: 'Apr', actual: 17539, budget: 15417 },
  { month: 'May', actual: 14884, budget: 15417 },
  { month: 'Jun', actual: 32352, budget: 15417 },
  { month: 'Jul', actual: 20834, budget: 15417 },
  { month: 'Aug', actual: 16836, budget: 15417 },
  { month: 'Sep', actual: 16551, budget: 15417 },
  { month: 'Oct', actual: 17726, budget: 15417 },
  { month: 'Nov', actual: 6846,  budget: 15417 },
]

export const allCategories = [...discretionary, ...fixed]
export const totalActual = allCategories.reduce((s, c) => s + c.actual, 0)
export const totalBudget = allCategories.reduce((s, c) => s + c.budget, 0)
export const proratedBudget = Math.round(totalBudget * PRORATE_FRAC)
export const discActual = discretionary.reduce((s, c) => s + c.actual, 0)
export const fixActual = fixed.reduce((s, c) => s + c.actual, 0)

export function fmt(n: number): string {
  return '$' + Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export function statusOf(pct: number): 'good' | 'watch' | 'bad' {
  if (pct > 100) return 'bad'
  if (pct > 85) return 'watch'
  return 'good'
}

export function statusLabel(pct: number): string {
  if (pct > 100) return 'Over budget'
  if (pct > 85) return 'Watch'
  return 'On track'
}
