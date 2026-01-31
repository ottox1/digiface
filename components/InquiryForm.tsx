'use client'

import { useState } from 'react'

interface FormData {
  // About You
  name: string
  email: string
  phone: string
  role: string
  // About Your Business
  businessName: string
  industry: string
  businessStage: string
  currentWebsite: string
  socialLinks: string
  // Your Brand
  hasLogo: string
  hasBrandAssets: string
  inspiredSites: string
  // The Project
  projectType: string
  projectDescription: string
  timeline: string
  budget: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  role: '',
  businessName: '',
  industry: '',
  businessStage: '',
  currentWebsite: '',
  socialLinks: '',
  hasLogo: '',
  hasBrandAssets: '',
  inspiredSites: '',
  projectType: '',
  projectDescription: '',
  timeline: '',
  budget: '',
}

const steps = [
  { id: 1, title: 'About You', subtitle: 'Let\'s start with the basics' },
  { id: 2, title: 'Your Business', subtitle: 'Tell us about what you do' },
  { id: 3, title: 'Your Brand', subtitle: 'What assets do you have?' },
  { id: 4, title: 'The Project', subtitle: 'What are we building?' },
]

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.email)
      case 2:
        return !!(formData.businessName && formData.industry && formData.businessStage)
      case 3:
        return !!(formData.hasLogo && formData.hasBrandAssets)
      case 4:
        return !!(formData.projectType && formData.timeline && formData.projectDescription)
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      setError('')
    } else {
      setError('Please fill in the required fields')
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(4)) {
      setError('Please fill in the required fields')
      return
    }
    
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Something went wrong')

      setIsSubmitted(true)
      setFormData(initialFormData)
      setCurrentStep(1)
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="inquiry" className="py-24 bg-stone">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="bg-fog rounded-2xl p-12 shadow-sm">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-slate mb-4">We&apos;ve got your inquiry!</h3>
            <p className="text-slate/60 mb-6">
              Thanks for reaching out. We&apos;ll review your details and get back to you within 24 hours
              to schedule a quick discovery call.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sage hover:text-sage-dark transition-colors underline"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="inquiry" className="py-24 bg-stone">
      <div className="max-w-xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8">
          <p className="font-serif italic text-sage mb-3">Let&apos;s talk</p>
          <h2 className="text-3xl md:text-4xl font-medium text-slate mb-4">
            Tell us about your project
          </h2>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep === step.id
                      ? 'bg-sage text-white'
                      : currentStep > step.id
                      ? 'bg-sage/20 text-sage'
                      : 'bg-fog text-slate/40'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span className="hidden sm:block text-xs text-slate/50 mt-2">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-fog rounded-full overflow-hidden">
            <div
              className="h-full bg-sage transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-fog rounded-2xl p-8 shadow-sm">
          {/* Step header */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-slate/60">{steps[currentStep - 1].subtitle}</p>
          </div>

          {/* Step 1: About You */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate mb-2">
                  Your name <span className="text-sage">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate mb-2">
                  Email <span className="text-sage">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate mb-2">
                  Phone <span className="text-slate/40">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate mb-2">
                  Your role <span className="text-slate/40">(optional)</span>
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="Founder, Marketing Manager, etc."
                />
              </div>
            </div>
          )}

          {/* Step 2: Your Business */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-slate mb-2">
                  Business name <span className="text-sage">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-slate mb-2">
                  Industry / What you do <span className="text-sage">*</span>
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="E-commerce, Consulting, etc."
                />
              </div>
              <div>
                <label htmlFor="businessStage" className="block text-sm font-medium text-slate mb-2">
                  Business stage <span className="text-sage">*</span>
                </label>
                <select
                  id="businessStage"
                  name="businessStage"
                  value={formData.businessStage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="starting">Just starting out</option>
                  <option value="early">1-3 years in business</option>
                  <option value="established">Established (3+ years)</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentWebsite" className="block text-sm font-medium text-slate mb-2">
                  Current website <span className="text-slate/40">(if you have one)</span>
                </label>
                <input
                  type="url"
                  id="currentWebsite"
                  name="currentWebsite"
                  value={formData.currentWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="https://yoursite.com"
                />
              </div>
              <div>
                <label htmlFor="socialLinks" className="block text-sm font-medium text-slate mb-2">
                  Social media links <span className="text-slate/40">(optional)</span>
                </label>
                <input
                  type="text"
                  id="socialLinks"
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
                  placeholder="Instagram, LinkedIn, Twitter URLs..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Your Brand */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="hasLogo" className="block text-sm font-medium text-slate mb-2">
                  Do you have a logo? <span className="text-sage">*</span>
                </label>
                <select
                  id="hasLogo"
                  name="hasLogo"
                  value={formData.hasLogo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes, ready to use</option>
                  <option value="needs-work">Yes, but needs work</option>
                  <option value="no">No, I need one</option>
                </select>
              </div>
              <div>
                <label htmlFor="hasBrandAssets" className="block text-sm font-medium text-slate mb-2">
                  Brand colors & fonts? <span className="text-sage">*</span>
                </label>
                <select
                  id="hasBrandAssets"
                  name="hasBrandAssets"
                  value={formData.hasBrandAssets}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="guidelines">Yes, have brand guidelines</option>
                  <option value="some-ideas">Have some ideas</option>
                  <option value="fresh">Starting fresh</option>
                </select>
              </div>
              <div>
                <label htmlFor="inspiredSites" className="block text-sm font-medium text-slate mb-2">
                  Websites you like <span className="text-slate/40">(optional)</span>
                </label>
                <textarea
                  id="inspiredSites"
                  name="inspiredSites"
                  rows={3}
                  value={formData.inspiredSites}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all resize-none"
                  placeholder="Share links to sites whose look and feel you admire..."
                />
              </div>
            </div>
          )}

          {/* Step 4: The Project */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-slate mb-2">
                  What do you need? <span className="text-sage">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="new">New website from scratch</option>
                  <option value="refresh">Refresh/redesign existing site</option>
                  <option value="unsure">Not sure, need guidance</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-slate mb-2">
                  Timeline <span className="text-sage">*</span>
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="asap">ASAP (within a week)</option>
                  <option value="2-4-weeks">2-4 weeks</option>
                  <option value="1-2-months">1-2 months</option>
                  <option value="exploring">No rush, just exploring</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-slate mb-2">
                  Budget range <span className="text-slate/40">(optional)</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2000">$1,000 - $2,000</option>
                  <option value="2000-plus">$2,000+</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-slate mb-2">
                  Tell us about your project <span className="text-sage">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows={4}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-stone bg-white text-slate placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all resize-none"
                  placeholder="What are you hoping to achieve with your new website? Any specific features or pages you need?"
                />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 px-6 border border-stone text-slate font-medium rounded-full hover:bg-stone transition-all"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 px-6 bg-sage text-white font-medium rounded-full hover:bg-sage-dark transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 bg-sage text-white font-medium rounded-full hover:bg-sage-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send inquiry'}
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-sm text-slate/50">
            Step {currentStep} of 4
          </p>
        </form>
      </div>
    </section>
  )
}
