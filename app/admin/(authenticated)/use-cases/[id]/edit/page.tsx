'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import {
  FormField,
  TextInput,
  Textarea,
  StatusToggle,
  ImageInput,
  StringArrayInput,
  SubmitButton,
  LoadingSpinner,
} from '@/components/admin/form-components'

interface UseCaseForm {
  title: string
  slug: string
  challenge: string
  solution: string
  benefits: string[]
  seo_keywords: string[]
  meta_description: string
  hero_image: string
  cta_label: string
  published: boolean
  order: number
}

export default function EditUseCasePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [useCaseId, setUseCaseId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<UseCaseForm | null>(null)

  useEffect(() => {
    params.then(p => {
      setUseCaseId(p.id)
      fetchUseCase(p.id)
    })
  }, [])

  const fetchUseCase = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/use-cases/${id}`)
      if (!response.ok) throw new Error('Failed to fetch use case')
      
      const data = await response.json()
      
      setFormData({
        title: data.title,
        slug: data.slug,
        challenge: data.challenge,
        solution: data.solution,
        benefits: data.benefits || [],
        seo_keywords: data.seo_keywords || [],
        meta_description: data.meta_description,
        hero_image: data.hero_image,
        cta_label: data.cta_label || 'Book a Demo',
        published: data.published,
        order: data.order || 0,
      })
      setIsFetching(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/use-cases/${useCaseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update use case')
      }

      router.push('/admin/use-cases')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this use case? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/use-cases/${useCaseId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete use case')

      router.push('/admin/use-cases')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-4">Use case not found</p>
        <Link
          href="/admin/use-cases"
          className="px-6 py-3 bg-slate-700 text-slate-50 font-medium rounded-lg hover:bg-slate-600 transition-colors inline-block"
        >
          Back to Use Cases
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/use-cases"
          className="text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to Use Cases
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Use Case</h1>
        <p className="text-slate-400">Update AI solution use case</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          
          <FormField label="Title" required>
            <TextInput
              value={formData.title}
              onChange={(title) => setFormData(prev => prev ? { ...prev, title } : null)}
              required
            />
          </FormField>

          <FormField label="URL Slug" required>
            <TextInput
              value={formData.slug}
              onChange={(slug) => setFormData(prev => prev ? { ...prev, slug } : null)}
              required
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Display Order" description="Lower numbers appear first">
              <TextInput
                type="number"
                value={formData.order.toString()}
                onChange={(val) => setFormData(prev => prev ? { ...prev, order: parseInt(val) || 0 } : null)}
              />
            </FormField>

            <FormField label="CTA Button Label">
              <TextInput
                value={formData.cta_label}
                onChange={(cta_label) => setFormData(prev => prev ? { ...prev, cta_label } : null)}
              />
            </FormField>
          </div>

          <FormField label="Hero Image URL" required>
            <ImageInput
              value={formData.hero_image}
              onChange={(hero_image) => setFormData(prev => prev ? { ...prev, hero_image } : null)}
              required
            />
          </FormField>

        </div>

        {/* Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Content</h2>
          
          <FormField label="Challenge" required>
            <RichTextEditor
              content={formData.challenge}
              onChange={(challenge) => setFormData(prev => prev ? { ...prev, challenge } : null)}
            />
          </FormField>

          <FormField label="Solution" required>
            <RichTextEditor
              content={formData.solution}
              onChange={(solution) => setFormData(prev => prev ? { ...prev, solution } : null)}
            />
          </FormField>

          <FormField label="Key Benefits" required>
            <StringArrayInput
              value={formData.benefits}
              onChange={(benefits) => setFormData(prev => prev ? { ...prev, benefits } : null)}
              placeholder="Enter a benefit and press Enter"
            />
          </FormField>
        </div>

        {/* SEO */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">SEO Optimization</h2>

          <FormField label="Meta Description" required>
            <Textarea
              value={formData.meta_description}
              onChange={(meta_description) => setFormData(prev => prev ? { ...prev, meta_description } : null)}
              rows={2}
              required
            />
          </FormField>

          <FormField label="SEO Keywords">
            <StringArrayInput
              value={formData.seo_keywords}
              onChange={(seo_keywords) => setFormData(prev => prev ? { ...prev, seo_keywords } : null)}
              placeholder="Enter a keyword and press Enter"
            />
          </FormField>
        </div>

        {/* Publishing */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Publishing</h2>

          <FormField label="Status">
            <StatusToggle
              enabled={formData.published}
              onChange={(published) => setFormData(prev => prev ? { ...prev, published } : null)}
              enabledLabel="Published"
              disabledLabel="Draft"
            />
          </FormField>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SubmitButton isLoading={isLoading}>
              Update Use Case
            </SubmitButton>
            <Link
              href="/admin/use-cases"
              className="px-6 py-3 text-slate-300 hover:text-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
          
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-lg transition-colors"
          >
            Delete Use Case
          </button>
        </div>
      </form>
    </div>
  )
}
