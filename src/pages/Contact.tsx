import { useTranslation } from 'react-i18next'
import styles from './Contact.module.css'

const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.contactIcon}>{children}</div>
)

const MapPinIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M24 6c-6 0-11 4.7-11 11.3 0 8.9 9.4 18.9 10.3 19.8a1 1 0 0 0 1.4 0C25.6 36.2 35 26.2 35 17.3 35 10.7 30 6 24 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="24" cy="18" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  </IconCircle>
)

const PhoneIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M31 6h-7a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M23 12h9m-9 24h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const WarehouseIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M8 36V18l16-6 16 6v18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 26h12v10H18Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 36h24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const ClockIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M24 15v10l7 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const ShareIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M34 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM14 28a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm20 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m18 24 8-5m-8 5 8 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const OfficeIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M12 38V10l12-4 12 4v28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 20h4m-4 6h4m-4 6h4m8-12h-4m4 6h-4m4 6h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 38h24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const BranchIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M10 36V18l14-6 14 6v18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M17 36v-8h6v8m8 0v-6h6v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 36h28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const BookIcon = () => (
  <IconCircle>
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <path
        d="M12 10h16a4 4 0 0 1 4 4v22H16a4 4 0 0 0-4 4V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 34h16a4 4 0 0 1 4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 16h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconCircle>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path
      d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.3-3H14v-2c0-.6.4-1 1-1Z"
      fill="currentColor"
    />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
  </svg>
)

const Contact = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{t('contact.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('contact.subtitle')}</p>
        </div>

        <div className={styles.contactInfo}>
          <a
            href="https://maps.app.goo.gl/CRpGWZbcAqkfjf7u6"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
          >
            <MapPinIcon />
            <h3>{t('contact.address')}</h3>
            <p>
              Izol systém, s.r.o.<br />
              Zlatovská 1292/24<br />
              911 05 Trenčín<br />
              Slovakia
            </p>
          </a>

          <div className={styles.contactCard}>
            <OfficeIcon />
            <h3>{t('contact.trencin.title') || 'Trencin Branch'}</h3>
            <p>
              <strong>{t('contact.trencin.contactPerson1')} , {t('contact.trencin.position1')}</strong><br />
              {t('contact.phone')}: <a href={`tel:${t('contact.trencin.phone1')}`}>{t('contact.trencin.phone1')}</a><br />
              {t('contact.email')}: <a href={`mailto:${t('contact.trencin.email1')}`}>{t('contact.trencin.email1')}</a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>{t('contact.trencin.contactPerson')}, {t('contact.trencin.position')}</strong><br />
              {t('contact.phone')}: <a href={`tel:${t('contact.trencin.phone')}`}>{t('contact.trencin.phone')}</a><br />
              {t('contact.email')}: <a href={`mailto:${t('contact.trencin.email')}`}>{t('contact.trencin.email')}</a>
            </p>
          </div>

          <div className={styles.contactCard}>
            <WarehouseIcon />
            <h3>{t('contact.warehouseTrencin.title')}</h3>
            <p>
              <strong>{t('contact.phone')}</strong>: <a href={`tel:${t('contact.warehouseTrencin.phone')}`}>{t('contact.warehouseTrencin.phone')}</a><br />
              <strong>{t('contact.email')}</strong>: <a href={`mailto:${t('contact.warehouseTrencin.email')}`}>{t('contact.warehouseTrencin.email')}</a>
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/DR2YNSUitmZtxGDE6"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
          >
            <MapPinIcon />
            <h3>Izol systém s.r.o. ZVOLEN</h3>
            <p>
              Izol systém, s.r.o.<br />
              Predmestie 2268/1<br />
              960 01 Zvolen-Tepličky<br />
              Slovakia
            </p>
          </a>

          <div className={styles.contactCard}>
            <OfficeIcon />
            <h3>{t('contact.zvolen.title')}</h3>
            <p>
              <strong>{t('contact.zvolen.contactPerson1')}, {t('contact.zvolen.position1')}</strong><br />
              <strong>{t('contact.phone')} </strong>: <a href={`tel:${t('contact.zvolen.phone1')}`}>{t('contact.zvolen.phone1')}</a><br />
              <strong>{t('contact.email')}</strong>: <a href={`mailto:${t('contact.zvolen.email1')}`}>{t('contact.zvolen.email1')}</a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <strong>{t('contact.zvolen.contactPerson2')}</strong><br />
              <strong>{t('contact.phone')}</strong>: <a href={`tel:${t('contact.zvolen.phone2')}`}>{t('contact.zvolen.phone2')}</a>
            </p>
            {t('contact.zvolen.description') && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {t('contact.zvolen.description')}
              </p>
            )}
          </div>

          <div className={styles.contactCard}>
            <BookIcon />
            <h3>{t('contact.administration.title')}</h3>
            <p>
              <strong>{t('contact.phone')}</strong>: <a href={`tel:${t('contact.administration.phone')}`}>{t('contact.administration.phone')}</a><br />
              <strong>{t('contact.email')}</strong>: <a href={`mailto:${t('contact.administration.email')}`}>{t('contact.administration.email')}</a>
            </p>
          </div>

          <div className={styles.contactCard}>
            <ClockIcon />
            <h3>{t('contact.businessHours')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('contact.businessHoursText') }} />
          </div>

          <div className={styles.contactCard}>
            <ShareIcon />
            <h3>{t('contact.socials')}</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://www.facebook.com/tepelneizolacie/?locale=sk_SK"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <span className={styles.socialIcon} aria-hidden="true">
                  <FacebookIcon />
                </span>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/izolsystem_tepelneizolacie/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <span className={styles.socialIcon} aria-hidden="true">
                  <InstagramIcon />
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
