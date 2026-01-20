import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.css'

const logoModules = import.meta.glob('/public/supps/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
})
const supplierLogos = Object.entries(logoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => {
    const fileName = path.split('/').pop() || ''
    const label = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ')
    const normalizedUrl = String(url).replace('/public/', '/')
    return { src: normalizedUrl, alt: label }
  })

const MARQUEE_DURATION_SECONDS = 26

const Home = () => {
  const { t } = useTranslation()
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<HTMLDivElement | null>(null)
  const duplicateRowRef = useRef<HTMLDivElement | null>(null)
  const isPausedRef = useRef(false)
  const isHoveringRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const maxOffsetRef = useRef(0)
  const speedRef = useRef(0)
  const hasLoopRef = useRef(false)
  const prefersReducedMotionRef = useRef(false)
  const lastTimeRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const marquee = marqueeRef.current
    const track = trackRef.current
    const row = rowRef.current
    const duplicateRow = duplicateRowRef.current

    if (!marquee || !row || !track) return

    const applyTransform = () => {
      track.style.transform = `translateX(${-offsetRef.current}px)`
    }

    const normalizeOffset = (offset: number) => {
      const loopWidth = loopWidthRef.current
      if (hasLoopRef.current && loopWidth > 0) {
        return ((offset % loopWidth) + loopWidth) % loopWidth
      }

      const maxOffset = maxOffsetRef.current
      return Math.min(Math.max(0, offset), maxOffset)
    }

    const updateMeasurements = () => {
      const rowWidth = row.scrollWidth
      const duplicateWidth = duplicateRow?.scrollWidth ?? 0
      const containerWidth = marquee.clientWidth
      loopWidthRef.current = rowWidth
      speedRef.current =
        rowWidth > 0 ? rowWidth / MARQUEE_DURATION_SECONDS : 0
      hasLoopRef.current =
        duplicateRow ? window.getComputedStyle(duplicateRow).display !== 'none' : false
      const trackWidth = hasLoopRef.current ? rowWidth + duplicateWidth : rowWidth
      maxOffsetRef.current = Math.max(0, trackWidth - containerWidth)

      offsetRef.current = normalizeOffset(offsetRef.current)
      applyTransform()
    }

    updateMeasurements()

    const resizeObserver = new ResizeObserver(updateMeasurements)
    resizeObserver.observe(marquee)
    resizeObserver.observe(row)
    if (duplicateRow) {
      resizeObserver.observe(duplicateRow)
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => {
      prefersReducedMotionRef.current = motionQuery.matches
      updateMeasurements()
    }

    handleMotionChange()
    motionQuery.addEventListener('change', handleMotionChange)

    let animationFrame = 0
    const tick = (time: number) => {
      if (
        isPausedRef.current ||
        isDraggingRef.current ||
        prefersReducedMotionRef.current
      ) {
        lastTimeRef.current = time
        animationFrame = requestAnimationFrame(tick)
        return
      }

      const lastTime = lastTimeRef.current ?? time
      const delta = time - lastTime
      lastTimeRef.current = time

      const loopWidth = loopWidthRef.current
      if (loopWidth > 0) {
        const nextOffset = offsetRef.current + (speedRef.current * delta) / 1000
        offsetRef.current = hasLoopRef.current
          ? nextOffset % loopWidth
          : Math.min(nextOffset, maxOffsetRef.current)
        applyTransform()
      }

      animationFrame = requestAnimationFrame(tick)
    }

    animationFrame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const marquee = marqueeRef.current
    if (!marquee) return

    event.preventDefault()
    marquee.setPointerCapture(event.pointerId)
    isDraggingRef.current = true
    setIsDragging(true)
    isPausedRef.current = true
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    if (!marqueeRef.current || !trackRef.current) return

    event.preventDefault()
    const delta = event.clientX - dragStartXRef.current
    const loopWidth = loopWidthRef.current
    let nextOffset = dragStartOffsetRef.current - delta

    if (hasLoopRef.current && loopWidth > 0) {
      nextOffset = ((nextOffset % loopWidth) + loopWidth) % loopWidth
    } else {
      nextOffset = Math.min(Math.max(0, nextOffset), maxOffsetRef.current)
    }

    offsetRef.current = nextOffset
    trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const marquee = marqueeRef.current
    if (marquee?.hasPointerCapture(event.pointerId)) {
      marquee.releasePointerCapture(event.pointerId)
    }

    isDraggingRef.current = false
    setIsDragging(false)

    if (!isHoveringRef.current) {
      isPausedRef.current = false
    }
  }

  const handlePointerEnter = () => {
    isHoveringRef.current = true
    isPausedRef.current = true
  }

  const handlePointerLeave = () => {
    isHoveringRef.current = false
    if (!isDraggingRef.current) {
      isPausedRef.current = false
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{t('home.heroTitle')}</h1>
            <p className={styles.heroSubtitle}>{t('home.heroSubtitle')}</p>
            <p className={styles.heroDescription}>
              {t('home.heroDescription')}
            </p>
            <div className={styles.heroButtons}>
              <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>{t('home.getQuote')}</Link>
              <Link to="/products" className={`${styles.btn} ${styles.btnSecondary}`}>{t('home.ourProducts')}</Link>
            </div>
          </div>
        </div>
        <section className={styles.suppliersSection}>
          <div className={styles.container}>
            <div
              ref={marqueeRef}
              className={`${styles.suppliersMarquee} ${
                isDragging ? styles.suppliersMarqueeDragging : ''
              }`}
              aria-label="Supplier logos"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            >
            <div className={styles.suppliersTrack} ref={trackRef}>
                <div className={styles.logoRow} ref={rowRef}>
                  {supplierLogos.map((supplier) => (
                    <img
                      key={supplier.src}
                      className={styles.supplierLogo}
                      src={supplier.src}
                      alt={supplier.alt}
                      draggable="false"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div
                  className={styles.logoRow}
                  aria-hidden="true"
                  ref={duplicateRowRef}
                >
                  {supplierLogos.map((supplier) => (
                    <img
                      key={`${supplier.src}-duplicate`}
                      className={styles.supplierLogo}
                      src={supplier.src}
                      alt=""
                      draggable="false"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

export default Home

