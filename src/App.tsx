import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar, { AnimeData } from './components/Sidebar'
import Calendar from './components/Calendar'
import Favorites from './components/Favorites'
import styles from './styles/App.module.css'

const App: React.FC = () => {
  const [animeList, setAnimeList] = useState<AnimeData[]>([])
  const [currentView, setCurrentView] = useState<'calendar' | 'favorites'>('calendar')

  // Load anime from localStorage on mount
  useEffect(() => {
    const savedAnime = localStorage.getItem('animeList')
    if (savedAnime) {
      setAnimeList(JSON.parse(savedAnime))
    }
  }, [])

  // Save anime to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('animeList', JSON.stringify(animeList))
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

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Sidebar 
          onAddAnime={handleAddAnime}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        {currentView === 'calendar' ? (
          <Calendar 
            animeList={animeList}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <Favorites
            animeList={animeList}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
