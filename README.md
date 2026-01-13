# Year Dots

A silent grid of time. Each dot a day, gently filling as the year moves forward.

## Features

- **Landing Page**: Clean website showcasing the wallpaper with live preview
- **One-Click Install**: Prominent "Add to Home Screen" button for easy installation
- **PWA Ready**: Installs like a native app, works offline
- **Live Preview**: See exactly how the wallpaper will look before installing
- **Mobile-First**: Optimized for mobile home screens
- **Year Progress**: 15×25 grid (375 dots) showing complete year coverage
- **Real-time Updates**: Clock and progress update automatically

## Installation

1. **Visit the website** at your hosted URL
2. **Click "Add to Home Screen"** button
3. **Follow device prompts**:
   - **iPhone**: Tap Share → Add to Home Screen
   - **Android**: Tap "Add to Home Screen" in browser menu
4. **Launch from home screen** for fullscreen wallpaper experience

## How It Works

- **Landing Page Mode**: When visiting the website normally
- **Wallpaper Mode**: When launched from home screen (fullscreen)
- **Automatic Detection**: App detects install status and shows appropriate interface

## Technical Details

- **Grid**: 15 columns × 25 rows = 375 dots total
- **Year Coverage**: Maps 365-366 days to 375 dots for full coverage
- **PWA Features**: Service worker, web app manifest, offline support
- **Responsive**: Works on all mobile devices
- **No Data Collection**: Completely private, works offline

## Files

- `index.html` - Landing page with wallpaper preview
- `styles.css` - Responsive styles for both modes
- `app.js` - Core logic for preview and wallpaper functionality
- `manifest.json` - PWA manifest for installation
- `sw.js` - Service worker for offline functionality

## Philosophy

This isn't a productivity app or tracker. It's a **quiet visual object** - a silent grid of time where each dot represents a day, with today glowing softly in orange against a dark, calm field. A visual metronome for life, not a dashboard.