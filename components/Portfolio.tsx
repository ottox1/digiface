import Image from 'next/image'

const projects = [
  {
    title: 'Udo Okonjo',
    category: 'Personal Portfolio',
    url: 'https://udookonjo.com',
    screenshot: '/images/portfolio/udookonjo.com.png',
    accentColor: 'bg-coral',
    borderColor: 'border-coral/30',
  },
  {
    title: 'Fine and Country',
    category: 'Real Estate',
    url: 'https://fineandcountry.ng',
    screenshot: '/images/portfolio/fineandcountry.ng.png',
    accentColor: 'bg-teal',
    borderColor: 'border-teal/30',
  },
  {
    title: 'Compound Africa',
    category: 'Property Development',
    url: 'https://compoundafrica.com',
    screenshot: '/images/portfolio/compoundafrica.com.png',
    accentColor: 'bg-golden',
    borderColor: 'border-golden/30',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="py-24 bg-white relative overflow-hidden">
      {/* Tetris decorative blocks */}
      <div className="absolute top-12 right-8 w-16 h-24 bg-sky/10 rounded-lg" />
      <div className="absolute bottom-20 left-12 w-20 h-12 bg-coral/10 rounded-lg" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-coral rounded-lg" />
            <p className="font-serif italic text-slate/60">Portfolio</p>
            <div className="w-8 h-1 bg-golden rounded-lg" />
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-slate">
            Selected Work
          </h2>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Card with colored top border */}
              <div className={`bg-stone/30 rounded-2xl overflow-hidden border-t-4 ${project.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                {/* Screenshot container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} website preview`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate/0 group-hover:bg-slate/60 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white font-medium bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/30">
                      Visit Site →
                    </span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-slate group-hover:text-coral transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate/50">{project.category}</p>
                  </div>
                  <div className={`w-3 h-8 ${project.accentColor} rounded-sm opacity-60`} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-12 gap-2">
          <div className="w-12 h-2 bg-coral/30 rounded-lg" />
          <div className="w-8 h-2 bg-golden/30 rounded-lg" />
          <div className="w-6 h-2 bg-teal/30 rounded-lg" />
        </div>
      </div>
    </section>
  )
}
