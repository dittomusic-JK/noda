import { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

export interface CardProps {
  children: ReactNode
  className?: string
  href?: string
}

export interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  backgroundImage?: string
}

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
}

export interface NavLinkItem {
  label: string
  href: string
  children?: NavLinkItem[]
}

export interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
}

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string
  allowMultiple?: boolean
}
