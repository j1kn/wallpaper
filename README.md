# Year Dots - Android Live Wallpaper

A silent grid of time showing year progress as a live wallpaper on Android devices.

## Features

- **Live Wallpaper**: Actually sets as device wallpaper (not just an app)
- **15×25 Grid**: 375 dots representing the complete year
- **Live Updates**: Dots fill automatically as days pass
- **Orange Accent**: Today's dot glows in orange
- **Dark Theme**: Minimal, contemplative design
- **Permission-Based**: Requests wallpaper access from user

## Installation

1. **Download/Build** the APK
2. **Install** on Android device
3. **Open App** and tap "Set as Wallpaper"
4. **Grant Permission** when prompted
5. **Choose Wallpaper** in system settings

## How It Works

- **Permission Request**: App asks for wallpaper access
- **Live Rendering**: Wallpaper service draws dots in real-time
- **Automatic Updates**: Refreshes every minute to show progress
- **System Integration**: Becomes actual device wallpaper

## Technical Details

- **Language**: Java
- **API Level**: 24+ (Android 7.0+)
- **Permissions**: `SET_WALLPAPER`, `SET_WALLPAPER_HINTS`
- **Service**: `WallpaperService` for live rendering
- **Grid**: 15 columns × 25 rows = 375 dots

## Building

```bash
./gradlew build
```

## Extraordinary Features

Unlike web-based solutions, this native Android app can:
- Actually change your device's wallpaper
- Update live without opening an app
- Work as a true system wallpaper
- Request and use proper permissions

## Philosophy

A quiet visual object for passive time awareness - each dot represents a day, gently filling as the year moves forward, with today glowing softly in orange against a dark, calm field.