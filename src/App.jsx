import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  Code2,
  Gauge,
  GitBranch,
  Globe,
  LayoutTemplate,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  PenTool,
  X,
} from 'lucide-react'
import { ProfileImage } from './components/ProfileImage'
import { SectionHeader } from './components/SectionHeader'
import ChatWidget from './components/ChatWidget'
import { siteData } from './data/siteData'
import './App.css'

const iconMap = {
  Code2,
  PenTool,
  MonitorSmartphone,
  LayoutTemplate,
  Palette,
  Gauge,
  Award,
  github: GitBranch,
  linkedin: Globe,
  mail: Mail,
}

const projectFilters = ['All', 'Web', 'React', 'UI/UX', 'WordPress']

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      // Try to submit to Netlify if deployed there
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...data,
        }),
      })

      if (response.ok) {
        setFormSubmitted(true)
        e.target.reset()
        setTimeout(() => setFormSubmitted(false), 5000)
      }
    } catch (error) {
      // In development, just show success message
      console.log('Form submission (development mode):', data)
      setFormSubmitted(true)
      e.target.reset()
      setTimeout(() => setFormSubmitted(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredProjects =
    activeFilter === 'All'
      ? siteData.projects
      : siteData.projects.filter((project) => project.category === activeFilter)

  return (
    <div className="app-shell">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="BillyDev home">
            <span className="brand-mark">B</span>
            <span>BillyDev</span>
          </a>

          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
            {siteData.navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section section">
          <div className="container hero-grid">
            <div className="hero-copy reveal-up">
              <p className="eyebrow">Web Developer &amp; UI/UX Designer</p>
              <h1>{siteData.brand.tag}</h1>
              <p className="hero-description">
                I design and build modern websites, interfaces, and digital experiences that are
                clean, strategic, and built to perform across every screen.
              </p>

              <div className="cta-row">
                <a href="#projects" className="button primary-button">
                  View My Work
                  <ArrowRight size={18} />
                </a>
                <a href="#contact" className="button secondary-button">
                  Contact Me
                </a>
              </div>

              <ul className="social-links" aria-label="Social media links">
                {siteData.socialLinks.map((link) => {
                  const Icon = iconMap[link.icon]
                  return (
                    <li key={link.label}>
                      <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        <Icon size={16} aria-hidden="true" />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="hero-visual reveal-up delay-1">
              <ProfileImage />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="About"
              title="Thoughtful design and dependable development."
              description="I enjoy building experiences that balance clarity, usability, and performance while staying practical for real-world projects and clients."
            />

            <div className="about-grid">
              <div className="about-copy card">
                <p>
                  My work sits at the intersection of web development, UI/UX design, graphics, and
                  WordPress. I enjoy creating interfaces that feel polished, work well on every
                  device, and help people reach their goals with less friction.
                </p>
                <p>
                  I focus on clean code, purposeful design, and a modern workflow that supports
                  responsive builds, efficient delivery, and long-term maintainability.
                </p>
              </div>

              <div className="stats-grid">
                {siteData.stats.map((stat) => (
                  <div key={stat.label} className="stat-card card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section alt-section">
          <div className="container">
            <SectionHeader
              eyebrow="Skills"
              title="Tools and capabilities I use to build strong digital products."
              description="A practical mix of front-end implementation, design thinking, and delivery tools for modern websites and interfaces."
            />

            <div className="skills-grid">
              {siteData.skills.map((group) => (
                <article key={group.category} className="skill-card card">
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Services"
              title="Support for design, development, and launch-ready digital work."
              description="Each service is built around practical value: clear communication, thoughtful design, and dependable execution."
            />

            <div className="services-grid">
              {siteData.services.map((service) => {
                const Icon = iconMap[service.icon] || Code2
                return (
                  <article key={service.title} className="service-card card">
                    <div className="service-icon" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button type="button" className="inline-link">
                      Learn More
                    </button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section alt-section">
          <div className="container">
            <SectionHeader
              eyebrow="Projects"
              title="Selected work that reflects my process and standards."
              description="These project examples are editable placeholders and can be easily replaced with real client work or personal builds."
            />

            <div className="project-filters" aria-label="Project categories">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={filter === activeFilter ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.title} className="project-card card">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-body">
                    <span className="project-tag">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.tags.map((tag) => (
                        <span key={`${project.title}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <a href={project.github} target="_blank" rel="noreferrer" className="button secondary-button small-button">
                        GitHub
                      </a>
                      <a href={project.demo} target="_blank" rel="noreferrer" className="button primary-button small-button">
                        Live Demo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Experience"
              title="A timeline of my growing process and skill development."
              description="This is intentionally written as editable placeholder information to reflect a real professional journey without inventing facts."
            />

            <div className="timeline">
              {siteData.experience.map((item) => (
                <article key={`${item.period}-${item.title}`} className="timeline-item card">
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-content">
                    <span className="timeline-type">{item.type}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section alt-section">
          <div className="container">
            <SectionHeader
              eyebrow="Certifications"
              title="Professional credentials and recognized achievements."
              description="Industry-recognized certifications that demonstrate my commitment to continuous learning and professional development."
            />

            <div className="certifications-grid">
              {siteData.certifications.map((cert) => {
                const Icon = iconMap[cert.issuerIcon] || Award
                return (
                  <article key={cert.title} className="certification-card card">
                    <div className="cert-icon" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <div className="cert-header">
                      <h3>{cert.title}</h3>
                      <p className="cert-issuer">{cert.issuer}</p>
                      <p className="cert-date">{cert.date}</p>
                    </div>
                    <p className="cert-description">{cert.description}</p>
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="button secondary-button small-button">
                      View Credential
                    </a>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionHeader
                eyebrow="Contact"
                title="Let’s build something meaningful together."
                description="Whether you need a new website, a landing page, or a cleaner, more effective digital experience, I’d love to hear about your project."
              />

              <div className="contact-intro">
                <span className="availability-pill">Available for freelance work</span>
                <p>Open to web development, UI/UX design, and digital product collaboration.</p>
              </div>

              <div className="contact-details">
                <a href={`mailto:${siteData.contactDetails.email}`}>
                  <Mail size={18} />
                  <span>{siteData.contactDetails.email}</span>
                </a>
                <a href={siteData.contactDetails.github} target="_blank" rel="noreferrer">
                  <GitBranch size={18} />
                  <span>GitHub</span>
                </a>
                <a href={siteData.contactDetails.linkedin} target="_blank" rel="noreferrer">
                  <Globe size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <form className="contact-form card" name="contact" onSubmit={handleFormSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <div className="visually-hidden">
                <label>
                  Don’t fill this out if you’re human:
                  <input name="bot-field" />
                </label>
              </div>
              {formSubmitted && (
                <div className="success-message">
                  <strong>Thank you!</strong> Your message has been sent successfully. I'll get back to you soon.
                </div>
              )}
              <div className="field-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required disabled={isSubmitting} />
              </div>

              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required disabled={isSubmitting} />
              </div>

              <div className="field-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project" required disabled={isSubmitting} />
              </div>

              <button type="submit" className="button primary-button submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© 2026 BillyDev</p>
          <a href="#home">Back to top</a>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}

export default App
