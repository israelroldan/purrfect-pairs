export function getBasePath(): string {
  if (typeof window !== "undefined") {
    // Client-side
    const pathname = window.location.pathname
    const basePathMatch = pathname.match(/^\/[^/]+/)
    return basePathMatch ? basePathMatch[0] : ""
  } else {
    // Server-side
    return ""
  }
}

