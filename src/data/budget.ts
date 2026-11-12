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

export interface Transaction {
  date: string
  description: string
  amount: number
}

export interface WeeklyCategory {
  category: string
  section: 'discretionary' | 'fixed'
  transactions: Transaction[]
}

// Weekly transactions for the week of Nov 3 – Nov 9, 2026 (Mon–Sun)
// Source: Quicken CSV export 2026-11-11
// Vacation excluded from weekly view per household preference
export const WEEK_LABEL = 'Nov 3 – Nov 9, 2026'
export const weeklyCategories: WeeklyCategory[] = [
  { category: 'Amazon', section: 'discretionary', transactions: [
    { date: '11/3', description: 'Amazon - Household supplies', amount: 47 },
    { date: '11/4', description: 'Amazon - Kitchen items', amount: 89 },
    { date: '11/6', description: 'Amazon - Electronics', amount: 124 },
    { date: '11/8', description: 'Amazon - Books', amount: 27 },
  ]},
  { category: 'Cash', section: 'discretionary', transactions: [
    { date: '11/3', description: 'ATM withdrawal', amount: 100 },
    { date: '11/7', description: 'ATM withdrawal', amount: 100 },
  ]},
  { category: 'Clothing', section: 'discretionary', transactions: [
    { date: '11/4', description: 'Nordstrom', amount: 218 },
    { date: '11/5', description: 'Zara', amount: 165 },
    { date: '11/9', description: 'Nike', amount: 159 },
  ]},
  { category: 'Dining', section: 'discretionary', transactions: [
    { date: '11/3', description: 'Sweetgreen', amount: 22 },
    { date: '11/4', description: 'Nobu', amount: 187 },
    { date: '11/6', description: 'Uber Eats', amount: 45 },
    { date: '11/7', description: 'Starbucks', amount: 12 },
    { date: '11/8', description: 'The Cavalier', amount: 94 },
    { date: '11/9', description: 'DoorDash', amount: 29 },
  ]},
  { category: 'Movies', section: 'discretionary', transactions: [
    { date: '11/5', description: 'AMC Metreon', amount: 38 },
    { date: '11/7', description: 'Apple TV purchase', amount: 20 },
    { date: '11/9', description: 'AMC Kabuki', amount: 42 },
    { date: '11/9', description: 'Netflix', amount: 23 },
    { date: '11/3', description: 'Criterion Channel', amount: 11 },
    { date: '11/6', description: 'Vudu rental', amount: 6 },
    { date: '11/8', description: 'Fandango', amount: 56 },
  ]},
  { category: 'Personal Care', section: 'discretionary', transactions: [
    { date: '11/5', description: 'Haircut - Mike', amount: 55 },
    { date: '11/8', description: 'CVS Pharmacy', amount: 30 },
  ]},
  { category: 'Subscriptions', section: 'discretionary', transactions: [
    { date: '11/3', description: 'Spotify Family', amount: 17 },
    { date: '11/3', description: 'NYT Digital', amount: 25 },
    { date: '11/5', description: 'iCloud+', amount: 10 },
    { date: '11/7', description: 'Adobe Creative Cloud', amount: 55 },
    { date: '11/9', description: 'Gym membership', amount: 40 },
  ]},
  { category: 'Taxi & Transport', section: 'discretionary', transactions: [
    { date: '11/4', description: 'Uber', amount: 28 },
    { date: '11/6', description: 'Lyft', amount: 34 },
    { date: '11/8', description: 'Uber', amount: 34 },
  ]},
  { category: 'Groceries', section: 'fixed', transactions: [
    { date: '11/3', description: 'Whole Foods', amount: 142 },
    { date: '11/5', description: 'Trader Joe\'s', amount: 87 },
    { date: '11/7', description: 'Safeway', amount: 63 },
    { date: '11/9', description: 'Whole Foods', amount: 120 },
  ]},
  { category: 'Utilities', section: 'fixed', transactions: [
    { date: '11/4', description: 'PG&E', amount: 98 },
    { date: '11/6', description: 'Comcast internet', amount: 40 },
  ]},
  { category: 'Health Care', section: 'fixed', transactions: [
    { date: '11/5', description: 'Dr. Chen copay', amount: 50 },
    { date: '11/7', description: 'CVS prescription', amount: 85 },
    { date: '11/9', description: 'Lab work copay', amount: 115 },
  ]},
]

function sumTxns(wc: WeeklyCategory): number {
  return wc.transactions.reduce((s, t) => s + t.amount, 0)
}

export const weeklyTotal = weeklyCategories.reduce((s, wc) => s + sumTxns(wc), 0)
export const weeklyBudgetTarget = Math.round(totalBudget / 52)
