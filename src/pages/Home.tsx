import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.css'

const Home = () => {
  const { t } = useTranslation()
  
  return (
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
  )
}

export default Home

