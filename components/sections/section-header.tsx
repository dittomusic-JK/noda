import { SectionHeaderProps } from '@/types/components'
import { cn } from '@/lib/utils/cn'

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <div className={cn('mb-12', alignmentClasses[align])}>
      {subtitle && (
        <p className="text-[--color-primary-light] font-semibold uppercase tracking-wide text-sm mb-3">
          {subtitle}
        </p>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--foreground]">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg text-[--foreground-muted] max-w-4xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
