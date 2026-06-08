import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Izol systém, s.r.o.</h3>
            <p>{t('footer.aboutText')}</p>
          </div>
          <div className={styles.footerSection}>
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/products">{t('nav.products')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>{t('nav.services')}</h4>
            <ul>
              <li><Link to="/services">{t('footer.services')}</Link></li>
              <li><Link to="/products">{t('nav.products')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/ai-bridge">AI prehľad</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li>Email: <a href="mailto:info@tepelneizolacie.sk">info@tepelneizolacie.sk</a></li>
              <li>{t('contact.phone')}: <a href="tel:+421903728371">+421 903 728 371</a></li>
              <li><a href="http://www.tepelneizolacie.sk" target="_blank" rel="noopener noreferrer">www.tepelneizolacie.sk</a></li>
              <li><a href="https://www.facebook.com/tepelneizolacie" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

