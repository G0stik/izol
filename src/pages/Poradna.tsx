import { Link } from 'react-router-dom'
import styles from './Poradna.module.css'

const faqs = [
  {
    question: 'Aký typ izolácie je vhodný pre rozvody chladu?',
    answer:
      'Pri rozvodoch chladu sa najčastejšie používa uzavretá elastomérová kaučuková izolácia, napríklad K-FLEX. Jej úlohou je obmedziť tepelné zisky, kondenzáciu a pri nízkych teplotách aj tvorbu námrazy. Dôležitý je výber správnej hrúbky, spojov, prestupov a povrchovej úpravy podľa prostredia.'
  },
  {
    question: 'Kedy použiť kaučukovú izoláciu K-FLEX?',
    answer:
      'Kaučukové izolácie K-FLEX sú vhodné najmä pre chladiace rozvody, klimatizáciu, VZT, vykurovanie, solárne okruhy, potrubia, nádrže a technické zariadenia. V praxi sa používajú tam, kde je potrebná kombinácia tepelnej izolácie, parotesnosti, pružnosti a čistého spracovania detailov.'
  },
  {
    question: 'Aký je rozdiel medzi technickou a stavebnou izoláciou?',
    answer:
      'Technická izolácia sa používa na potrubia, VZT rozvody, nádrže, komíny, technologické zariadenia a priemyselné aplikácie. Stavebná izolácia rieši najmä strechy, fasády, priečky, podlahy a obálku budovy. Rozdiel je v teplotnom rozsahu, požiarnej požiadavke, mechanickom zaťažení, povrchovej úprave a spôsobe montáže.'
  },
  {
    question: 'Aké izolácie sú vhodné pre VZT potrubia?',
    answer:
      'Pre VZT potrubia sa používajú materiály podľa účelu rozvodu: kaučukové izolácie pre chladiace a klimatizačné rozvody, minerálna alebo sklenená vlna pre tepelné a akustické požiadavky a špeciálne certifikované systémy pre protipožiarnu ochranu. Pri návrhu je rozhodujúci typ potrubia, teplota média, kondenzácia, akustika a požiarna odolnosť.'
  },
  {
    question: 'Ako sa rieši protipožiarna izolácia VZT?',
    answer:
      'Protipožiarna izolácia VZT sa nerieši len samotnou doskou alebo rohožou. Musí ísť o odskúšaný systém vrátane hrúbky izolácie, kotvenia, spojov, prestupov a spôsobu aplikácie. Systémy pre vzduchotechnické potrubia sa klasifikujú podľa požadovanej požiarnej odolnosti, napríklad EI30, EI60, EI90 alebo EI120.'
  },
  {
    question: 'Čo znamená požiarna odolnosť EI30 až EI240?',
    answer:
      'Označenie EI vyjadruje požiarnu odolnosť prvku z pohľadu celistvosti a tepelnej izolácie počas stanoveného času v minútach. EI30 znamená 30 minút, EI120 znamená 120 minút. Pri VZT a technických rozvodoch treba vždy overiť konkrétny certifikovaný systém, typ potrubia, orientáciu, prestupy a montážne pokyny.'
  },
  {
    question: 'Kedy je vhodná minerálna alebo sklenená vlna?',
    answer:
      'Minerálna a sklenená vlna sú vhodné pre stavebné izolácie, technické rozvody, VZT, akustické riešenia a aplikácie, kde je potrebná nehorľavosť, tvarová stabilita alebo kombinácia tepelnej a zvukovej izolácie. Konkrétny typ závisí od požadovanej pevnosti, objemovej hmotnosti, povrchovej úpravy a požiarnej triedy.'
  },
  {
    question: 'Aké izolácie sa používajú pri vysokých teplotách?',
    answer:
      'Pri vysokých teplotách sa používajú žiaruvzdorné materiály, napríklad keramické vlákna, rohože, dosky alebo tvarovky. Používajú sa pri kotloch, peciach, horákoch, spalinovodoch, komínoch, výmurovkách a priemyselných zariadeniach. Rozhoduje pracovná teplota, chemické prostredie, mechanické namáhanie a bezpečnostné požiadavky.'
  },
  {
    question: 'Kedy použiť žiaruvzdorné materiály UNIFRAX / SIBRAL?',
    answer:
      'Materiály UNIFRAX / SIBRAL sa používajú pri aplikáciách, kde bežné stavebné alebo technické izolácie nestačia teplotným rozsahom. Typické sú pece, kotly, horáky, spalinové cesty, komíny a priemyselné tepelne namáhané časti. Pred výberom je potrebné poznať pracovnú teplotu, typ zariadenia a spôsob uchytenia.'
  },
  {
    question: 'Aké podklady sú potrebné na cenovú ponuku?',
    answer:
      'Na presné nacenenie pomáha výkaz výmer, technická správa, výkresová dokumentácia, typ potrubia alebo konštrukcie, požadovaná hrúbka izolácie, požiarna odolnosť, povrchová úprava, množstvá a termín dodania. Pri nejasnom zadaní vie Izol systém odporučiť vhodnú alternatívu podľa použitia.'
  },
  {
    question: 'Viete odporučiť alternatívu k navrhnutému materiálu?',
    answer:
      'Áno. Pri veľkoobchodnej dodávke je bežné preveriť dostupnosť, technické parametre a cenovú alternatívu. Náhrada však musí rešpektovať požadovanú tepelnú vodivosť, reakciu na oheň, požiarnu odolnosť, teplotný rozsah, parotesnosť a systémové certifikáty, ak sú pre projekt požadované.'
  },
  {
    question: 'Dodávate aj príslušenstvo k izoláciám?',
    answer:
      'Áno. K izoláciám sa dodáva aj príslušenstvo ako lepidlá, čističe, hliníkové, PE, kaučukové a UV stabilné pásky, naváracie tŕne, kotviace prvky, pištole a drobné náradie. Pri technických izoláciách je príslušenstvo dôležité pre správne spracovanie spojov a detailov.'
  },
  {
    question: 'Ako prebieha dodanie materiálu na stavbu?',
    answer:
      'Dodanie závisí od skladovej dostupnosti, objemu objednávky a miesta stavby. Izol systém expeduje materiál zo skladov v Trenčíne a Zvolene a pri väčších dodávkach koordinuje dopravu podľa harmonogramu projektu. Pri časovo citlivých stavbách je vhodné riešiť dostupnosť materiálu vopred.'
  },
  {
    question: 'Pre koho sú služby Izol systému určené?',
    answer:
      'Služby sú určené pre realizačné firmy, montážne spoločnosti, developerov, projektantov, technikov TZB, priemyselné prevádzky, stavebné firmy a nákupné oddelenia, ktoré potrebujú veľkoobchodnú dodávku izolačných materiálov, technické poradenstvo, cenovú ponuku a logistiku.'
  }
]

