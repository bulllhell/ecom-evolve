import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiPlayCircleFill,
  RiExternalLinkLine,
  RiCloseLine,
  RiStarFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri'
import { SiTiktok } from 'react-icons/si'

const TIKTOK = 'https://www.tiktok.com/@akandeayomide05?_r=1&_t=ZT-965N9mLLRLZ'

/* Build a first-frame poster image straight from the Cloudinary video URL. */
const posterFrom = url =>
  url
    .replace('/upload/', '/upload/so_0,q_auto,f_jpg/')
    .replace(/\/q_auto\/f_auto\//, '/')
    .replace(/\.mp4$/, '.jpg')

/* The 8 client videos. TODO: give each a real title / tag when you have them. */
const sources = [
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544327/VID-20260615-WA0011_mxgv9q.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544323/VID-20260615-WA0013_lwdwc4.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544323/VID-20260615-WA0014_hdgj03.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544322/VID-20260615-WA0016_vib5lx.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544320/VID-20260615-WA0012_eq7yfo.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544318/VID-20260615-WA0009_assssq.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544315/VID-20260615-WA0015_skmjzh.mp4',
  'https://res.cloudinary.com/dsm3z5rei/video/upload/q_auto/f_auto/v1781544314/VID-20260615-WA0010_d7ml5i.mp4',
]

const videos = sources.map((url, i) => ({
  id: i + 1,
  url,
  poster: posterFrom(url),
  title: `Client Result ${i + 1}`,             // TODO: edit
  tag: 'Client Win',                            // TODO: edit
  tagColor: i % 2 === 0 ? '#6C47FF' : '#2563EB',
}))

/* Player modal */
function VideoModal({ reel, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    if (reel && ref.current) {
      const p = ref.current.play()
      if (p && p.catch) p.catch(() => {})
    }
  }, [reel])

  return (
    <AnimatePresence>
      {reel && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="pointer-events-auto w-full max-w-[380px] overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)', borderRadius: '20px' }}>

              <div className="relative bg-black" style={{ aspectRatio: '9 / 16', maxHeight: '74vh' }}>
                <video
                  ref={ref}
                  src={reel.url}
                  poster={reel.poster}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
                <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: `${reel.tagColor}33`, color: '#fff', border: `1px solid ${reel.tagColor}66`, backdropFilter: 'blur(6px)' }}>
                  {reel.tag}
                </span>
                <button onClick={onClose}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}>
                  <RiCloseLine />
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <h3 className="font-bold leading-snug"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)', fontSize: '14px' }}>
                  {reel.title}
                </h3>
                <a href={TIKTOK} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ background: 'var(--brand-grad)' }}>
                  <SiTiktok size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* Single card */
function ReelCard({ reel, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(reel)}
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl basis-[74%] xs:basis-[48%] sm:basis-[38%] md:basis-[31%] lg:basis-[23.5%]"
      style={{
        scrollSnapAlign: 'start',
        background: 'var(--bg-raised)',
        border: hovered ? '1px solid var(--violet-border)' : '1px solid var(--bg-border)',
        boxShadow: hovered ? '0 20px 60px var(--violet-glow)' : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '9 / 14' }}>
        <motion.img
          src={reel.poster}
          alt={reel.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(24,25,38,0.25) 45%, transparent 100%)' }} />

        <span className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `${reel.tagColor}22`, color: reel.tagColor, border: `1px solid ${reel.tagColor}40` }}>
          {reel.tag}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
            className="flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
            style={{
              background: hovered ? 'var(--brand-grad)' : 'rgba(108,71,255,0.85)',
              boxShadow: hovered ? '0 0 32px var(--violet-glow)' : 'none',
            }}>
            <RiPlayCircleFill className="ml-0.5 text-2xl text-white" />
          </motion.div>
        </div>

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full px-1.5 py-0.5 font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', fontSize: '9px' }}>
          <SiTiktok style={{ color: '#B3A0FF', fontSize: '10px' }} />
          <span className="hidden sm:inline">Ecom Evolve</span>
          <span className="sm:hidden">Evolve</span>
        </div>
      </div>

      <div className="p-2.5 sm:p-4">
        <h3 className="line-clamp-2 font-bold leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
          {reel.title}
        </h3>
      </div>
    </motion.div>
  )
}

