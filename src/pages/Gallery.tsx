import { useState } from 'react'
import styles from './Gallery.module.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  const galleryItems = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Gallery</h2>
          <p className={styles.sectionSubtitle}>Our Work in Action</p>
        </div>
        <div className={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <div 
              key={item} 
              className={styles.galleryItem}
              onClick={() => setSelectedImage(item)}
            >
              <div className={styles.galleryImagePlaceholder}>
                <span>Project Image {item}</span>
              </div>
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
            <div className={styles.lightboxContent}>
              <span className={styles.closeButton}>&times;</span>
              <div className={styles.lightboxImagePlaceholder}>
                <span>Project Image {selectedImage}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery

