import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Navigation.module.css'

const Navigation = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.navBrand}>
          <img src="/logo.png" alt="logo" className={styles.logo} />
        </Link>
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          <li>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.about')}
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`${styles.navLink} ${isActive('/products') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.products')}
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`${styles.navLink} ${isActive('/services') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.services')}
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.projects')}
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className={`${styles.navLink} ${isActive('/gallery') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.gallery')}
            </Link>
          </li>
          <li>
            <Link
              to="/poradna"
              className={`${styles.navLink} ${isActive('/poradna') || isActive('/faq') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.advice')}
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {t('nav.contact')}
            </Link>
          </li>
        </ul>
        <div className={styles.navRight}>
          <LanguageSwitcher />
          <div
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

