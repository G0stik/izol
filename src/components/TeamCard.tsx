import styles from './TeamCard.module.css'

interface TeamMember {
  name: string
  role: string
  bio: string
  email: string
  phone: string
  city: string
  photo?: string
}

interface TeamCardProps {
  member: TeamMember
}

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className={styles.teamCard}>
      <div className={styles.teamPhoto}>
        {member.photo ? (
          <img src={member.photo} alt={member.name} />
        ) : (
          <span>Photo</span>
        )}
      </div>
      <div className={styles.teamInfo}>
        <h3>{member.name}</h3>
        <p className={styles.teamRole}>{member.role}</p>
        <p className={styles.teamBio}>{member.bio}</p>
        <p className={styles.teamCity}>{member.city}</p>
        <div className={styles.teamContact}>
          {member.email && member.email.trim() !== '' && (
            <a href={`mailto:${member.email}`}>
              <span className={styles.contactIcon}>✉️</span>
              {member.email}
            </a>
          )}
          <a href={`tel:${member.phone}`}>
            <span className={styles.contactIcon}>📞</span>
            {member.phone}
          </a>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
export type { TeamMember }

