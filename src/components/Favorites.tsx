import React, { useState } from 'react'
import AnimeCard from './AnimeCard'
import AnimeDetailModal from './AnimeDetailModal'
import { AnimeData } from './Sidebar'
import styles from '../styles/Favorites.module.css'

interface FavoritesProps {
  animeList: AnimeData[]
  onToggleFavorite: (id: string) => void
  onDeleteAnime: (id: string) => void
  onArchiveAnime: (id: string) => void
}

const Favorites: React.FC<FavoritesProps> = ({ 
  animeList, 
  onToggleFavorite,
  onDeleteAnime,
  onArchiveAnime
}) => {
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter only favorite anime with active status
  const favoriteAnime = animeList.filter(anime => anime.isFavorite && anime.status === 'active')

  // Group favorites by day
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  const getFavoritesByDay = (day: string) => {
    return favoriteAnime.filter(anime => anime.day === day)
  }

  const handleCardClick = (anime: AnimeData) => {
    setSelectedAnime(anime)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAnime(null)
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
                    <div key={anime.id} onClick={() => handleCardClick(anime)}>
                      <AnimeCard
                        title={anime.title}
                        imageUrl={anime.coverImage}
                        tags={anime.tags}
                        time={anime.time}
                        isFavorite={anime.isFavorite}
                        onToggleFavorite={() => onToggleFavorite(anime.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Detail Modal */}
      <AnimeDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        anime={selectedAnime}
        onDelete={onDeleteAnime}
        onArchive={onArchiveAnime}
        isArchiveView={false}
      />
    </main>
  )
}

export default Favorites
