import {
  ArrowDownLeft,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  House,
  PiggyBank,
  ShieldCheck,
  Target,
} from 'lucide-react'
import type { ReactNode } from 'react'
import duskPhoto from '../assets/photos/homes-at-dusk.webp'
import landlordPhoto from '../assets/photos/landlord-at-property.webp'
import tenantPhoto from '../assets/photos/tenant-at-home.webp'
import {
  landlord,
  landlordOutstanding,
  landlordReceived,
  naira,
  nextInstalment,
  onTimePayments,
  plan,
  planOutstanding,
  planPaid,
  planPaidCount,
  planPercent,
  savings,
  savingsPercent,
  savingsRemaining,
  score,
  scorePercent,
  tenant,
  type InstalmentStatus,
} from '../sampleData'
import { Brand } from './ui'

/*
 * Homepage visuals: photographs, plus product examples that show sample
 * figures from src/sampleData.ts.
 *
 * Each product example is exposed to assistive technology as one image with a
 * plain-language summary that says it is an example. Its inner markup is
 * hidden, so the approved copy stays the only readable text in each section.
 */
function Example({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  return (
    <div className={className} role="img" aria-label={label}>
      <div className="example-content" aria-hidden="true">{children}</div>
    </div>
  )
}

function Meter({ percent, className = '' }: { percent: number; className?: string }) {
  return <span className={`meter ${className}`}><span style={{ width: `${percent}%` }} /></span>
}

function ProgressRing({ percent, children }: { percent: number; children: ReactNode }) {
  return (
    <span className="progress-ring">
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" className="ring-track" strokeWidth="5" />
        <circle cx="24" cy="24" r="20" stroke="currentColor" className="ring-progress" strokeWidth="5" strokeLinecap="round" pathLength="100" strokeDasharray={`${percent} 100`} transform="rotate(-90 24 24)" />
      </svg>
      <span className="progress-ring-center">{children}</span>
    </span>
  )
}

const statusLabel: Record<InstalmentStatus, string> = { paid: 'Paid', next: 'Due next', upcoming: 'Upcoming' }

export function Skyline({ className = '' }: { className?: string }) {
  return (
    <svg className={`skyline ${className}`} viewBox="0 0 1440 190" fill="none" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M0 174h72v-54h48v54h34V92l38-30 38 30v82h30v-42h54v42h42V70h64v104h34v-28h62v28h80M844 174h66v-48h54v48h34V80l40-32 40 32v94h36v-58h58v58h34V54h70v120h38v-36h56v36h70" />
        <path d="M154 108h76M170 92v82M192 78v96M214 92v82M356 86h64M356 106h64M356 126h64M356 146h64M374 70v104M402 70v104M998 96h80M1016 80v94M1038 64v110M1060 80v94M1206 72h70M1206 94h70M1206 116h70M1206 138h70M1228 54v120M1252 54v120" />
        <path d="M88 174v-28m-14 0a14 14 0 1 1 28 0Zm1160 28v-30m-15 0a15 15 0 1 1 30 0ZM470 174v-24m-12 0a12 12 0 1 1 24 0Z" />
      </g>
    </svg>
  )
}

function DotField({ className = '' }: { className?: string }) {
  return (
    <svg className={`dot-field ${className}`} viewBox="0 0 84 84" fill="currentColor" aria-hidden="true">
      {Array.from({ length: 49 }, (_, i) => <circle key={i} cx={(i % 7) * 12 + 2} cy={Math.floor(i / 7) * 12 + 2} r="1.15" />)}
    </svg>
  )
}

/* Hero: a tenant at home, with her rent picture layered over the photograph. */
export function HeroVisual() {
  return (
    <div className="hero-visual">
      <span className="orbit orbit--outer" aria-hidden="true" />
      <span className="orbit orbit--middle" aria-hidden="true" />
      <DotField className="hero-dots" />
      <div className="hero-photo">
        <img src={tenantPhoto} alt="A tenant smiling as she checks her phone at home." width={928} height={1152} fetchPriority="high" decoding="async" />
      </div>
      <Example
        className="hero-cards"
        label={`Example figures: ${naira(savings.saved)} saved towards a ${naira(savings.goal)} rent goal, a next payment of ${naira(nextInstalment.amount)} due ${nextInstalment.due}, and a Tenant Score of ${score.value} out of ${score.outOf}.`}
      >
        <div className="data-card hero-card hero-card--savings" data-card>
          <div className="data-card-head">
            <span className="mini-icon"><PiggyBank size={16} strokeWidth={1.7} /></span>
            <span className="data-label">Rent savings</span>
            <span className="data-badge">{savingsPercent}%</span>
          </div>
          <p className="data-value">{naira(savings.saved)}</p>
          <Meter percent={savingsPercent} />
          <p className="data-note">of {naira(savings.goal)} goal</p>
        </div>

        <div className="data-card hero-card hero-card--payment" data-card>
          <span className="mini-icon"><CalendarDays size={16} strokeWidth={1.7} /></span>
          <div>
            <span className="data-label">Next payment</span>
            <p className="data-value data-value--small">{naira(nextInstalment.amount)}</p>
            <p className="data-note">Due {nextInstalment.due}</p>
          </div>
        </div>

        <div className="data-card hero-card hero-card--score" data-card>
          <ProgressRing percent={scorePercent}><ShieldCheck size={19} strokeWidth={1.7} /></ProgressRing>
          <div>
            <span className="data-label">Tenant Score</span>
            <p className="data-value data-value--small">{score.value}<span className="data-unit"> / {score.outOf}</span></p>
            <p className="data-note">{onTimePayments} of {score.history.length} payments on time</p>
          </div>
        </div>
      </Example>
    </div>
  )
}

/* Rent Savings: the savings screen, with the goal and latest deposit called out. */
export function SavingsVisual() {
  const latestDeposit = savings.deposits[0]
  return (
    <Example
      className="savings-art"
      label={`Example RentWyse savings screen: ${naira(savings.saved)} saved of a ${naira(savings.goal)} rent goal, ${savingsPercent}% complete, with recent deposits of ${naira(latestDeposit.amount)}.`}
    >
      <span className="art-orbit art-orbit--one" />
      <span className="art-orbit art-orbit--two" />
      <DotField className="savings-dots" />

      <div className="phone-frame savings-phone">
        <span className="phone-button phone-button--one" />
        <span className="phone-button phone-button--two" />
        <div className="phone-screen">
          <span className="phone-island" />
          <div className="phone-app-bar"><Brand small /><span className="app-avatar">{tenant.initial}</span></div>
          <div className="screen-summary">
            <span className="data-label">Rent savings</span>
            <p className="screen-value">{naira(savings.saved)}</p>
            <p className="data-note">saved of {naira(savings.goal)} goal</p>
            <Meter percent={savingsPercent} className="meter--large" />
            <div className="meter-legend"><span>{savingsPercent}% saved</span><span>{naira(savingsRemaining)} to go</span></div>
          </div>
          <p className="screen-heading">Recent deposits</p>
          <div className="screen-list">
            {savings.deposits.map((deposit) => (
              <div className="screen-row" key={deposit.date}>
                <span className="row-icon"><ArrowDownLeft size={15} strokeWidth={2} /></span>
                <span className="row-main"><b>Deposit</b><small>{deposit.date}</small></span>
                <span className="row-amount">+{naira(deposit.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="data-card savings-chip savings-chip--goal" data-card>
        <span className="mini-icon"><Target size={16} strokeWidth={1.7} /></span>
        <div>
          <span className="data-label">Rent goal</span>
          <p className="data-value data-value--small">{naira(savings.goal)}</p>
        </div>
      </div>
      <div className="data-card savings-chip savings-chip--deposit" data-card>
        <span className="mini-check"><Check size={14} strokeWidth={2.4} /></span>
        <div>
          <span className="data-label">Deposit added</span>
          <p className="data-value data-value--small">+{naira(latestDeposit.amount)}</p>
        </div>
      </div>
    </Example>
  )
}

/* Flexible Rent Payments: one rent, split into an agreed schedule, tracked to a balance. */
export function PaymentPlanVisual() {
  const count = plan.instalments.length
  return (
    <Example
      className="plan-stage"
      label={`Example payment plan: annual rent of ${naira(plan.total)} split into ${count} instalments of ${naira(plan.instalments[0].amount)}, approved by the landlord. ${planPaidCount} instalments paid, ${naira(planOutstanding)} outstanding, next payment due ${nextInstalment.due}.`}
    >
      <span className="plan-connector plan-connector--left"><ArrowRight size={18} /></span>
      <span className="plan-connector plan-connector--right"><ArrowRight size={18} /></span>

      <div className="plan-card plan-card--rent" data-card>
        <span className="plan-card-icon"><House size={21} strokeWidth={1.6} /></span>
        <span className="data-label">Annual rent</span>
        <p className="data-value">{naira(plan.total)}</p>
        <div className="plan-split">
          {plan.instalments.map((instalment) => <span key={instalment.due} className={`is-${instalment.status}`} />)}
        </div>
        <p className="data-note">Split into {count} instalments</p>
      </div>

      <div className="plan-card plan-card--schedule" data-card>
        <div className="plan-schedule-top">
          <span className="plan-title"><CalendarDays size={17} strokeWidth={1.7} />Payment plan</span>
          <span className="plan-approved"><ShieldCheck size={13} strokeWidth={2} />Approved by landlord</span>
        </div>
        <div className="plan-rows">
          {plan.instalments.map((instalment) => (
            <div className="plan-row" key={instalment.due}>
              <span className="plan-date">{instalment.due}</span>
              <span className="plan-amount">{naira(instalment.amount)}</span>
              <span className={`status status--${instalment.status}`}>
                {instalment.status === 'paid' && <Check size={11} strokeWidth={2.6} />}
                {statusLabel[instalment.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="plan-card plan-card--balance" data-card>
        <span className="plan-card-icon"><ChartNoAxesCombined size={21} strokeWidth={1.6} /></span>
        <span className="data-label">Outstanding balance</span>
        <p className="data-value">{naira(planOutstanding)}</p>
        <Meter percent={planPercent} />
        <p className="data-note">{naira(planPaid)} paid · {planPaidCount} of {count}</p>
      </div>
    </Example>
  )
}

/* Tenant Score: the score out of 100, with the payment record behind it. */
export function TenantScoreVisual() {
  const tickCount = 48
  const activeTicks = Math.round((tickCount * score.value) / score.outOf)
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angle = (i * (360 / tickCount) - 90) * (Math.PI / 180)
    const r1 = 151
    const r2 = i % 4 === 0 ? 166 : 161
    return { x1: 180 + r1 * Math.cos(angle), y1: 180 + r1 * Math.sin(angle), x2: 180 + r2 * Math.cos(angle), y2: 180 + r2 * Math.sin(angle), active: i < activeTicks }
  })
  return (
    <Example
      className="score-art"
      label={`Example Tenant Score of ${score.value} out of ${score.outOf}, with ${onTimePayments} of the last ${score.history.length} rent payments made on time.`}
    >
      <DotField className="score-dots" />
      <div className="score-gauge">
        <span className="score-inset" />
        <svg className="score-ticks" viewBox="0 0 360 360" fill="none">
          {ticks.map((tick, i) => <line key={i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke="currentColor" className={tick.active ? 'is-active' : ''} strokeWidth="3" strokeLinecap="round" />)}
        </svg>
        <div className="score-center">
          <ShieldCheck className="score-shield" size={22} strokeWidth={1.6} />
          <span className="score-number">{score.value}</span>
          <span className="score-outof">out of {score.outOf}</span>
        </div>
      </div>

      <div className="score-chip score-chip--ontime" data-card>
        <span className="mini-icon"><CalendarCheck size={16} strokeWidth={1.7} /></span>
        <div>
          <span className="data-label">On-time payments</span>
          <p className="data-value data-value--small">{onTimePayments} of {score.history.length}</p>
        </div>
      </div>
      <div className="score-chip score-chip--history" data-card>
        <span className="data-label">Last {score.history.length} payments</span>
        <div className="history-dots">
          {score.history.map((onTime, i) => <span key={i} className={onTime ? '' : 'is-late'} />)}
        </div>
      </div>
    </Example>
  )
}

/* For Landlords: a landlord at his property, with the rent overview alongside. */
export function LandlordVisual() {
  const { latestPayment } = landlord
  return (
    <div className="landlord-art">
      <div className="landlord-photo">
        <img src={landlordPhoto} alt="A landlord holding a tablet in the courtyard of his rental property." width={1200} height={896} loading="lazy" decoding="async" />
      </div>
      <Example
        className="landlord-cards"
        label={`Example landlord view: ${naira(landlordReceived)} received and ${naira(landlordOutstanding)} outstanding across ${landlord.units.length} flats, with a payment of ${naira(latestPayment.amount)} received for ${latestPayment.unit}.`}
      >
        <div className="data-card ledger-toast" data-card>
          <span className="mini-check"><Check size={14} strokeWidth={2.4} /></span>
          <div>
            <span className="data-label">Payment received</span>
            <p className="data-value data-value--small">{naira(latestPayment.amount)}</p>
            <p className="data-note">{latestPayment.unit} · {latestPayment.date}</p>
          </div>
        </div>

        <div className="data-card ledger-card" data-card>
          <div className="ledger-top"><Brand small /><span className="data-label">Rent overview</span></div>
          <div className="ledger-summary">
            <div><span className="data-label">Received</span><p className="data-value data-value--small">{naira(landlordReceived)}</p></div>
            <div><span className="data-label">Outstanding</span><p className="data-value data-value--small">{naira(landlordOutstanding)}</p></div>
          </div>
          <div className="ledger-rows">
            {landlord.units.map((unit) => (
              <div className="ledger-row" key={unit.unit}>
                <span className="ledger-house"><House size={15} strokeWidth={1.6} /></span>
                <span className="ledger-who"><b>{unit.unit}</b><small>{unit.tenant}</small></span>
                <span className="ledger-paid"><b>{naira(unit.paid)}</b><small>of {naira(unit.rent)}</small></span>
                <span className={`status ${unit.paid >= unit.rent ? 'status--settled' : 'status--on-plan'}`}>{unit.status}</span>
              </div>
            ))}
          </div>
        </div>
      </Example>
    </div>
  )
}

/* Final invitation: homes at dusk, tinted evergreen so the copy stays legible. */
export function FinalBackdrop() {
  return (
    <>
      <img className="final-photo" src={duskPhoto} alt="" width={1376} height={768} loading="lazy" decoding="async" />
      <span className="final-shade" aria-hidden="true" />
    </>
  )
}
