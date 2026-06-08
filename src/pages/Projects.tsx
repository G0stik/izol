import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Projects.module.css'

type ProjectLanguage = 'sk' | 'en'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
}

interface ProjectCardData extends ProjectCardProps {
  slug: string
}

interface ProjectCardViewProps extends ProjectCardProps {
  slug: string
  index: number
  isExpanded: boolean
  onImageClick?: () => void
  onToggleDescription: () => void
  showLessLabel: string
  showMoreLabel: string
}

interface ProjectTextData {
  text: string
  tags: string[]
}

interface ProjectDefinition {
  slug: string
  title: Record<ProjectLanguage, string>
}

const PROJECT_DEFINITIONS: ProjectDefinition[] = [
  {
    slug: 'project1',
    title: {
      sk: 'JURKOVIČOVA TEPLÁREŇ',
      en: 'JURKOVIC HEATING PLANT'
    }
  },
  {
    slug: 'project2',
    title: {
      sk: 'ZUCKERMANDEL',
      en: 'ZUCKERMANDEL'
    }
  },
  {
    slug: 'project3',
    title: {
      sk: 'KLINGERKA',
      en: 'KLINGERKA'
    }
  },
  {
    slug: 'project4',
    title: {
      sk: 'IKEA INDUSTRY MALACKY',
      en: 'IKEA INDUSTRY MALACKY'
    }
  },
  {
    slug: 'project5',
    title: {
      sk: 'NEMOCNICA NOVEJ GENERÁCIE',
      en: 'NEW GENERATION HOSPITAL'
    }
  },
  {
    slug: 'project6',
    title: {
      sk: 'KONSTRUKTORSKA BUSINESS CENTER ',
      en: 'KONSTRUKTORSKA BUSINESS CENTER'
    }
  },
  {
    slug: 'project7',
    title: {
      sk: 'GDANSKI BUSINESS CENTER I',
      en: 'GDANSKI BUSINESS CENTER I'
    }
  }
]

