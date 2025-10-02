import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'
import styles from './styles/App.module.css'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Sidebar />
        <Calendar />
      </div>
    </ThemeProvider>
  )
}

export default App
