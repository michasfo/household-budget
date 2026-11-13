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
export const discBudget = discretionary.reduce((s, c) => s + c.budget, 0)
export const fixActual = fixed.reduce((s, c) => s + c.actual, 0)
export const fixBudget = fixed.reduce((s, c) => s + c.budget, 0)

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
    { date: '11/03', description: 'Amazon.com', amount: 8.62 },
    { date: '11/05', description: 'Amazon.com', amount: 7.60 },
    { date: '11/08', description: 'Amazon.com', amount: 103.08 },
  ]},
  { category: 'Cash', section: 'discretionary', transactions: [] },
  { category: 'Clothing', section: 'discretionary', transactions: [
    { date: '11/04', description: 'Sp Mio Inc', amount: 967.85 },
    { date: '11/08', description: 'Sp Mio Inc', amount: 513.26 },
  ]},
  { category: 'Dining', section: 'discretionary', transactions: [
    { date: '11/03', description: 'A & M Liquor', amount: 6.70 },
    { date: '11/03', description: 'UN Market', amount: 2.06 },
    { date: '11/06', description: 'Opera Plaza Ecommerce', amount: 9.37 },
    { date: '11/06', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/06', description: 'Presidio Liquors & Groce', amount: 3.07 },
    { date: '11/06', description: 'Brasserie', amount: 6.20 },
    { date: '11/08', description: 'Roam Artisan Burgers', amount: 21.62 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Pork Store Cafe', amount: 22.68 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Barista Cafe', amount: 7.75 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Roam Artisan Burgers', amount: 9.06 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 5.89 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Barista Cafe', amount: 16.88 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/08', description: 'Pork Store Cafe', amount: 24.33 },
    { date: '11/08', description: 'Presidio Liquors & Groce', amount: 2.49 },
    { date: '11/09', description: 'Barista Cafe', amount: 14.27 },
    { date: '11/09', description: 'Presidio Liquors & Groce', amount: 5.89 },
    { date: '11/09', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/09', description: 'Presidio Kebab', amount: 29.47 },
    { date: '11/09', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/09', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/09', description: 'Barista Cafe', amount: 7.75 },
    { date: '11/09', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/09', description: 'Presidio Liquors & Groce', amount: 2.55 },
  ]},
  { category: 'Household', section: 'discretionary', transactions: [
    { date: '11/05', description: 'Ebay', amount: 136.26 },
    { date: '11/06', description: 'HP Instant Ink', amount: 9.22 },
  ]},
  { category: 'Movies', section: 'discretionary', transactions: [
    { date: '11/03', description: 'The Roxie Theater', amount: 15.00 },
    { date: '11/04', description: 'Netflix', amount: 19.99 },
    { date: '11/04', description: 'Kabuki', amount: 20.00 },
    { date: '11/06', description: 'Alamo Drafthouse Cinema', amount: 11.19 },
    { date: '11/08', description: 'Vogue', amount: 14.50 },
    { date: '11/08', description: 'Vogue', amount: 7.00 },
    { date: '11/08', description: 'Fandango', amount: 20.19 },
    { date: '11/09', description: 'Vogue', amount: 16.50 },
    { date: '11/09', description: 'Vogue', amount: 5.00 },
  ]},
  { category: 'Personal Care', section: 'discretionary', transactions: [
    { date: '11/04', description: 'Maverick West', amount: 162.00 },
    { date: '11/08', description: 'Joinzoe.com', amount: 9.99 },
  ]},
  { category: 'Subscriptions', section: 'discretionary', transactions: [
    { date: '11/03', description: 'CNN Interactive', amount: 6.99 },
    { date: '11/09', description: 'OpenAI ChatGPT Subscr', amount: 20.00 },
  ]},
  { category: 'Taxi & Transport', section: 'discretionary', transactions: [
    { date: '11/03', description: 'Lyft', amount: 19.12 },
    { date: '11/08', description: 'Lyft', amount: 14.56 },
  ]},
  { category: 'Health Care', section: 'fixed', transactions: [
    { date: '11/03', description: 'Kaiser Permanente', amount: 99.00 },
  ]},
  { category: 'Groceries', section: 'fixed', transactions: [
    { date: '11/03', description: 'Costco', amount: 206.16 },
    { date: '11/08', description: 'Mollie Stone\'s', amount: 2.65 },
    { date: '11/08', description: 'Mollie Stone\'s', amount: 5.30 },
  ]},
  // Monthly bills excluded: Mortgage, Condo Dues, Telephone, Home Insurance,
  // Property Tax, dental insurance (Blue Shield). These are fixed obligations
  // with no weekly discretion.
]

function sumTxns(wc: WeeklyCategory): number {
  return wc.transactions.reduce((s, t) => s + t.amount, 0)
}

export const weeklyTotal = weeklyCategories.reduce((s, wc) => s + sumTxns(wc), 0)

// Weekly target based only on categories shown in the weekly view
// (discretionary + Groceries + Health Care — excludes monthly bills)
const weeklyViewBudget = discBudget
  + (fixed.find(c => c.name === 'Groceries')?.budget ?? 0)
  + (fixed.find(c => c.name === 'Health Care')?.budget ?? 0)
export const weeklyBudgetTarget = Math.round(weeklyViewBudget / 52)
