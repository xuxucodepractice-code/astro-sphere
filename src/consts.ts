import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Zijian Xu",
  DESCRIPTION: "Academic portfolio of Zijian Xu, an MSc FinTech student at PolyU exploring AI, robotics, agentic AI, and quantitative finance.",
  AUTHOR: "Zijian Xu",
}

// Work Page
export const WORK: Page = {
  TITLE: "Academic Trajectory",
  DESCRIPTION: "Academic background, research preparation, and interdisciplinary training.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Writing",
  DESCRIPTION: "Notes on research, productivity systems, sport, history, and philosophy.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Research & Projects",
  DESCRIPTION: "Selected research proposals and engineering projects across AI, robotics, and quantitative finance.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search posts, projects, and notes by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Education", 
    HREF: "/work", 
  },
  { 
    TEXT: "Writing", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Research", 
    HREF: "/projects", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Personal Email",
    ICON: "email", 
    TEXT: "xuxucodepractice@gmail.com",
    HREF: "mailto:xuxucodepractice@gmail.com",
  },
  { 
    NAME: "PolyU Email",
    ICON: "email",
    TEXT: "25059032g@connect.polyu.hk",
    HREF: "mailto:25059032g@connect.polyu.hk",
  },
  {
    NAME: "GitHub",
    ICON: "github",
    TEXT: "xuxucodepractice-code",
    HREF: "https://github.com/xuxucodepractice-code",
  },
]
