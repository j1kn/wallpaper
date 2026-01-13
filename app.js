// Year Dots Wallpaper App
class YearDots {
    constructor() {
        // Landing page elements
        this.previewTime = document.getElementById('preview-time');
        this.previewProgressRow = document.getElementById('preview-progress-row');
        this.previewMainGrid = document.getElementById('preview-main-grid');
        this.previewProgressFill = document.getElementById('preview-progress-fill');
        this.previewYearPercentage = document.getElementById('preview-year-percentage');
        this.installBtnMain = document.getElementById('install-btn-main');

        // Wallpaper app elements
        this.timeDisplay = document.getElementById('time-display');
        this.progressRow = document.getElementById('progress-row');
        this.mainGrid = document.getElementById('main-grid');
        this.progressFill = document.getElementById('progress-fill');
        this.yearPercentage = document.getElementById('year-percentage');
        this.installBtn = document.getElementById('install-btn');

        this.landingPage = document.getElementById('landing-page');
        this.wallpaperApp = document.getElementById('wallpaper-app');
        this.deferredPrompt = null;

        this.init();
    }

    init() {
        this.setupPWA();
        this.createProgressRow();
        this.createMainGrid();
        this.createPreviewElements();
        this.updateDisplay();
        this.setupInstallPrompt();
        this.startClock();
        this.checkInstallStatus();

        // Update display every minute
        setInterval(() => {
            this.updateDisplay();
        }, 60000);
    }

    // Calculate if current year is leap year
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Get total days in current year
    getDaysInYear(year) {
        return this.isLeapYear(year) ? 366 : 365;
    }

