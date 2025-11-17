'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { 
  FormField, 
  TextInput, 
  Textarea, 
  TagInput, 
  StatusToggle,
  ImageInput,
  LoadingSpinner,
  SubmitButton 
} from '@/components/admin/form-components'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    tags: [] as string[],
    meta_description: '',
    og_image_url: '',
    published: false,
    published_at: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create blog post')
      }

      const data = await response.json()
      router.push('/admin/blog')
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
          href="/admin/blog"
          className="text-slate-400 hover:text-slate-300 transition-colors"
        >
          ← Back to Blog Posts
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-slate-400">Write and publish a new article</p>
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
              placeholder="Enter blog post title"
              required
            />
          </FormField>

          <FormField label="URL Slug" required>
            <TextInput
              value={formData.slug}
              onChange={(slug) => setFormData(prev => ({ ...prev, slug }))}
              placeholder="blog-post-url-slug"
              required
            />
          </FormField>

          <FormField label="Author" required>
            <TextInput
              value={formData.author}
              onChange={(author) => setFormData(prev => ({ ...prev, author }))}
              placeholder="Author name"
              required
            />
          </FormField>

          <FormField label="Excerpt" description="Short summary shown in listings">
            <Textarea
              value={formData.excerpt}
              onChange={(excerpt) => setFormData(prev => ({ ...prev, excerpt }))}
              placeholder="Brief description of the blog post..."
              rows={3}
            />
          </FormField>

          <FormField label="Tags">
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
              placeholder="Add tag and press Enter"
            />
          </FormField>
        </div>

        {/* Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Content</h2>
          
          <FormField label="Article Content" required>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              placeholder="Write your blog post content..."
            />
          </FormField>
        </div>

        {/* SEO & Images */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">SEO & Images</h2>

          <FormField label="Meta Description">
            <Textarea
              value={formData.meta_description}
              onChange={(meta_description) => setFormData(prev => ({ ...prev, meta_description }))}
              placeholder="Description for search engines (recommended: 150-160 characters)"
              rows={2}
            />
          </FormField>

          <FormField label="Open Graph Image URL" description="Image shown when shared on social media">
            <ImageInput
              value={formData.og_image_url}
              onChange={(og_image_url) => setFormData(prev => ({ ...prev, og_image_url }))}
              placeholder="https://example.com/image.jpg"
            />
          </FormField>
        </div>

        {/* Publishing */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Publishing</h2>

          <FormField label="Publish Date" description="Leave empty for current date/time when publishing">
            <TextInput
              type="datetime-local"
              value={formData.published_at}
              onChange={(published_at) => setFormData(prev => ({ ...prev, published_at }))}
            />
          </FormField>

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
            Create Blog Post
          </SubmitButton>
          <Link
            href="/admin/blog"
            className="px-6 py-3 text-slate-300 hover:text-slate-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
