import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  House,
  PiggyBank,
  ShieldCheck,
  Target,
  Wallet,
} from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Brand, BrandMark } from './ui'

/*
 * These are static, conceptual illustrations—not product UI or working flows.
 * They deliberately contain no balances, scores, names, transactions or dates.
 * Adjacent approved copy explains the product; the illustrations are decorative.
 */

function Line({ width = '100%', tone = 'soft' }: { width?: string; tone?: 'soft' | 'green' | 'dark' }) {
  return <span className={`visual-line visual-line--${tone}`} style={{ width }} aria-hidden="true" />
}

function Bars({ count = 7, className = '' }: { count?: number; className?: string }) {
  const heights = [28, 42, 36, 56, 66, 80, 96, 74, 88]
  return (
    <div className={`visual-bars ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ height: `${heights[i % heights.length]}%` }} className={i === count - 1 ? 'is-lime' : ''} />
      ))}
    </div>
  )
}

function Ring({ children, className = '', progress = 72 }: { children: ReactNode; className?: string; progress?: number }) {
  return (
    <div className={`visual-ring ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="68" stroke="currentColor" className="ring-track" strokeWidth="9" />
        <circle cx="80" cy="80" r="68" stroke="currentColor" className="ring-progress" strokeWidth="9" strokeLinecap="round" pathLength="100" strokeDasharray={`${progress} 100`} transform="rotate(-90 80 80)" />
      </svg>
      <span className="visual-ring-center">{children}</span>
    </div>
  )
}

function CalendarBlocks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`calendar-blocks${compact ? ' calendar-blocks--compact' : ''}`} aria-hidden="true">
      {Array.from({ length: compact ? 12 : 21 }, (_, i) => (
        <span key={i} className={[2, 6, 9, 13, 17].includes(i) ? 'is-green' : [4, 11, 18].includes(i) ? 'is-lime' : ''}>
          {[6, 13].includes(i) && <Check size={compact ? 9 : 12} strokeWidth={2.5} />}
        </span>
      ))}
    </div>
  )
}

