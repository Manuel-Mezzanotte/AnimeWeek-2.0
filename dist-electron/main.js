"use strict";
const electron = require("electron");
const path = require("path");
electron.app.name = "AnimeWeek";
let mainWindow = null;
const themeIcons = {
  "orange-flame": "orange.png",
  "sakura-pink": "pink.png",
  "ocean-blue": "ocean.png",
  "cream-elegance": "cream.png",
  "royal-purple": "purple.png",
  "sunset-gold": "gold.png"
};
function createWindow() {
  const defaultIconPath = process.env.VITE_DEV_SERVER_URL ? path.join(__dirname, "../src/image", themeIcons["orange-flame"]) : path.join(process.resourcesPath, "image", themeIcons["orange-flame"]);
  console.log("Loading default icon from:", defaultIconPath);
  const defaultIcon = electron.nativeImage.createFromPath(defaultIconPath);
  if (defaultIcon.isEmpty()) {
    console.error("Failed to load icon from:", defaultIconPath);
  } else {
    console.log("Icon loaded successfully!");
  }
  mainWindow = new electron.BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    icon: defaultIcon,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: "#1A1A1A",
    title: "AnimeWeek",
    titleBarStyle: "hiddenInset",
    show: false
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.once("ready-to-show", () => {
    mainWindow == null ? void 0 : mainWindow.show();
    mainWindow == null ? void 0 : mainWindow.setTitle("AnimeWeek");
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.ipcMain.on("change-icon", (_event, themeId) => {
    console.log("Received change-icon request for theme:", themeId);
    if (mainWindow && themeIcons[themeId]) {
      const iconPath = process.env.VITE_DEV_SERVER_URL ? path.join(__dirname, "../src/image", themeIcons[themeId]) : path.join(process.resourcesPath, "image", themeIcons[themeId]);
      console.log("Loading theme icon from:", iconPath);
      const icon = electron.nativeImage.createFromPath(iconPath);
      if (icon.isEmpty()) {
        console.error("Failed to load icon from:", iconPath);
      } else {
        console.log("Theme icon loaded successfully!");
        mainWindow.setIcon(icon);
        if (process.platform === "darwin") {
          electron.app.dock.setIcon(icon);
        }
      }
    } else {
      console.error("Invalid theme ID or no main window:", themeId);
    }
  });
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
