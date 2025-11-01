import styles from './About.module.css'
import TeamCard, { TeamMember } from '../components/TeamCard'

const teamMembers: TeamMember[] = [
  {
    name: 'Jan Novák',
    role: 'Managing Director',
    bio: 'With over 20 years of experience in the thermal insulation industry, Jan leads our team with expertise in large-scale project management and business development across Europe.',
    email: 'jan.novak@tepelneizolacie.sk',
    phone: '+421 905 123 456'
  },
  {
    name: 'Mária Horváthová',
    role: 'Technical Director',
    bio: 'Mária brings deep technical knowledge in insulation materials and systems. She ensures all projects meet the highest quality standards and EU regulations.',
    email: 'maria.horvathova@tepelneizolacie.sk',
    phone: '+421 905 123 457'
  },
  {
    name: 'Peter Kováč',
    role: 'Sales Manager',
    bio: 'Peter manages our wholesale operations and maintains strong relationships with clients across the European Union, ensuring timely delivery and exceptional service.',
    email: 'peter.kovac@tepelneizolacie.sk',
    phone: '+421 905 123 458'
  },
  {
    name: 'Eva Šimková',
    role: 'Project Coordinator',
    bio: 'Eva coordinates complex projects from initial consultation to final delivery, ensuring smooth logistics and communication with all stakeholders.',
    email: 'eva.simkova@tepelneizolacie.sk',
    phone: '+421 905 123 459'
  }
]

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>About Izol systém, s.r.o.</h2>
          <p className={styles.sectionSubtitle}>Trusted Partner in Thermal Insulation Since 2001</p>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <div className={styles.aboutCard}>
              <h3>Our Story</h3>
              <p>
                Established in 2001, Izol systém, s.r.o. has been a leader in providing comprehensive thermal insulation solutions for over 23 years. Based in Trenčín, Slovakia, we have established ourselves as a premier wholesale supplier of thermal insulation solutions across the European Union. We specialize in providing high-quality insulation products from leading manufacturers such as ISOVER, K-FLEX, UNIFRAX, ROCKWOOL, and KNAUF INSULATION for large-scale commercial and residential construction projects.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>Our Mission</h3>
              <p>
                To deliver superior thermal insulation solutions that enhance energy efficiency, reduce environmental impact, and provide long-lasting value to our clients throughout Europe.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>Our Values</h3>
              <ul>
                <li>Quality & Excellence</li>
                <li>Sustainability & Innovation</li>
                <li>Customer-Centric Approach</li>
                <li>EU-Wide Distribution Network</li>
              </ul>
            </div>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>23+</div>
              <div className={styles.statLabel}>Years of Experience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Projects Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>EU-Wide</div>
              <div className={styles.statLabel}>Market Presence</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Quality Guaranteed</div>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className={styles.teamSection}>
          <div className={styles.sectionHeader}>
            <h2>Meet the Team</h2>
            <p className={styles.sectionSubtitle}>Our Expert Professionals</p>
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

