// Local Storage Service for Anime Data Management

import { AnimeData } from '../components/Sidebar'

const STORAGE_KEY = 'animeweek_data'
const BACKUP_KEY = 'animeweek_backup'

export interface StorageData {
  animeList: AnimeData[]
  lastUpdated: string
  version: string
}

// Get all anime from localStorage
export const getAnimeFromStorage = (): AnimeData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    
    const parsed: StorageData = JSON.parse(data)
    return parsed.animeList || []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

// Save anime to localStorage
export const saveAnimeToStorage = (animeList: AnimeData[]): boolean => {
  try {
    const data: StorageData = {
      animeList,
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

// Create backup
export const createBackup = (animeList: AnimeData[]): boolean => {
  try {
    const backup: StorageData = {
      animeList,
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    }
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backup))
    return true
  } catch (error) {
    console.error('Error creating backup:', error)
    return false
  }
}

// Restore from backup
export const restoreFromBackup = (): AnimeData[] | null => {
  try {
    const data = localStorage.getItem(BACKUP_KEY)
    if (!data) return null
    
    const parsed: StorageData = JSON.parse(data)
    return parsed.animeList || null
  } catch (error) {
    console.error('Error restoring from backup:', error)
    return null
  }
}

// Export data as JSON file
export const exportToJSON = (animeList: AnimeData[]): void => {
  try {
    const data: StorageData = {
      animeList,
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `animeweek_backup_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting to JSON:', error)
  }
}

// Import data from JSON file
export const importFromJSON = (file: File): Promise<AnimeData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data: StorageData = JSON.parse(content)
        
        // Validate data structure
        if (!data.animeList || !Array.isArray(data.animeList)) {
          throw new Error('Invalid data format')
        }
        
        resolve(data.animeList)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

// Clear all data
export const clearAllData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing data:', error)
    return false
  }
}

// Get storage statistics
export const getStorageStats = (): {
  totalAnime: number
  favorites: number
  byDay: Record<string, number>
} => {
  const animeList = getAnimeFromStorage()
  
  const byDay: Record<string, number> = {}
  animeList.forEach(anime => {
    byDay[anime.day] = (byDay[anime.day] || 0) + 1
  })
  
  return {
    totalAnime: animeList.length,
    favorites: animeList.filter(a => a.isFavorite).length,
    byDay
  }
}
