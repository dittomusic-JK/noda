'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import {
  FormField,
  TextInput,
  Textarea,
  TagInput,
  StatusToggle,
  ImageInput,
  Select,
  SubmitButton,
  LoadingSpinner,
} from '@/components/admin/form-components'

interface CaseStudyForm {
  slug: string
  title: string
  client: string
  industry: string
  excerpt: string
  challenge: string
  solution: string
  results: string
  hero_image: string
  logo_image: string
  tags: string[]
  metrics: Record<string, string>
  meta_description: string
  published: boolean
  featured: boolean
}

export default function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<CaseStudyForm | null>(null)

  useEffect(() => {
    fetchCaseStudy()
  }, [params.id])

  const fetchCaseStudy = async () => {
    try {
      const response = await fetch(`/api/admin/case-studies/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch case study')
      
      const data = await response.json()
      setFormData({
        slug: data.slug,
        title: data.title,
        client: data.client,
        industry: data.industry,
        excerpt: data.excerpt,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        hero_image: data.hero_image || '',
        logo_image: data.logo_image || '',
        tags: data.tags || [],
        metrics: data.metrics || {},
        meta_description: data.meta_description || '',
        published: data.published,
        featured: data.featured,
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
      const response = await fetch(`/api/admin/case-studies/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update case study')
      }

      router.push('/admin/case-studies')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/case-studies/${params.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete case study')

      router.push('/admin/case-studies')
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
        <p className="text-slate-400 mb-4">Case study not found</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-slate-700 text-slate-50 font-medium rounded-lg hover:bg-slate-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Case Study</h1>
        <p className="text-slate-400">Update customer success story</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Basic Information</h2>

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
            <FormField label="Client Name" required>
              <TextInput
                value={formData.client}
                onChange={(client) => setFormData(prev => prev ? { ...prev, client } : null)}
                required
              />
            </FormField>

            <FormField label="Industry" required>
              <Select
                value={formData.industry}
                onChange={(industry) => setFormData(prev => prev ? { ...prev, industry } : null)}
                options={[
                  { value: 'Defense', label: 'Defense' },
                  { value: 'Government', label: 'Government' },
                  { value: 'Intelligence', label: 'Intelligence' },
                  { value: 'Law Enforcement', label: 'Law Enforcement' },
                  { value: 'Public Safety', label: 'Public Safety' },
                  { value: 'Healthcare', label: 'Healthcare' },
                  { value: 'Other', label: 'Other' },
                ]}
                required
              />
            </FormField>
          </div>

          <FormField label="Short Excerpt" required>
            <Textarea
              value={formData.excerpt}
              onChange={(excerpt) => setFormData(prev => prev ? { ...prev, excerpt } : null)}
              rows={3}
              maxLength={200}
              required
            />
          </FormField>

          <FormField label="Tags">
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData(prev => prev ? { ...prev, tags } : null)}
            />
          </FormField>
        </div>

        {/* Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Content</h2>

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

          <FormField label="Results" required>
            <RichTextEditor
              content={formData.results}
              onChange={(results) => setFormData(prev => prev ? { ...prev, results } : null)}
            />
          </FormField>
        </div>

        {/* Images */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Images</h2>

          <FormField label="Hero Image" required>
            <ImageInput
              value={formData.hero_image}
              onChange={(hero_image) => setFormData(prev => prev ? { ...prev, hero_image } : null)}
              label="Hero Image"
              previewClassName="w-full max-w-2xl"
            />
          </FormField>

          <FormField label="Client Logo">
            <ImageInput
              value={formData.logo_image}
              onChange={(logo_image) => setFormData(prev => prev ? { ...prev, logo_image } : null)}
              label="Client Logo"
              previewClassName="max-w-sm bg-white p-4"
            />
          </FormField>
        </div>

        {/* SEO */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">SEO & Metadata</h2>

          <FormField label="Meta Description" required>
            <Textarea
              value={formData.meta_description}
              onChange={(meta_description) => setFormData(prev => prev ? { ...prev, meta_description } : null)}
              rows={3}
              maxLength={160}
              required
            />
          </FormField>
        </div>

        {/* Publishing */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Publishing Options</h2>

          <div className="flex gap-8">
            <StatusToggle
              checked={formData.published}
              onChange={(published) => setFormData(prev => prev ? { ...prev, published } : null)}
              label="Published"
            />
            <StatusToggle
              checked={formData.featured}
              onChange={(featured) => setFormData(prev => prev ? { ...prev, featured } : null)}
              label="Featured"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <SubmitButton isLoading={isLoading}>
              Save Changes
            </SubmitButton>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-slate-700 text-slate-50 font-medium rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 font-medium rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            Delete Case Study
          </button>
        </div>
      </form>
    </div>
  )
}
