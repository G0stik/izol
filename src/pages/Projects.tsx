import styles from './Projects.module.css'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
}

const ProjectCard = ({ title, description, tags }: ProjectCardProps) => (
  <div className={styles.projectCard}>
    <div className={styles.projectImagePlaceholder}>
      <span>{title.split(',')[0]}</span>
    </div>
    <div className={styles.projectInfo}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.projectTags}>
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
)

const Projects = () => {
  const projects: ProjectCardProps[] = [
    {
      title: 'Modern Office Complex, Germany',
      description: 'Complete thermal insulation solution for a 50,000 m² commercial building.',
      tags: ['Wall Insulation', 'Roof Insulation']
    },
    {
      title: 'Residential Tower, France',
      description: 'Energy-efficient insulation for 300-unit residential development.',
      tags: ['Complete Solution', 'EU Standards']
    },
    {
      title: 'Industrial Warehouse, Poland',
      description: 'Specialized insulation for temperature-controlled storage facility.',
      tags: ['Industrial', 'Custom Solution']
    },
    {
      title: 'Public Hospital, Czech Republic',
      description: 'High-performance insulation meeting healthcare facility requirements.',
      tags: ['Fire-Resistant', 'Specialty']
    }
  ]

  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Our Projects</h2>
          <p className={styles.sectionSubtitle}>Successful Insulation Solutions Across Europe</p>
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

