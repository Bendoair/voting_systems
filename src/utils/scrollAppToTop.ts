/** Reset window + compact panel scroll (route changes, panel tabs). */
export function scrollAppToTop(root: ParentNode = document) {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  root.querySelectorAll('.compact-panel').forEach((el) => {
    ;(el as HTMLElement).scrollTop = 0
  })
}
