import { REGIONS } from '../data/counties'
import { dietFromStepIndex, dietStepIndex, dietTone } from '../data/diet'
import { useI18n } from '../i18n'

export function GeographyEditor({
  baselines,
  polarization,
  onBaselinesChange,
  onPolarizationChange,
  onReset,
}: {
  baselines: Record<string, number>
  polarization: number
  onBaselinesChange: (next: Record<string, number>) => void
  onPolarizationChange: (v: number) => void
  onReset: () => void
}) {
  const { t, locale } = useI18n()

  function setBaseline(id: string, step: number) {
    onBaselinesChange({ ...baselines, [id]: dietFromStepIndex(step) })
  }

  return (
    <div className="geography-editor">
      <div className="geo-toolbar">
        <button type="button" className="btn ghost geo-reset" onClick={onReset}>
          {t('sim.resetGeo')}
        </button>
      </div>
      <p className="muted geo-note">{t('sim.geographyNote')}</p>
      <label className="field">
        {t('sim.polarization')}: {Math.round(polarization * 100)}%
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(polarization * 100)}
          onChange={(e) => onPolarizationChange(Number(e.target.value) / 100)}
        />
      </label>
      <ul className="county-baseline-list">
        {REGIONS.map((r) => {
          const v = baselines[r.id] ?? r.dietBaseline
          const tone = dietTone(v)
          return (
            <li key={r.id} className="county-baseline">
              <div className="county-baseline-top">
                <span className="county-name" title={locale === 'hu' ? r.nameHu : r.nameEn}>
                  {locale === 'hu' ? r.nameHu : r.nameEn}
                </span>
                <span className="county-tone muted">{t(`sim.diet.${tone}`)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={4}
                step={1}
                value={dietStepIndex(v)}
                onChange={(e) => setBaseline(r.id, Number(e.target.value))}
                aria-label={t('sim.countyDiet')}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
