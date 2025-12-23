import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
    alert(t('contact.form.successMessage'))
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
          <h2>{t('contact.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('contact.subtitle')}</p>
        </div>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <a 
              href="https://maps.app.goo.gl/CRpGWZbcAqkfjf7u6" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.contactCard}
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              <div className={styles.contactIcon}>📍</div>
              <h3>{t('contact.address')}</h3>
              <p>
                Izol systém, s.r.o.<br />
                Zlatovská 1292/24<br />
                911 05 Trenčín<br />
                Slovakia
              </p>
            </a>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📞</div>
              <h3>{t('contact.phone')}</h3>
              <p>
                <a href="tel:+421903728371">+421 903 728 371</a>
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>✉️</div>
              <h3>{t('contact.email')}</h3>
              <p>
                <a href="mailto:ondrus@izol-system.sk">ondrus@izol-system.sk</a>
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>⏰</div>
              <h3>{t('contact.businessHours')}</h3>
              <p dangerouslySetInnerHTML={{ __html: t('contact.businessHoursText') }} />
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📱</div>
              <h3>{t('contact.socials')}</h3>
              <div className={styles.socialLinks}>
                <a 
                  href="https://www.facebook.com/tepelneizolacie/?locale=sk_SK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <span className={styles.socialIcon}>📘</span>
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/izolsystem_tepelneizolacie/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <span className={styles.socialIcon}>📷</span>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.contactFormWrapper}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">{t('contact.form.fullName')} *</label>
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
                <label htmlFor="company">{t('contact.form.company')}</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">{t('contact.form.emailAddress')} *</label>
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
                <label htmlFor="phone">{t('contact.form.phoneNumber')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">{t('contact.form.subject')} *</label>
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
                <label htmlFor="message">{t('contact.form.message')} *</label>
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
                {t('contact.form.sendMessage')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

