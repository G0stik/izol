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
    },

  ]

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{t('about.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('about.subtitle')}</p>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <div className={styles.aboutCard}>
              <h3>{t('about.ourStory')}</h3>
              <p>
                {t('about.ourStoryText')}
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>{t('about.ourMission')}</h3>
              <p>
                {t('about.ourMissionText')}
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>{t('about.ourValues')}</h3>
                <ul className={styles.valuesList}>
                  {(t('about.values', { returnObjects: true }) as string[]).map((value, idx) => (
                    <li key={idx}>{value}</li>
                  ))}
                </ul>
            </div>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>23+</div>
              <div className={styles.statLabel}>{t('about.stats.experience')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>{t('about.stats.projects')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>EU-Wide</div>
              <div className={styles.statLabel}>{t('about.stats.market')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>{t('about.stats.quality')}</div>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className={styles.teamSection}>
          <div className={styles.sectionHeader}>
            <h2>{t('about.meetTeam')}</h2>
            <p className={styles.sectionSubtitle}>{t('about.expertProfessionals')}</p>
          </div>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <TeamCard key={member.email} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

