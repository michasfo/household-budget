export interface Category {
  name: string
  actual: number
  budget: number
}

export const MONTHS_ELAPSED = 10
export const PRORATE_FRAC = MONTHS_ELAPSED / 12

// 2027 Budget Targets from "2027 Budget Target - 185K 3.numbers"
// Actuals: Quicken CSV export 2026-11-16, transactions through Sun 11/16.
// Auto, Health Care, Utilities, Home Insurance, Property Tax, Other Fixed = 11/9 values
// plus this week's spend (the 11/16 export omits some of their subcategories).
export const discretionary: Category[] = [
  { name: 'Amazon',           actual: 11782, budget: 9021 },
  { name: 'Auto',             actual: 2586,  budget: 1992 },
  { name: 'Cash',             actual: 10745, budget: 8030 },
  { name: 'Charity',          actual: 2326,  budget: 1823 },
  { name: 'Clothing',         actual: 28886, budget: 25185 },
  { name: 'Computer',         actual: 126,   budget: 100 },
  { name: 'Dining',           actual: 17079, budget: 12735 },
  { name: 'Gifts Given',      actual: 3144,  budget: 2282 },
  { name: 'Household',        actual: 1463,  budget: 1007 },
  { name: 'Misc',             actual: 189,   budget: 505 },
  { name: 'Movies',           actual: 8830,  budget: 6292 },
  { name: 'Personal Care',    actual: 4587,  budget: 3661 },
  { name: 'Subscriptions',    actual: 9847,  budget: 6819 },
  { name: 'Taxi & Transport', actual: 4367,  budget: 3089 },
  { name: 'Vacation',         actual: 34905, budget: 24524 },
]

