import { useTranslation } from 'react-i18next'
import styles from './Products.module.css'

interface ProductCardProps {
  icon: string
  title: string
  description: string
  items: string[]
}

const ProductCard = ({ icon, title, description, items }: ProductCardProps) => (
  <div className={styles.productCard}>
    <div className={styles.productIcon}>{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)

const Products = () => {
  const { t } = useTranslation()

  const products: ProductCardProps[] = [
    {
      icon: '🏗️',
      title: t('products.wallInsulation.title'),
      description: t('products.wallInsulation.description'),
      items: [
        t('products.wallInsulation.items.eps'),
        t('products.wallInsulation.items.xps'),
        t('products.wallInsulation.items.mineralWool')
      ]
    },
    {
      icon: '🏠',
      title: t('products.roofInsulation.title'),
      description: t('products.roofInsulation.description'),
      items: [
        t('products.roofInsulation.items.pir'),
        t('products.roofInsulation.items.polyurethane'),
        t('products.roofInsulation.items.reflective')
      ]
    },
    {
      icon: '📐',
      title: t('products.floorInsulation.title'),
      description: t('products.floorInsulation.description'),
      items: [
        t('products.floorInsulation.items.rigid'),
        t('products.floorInsulation.items.underfloor'),
        t('products.floorInsulation.items.acoustic')
      ]
    },
    {
      icon: '🔧',
      title: t('products.specialtyInsulation.title'),
      description: t('products.specialtyInsulation.description'),
      items: [
        t('products.specialtyInsulation.items.industrial'),
        t('products.specialtyInsulation.items.pipe'),
        t('products.specialtyInsulation.items.fireResistant')
      ]
    }
  ]

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{t('products.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('products.subtitle')}</p>
        </div>
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products