function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone-frame ${className}`} aria-hidden="true">
      <span className="phone-button phone-button--one" />
      <span className="phone-button phone-button--two" />
      <div className="phone-screen">
        <span className="phone-island" />
        {children}
      </div>
    </div>
  )
}

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

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-tableau">
        <span className="orbit orbit--outer" />
        <span className="orbit orbit--middle" />
        <span className="orbit orbit--inner" />
        <DotField className="hero-dots" />
        <span className="orbit-spark orbit-spark--one" />
        <span className="orbit-spark orbit-spark--two" />

        <div className="floating-card floating-card--savings">
          <div className="floating-card-top"><span className="mini-icon"><PiggyBank size={18} /></span><span className="mini-check"><Check size={12} strokeWidth={2.5} /></span></div>
          <Line width="58%" tone="dark" />
          <Bars count={7} className="floating-bars" />
        </div>

        <PhoneFrame className="hero-phone">
          <div className="phone-app-bar"><Brand small /><span className="app-avatar"><House size={13} /></span></div>
          <div className="phone-divider" />
          <Ring className="phone-ring"><span className="ring-house"><House size={35} strokeWidth={1.5} /></span></Ring>
          <div className="phone-lines"><Line width="64%" tone="dark" /><Line width="42%" /></div>
          <div className="phone-chart-card">
            <div className="phone-chart-top"><Wallet size={16} /><Line width="38%" /></div>
            <Bars count={8} />
          </div>
          <div className="phone-bottom-nav"><House size={18} /><ChartNoAxesCombined size={18} /><CalendarDays size={18} /><ShieldCheck size={18} /></div>
        </PhoneFrame>

        <div className="floating-card floating-card--plan">
          <div className="floating-card-top"><span className="mini-icon"><CalendarDays size={18} /></span><span className="mini-check"><Check size={12} strokeWidth={2.5} /></span></div>
          <Line width="72%" tone="dark" />
          <CalendarBlocks compact />
        </div>

        <div className="floating-card floating-card--score">
          <span className="score-mini-shield"><ShieldCheck size={31} strokeWidth={1.5} /></span>
          <div className="score-mini-lines"><Line width="86%" tone="green" /><Line width="62%" /></div>
        </div>
      </div>
    </div>
  )
}

export function SavingsVisual() {
  return (
    <div className="savings-art" aria-hidden="true">
      <span className="art-orbit art-orbit--one" />
      <span className="art-orbit art-orbit--two" />
      <DotField className="savings-dots" />
      <div className="savings-card">
        <div className="savings-card-top"><BrandMark /><Line width="34%" /></div>
        <Ring className="savings-ring" progress={64}><span className="ring-house"><PiggyBank size={40} strokeWidth={1.4} /></span></Ring>
        <div className="savings-card-lines"><Line width="58%" tone="dark" /><Line width="36%" /></div>
        <div className="savings-progress"><span /><span /><span /><span /><span /></div>
        <div className="savings-card-bottom"><Target size={18} /><Line width="46%" /><span className="mini-check"><Check size={12} /></span></div>
      </div>
      <div className="savings-token savings-token--one"><House size={25} strokeWidth={1.5} /></div>
      <div className="savings-token savings-token--two"><BrandMark /></div>
      <div className="savings-check"><Check size={25} strokeWidth={2} /></div>
      <Skyline className="savings-skyline" />
    </div>
  )
}

export function PaymentPlanVisual() {
  return (
    <div className="plan-stage" aria-hidden="true">
      <span className="plan-connector plan-connector--left"><ArrowRight size={18} /></span>
      <span className="plan-connector plan-connector--right"><ArrowRight size={18} /></span>
      <div className="plan-card plan-card--savings">
        <span className="plan-card-icon"><PiggyBank size={25} strokeWidth={1.5} /></span>
        <Ring className="plan-ring" progress={58}><House size={27} strokeWidth={1.5} /></Ring>
        <Line width="62%" tone="dark" /><Line width="40%" />
      </div>
      <div className="plan-card plan-card--calendar">
        <div className="plan-calendar-top"><CalendarDays size={24} strokeWidth={1.5} /><Line width="42%" /></div>
        <CalendarBlocks />
        <div className="plan-calendar-bottom"><Line width="48%" /><span className="mini-check"><Check size={12} /></span></div>
        <span className="plan-approval"><ShieldCheck size={23} strokeWidth={1.7} /></span>
      </div>
      <div className="plan-card plan-card--landlord">
        <span className="plan-card-icon"><Building2 size={25} strokeWidth={1.5} /></span>
        <div className="plan-ledger-mini"><span /><Line width="66%" /><Check size={15} /></div>
        <div className="plan-ledger-mini"><span /><Line width="48%" /><Check size={15} /></div>
        <div className="plan-ledger-mini"><span /><Line width="58%" /><Check size={15} /></div>
      </div>
    </div>
  )
}

export function TenantScoreVisual() {
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const angle = (i * 7.5 - 90) * (Math.PI / 180)
    const r1 = 151
    const r2 = i % 4 === 0 ? 166 : 161
    return { x1: 180 + r1 * Math.cos(angle), y1: 180 + r1 * Math.sin(angle), x2: 180 + r2 * Math.cos(angle), y2: 180 + r2 * Math.sin(angle), active: i < 35 }
  })
  return (
    <div className="score-art" aria-hidden="true">
      <span className="score-inset" />
      <svg className="score-ticks" viewBox="0 0 360 360" fill="none">
        {ticks.map((tick, i) => <line key={i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} stroke="currentColor" className={tick.active ? 'is-active' : ''} strokeWidth="3" strokeLinecap="round" />)}
      </svg>
      <span className="score-center"><ShieldCheck size={112} strokeWidth={1.15} /></span>
      <span className="score-float score-float--history"><ChartNoAxesCombined size={25} strokeWidth={1.5} /></span>
      <span className="score-float score-float--consistency"><CalendarDays size={25} strokeWidth={1.5} /></span>
      <span className="score-float score-float--trust"><Check size={25} strokeWidth={1.8} /></span>
      <DotField className="score-dots" />
    </div>
  )
}

export function LandlordVisual() {
  return (
    <div className="landlord-art" aria-hidden="true">
      <span className="art-orbit art-orbit--one" />
      <DotField className="landlord-dots" />
      <Skyline className="landlord-skyline" />
      <div className="ledger-card">
        <div className="ledger-top"><Brand small /><span className="ledger-top-icons"><Building2 size={17} /><span className="app-avatar"><House size={12} /></span></span></div>
        <div className="ledger-summary"><div><Line width="54%" /><Line width="78%" tone="green" /></div><Bars count={5} /></div>
        <div className="ledger-rows">
          {[72, 48, 86, 60].map((width, i) => (
            <div className="ledger-row" key={i}>
              <span className="ledger-house"><House size={17} strokeWidth={1.5} /></span>
              <div className="ledger-row-lines"><Line width={`${width}%`} tone="dark" /><Line width="42%" /></div>
              <span className="ledger-progress"><span style={{ width: `${width}%` } as CSSProperties} /></span>
              <span className="ledger-check"><Check size={12} strokeWidth={2.3} /></span>
            </div>
          ))}
        </div>
      </div>
      <div className="ledger-float"><span className="mini-icon"><CalendarDays size={22} strokeWidth={1.5} /></span><div><Line width="82%" tone="dark" /><Line width="56%" /></div><span className="mini-check"><Check size={12} /></span></div>
    </div>
  )
}
