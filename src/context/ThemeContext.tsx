import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themes, Theme } from '../data/themes'
import { saveTheme, loadTheme } from '../utils/storage'

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (themeId: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]) // Default: Orange Flame

  useEffect(() => {
    // Load saved theme on mount
    const savedThemeId = loadTheme()
    if (savedThemeId) {
      const theme = themes.find(t => t.id === savedThemeId)
      if (theme) {
        setCurrentTheme(theme)
        applyThemeColors(theme)
      }
    } else {
      applyThemeColors(themes[0])
    }
  }, [])

  const applyThemeColors = (theme: Theme) => {
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.secondary)
    document.documentElement.style.setProperty('--color-bg', theme.bgMain)
    document.documentElement.style.setProperty('--color-sidebar', theme.bgSidebar)
    document.documentElement.style.setProperty('--color-hover', theme.bgCard)
    document.documentElement.style.setProperty('--color-text-on-primary', theme.textOnPrimary)
    document.documentElement.style.setProperty('--color-text-main', theme.textMain)
    document.documentElement.style.setProperty('--color-border', theme.border)
    
    // Change Electron app icon
    try {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send('change-icon', theme.id)
    } catch (error) {
      // Not in Electron environment (e.g., browser)
      console.log('Not running in Electron environment')
    }
  }

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setCurrentTheme(theme)
      applyThemeColors(theme)
      saveTheme(themeId)
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