export default function VideoReviews() {
  const [activeReel, setActiveReel] = useState(null)
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }

  useEffect(() => {
    updateEdges()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  const scrollByCards = dir => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const gap = 16
    const amount = card ? card.clientWidth + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const ArrowBtn = ({ dir, disabled }) => (
    <button
      onClick={() => scrollByCards(dir)}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous' : 'Next'}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)', color: 'var(--snow)' }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = 'var(--brand-grad)'; e.currentTarget.style.borderColor = 'transparent' } }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--violet-border)' }}
    >
      {dir < 0 ? <RiArrowLeftSLine size={22} /> : <RiArrowRightSLine size={22} />}
    </button>
  )

  return (
    <section className="section-py relative overflow-hidden" style={{ background: 'var(--bg-raised)' }}>
      <style>{`.ee-track::-webkit-scrollbar{display:none} .ee-track{scrollbar-width:none;-ms-overflow-style:none}`}</style>

      {/* glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(108,71,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="mb-8 flex flex-col gap-3 sm:mb-12">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs"
              style={{ color: 'var(--violet-light)' }}>
              <RiStarFill /> Client Results
            </span>
            <a href={TIKTOK} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-300 sm:px-5 sm:text-sm"
              style={{ border: '1px solid var(--violet-border)', color: 'var(--snow-dim)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.color = 'var(--snow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--violet-border)'; e.currentTarget.style.color = 'var(--snow-dim)' }}>
              <SiTiktok style={{ color: 'var(--violet)' }} />
              <span className="hidden sm:inline">Follow on</span> TikTok
              <RiExternalLinkLine className="text-[10px]" />
            </a>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Real People.{' '}
                <span className="text-brand-grad">Real Results.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: 'var(--snow-dim)' }}>
                Watch how we have helped founders build profitable brands and Shopify stores from scratch.
              </p>
            </div>
            {/* desktop arrows */}
            <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
              <ArrowBtn dir={-1} disabled={atStart} />
              <ArrowBtn dir={1} disabled={atEnd} />
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div ref={trackRef}
            className="ee-track flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: 'x mandatory' }}>
            {videos.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} onClick={setActiveReel} />
            ))}
          </div>

          {/* edge arrows on mobile, overlaid */}
          <button onClick={() => scrollByCards(-1)} disabled={atStart} aria-label="Previous"
            className="absolute left-1 top-[38%] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 sm:hidden"
            style={{ background: 'rgba(14,15,26,0.8)', border: '1px solid var(--violet-border)', color: 'var(--snow)', backdropFilter: 'blur(6px)' }}>
            <RiArrowLeftSLine size={20} />
          </button>
          <button onClick={() => scrollByCards(1)} disabled={atEnd} aria-label="Next"
            className="absolute right-1 top-[38%] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 sm:hidden"
            style={{ background: 'rgba(14,15,26,0.8)', border: '1px solid var(--violet-border)', color: 'var(--snow)', backdropFilter: 'blur(6px)' }}>
            <RiArrowRightSLine size={20} />
          </button>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl px-4 py-5 text-center sm:mt-12 sm:flex-row sm:px-6 sm:text-left"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg text-white"
              style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--violet-glow)' }}>
              <SiTiktok />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Want to see more results?
              </p>
              <p className="text-xs" style={{ color: 'var(--snow-muted)' }}>
                Daily tips and client wins on TikTok
              </p>
            </div>
          </div>
          <a href={TIKTOK} target="_blank" rel="noopener noreferrer"
            className="flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--violet-glow)', fontFamily: 'var(--font-display)' }}>
            <SiTiktok />
            Watch More on TikTok
            <RiExternalLinkLine className="text-xs" />
          </a>
        </motion.div>
      </div>

      <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  )
}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* Single card */
function ReelCard({ reel, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(reel)}
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl basis-[74%] xs:basis-[48%] sm:basis-[38%] md:basis-[31%] lg:basis-[23.5%]"
      style={{
        scrollSnapAlign: 'start',
        background: 'var(--bg-raised)',
        border: hovered ? '1px solid var(--violet-border)' : '1px solid var(--bg-border)',
        boxShadow: hovered ? '0 20px 60px var(--violet-glow)' : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '9 / 14' }}>
        <motion.img
          src={reel.poster}
          alt={reel.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(24,25,38,0.25) 45%, transparent 100%)' }} />

        <span className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `${reel.tagColor}22`, color: reel.tagColor, border: `1px solid ${reel.tagColor}40` }}>
          {reel.tag}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
            className="flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
            style={{
              background: hovered ? 'var(--brand-grad)' : 'rgba(108,71,255,0.85)',
              boxShadow: hovered ? '0 0 32px var(--violet-glow)' : 'none',
            }}>
            <RiPlayCircleFill className="ml-0.5 text-2xl text-white" />
          </motion.div>
        </div>

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full px-1.5 py-0.5 font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', fontSize: '9px' }}>
          <SiTiktok style={{ color: '#B3A0FF', fontSize: '10px' }} />
          <span className="hidden sm:inline">Ecom Evolve</span>
          <span className="sm:hidden">Evolve</span>
        </div>
      </div>

      <div className="p-2.5 sm:p-4">
        <h3 className="line-clamp-2 font-bold leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
          {reel.title}
        </h3>
      </div>
    </motion.div>
  )
}

