'use client'

import { useState } from 'react'
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
  LoadingSpinner,
  SubmitButton 
} from '@/components/admin/form-components'

export default function NewUseCasePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    challenge: '',
    solution: '',
    benefits: [] as string[],
    seo_keywords: [] as string[],
    meta_description: '',
    hero_image: '',
    cta_label: 'Book a Demo',
    pdf_download_url: '',
    published: false,
    order: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/use-cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create use case')
      }

      const data = await response.json()
      router.push('/admin/use-cases')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }))
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
        <h1 className="text-3xl font-bold mb-2">Create New Use Case</h1>
        <p className="text-slate-400">Add a new AI solution use case</p>
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
              onChange={handleTitleChange}
              placeholder="Enter use case title"
              required
            />
          </FormField>

          <FormField label="URL Slug" required>
            <TextInput
              value={formData.slug}
              onChange={(slug) => setFormData(prev => ({ ...prev, slug }))}
              placeholder="use-case-url-slug"
              required
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Display Order" description="Lower numbers appear first">
              <TextInput
                type="number"
                value={formData.order.toString()}
                onChange={(val) => setFormData(prev => ({ ...prev, order: parseInt(val) || 0 }))}
                placeholder="0"
              />
            </FormField>

            <FormField label="CTA Button Label">
              <TextInput
                value={formData.cta_label}
                onChange={(cta_label) => setFormData(prev => ({ ...prev, cta_label }))}
                placeholder="Book a Demo"
              />
            </FormField>
          </div>

          <FormField label="Hero Image URL" required>
            <ImageInput
              value={formData.hero_image}
              onChange={(hero_image) => setFormData(prev => ({ ...prev, hero_image }))}
              placeholder="https://example.com/hero-image.jpg"
              required
            />
          </FormField>

          <FormField label="PDF Download URL" description="Optional whitepaper or case study PDF">
            <TextInput
              value={formData.pdf_download_url}
              onChange={(pdf_download_url) => setFormData(prev => ({ ...prev, pdf_download_url }))}
              placeholder="https://example.com/whitepaper.pdf"
            />
          </FormField>
        </div>

        {/* Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Content</h2>
          
          <FormField label="Challenge" description="Describe the problem this use case solves" required>
            <RichTextEditor
              content={formData.challenge}
              onChange={(challenge) => setFormData(prev => ({ ...prev, challenge }))}
              placeholder="Describe the challenge government organizations face..."
            />
          </FormField>

          <FormField label="Solution" description="Explain how AI solves this challenge" required>
            <RichTextEditor
              content={formData.solution}
              onChange={(solution) => setFormData(prev => ({ ...prev, solution }))}
              placeholder="Explain how NODA's AI solution addresses the challenge..."
            />
          </FormField>

          <FormField label="Key Benefits" description="One benefit per line" required>
            <StringArrayInput
              value={formData.benefits}
              onChange={(benefits) => setFormData(prev => ({ ...prev, benefits }))}
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
              onChange={(meta_description) => setFormData(prev => ({ ...prev, meta_description }))}
              placeholder="Description for search engines (recommended: 150-160 characters)"
              rows={2}
              required
            />
          </FormField>

          <FormField label="SEO Keywords" description="Target keywords for search optimization">
            <StringArrayInput
              value={formData.seo_keywords}
              onChange={(seo_keywords) => setFormData(prev => ({ ...prev, seo_keywords }))}
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
              onChange={(published) => setFormData(prev => ({ ...prev, published }))}
              enabledLabel="Published"
              disabledLabel="Draft"
            />
          </FormField>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <SubmitButton isLoading={isLoading}>
            Create Use Case
          </SubmitButton>
          <Link
            href="/admin/use-cases"
            className="px-6 py-3 text-slate-300 hover:text-slate-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