const sourceLinks = [
  {
    label: 'K-FLEX technické a HVAC izolácie',
    href: 'https://kflex.com/home'
  },
  {
    label: 'ISOVER HVAC fire safety',
    href: 'https://www.isover-technical-insulation.com/hvac-fire-safety'
  },
  {
    label: 'ROCKWOOL fire rated ductwork',
    href: 'https://www.rockwool.com/group/products-and-applications/passive-fire-protection/fire-rated-ductwork/'
  },
  {
    label: 'Knauf Insulation Fire-teK DuctProtect',
    href: 'https://knaufinsulation-ts.com/en-HR/about-us/news/fire-tek-ductprotect-30-120-c-system'
  }
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://www.tepelneizolacie.sk/poradna#faq',
  url: 'https://www.tepelneizolacie.sk/poradna',
  name: 'Poradňa k výberu izolácie',
  inLanguage: 'sk',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

const Poradna = () => (
  <main className={styles.advice}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>Poradňa / výber izolácie</p>
            <h1>Odborné odpovede k technickým a stavebným izoláciám</h1>
            <p>
              Praktické vysvetlenia pre výber materiálu, VZT rozvody, protipožiarne
              systémy, vysoké teploty, príslušenstvo a prípravu cenovej ponuky.
            </p>
          </div>
          <aside className={styles.heroPanel}>
            <span>Izol systém, s.r.o.</span>
            <strong>veľkoobchod / sklad / technické poradenstvo</strong>
            <p>Materiály pre rozvody chladu, VZT, stavby, požiar a priemyselné teploty.</p>
          </aside>
        </div>
      </div>
    </section>

    <section className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.introGrid}>
          <article>
            <span>Rozsah materiálov</span>
            <strong>-260 °C až +1430 °C</strong>
            <p>Kaučuk, minerálna a sklenená vlna, EPS/XPS, protipožiarne a žiaruvzdorné izolácie.</p>
          </article>
          <article>
            <span>Typická podpora</span>
            <strong>výber / alternatíva / dostupnosť</strong>
            <p>Pomoc pri špecifikácii materiálu podľa aplikácie, výkazu výmer a technickej správy.</p>
          </article>
          <article>
            <span>Dodanie</span>
            <strong>Trenčín a Zvolen</strong>
            <p>Skladové zázemie, veľkoobchodné dodávky a koordinácia dopravy na stavbu.</p>
          </article>
        </div>
      </div>
    </section>

    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Časté odborné otázky</p>
          <h2>Výber izolácie podľa použitia</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((faq) => (
            <article className={styles.faqItem} key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.sourcesSection}>
      <div className={styles.container}>
        <div>
          <p className={styles.kicker}>Technické zdroje</p>
          <h2>Výrobcovia a systémové podklady</h2>
          <p>
            Pri protipožiarnych a špeciálnych technických aplikáciách je rozhodujúci
            konkrétny odskúšaný systém, certifikát, montážny postup a projektová požiadavka.
          </p>
        </div>
        <div className={styles.sourceLinks}>
          {sourceLinks.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2>Máte výkaz výmer alebo technické zadanie?</h2>
        <p>
          Pošlite podklady a pripravíme odporúčanie materiálu, dostupnosť a cenovú ponuku.
        </p>
        <div className={styles.actions}>
          <Link to="/quote" className={styles.primaryAction}>Vyžiadať cenovú ponuku</Link>
          <Link to="/products" className={styles.secondaryAction}>Pozrieť produkty</Link>
        </div>
      </div>
    </section>
  </main>
)

export default Poradna
