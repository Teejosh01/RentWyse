import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg className={`brand-mark ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M6 18.5 20 6l14 12.5V34H23.5V24h-7v10H6V18.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m14 17 6 5 6-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Brand({ onDark = false, small = false }: { onDark?: boolean; small?: boolean }) {
  return (
    <span className={`brand${onDark ? ' brand--on-dark' : ''}${small ? ' brand--small' : ''}`}>
      <span className="brand-symbol"><BrandMark /></span>
      <span className="brand-word">RentWyse</span>
    </span>
  )
}

export function ActionLink({
  href,
  children,
  variant = 'dark',
  className = '',
  arrow = 'right',
  onClick,
}: {
  href: string
  children: ReactNode
  variant?: 'dark' | 'lime' | 'outline'
  className?: string
  arrow?: 'right' | 'up-right'
  onClick?: () => void
}) {
  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowRight
  return (
    <a href={href} className={`action action--${variant} ${className}`} onClick={onClick}>
      <span>{children}</span>
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
    </a>
  )
}

export function CheckList({ items, onDark = false, columns = false }: { items: readonly string[]; onDark?: boolean; columns?: boolean }) {
  return (
    <ul className={`check-list${onDark ? ' check-list--on-dark' : ''}${columns ? ' check-list--columns' : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <span className="check-icon" aria-hidden="true"><Check size={13} strokeWidth={2.4} /></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function SectionIntro({
  heading,
  description,
  id,
  centered = false,
  onDark = false,
  split = false,
}: {
  heading: ReactNode
  description: string
  id: string
  centered?: boolean
  onDark?: boolean
  split?: boolean
}) {
  return (
    <div className={`section-intro${centered ? ' section-intro--centered' : ''}${split ? ' section-intro--split' : ''}${onDark ? ' section-intro--on-dark' : ''}`}>
      <h2 id={id}>{heading}</h2>
      <p className="section-description">{description}</p>
    </div>
  )
}

export function FeatureDash() {
  return <span className="feature-dash" aria-hidden="true">—</span>
}
