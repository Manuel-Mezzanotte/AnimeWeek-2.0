import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Archive as ArchiveIcon } from 'lucide-react'
import AnimeCard from './AnimeCard'
import AnimeDetailModal from './AnimeDetailModal'
import { AnimeData } from './Sidebar'
import styles from '../styles/Archive.module.css'

interface ArchiveProps {
  animeList: AnimeData[]
  onToggleFavorite?: (id: string) => void
  onDeleteAnime: (id: string) => void
  onRestoreAnime: (id: string) => void
}

const Archive: React.FC<ArchiveProps> = ({ 
  animeList, 
  onToggleFavorite,
  onDeleteAnime,
  onRestoreAnime
}) => {
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter only archived anime
  const archivedAnime = animeList.filter(anime => anime.status === 'archived')

  const handleCardClick = (anime: AnimeData) => {
    setSelectedAnime(anime)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAnime(null)
  }

  return (
    <div className={styles.archiveContainer}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}><ArchiveIcon size={36} strokeWidth={2.5} /> Archive</h1>
        <p className={styles.subtitle}>
          {archivedAnime.length} archived anime
        </p>
      </motion.div>

      {archivedAnime.length === 0 ? (
        <motion.div 
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.emptyIcon}><ArchiveIcon size={64} strokeWidth={1.5} /></div>
          <p className={styles.emptyText}>No archived anime yet</p>
          <p className={styles.emptySubtext}>Archive anime to organize your collection</p>
        </motion.div>
      ) : (
        <motion.div 
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {archivedAnime.map((anime) => (
            <div key={anime.id} onClick={() => handleCardClick(anime)}>
              <AnimeCard
                title={anime.title}
                imageUrl={anime.coverImage}
                tags={anime.tags}
                time={anime.time}
                isFavorite={anime.isFavorite}
                onToggleFavorite={() => onToggleFavorite?.(anime.id)}
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* Detail Modal */}
      <AnimeDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        anime={selectedAnime}
        onDelete={onDeleteAnime}
        onRestore={onRestoreAnime}
        isArchiveView={true}
      />
    </div>
  )
}

export default Archive
