/* Accent hue switcher
   Persists to localStorage.accent, applied as <html data-accent="...">
   Runs a preload pass immediately (script is loaded in <head>) to avoid FOUC. */

const ACCENT_PRESETS = ["gold", "emerald", "sapphire", "mono"]

function applyAccent(accent) {
  const valid = ACCENT_PRESETS.includes(accent) ? accent : "gold"
  const element = document.documentElement

  if (valid === "gold") {
    element.removeAttribute("data-accent")
  } else {
    element.setAttribute("data-accent", valid)
  }
  localStorage.accent = valid

  document.querySelectorAll(".accent-dot").forEach((dot) => {
    dot.setAttribute("aria-pressed", String(dot.dataset.accentValue === valid))
  })
}

function preloadAccent() {
  const stored = localStorage.accent
  applyAccent(stored || "gold")
}

function initializeAccentDots() {
  document.querySelectorAll(".accent-dot").forEach((dot) => {
    if (dot.dataset.accentBound === "true") return
    dot.dataset.accentBound = "true"
    dot.addEventListener("click", () => applyAccent(dot.dataset.accentValue))
  })
  // re-sync pressed state after view transitions swap the DOM
  applyAccent(localStorage.accent || "gold")
}

document.addEventListener("astro:after-swap", () => {
  preloadAccent()
  initializeAccentDots()
})

window.addEventListener("DOMContentLoaded", initializeAccentDots)

preloadAccent()