export default function VideoReviews() {
  const [activeReel, setActiveReel] = useState(null)
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }

  useEffect(() => {
    updateEdges()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  const scrollByCards = dir => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const gap = 16
    const amount = card ? card.clientWidth + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const ArrowBtn = ({ dir, disabled }) => (
    <button
      onClick={() => scrollByCards(dir)}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous' : 'Next'}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)', color: 'var(--snow)' }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = 'var(--brand-grad)'; e.currentTarget.style.borderColor = 'transparent' } }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--violet-border)' }}
    >
      {dir < 0 ? <RiArrowLeftSLine size={22} /> : <RiArrowRightSLine size={22} />}
    </button>
  )

  return (
    <section className="section-py relative overflow-hidden" style={{ background: 'var(--bg-raised)' }}>
      <style>{`.ee-track::-webkit-scrollbar{display:none} .ee-track{scrollbar-width:none;-ms-overflow-style:none}`}</style>

      {/* glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(108,71,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="mb-8 flex flex-col gap-3 sm:mb-12">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs"
              style={{ color: 'var(--violet-light)' }}>
              <RiStarFill /> Client Results
            </span>
            <a href={TIKTOK} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-300 sm:px-5 sm:text-sm"
              style={{ border: '1px solid var(--violet-border)', color: 'var(--snow-dim)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.color = 'var(--snow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--violet-border)'; e.currentTarget.style.color = 'var(--snow-dim)' }}>
              <SiTiktok style={{ color: 'var(--violet)' }} />
              <span className="hidden sm:inline">Follow on</span> TikTok
              <RiExternalLinkLine className="text-[10px]" />
            </a>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Real People.{' '}
                <span className="text-brand-grad">Real Results.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: 'var(--snow-dim)' }}>
                Watch how we have helped founders build profitable brands and Shopify stores from scratch.
              </p>
            </div>
            {/* desktop arrows */}
            <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
              <ArrowBtn dir={-1} disabled={atStart} />
              <ArrowBtn dir={1} disabled={atEnd} />
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div ref={trackRef}
            className="ee-track flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: 'x mandatory' }}>
            {videos.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} onClick={setActiveReel} />
            ))}
          </div>

          {/* edge arrows on mobile, overlaid */}
          <button onClick={() => scrollByCards(-1)} disabled={atStart} aria-label="Previous"
            className="absolute left-1 top-[38%] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 sm:hidden"
            style={{ background: 'rgba(14,15,26,0.8)', border: '1px solid var(--violet-border)', color: 'var(--snow)', backdropFilter: 'blur(6px)' }}>
            <RiArrowLeftSLine size={20} />
          </button>
          <button onClick={() => scrollByCards(1)} disabled={atEnd} aria-label="Next"
            className="absolute right-1 top-[38%] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 sm:hidden"
            style={{ background: 'rgba(14,15,26,0.8)', border: '1px solid var(--violet-border)', color: 'var(--snow)', backdropFilter: 'blur(6px)' }}>
            <RiArrowRightSLine size={20} />
          </button>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl px-4 py-5 text-center sm:mt-12 sm:flex-row sm:px-6 sm:text-left"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg text-white"
              style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--violet-glow)' }}>
              <SiTiktok />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Want to see more results?
              </p>
              <p className="text-xs" style={{ color: 'var(--snow-muted)' }}>
                Daily tips and client wins on TikTok
              </p>
            </div>
          </div>
          <a href={TIKTOK} target="_blank" rel="noopener noreferrer"
            className="flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--violet-glow)', fontFamily: 'var(--font-display)' }}>
            <SiTiktok />
            Watch More on TikTok
            <RiExternalLinkLine className="text-xs" />
          </a>
        </motion.div>
      </div>

      <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  )
}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* Single card */
function ReelCard({ reel, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(reel)}
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl basis-[74%] xs:basis-[48%] sm:basis-[38%] md:basis-[31%] lg:basis-[23.5%]"
      style={{
        scrollSnapAlign: 'start',
        background: 'var(--bg-raised)',
        border: hovered ? '1px solid var(--violet-border)' : '1px solid var(--bg-border)',
        boxShadow: hovered ? '0 20px 60px var(--violet-glow)' : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '9 / 14' }}>
        <motion.img
          src={reel.poster}
          alt={reel.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(24,25,38,0.25) 45%, transparent 100%)' }} />

        <span className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `${reel.tagColor}22`, color: reel.tagColor, border: `1px solid ${reel.tagColor}40` }}>
          {reel.tag}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
            className="flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
            style={{
              background: hovered ? 'var(--brand-grad)' : 'rgba(108,71,255,0.85)',
              boxShadow: hovered ? '0 0 32px var(--violet-glow)' : 'none',
            }}>
            <RiPlayCircleFill className="ml-0.5 text-2xl text-white" />
          </motion.div>
        </div>

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full px-1.5 py-0.5 font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', fontSize: '9px' }}>
          <RiInstagramLine style={{ color: '#6C47FF', fontSize: '10px' }} />
          <span className="hidden sm:inline">@ecom_evolve</span>
          <span className="sm:hidden">IG</span>
        </div>
      </div>

      <div className="p-2.5 sm:p-4">
        <h3 className="line-clamp-2 font-bold leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
          {reel.title}
        </h3>
      </div>
    </motion.div>
  )
}

