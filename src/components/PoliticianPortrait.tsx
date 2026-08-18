export type PortraitLook = 'short' | 'ponytail' | 'bun'

function HairCap({ fill }: { fill: string }) {
  return (
    <path
      d="M38 46 C38 24 48 15 60 15 C72 15 82 24 82 46 C78 34 70 27 60 27 C50 27 42 34 38 46 Z"
      fill={fill}
    />
  )
}

/** Square politician silhouette: suit, black tie, circle head, tintable hair. */
export function PoliticianPortrait({
  look,
  suitColor,
  hairColor,
  className,
}: {
  look: PortraitLook
  suitColor: string
  hairColor: string
  className?: string
}) {
  const woman = look !== 'short'

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      role="img"
      aria-hidden
    >
      <rect width="120" height="120" fill="color-mix(in srgb, var(--paper-2) 80%, var(--ink) 8%)" />
      {look === 'ponytail' && (
        <ellipse cx="74" cy="34" rx="9" ry="22" fill={hairColor} />
      )}
      {woman ? (
        <path
          d="M20 118 L20 90 C20 74 30 62 46 60 C52 62 56 70 60 78 C64 70 68 62 74 60 C90 62 100 74 100 90 L100 118 Z"
          fill={suitColor}
        />
      ) : (
        <path
          d="M8 118 L8 78 L36 52 L60 72 L84 52 L112 78 L112 118 Z"
          fill={suitColor}
        />
      )}
      {woman ? (
        <path d="M57.5 72 L62.5 72 L61 80 L65 110 L60 118 L55 110 L59 80 Z" fill="#111" />
      ) : (
        <path d="M57 68 L63 68 L61.5 76 L66 108 L60 118 L54 108 L58.5 76 Z" fill="#111" />
      )}
      <circle cx="60" cy="42" r="22" fill="#e8c4a8" />
      {look === 'short' ? (
        <path
          d="M38 42 C38 24 48 18 60 18 C72 18 82 24 82 42 C78 32 70 28 60 28 C50 28 42 32 38 42 Z"
          fill={hairColor}
        />
      ) : (
        <HairCap fill={hairColor} />
      )}
      {look === 'bun' && <circle cx="60" cy="14" r="10" fill={hairColor} />}
    </svg>
  )
}