const imageModules = import.meta.glob('/public/projects/*/*.{jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const projectImages = Object.entries(imageModules).reduce<Record<string, string[]>>(
  (acc, [path, url]) => {
    const match = path.match(/\/public\/projects\/([^/]+)\//)
    if (!match) return acc
    const slug = match[1]
    const publicPath = String(url).replace('/public/', '/')
    if (!acc[slug]) acc[slug] = []
    acc[slug].push(publicPath)
    return acc
  },
  {}
)

Object.values(projectImages).forEach((images) => images.sort())

const getLanguage = (language: string | undefined): ProjectLanguage =>
  language?.toLowerCase().startsWith('sk') ? 'sk' : 'en'

const TAG_REGEX = /#[A-Za-z0-9_-]+/g
const MENTION_REGEX = /@[A-Za-z0-9_-]+/g

const normalizeTags = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return []

  const unique = new Set<string>()
  const normalized: string[] = []

  for (const tag of tags) {
    if (typeof tag !== 'string') continue
    const cleaned = tag.replace(/^#+/, '').trim()
    if (!cleaned) continue
    const key = cleaned.toLowerCase()
    if (unique.has(key)) continue
    unique.add(key)
    normalized.push(cleaned)
  }

  return normalized
}

const normalizeProjectData = (data: unknown): ProjectTextData => {
  if (!data || typeof data !== 'object') {
    return { text: '', tags: [] }
  }

  const record = data as { text?: unknown; tags?: unknown }
  const text = typeof record.text === 'string' ? record.text.trim() : ''
  const tags = normalizeTags(record.tags)

  return { text, tags }
}

const parseProjectText = (text: string): ProjectTextData => {
  const tags = normalizeTags(
    (text.match(TAG_REGEX) ?? []).map((tag) => tag.slice(1))
  )
  let cleaned = text.replace(/\r\n/g, '\n')
  const trailingTagBlock = cleaned.match(
    /(?:\s+#[A-Za-z0-9_-]+)+\s*(?:@[A-Za-z0-9_-]+)?\s*$/
  )

  if (trailingTagBlock && typeof trailingTagBlock.index === 'number') {
    cleaned = cleaned.slice(0, trailingTagBlock.index).trimEnd()
  }

  cleaned = cleaned.replace(MENTION_REGEX, '')
  cleaned = cleaned.replace(TAG_REGEX, (match) => match.slice(1))
  cleaned = cleaned.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n')
  cleaned = cleaned.replace(/[ \t]{2,}/g, ' ').trim()

  return { text: cleaned, tags }
}

const loadProjectData = async (
  slug: string,
  language: ProjectLanguage
): Promise<ProjectTextData> => {
  const localizedJsonPath =
    language === 'en' ? `/projects/${slug}/text.en.json` : `/projects/${slug}/text.json`
  const fallbackJsonPath = `/projects/${slug}/text.json`

  const jsonResponse = await fetch(localizedJsonPath)
  if (jsonResponse.ok) {
    try {
      const data = await jsonResponse.json()
      return normalizeProjectData(data)
    } catch (error) {
      // Fall back to text files if JSON parsing fails.
    }
  }

  if (localizedJsonPath !== fallbackJsonPath) {
    const fallbackResponse = await fetch(fallbackJsonPath)
    if (fallbackResponse.ok) {
      try {
        const data = await fallbackResponse.json()
        return normalizeProjectData(data)
      } catch (error) {
        // Fall back to text files if JSON parsing fails.
      }
    }
  }

  const localizedTextPath =
    language === 'en' ? `/projects/${slug}/text.en.txt` : `/projects/${slug}/text.txt`
  const fallbackTextPath = `/projects/${slug}/text.txt`

  const textResponse = await fetch(localizedTextPath)
  if (textResponse.ok) {
    return parseProjectText(await textResponse.text())
  }

  if (localizedTextPath !== fallbackTextPath) {
    const fallbackResponse = await fetch(fallbackTextPath)
    if (fallbackResponse.ok) {
      return parseProjectText(await fallbackResponse.text())
    }
  }

  return { text: '', tags: [] }
}

const buildBaseProjects = (language: ProjectLanguage): ProjectCardData[] =>
  PROJECT_DEFINITIONS.map((project) => ({
    slug: project.slug,
    title: project.title[language],
    description: '',
    tags: [],
    image: projectImages[project.slug]?.[0]
  }))

const ProjectCard = ({
  index,
  title,
  description,
  tags,
  image,
  isExpanded,
  onImageClick,
  onToggleDescription,
  showLessLabel,
  showMoreLabel
}: ProjectCardViewProps) => {
  const imageClassName = onImageClick
    ? `${styles.projectImage} ${styles.projectImageInteractive}`
    : styles.projectImage
  const canExpand = description.length > 260
  const descriptionClassName = canExpand && !isExpanded
    ? `${styles.projectDescription} ${styles.projectDescriptionCollapsed}`
    : styles.projectDescription

  return (
    <article className={styles.projectCard}>
      <div
        className={imageClassName}
        onClick={onImageClick}
        role={onImageClick ? 'button' : undefined}
        tabIndex={onImageClick ? 0 : undefined}
        onKeyDown={(event) => {
          if (!onImageClick) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onImageClick()
          }
        }}
        aria-label={onImageClick ? `${title} gallery` : undefined}
      >
        {image ? (
          <img src={image} alt={title} loading={index < 3 ? 'eager' : 'lazy'} />
        ) : (
          <span className={styles.projectImageFallback}>{title}</span>
        )}
      </div>
      <div className={styles.projectInfo}>
        <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
        <h3>{title}</h3>
        {description && <p className={descriptionClassName}>{description}</p>}
        {canExpand && (
          <button
            type="button"
            className={styles.descriptionToggle}
            onClick={onToggleDescription}
            aria-expanded={isExpanded}
          >
            {isExpanded ? showLessLabel : showMoreLabel}
          </button>
        )}
        {tags.length > 0 && (
          <div className={styles.projectTags}>
            {tags.map((tag, index) => (
              <span key={`${tag}-${index}`}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

const Projects = () => {
  const { t, i18n } = useTranslation()
  const language = getLanguage(i18n.resolvedLanguage ?? i18n.language)
  const [projects, setProjects] = useState<ProjectCardData[]>(() =>
    buildBaseProjects(language)
  )
  const [activeLightbox, setActiveLightbox] = useState<{
    slug: string
    index: number
  } | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    let isActive = true
    setProjects(buildBaseProjects(language))
    setExpandedProjects(new Set())

    const loadProjects = async () => {
      const loadedProjects = await Promise.all(
        PROJECT_DEFINITIONS.map(async (project) => {
          const { text, tags } = await loadProjectData(project.slug, language)

          return {
            slug: project.slug,
            title: project.title[language],
            description: text,
            tags,
            image: projectImages[project.slug]?.[0]
          }
        })
      )

      if (isActive) {
        setProjects(loadedProjects)
      }
    }

    loadProjects()

    return () => {
      isActive = false
    }
  }, [language])

  useEffect(() => {
    if (!activeLightbox) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveLightbox(null)
        return
      }

      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return
      }

      event.preventDefault()
      setActiveLightbox((current) => {
        if (!current) return current
        const images = projectImages[current.slug] ?? []
        if (images.length === 0) return current
        const delta = event.key === 'ArrowLeft' ? -1 : 1
        const nextIndex = (current.index + delta + images.length) % images.length
        return { ...current, index: nextIndex }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeLightbox])

  const openLightbox = (slug: string, index = 0) => {
    const images = projectImages[slug] ?? []
    if (images.length === 0) return
    setActiveLightbox({ slug, index })
  }

  const toggleProjectDescription = (slug: string) => {
    setExpandedProjects((current) => {
      const next = new Set(current)

      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }

      return next
    })
  }

  const closeLightbox = () => setActiveLightbox(null)

  const goToPrevious = () => {
    setActiveLightbox((current) => {
      if (!current) return current
      const images = projectImages[current.slug] ?? []
      if (images.length === 0) return current
      const prevIndex = current.index === 0 ? images.length - 1 : current.index - 1
      return { ...current, index: prevIndex }
    })
  }

  const goToNext = () => {
    setActiveLightbox((current) => {
      if (!current) return current
      const images = projectImages[current.slug] ?? []
      if (images.length === 0) return current
      const nextIndex = current.index === images.length - 1 ? 0 : current.index + 1
      return { ...current, index: nextIndex }
    })
  }

  const activeImages = activeLightbox ? projectImages[activeLightbox.slug] ?? [] : []
  const activeTitle = activeLightbox
    ? projects.find((project) => project.slug === activeLightbox.slug)?.title ?? ''
    : ''
  const showMoreLabel = t('projects.showMore')
  const showLessLabel = t('projects.showLess')

  return (
    <main className={styles.projects}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>{t('projects.heroKicker')}</p>
          <h1>{t('projects.title')}</h1>
          <p>{t('projects.subtitle')}</p>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t('projects.sectionKicker')}</p>
            <h2>{t('projects.sectionTitle')}</h2>
          </div>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              index={index}
              {...project}
              isExpanded={expandedProjects.has(project.slug)}
              onToggleDescription={() => toggleProjectDescription(project.slug)}
              showLessLabel={showLessLabel}
              showMoreLabel={showMoreLabel}
              onImageClick={
                (projectImages[project.slug] ?? []).length > 0
                  ? () => openLightbox(project.slug)
                  : undefined
              }
            />
          ))}
        </div>
        </div>
      </section>
        {activeLightbox && activeImages.length > 0 && (
          <div className={styles.lightbox} onClick={closeLightbox}>
            <div
              className={styles.lightboxContent}
              onClick={(event) => event.stopPropagation()}
            >
              <span
                className={styles.closeButton}
                onClick={closeLightbox}
                role="button"
                aria-label="Close gallery"
              >
                &times;
              </span>
              {activeImages.length > 1 && (
                <>
                  <button
                    className={styles.navButton}
                    onClick={(event) => {
                      event.stopPropagation()
                      goToPrevious()
                    }}
                    aria-label={t('gallery.previousImage')}
                  >
                    &#8249;
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.navButtonNext}`}
                    onClick={(event) => {
                      event.stopPropagation()
                      goToNext()
                    }}
                    aria-label={t('gallery.nextImage')}
                  >
                    &#8250;
                  </button>
                </>
              )}
              <img
                src={activeImages[activeLightbox.index]}
                alt={
                  activeTitle
                    ? `${activeTitle} photo ${activeLightbox.index + 1}`
                    : `Project photo ${activeLightbox.index + 1}`
                }
                className={styles.lightboxImage}
              />
            </div>
          </div>
        )}
    </main>
  )
}

export default Projects
