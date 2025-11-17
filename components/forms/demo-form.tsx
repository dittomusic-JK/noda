'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function DemoForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    useCase: '',
    timeframe: '',
    teamSize: '',
    message: '',
  })

  // Pre-populate use case from URL parameter
  useEffect(() => {
    const useCaseParam = searchParams.get('useCase')
    if (useCaseParam) {
      setFormData(prev => ({
        ...prev,
        useCase: useCaseParam
      }))
    }
  }, [searchParams])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        useCase: '',
        timeframe: '',
        teamSize: '',
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to submit request. Please try again or email us directly at contact@nodaai.com')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (status === 'success') {
    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3">Demo Request Received</h3>
        <p className="text-slate-300 mb-6">
          Thank you for your interest in NODA AI. Our team will review your request and contact you within 24 hours to schedule your personalized demonstration.
        </p>
        <p className="text-sm text-slate-400">
          Check your email for confirmation details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Work Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="john.doe@defense.mil"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Organization & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organization" className="block text-sm font-semibold mb-2">
            Organization *
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Department / Branch / Command"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold mb-2">
            Your Role *
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select your role</option>
            <option value="program-manager">Program Manager</option>
            <option value="technical-lead">Technical Lead / Engineer</option>
            <option value="operator">Operator / End User</option>
            <option value="acquisition">Acquisition / Contracting</option>
            <option value="executive">Executive / Leadership</option>
            <option value="researcher">Researcher / Scientist</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Use Case & Timeframe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="useCase" className="block text-sm font-semibold mb-2">
            Primary Use Case *
          </label>
          <select
            id="useCase"
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select use case</option>
            <option value="multi-domain-swarm">Multi-Domain Swarm Coordination</option>
            <option value="contested-ops">Contested Environment Operations</option>
            <option value="effects-orchestration">Mission Effects Orchestration</option>
            <option value="algorithmic-warfare">Algorithmic Warfare Platform</option>
            <option value="other">Other / Multiple</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeframe" className="block text-sm font-semibold mb-2">
            Evaluation Timeframe
          </label>
          <select
            id="timeframe"
            name="timeframe"
            value={formData.timeframe}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select timeframe</option>
            <option value="immediate">Immediate (0-3 months)</option>
            <option value="near-term">Near-term (3-6 months)</option>
            <option value="mid-term">Mid-term (6-12 months)</option>
            <option value="long-term">Long-term (12+ months)</option>
            <option value="research">Research / Exploratory</option>
          </select>
        </div>
      </div>

      {/* Team Size */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-semibold mb-2">
          Expected Team Size for Demo
        </label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select team size</option>
          <option value="1">Just me</option>
          <option value="2-3">2-3 people</option>
          <option value="4-6">4-6 people</option>
          <option value="7-10">7-10 people</option>
          <option value="10+">10+ people</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Tell us about your operational requirements, specific challenges, or questions about the platform..."
        />
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? 'Submitting...' : 'Request Demo'}
      </Button>

      <p className="text-xs text-slate-400 text-center">
        By submitting this form, you agree to be contacted by NODA AI regarding your demo request. All communications are handled with strict confidentiality.
      </p>
    </form>
  )
}
