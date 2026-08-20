import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Peekable bottom sheet for compact HUDs (gerrymander, etc.). Portaled to body so fixed positioning is viewport-relative. */
export function BottomSheet({
  open,
  onOpenChange,
  peek,
  title,
  children,
  /** Offset from the viewport bottom (e.g. site bottom nav height). */
  bottomOffset = '0px',
  className,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Always-visible peek row (collapsed summary) */
  peek: ReactNode
  title?: string
  children: ReactNode
  bottomOffset?: string
  className?: string
}) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className={`bottom-sheet ${open ? 'is-open' : 'is-peek'} ${className ?? ''}`.trim()}
      style={{ bottom: bottomOffset }}
    >
      <button
        type="button"
        className="bottom-sheet-peek"
        aria-expanded={open}
        aria-controls={titleId}
        onClick={() => onOpenChange(!open)}
      >
        <span className="bottom-sheet-handle" aria-hidden />
        <span className="bottom-sheet-peek-body">{peek}</span>
      </button>
      <div
        ref={panelRef}
        id={titleId}
        className="bottom-sheet-panel"
        role="region"
        aria-label={title}
        aria-hidden={!open}
      >
        {title && <h3 className="bottom-sheet-title">{title}</h3>}
        <div className="bottom-sheet-content">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
