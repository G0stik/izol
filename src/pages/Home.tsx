import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Professional Thermal Insulation Solutions</h1>
          <p className={styles.heroSubtitle}>23+ Years of Excellence in Energy Efficiency Across Europe</p>
          <p className={styles.heroDescription}>
            Leading wholesale provider of thermal insulation products from Trenčín,
            Slovakia, serving large-scale buildings and construction projects throughout the EU.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>Get Quote</Link>
            <Link to="/products" className={`${styles.btn} ${styles.btnSecondary}`}>Our Products</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

