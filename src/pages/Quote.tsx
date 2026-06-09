import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Quote.module.css'

interface QuoteFormState {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  material: string
  quantity: string
  deadline: string
  message: string
  consent: boolean
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const initialFormState: QuoteFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  material: '',
  quantity: '',
  deadline: '',
  message: '',
  consent: false
}

const Quote = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState<QuoteFormState>(initialFormState)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (field: keyof QuoteFormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          subject: form.subject || t('quote.defaultSubject'),
          material: form.material,
          quantity: form.quantity,
          deadline: form.deadline,
          message: form.message
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const apiMessage =
          typeof errorData?.message === 'string'
            ? errorData.message
            : typeof errorData?.error === 'string'
              ? errorData.error
              : `HTTP ${response.status}`
        throw new Error(apiMessage)
      }

      setSubmitState('success')
      setForm(initialFormState)
    } catch (error) {
      setSubmitState('error')
      const details = error instanceof Error ? ` (${error.message})` : ''
      setErrorMessage(`${t('quote.errorMessage')}${details}`)
    }
  }

  return (
    <main className={styles.quote}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>{t('quote.heroKicker')}</p>
              <h1>{t('quote.title')}</h1>
              <p>{t('quote.subtitle')}</p>
            </div>
            <aside className={styles.heroPanel}>
              <span>{t('quote.panelLabel')}</span>
              <strong>{t('quote.panelTitle')}</strong>
              <p>{t('quote.panelText')}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formLayout}>
            <form className={styles.quoteForm} onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <p className={styles.kicker}>{t('quote.formKicker')}</p>
                <h2>{t('quote.formTitle')}</h2>
              </div>

              <div className={styles.formGrid}>
                <label>
                  <span>{t('quote.fields.name')} *</span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label>
                  <span>{t('quote.fields.company')}</span>
                  <input
                    value={form.company}
                    onChange={(event) => updateField('company', event.target.value)}
                    autoComplete="organization"
                  />
                </label>
                <label>
                  <span>{t('quote.fields.email')} *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  <span>{t('quote.fields.phone')} *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label>
                  <span>{t('quote.fields.subject')}</span>
                  <input
                    value={form.subject}
                    onChange={(event) => updateField('subject', event.target.value)}
                    placeholder={t('quote.placeholders.subject')}
                  />
                </label>
                <label>
                  <span>{t('quote.fields.deadline')}</span>
                  <input
                    value={form.deadline}
                    onChange={(event) => updateField('deadline', event.target.value)}
                    placeholder={t('quote.placeholders.deadline')}
                  />
                </label>
                <label>
                  <span>{t('quote.fields.material')}</span>
                  <input
                    value={form.material}
                    onChange={(event) => updateField('material', event.target.value)}
                    placeholder={t('quote.placeholders.material')}
                  />
                </label>
                <label>
                  <span>{t('quote.fields.quantity')}</span>
                  <input
                    value={form.quantity}
                    onChange={(event) => updateField('quantity', event.target.value)}
                    placeholder={t('quote.placeholders.quantity')}
                  />
                </label>
              </div>

              <label className={styles.fullField}>
                <span>{t('quote.fields.message')} *</span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder={t('quote.placeholders.message')}
                  rows={7}
                  required
                />
              </label>

              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => updateField('consent', event.target.checked)}
                  required
                />
                <span>{t('quote.consent')}</span>
              </label>

              {submitState === 'success' && (
                <div className={styles.successMessage} role="status">
                  <strong>{t('quote.successTitle')}</strong>
                  <p>{t('quote.successMessage')}</p>
                </div>
              )}

              {submitState === 'error' && (
                <div className={styles.errorMessage} role="alert">
                  {errorMessage}
                </div>
              )}

              <div className={styles.formActions}>
                <button type="submit" disabled={submitState === 'sending'}>
                  {submitState === 'sending' ? t('quote.sending') : t('quote.submit')}
                </button>
                <Link to="/contact">{t('quote.contactAlternative')}</Link>
              </div>
            </form>

            <aside className={styles.contactCard}>
              <p className={styles.kicker}>{t('quote.contactCard.kicker')}</p>
              <h2>{t('quote.contactCard.title')}</h2>
              <div className={styles.contactList}>
                <p>
                  <span>{t('quote.contactCard.nameLabel')}</span>
                  <strong>Izol systém, s.r.o.</strong>
                </p>
                <p>
                  <span>{t('quote.contactCard.emailLabel')}</span>
                  <a href="mailto:info@izol-system.sk">info@izol-system.sk</a>
                </p>
                <p>
                  <span>{t('quote.contactCard.phoneLabel')}</span>
                  <a href="tel:+421903728371">+421 903 728 371</a>
                </p>
                <p>
                  <span>{t('quote.contactCard.salesLabel')}</span>
                  <a href="tel:+421903770121">+421 903 770 121</a>
                </p>
                <p>
                  <span>{t('quote.contactCard.addressLabel')}</span>
                  <strong>Zlatovská 1292/24, 911 05 Trenčín</strong>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Quote
