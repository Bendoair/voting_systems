import { useLayoutEffect, useRef } from 'react'
import { scrollAppToTop } from '../utils/scrollAppToTop'

export type PanelTab<T extends string> = {
  id: T
  label: string
  /** Smaller flex footprint (e.g. secondary Geo tab). */
  narrow?: boolean
}

/** Compact / desktop shared tab strip for viewport panels. */
export function PanelTabs<T extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  tabs: PanelTab<T>[]
  value: T
  onChange: (id: T) => void
  ariaLabel: string
  className?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const prevValue = useRef(value)

  useLayoutEffect(() => {
    if (prevValue.current === value) return
    prevValue.current = value
    scrollAppToTop(listRef.current?.closest('.page') ?? document)
  }, [value])

  return (
    <div
      ref={listRef}
      className={`panel-tabs ${className ?? ''}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          className={`panel-tab ${tab.narrow ? 'is-narrow' : ''} ${value === tab.id ? 'is-active' : ''}`}
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
