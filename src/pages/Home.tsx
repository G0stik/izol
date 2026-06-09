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
const GOOGLE_REVIEW_LINK_TRENCIN = 'https://maps.app.goo.gl/FirmkF8Xuggz3cBz6'
const GOOGLE_REVIEW_LINK_ZVOLEN = 'https://maps.app.goo.gl/WB6Rq3o7N8dQoKZ7A'

const googleReviews = [
  {
    author: 'Google recenzia',
    branch: 'Trenčín',
    text: 'Profesionálny prístup, bezproblémová komunikácia a riešenia na mieru.'
  },
  {
    author: 'Google recenzia',
    branch: 'Trenčín',
    text: 'Ochotne poradili pri výbere vhodnej izolácie a pri objeme, ktorý som potreboval, som dostal aj zľavu.'
  },
  {
    author: 'Google recenzia',
    branch: 'Trenčín',
    text: 'Široký sortiment izolácie, stavbárskej, VZT, kúrenie, voda a odborné poradenstvo.'
  },
  {
    author: 'Google recenzia',
    branch: 'Trenčín',
    text: 'Kvalitný a odborný servis.'
  },
  {
    author: 'Google recenzia',
    branch: 'Trenčín',
    text: 'Profesionálny prístup, špičkové produkty a poradenstvo.'
  },
  {
    author: 'Google recenzia',
    branch: 'Trenčín',
    text: 'Široký výber materiálov, vedia skvelo poradiť. Naozaj odborníci na izolácie.'
  }
]

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

  const productFamilies = [
    {
      title: t('products.kflex.title'),
      description: t('products.kflex.description'),
      image: '/gallery/tovar.jpeg',
      meta: t('home.productMeta.kflex')
    },
    {
      title: t('products.refractory.title'),
      description: t('products.refractory.description'),
      image: '/pictograms/fire.jpeg',
      meta: t('home.productMeta.refractory')
    },
    {
      title: t('products.building.title'),
      description: t('products.building.description'),
      image: '/gallery/sklad2.jpeg',
      meta: t('home.productMeta.building')
    },
    {
      title: t('products.technical.title'),
      description: t('products.technical.description'),
      image: '/gallery/sklad4.jpeg',
      meta: t('home.productMeta.technical')
    }
  ]

  const advantages = t('home.advantages', { returnObjects: true }) as Array<{
    title: string
    text: string
  }>

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>{t('home.heroEyebrow')}</p>
              <h1 className={styles.heroTitle}>{t('home.heroTitle')}</h1>
              <p className={styles.heroSubtitle}>{t('home.heroSubtitle')}</p>
              <p className={styles.heroDescription}>
                {t('home.heroDescription')}
              </p>
              <div className={styles.heroButtons}>
                <Link to="/quote" className={`${styles.btn} ${styles.btnPrimary}`}>{t('home.getQuote')}</Link>
                <Link to="/products" className={`${styles.btn} ${styles.btnSecondary}`}>{t('home.ourProducts')}</Link>
              </div>
            </div>
            <div className={styles.heroVisual} aria-label={t('home.heroVisualAria')}>
              <img src="/gallery/sklad.jpeg" alt={t('home.heroVisualAlt')} />
              <div className={styles.visualPanel}>
                <span>{t('home.heroVisualLabel')}</span>
                <strong>{t('home.tempRange')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsBand}>
        <div className={styles.container}>
          <div className={styles.statItem}>
            <strong>23+</strong>
            <span>{t('about.stats.experience')}</span>
          </div>
          <div className={styles.statItem}>
            <strong>500+</strong>
            <span>{t('about.stats.projects')}</span>
          </div>
          <div className={styles.statItem}>
            <strong>K-FLEX</strong>
            <span>{t('home.kflexImporter')}</span>
          </div>
          <div className={styles.statItem}>
            <strong>{t('home.warehouseCount')}</strong>
            <span>{t('home.warehouseLocations')}</span>
          </div>
        </div>
      </section>

      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>{t('home.productSectionKicker')}</p>
            <h2>{t('home.productSectionTitle')}</h2>
            <Link to="/products">{t('home.allProducts')}</Link>
          </div>
          <div className={styles.productGrid}>
            {productFamilies.map((product) => (
              <Link to="/products" className={styles.productTile} key={product.title}>
                <img src={product.image} alt={product.title} loading="lazy" />
                <div className={styles.productTileContent}>
                  <span>{product.meta}</span>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.advantageSection}>
        <div className={styles.container}>
          <div className={styles.advantageMedia}>
            <img src="/projects/project3/build1.jpg" alt={t('home.advantageImageAlt')} />
          </div>
          <div className={styles.advantageContent}>
            <p className={styles.sectionKicker}>{t('home.advantageKicker')}</p>
            <h2>{t('home.advantageTitle')}</h2>
            <div className={styles.advantageList}>
              {advantages.map((advantage) => (
                <article key={advantage.title}>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectBand}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionKicker}>{t('home.referencesKicker')}</p>
            <h2>{t('home.referencesTitle')}</h2>
            <Link to="/projects">{t('home.referencesLink')}</Link>
          </div>
          <div className={styles.referenceGrid}>
            <article>
              <img src="/projects/project2/build1.jpg" alt="Zuckermandel Bratislava" />
              <div>
                <span>Zuckermandel</span>
                <strong>13 000 m²</strong>
                <p>{t('home.references.zuckermandel')}</p>
              </div>
            </article>
            <article>
              <img src="/projects/project5/build1.jpg" alt={t('home.references.hospitalName')} />
              <div>
                <span>{t('home.references.hospitalName')}</span>
                <strong>65 000 m²</strong>
                <p>{t('home.references.hospital')}</p>
              </div>
            </article>
            <article>
              <img src="/projects/project4/build1.jpg" alt="IKEA Industry Malacky" />
              <div>
                <span>IKEA Industry Malacky</span>
                <strong>1 000 m³</strong>
                <p>{t('home.references.ikea')}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.reviewsHeader}>
            <div>
              <p className={styles.sectionKicker}>{t('home.reviewsKicker')}</p>
              <h2>{t('home.reviewsTitle')}</h2>
              <p>{t('home.reviewsSubtitle')}</p>
            </div>
            <div className={styles.googleScore} aria-label={t('home.reviewsRatingAria')}>
              <span>Google</span>
              <strong>4.7/5</strong>
              <small>{t('home.reviewsCount')}</small>
            </div>
          </div>
          <div className={styles.reviewsGrid}>
            {googleReviews.map((review) => (
              <article className={styles.reviewCard} key={review.text}>
                <div className={styles.reviewStars} aria-hidden="true">★★★★★</div>
                <p>“{review.text}”</p>
                <footer>
                  <span>{review.author}</span>
                  <strong>{review.branch}</strong>
                </footer>
              </article>
            ))}
          </div>
          <div className={styles.reviewActions}>
            <a
              href={GOOGLE_REVIEW_LINK_TRENCIN}
              target="_blank"
              rel="noreferrer"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {t('home.reviewsTrencinLink')}
            </a>
            <a
              href={GOOGLE_REVIEW_LINK_ZVOLEN}
              target="_blank"
              rel="noreferrer"
              className={`${styles.btn} ${styles.btnDark}`}
            >
              {t('home.reviewsZvolenLink')}
            </a>
          </div>
        </div>
      </section>

      <section className={styles.suppliersSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntroCompact}>
            <p className={styles.sectionKicker}>{t('home.suppliersTitle')}</p>
            <h2>{t('home.suppliersSubtitle')}</h2>
          </div>
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

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaText')}</p>
          <Link to="/quote" className={`${styles.btn} ${styles.btnPrimary}`}>{t('home.getQuote')}</Link>
        </div>
      </section>
    </>
  )
}

export default Home

