/*
 * Illustrative figures shown inside the product examples on the homepage.
 *
 * These are sample values only — not live data, offers, rates or guarantees.
 * Every visual reads from this file, so one tenant's story stays consistent
 * across the page: the same rent, savings, payment plan and Tenant Score
 * appear in each section. Change a figure here and every example follows.
 *
 * Dates deliberately carry no year so the examples do not go stale.
 */

const numberFormat = new Intl.NumberFormat('en-NG')

/** Formats a whole-naira amount, e.g. 1200000 -> "₦1,200,000". */
export const naira = (amount: number) => `₦${numberFormat.format(amount)}`

const annualRent = 1_200_000

export const tenant = {
  firstName: 'Amara',
  initial: 'A',
  home: 'Flat 1A',
}

export const savings = {
  goal: annualRent,
  saved: 780_000,
  // Most recent first.
  deposits: [
    { date: '1 Nov', amount: 65_000 },
    { date: '1 Oct', amount: 65_000 },
    { date: '1 Sep', amount: 65_000 },
  ],
}

export type InstalmentStatus = 'paid' | 'next' | 'upcoming'

export const plan: { total: number; instalments: { due: string; amount: number; status: InstalmentStatus }[] } = {
  total: annualRent,
  instalments: [
    { due: '15 May', amount: 300_000, status: 'paid' },
    { due: '15 Aug', amount: 300_000, status: 'paid' },
    { due: '15 Nov', amount: 300_000, status: 'next' },
    { due: '15 Feb', amount: 300_000, status: 'upcoming' },
  ],
}

export const score = {
  value: 82,
  outOf: 100,
  // The last 12 rent payments, oldest first. true = paid on time.
  history: [true, true, true, false, true, true, true, true, true, true, true, true],
}

/* Derived values, so related figures can never disagree with each other. */

export const savingsPercent = Math.round((savings.saved / savings.goal) * 100)
export const savingsRemaining = savings.goal - savings.saved

const paidInstalments = plan.instalments.filter((instalment) => instalment.status === 'paid')
export const planPaid = paidInstalments.reduce((sum, instalment) => sum + instalment.amount, 0)
export const planPaidCount = paidInstalments.length
export const planOutstanding = plan.total - planPaid
export const planPercent = Math.round((planPaid / plan.total) * 100)
export const nextInstalment = plan.instalments.find((instalment) => instalment.status === 'next') ?? plan.instalments[0]

const latestPaidInstalment = paidInstalments[paidInstalments.length - 1] ?? plan.instalments[0]

export const landlord = {
  // The first flat is the tenant above, so its figures come from her payment plan.
  units: [
    { unit: tenant.home, tenant: `${tenant.firstName} O.`, rent: plan.total, paid: planPaid, status: 'On plan' },
    { unit: 'Flat 2B', tenant: 'Tunde A.', rent: 1_500_000, paid: 1_500_000, status: 'Paid' },
    { unit: 'Flat 3C', tenant: 'Ibrahim S.', rent: 900_000, paid: 450_000, status: 'On plan' },
  ],
  latestPayment: { unit: tenant.home, amount: latestPaidInstalment.amount, date: latestPaidInstalment.due },
}

export const onTimePayments = score.history.filter(Boolean).length
export const scorePercent = Math.round((score.value / score.outOf) * 100)

export const landlordReceived = landlord.units.reduce((sum, unit) => sum + unit.paid, 0)
export const landlordOutstanding = landlord.units.reduce((sum, unit) => sum + unit.rent - unit.paid, 0)
