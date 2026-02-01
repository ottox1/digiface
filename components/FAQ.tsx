'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'Depends on what you need. Refresh (existing-site touch-up) starts at $500. Starter sites (5 pages) are $1,000. Growth sites (10 pages) are $2,000. Custom projects are quoted based on scope.',
  },
  {
    question: 'How long does it take?',
    answer:
      "Refresh: 3–5 days. Starter: 5–7 days. Growth and custom projects depend on complexity — we'll give you a timeline upfront.",
  },
  {
    question: 'What do I need to provide?',
    answer:
      "Your logo (if you have one), photos of your work, a list of services you offer, your service area, and contact info. That's it. We handle the rest.",
  },
  {
    question: 'Do I need to be technical?',
    answer:
      'Not at all. We handle everything — you just review and give feedback.',
  },
  {
    question: 'How many rounds of edits do I get?',
    answer:
      'Three rounds are included with every package.',
  },
  {
    question: 'Can you build on Shopify or Wix?',
    answer:
      "Yes, but there's an additional porting cost. The fee varies depending on the project and which platform you want to port to.",
  },
  {
    question: 'What do you build with?',
    answer:
      "We build code-based sites. After delivery, if you want to make changes yourself, you'd need to hire a developer or port to another platform.",
  },
  {
    question: 'Do I have to pay for hosting or other tools?',
    answer:
      'No — you pay providers directly. We can help set things up for an additional fee.',
  },
  {
    question: 'Will my site work on phones?',
    answer:
      'Yes. Every site is fully responsive and tested on mobile.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. Our maintenance package is $100/month (billed as $300 for 3 months). Includes 6 rounds of updates, content changes, security checks, and analytics reviews every 2 weeks.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-fog">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-serif italic text-sage mb-3">Common questions</p>
          <h2 className="text-3xl md:text-4xl font-medium text-slate">
            Things people ask us
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-stone rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-stone/30 transition-colors"
              >
                <span className="font-medium text-slate pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-sage flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-5 bg-white border-t border-stone">
                  <p className="text-slate/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact prompt */}
        <div className="mt-12 text-center">
          <p className="text-slate/60 mb-4">Got something else on your mind?</p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-sage hover:text-sage-dark transition-colors font-medium"
          >
            Reach out — we&apos;re happy to chat
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
