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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(t('contact.form.successMessage'))
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        alert(t('contact.form.errorMessage') || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('contact.form.errorMessage') || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{t('contact.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('contact.subtitle')}</p>
        </div>
        
        {/* Contact Info Cards */}
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

          {/* Administration */}
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>🏢</div>
            <h3>{t('contact.administration.title')}</h3>
            <p>
              {t('contact.phone')}: <a href={`tel:${t('contact.administration.phone')}`}>{t('contact.administration.phone')}</a><br />
              {t('contact.email')}: <a href={`mailto:${t('contact.administration.email')}`}>{t('contact.administration.email')}</a>
            </p>
          </div>

          {/* Warehouse Trencin */}
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📦</div>
            <h3>{t('contact.warehouseTrencin.title')}</h3>
            <p>
              {t('contact.phone')}: <a href={`tel:${t('contact.warehouseTrencin.phone')}`}>{t('contact.warehouseTrencin.phone')}</a><br />
              {t('contact.email')}: <a href={`mailto:${t('contact.warehouseTrencin.email')}`}>{t('contact.warehouseTrencin.email')}</a>
            </p>
          </div>

          {/* Zvolen Branch */}
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>🏪</div>
            <h3>{t('contact.zvolen.title')}</h3>
            <p>
              <strong>{t('contact.contactPerson')}:</strong> {t('contact.zvolen.contactPerson1')}, {t('contact.zvolen.position1')}<br />
              {t('contact.phone')}: <a href={`tel:${t('contact.zvolen.phone1')}`}>{t('contact.zvolen.phone1')}</a><br />
              {t('contact.email')}: <a href={`mailto:${t('contact.zvolen.email1')}`}>{t('contact.zvolen.email1')}</a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>{t('contact.contactPerson')} 2:</strong> {t('contact.zvolen.contactPerson2')}<br />
              {t('contact.phone')}: <a href={`tel:${t('contact.zvolen.phone2')}`}>{t('contact.zvolen.phone2')}</a>
            </p>
            {t('contact.zvolen.description') && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {t('contact.zvolen.description')}
              </p>
            )}
          </div>
        </div>

        {/* Contact Form */}
        {/*<div className={styles.contactFormWrapper}>
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
              <button 
                type="submit" 
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.form.sending') || 'Sending...' : t('contact.form.sendMessage')}
              </button>
            </form>
          </div>*/}
      </div>
    </section>
  )
}

export default Contact

