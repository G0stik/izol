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
  const services: ServiceCardProps[] = [
    {
      title: 'Wholesale Distribution',
      description: 'Bulk supply of thermal insulation materials for large-scale construction projects across the EU.'
    },
    {
      title: 'Technical Consultation',
      description: 'Expert advice on material selection, installation methods, and thermal performance optimization.'
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored insulation packages designed to meet specific project requirements and building codes.'
    },
    {
      title: 'Logistics Support',
      description: 'Efficient delivery and logistics coordination throughout the European Union.'
    }
  ]

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Our Services</h2>
          <p className={styles.sectionSubtitle}>Comprehensive Wholesale Solutions for Construction Professionals</p>
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

