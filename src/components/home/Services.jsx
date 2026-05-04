import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  TbShoppingBag, TbSearch, TbSpeakerphone,
  TbPalette, TbChartLine, TbAdjustments,
  TbArrowUpRight,
} from 'react-icons/tb'

const SERVICES = [
  {
    icon:    TbShoppingBag,
    title:   'Store Setup',
    desc:    'We build your Shopify store from the ground up. Every page, every product listing and every checkout flow is engineered to convert visitors into buyers from day one.',
    color:   '#6C47FF',
    stat:    '50+ stores',
    statLabel: 'launched',
  },
  {
    icon:    TbSearch,
    title:   'Product Research',
    desc:    'We do the deep data work before you spend a single dollar on inventory. Our research identifies winning products your competitors have not found yet.',
    color:   '#2563EB',
    stat:    '200+',
    statLabel: 'products validated',
  },
  {
    icon:    TbSpeakerphone,
    title:   'Paid Advertising',
    desc:    'We build and manage Meta and TikTok ad campaigns designed for profitable ROAS from the very first week. No wasted spend, no guesswork.',
    color:   '#7C3AED',
    stat:    '4.2x',
    statLabel: 'avg ROAS',
  },
  {
    icon:    TbPalette,
    title:   'Brand Identity',
    desc:    'Your logo, color system, fonts and brand voice crafted to build instant trust with customers in the US, Canada, Australia and Europe.',
    color:   '#0EA5E9',
    stat:    '100%',
    statLabel: 'custom design',
  },
  {
    icon:    TbChartLine,
    title:   'SEO and Content',
    desc:    'Organic traffic strategies and product content that compound over time. We reduce your dependence on paid ads and build a long term growth engine.',
    color:   '#6C47FF',
    stat:    '3x',
    statLabel: 'organic growth',
  },
  {
    icon:    TbAdjustments,
    title:   'Store Optimization',
    desc:    'CRO audits, A/B testing and speed improvements that squeeze more revenue from every visitor already hitting your store. More sales, same traffic.',
    color:   '#2563EB',
    stat:    '+40%',
    statLabel: 'avg conversion lift',
  },
]

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

function ServiceCard({ icon: Icon, title, desc, color, stat, statLabel, index }) {
  return (
    <motion.div
      variants={up(0.08 + index * 0.07)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--bg-border)',
        borderRadius: 18,
        padding: '28px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        cursor: 'default',
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}44`
        e.currentTarget.style.boxShadow   = `0 4px 32px ${color}12`
        e.currentTarget.style.transform   = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bg-border)'
        e.currentTarget.style.boxShadow   = 'none'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${color}0C, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon + stat row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: `${color}14`, border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={21} color={color} strokeWidth={1.8} />
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '1.2rem', letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${color}, #60A5FA)`,
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: 2,
          }}>
            {stat}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--snow-muted)', textTransform: 'uppercase' }}>
            {statLabel}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.1rem', color: 'var(--snow)',
        lineHeight: 1.2,
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 13.5,
        color: 'var(--snow-muted)', lineHeight: 1.72,
        flex: 1,
      }}>
        {desc}
      </p>

      {/* Bottom accent line */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, ${color}30, rgba(255,255,255,0.04), transparent)`,
      }} />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section style={{ background: 'var(--bg-raised)', padding: '6rem 0', borderTop: '1px solid var(--bg-border)', borderBottom: '1px solid var(--bg-border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <motion.div
          variants={up(0.05)} initial="hidden"
          whileInView="show" viewport={{ once: true }}
          style={{ maxWidth: 580, marginBottom: 52 }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: 100,
            background: 'var(--violet-muted)', border: '1px solid var(--violet-border)',
            color: 'var(--violet-bright)', marginBottom: 20,
          }}>
            What We Do
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)',
            color: 'var(--snow)', lineHeight: 1.1,
            letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            Every Service Your Store Needs to Win
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'var(--snow-dim)', lineHeight: 1.75, maxWidth: 480,
          }}>
            We handle every layer of your Shopify business so you can stay focused on the big picture. From your first product to your first six figure month.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          variants={up(0.55)} initial="hidden"
          whileInView="show" viewport={{ once: true }}
          style={{
            marginTop: 48, display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: 20,
            padding: '28px 32px', borderRadius: 18,
            background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--snow)', marginBottom: 5 }}>
              Not sure where to start?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--snow-muted)' }}>
              Book a free strategy call and we will map out exactly what your store needs.
            </p>
          </div>
          <Link
            to="/book-a-call"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
              padding: '12px 24px', borderRadius: 100,
              background: 'var(--brand-grad)', color: '#fff',
              boxShadow: '0 6px 22px rgba(108,71,255,0.38)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(108,71,255,0.50)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 6px 22px rgba(108,71,255,0.38)' }}
          >
            Book a Free Call <TbArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}