export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  status: number
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export interface HubspotContact {
  email: string
  firstname: string
  lastname?: string
  company?: string
  message?: string
}

export interface GreenhouseJob {
  id: number
  title: string
  location: {
    name: string
  }
  departments: Array<{
    id: number
    name: string
  }>
  absolute_url: string
  metadata?: {
    type?: string
  }
}
