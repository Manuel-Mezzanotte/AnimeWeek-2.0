import React, { useState, useEffect, useRef } from 'react'
import SettingsModal from './SettingsModal'
import { searchAnime, AniListAnime, getPreferredTitle } from '../services/anilistApi'
import styles from '../styles/Sidebar.module.css'

export interface AnimeData {
  id: string
  title: string
  day: string
  time: string
  tags: string[]
  coverImage: string
  isFavorite: boolean
  status: 'active' | 'archived'
}

interface SidebarProps {
  onAddAnime?: (anime: AnimeData) => void
  currentView?: 'calendar' | 'favorites' | 'archive'
  onViewChange?: (view: 'calendar' | 'favorites' | 'archive') => void
  animeList?: AnimeData[]
  onImportData?: (data: AnimeData[]) => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onAddAnime,
  currentView = 'calendar',
  onViewChange,
  animeList = [],
  onImportData
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  // Local search state (search bar in top)
  const [localSearchQuery, setLocalSearchQuery] = useState('')
  
  // API Search state (for Title field)
  const [apiSearchQuery, setApiSearchQuery] = useState('')
  const [apiSearchResults, setApiSearchResults] = useState<AniListAnime[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showApiResults, setShowApiResults] = useState(false)
  const apiSearchTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Form state
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')

  // Search anime from API with debounce (for Title field)
  useEffect(() => {
    if (apiSearchTimeoutRef.current) {
      clearTimeout(apiSearchTimeoutRef.current)
    }

    if (apiSearchQuery.trim().length < 2) {
      setApiSearchResults([])
      setShowApiResults(false)
      return
    }

    setIsSearching(true)
    apiSearchTimeoutRef.current = setTimeout(async () => {
      const results = await searchAnime(apiSearchQuery)
      setApiSearchResults(results)
      setIsSearching(false)
      setShowApiResults(true)
    }, 500) // Debounce 500ms

    return () => {
      if (apiSearchTimeoutRef.current) {
        clearTimeout(apiSearchTimeoutRef.current)
      }
    }
  }, [apiSearchQuery])

  // Handle selecting an anime from API search results
  const handleSelectAnime = (anime: AniListAnime) => {
    const selectedTitle = getPreferredTitle(anime)
    setTitle(selectedTitle)
    setApiSearchQuery('') // Clear search query to prevent re-search
    setCoverImage(anime.coverImage.extraLarge || anime.coverImage.large)
    setTags(anime.genres.slice(0, 3)) // Take first 3 genres
    setShowApiResults(false)
    setApiSearchResults([]) // Clear results
  }

  // Handle Title field change (triggers API search)
  const handleTitleChange = (value: string) => {
    setTitle(value)
    setApiSearchQuery(value)
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setCoverImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle image URL input
  const handleImageUrl = (url: string) => {
    setCoverImage(url)
  }

  // Add tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Handle preview/add anime
  const handlePreview = () => {
    if (!title || !day) {
      alert('Please fill in at least Title and Day!')
      return
    }

    const newAnime: AnimeData = {
      id: Date.now().toString(),
      title,
      day,
      time,
      tags,
      coverImage: coverImage || 'https://via.placeholder.com/220x300?text=No+Image',
      isFavorite: false,
      status: 'active'
    }

    if (onAddAnime) {
      onAddAnime(newAnime)
    }

    // Reset form
    setTitle('')
    setApiSearchQuery('')
    setDay('')
    setTime('')
    setTags([])
    setTagInput('')
    setCoverImage('')
  }

  return (
    <>
      <aside className={styles.sidebar}>
        {/* Top Section - Settings & Search */}
        <div className={styles.topSection}>
          <div className={styles.searchRow}>
            <button 
              className={styles.settingsButton}
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Settings"
            >
              ⚙️
            </button>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search in my calendar..." 
                className={styles.searchInput}
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <nav className={styles.navigation}>
          <button 
            className={`${styles.navButton} ${currentView === 'calendar' ? styles.active : ''}`}
            onClick={() => onViewChange?.('calendar')}
          >
            <span className={styles.navIcon}>📅</span>
            <span className={styles.navText}>Calendar</span>
          </button>
          <button 
            className={`${styles.navButton} ${currentView === 'favorites' ? styles.active : ''}`}
            onClick={() => onViewChange?.('favorites')}
          >
            <span className={styles.navIcon}>❤️</span>
            <span className={styles.navText}>Favorites</span>
          </button>
          <button 
            className={`${styles.navButton} ${currentView === 'archive' ? styles.active : ''}`}
            onClick={() => onViewChange?.('archive')}
          >
            <span className={styles.navIcon}>📦</span>
            <span className={styles.navText}>Archive</span>
          </button>
        </nav>

        {/* Add Anime Section - Only show in Calendar view */}
        {currentView === 'calendar' && (
          <div className={styles.addAnimeSection}>
          <h3 className={styles.sectionTitle}>ADD ANIME</h3>
          
          <div className={styles.formGroup}>
            <div className={styles.titleInputContainer}>
              <input 
                type="text" 
                placeholder="Search anime title..." 
                className={styles.input}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onFocus={() => apiSearchResults.length > 0 && setShowApiResults(true)}
              />
              {isSearching && <span className={styles.titleSearchLoader}>⏳</span>}
              
              {/* API Search Results Dropdown */}
              {showApiResults && apiSearchResults.length > 0 && (
                <>
                  <div className={styles.apiSearchResults}>
                    {apiSearchResults.map((anime) => (
                      <button
                        key={anime.id}
                        className={styles.searchResultItem}
                        onClick={() => handleSelectAnime(anime)}
                        type="button"
                      >
                        <img 
                          src={anime.coverImage.extraLarge || anime.coverImage.large} 
                          alt={getPreferredTitle(anime)}
                          className={styles.searchResultImage}
                        />
                        <div className={styles.searchResultInfo}>
                          <div className={styles.searchResultTitle}>
                            {getPreferredTitle(anime)}
                          </div>
                          <div className={styles.searchResultMeta}>
                            {anime.format} • {anime.genres.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div 
                    className={styles.searchOverlay}
                    onClick={() => setShowApiResults(false)}
                  />
                </>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <select 
              className={styles.select}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <input 
              type="time" 
              placeholder="Time" 
              className={styles.input}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Add tag (press Enter)" 
              className={styles.input}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            {tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                    <button 
                      className={styles.removeTag}
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Image URL" 
              className={styles.input}
              value={coverImage}
              onChange={(e) => handleImageUrl(e.target.value)}
            />
            <label className={styles.fileLabel}>
              <input 
                type="file" 
                accept="image/*"
                className={styles.fileInput}
                onChange={handleImageUpload}
              />
              📁 Or upload image
            </label>
          </div>

          {/* Preview Button */}
          <button 
            className={styles.previewButton}
            onClick={handlePreview}
          >
            Add Anime
          </button>
        </div>
        )}

        {/* Favorites Info - Show in Favorites view */}
        {currentView === 'favorites' && (
          <div className={styles.favoritesInfo}>
            <h3 className={styles.sectionTitle}>FAVORITES</h3>
            <p className={styles.infoText}>
              Click on the ❤️ icon on any anime card to add it to your favorites.
            </p>
            <p className={styles.infoText}>
              Your favorite anime will be displayed here for quick access.
            </p>
          </div>
        )}
      </aside>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        animeList={animeList}
        onImportData={onImportData}
      />
    </>
  )
}

export default Sidebar
