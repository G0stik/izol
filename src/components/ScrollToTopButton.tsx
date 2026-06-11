import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ScrollToTopButton.module.css'

const VISIBILITY_OFFSET = 420

const ScrollToTopButton = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > VISIBILITY_OFFSET)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }

  return (
    <button
      type="button"
      className={`${styles.scrollButton} ${isVisible ? styles.visible : ''}`}
      onClick={handleClick}
      aria-label={t('common.scrollToTop')}
      title={t('common.scrollToTop')}
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}

export default ScrollToTopButton
