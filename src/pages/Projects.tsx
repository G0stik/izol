import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  const projects: ProjectCardProps[] = [
    {
      title: 'This is sample project',
      description: 'sample description for project',
      tags: ['tag', 'tag2']
    },
  ]

  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{t('projects.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('projects.subtitle')}</p>
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

