import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar, { AnimeData } from './components/Sidebar'
import Calendar from './components/Calendar'
import Favorites from './components/Favorites'
import Archive from './components/Archive'
import { getAnimeFromStorage, saveAnimeToStorage, createBackup } from './services/storageService'
import styles from './styles/App.module.css'

const App: React.FC = () => {
  const [animeList, setAnimeList] = useState<AnimeData[]>([])
  const [currentView, setCurrentView] = useState<'calendar' | 'favorites' | 'archive'>('calendar')

  // Load anime from storage on mount
  useEffect(() => {
    const savedAnime = getAnimeFromStorage()
    setAnimeList(savedAnime)
  }, [])

  // Save anime to storage whenever it changes
  useEffect(() => {
    if (animeList.length > 0) {
      saveAnimeToStorage(animeList)
      // Create backup every time data changes
      createBackup(animeList)
    }
  }, [animeList])

  const handleAddAnime = (anime: AnimeData) => {
    setAnimeList(prev => [...prev, anime])
  }

  const handleToggleFavorite = (id: string) => {
    setAnimeList(prev => 
      prev.map(anime => 
        anime.id === id 
          ? { ...anime, isFavorite: !anime.isFavorite } 
          : anime
      )
    )
  }

  const handleDeleteAnime = (id: string) => {
    setAnimeList(prev => prev.filter(anime => anime.id !== id))
  }

  const handleArchiveAnime = (id: string) => {
    setAnimeList(prev => 
      prev.map(anime => 
        anime.id === id 
          ? { ...anime, status: 'archived' } 
          : anime
      )
    )
  }

  const handleRestoreAnime = (id: string) => {
    setAnimeList(prev => 
      prev.map(anime => 
        anime.id === id 
          ? { ...anime, status: 'active' } 
          : anime
      )
    )
  }

  const handleImportData = (importedData: AnimeData[]) => {
    setAnimeList(importedData)
  }

  const handleUpdateAnime = (id: string, updates: Partial<AnimeData>) => {
    setAnimeList(prev => 
      prev.map(anime => 
        anime.id === id 
          ? { ...anime, ...updates } 
          : anime
      )
    )
  }

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Sidebar 
          onAddAnime={handleAddAnime}
          currentView={currentView}
          onViewChange={setCurrentView}
          animeList={animeList}
          onImportData={handleImportData}
          onUpdateAnime={handleUpdateAnime}
        />
        {currentView === 'calendar' ? (
          <Calendar 
            animeList={animeList}
            onToggleFavorite={handleToggleFavorite}
            onDeleteAnime={handleDeleteAnime}
            onArchiveAnime={handleArchiveAnime}
          />
        ) : currentView === 'favorites' ? (
          <Favorites
            animeList={animeList}
            onToggleFavorite={handleToggleFavorite}
            onDeleteAnime={handleDeleteAnime}
            onArchiveAnime={handleArchiveAnime}
          />
        ) : (
          <Archive
            animeList={animeList}
            onToggleFavorite={handleToggleFavorite}
            onDeleteAnime={handleDeleteAnime}
            onRestoreAnime={handleRestoreAnime}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
