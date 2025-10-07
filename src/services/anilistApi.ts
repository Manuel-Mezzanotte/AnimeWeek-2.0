// AniList GraphQL API Service

const ANILIST_API_URL = 'https://graphql.anilist.co'

export interface AniListAnime {
  id: number
  title: {
    romaji: string
    english: string | null
    native: string
  }
  coverImage: {
    extraLarge: string
    large: string
    medium: string
  }
  genres: string[]
  format: string
  status: string
  description: string
  averageScore: number | null
}

export interface SeasonalAnime {
  id: number
  title: {
    romaji: string
    english: string | null
    native: string
  }
  coverImage: {
    extraLarge: string
    large: string
    medium: string
  }
  genres: string[]
  format: string
  status: string
  episodes: number | null
  nextAiringEpisode: {
    airingAt: number
    episode: number
  } | null
}

interface AniListResponse {
  data: {
    Page: {
      media: AniListAnime[]
    }
  }
}

// Search anime by title
export const searchAnime = async (query: string): Promise<AniListAnime[]> => {
  if (!query || query.trim().length < 2) {
    return []
  }

  const graphqlQuery = `
    query ($search: String) {
      Page(page: 1, perPage: 10) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
          }
          genres
          format
          status
          description
          averageScore
        }
      }
    }
  `

  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { search: query }
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: AniListResponse = await response.json()
    return data.data.Page.media
  } catch (error) {
    console.error('Error fetching anime from AniList:', error)
    return []
  }
}

// Get anime by ID
export const getAnimeById = async (id: number): Promise<AniListAnime | null> => {
  const graphqlQuery = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        genres
        format
        status
        description
        averageScore
      }
    }
  `

  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { id }
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data.Media
  } catch (error) {
    console.error('Error fetching anime by ID from AniList:', error)
    return null
  }
}

// Helper: Get preferred title (English > Romaji > Native)
export const getPreferredTitle = (anime: AniListAnime): string => {
  return anime.title.english || anime.title.romaji || anime.title.native
}

// Helper: Clean HTML from description
export const cleanDescription = (description: string | null): string => {
  if (!description) return ''
  return description.replace(/<[^>]*>/g, '').substring(0, 200)
}

// Get seasonal anime (current season)
export const getSeasonalAnime = async (season: string, year: number): Promise<SeasonalAnime[]> => {
  const graphqlQuery = `
    query ($season: MediaSeason, $year: Int, $page: Int) {
      Page(page: $page, perPage: 50) {
        pageInfo {
          hasNextPage
        }
        media(
          season: $season, 
          seasonYear: $year, 
          type: ANIME, 
          format_in: [TV, TV_SHORT, ONA, MOVIE, SPECIAL],
          sort: POPULARITY_DESC
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
          }
          genres
          format
          status
          episodes
          nextAiringEpisode {
            airingAt
            episode
          }
        }
      }
    }
  `

  try {
    let allAnime: SeasonalAnime[] = []
    let currentPage = 1
    let hasNextPage = true

    // Fetch up to 2 pages (100 anime) to match Anilist results
    while (hasNextPage && currentPage <= 2) {
      const response = await fetch(ANILIST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: { season, year, page: currentPage }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const pageAnime = data.data.Page.media
      allAnime = [...allAnime, ...pageAnime]
      
      hasNextPage = data.data.Page.pageInfo.hasNextPage
      currentPage++

      // Add small delay to respect rate limits
      if (hasNextPage && currentPage <= 2) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    return allAnime
  } catch (error) {
    console.error('Error fetching seasonal anime from AniList:', error)
    return []
  }
}

