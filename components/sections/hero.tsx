import Image from 'next/image'
import Link from 'next/link'
import { HeroProps } from '@/types/components'
import { cn } from '@/lib/utils/cn'

export function Hero({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary]/5 to-[--color-accent]/5 z-0" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <p className="text-[--color-primary-light] font-semibold uppercase tracking-wide text-sm mb-4">
              {subtitle}
            </p>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[--foreground]">
            {title}
          </h1>
          
          {description && (
            <p className="text-lg md:text-xl text-[--foreground-muted] mb-8">
              {description}
            </p>
          )}
          
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {ctaPrimary && (
                <Link
                  href={ctaPrimary.href}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark] text-white hover:shadow-lg hover:shadow-[--color-primary]/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                >
                  {ctaPrimary.label}
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-[--color-primary-light] text-[--color-primary-light] hover:bg-[--color-primary] hover:text-white hover:border-[--color-primary] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                >
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
