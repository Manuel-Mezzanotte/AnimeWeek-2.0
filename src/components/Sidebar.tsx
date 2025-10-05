import React, { useState } from 'react'
import SettingsModal from './SettingsModal'
import styles from '../styles/Sidebar.module.css'

export interface AnimeData {
  id: string
  title: string
  day: string
  time: string
  tags: string[]
  coverImage: string
  isFavorite: boolean
}

interface SidebarProps {
  onAddAnime?: (anime: AnimeData) => void
  currentView?: 'calendar' | 'favorites'
  onViewChange?: (view: 'calendar' | 'favorites') => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onAddAnime,
  currentView = 'calendar',
  onViewChange 
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
  // Form state
  const [title, setTitle] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setCoverImage(result)
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle image URL input
  const handleImageUrl = (url: string) => {
    setCoverImage(url)
    setImagePreview(url)
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
      isFavorite: false
    }

    if (onAddAnime) {
      onAddAnime(newAnime)
    }

    // Reset form
    setTitle('')
    setDay('')
    setTime('')
    setTags([])
    setTagInput('')
    setCoverImage('')
    setImagePreview('')
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
                placeholder="Search anime" 
                className={styles.searchInput}
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
        </nav>

        {/* Add Anime Section - Only show in Calendar view */}
        {currentView === 'calendar' && (
          <div className={styles.addAnimeSection}>
          <h3 className={styles.sectionTitle}>ADD ANIME</h3>
          
          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Title" 
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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

          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

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
      />
    </>
  )
}

export default Sidebar
