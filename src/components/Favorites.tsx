import React from 'react'
import AnimeCard from './AnimeCard'
import { AnimeData } from './Sidebar'
import styles from '../styles/Favorites.module.css'

interface FavoritesProps {
  animeList: AnimeData[]
  onToggleFavorite: (id: string) => void
}

const Favorites: React.FC<FavoritesProps> = ({ animeList, onToggleFavorite }) => {
  // Filter only favorite anime
  const favoriteAnime = animeList.filter(anime => anime.isFavorite)

  // Group favorites by day
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  const getFavoritesByDay = (day: string) => {
    return favoriteAnime.filter(anime => anime.day === day)
  }

  return (
    <main className={styles.favorites}>
      <div className={styles.header}>
        <h1 className={styles.title}>❤️ My Favorites</h1>
        <p className={styles.subtitle}>
          {favoriteAnime.length} {favoriteAnime.length === 1 ? 'anime' : 'anime'}
        </p>
      </div>

      {favoriteAnime.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>❤️</div>
          <h2 className={styles.emptyTitle}>No favorites yet</h2>
          <p className={styles.emptyText}>
            Click the heart icon on any anime card to add it to your favorites!
          </p>
        </div>
      ) : (
        <div className={styles.content}>
          {days.map((day) => {
            const dayFavorites = getFavoritesByDay(day)
            if (dayFavorites.length === 0) return null
            
            return (
              <div key={day} className={styles.daySection}>
                <h2 className={styles.dayTitle}>{day}</h2>
                <div className={styles.animeGrid}>
                  {dayFavorites.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      title={anime.title}
                      imageUrl={anime.coverImage}
                      tags={anime.tags}
                      time={anime.time}
                      isFavorite={anime.isFavorite}
                      onToggleFavorite={() => onToggleFavorite(anime.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Favorites
