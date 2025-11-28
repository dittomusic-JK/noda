import { BadgeProps } from '@/types/components'
import { cn } from '@/lib/utils/cn'

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps & { className?: string }) {
  const baseStyles = 'inline-flex items-center font-bold uppercase tracking-wider'
  
  const variants = {
    default: 'bg-slate-800 text-slate-300',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
