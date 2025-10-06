import React, { useRef } from 'react'
import { Download, Upload } from 'lucide-react'
import { AnimeData } from './Sidebar'
import { exportToJSON, importFromJSON, getStorageStats } from '../services/storageService'
import styles from '../styles/DataManager.module.css'

interface DataManagerProps {
  animeList: AnimeData[]
  onImport: (animeList: AnimeData[]) => void
}

const DataManager: React.FC<DataManagerProps> = ({ animeList, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const stats = getStorageStats()

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

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <p className={styles.info}>
        Export your anime data as a backup, or import previously exported data.
      </p>
    </div>
  )
}

export default DataManager
