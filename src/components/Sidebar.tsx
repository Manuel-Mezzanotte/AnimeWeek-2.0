import React, { useState } from 'react'
import SettingsModal from './SettingsModal'
import styles from '../styles/Sidebar.module.css'

const Sidebar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <aside className={styles.sidebar}>
        {/* Top Section - Settings & Search */}
        <div className={styles.topSection}>
          <div className={styles.searchRow}>
            <button 
              className={styles.settingsButton}
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Settings"
            >
              ⚙️
            </button>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search anime" 
                className={styles.searchInput}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <nav className={styles.navigation}>
          <button className={`${styles.navButton} ${styles.active}`} disabled>
            <span className={styles.navIcon}>📅</span>
            <span className={styles.navText}>Calendar</span>
          </button>
          <button className={styles.navButton} disabled>
            <span className={styles.navIcon}>❤️</span>
            <span className={styles.navText}>Favorites</span>
          </button>
        </nav>

        {/* Add Anime Section */}
        <div className={styles.addAnimeSection}>
          <h3 className={styles.sectionTitle}>ADD ANIME</h3>
          
          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Title" 
              className={styles.input}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <select className={styles.select} disabled>
              <option>Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Time" 
              className={styles.input}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Tags" 
              className={styles.input}
              disabled
            />
          </div>


          {/* Preview Button */}
          <button className={styles.previewButton} disabled>
            Preview
          </button>
        </div>
      </aside>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  )
}

export default Sidebar
