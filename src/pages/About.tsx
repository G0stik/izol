import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './About.module.css'
import TeamCard, { TeamMember } from '../components/TeamCard'

const About = () => {
  const { t } = useTranslation()

  const teamMembers: TeamMember[] = [
    {
      name: 'Juraj Ondruš',
      role: t('about.team.director'),
      bio: t('about.team.directorBio'),
      email: 'ondrus@izol-system.sk',
      phone: '+421 903 728 371',
      city: 'Trenčín'
    },
    {
      name: 'Zuzana Masáriková',
      role: t('about.team.salesManager'),
      bio: t('about.team.salesBio'),
      email: 'masarikova@izol-system.sk',
      phone: '+421 903 770 121',
      city: 'Trenčín'
    },
    {
      name: 'Ing. Robert Sokolík',
      role: t('about.team.branchManager'),
      bio: t('about.team.branchManagerBio'),
      email: 'sokolik@izol-system.sk',
      phone: '+421 918 344 816',
      city: 'Zvolen'
    },
    {
      name: 'Ing. Miriam Sokolíková',
      role: t('about.team.branchManager'),
      bio: t('about.team.branchManagerBio2'),
      email: '',
      phone: '+421 903 722 075',
      city: 'Zvolen'
    }
  ]

  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>{t('about.heroKicker')}</p>
              <h1>{t('about.title')}</h1>
              <p>{t('about.subtitle')}</p>
              <div className={styles.heroActions}>
                <Link to="/projects" className={styles.primaryAction}>{t('about.referencesCta')}</Link>
                <Link to="/contact" className={styles.secondaryAction}>{t('about.contactCta')}</Link>
              </div>
            </div>
            <div className={styles.heroPanel}>
              <span>{t('about.profileLabel')}</span>
              <strong>{t('about.profileTitle')}</strong>
              <p>{t('about.profileText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsBand}>
        <div className={styles.container}>
          <article>
            <strong>23+</strong>
            <span>{t('about.stats.experience')}</span>
          </article>
          <article>
            <strong>500+</strong>
            <span>{t('about.stats.projects')}</span>
          </article>
          <article>
            <strong>EU</strong>
            <span>{t('about.stats.market')}</span>
          </article>
          <article>
            <strong>K-FLEX</strong>
            <span>{t('about.kflexImporter')}</span>
          </article>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyMedia}>
            <img src="/gallery/sklad.jpeg" alt={t('about.storyImageAlt')} />
          </div>
          <div className={styles.storyContent}>
            <p className={styles.kicker}>{t('about.storyKicker')}</p>
            <article>
              <h2>{t('about.ourStory')}</h2>
              <p>{t('about.ourStoryText')}</p>
            </article>
            <article>
              <h2>{t('about.ourMission')}</h2>
              <p>{t('about.ourMissionText')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t('about.ourValues')}</p>
            <h2>{t('about.valuesTitle')}</h2>
          </div>
          <div className={styles.valuesGrid}>
            {(t('about.values', { returnObjects: true }) as string[]).map((value, idx) => (
              <article key={value}>
                <span>{String(idx + 1).padStart(2, '0')}</span>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>{t('about.meetTeam')}</p>
            <h2>{t('about.expertProfessionals')}</h2>
          </div>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <TeamCard key={`${member.name}-${member.phone}`} member={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
