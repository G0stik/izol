import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.css'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  const getCurrentLanguage = () => {
    return i18n.language.toUpperCase()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.langBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {getCurrentLanguage()}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={`${styles.dropdownItem} ${i18n.language === 'sk' ? styles.active : ''}`}
            onClick={() => changeLanguage('sk')}
          >
            🇸🇰 SK
          </button>
          <button
            className={`${styles.dropdownItem} ${i18n.language === 'en' ? styles.active : ''}`}
            onClick={() => changeLanguage('en')}
          >
            🇬🇧 EN
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
