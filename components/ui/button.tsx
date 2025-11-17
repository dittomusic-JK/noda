'use client'

import { ButtonProps } from '@/types/components'
import { cn } from '@/lib/utils/cn'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark] text-white hover:shadow-lg hover:shadow-[--color-primary]/50 focus:ring-[--color-primary]',
    secondary: 'bg-gradient-to-r from-[--color-accent] to-[--color-accent-dark] text-white hover:shadow-lg hover:shadow-[--color-accent]/50 focus:ring-[--color-accent]',
    outline: 'border-2 border-[--color-primary-light] text-[--color-primary-light] hover:bg-[--color-primary] hover:text-white hover:border-[--color-primary] focus:ring-[--color-primary]',
    ghost: 'bg-transparent text-[--foreground-muted] hover:bg-[--background-muted] hover:text-[--color-primary-light] focus:ring-[--color-primary]',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
