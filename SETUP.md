# AnimeWeek 2.0 - Setup Instructions

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (recommended: latest LTS)
- **npm** or **yarn**

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   # Build for current platform
   npm run build

   # Build for specific platforms
   npm run build:win    # Windows (.exe)
   npm run build:mac    # macOS (.dmg)
   npm run build:linux  # Linux (.AppImage, .deb, .rpm)
   ```

## 📦 Build Output

After building, executables will be in the `release/` folder:
- **Windows**: `release/AnimeWeek 2.0 Setup.exe`
- **macOS**: `release/AnimeWeek 2.0.dmg`
- **Linux**: `release/AnimeWeek-2.0.AppImage`

## 🎨 Features Implemented

### ✅ Phase 1 Complete
- [x] Electron + React + TypeScript architecture
- [x] Theme system with 6 themes
- [x] Theme persistence (localStorage)
- [x] Smooth color wave animation
- [x] Settings modal
- [x] Sidebar UI (non-functional placeholders)
- [x] Calendar layout (empty grid)

### 🔄 Next Steps
- [ ] Make search functional
- [ ] Add anime cards to calendar
- [ ] Implement favorites system
- [ ] Add AniList API integration

## 🛠️ Tech Stack

- **Electron** ^33.2.0
- **React** ^18.3.1
- **TypeScript** ^5.6.3
- **Vite** ^5.4.10
- **Framer Motion** ^11.11.17
- **electron-builder** ^25.1.8

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for all platforms
- `npm run build:win` - Build for Windows
- `npm run build:mac` - Build for macOS
- `npm run build:linux` - Build for Linux
- `npm run type-check` - Run TypeScript type checking

## 🎯 Current Features

### Theme System
- 6 beautiful themes (Orange Flame, Sakura Pink, Ocean Blue, Cream Elegance, Royal Purple, Sunset Gold)
- Smooth color wave transition animation
- Persistent theme selection
- Settings accessible via ⚙️ icon

### UI Layout
- **Sidebar**: Search bar, navigation, add anime form (placeholders)
- **Calendar**: Week days header, empty grid for anime cards

## 🐛 Troubleshooting

If you encounter any issues:

1. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   ```

3. **TypeScript errors**: Run `npm run type-check`

## 📄 License

MIT
