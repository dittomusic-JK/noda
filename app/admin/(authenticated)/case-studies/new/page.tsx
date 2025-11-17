'use client'

import { useState } from 'react'
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

export default function NewCaseStudyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<CaseStudyForm>({
    slug: '',
    title: '',
    client: '',
    industry: '',
    excerpt: '',
    challenge: '',
    solution: '',
    results: '',
    hero_image: '',
    logo_image: '',
    tags: [],
    metrics: {},
    meta_description: '',
    published: false,
    featured: false,
  })

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create case study')
      }

      router.push('/admin/case-studies')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New Case Study</h1>
        <p className="text-slate-400">Create a new customer success story</p>
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
              onChange={handleTitleChange}
              placeholder="AI-Powered Intelligence Platform Transforms Defense Operations"
              required
            />
          </FormField>

          <FormField label="URL Slug" required helpText="Auto-generated from title, but can be customized">
            <TextInput
              value={formData.slug}
              onChange={(slug) => setFormData(prev => ({ ...prev, slug }))}
              placeholder="defense-operations-transformation"
              required
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Client Name" required>
              <TextInput
                value={formData.client}
                onChange={(client) => setFormData(prev => ({ ...prev, client }))}
                placeholder="U.S. Department of Defense"
                required
              />
            </FormField>

            <FormField label="Industry" required>
              <Select
                value={formData.industry}
                onChange={(industry) => setFormData(prev => ({ ...prev, industry }))}
                options={[
                  { value: 'Defense', label: 'Defense' },
                  { value: 'Government', label: 'Government' },
                  { value: 'Intelligence', label: 'Intelligence' },
                  { value: 'Law Enforcement', label: 'Law Enforcement' },
                  { value: 'Public Safety', label: 'Public Safety' },
                  { value: 'Healthcare', label: 'Healthcare' },
                  { value: 'Other', label: 'Other' },
                ]}
                placeholder="Select industry"
                required
              />
            </FormField>
          </div>

          <FormField label="Short Excerpt" required helpText="Brief summary (150-200 characters)">
            <Textarea
              value={formData.excerpt}
              onChange={(excerpt) => setFormData(prev => ({ ...prev, excerpt }))}
              placeholder="A brief overview of the case study..."
              rows={3}
              maxLength={200}
              required
            />
          </FormField>

          <FormField label="Tags" helpText="Press Enter to add tags">
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
              placeholder="Add tag and press Enter"
            />
          </FormField>
        </div>

        {/* Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Content</h2>

          <FormField label="Challenge" required helpText="Describe the problem the client faced">
            <RichTextEditor
              content={formData.challenge}
              onChange={(challenge) => setFormData(prev => ({ ...prev, challenge }))}
              placeholder="What challenges was the client facing?"
            />
          </FormField>

          <FormField label="Solution" required helpText="Explain how NODA AI solved the problem">
            <RichTextEditor
              content={formData.solution}
              onChange={(solution) => setFormData(prev => ({ ...prev, solution }))}
              placeholder="How did NODA AI address these challenges?"
            />
          </FormField>

          <FormField label="Results" required helpText="Highlight the outcomes and impact">
            <RichTextEditor
              content={formData.results}
              onChange={(results) => setFormData(prev => ({ ...prev, results }))}
              placeholder="What were the results and measurable outcomes?"
            />
          </FormField>
        </div>

        {/* Images */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Images</h2>

          <FormField label="Hero Image" required helpText="Main header image (1200x600px recommended)">
            <ImageInput
              value={formData.hero_image}
              onChange={(hero_image) => setFormData(prev => ({ ...prev, hero_image }))}
              label="Hero Image"
              previewClassName="w-full max-w-2xl"
            />
          </FormField>

          <FormField label="Client Logo" helpText="Optional company logo (400x200px recommended)">
            <ImageInput
              value={formData.logo_image}
              onChange={(logo_image) => setFormData(prev => ({ ...prev, logo_image }))}
              label="Client Logo"
              previewClassName="max-w-sm bg-white p-4"
            />
          </FormField>
        </div>

        {/* SEO */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">SEO & Metadata</h2>

          <FormField
            label="Meta Description"
            required
            helpText="SEO description (150-160 characters)"
          >
            <Textarea
              value={formData.meta_description}
              onChange={(meta_description) => setFormData(prev => ({ ...prev, meta_description }))}
              placeholder="Brief description for search engines..."
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
              onChange={(published) => setFormData(prev => ({ ...prev, published }))}
              label="Published"
            />
            <StatusToggle
              checked={formData.featured}
              onChange={(featured) => setFormData(prev => ({ ...prev, featured }))}
              label="Featured"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <SubmitButton isLoading={isLoading}>
            Create Case Study
          </SubmitButton>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-slate-700 text-slate-50 font-medium rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
