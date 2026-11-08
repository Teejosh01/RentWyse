import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  ChartNoAxesCombined,
  Info,
  PiggyBank,
  ShieldCheck,
  Target,
  Wallet,
} from 'lucide-react'
import { content, splitFeature } from '../content'
import { ActionLink, Brand, BrandMark, CheckList, Eyebrow, FeatureDash, SectionIntro } from './ui'
import { HeroVisual, LandlordVisual, PaymentPlanVisual, SavingsVisual, Skyline, TenantScoreVisual } from './ConceptualVisuals'

const [hero, how, savings, payments, score, landlords, why, final] = content

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-emblem" aria-hidden="true"><BrandMark /><span /></span>
          <h1 id="hero-heading"><span>Save Rent Smart.</span>{' '}<span className="hero-heading-accent">Pay Rent Easy.</span></h1>
          <p className="hero-description">{hero.description}</p>
          <ActionLink href="#how-rentwyse-works" variant="lime" arrow="up-right" className="hero-cta">{hero.ctas[0]}</ActionLink>
          <div className="hero-journey" aria-hidden="true"><span><PiggyBank size={19} /></span><i /><span><CalendarDays size={19} /></span><i /><span><ShieldCheck size={19} /></span></div>
        </div>
        <HeroVisual />
      </div>
      <Skyline className="hero-skyline" />
      <a className="hero-scroll" href="#how-rentwyse-works" aria-label="How RentWyse works"><ArrowDown size={18} aria-hidden="true" /></a>
    </section>
  )
}

const stepIcons = [Target, PiggyBank, CalendarDays, Wallet]
const stepIds = ['set-your-rent-goal', 'save-at-your-pace', 'choose-a-payment-plan', 'pay-and-stay-on-track']

export function HowItWorks() {
  return (
    <section id={how.id} className="section how-section" aria-labelledby="how-heading">
      <div className="container">
        <SectionIntro id="how-heading" label={how.label} heading={how.heading} description={how.description} split />
        <ol className="steps">
          {how.bullets.map((bullet, index) => {
            const feature = splitFeature(bullet)
            const Icon = stepIcons[index]
            return (
              <li className="step" id={stepIds[index]} key={bullet}>
                <div className="step-marker"><span className="step-number">{feature.number}.</span><span className="step-icon"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span></div>
                <h3>{feature.title}</h3>
                <FeatureDash />
                <p>{feature.detail}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export function RentSavings() {
  return (
    <section id={savings.id} className="section savings-section" aria-labelledby="savings-heading">
      <div className="container savings-shell">
        <div className="feature-copy savings-copy">
          <Eyebrow>{savings.label}</Eyebrow>
          <h2 id="savings-heading">{savings.heading}</h2>
          <p className="section-description">{savings.description}</p>
          <CheckList items={savings.bullets} />
          <ActionLink href="#set-your-rent-goal">{savings.ctas[0]}</ActionLink>
        </div>
        <SavingsVisual />
      </div>
    </section>
  )
}

const paymentIcons = [Wallet, CalendarDays, PiggyBank, ChartNoAxesCombined]

export function FlexiblePayments() {
  return (
    <section id={payments.id} className="section payments-section" aria-labelledby="payments-heading">
      <div className="container">
        <SectionIntro id="payments-heading" label={payments.label} heading={payments.heading} description={payments.description} centered />
        <PaymentPlanVisual />
        <ul className="payment-points">
          {payments.bullets.map((bullet, index) => {
            const Icon = paymentIcons[index]
            return <li key={bullet}><Icon size={21} strokeWidth={1.6} aria-hidden="true" /><span>{bullet}</span></li>
          })}
        </ul>
        <div className="payment-footer">
          <p className="payment-note"><Info size={16} strokeWidth={1.7} aria-hidden="true" /><span>{payments.note}</span></p>
          <ActionLink href="#choose-a-payment-plan">{payments.ctas[0]}</ActionLink>
        </div>
      </div>
    </section>
  )
}

export function TenantScore() {
  return (
    <section id={score.id} className="section tenant-section" aria-labelledby="score-heading">
      <div className="container tenant-panel">
        <TenantScoreVisual />
        <div className="feature-copy tenant-copy">
          <Eyebrow onDark>{score.label}</Eyebrow>
          <h2 id="score-heading">Build a rental record that <span>speaks for you.</span></h2>
          <p className="section-description">{score.description}</p>
          <CheckList items={score.bullets} onDark />
          <ActionLink href="#pay-and-stay-on-track" variant="lime">{score.ctas[0]}</ActionLink>
        </div>
      </div>
    </section>
  )
}

export function ForLandlords() {
  return (
    <section id={landlords.id} className="section landlords-section" aria-labelledby="landlords-heading">
      <div className="container landlords-grid">
        <div className="feature-copy">
          <Eyebrow>{landlords.label}</Eyebrow>
          <h2 id="landlords-heading">{landlords.heading}</h2>
          <p className="section-description">{landlords.description}</p>
          <CheckList items={landlords.bullets} />
          <ActionLink href="#how-rentwyse-works">{landlords.ctas[0]}</ActionLink>
        </div>
        <LandlordVisual />
      </div>
    </section>
  )
}

const benefitIcons = [PiggyBank, CalendarDays, ChartNoAxesCombined, ShieldCheck]

export function WhyRentWyse() {
  return (
    <section id={why.id} className="section why-section" aria-labelledby="why-heading">
      <div className="container">
        <SectionIntro id="why-heading" label={why.label} heading={why.heading} description={why.description} centered />
        <div className="benefits-grid">
          {why.bullets.map((bullet, index) => {
            const feature = splitFeature(bullet)
            const Icon = benefitIcons[index]
            return (
              <article className="benefit-card" key={bullet}>
                <span className="benefit-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span>
                <div><h3>{feature.title}</h3><FeatureDash /><p>{feature.detail}</p></div>
                <span className="benefit-corner" aria-hidden="true"><BrandMark /></span>
              </article>
            )
          })}
        </div>
        <div className="center-action"><ActionLink href="#how-rentwyse-works">{why.ctas[0]}</ActionLink></div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section id={final.id} className="section final-section" aria-labelledby="final-heading">
      <div className="container final-panel">
        <span className="final-orbit final-orbit--left" aria-hidden="true" />
        <span className="final-orbit final-orbit--right" aria-hidden="true" />
        <span className="final-mark" aria-hidden="true"><BrandMark /></span>
        <h2 id="final-heading">Your next rent starts with <span>RentWyse.</span></h2>
        <p>{final.description}</p>
        <div className="final-actions">
          <ActionLink href="#how-rentwyse-works" variant="lime">{final.ctas[0]}</ActionLink>
          <ActionLink href="#why-rentwyse" variant="outline">{final.ctas[1]}</ActionLink>
        </div>
        <Skyline className="final-skyline" />
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand-link" href="#hero" aria-label="RentWyse"><Brand /></a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#how-rentwyse-works">HOW RENTWYSE WORKS</a>
          <a href="#rent-savings">RENT SAVINGS</a>
          <a href="#for-landlords">FOR LANDLORDS</a>
        </nav>
        <a className="footer-top" href="#hero" aria-label="RentWyse"><ArrowRight size={19} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}

