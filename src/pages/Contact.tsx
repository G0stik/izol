import { useState, FormEvent } from 'react'
import styles from './Contact.module.css'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Contact Us</h2>
          <p className={styles.sectionSubtitle}>Get in Touch for Your Thermal Insulation Needs</p>
        </div>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📍</div>
              <h3>Address</h3>
              <p>
                Izol systém, s.r.o.<br />
                Zlatovská 1292/24<br />
                911 05 Trenčín<br />
                Slovakia
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📞</div>
              <h3>Phone</h3>
              <p>
                <a href="tel:+421327441266">+421 32 744 12 66</a>
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>✉️</div>
              <h3>Email</h3>
              <p>
                <a href="mailto:info@tepelneizolacie.sk">info@tepelneizolacie.sk</a>
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>⏰</div>
              <h3>Business Hours</h3>
              <p>
                Monday - Friday: 08:00 - 16:00<br />
                Saturday - Sunday: Closed
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>🌐</div>
              <h3>Website</h3>
              <p>
                <a href="http://www.tepelneizolacie.sk" target="_blank" rel="noopener noreferrer">
                  www.tepelneizolacie.sk
                </a>
              </p>
            </div>
          </div>
          <div className={styles.contactFormWrapper}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

