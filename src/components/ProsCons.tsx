import type { SystemId } from '../engines/types'
import { useI18n } from '../i18n'

function paras(text: string) {
  return text.split('\n\n').filter(Boolean)
}

export function ProsCons({ id }: { id: SystemId }) {
  const { t } = useI18n()
  const prefix = `sys.${id}`

  return (
    <div className="pros-cons">
      <section>
        <h3>{t('systems.pros')}</h3>
        {paras(t(`${prefix}.pros`)).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
      <section>
        <h3>{t('systems.cons')}</h3>
        {paras(t(`${prefix}.cons`)).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
      <section className="when-block">
        <h3>{t('systems.when')}</h3>
        {paras(t(`${prefix}.when`)).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
    </div>
  )
}
