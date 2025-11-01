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
  const products: ProductCardProps[] = [
    {
      icon: '🏗️',
      title: 'Wall Insulation',
      description: 'High-performance insulation materials for exterior and interior walls, ensuring optimal thermal efficiency. Products from leading manufacturers including ISOVER, ROCKWOOL, and KNAUF INSULATION.',
      items: ['EPS (Expanded Polystyrene)', 'XPS (Extruded Polystyrene)', 'Mineral Wool']
    },
    {
      icon: '🏠',
      title: 'Roof Insulation',
      description: 'Comprehensive roofing insulation solutions designed for maximum energy savings and durability.',
      items: ['PIR Insulation Boards', 'Polyurethane Foam', 'Reflective Insulation']
    },
    {
      icon: '📐',
      title: 'Floor Insulation',
      description: 'Advanced floor insulation systems for ground floors, suspended floors, and basements.',
      items: ['Rigid Foam Boards', 'Underfloor Heating Insulation', 'Acoustic Insulation']
    },
    {
      icon: '🔧',
      title: 'Specialty Insulation',
      description: 'Customized insulation solutions for industrial applications and specialized construction needs. Featuring products from K-FLEX, UNIFRAX, and other premium manufacturers.',
      items: ['Industrial Insulation', 'Pipe Insulation (K-FLEX)', 'Fire-Resistant Solutions (UNIFRAX)']
    }
  ]

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Our Products</h2>
          <p className={styles.sectionSubtitle}>Premium Thermal Insulation Solutions for Every Project</p>
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

