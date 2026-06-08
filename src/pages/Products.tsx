import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Products.module.css'

interface ProductCardProps {
  icon: JSX.Element
  title: string
  description: string
  items: string[]
}

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.iconCircle}>{children}</div>
)

const FanIcon = () => (
  <IconWrap>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path d="M23.5 24.5c-3.5-.4-6.5-3.6-6.5-7.3C17 12.9 21 11 24 11s7 1.9 7 6.2c0 3.7-3 6.9-6.5 7.3M24 25.5v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15.5 28.5c-3 1.8-7 .7-8.8-2.2-1.8-2.9-.6-6.9 3.1-8.9 3.2-1.8 7.7-.9 9.8 2M19.5 26l7 4.1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32.6 28.5c2.9 1.8 7 .7 8.8-2.2 1.8-2.9.6-6.9-3.1-8.9-3.2-1.8-7.7-.9-9.8 2M28.5 26l-7 4.1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.2" fill="currentColor" />
    </svg>
  </IconWrap>
)

const FlameIcon = () => (
  <IconWrap>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path d="M24 8c2.5 4.4 3.5 7.5 3 10-1 5-7 5-6 12 .5 4 3.5 7 8 7 4.4 0 8-3.7 8-9.5C37 16.5 29 12.5 24 8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 19c-6 4-8 8.3-8 13.2C12 37.3 17 41 22.5 41 15.5 30.5 25 27 20 19Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconWrap>
)

const BuildingIcon = () => (
  <IconWrap>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path d="M12 40V12l12-5 12 5v28H12Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 22h-4m4 6h-4m4 6h-4m12-12h-4m4 6h-4m4 6h-4M24 7v8m-6 25h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconWrap>
)

const ShieldIcon = () => (
  <IconWrap>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path d="M24 42c-8-3.5-12-8.4-12-14.7V12l12-4 12 4v15.3C36 33.6 32 38.5 24 42Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 21v11m0-11c2.5 0 4.5-2 4.5-4.5S26.5 12 24 12s-4.5 2-4.5 4.5S21.5 21 24 21Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconWrap>
)

const ProductCard = ({ icon, title, description, items }: ProductCardProps) => (
  <article className={styles.productCard}>
    <div className={styles.productIcon}>{icon}</div>
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </article>
)

const Products = () => {
  const { t } = useTranslation()

  const products: ProductCardProps[] = [
    {
      icon: <FanIcon />,
      title: t('products.kflex.title'),
      description: t('products.kflex.description'),
      items: [
        t('products.kflex.items.hvac'),
        t('products.kflex.items.duct'),
        t('products.kflex.items.alclad'),
        t('products.kflex.items.twinSolar')
      ]
    },
    {
      icon: <FlameIcon />,
      title: t('products.refractory.title'),
      description: t('products.refractory.description'),
      items: [
        t('products.refractory.items.flues'),
        t('products.refractory.items.furnaces'),
        t('products.refractory.items.industry')
      ]
    },
    {
      icon: <BuildingIcon />,
      title: t('products.building.title'),
      description: t('products.building.description'),
      items: [
        t('products.building.items.eps'),
        t('products.building.items.mineralWool'),
        t('products.building.items.systems')
      ]
    },
    {
      icon: <ShieldIcon />,
      title: t('products.technical.title'),
      description: t('products.technical.description'),
      items: [
        t('products.technical.items.fire'),
        t('products.technical.items.polyethylene'),
        t('products.technical.items.accessories')
      ]
    }
  ]

  return (
    <main className={styles.products}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>{t('products.heroKicker')}</p>
              <h1>{t('products.title')}</h1>
              <p>{t('products.subtitle')}</p>
              <div className={styles.heroActions}>
                <Link to="/contact" className={styles.primaryAction}>{t('products.quoteCta')}</Link>
                <Link to="/services" className={styles.secondaryAction}>{t('products.servicesCta')}</Link>
              </div>
            </div>
            <div className={styles.heroPanel}>
              <span>{t('products.heroPanelLabel')}</span>
              <strong>{t('products.heroPanelTitle')}</strong>
              <p>{t('products.heroPanelText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t('products.portfolioKicker')}</p>
            <h2>{t('products.portfolioTitle')}</h2>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.materialBand}>
        <div className={styles.container}>
          <article>
            <span>{t('products.tempLabel')}</span>
            <strong>{t('products.tempRange')}</strong>
          </article>
          <article>
            <span>{t('products.brandsLabel')}</span>
            <strong>{t('products.brands')}</strong>
          </article>
          <article>
            <span>{t('products.availabilityLabel')}</span>
            <strong>{t('products.warehouses')}</strong>
          </article>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>{t('products.ctaTitle')}</h2>
          <p>{t('products.ctaText')}</p>
          <Link to="/contact" className={styles.primaryAction}>{t('products.contactSales')}</Link>
        </div>
      </section>
    </main>
  )
}

export default Products
