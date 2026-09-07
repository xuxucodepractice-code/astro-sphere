import { createSignal, createEffect, For, Show, onMount, onCleanup } from "solid-js"
import Fuse from "fuse.js"

type PaletteItem = {
  title: string
  summary: string
  slug: string
  collection: string
  tags: string[]
}

type Props = {
  items: PaletteItem[]
}

const PAGES = [
  { title: "Home", href: "/" },
  { title: "Education", href: "/work" },
  { title: "Writing", href: "/blog" },
  { title: "Research", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Search", href: "/search" },
]

type Result = { title: string; href: string; meta: string }

export default function CommandPalette(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")
  const [active, setActive] = createSignal(0)
  let inputRef: HTMLInputElement | undefined

  const fuse = new Fuse<PaletteItem>(props.items, {
    keys: ["title", "summary", "tags"],
    threshold: 0.4,
    minMatchCharLength: 2,
  })

  const results = (): Result[] => {
    const q = query().trim()
    const pageHits: Result[] = PAGES.filter(
      (p) => !q || p.title.toLowerCase().includes(q.toLowerCase()),
    ).map((p) => ({ title: p.title, href: p.href, meta: "Page" }))

    const entries = q.length < 2
      ? props.items.slice(0, 5)
      : fuse.search(q).slice(0, 7).map((r) => r.item)

    const contentHits: Result[] = entries.map((i) => ({
      title: i.title,
      href: `/${i.collection}/${i.slug}`,
      meta: i.collection === "blog" ? "Post" : "Project",
    }))

    return [...pageHits, ...contentHits].slice(0, 9)
  }

  function navigate(href: string) {
    setOpen(false)
    window.location.href = href
  }

  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()
      setOpen((o) => !o)
      return
    }
    if (!open()) return
    if (e.key === "Escape") setOpen(false)
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results().length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    }
    if (e.key === "Enter") {
      e.preventDefault()
      const r = results()[active()]
      if (r) navigate(r.href)
    }
  }

  onMount(() => document.addEventListener("keydown", onKeydown))
  onCleanup(() => document.removeEventListener("keydown", onKeydown))

  createEffect(() => {
    if (open()) {
      setQuery("")
      setActive(0)
      setTimeout(() => inputRef?.focus(), 10)
    }
  })

  createEffect(() => {
    query()
    setActive(0)
  })

  return (
    <Show when={open()}>
      <div class="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] px-4">
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div class="relative w-full max-w-lg rounded-xl border border-black/15 dark:border-white/20 bg-white dark:bg-[#0B0B0D] shadow-2xl overflow-hidden">
          <div class="flex items-center gap-2 px-4 border-b border-black/10 dark:border-white/15">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 stroke-current opacity-60">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="Search posts, projects, pages..."
              class="w-full bg-transparent py-3 text-sm outline-none placeholder:text-black/40 dark:placeholder:text-white/40 text-black dark:text-white"
            />
            <kbd class="mono-label-plain text-[10px] opacity-50 border rounded px-1.5 py-0.5 border-black/15 dark:border-white/20">
              ESC
            </kbd>
          </div>
          <ul class="max-h-80 overflow-y-auto py-2">
            <For each={results()}>
              {(r, i) => (
                <li>
                  <button
                    onClick={() => navigate(r.href)}
                    onMouseEnter={() => setActive(i())}
                    class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
                    style={
                      i() === active()
                        ? { "background-color": "rgb(var(--accent) / 0.12)" }
                        : {}
                    }
                  >
                    <span class="mono-label-plain text-[10px] w-14 shrink-0 text-accent uppercase">
                      {r.meta}
                    </span>
                    <span class="text-sm truncate text-black dark:text-white">
                      {r.title}
                    </span>
                  </button>
                </li>
              )}
            </For>
            {results().length === 0 && (
              <li class="px-4 py-6 text-sm opacity-60">No results found.</li>
            )}
          </ul>
          <div class="flex items-center gap-4 px-4 py-2 border-t border-black/10 dark:border-white/15 mono-label-plain text-[10px] opacity-50 uppercase">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
            <span class="ml-auto">⌘K</span>
          </div>
        </div>
      </div>
    </Show>
  )
}
