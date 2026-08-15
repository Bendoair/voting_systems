/** Pixel-art salamander as SVG rects — colors via currentColor / CSS vars. */
export function SalamanderPixel({ className }: { className?: string }) {
  // Grid units; drawn left→right facing right
  const px = (
    cells: [number, number][],
    fill: string,
  ) =>
    cells.map(([x, y], i) => (
      <rect key={`${fill}-${i}-${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
    ))

  // Body / legs / tail (main)
  const body: [number, number][] = [
    // head
    [3, 3], [4, 3], [5, 3],
    [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
    [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],
    // torso
    [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
    [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
    [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    [7, 9], [8, 9], [9, 9], [10, 9], [11, 9],
    // hips → tail
    [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
    [10, 11], [11, 11], [12, 11], [13, 11],
    [12, 12], [13, 12], [14, 12],
    [13, 13], [14, 13], [15, 13],
    [14, 14], [15, 14],
    [15, 15], [16, 15],
    [16, 16],
    // front legs
    [3, 6], [2, 7], [1, 8],
    [7, 5], [8, 4], [9, 3],
    // back legs
    [9, 11], [8, 12], [7, 13],
    [12, 9], [13, 8], [14, 7],
  ]

  const belly: [number, number][] = [
    [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [11, 11], [13, 12],
  ]

  const spots: [number, number][] = [
    [3, 4], [5, 5], [7, 7], [9, 8], [10, 10], [12, 11], [14, 13],
  ]

  const eye: [number, number][] = [[5, 3]]

  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      width="180"
      height="180"
      role="img"
      aria-hidden
      shapeRendering="crispEdges"
    >
      <g className="salamander-body">{px(body, 'currentColor')}</g>
      <g className="salamander-belly">{px(belly, 'var(--salamander-belly, #e8c9a0)')}</g>
      <g className="salamander-spots">{px(spots, 'var(--salamander-spot, #5c3317)')}</g>
      <g className="salamander-eye">{px(eye, 'var(--salamander-eye, #1c1914)')}</g>
    </svg>
  )
}