export const fixed: Category[] = [
  { name: 'Condo Dues',    actual: 12159, budget: 14891 },
  { name: 'Groceries',     actual: 10523, budget: 11774 },
  { name: 'Health Care',   actual: 7044,  budget: 8497 },
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
  { month: 'Nov', actual: 8371,  budget: 15417 },
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

// Weekly transactions for the week of Nov 10 – Nov 16, 2026 (Mon–Sun)
// Source: Quicken CSV export 2026-11-16 (+ Dermatology 11/10 from the 11/11 export,
// since the 11/16 export omits the Doctor subcategory)
// Vacation excluded from weekly view per household preference
export const WEEK_LABEL = 'Nov 10 – Nov 16, 2026'
export const weeklyCategories: WeeklyCategory[] = [
  { category: 'Amazon', section: 'discretionary', transactions: [
    { date: '11/10', description: 'Amazon.com', amount: 16.28 },
    { date: '11/13', description: 'Amazon.com', amount: 33.22 },
  ]},
  { category: 'Auto', section: 'discretionary', transactions: [
    { date: '11/15', description: 'Presidio Trust Parking', amount: 5.00 },
  ]},
  { category: 'Cash', section: 'discretionary', transactions: [
    { date: '11/10', description: 'ATM Withdrawal', amount: 20.00 },
    { date: '11/13', description: 'ATM Withdrawal', amount: 20.00 },
  ]},
  { category: 'Dining', section: 'discretionary', transactions: [
    { date: '11/10', description: 'A & M Liquor', amount: 6.70 },
    { date: '11/10', description: 'County Market', amount: 3.50 },
    { date: '11/10', description: 'Jane On Fillmore', amount: 20.37 },
    { date: '11/11', description: 'Smitten Ice Cream', amount: 12.71 },
    { date: '11/11', description: 'UN Market', amount: 4.12 },
    { date: '11/11', description: 'UN Market', amount: 4.94 },
    { date: '11/12', description: 'Bean Bags', amount: 32.89 },
    { date: '11/12', description: "Mel's Kitchen", amount: 37.56 },
    { date: '11/12', description: "Mel's Kitchen", amount: 48.24 },
    { date: '11/13', description: 'Bean Bags', amount: 32.89 },
    { date: '11/15', description: 'A & M Liquor', amount: 3.35 },
    { date: '11/15', description: 'Fresca Garden', amount: 31.93 },
    { date: '11/15', description: 'Friends Liquor 2', amount: 8.23 },
    { date: '11/15', description: 'Mayflower Market', amount: 5.28 },
    { date: '11/15', description: 'Presidio Liquors & Groce', amount: 2.55 },
    { date: '11/15', description: 'The Mess Hall', amount: 12.87 },
    { date: '11/15', description: 'United Liquor And Deli', amount: 2.22 },
    { date: '11/15', description: 'United Liquor And Deli', amount: 6.21 },
  ]},
  { category: 'Gifts Given', section: 'discretionary', transactions: [
    { date: '11/12', description: 'Fillmore Florist', amount: 258.42 },
  ]},
  { category: 'Groceries', section: 'fixed', transactions: [
    { date: '11/10', description: 'Costco', amount: 180.11 },
    { date: '11/12', description: 'Mollie Stone\'s', amount: 21.63 },
    { date: '11/15', description: 'Mollie Stone\'s', amount: 2.65 },
    { date: '11/15', description: 'Mollie Stone\'s', amount: 9.44 },
    { date: '11/15', description: 'Mollie Stone\'s', amount: 11.64 },
  ]},
  { category: 'Health Care', section: 'fixed', transactions: [
    { date: '11/10', description: 'Dermatology Medical Group', amount: 250.00 },
  ]},
  { category: 'Movies', section: 'discretionary', transactions: [
    { date: '11/10', description: 'Alamo Drafthouse Cinema', amount: -9.00 },
    { date: '11/10', description: 'SF76', amount: 14.00 },
    { date: '11/10', description: 'Vogue', amount: 5.00 },
    { date: '11/10', description: 'Vogue', amount: 11.00 },
    { date: '11/11', description: 'Vogue', amount: 5.00 },
    { date: '11/11', description: 'Vogue', amount: 7.00 },
    { date: '11/12', description: 'Alamo Drafthouse Cinema', amount: 48.17 },
    { date: '11/13', description: 'Presidio Theaters', amount: 13.00 },
    { date: '11/15', description: 'Alamo Drafthouse Cinema', amount: 20.68 },
    { date: '11/15', description: 'Kabuki', amount: 18.49 },
  ]},
  { category: 'Personal Care', section: 'discretionary', transactions: [
    { date: '11/13', description: 'Joinzoe.com', amount: 50.00 },
  ]},
  { category: 'Subscriptions', section: 'discretionary', transactions: [
    { date: '11/15', description: 'Audible.com', amount: 79.99 },
  ]},
  { category: 'Taxi & Transport', section: 'discretionary', transactions: [
    { date: '11/10', description: 'Lyft', amount: 12.72 },
    { date: '11/11', description: 'Lyft', amount: 14.58 },
    { date: '11/11', description: 'Lyft', amount: 15.32 },
    { date: '11/12', description: 'Lyft', amount: 21.35 },
    { date: '11/13', description: 'Lyft', amount: 13.99 },
    { date: '11/15', description: 'Lyft', amount: 20.61 },
    { date: '11/15', description: 'Lyft', amount: 25.56 },
    { date: '11/15', description: 'Lyft', amount: 27.52 },
  ]},
  // Monthly bills excluded: Mortgage, Condo Dues, Telephone, Home Insurance,
  // Property Tax, dental insurance (Blue Shield). These are fixed obligations
  // with no weekly discretion.
]

// Spending earlier in the same calendar month, BEFORE this week starts
// (here: Sat Nov 1 – Sun Nov 9). Added to the week's total to show the
// cumulative % of each category's monthly budget already spent.
// Same exclusions as the weekly view (Vacation, monthly bills, dental insurance).
// Update each week: sum of all prior weeks in the month; reset to {} when a
// new month starts on the week's Monday.
// Source: Quicken CSV export 2026-11-16
export const MONTH_LABEL = 'November'
export const monthPriorSpend: Record<string, number> = {
  'Amazon': 258.67,
  'Cash': 410.00,
  'Clothing': 1481.11,
  'Dining': 327.31,
  'Groceries': 238.97,
  'Health Care': 99.00,
  'Household': 145.48,
  'Movies': 253.97,
  'Personal Care': 271.94,
  'Subscriptions': 26.99,
  'Taxi & Transport': 126.42,
}

export function monthToDate(wc: WeeklyCategory): number {
  return (monthPriorSpend[wc.category] ?? 0) + sumTxns(wc)
}

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
