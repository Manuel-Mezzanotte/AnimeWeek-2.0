import { app, BrowserWindow, ipcMain, nativeImage } from 'electron'
import path from 'path'

// Set app name
app.name = 'AnimeWeek'

let mainWindow: BrowserWindow | null = null

// Theme icon mapping
const themeIcons: Record<string, string> = {
  'orange-flame': 'orange.png',
  'sakura-pink': 'pink.png',
  'ocean-blue': 'ocean.png',
  'cream-elegance': 'cream.png',
  'royal-purple': 'purple.png',
  'sunset-gold': 'gold.png'
}

function createWindow() {
  // Default icon (Orange Flame)
  const defaultIconPath = process.env.VITE_DEV_SERVER_URL
    ? path.join(__dirname, '../src/image', themeIcons['orange-flame'])
    : path.join(process.resourcesPath, 'image', themeIcons['orange-flame'])
  
  console.log('Loading default icon from:', defaultIconPath)
  
  const defaultIcon = nativeImage.createFromPath(defaultIconPath)
  
  if (defaultIcon.isEmpty()) {
    console.error('Failed to load icon from:', defaultIconPath)
  } else {
    console.log('Icon loaded successfully!')
  }

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    icon: defaultIcon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    backgroundColor: '#1A1A1A',
    title: 'AnimeWeek',
    titleBarStyle: 'hiddenInset',
    show: false,
  })

  // Load the app
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
    // Force title update
    mainWindow?.setTitle('AnimeWeek')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  // Listen for theme change
  ipcMain.on('change-icon', (_event, themeId: string) => {
    console.log('Received change-icon request for theme:', themeId)
    
    if (mainWindow && themeIcons[themeId]) {
      const iconPath = process.env.VITE_DEV_SERVER_URL
        ? path.join(__dirname, '../src/image', themeIcons[themeId])
        : path.join(process.resourcesPath, 'image', themeIcons[themeId])
      
      console.log('Loading theme icon from:', iconPath)
      
      const icon = nativeImage.createFromPath(iconPath)
      
      if (icon.isEmpty()) {
        console.error('Failed to load icon from:', iconPath)
      } else {
        console.log('Theme icon loaded successfully!')
        mainWindow.setIcon(icon)
        
        // For macOS dock icon
        if (process.platform === 'darwin') {
          app.dock.setIcon(icon)
        }
      }
    } else {
      console.error('Invalid theme ID or no main window:', themeId)
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
