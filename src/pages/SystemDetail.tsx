import { Link, useParams } from 'react-router-dom'
import { SYSTEMS } from '../data/systems'
import { SYSTEM_EXAMPLES } from '../data/systemExamples'
import type { SystemId } from '../engines/types'
import { ProsCons } from '../components/ProsCons'
import { useI18n } from '../i18n'

function paras(text: string) {
  return text.split('\n\n').filter(Boolean)
}

export function SystemDetail() {
  const { id } = useParams()
  const { t, locale } = useI18n()
  const meta = SYSTEMS.find((s) => s.id === id)

  if (!meta) {
    return (
      <div className="page">
        <p>Not found</p>
        <Link to="/systems">{t('systems.back')}</Link>
      </div>
    )
  }

  const sid = meta.id as SystemId
  const examples = SYSTEM_EXAMPLES[sid] ?? []

  return (
    <div className="page system-detail">
      <Link to="/systems" className="back-link">
        ← {t('systems.back')}
      </Link>
      <header className="page-head">
        <h1>{t(`sys.${sid}.name`)}</h1>
        <p className="summary">{t(`sys.${sid}.summary`)}</p>
      </header>
      <div className="rationale">
        {paras(t(`sys.${sid}.rationale`)).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <ProsCons id={sid} />

      <section className="examples-block">
        <h3>{t('systems.examples')}</h3>
        <ul className="wiki-list">
          {examples.map((ex) => {
            const title = locale === 'hu' ? ex.titleHu : ex.titleEn
            const href = locale === 'hu' && ex.wikiHu ? ex.wikiHu : ex.wikiEn
            return (
              <li key={ex.wikiEn}>
                <a href={href} target="_blank" rel="noreferrer">
                  {title}
                </a>
                {locale === 'hu' && ex.wikiHu && (
                  <>
                    {' · '}
                    <a href={ex.wikiEn} target="_blank" rel="noreferrer">
                      EN
                    </a>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <Link className="btn primary" to={`/simulate?system=${sid}`}>
        {t('systems.simulate')}
      </Link>
    </div>
  )
}
