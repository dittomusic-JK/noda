import Link from 'next/link'
import { CardProps } from '@/types/components'
import { cn } from '@/lib/utils/cn'

export function Card({ children, className, href }: CardProps) {
  const baseStyles = 'bg-slate-900 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-slate-800'
  
  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, 'block', className)}>
        {children}
      </Link>
    )
  }

  return (
    <div className={cn(baseStyles, className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pt-4 bg-slate-800/50', className)}>
      {children}
    </div>
  )
}
