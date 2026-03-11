import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import './App.css'

gsap.registerPlugin(Flip)

const SKILLS = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Python',
  'GraphQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
  'GSAP', 'Three.js', 'Figma',
]

const PROJECTS = [
  {
    id: 1, title: 'Nebula OS', year: '2024', tag: 'Full Stack',
    desc: 'Browser-based OS with a full desktop environment, virtual file system, and extensible app platform.',
  },
  {
    id: 2, title: 'Pulse Analytics', year: '2024', tag: 'Data Platform',
    desc: 'Real-time analytics processing 5M+ events/sec with custom visualization engine and AI-powered insights.',
  },
  {
    id: 3, title: 'Luminary AI', year: '2023', tag: 'AI / ML',
    desc: 'Creative AI assistant for design teams that generates UI components, palettes, and production-ready code.',
  },
  {
    id: 4, title: 'Orbital CMS', year: '2023', tag: 'SaaS',
    desc: 'Headless CMS with a visual block editor, multi-tenant architecture, and edge-first content delivery.',
  },
]

const PAGES = ['Intro', 'Work', 'About', 'Contact']

export default function App() {
  const [activePage, setActivePage] = useState(0)
  const [pendingPage, setPendingPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const gridRef = useRef(null)

  const goToPage = (idx) => {
    if (idx === activePage || isFlipping) return

    setIsFlipping(true)
    setPendingPage(idx)

    const grid = gridRef.current
    if (!grid) return

    // Setup: Fade out ALL contents inside boxes first
    const contents = Array.from(grid.querySelectorAll('.card-content'))

    gsap.to(contents, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
      onComplete: () => {
        // Once faded out, trigger the state update -> re-render -> FLIP animation
        setActivePage(idx)
      }
    })
  }

  useLayoutEffect(() => {
    if (!isFlipping) return

    const grid = gridRef.current
    if (!grid) return

    // Capture state immediately before browser paints the new layout (classes have changed because activePage changed)
    const boxes = gsap.utils.toArray('.bento-card')
    // We actually need to capture state BEFORE the class changes.
    // Wait, useLayoutEffect runs AFTER render but BEFORE paint. So at this point, the DOM already has the NEW classes.
    // To use FLIP correctly in React, we must capture state BEFORE setting the new state.
  }, [activePage, isFlipping])

  // Better FLIP approach for React:
  // 1. User clicks dot. Fade out contents.
  // 2. Capture FLIP state of all boxes.
  // 3. Update React state (activePage -> idx)
  // 4. In a useLayoutEffect watching activePage, if we have a captured state, we call Flip.from()

  const [flipState, setFlipState] = useState(null)

  const handleNavClick = (idx) => {
    if (idx === activePage || isFlipping) return

    setIsFlipping(true)
    setPendingPage(idx)

    const contents = Array.from(gridRef.current.querySelectorAll('.card-content'))

    // 1. Fade out current content
    gsap.to(contents, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        // 2. Capture the layout state before changing classes
        const state = Flip.getState('.bento-card')
        setFlipState(state)
        // 3. Change React state to apply new layout classes and new content
        setActivePage(idx)
      }
    })
  }

  useLayoutEffect(() => {
    if (flipState) {
      // 4. The DOM has now updated with new classes. Animate the layout change.
      Flip.from(flipState, {
        duration: 0.8,
        ease: 'power4.inOut',
        absolute: true,
        stagger: 0.05,
        onComplete: () => {
          // 5. Fade in the new content
          const contents = Array.from(gridRef.current.querySelectorAll('.card-content'))
          gsap.fromTo(contents,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05, clearProps: 'all' }
          )
          setIsFlipping(false)
          setFlipState(null)
        }
      })
    }
  }, [activePage, flipState])


  // We have exactly 6 persistent boxes. Each page maps different content to each box index.
  // We determine the CSS class for each box based on the activePage.
  // Intro: 1: Image, 2: Name, 3: Status, 4: Bio, 5: Skills, 6: Empty/Hidden
  // Work: 1: Header, 2: Proj 1, 3: Proj 2, 4: Proj 3, 5: Proj 4, 6: Empty/Hidden
  // About: 1: Hero, 2: Exp, 3: ProjCount, 4: Spark, 5: Text, 6: Learning
  // Contact: 1: Hero, 2: Side, 3: Email, 4: GH, 5: LI, 6: Footer

  const getPageConfig = (pageIndex) => {
    switch (pageIndex) {
      case 0:
        return [
          { type: 'intro-image', cls: 'pos-intro-1' },
          { type: 'intro-name', cls: 'pos-intro-2' },
          { type: 'intro-status', cls: 'pos-intro-3' },
          { type: 'intro-bio', cls: 'pos-intro-4' },
          { type: 'intro-skills', cls: 'pos-intro-5' },
          { type: 'empty', cls: 'pos-hidden' }
        ]
      case 1:
        return [
          { type: 'work-header', cls: 'pos-work-1' },
          { type: 'work-proj1', cls: 'pos-work-2' },
          { type: 'work-proj2', cls: 'pos-work-3' },
          { type: 'work-proj3', cls: 'pos-work-4' },
          { type: 'work-proj4', cls: 'pos-work-5' },
          { type: 'empty', cls: 'pos-hidden' }
        ]
      case 2:
        return [
          { type: 'about-hero', cls: 'pos-about-1' },
          { type: 'about-exp', cls: 'pos-about-2' },
          { type: 'about-projcount', cls: 'pos-about-3' },
          { type: 'about-spark', cls: 'pos-about-4' },
          { type: 'about-text', cls: 'pos-about-5' },
          { type: 'about-learning', cls: 'pos-about-6' }
        ]
      case 3:
        return [
          { type: 'contact-hero', cls: 'pos-contact-1' },
          { type: 'contact-side', cls: 'pos-contact-2' },
          { type: 'contact-email', cls: 'pos-contact-3' },
          { type: 'contact-gh', cls: 'pos-contact-4' },
          { type: 'contact-li', cls: 'pos-contact-5' },
          { type: 'contact-footer', cls: 'pos-contact-6' }
        ]
      default:
        return []
    }
  }

  const currentConfig = getPageConfig(activePage)

  // Determine which page indicator to show (we can update this instantly or wait for animation)
  const displayPage = isFlipping ? pendingPage : activePage

  return (
    <>
      <nav className="nav-dots">
        {PAGES.map((label, i) => (
          <button
            key={label}
            className={'nav-dot' + (i === activePage ? ' active' : '')}
            title={label}
            onClick={() => handleNavClick(i)}
            disabled={isFlipping}
          />
        ))}
      </nav>

      <div className="page-label-outer">
        <span className="page-label-num">0{displayPage + 1}</span>
        <span className="page-label-name">{PAGES[displayPage]}</span>
      </div>

      <div className="stage-wrapper">
        <div className="stage" ref={gridRef}>
          {currentConfig.map((box, i) => (
            <div key={i} className={`bento-card ${box.cls}`} data-flip-id={`box-${i}`}>
              {/* Content wrapper ensures we can fade text cleanly while card animates bounds */}
              <div className="card-content">
                <BoxContent type={box.type} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ─────────────────── CONTENT RENDERER ─────────────────── */

function BoxContent({ type }) {
  if (type === 'empty') return null

  switch (type) {
    case 'intro-image':
      return (
        <div className="profile-wrap full-center">
          <div className="image-halftone"></div>
          <div className="profile-pic pop-shadow">JD</div>
        </div>
      )
    case 'intro-name':
      return (
        <div className="valign">
          <span className="greeting">Hello, I am</span>
          <h1 className="hero-name">John Doe</h1>
          <p className="hero-title">Full Stack Developer & Creative Technologist</p>
        </div>
      )
    case 'intro-status':
      return (
        <div className="status-flex">
          <div className="status-led-row">
            <span className="led" /> Open to work
          </div>
          <span className="status-loc">New York, USA</span>
        </div>
      )
    case 'intro-bio':
      return (
        <div className="bio-flex">
          <p className="bio-text">
            I craft immersive digital experiences at the intersection of design and
            engineering — 5+ years building scalable products delighting millions.
          </p>
          <div className="bio-links">
            <a href="#" className="bio-link">GitHub</a>
            <a href="#" className="bio-link">LinkedIn</a>
          </div>
        </div>
      )
    case 'intro-skills':
      return (
        <div className="skills-flex">
          <span className="skills-label">Stack</span>
          <div className="skills-pills">
            {SKILLS.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
        </div>
      )

    // PORTFOLIO WORK
    case 'work-header':
      return (
        <div className="header-flex">
          <h2 className="panel-title">Selected<br />Projects</h2>
          <p className="panel-sub">Curated things built and shipped.</p>
        </div>
      )
    case 'work-proj1': return <ProjectItem proj={PROJECTS[0]} />
    case 'work-proj2': return <ProjectItem proj={PROJECTS[1]} />
    case 'work-proj3': return <ProjectItem proj={PROJECTS[2]} />
    case 'work-proj4': return <ProjectItem proj={PROJECTS[3]} />

    // ABOUT
    case 'about-hero':
      return (
        <div className="header-flex abs-bottom">
          <h2 className="panel-title">Beyond<br />The Code</h2>
        </div>
      )
    case 'about-exp':
      return <StatItem num="5+" lbl="Years Experience" />
    case 'about-projcount':
      return <StatItem num="40+" lbl="Projects Shipped" />
    case 'about-spark':
      return <StatItem num="∞" lbl="Curiosity" />
    case 'about-text':
      return (
        <p className="about-desc">
          When not architecting interfaces, I explore generative art, contribute to
          open-source, and mentor junior devs. Great software is as much about craft
          as it is about function.
        </p>
      )
    case 'about-learning':
      return (
        <div className="learning-flex">
          <span className="learning-label">Currently Learning</span>
          <div className="learning-tags">
            <span>Rust</span><span>WebGPU</span><span>AI</span>
          </div>
        </div>
      )

    // CONTACT
    case 'contact-hero':
      return (
        <div className="header-flex full-height space-between">
          <h2 className="panel-title">Let's Build<br />Something</h2>
          <a href="mailto:john@example.com" className="cta-btn pop-shadow-btn">Say Hello</a>
        </div>
      )
    case 'contact-side':
      return <div className="full-center"><span className="big-smile">:)</span></div>
    case 'contact-email':
      return <ContactItem lbl="Email" val="hello@johndoe.com" />
    case 'contact-gh':
      return <ContactItem lbl="GitHub" val="@johndoe" />
    case 'contact-li':
      return <ContactItem lbl="LinkedIn" val="john-doe-dev" />
    case 'contact-footer':
      return <div className="full-center footer-txt">Crafted with ♥ by John Doe · 2024</div>

    default:
      return null
  }
}

function ProjectItem({ proj }) {
  return (
    <div className="proj-flex">
      <div className="proj-header">
        <span className="proj-tag">{proj.tag}</span>
        <span className="proj-year">{proj.year}</span>
      </div>
      <div>
        <h3 className="proj-title">{proj.title}</h3>
        <p className="proj-desc">{proj.desc}</p>
      </div>
      <a href="#" className="proj-link">View project &rarr;</a>
    </div>
  )
}

function StatItem({ num, lbl }) {
  return (
    <div className="stat-flex">
      <span className="big-num">{num}</span>
      <span className="big-lbl">{lbl}</span>
    </div>
  )
}

function ContactItem({ lbl, val }) {
  return (
    <div className="contact-item">
      <span className="c-label">{lbl}</span>
      <span className="c-value">{val}</span>
    </div>
  )
}