    // Get current day of year (1-365/366)
    getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    // Update real-time clock
    startClock() {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            this.timeDisplay.textContent = `${hours}:${minutes}`;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    // Create thin progress row under time (showing year progress)
    createProgressRow() {
        const totalDays = this.getDaysInYear(new Date().getFullYear());
        const dotsPerRow = Math.min(52, totalDays); // About 1 dot per week

        this.progressRow.innerHTML = '';
        for (let i = 0; i < dotsPerRow; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            this.progressRow.appendChild(dot);
        }
    }

    // Create preview elements for landing page
    createPreviewElements() {
        // Create progress row dots for preview
        const totalDots = 15 * 25; // 375 dots
        const previewDotsPerRow = Math.min(52, totalDots); // About 1 dot per week

        this.previewProgressRow.innerHTML = '';
        for (let i = 0; i < previewDotsPerRow; i++) {
            const dot = document.createElement('div');
            dot.className = 'preview-progress-dot';
            this.previewProgressRow.appendChild(dot);
        }

        // Create main grid dots for preview
        this.previewMainGrid.innerHTML = '';
        for (let i = 1; i <= totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'preview-grid-dot';
            dot.dataset.day = i;
            this.previewMainGrid.appendChild(dot);
        }
    }

    // Check if app is already installed
    checkInstallStatus() {
        // Check if running in standalone mode (installed PWA)
        if (window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true) {
            this.showWallpaperMode();
        } else {
            this.showLandingPage();
        }
    }

    // Show landing page mode
    showLandingPage() {
        this.landingPage.style.display = 'flex';
        this.wallpaperApp.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
    }

    // Show wallpaper mode (fullscreen)
    showWallpaperMode() {
        this.landingPage.style.display = 'none';
        this.wallpaperApp.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    }

    updateDisplay() {
        const now = new Date();
        const year = now.getFullYear();
        const totalDays = this.getDaysInYear(year);
        const currentDay = this.getDayOfYear();
        const totalDots = 15 * 25; // 375 dots

        // Calculate year percentage
        const yearProgress = ((currentDay / totalDays) * 100).toFixed(1);

        // Update preview elements
        if (this.previewYearPercentage) {
            this.previewYearPercentage.textContent = `${yearProgress}%`;
        }

        // Update preview progress row dots
        if (this.previewProgressRow) {
            const previewProgressDots = this.previewProgressRow.querySelectorAll('.preview-progress-dot');
            const progressRatio = currentDay / totalDays;
            const filledPreviewDots = Math.floor(progressRatio * previewProgressDots.length);

            previewProgressDots.forEach((dot, index) => {
                if (index < filledPreviewDots) {
                    dot.classList.add('today');
                } else {
                    dot.classList.remove('today');
                }
            });
        }

        // Update preview main grid dots
        if (this.previewMainGrid) {
            const previewGridDots = this.previewMainGrid.querySelectorAll('.preview-grid-dot');
            const dotsPerDay = totalDots / totalDays;
            const filledPreviewDots = Math.floor(currentDay * dotsPerDay);

            previewGridDots.forEach((dot, index) => {
                dot.className = 'preview-grid-dot'; // Reset classes

                if (index < filledPreviewDots - 1) {
                    dot.classList.add('filled');
                } else if (index === filledPreviewDots - 1) {
                    dot.classList.add('filled', 'today');
                }
            });

            // Update preview progress bar
            if (this.previewProgressFill) {
                this.previewProgressFill.style.width = `${yearProgress}%`;
            }
        }

        // Update wallpaper elements (only if they exist)
        if (this.yearPercentage) {
            this.yearPercentage.textContent = `${yearProgress}%`;
        }

        // Update progress row dots
        if (this.progressRow) {
            const progressDots = this.progressRow.querySelectorAll('.progress-dot');
            const progressRatio = currentDay / totalDays;
            const filledProgressDots = Math.floor(progressRatio * progressDots.length);

            progressDots.forEach((dot, index) => {
                if (index < filledProgressDots) {
                    dot.classList.add('today');
                } else {
                    dot.classList.remove('today');
                }
            });
        }

        // Update main grid dots
        if (this.mainGrid) {
            const gridDots = this.mainGrid.querySelectorAll('.grid-dot');
            const dotsPerDay = totalDots / totalDays;
            const filledDots = Math.floor(currentDay * dotsPerDay);

            gridDots.forEach((dot, index) => {
                dot.className = 'grid-dot'; // Reset classes

                if (index < filledDots - 1) {
                    dot.classList.add('filled');
                } else if (index === filledDots - 1) {
                    dot.classList.add('filled', 'today');
                }
            });
        }

        // Update bottom progress bar
        if (this.progressFill) {
            this.progressFill.style.width = `${yearProgress}%`;
        }

        // Add fade-in animation
        document.body.classList.add('fade-in');
    }

    setupPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered');
                })
                .catch(error => {
                    console.log('SW registration failed');
                });
        }
    }

    setupInstallPrompt() {
        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;

            // Show install buttons
            if (this.installBtnMain) this.installBtnMain.classList.remove('hidden');
            if (this.installBtn) this.installBtn.classList.remove('hidden');

            // Handle main install button click
            if (this.installBtnMain) {
                this.installBtnMain.addEventListener('click', () => {
                    this.installBtnMain.classList.add('hidden');
                    if (this.installBtn) this.installBtn.classList.add('hidden');
                    this.deferredPrompt.prompt();

                    this.deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the install prompt');
                            this.showWallpaperMode();
                        }
                        this.deferredPrompt = null;
                    });
                });
            }

            // Handle secondary install button click
            if (this.installBtn) {
                this.installBtn.addEventListener('click', () => {
                    this.installBtn.classList.add('hidden');
                    if (this.installBtnMain) this.installBtnMain.classList.add('hidden');
                    this.deferredPrompt.prompt();

                    this.deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the install prompt');
                            this.showWallpaperMode();
                        }
                        this.deferredPrompt = null;
                    });
                });
            }
        });

        // Hide buttons if already installed
        window.addEventListener('appinstalled', () => {
            if (this.installBtnMain) this.installBtnMain.classList.add('hidden');
            if (this.installBtn) this.installBtn.classList.add('hidden');
            this.deferredPrompt = null;
            this.showWallpaperMode();
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new YearDots();
});