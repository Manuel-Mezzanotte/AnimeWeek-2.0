import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Archive, RotateCcw } from 'lucide-react'
import { AnimeData } from './Sidebar'
import styles from '../styles/AnimeDetailModal.module.css'

interface AnimeDetailModalProps {
  isOpen: boolean
  onClose: () => void
  anime: AnimeData | null
  onDelete: (id: string) => void
  onArchive?: (id: string) => void
  onRestore?: (id: string) => void
  isArchiveView?: boolean
}

const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ 
  isOpen, 
  onClose,
  anime,
  onDelete,
  onArchive,
  onRestore,
  isArchiveView = false
}) => {
  if (!anime) return null

  const handleDelete = () => {
    onDelete(anime.id)
    onClose()
  }

  const handleArchive = () => {
    if (onArchive) {
      onArchive(anime.id)
      onClose()
    }
  }

  const handleRestore = () => {
    if (onRestore) {
      onRestore(anime.id)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Anime Cover Image */}
            <div className={styles.coverContainer}>
              <img 
                src={anime.coverImage} 
                alt={anime.title}
                className={styles.coverImage}
              />
            </div>

            {/* Anime Info */}
            <div className={styles.info}>
              <h2 className={styles.title}>{anime.title}</h2>
              <div className={styles.meta}>
                <span className={styles.metaItem}>📅 {anime.day}</span>
                {anime.time && <span className={styles.metaItem}>🕐 {anime.time}</span>}
              </div>
              {anime.tags.length > 0 && (
                <div className={styles.tags}>
                  {anime.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button 
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                <Trash2 size={18} /> Delete
              </button>
              
              {isArchiveView ? (
                <button 
                  className={styles.restoreButton}
                  onClick={handleRestore}
                >
                  <RotateCcw size={18} /> Restore
                </button>
              ) : (
                <button 
                  className={styles.archiveButton}
                  onClick={handleArchive}
                >
                  <Archive size={18} /> Archive
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AnimeDetailModal
