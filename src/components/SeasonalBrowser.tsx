import React, { useState, useEffect } from 'react'
import { X, Check, Loader, Sparkles, Calendar, Clock } from 'lucide-react'
import { getSeasonalAnime, SeasonalAnime } from '../services/anilistApi'
import { AnimeData } from './Sidebar'
import styles from '../styles/SeasonalBrowser.module.css'

interface SeasonalBrowserProps {
  isOpen: boolean
  onClose: () => void
  onImport: (animeList: AnimeData[]) => void
  existingAnime: AnimeData[]
}

const SeasonalBrowser: React.FC<SeasonalBrowserProps> = ({ 
  isOpen, 
  onClose, 
  onImport,
  existingAnime
}) => {
  const [seasonalAnime, setSeasonalAnime] = useState<SeasonalAnime[]>([])
  const [selectedAnime, setSelectedAnime] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [currentSeason, setCurrentSeason] = useState({ season: '', year: 0 })

  // Get current season (official anime seasons)
  const getCurrentSeason = () => {
    const now = new Date()
    const month = now.getMonth() + 1 // 1-12
    const year = now.getFullYear()
    
    let season = 'FALL'
    // Winter: January-March (months 1, 2, 3)
    if (month >= 1 && month <= 3) {
      season = 'WINTER'
    }
    // Spring: April-June (months 4, 5, 6)
    else if (month >= 4 && month <= 6) {
      season = 'SPRING'
    }
    // Summer: July-September (months 7, 8, 9)
    else if (month >= 7 && month <= 9) {
      season = 'SUMMER'
    }
    // Fall: October-December (months 10, 11, 12)
    else {
      season = 'FALL'
    }
    
    return { season, year }
  }

  // Load seasonal anime when modal opens
  useEffect(() => {
    if (isOpen) {
      loadSeasonalAnime()
    }
  }, [isOpen])

  const loadSeasonalAnime = async () => {
    setIsLoading(true)
    const { season, year } = getCurrentSeason()
    setCurrentSeason({ season, year })
    
    try {
      const anime = await getSeasonalAnime(season, year)
      console.log('Loaded seasonal anime:', anime.length, 'items')
      console.log('First anime:', anime[0])
      setSeasonalAnime(anime)
    } catch (error) {
      console.error('Error loading seasonal anime:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle anime selection
  const toggleSelection = (animeId: number) => {
    const newSelected = new Set(selectedAnime)
    if (newSelected.has(animeId)) {
      newSelected.delete(animeId)
    } else {
      newSelected.add(animeId)
    }
    setSelectedAnime(newSelected)
  }

  // Get day of week from timestamp
  const getDayFromTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
  }

  // Get time from timestamp
  const getTimeFromTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  // Import selected anime
  const handleImport = async () => {
    if (selectedAnime.size === 0) return

    setIsImporting(true)

    const animeToImport: AnimeData[] = []
    const existingTitles = new Set(existingAnime.map(a => a.title.toLowerCase()))

    for (const animeId of selectedAnime) {
      const anime = seasonalAnime.find(a => a.id === animeId)
      if (!anime) continue

      // Skip if already exists (silent skip)
      const title = anime.title.english || anime.title.romaji || anime.title.native
      if (existingTitles.has(title.toLowerCase())) {
        continue
      }

      const day = anime.nextAiringEpisode 
        ? getDayFromTimestamp(anime.nextAiringEpisode.airingAt)
        : 'Monday' // Default to Monday if no airing info

      const time = anime.nextAiringEpisode
        ? getTimeFromTimestamp(anime.nextAiringEpisode.airingAt)
        : '00:00'

      const newAnime: AnimeData = {
        id: `anime_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        day: day,
        time: time,
        tags: anime.genres.slice(0, 3), // Take first 3 genres as tags
        coverImage: anime.coverImage.large,
        isFavorite: false,
        status: 'active'
      }

      animeToImport.push(newAnime)
    }

    // Call import callback
    onImport(animeToImport)

    setIsImporting(false)
    setSelectedAnime(new Set())
    onClose()
  }

  // Select all anime
  const selectAll = () => {
    const allIds = new Set(seasonalAnime.map(a => a.id))
    setSelectedAnime(allIds)
  }

  // Deselect all
  const deselectAll = () => {
    setSelectedAnime(new Set())
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Sparkles size={24} />
            <h2 className={styles.titleseason}>
              {currentSeason.season.charAt(0) + currentSeason.season.slice(1).toLowerCase()} {currentSeason.year} Anime Season
            </h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Loader className={styles.spinner} size={48} />
            <p>Loading seasonal anime...</p>
          </div>
        )}

        {/* Anime Grid */}
        {!isLoading && (
          <>
            <div className={styles.controls}>
              <p className={styles.info}>
                Select the anime you want to add to your calendar
              </p>
              <div className={styles.selectionButtons}>
                <button className={styles.selectAllButton} onClick={selectAll}>
                  Select All
                </button>
                <button className={styles.deselectAllButton} onClick={deselectAll}>
                  Deselect All
                </button>
              </div>
            </div>

            <div className={styles.grid}>
              {seasonalAnime.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No anime found for this season.</p>
                </div>
              ) : (
                seasonalAnime.map(anime => {
                  const isSelected = selectedAnime.has(anime.id)
                  const title = anime.title.english || anime.title.romaji || anime.title.native
                  const day = anime.nextAiringEpisode 
                    ? getDayFromTimestamp(anime.nextAiringEpisode.airingAt)
                    : 'TBA'
                  const time = anime.nextAiringEpisode
                    ? getTimeFromTimestamp(anime.nextAiringEpisode.airingAt)
                    : '00:00'

                  return (
                    <div
                      key={anime.id}
                      className={`${styles.animeCard} ${isSelected ? styles.selected : ''}`}
                      onClick={() => toggleSelection(anime.id)}
                    >
                      {/* Background Image */}
                      <div 
                        className={styles.backgroundImage}
                        style={{ 
                          backgroundImage: `url(${anime.coverImage.extraLarge || anime.coverImage.large || anime.coverImage.medium})` 
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className={styles.gradientOverlay} />

                      {/* Selection Indicator */}
                      <div className={styles.selectionIndicator}>
                        {isSelected && <Check size={20} />}
                      </div>

                      {/* Content */}
                      <div className={styles.content}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.time}>
                          <Calendar size={14} strokeWidth={2.5} /> {day} • <Clock size={14} strokeWidth={2.5} /> {time}
                        </p>
                        {anime.genres.length > 0 && (
                          <div className={styles.tags}>
                            {anime.genres.slice(0, 3).map((genre: string, idx: number) => (
                              <span key={idx} className={styles.tag}>{genre}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.selectionCount}>
            {selectedAnime.size} anime selected
          </div>
          <div className={styles.footerButtons}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button 
              className={styles.importButton}
              onClick={handleImport}
              disabled={selectedAnime.size === 0 || isImporting}
            >
              {isImporting ? (
                <>
                  <Loader className={styles.buttonSpinner} size={18} />
                  Importing...
                </>
              ) : (
                <>
                  Import {selectedAnime.size > 0 ? `(${selectedAnime.size})` : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonalBrowser
