import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightUpLine,
  RiSparkling2Fill,
  RiLinkedinBoxLine,
  RiBroadcastLine,
  RiMailLine,
  RiMailFill,
  RiSearchEyeLine,
  RiBarChartBoxLine,
  RiCalendarCheckLine,
  RiCustomerService2Line,
} from 'react-icons/ri'
import { SiTiktok, SiWhatsapp } from 'react-icons/si'

/* Ecom Evolve | Team page. Violet design tokens. */
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

const founder = {
  name: 'Akande Ayomide',
  role: 'Founder & CEO',
  bio: 'Akande Ayomide founded Ecom Evolve to help online founders build brands that actually scale. He leads strategy, brand direction, and growth, turning scattered stores into systems that convert and retain. Every brand the studio touches gets the same obsessive attention, whether it is doing zero or six figures a month.',
  stats: [
    { val: '200+', label: 'Brands Evolved'    },
    { val: '$4M+', label: 'Revenue Driven'    },
    { val: '6+',   label: 'Years In The Game' },
  ],
  socials: [
    { icon: SiTiktok,   href: 'https://www.tiktok.com/@akandeayomide05?_r=1&_t=ZT-965N9mLLRLZ', label: 'TikTok'   },
    { icon: RiLinkedinBoxLine, href: 'https://www.linkedin.com/in/ecom-evolve-10aa3a377?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
    { icon: SiWhatsapp, href: 'https://wa.me/2348154084093', label: 'WhatsApp' },
    { icon: RiMailFill, href: 'mailto:Ecomevolve12@gmail.com', label: 'Email'    },
  ],
}

/* The roles the studio is staffing next. As real people join, move them
   into a `team` array with name + image and render them as photo cards. */
const openRoles = [
  { icon: RiBroadcastLine,        title: 'Social Media Manager', blurb: 'Builds presence across TikTok and other channels with content that grows audiences and drives steady traffic.' },
  { icon: RiMailLine,             title: 'Email Marketer',       blurb: 'Designs flows that recover carts, retain customers, and drive repeat revenue through Klaviyo and Mailchimp.' },
  { icon: RiSearchEyeLine,        title: 'Product Researcher',   blurb: 'Finds high margin products using trend analysis, competitor research, and demand validation.' },
  { icon: RiBarChartBoxLine,      title: 'Conversion Optimizer', blurb: 'Tunes product pages, store UX, and checkout so existing traffic turns into more revenue.' },
  { icon: RiCalendarCheckLine,    title: 'Project Manager',      blurb: 'Coordinates timelines and departments so every build ships on time and to spec.' },
  { icon: RiCustomerService2Line, title: 'Client Support',       blurb: 'Keeps clients informed and projects moving, handling communication and day to day operations.' },
]

function RoleCard({ role, index, reduce }) {
  const [hovered, setHovered] = useState(false)
  const Icon = role.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-3xl p-6"
      style={{
        background: CARD,
        border: hovered ? `1px solid ${VIOLET}66` : `1px solid ${BORDER}`,
        boxShadow: hovered ? `0 10px 40px ${VIOLET}26` : 'none',
        transform: hovered && !reduce ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
      }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: `${VIOLET}1f`, border: `1px solid ${VIOLET}44` }}>
        <Icon size={20} color={VIOLET_BR} />
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-block rounded-full px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `${VIOLET}1a`, color: VIOLET_BR, border: `1px solid ${VIOLET}33` }}>
          Open role
        </span>
      </div>
      <p className="font-display text-base font-bold" style={{ color: SNOW }}>{role.title}</p>
      <p className="font-body mt-2 text-sm leading-relaxed" style={{ color: SNOW_MUTED }}>{role.blurb}</p>
    </motion.div>
  )
}

