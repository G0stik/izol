import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Izol systém, s.r.o.</h3>
            <p>23+ years of excellence in thermal insulation solutions across Europe. Established in 2001, based in Trenčín, Slovakia.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/projects">Projects</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/products">Product Catalog</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Connect</h4>
            <ul>
              <li>Email: <a href="mailto:info@tepelneizolacie.sk">info@tepelneizolacie.sk</a></li>
              <li>Phone: <a href="tel:+421903728371">+421 903 728 371</a></li>
              <li><a href="http://www.tepelneizolacie.sk" target="_blank" rel="noopener noreferrer">www.tepelneizolacie.sk</a></li>
              <li><a href="https://www.facebook.com/tepelneizolacie" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Izol systém, s.r.o. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