export default function VideoReviews() {
  const [activeReel, setActiveReel] = useState(null)
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }

  useEffect(() => {
    updateEdges()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  const scrollByCards = dir => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const gap = 16
    const amount = card ? card.clientWidth + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const ArrowBtn = ({ dir, disabled }) => (
    <button
      onClick={() => scrollByCards(dir)}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous' : 'Next'}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)', color: 'var(--snow)' }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = 'var(--brand-grad)'; e.currentTarget.style.borderColor = 'transparent' } }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--violet-border)' }}
    >
      {dir < 0 ? <RiArrowLeftSLine size={22} /> : <RiArrowRightSLine size={22} />}
    </button>
  )

  return (
    <section className="section-py relative overflow-hidden" style={{ background: 'var(--bg-raised)' }}>
      <style>{`.ee-track::-webkit-scrollbar{display:none} .ee-track{scrollbar-width:none;-ms-overflow-style:none}`}</style>

      {/* glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(108,71,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="mb-8 flex flex-col gap-3 sm:mb-12">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs"
              style={{ color: 'var(--violet-light)' }}>
              <RiStarFill /> Client Results
            </span>
            <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-300 sm:px-5 sm:text-sm"
              style={{ border: '1px solid var(--violet-border)', color: 'var(--snow-dim)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.color = 'var(--snow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--violet-border)'; e.currentTarget.style.color = 'var(--snow-dim)' }}>
              <RiInstagramLine style={{ color: 'var(--violet)' }} />
              <span className="hidden sm:inline">Follow</span> @ecom_evolve
              <RiExternalLinkLine className="text-[10px]" />
            </a>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Real People.{' '}
                <span className="text-brand-grad">Real Results.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: 'var(--snow-dim)' }}>
                Watch how we have helped founders build profitable brands and Shopify stores from scratch.
              </p>
            </div>
            {/* desktop arrows */}
            <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
              <ArrowBtn dir={-1} disabled={atStart} />
              <ArrowBtn dir={1} disabled={atEnd} />
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div ref={trackRef}
            className="ee-track flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: 'x mandatory' }}>
            {videos.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} onClick={setActiveReel} />
            ))}
          </div>

          {/* edge arrows on mobile, overlaid */}
          <button onClick={() => scrollByCards(-1)} disabled={atStart} aria-label="Previous"
            className="absolute left-1 top-[38%] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 sm:hidden"
            style={{ background: 'rgba(14,15,26,0.8)', border: '1px solid var(--violet-border)', color: 'var(--snow)', backdropFilter: 'blur(6px)' }}>
            <RiArrowLeftSLine size={20} />
          </button>
          <button onClick={() => scrollByCards(1)} disabled={atEnd} aria-label="Next"
            className="absolute right-1 top-[38%] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0 sm:hidden"
            style={{ background: 'rgba(14,15,26,0.8)', border: '1px solid var(--violet-border)', color: 'var(--snow)', backdropFilter: 'blur(6px)' }}>
            <RiArrowRightSLine size={20} />
          </button>
        </div>

        {/* Bottom IG strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl px-4 py-5 text-center sm:mt-12 sm:flex-row sm:px-6 sm:text-left"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--violet-border)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg text-white"
              style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--violet-glow)' }}>
              <RiInstagramLine />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Want to see more results?
              </p>
              <p className="text-xs" style={{ color: 'var(--snow-muted)' }}>
                Daily tips and client wins on Instagram
              </p>
            </div>
          </div>
          <a href={IG_PROFILE} target="_blank" rel="noopener noreferrer"
            className="flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
            style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--violet-glow)', fontFamily: 'var(--font-display)' }}>
            <RiInstagramLine />
            Watch More on Instagram
            <RiExternalLinkLine className="text-xs" />
          </a>
        </motion.div>
      </div>

      <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  )
}
