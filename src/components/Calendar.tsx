import React, { useState } from 'react'
import AnimeCard from './AnimeCard'
import { AnimeData } from './Sidebar'
import styles from '../styles/Calendar.module.css'

interface CalendarProps {
  animeList: AnimeData[]
  onToggleFavorite: (id: string) => void
}

const Calendar: React.FC<CalendarProps> = ({ animeList, onToggleFavorite }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const daysShort = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  
  // Selected day filter (null = show all days)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  
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
    return animeList.filter(anime => anime.day === day)
  }

  // Get days to display based on filter
  const daysToDisplay = selectedDay ? [selectedDay] : days

  // Handle day click
  const handleDayClick = (day: string, index: number) => {
    // If clicking the current day, toggle between showing only that day and all days
    if (selectedDay === days[index]) {
      setSelectedDay(null)
    } else {
      setSelectedDay(days[index])
    }
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
      <div className={styles.gridArea} style={{
        gridTemplateColumns: selectedDay ? '1fr' : 'repeat(7, 1fr)'
      }}>
        {daysToDisplay.map((day) => {
          const dayAnime = getAnimeByDay(day)
          return (
            <div key={day} className={styles.dayCards}>
              {dayAnime.length === 0 ? (
                <div className={styles.emptyDay}>
                  No anime for {selectedDay ? 'this day' : day}
                </div>
              ) : (
                dayAnime.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    title={anime.title}
                    imageUrl={anime.coverImage}
                    tags={anime.tags}
                    time={anime.time}
                    isFavorite={anime.isFavorite}
                    onToggleFavorite={() => onToggleFavorite(anime.id)}
                  />
                ))
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default Calendar
