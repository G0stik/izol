import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Gallery.module.css'

const Gallery = () => {
  const { t } = useTranslation()
  // Dynamically import all images from the gallery folder
  const imageModules = import.meta.glob('/public/gallery/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default'
  })
  const galleryImages = Object.values(imageModules)
    .map((url) => String(url).replace('/public/', '/'))
    .sort()

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const goToPrevious = () => {
    if (selectedImage !== null) {
      const prevIndex = selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      setSelectedImage(prevIndex)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      const nextIndex = selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      setSelectedImage(nextIndex)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (selectedImage !== null) {
          const prevIndex = selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
          setSelectedImage(prevIndex)
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (selectedImage !== null) {
          const nextIndex = selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
          setSelectedImage(nextIndex)
        }
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, galleryImages.length])

  return (
    <main className={styles.gallery}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>{t('gallery.heroKicker')}</p>
          <h1>{t('gallery.title')}</h1>
          <p>{t('gallery.subtitle')}</p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t('gallery.sectionKicker')}</p>
            <h2>{t('gallery.sectionTitle')}</h2>
          </div>
          <div className={styles.galleryGrid}>
            {galleryImages.map((image, index) => (
              <button
                key={image}
                className={`${styles.galleryItem} ${index === 0 ? styles.featuredItem : ''}`}
                onClick={() => setSelectedImage(index)}
                type="button"
              >
                <img
                  src={image}
                  alt={`${t('gallery.imageAlt')} ${index + 1}`}
                  className={styles.galleryImage}
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          {selectedImage !== null && (
            <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
              <div
                className={styles.lightboxContent}
                onClick={(e) => e.stopPropagation()}
              >
                <span
                  className={styles.closeButton}
                  onClick={() => setSelectedImage(null)}
                  role="button"
                  aria-label={t('gallery.closeGallery')}
                >
                  &times;
                </span>
                <button
                  className={styles.navButton}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  aria-label={t('gallery.previousImage')}
                >
                  &#8249;
                </button>
                <button
                  className={`${styles.navButton} ${styles.navButtonNext}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  aria-label={t('gallery.nextImage')}
                >
                  &#8250;
                </button>
                <img
                  src={galleryImages[selectedImage]}
                  alt={`${t('gallery.imageAlt')} ${selectedImage + 1}`}
                  className={styles.lightboxImage}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Gallery

