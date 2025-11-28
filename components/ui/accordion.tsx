'use client'

import { useState } from 'react'
import { AccordionProps } from '@/types/components'
import { cn } from '@/lib/utils/cn'

export function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : []
  )

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(id) ? [] : [id]
      )
    }
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div
          key={item.id}
          className="border border-[--color-border] overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-4 text-left font-bold uppercase tracking-wide bg-white hover:bg-[--color-muted] transition-colors flex justify-between items-center"
            aria-expanded={openItems.includes(item.id)}
          >
            <span>{item.title}</span>
            <svg
              className={cn(
                'w-5 h-5 transition-transform',
                openItems.includes(item.id) && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openItems.includes(item.id) && (
            <div className="px-6 py-4 bg-[--color-muted]">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