export default function Team() {
  const reduce = useReducedMotion()

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: BG }}>
      {/* ambient layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid" style={{ backgroundSize: '32px 32px' }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/4 h-[600px] w-[600px]"
        style={{ background: `radial-gradient(circle, ${VIOLET}1f 0%, transparent 70%)` }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px]"
        style={{ background: `radial-gradient(circle, ${BLUE}14 0%, transparent 70%)` }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-36">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: `${VIOLET}1f`, border: `1px solid ${VIOLET}44` }}>
            <RiSparkling2Fill size={13} color={VIOLET_BR} />
            <span className="font-body text-xs font-medium uppercase tracking-wider" style={{ color: VIOLET_BR }}>
              Meet The Team
            </span>
          </div>
          <h1 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: SNOW }}>
            The People Powering{' '}
            <span className="text-brand-grad">Your Evolution</span>
          </h1>
          <p className="font-body mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: SNOW_DIM }}>
            Ecom Evolve is led by its founder today and growing fast. Here is who is steering the ship, and the
            roles joining the studio next.
          </p>
        </motion.div>

        {/* Founder spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 grid grid-cols-1 items-stretch gap-8 overflow-hidden rounded-[32px] lg:grid-cols-[0.8fr_1fr]"
          style={{ background: CARD, border: `1px solid ${VIOLET}33`, boxShadow: `0 0 80px ${VIOLET}1f` }}>

          {/* photo */}
          <div className="relative min-h-[360px]">
            <img src={PORTRAIT} alt="Akande Ayomide, Founder and CEO of Ecom Evolve"
              className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${CARD} 0%, ${CARD}30 55%, transparent 100%), linear-gradient(to right, transparent 60%, ${CARD} 100%)` }} />
            <div className="absolute left-5 top-5 rounded-full px-3 py-1"
              style={{ background: `${VIOLET}26`, border: `1px solid ${VIOLET}55`, backdropFilter: 'blur(8px)' }}>
              <span className="font-body text-xs font-bold" style={{ color: VIOLET_BR }}>Founder &amp; CEO</span>
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: VIOLET_BR }}>
              {founder.role}
            </span>
            <h2 className="font-display mt-1 text-3xl font-bold md:text-4xl" style={{ color: SNOW }}>
              {founder.name}
            </h2>
            <p className="font-body mt-4 text-sm leading-relaxed" style={{ color: SNOW_DIM }}>
              {founder.bio}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4 py-5"
              style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
              {founder.stats.map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-xl font-bold leading-none" style={{ color: SNOW }}>{s.val}</p>
                  <p className="font-body mt-2 text-xs" style={{ color: SNOW_MUTED }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {founder.socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER_MID}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${VIOLET}cc`)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
                  <Icon size={15} color={SNOW} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Growing team */}
        <div className="mb-12 text-center">
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', color: SNOW }}>
            The Team Is Growing
          </h2>
          <p className="font-body mx-auto mt-3 max-w-lg text-sm leading-relaxed" style={{ color: SNOW_MUTED }}>
            We are building Ecom Evolve role by role. These are the specialists joining the studio next.
          </p>
        </div>

        <div className="mb-24 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {openRoles.map((role, i) => (
            <RoleCard key={role.title} role={role} index={i} reduce={reduce} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] p-10 text-center md:p-14"
          style={{ background: `linear-gradient(135deg, ${VIOLET}26 0%, ${BLUE}14 100%)`, border: `1px solid ${VIOLET}33` }}>
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full"
            style={{ background: `radial-gradient(circle, ${VIOLET}26 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: SNOW }}>
              Want This Team Working for You?
            </h2>
            <p className="font-body mx-auto mb-8 mt-3 max-w-lg text-sm leading-relaxed" style={{ color: SNOW_DIM }}>
              Book a free strategy call and let us map out how to evolve your brand.
            </p>
            <Link to="/book"
              className="btn-shine bg-brand-grad shadow-brand-btn inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-display text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book a Free Call
              <RiArrowRightUpLine size={16} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
