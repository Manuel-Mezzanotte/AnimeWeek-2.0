import React, { useState } from 'react'
import AnimeCard from './AnimeCard'
import AnimeDetailModal from './AnimeDetailModal'
import { AnimeData } from './Sidebar'
import styles from '../styles/Calendar.module.css'

interface CalendarProps {
  animeList: AnimeData[]
  onToggleFavorite: (id: string) => void
  onDeleteAnime: (id: string) => void
  onArchiveAnime: (id: string) => void
}

const Calendar: React.FC<CalendarProps> = ({ 
  animeList, 
  onToggleFavorite,
  onDeleteAnime,
  onArchiveAnime
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const daysShort = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Selected day filter - default to current day
  const getCurrentDayName = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    return dayNames[today.getDay()]
  }
  
  const [selectedDay, setSelectedDay] = useState<string | null>(getCurrentDayName())
  
  // Get current day name
  const getCurrentDay = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    return dayNames[today.getDay()]
  }

  // Get current day index (0=SUN, 1=MON, etc.)
  const getCurrentDayIndex = () => {
    const today = new Date().getDay()
    // Convert Sunday (0) to index 6, and shift others: Mon=0, Tue=1, ..., Sun=6
    return today === 0 ? 6 : today - 1
  }

  const currentDayIndex = getCurrentDayIndex()

  // Group anime by day
  const getAnimeByDay = (day: string) => {
    return animeList.filter(anime => anime.day === day && anime.status === 'active')
  }

  const handleCardClick = (anime: AnimeData) => {
    setSelectedAnime(anime)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAnime(null)
  }

  // Get days to display based on filter
  const daysToDisplay = selectedDay ? [selectedDay] : [getCurrentDayName()]

  // Handle day click
  const handleDayClick = (_day: string, index: number) => {
    setSelectedDay(days[index])
  }

  return (
    <main className={styles.calendar}>
      {/* Current Day Title */}
      <h1 className={styles.currentDay}>
        {selectedDay || getCurrentDay()}
      </h1>

      {/* Week Days Header */}
      <div className={styles.daysHeader}>
        {daysShort.map((day, index) => {
          const isCurrentDay = index === currentDayIndex && !selectedDay
          const isSelected = selectedDay === days[index]
          
          return (
            <div key={day} className={styles.dayColumn}>
              <button
                className={`${styles.dayLabel} ${
                  isCurrentDay ? styles.dayLabelActive : ''
                } ${
                  isSelected ? styles.dayLabelSelected : ''
                }`}
                onClick={() => handleDayClick(day, index)}
              >
                {day}
              </button>
            </div>
          )
        })}
      </div>

      {/* Grid Area */}
      <div className={styles.gridArea}>
        {daysToDisplay.map((day) => {
          const dayAnime = getAnimeByDay(day)
          return (
            <div key={day} className={styles.dayCards}>
              {dayAnime.length === 0 ? (
                <div className={styles.emptyDay}>
                  No anime for this day
                </div>
              ) : (
                dayAnime.map((anime) => (
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
                ))
              )}
            </div>
          )
        })}
      </div>

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

export default Calendar
