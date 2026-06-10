import { ChangeEvent, FormEvent, useRef, useState } from 'react'
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
type EncodedAttachment = {
  name: string
  type: string
  size: number
  content: string
}

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

const MAX_ATTACHMENT_COUNT = 5
const MAX_ATTACHMENT_TOTAL_SIZE = 3 * 1024 * 1024

const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${Math.max(1, Math.round(size / 1024))} kB`
}

const encodeFile = (file: File) =>
  new Promise<EncodedAttachment>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      const content = result.includes(',') ? result.split(',')[1] : result
      resolve({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        content
      })
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const Quote = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState<QuoteFormState>(initialFormState)
  const [attachments, setAttachments] = useState<File[]>([])
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const attachmentTotalSize = attachments.reduce((sum, file) => sum + file.size, 0)

  const updateField = (field: keyof QuoteFormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? [])
    const nextFiles = selectedFiles.slice(0, MAX_ATTACHMENT_COUNT)
    const nextSize = nextFiles.reduce((sum, file) => sum + file.size, 0)

    setAttachments(nextFiles)

    if (selectedFiles.length > MAX_ATTACHMENT_COUNT) {
      setSubmitState('error')
      setErrorMessage(t('quote.attachment.tooMany'))
      return
    }

    if (nextSize > MAX_ATTACHMENT_TOTAL_SIZE) {
      setSubmitState('error')
      setErrorMessage(t('quote.attachment.tooLarge'))
      return
    }

    if (submitState === 'error') {
      setSubmitState('idle')
      setErrorMessage('')
    }
  }

  const clearAttachments = () => {
    setAttachments([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('sending')
    setErrorMessage('')

    try {
      if (attachmentTotalSize > MAX_ATTACHMENT_TOTAL_SIZE) {
        throw new Error(t('quote.attachment.tooLarge'))
      }

      const encodedAttachments = await Promise.all(attachments.map(encodeFile))

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
          message: form.message,
          attachments: encodedAttachments
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
      clearAttachments()
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

              <label className={styles.fullField}>
                <span>{t('quote.fields.attachments')}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleAttachmentChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.txt"
                />
                <small className={styles.fieldHint}>
                  {t('quote.attachment.hint')}
                </small>
              </label>

              {attachments.length > 0 && (
                <div className={styles.attachmentList}>
                  <div>
                    <strong>{t('quote.attachment.selected')}</strong>
                    <span>
                      {attachments.length} / {MAX_ATTACHMENT_COUNT} · {formatFileSize(attachmentTotalSize)}
                    </span>
                  </div>
                  <ul>
                    {attachments.map((file) => (
                      <li key={`${file.name}-${file.size}`}>
                        <span>{file.name}</span>
                        <small>{formatFileSize(file.size)}</small>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={clearAttachments}>
                    {t('quote.attachment.clear')}
                  </button>
                </div>
              )}

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
