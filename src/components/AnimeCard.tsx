import React from 'react'
import { Heart } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import styles from '../styles/AnimeCard.module.css'

interface AnimeCardProps {
  title: string
  imageUrl: string
  tags: string[]
  time?: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

const AnimeCard: React.FC<AnimeCardProps> = ({ 
  title, 
  imageUrl, 
  tags,
  time,
  isFavorite = false,
  onToggleFavorite 
}) => {
  // Get current theme from context
  const { currentTheme } = useTheme()
  const themeColor = currentTheme.primary

  return (
    <div className={styles.card}>
      {/* Background Image */}
      <div 
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />
      
      {/* Favorite Button */}
      <button 
        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
        onClick={onToggleFavorite}
        aria-label="Toggle favorite"
      >
        <Heart 
          size={20} 
          fill={isFavorite ? themeColor : 'none'} 
          stroke={isFavorite ? themeColor : 'white'}
          strokeWidth={2}
        />
      </button>
      
      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {time && <div className={styles.time}>⏰ {time}</div>}
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={styles.tag}
              style={{ backgroundColor: themeColor }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimeCard
