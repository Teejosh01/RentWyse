import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ActionLink, Brand } from './ui'

const navigation = [
  { label: 'HOW RENTWYSE WORKS', href: '#how-rentwyse-works' },
  { label: 'RENT SAVINGS', href: '#rent-savings' },
  { label: 'TENANT SCORE', href: '#tenant-score' },
  { label: 'FOR LANDLORDS', href: '#for-landlords' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onResize = () => { if (window.innerWidth > 1100) setOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <a className="brand-link" href="#hero" aria-label="RentWyse" onClick={() => setOpen(false)}><Brand onDark /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <ActionLink href="#how-rentwyse-works" variant="lime" className="header-cta">Get Started</ActionLink>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Main navigation" hidden={!open}>
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <ActionLink href="#how-rentwyse-works" variant="lime" onClick={() => setOpen(false)}>Get Started</ActionLink>
      </nav>
    </header>
  )
}
