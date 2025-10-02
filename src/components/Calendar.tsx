import React from 'react'
import AnimeCard from './AnimeCard'
import styles from '../styles/Calendar.module.css'

const Calendar: React.FC = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  
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

  return (
    <main className={styles.calendar}>
      {/* Current Day Title */}
      <h1 className={styles.currentDay}>{getCurrentDay()}</h1>

      {/* Week Days Header */}
      <div className={styles.daysHeader}>
        {days.map((day, index) => (
          <div key={day} className={styles.dayColumn}>
            <div className={`${styles.dayLabel} ${index === currentDayIndex ? styles.dayLabelActive : ''}`}>
              {day}
            </div>
          </div>
        ))}
      </div>

      {/* Grid Area with Test Card */}
      <div className={styles.gridArea}>
        <div className={styles.dayCards}>
          <AnimeCard
            title="My Hero Academia"
            imageUrl="https://cdn.myanimelist.net/images/anime/10/78745l.jpg"
            tags={['Action', 'Superpower']}
            isFavorite={true}
            onToggleFavorite={() => console.log('Toggle favorite')}
          />
        </div>
      </div>
    </main>
  )
}

export default Calendar
