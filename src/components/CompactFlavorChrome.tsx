import { useEffect, useRef, type ReactNode } from 'react'
import { useI18n } from '../i18n'

export function CompactFlavorChrome({
  flavorOpen,
  rulesOpen,
  onOpenFlavor,
  onOpenRules,
  onCloseFlavor,
  rulesLabel,
  closeLabel,
  children,
}: {
  flavorOpen: boolean
  rulesOpen: boolean
  onOpenFlavor: () => void
  onOpenRules: () => void
  onCloseFlavor: () => void
  rulesLabel: string
  closeLabel: string
  children: ReactNode
}) {
  const { t } = useI18n()
  const flavorDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = flavorDialogRef.current
    if (!el) return
    if (flavorOpen) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [flavorOpen])

  return (
    <>
      <div className="gerry-compact-links">
        <button
          type="button"
          className="gerry-rules-btn"
          onClick={onOpenFlavor}
          aria-haspopup="dialog"
          aria-expanded={flavorOpen}
        >
          <span className="gerry-rules-info is-star" aria-hidden>
            ★
          </span>
          {t('compact.ex.flavorLink')}
        </button>
        <button
          type="button"
          className="gerry-rules-btn"
          onClick={onOpenRules}
          aria-haspopup="dialog"
          aria-expanded={rulesOpen}
        >
          <span className="gerry-rules-info" aria-hidden>
            i
          </span>
          {rulesLabel}
        </button>
      </div>
      <dialog
        ref={flavorDialogRef}
        className="gerry-rules-dialog"
        onClose={onCloseFlavor}
        onClick={(e) => {
          if (e.target === e.currentTarget) onCloseFlavor()
        }}
      >
        <div className="gerry-rules-panel">
          <header className="gerry-rules-panel-head">
            <h2>{t('compact.ex.flavorLink')}</h2>
            <button
              type="button"
              className="btn ghost"
              onClick={onCloseFlavor}
              aria-label={closeLabel}
            >
              ×
            </button>
          </header>
          <div className="gerry-brief gerry-flavor-copy">{children}</div>
        </div>
      </dialog>
    </>
  )
}
