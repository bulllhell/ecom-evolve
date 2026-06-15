import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { RiArrowRightUpLine, RiDoubleQuotesL, RiSparkling2Fill, RiMailFill, RiLinkedinBoxLine } from 'react-icons/ri'
import { SiTiktok, SiWhatsapp } from 'react-icons/si'

/* Ecom Evolve | Founder section. Uses the project violet design tokens. */
const BG         = '#0E0F1A'
const CARD       = '#181926'
const VIOLET     = '#6C47FF'
const VIOLET_BR  = '#B3A0FF'
const BLUE       = '#2563EB'
const SNOW       = '#F0F2FF'
const SNOW_DIM   = '#9AA0C0'
const SNOW_MUTED = '#555A7A'
const BORDER     = 'rgba(255,255,255,0.07)'
const BORDER_MID = 'rgba(255,255,255,0.11)'

const PORTRAIT =
  'https://res.cloudinary.com/dsm3z5rei/image/upload/q_auto/f_auto/v1781488762/IMG-20260613-WA0028_ciuejs.jpg'

// TODO: swap these for real numbers
const stats = [
  { to: 200, suffix: '+',  label: 'Brands Evolved'    },
  { to: 4,   prefix: '$', suffix: 'M+', label: 'Revenue Driven' },
  { to: 6,   suffix: '+',  label: 'Years In The Game' },
]

const socials = [
  { icon: SiTiktok,   href: 'https://www.tiktok.com/@akandeayomide05?_r=1&_t=ZT-965N9mLLRLZ', label: 'TikTok'   },
  { icon: RiLinkedinBoxLine, href: 'https://www.linkedin.com/in/ecom-evolve-10aa3a377?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
  { icon: SiWhatsapp, href: 'https://wa.me/2348154084093', label: 'WhatsApp' },
  { icon: RiMailFill, href: 'mailto:Ecomevolve12@gmail.com', label: 'Email'    },
]

/* Animated count up metric */
function CountStat({ to, prefix = '', suffix = '', label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(to); return }
    const controls = animate(0, to, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, delay, reduce])

  const shown = to >= 100 ? Math.round(val).toLocaleString() : val.toFixed(0)

  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-bold leading-none"
         style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: SNOW }}>
        {prefix}{shown}{suffix}
      </p>
      <p className="font-body text-xs mt-2 tracking-wide" style={{ color: SNOW_MUTED }}>{label}</p>
    </div>
  )
}

