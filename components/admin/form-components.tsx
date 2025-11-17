'use client'

import { useState } from 'react'

// Form Field Wrapper
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  helpText?: string
  description?: string
  children: React.ReactNode
}

export function FormField({ label, required, error, helpText, description, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {description && <p className="text-sm text-slate-400 -mt-1">{description}</p>}
      {children}
      {helpText && <p className="text-sm text-slate-400">{helpText}</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}

// Text Input
interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  type?: 'text' | 'email' | 'url' | 'password' | 'number' | 'datetime-local'
  maxLength?: number
}

export function TextInput({ value, onChange, placeholder, required, type = 'text', maxLength }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  )
}

// Textarea
interface TextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
  maxLength?: number
}

export function Textarea({ value, onChange, placeholder, required, rows = 4, maxLength }: TextareaProps) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
      />
      {maxLength && (
        <div className="absolute bottom-2 right-2 text-xs text-slate-500">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}

// Tag Input
interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function TagInput({ value, onChange, placeholder = 'Add tag and press Enter' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()])
      }
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg min-h-[48px]">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-sm rounded border border-primary/30"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-primary-hover"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent text-slate-50 placeholder-slate-500 focus:outline-none"
      />
    </div>
  )
}

// Status Toggle
interface StatusToggleProps {
  checked?: boolean
  enabled?: boolean
  onChange: (checked: boolean) => void
  label?: string
  enabledLabel?: string
  disabledLabel?: string
}

export function StatusToggle({ 
  checked, 
  enabled, 
  onChange, 
  label, 
  enabledLabel = 'Published', 
  disabledLabel = 'Draft' 
}: StatusToggleProps) {
  const isChecked = checked !== undefined ? checked : enabled || false
  const displayLabel = label || (isChecked ? enabledLabel : disabledLabel)
  
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            isChecked ? 'bg-primary' : 'bg-slate-700'
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              isChecked ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      </div>
      <span className={`text-sm font-medium ${isChecked ? 'text-primary' : 'text-slate-400'}`}>
        {displayLabel}
      </span>
    </label>
  )
}

// Image Upload / URL Input
interface ImageInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  previewClassName?: string
}

export function ImageInput({ value, onChange, label, placeholder, required, previewClassName }: ImageInputProps) {
  return (
    <div className="space-y-3">
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter image URL"}
        type="url"
        required={required}
      />
      {value && (
        <div className="relative">
          <img
            src={value}
            alt={label || 'Preview'}
            className={`rounded-lg ${previewClassName || 'max-w-md'}`}
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid Image URL%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>
      )}
    </div>
  )
}

// Select Dropdown
interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
  required?: boolean
}

export function Select({ value, onChange, options, placeholder, required }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

// Multi-line String Array Input (for benefits, etc.)
interface StringArrayInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  buttonLabel?: string
}

export function StringArrayInput({ 
  value, 
  onChange, 
  placeholder = 'Enter item', 
  buttonLabel = 'Add Item' 
}: StringArrayInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addItem = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue.trim()])
      setInputValue('')
    }
  }

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, newValue: string) => {
    const newArray = [...value]
    newArray[index] = newValue
    onChange(newArray)
  }

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-primary text-slate-950 font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

// Loading Spinner
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div
      className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}
    />
  )
}

// Submit Button
interface SubmitButtonProps {
  isLoading?: boolean
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

export function SubmitButton({ isLoading, children, variant = 'primary' }: SubmitButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-slate-950 hover:bg-primary-hover',
    secondary: 'bg-slate-700 text-slate-50 hover:bg-slate-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`px-6 py-3 ${variantClasses[variant]} font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  )
}
