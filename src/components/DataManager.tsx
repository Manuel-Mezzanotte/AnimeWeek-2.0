import React, { useRef, useState } from 'react'
import { Download, Upload, ImageUp } from 'lucide-react'
import { AnimeData } from './Sidebar'
import { exportToJSON, importFromJSON, getStorageStats } from '../services/storageService'
import { searchAnime } from '../services/anilistApi'
import styles from '../styles/DataManager.module.css'

interface DataManagerProps {
  animeList: AnimeData[]
  onImport: (animeList: AnimeData[]) => void
  onUpdateAnime: (id: string, updates: Partial<AnimeData>) => void
}

const DataManager: React.FC<DataManagerProps> = ({ animeList, onImport, onUpdateAnime }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const stats = getStorageStats()
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [upgradeProgress, setUpgradeProgress] = useState({ current: 0, total: 0 })

  const handleExport = () => {
    exportToJSON(animeList)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const importedData = await importFromJSON(file)
      if (confirm(`Import ${importedData.length} anime? This will replace your current data.`)) {
        onImport(importedData)
        alert('Data imported successfully!')
      }
    } catch (error) {
      alert('Error importing data. Please check the file format.')
      console.error('Import error:', error)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpgradeCovers = async () => {
    const activeAnime = animeList.filter(anime => anime.status === 'active')
    
    if (activeAnime.length === 0) {
      alert('No active anime to upgrade!')
      return
    }

    if (!confirm(`Upgrade cover images for ${activeAnime.length} anime to highest quality? This may take a few minutes.`)) {
      return
    }

    setIsUpgrading(true)
    setUpgradeProgress({ current: 0, total: activeAnime.length })
    
    let upgraded = 0
    let failed = 0

    for (let i = 0; i < activeAnime.length; i++) {
      const anime = activeAnime[i]
      setUpgradeProgress({ current: i + 1, total: activeAnime.length })

      try {
        // Search for anime by title
        const results = await searchAnime(anime.title)
        
        if (results.length > 0) {
          const bestMatch = results[0]
          const newCoverUrl = bestMatch.coverImage.extraLarge || bestMatch.coverImage.large
          
          // Only update if we got a different/better image
          if (newCoverUrl && newCoverUrl !== anime.coverImage) {
            onUpdateAnime(anime.id, { coverImage: newCoverUrl })
            upgraded++
          }
        }
        
        // Rate limiting: wait 500ms between requests
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`Failed to upgrade cover for "${anime.title}":`, error)
        failed++
      }
    }

    setIsUpgrading(false)
    setUpgradeProgress({ current: 0, total: 0 })
    
    alert(`Cover upgrade complete!\n✅ Upgraded: ${upgraded}\n❌ Failed: ${failed}\n➖ Unchanged: ${activeAnime.length - upgraded - failed}`)
  }

  return (
    <div className={styles.dataManager}>
      <h3 className={styles.title}>Data Management</h3>

      {/* Statistics */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.totalAnime}</div>
          <div className={styles.statLabel}>Total Anime</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.favorites}</div>
          <div className={styles.statLabel}>Favorites</div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.exportButton}
          onClick={handleExport}
          disabled={animeList.length === 0}
        >
          <Download size={18} /> Export Data
        </button>

        <button 
          className={styles.importButton}
          onClick={handleImportClick}
        >
          <Upload size={18} /> Import Data
        </button>

        <button 
          className={styles.upgradeButton}
          onClick={handleUpgradeCovers}
          disabled={isUpgrading || animeList.filter(a => a.status === 'active').length === 0}
        >
          <ImageUp size={18} /> 
          {isUpgrading 
            ? `Upgrading... (${upgradeProgress.current}/${upgradeProgress.total})` 
            : 'Upgrade Covers'}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <p className={styles.info}>
        Export your anime data as a backup, import previously exported data, or upgrade all cover images to highest quality.
      </p>
    </div>
  )
}

export default DataManager
