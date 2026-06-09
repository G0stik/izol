import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Services.module.css'

interface ServiceCardProps {
  title: string
  description: string
  label: string
}

const ServiceCard = ({ title, description, label }: ServiceCardProps) => (
  <article className={styles.serviceCard}>
    <span>{label}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
)

const Services = () => {
  const { t } = useTranslation()

  const services: ServiceCardProps[] = [
    {
      label: t('services.labels.0'),
      title: t('services.wholesale.title'),
      description: t('services.wholesale.description')
    },
    {
      label: t('services.labels.1'),
      title: t('services.consultation.title'),
      description: t('services.consultation.description')
    },
    {
      label: t('services.labels.2'),
      title: t('services.custom.title'),
      description: t('services.custom.description')
    },
    {
      label: t('services.labels.3'),
      title: t('services.logistics.title'),
      description: t('services.logistics.description')
    }
  ]

  const process = t('services.process', { returnObjects: true }) as string[]
  const focusItems = t('services.focus', { returnObjects: true }) as Array<{
    title: string
    text: string
  }>

  return (
    <main className={styles.services}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>{t('services.heroKicker')}</p>
              <h1>{t('services.title')}</h1>
              <p>{t('services.subtitle')}</p>
              <div className={styles.heroActions}>
                <Link to="/quote" className={styles.primaryAction}>{t('services.quoteCta')}</Link>
                <Link to="/products" className={styles.secondaryAction}>{t('services.productsCta')}</Link>
              </div>
            </div>
            <div className={styles.heroPanel}>
              <span>{t('services.panelLabel')}</span>
              <strong>{t('services.panelRange')}</strong>
              <p>{t('services.panelText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t('services.sectionKicker')}</p>
            <h2>{t('services.sectionTitle')}</h2>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processMedia}>
            <img src="/gallery/sklad1.jpeg" alt={t('services.processImageAlt')} />
          </div>
          <div className={styles.processContent}>
            <p className={styles.kicker}>{t('services.processKicker')}</p>
            <h2>{t('services.processTitle')}</h2>
            <ol>
              {process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.focusSection}>
        <div className={styles.container}>
          <div className={styles.focusGrid}>
            {focusItems.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>{t('services.ctaTitle')}</h2>
          <p>{t('services.ctaText')}</p>
          <Link to="/quote" className={styles.primaryAction}>{t('services.contactSales')}</Link>
        </div>
      </section>
    </main>
  )
}

export default Services
