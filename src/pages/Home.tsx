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

const Home = () => {
  const { t } = useTranslation()

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
      </section>
      <section className={styles.suppliersSection}>
        <div className={styles.container}>
          <div className={styles.suppliersMarquee} aria-label="Supplier logos">
            <div className={styles.suppliersTrack}>
              <div className={styles.logoRow}>
                {supplierLogos.map((supplier) => (
                  <img
                    key={supplier.src}
                    className={styles.supplierLogo}
                    src={supplier.src}
                    alt={supplier.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <div className={styles.logoRow} aria-hidden="true">
                {supplierLogos.map((supplier) => (
                  <img
                    key={`${supplier.src}-duplicate`}
                    className={styles.supplierLogo}
                    src={supplier.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

