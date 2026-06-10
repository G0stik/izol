import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Poradna.module.css'

interface FaqItem {
  question: string
  answer: string
}

interface IntroCard {
  label: string
  value: string
  text: string
}

interface SourceLink {
  label: string
  href: string
}

const Poradna = () => {
  const { t, i18n } = useTranslation()
  const faqs = t('advice.faqs', { returnObjects: true }) as FaqItem[]
  const introCards = t('advice.introCards', { returnObjects: true }) as IntroCard[]
  const sourceLinks = t('advice.sources.links', { returnObjects: true }) as SourceLink[]
  const language = i18n.language?.startsWith('en') ? 'en' : 'sk'

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.tepelneizolacie.sk/poradna#faq',
    url: 'https://www.tepelneizolacie.sk/poradna',
    name: t('advice.schemaName'),
    inLanguage: language,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <main className={styles.advice}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>{t('advice.heroKicker')}</p>
              <h1>{t('advice.title')}</h1>
              <p>{t('advice.subtitle')}</p>
            </div>
            <aside className={styles.heroPanel}>
              <span>{t('advice.panelLabel')}</span>
              <strong>{t('advice.panelTitle')}</strong>
              <p>{t('advice.panelText')}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            {introCards.map((card) => (
              <article key={card.label}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>{t('advice.faqKicker')}</p>
            <h2>{t('advice.faqTitle')}</h2>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <article className={styles.faqItem} key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sourcesSection}>
        <div className={styles.container}>
          <div>
            <p className={styles.kicker}>{t('advice.sources.kicker')}</p>
            <h2>{t('advice.sources.title')}</h2>
            <p>{t('advice.sources.text')}</p>
          </div>
          <div className={styles.sourceLinks}>
            {sourceLinks.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>{t('advice.ctaTitle')}</h2>
          <p>{t('advice.ctaText')}</p>
          <div className={styles.actions}>
            <Link to="/quote" className={styles.primaryAction}>{t('advice.quoteCta')}</Link>
            <Link to="/products" className={styles.secondaryAction}>{t('advice.productsCta')}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Poradna
