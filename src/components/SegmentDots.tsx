/** Clickable filled/outline dots for staged caption / animation beats. */
export function SegmentDots({
  count,
  index,
  onSelect,
  label,
}: {
  count: number
  index: number
  onSelect: (i: number) => void
  label: string
}) {
  if (count < 2) return null
  return (
    <div className="segment-dots" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`${i + 1} / ${count}`}
          className={`segment-dot ${i === index ? 'is-on' : ''}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  )
}
