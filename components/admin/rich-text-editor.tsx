'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ content, onChange, placeholder, className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className={`border border-slate-800 rounded-lg bg-slate-900 ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-slate-800 p-2 flex flex-wrap gap-1">
        {/* Heading Buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          H3
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1" />

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
            editor.isActive('bold')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded text-sm italic transition-colors ${
            editor.isActive('italic')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded text-sm line-through transition-colors ${
            editor.isActive('strike')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          S
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Numbered List"
        >
          1. List
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1" />

        {/* Blockquote & Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Quote"
        >
          "
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 rounded text-sm font-mono transition-colors ${
            editor.isActive('codeBlock')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Code Block"
        >
          {'</>'}
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1" />

        {/* Link & Image */}
        <button
          type="button"
          onClick={addLink}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            editor.isActive('link')
              ? 'bg-primary text-slate-950'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Add Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1.5 rounded text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          title="Add Image"
        >
          🖼️
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1" />

        {/* Horizontal Rule */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1.5 rounded text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          title="Horizontal Line"
        >
          ―
        </button>

        {/* Undo/Redo */}
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1.5 rounded text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1.5 rounded text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Redo"
        >
          ↷
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}
