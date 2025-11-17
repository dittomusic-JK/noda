'use client'

import { useState, useEffect } from 'react'
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
  SubmitButton,
  LoadingSpinner,
} from '@/components/admin/form-components'

interface BlogPostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  meta_description: string
  og_image_url: string
  published: boolean
  published_at: string
}

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [postId, setPostId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<BlogPostForm | null>(null)

  useEffect(() => {
    params.then(p => {
      setPostId(p.id)
      fetchPost(p.id)
    })
  }, [])

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}`)
      if (!response.ok) throw new Error('Failed to fetch blog post')
      
      const data = await response.json()
      
      // Format datetime-local value
      let publishedAtValue = ''
      if (data.published_at) {
        const date = new Date(data.published_at)
        publishedAtValue = date.toISOString().slice(0, 16)
      }
      
      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        author: data.author,
        tags: data.tags || [],
        meta_description: data.meta_description || '',
        og_image_url: data.og_image_url || '',
        published: data.published,
        published_at: publishedAtValue,
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
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update blog post')
      }

      router.push('/admin/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete blog post')

      router.push('/admin/blog')
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
        <p className="text-slate-400 mb-4">Blog post not found</p>
        <Link
          href="/admin/blog"
          className="px-6 py-3 bg-slate-700 text-slate-50 font-medium rounded-lg hover:bg-slate-600 transition-colors inline-block"
        >
          Back to Blog Posts
        </Link>
      </div>
    )
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
        <h1 className="text-3xl font-bold mb-2">Edit Blog Post</h1>
        <p className="text-slate-400">Update your article</p>
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

          <FormField label="Author" required>
            <TextInput
              value={formData.author}
              onChange={(author) => setFormData(prev => prev ? { ...prev, author } : null)}
              required
            />
          </FormField>

          <FormField label="Excerpt" description="Short summary shown in listings">
            <Textarea
              value={formData.excerpt}
              onChange={(excerpt) => setFormData(prev => prev ? { ...prev, excerpt } : null)}
              rows={3}
            />
          </FormField>

          <FormField label="Tags">
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData(prev => prev ? { ...prev, tags } : null)}
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
              onChange={(content) => setFormData(prev => prev ? { ...prev, content } : null)}
            />
          </FormField>
        </div>

        {/* SEO & Images */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">SEO & Images</h2>

          <FormField label="Meta Description">
            <Textarea
              value={formData.meta_description}
              onChange={(meta_description) => setFormData(prev => prev ? { ...prev, meta_description } : null)}
              rows={2}
            />
          </FormField>

          <FormField label="Open Graph Image URL">
            <ImageInput
              value={formData.og_image_url}
              onChange={(og_image_url) => setFormData(prev => prev ? { ...prev, og_image_url } : null)}
            />
          </FormField>
        </div>

        {/* Publishing */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">Publishing</h2>

          <FormField label="Publish Date">
            <TextInput
              type="datetime-local"
              value={formData.published_at}
              onChange={(published_at) => setFormData(prev => prev ? { ...prev, published_at } : null)}
            />
          </FormField>

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
              Update Blog Post
            </SubmitButton>
            <Link
              href="/admin/blog"
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
            Delete Post
          </button>
        </div>
      </form>
    </div>
  )
}
