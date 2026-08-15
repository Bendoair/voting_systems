import type { Party } from '../engines/types'
import { normalizeVotePercents, setPartyVotePercent } from '../data/defaultParties'
import { dietFromStepIndex, dietStepIndex, dietTone } from '../data/diet'
import { useI18n } from '../i18n'

/** Pool of fruit parties for “Add party” — first unused wins. */
export const FRUIT_PRESETS = [
  { fruit: '🍋‍🟩', color: '#2E7D32', nameHu: 'Lime', nameEn: 'Lime', dietLean: 0 },
  { fruit: '🍌', color: '#E6B800', nameHu: 'Banán', nameEn: 'Banana', dietLean: 0.5 },
  { fruit: '🍇', color: '#6A1B9A', nameHu: 'Szőlő', nameEn: 'Grape', dietLean: -0.5 },
  { fruit: '🍊', color: '#EF6C00', nameHu: 'Narancs', nameEn: 'Orange', dietLean: -1 },
  { fruit: '🍎', color: '#C62828', nameHu: 'Alma', nameEn: 'Apple', dietLean: 1 },
  { fruit: '🫐', color: '#1565C0', nameHu: 'Áfonya', nameEn: 'Blueberry', dietLean: 0.5 },
  { fruit: '🍑', color: '#EC407A', nameHu: 'Barack', nameEn: 'Peach', dietLean: 0 },
  { fruit: '🍒', color: '#AD1457', nameHu: 'Cseresznye', nameEn: 'Cherry', dietLean: 1 },
  { fruit: '🍐', color: '#9CCC65', nameHu: 'Körte', nameEn: 'Pear', dietLean: -0.5 },
  { fruit: '🥝', color: '#558B2F', nameHu: 'Kivi', nameEn: 'Kiwi', dietLean: 0.5 },
  { fruit: '🍉', color: '#43A047', nameHu: 'Dinnye', nameEn: 'Watermelon', dietLean: -1 },
  { fruit: '🍓', color: '#D32F2F', nameHu: 'Eper', nameEn: 'Strawberry', dietLean: 1 },
  { fruit: '🍍', color: '#F9A825', nameHu: 'Ananász', nameEn: 'Pineapple', dietLean: 0 },
  { fruit: '🥥', color: '#6D4C41', nameHu: 'Kókusz', nameEn: 'Coconut', dietLean: -1 },
  { fruit: '🍈', color: '#AED581', nameHu: 'Sárgadinnye', nameEn: 'Melon', dietLean: -0.5 },
  { fruit: '🥭', color: '#FB8C00', nameHu: 'Mangó', nameEn: 'Mango', dietLean: 0.5 },
  { fruit: '🫒', color: '#827717', nameHu: 'Olíva', nameEn: 'Olive', dietLean: -0.5 },
  { fruit: '🍅', color: '#E53935', nameHu: 'Paradicsom', nameEn: 'Tomato', dietLean: 0 },
] as const

function pickUnusedPreset(parties: Party[]) {
  const usedFruit = new Set(parties.map((p) => p.fruit))
  const usedNames = new Set(parties.map((p) => p.name.toLowerCase()))
  const fresh = FRUIT_PRESETS.find(
    (p) =>
      !usedFruit.has(p.fruit) &&
      !usedNames.has(p.nameEn.toLowerCase()) &&
      !usedNames.has(p.nameHu.toLowerCase()),
  )
  if (fresh) return fresh
  // All presets taken — still add a numbered clone of a cycling fruit
  const base = FRUIT_PRESETS[parties.length % FRUIT_PRESETS.length]!
  return {
    ...base,
    nameHu: `${base.nameHu} ${parties.length + 1}`,
    nameEn: `${base.nameEn} ${parties.length + 1}`,
  }
}

export function PartyEditor({
  parties,
  onChange,
  onReset,
}: {
  parties: Party[]
  onChange: (parties: Party[]) => void
  onReset?: () => void
}) {
  const { t, locale } = useI18n()
  const total = parties.reduce((a, p) => a + p.popularity, 0)
  const remaining = 100 - total

  function updateMeta(
    id: string,
    patch: Partial<Pick<Party, 'name' | 'color' | 'dietLean'>>,
  ) {
    onChange(parties.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function setVotes(id: string, value: number) {
    onChange(setPartyVotePercent(parties, id, value))
  }

  function remove(id: string) {
    if (parties.length < 2) return
    onChange(parties.filter((p) => p.id !== id))
  }

  function add() {
    const preset = pickUnusedPreset(parties)
    const id = `party-${Date.now()}`
    onChange([
      {
        id,
        name: locale === 'en' ? preset.nameEn : preset.nameHu,
        color: preset.color,
        fruit: preset.fruit,
        popularity: Math.max(0, Math.min(20, remaining > 0 ? remaining : 0)),
        dietLean: preset.dietLean,
      },
      ...parties,
    ])
  }

  function proportionalize() {
    onChange(normalizeVotePercents(parties))
  }

  return (
    <div className="party-editor">
      <div className="party-editor-head">
        <h3>{t('sim.parties')}</h3>
        <div className="party-editor-actions">
          {onReset && (
            <button
              type="button"
              className="btn ghost icon-btn"
              onClick={onReset}
              aria-label={t('sim.reset')}
              title={t('sim.reset')}
            >
              <span aria-hidden>↻</span>
            </button>
          )}
          <button type="button" className="btn ghost" onClick={add}>
            {t('sim.addParty')}
          </button>
        </div>
      </div>
      <div className="vote-budget">
        <p className="muted vote-sum">
          {t('sim.voteSum')}: <strong>{total}%</strong>
          {' · '}
          {remaining >= 0 ? (
            <>
              {t('sim.voteRemaining')}: <strong>{remaining}%</strong>
            </>
          ) : (
            <>
              {t('sim.voteOver')}: <strong>{Math.abs(remaining)}%</strong>
            </>
          )}
        </p>
        <button type="button" className="btn" onClick={proportionalize} disabled={total <= 0}>
          {t('sim.proportionalize')}
        </button>
      </div>
      <ul className="party-list">
        {parties.map((p) => {
          const lean = p.dietLean ?? 0
          const tone = dietTone(lean)
          return (
            <li key={p.id} className="party-card" style={{ borderColor: p.color }}>
              <div className="party-card-top">
                <span className="fruit">{p.fruit}</span>
                <input
                  className="party-name"
                  value={p.name}
                  onChange={(e) => updateMeta(p.id, { name: e.target.value })}
                  aria-label={t('sim.partyName')}
                />
                <input
                  type="color"
                  value={p.color}
                  onChange={(e) => updateMeta(p.id, { color: e.target.value })}
                  aria-label={t('sim.partyColor')}
                />
                <button type="button" className="btn danger" onClick={() => remove(p.id)}>
                  {t('sim.remove')}
                </button>
              </div>
              <label>
                {t('sim.voteShare')}: {p.popularity}%
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={p.popularity}
                  onChange={(e) => setVotes(p.id, Number(e.target.value))}
                />
              </label>
              <label>
                {t('sim.dietLean')}: {t(`sim.diet.${tone}`)}
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={dietStepIndex(lean)}
                  onChange={(e) =>
                    updateMeta(p.id, { dietLean: dietFromStepIndex(Number(e.target.value)) })
                  }
                />
                <span className="axis-ends muted">
                  <span>{t('sim.diet.meat')}</span>
                  <span>{t('sim.diet.plant')}</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
