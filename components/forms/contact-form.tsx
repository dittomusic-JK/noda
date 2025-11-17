'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          message: formData.get('message'),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you! We\'ll be in touch soon.' })
        event.currentTarget.reset()
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[--foreground] mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-[--background-elevated] border border-[--border] text-[--foreground] placeholder-[--foreground-subtle] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[--foreground] mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-[--background-elevated] border border-[--border] text-[--foreground] placeholder-[--foreground-subtle] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
          placeholder="john.doe@agency.gov"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-[--foreground] mb-2">
          Agency / Organization
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-3 bg-[--background-elevated] border border-[--border] text-[--foreground] placeholder-[--foreground-subtle] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all"
          placeholder="Department of Transportation"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[--foreground] mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 bg-[--background-elevated] border border-[--border] text-[--foreground] placeholder-[--foreground-subtle] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent resize-none transition-all"
          placeholder="Tell us about your needs and how we can help..."
        />
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-[--color-gov-light] text-white'
              : 'bg-[--color-error] text-white'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-sm text-[--foreground-muted] text-center">
        We typically respond within 24 hours during business days.
      </p>
    </form>
  )
}
