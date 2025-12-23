import { useTranslation } from 'react-i18next'
import styles from './Services.module.css'

interface ServiceCardProps {
  title: string
  description: string
}

const ServiceCard = ({ title, description }: ServiceCardProps) => (
  <div className={styles.serviceCard}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
)

const Services = () => {
  const { t } = useTranslation()

  const services: ServiceCardProps[] = [
    {
      title: t('services.wholesale.title'),
      description: t('services.wholesale.description')
    },
    {
      title: t('services.consultation.title'),
      description: t('services.consultation.description')
    },
    {
      title: t('services.custom.title'),
      description: t('services.custom.description')
    },
    {
      title: t('services.logistics.title'),
      description: t('services.logistics.description')
    }
  ]

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{t('services.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('services.subtitle')}</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

