import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { themes } from '../data/themes'
import ThemeCard from './ThemeCard'
import DataManager from './DataManager'
import { AnimeData } from './Sidebar'
import styles from '../styles/SettingsModal.module.css'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  animeList?: AnimeData[]
  onImportData?: (data: AnimeData[]) => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose,
  animeList = [],
  onImportData
}) => {
  const { currentTheme, setTheme } = useTheme()
  const [selectedThemeId, setSelectedThemeId] = useState(currentTheme.id)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleApply = () => {
    if (selectedThemeId !== currentTheme.id) {
      setIsAnimating(true)
      
      // Trigger color wave animation
      setTimeout(() => {
        setTheme(selectedThemeId)
        setIsAnimating(false)
        onClose()
      }, 600) // Match with CSS animation duration
    } else {
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
            <h2 className={styles.title}>Choose Your Theme</h2>
            
            {/* Themes Grid */}
            <div className={styles.themesGrid}>
              {themes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedThemeId === theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                />
              ))}
            </div>

            {/* Data Manager */}
            {onImportData && (
              <DataManager 
                animeList={animeList}
                onImport={(data) => {
                  onImportData(data)
                  onClose()
                }}
              />
            )}

            {/* Apply Button */}
            <button 
              className={styles.applyButton}
              onClick={handleApply}
              disabled={isAnimating}
            >
              {isAnimating ? 'Applying...' : 'Apply'}
            </button>
          </motion.div>

          {/* Color Wave Animation Overlay */}
          {isAnimating && (
            <motion.div
              className={styles.colorWave}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: `radial-gradient(circle, ${themes.find(t => t.id === selectedThemeId)?.primary} 0%, transparent 70%)`
              }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default SettingsModal
