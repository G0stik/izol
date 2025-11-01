import { useState, useEffect } from 'react'
import styles from './Gallery.module.css'

const Gallery = () => {
  const galleryImages = [
    '/gallery/lego.jpg',
    '/gallery/lego copy.jpg',
    '/gallery/lego copy 2.jpg',
    '/gallery/lego copy 3.jpg',
    '/gallery/lego copy 4.jpg',
    '/gallery/lego copy 5.jpg',
    '/gallery/lego copy 6.jpg'
  ]

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
    <section className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Gallery</h2>
          <p className={styles.sectionSubtitle}>Our Work in Action</p>
        </div>
        <div className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <div
              key={image}
              className={styles.galleryItem}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className={styles.galleryImage}
              />
            </div>
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
              >
                &times;
              </span>
              <button
                className={styles.navButton}
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                aria-label="Next image"
              >
                &#8250;
              </button>
              <img
                src={galleryImages[selectedImage]}
                alt={`Gallery image ${selectedImage + 1}`}
                className={styles.lightboxImage}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery

