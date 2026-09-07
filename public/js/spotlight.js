/* Cursor spotlight: tracks the pointer over .spotlight-card elements
   and exposes --mx / --my CSS variables used by the ::after overlay. */

function initSpotlight() {
  if (window.__spotlightBound) return
  window.__spotlightBound = true

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  document.addEventListener(
    "mousemove",
    (event) => {
      const card = event.target.closest
        ? event.target.closest(".spotlight-card")
        : null
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`)
      card.style.setProperty("--my", `${event.clientY - rect.top}px`)
    },
    { passive: true },
  )
}

document.addEventListener("astro:after-swap", initSpotlight)
initSpotlight()