export default function CEO() {
  const reduce = useReducedMotion()

  /* cursor tilt for the portrait */
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rxs = useSpring(rx, { stiffness: 140, damping: 18 })
  const rys = useSpring(ry, { stiffness: 140, damping: 18 })
  const glareX = useTransform(rys, [-8, 8], ['0%', '100%'])

  const onTilt = e => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 10)
    rx.set(-py * 10)
  }
  const resetTilt = () => { rx.set(0); ry.set(0) }

  const float = reduce ? {} : { y: [0, -12, 0] }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  }
  const rise = {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: BG }}>
      {/* dot grid plus hero glow to match the rest of the site */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid"
           style={{ backgroundSize: '32px 32px' }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-glow" />

      {/* drifting aurora */}
      <motion.div aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full"
        style={{ background: `radial-gradient(circle, ${VIOLET}26 0%, transparent 70%)`, filter: 'blur(20px)' }}
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full"
        style={{ background: `radial-gradient(circle, ${BLUE}1f 0%, transparent 70%)`, filter: 'blur(20px)' }}
        animate={reduce ? {} : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }} />

      {/* giant signature wordmark */}
      <div aria-hidden
           className="pointer-events-none absolute inset-x-0 bottom-[-2.5rem] select-none text-center leading-none">
        <span className="font-display font-extrabold uppercase"
              style={{
                fontSize: 'clamp(5rem, 22vw, 20rem)',
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: `1px ${VIOLET}1f`,
              }}>
          EVOLVE
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-20"
      >
        {/* PORTRAIT */}
        <motion.div variants={rise} className="relative mx-auto w-full max-w-[420px]">
          {/* vertical founder rail */}
          <div className="absolute -left-7 top-0 hidden h-full items-center md:flex">
            <span className="font-body text-[10px] uppercase tracking-[0.5em]"
                  style={{ color: SNOW_MUTED, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Founder &middot; Ecom Evolve
            </span>
          </div>

          <motion.div
            onMouseMove={onTilt}
            onMouseLeave={resetTilt}
            style={{ rotateX: rxs, rotateY: rys, transformPerspective: 1000 }}
            className="relative overflow-hidden rounded-[28px] shadow-card-md"
          >
            <div className="relative" style={{ aspectRatio: '4/5' }}>
              <img src={PORTRAIT} alt="Akande Ayomide, Founder and CEO of Ecom Evolve"
                   className="h-full w-full object-cover object-top" />
              <div className="absolute inset-0"
                   style={{ background: `linear-gradient(to top, ${BG}f2 0%, ${BG}40 45%, transparent 70%)` }} />
              {/* moving glare */}
              {!reduce && (
                <motion.div aria-hidden className="absolute inset-0 mix-blend-overlay"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)', backgroundSize: '200% 100%', backgroundPositionX: glareX }} />
              )}
              {/* accent hairline frame */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px]"
                   style={{ border: `1px solid ${VIOLET}40` }} />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-xl font-bold" style={{ color: SNOW }}>Akande Ayomide</p>
                <p className="font-body mb-3 text-sm" style={{ color: SNOW_DIM }}>
                  Founder &amp; CEO
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href}
                       target={href.startsWith('http') ? '_blank' : undefined}
                       rel="noopener noreferrer" aria-label={label}
                       className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200"
                       style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}
                       onMouseEnter={e => (e.currentTarget.style.background = `${VIOLET}cc`)}
                       onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                      <Icon size={13} color={SNOW} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* floating metric chips */}
          <motion.div
            animate={float}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-3 top-8 rounded-2xl px-5 py-4 shadow-brand-sm"
            style={{ background: `${VIOLET}1f`, border: `1px solid ${VIOLET}55`, backdropFilter: 'blur(12px)' }}>
            <p className="font-display text-2xl font-bold leading-none" style={{ color: SNOW }}>$4M+</p>
            <p className="font-body mt-1 text-xs" style={{ color: SNOW_DIM }}>Revenue Driven</p>
          </motion.div>

          <motion.div
            animate={float}
            transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute -left-4 bottom-20 rounded-2xl px-5 py-4"
            style={{ background: CARD, border: `1px solid ${BORDER_MID}`, backdropFilter: 'blur(12px)' }}>
            <p className="font-display text-2xl font-bold leading-none" style={{ color: SNOW }}>200+</p>
            <p className="font-body mt-1 text-xs" style={{ color: SNOW_DIM }}>Brands Evolved</p>
          </motion.div>
        </motion.div>

        {/* COPY */}
        <div className="flex flex-col gap-6">
          <motion.div variants={rise}
            className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2"
            style={{ background: `${VIOLET}1f`, border: `1px solid ${VIOLET}44` }}>
            <RiSparkling2Fill size={13} color={VIOLET_BR} />
            <span className="font-body text-xs font-medium uppercase tracking-wider" style={{ color: VIOLET_BR }}>
              Meet the Founder
            </span>
          </motion.div>

          <motion.h2 variants={rise} className="font-display font-bold leading-[1.05]"
            style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.2rem)', color: SNOW }}>
            The Vision Powering{' '}
            <span className="text-brand-grad">Your Evolution</span>
          </motion.h2>

          <motion.div variants={rise} className="relative rounded-2xl p-6 shadow-card"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <RiDoubleQuotesL size={28} className="mb-3" style={{ color: `${VIOLET}aa` }} />
            <p className="font-body text-sm leading-relaxed" style={{ color: SNOW_DIM }}>
              I built Ecom Evolve for founders who are tired of blending in. Brand, store, and growth are not three
              separate jobs. They are one system, and we obsess over it so your store does not just pull traffic.
              It compounds.
            </p>
          </motion.div>

          <motion.p variants={rise} className="font-body text-sm leading-relaxed"
            style={{ color: SNOW_MUTED }}>
            With years across ecommerce and performance branding, Akande Ayomide has helped founders turn scattered
            stores into brands that convert, retain, and scale.
          </motion.p>

          <motion.div variants={rise} className="grid grid-cols-3 gap-4 py-6"
            style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
            {stats.map((s, i) => <CountStat key={s.label} {...s} delay={i * 0.12} />)}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={rise} className="flex flex-col gap-3 sm:flex-row">
            <Link to="/book"
              className="btn-shine bg-brand-grad shadow-brand-btn inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-7 py-4 font-display text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book a Strategy Call
              <RiArrowRightUpLine size={16} />
            </Link>
            <Link to="/team"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-7 py-4 font-display text-sm font-semibold transition-all duration-200"
              style={{ border: `1px solid ${BORDER_MID}`, color: SNOW_DIM }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = SNOW }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = SNOW_DIM }}>
              Meet the Full Team
              <RiArrowRightUpLine size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

