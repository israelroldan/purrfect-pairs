const CAT_API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || "DEMO-API-KEY"

export async function fetchCatImages(count: number): Promise<string[]> {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {
      headers: {
        "x-api-key": CAT_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cat images")
    }

    const data = await response.json()
    return data.map((cat: { url: string }) => cat.url)
  } catch (error) {
    console.error("Error fetching cat images:", error)
    // Return an array of placeholder image URLs in case of an error
    return Array(count).fill("/placeholder.svg")
  }
}

