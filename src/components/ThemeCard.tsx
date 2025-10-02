import React from 'react'
import * as Icons from 'lucide-react'
import { Theme } from '../data/themes'
import styles from '../styles/ThemeCard.module.css'

interface ThemeCardProps {
  theme: Theme
  isSelected: boolean
  onClick: () => void
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, isSelected, onClick }) => {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[theme.icon]
  
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      style={{
        '--card-primary-color': theme.primary,
        background: theme.primary
      } as React.CSSProperties}
    >
      {/* Icon centered */}
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          {IconComponent && <IconComponent size={64} strokeWidth={1.5} />}
        </div>
      </div>
      
      {/* Theme name at bottom */}
      <div className={styles.nameOverlay}>
        <h3 className={styles.name}>{theme.name}</h3>
      </div>
    </div>
  )
}

export default ThemeCard
