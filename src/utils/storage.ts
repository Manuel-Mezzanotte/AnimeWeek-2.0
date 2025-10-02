const THEME_STORAGE_KEY = 'animeweek-theme'

export const saveTheme = (themeId: string): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId)
  } catch (error) {
    console.error('Failed to save theme:', error)
  }
}

export const loadTheme = (): string | null => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to load theme:', error)
    return null
  }
}
