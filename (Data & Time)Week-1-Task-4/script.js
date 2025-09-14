/**
 * CHRONOSPHERE - Advanced Date & Time Analytics Platform
 * World-Class JavaScript Implementation
 * Features: Modern ES6+, Advanced Animations, Professional UX
 */

class ChronoSphere {
    constructor() {
        this.currentSection = 'dashboard';
        this.sidebarCollapsed = false;
        this.currentMonth = new Date();
        this.timers = new Map();
        this.notifications = [];
        this.isDarkTheme = true;

        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeDashboard();
        this.startClockUpdates();
        this.generateMiniCalendar();
        this.setupKeyboardShortcuts();
        this.setupNotifications();
        this.setDefaultValues();
        this.hideLoadingScreen();

        // Initialize enhanced visual effects
        this.addParallaxEffect();
        this.setupMouseTracker();
        this.createFloatingElements();
        this.startPerformanceOptimization();
        this.addMagneticEffect();
        this.setupSmartNavigation();
        this.addProgressiveDisclosure(document.body);
        this.setupAccessibilityEnhancements();

        // Welcome console message
        this.logWelcomeMessage();
    }

    // Loading Screen Management
    async showLoadingScreen() {
        return new Promise(resolve => {
            const loadingScreen = document.getElementById('loadingScreen');

            // Simulate initialization time
            setTimeout(() => {
                resolve();
            }, 2500);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');

        // Remove from DOM after transition
        setTimeout(() => {
            if (loadingScreen) loadingScreen.remove();
        }, 500);
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Sidebar Navigation
        this.setupSidebarEvents();

        // Section Navigation
        this.setupSectionNavigation();

        // Mobile Menu
        this.setupMobileMenu();

        // Theme Toggle
        this.setupThemeToggle();

        // Notifications
        this.setupNotificationPanel();

        // Search Functionality
        this.setupSearch();

        // Tab System
        this.setupTabs();

        // Form Interactions
        this.setupFormEnhancements();

        // Calendar Navigation
        this.setupCalendarNavigation();

        // Window Events
        this.setupWindowEvents();
    }

    setupSidebarEvents() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Sidebar hover effects on collapsed state
        if (sidebar) {
            sidebar.addEventListener('mouseenter', () => {
                if (this.sidebarCollapsed) {
                    sidebar.style.width = 'var(--sidebar-width)';
                }
            });

            sidebar.addEventListener('mouseleave', () => {
                if (this.sidebarCollapsed) {
                    sidebar.style.width = 'var(--sidebar-collapsed)';
                }
            });
        }
    }

    setupSectionNavigation() {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');

        if (mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                this.animateHamburgerMenu(mobileMenuBtn);
            });
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setupNotificationPanel() {
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        const closeNotifications = document.getElementById('closeNotifications');

        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', () => {
                notificationPanel.classList.toggle('open');
            });
        }

        if (closeNotifications && notificationPanel) {
            closeNotifications.addEventListener('click', () => {
                notificationPanel.classList.remove('open');
            });
        }
    }

    setupSearch() {
        const globalSearch = document.getElementById('globalSearch');

        if (globalSearch) {
            let searchTimeout;

            globalSearch.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });

            globalSearch.addEventListener('focus', () => {
                globalSearch.parentElement.style.transform = 'scale(1.02)';
            });

            globalSearch.addEventListener('blur', () => {
                globalSearch.parentElement.style.transform = 'scale(1)';
            });
        }
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                this.switchTab(tabName, btn.closest('.calc-card'));
            });
        });
    }

    setupFormEnhancements() {
        // Add floating labels and enhanced validation
        const formInputs = document.querySelectorAll('.form-input, .form-select');

        formInputs.forEach(input => {
            // Focus animations with ripple effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
                this.animateInputFocus(input);
                this.createRippleEffect(input);
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                this.validateInput(input);
            });

            // Real-time validation with visual feedback
            input.addEventListener('input', () => {
                this.validateInputRealTime(input);
            });

            // Enhanced Enter key support with visual feedback
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const section = input.closest('.calc-card, .dashboard-card');
                    const button = section?.querySelector('.btn-primary');
                    if (button) {
                        this.animateButtonPress(button);
                        this.createButtonRipple(button);
                        button.click();
                    }
                }
            });

            // Add hover effects
            input.addEventListener('mouseenter', () => {
                this.addHoverGlow(input);
            });

            input.addEventListener('mouseleave', () => {
                this.removeHoverGlow(input);
            });
        });

        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .action-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createButtonRipple(button);
                this.animateButtonPress(button);
            });

            button.addEventListener('mouseenter', () => {
                this.addButtonHoverEffect(button);
            });

            button.addEventListener('mouseleave', () => {
                this.removeButtonHoverEffect(button);
            });
        });
    }

    setupCalendarNavigation() {
        const calPrev = document.getElementById('calPrev');
        const calNext = document.getElementById('calNext');

        if (calPrev) {
            calPrev.addEventListener('click', () => {
                this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
                this.generateMiniCalendar();
            });
        }

        if (calNext) {
            calNext.addEventListener('click', () => {
                this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
                this.generateMiniCalendar();
            });
        }
    }

    setupWindowEvents() {
        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 100);
        });

        // Scroll handler for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 10);
        });

        // Page visibility for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Global shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'm':
                        e.preventDefault();
                        this.focusElement('monthSelect');
                        break;
                    case 'y':
                        e.preventDefault();
                        this.focusElement('yearInput');
                        break;
                    case 'f':
                        e.preventDefault();
                        this.focusElement('checkDate');
                        break;
                    case '/':
                        e.preventDefault();
                        this.focusElement('globalSearch');
                        break;
                    case '1':
                        e.preventDefault();
                        this.navigateToSection('dashboard');
                        break;
                    case '2':
                        e.preventDefault();
                        this.navigateToSection('calculator');
                        break;
                    case '3':
                        e.preventDefault();
                        this.navigateToSection('analyzer');
                        break;
                }
            }

            // Escape key closes panels
            if (e.key === 'Escape') {
                this.closePanels();
            }
        });
    }

    // Navigation and UI Management
    navigateToSection(sectionName) {
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.animateSectionTransition(targetSection);
        }

        this.currentSection = sectionName;

        // Close mobile sidebar if open
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar')?.classList.remove('open');
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.querySelector('.main-container');

        this.sidebarCollapsed = !this.sidebarCollapsed;

        if (this.sidebarCollapsed) {
            sidebar?.classList.add('collapsed');
            document.body.classList.add('sidebar-collapsed');
        } else {
            sidebar?.classList.remove('collapsed');
            document.body.classList.remove('sidebar-collapsed');
        }

        // Animate toggle button
        this.animateSidebarToggle();
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');

        const themeIcon = document.querySelector('.theme-icon');
        const themeText = document.querySelector('.theme-text');

        if (themeIcon && themeText) {
            themeIcon.textContent = this.isDarkTheme ? '🌙' : '☀️';
            themeText.textContent = this.isDarkTheme ? 'Dark Mode' : 'Light Mode';
        }

        // Animate theme change
        this.animateThemeChange();
    }

    // Clock and Time Management
    initializeDashboard() {
        this.updateCurrentTime();
        this.updateWorldClocks();
        this.updateDashboardStats();
    }

    startClockUpdates() {
        // Update every second
        this.timers.set('clock', setInterval(() => {
            this.updateCurrentTime();
            this.updateWorldClocks();
            this.updateTimeProgress();
        }, 1000));

        // Update stats every minute
        this.timers.set('stats', setInterval(() => {
            this.updateDashboardStats();
        }, 60000));
    }

    updateCurrentTime() {
        const now = new Date();

        const dateElement = document.getElementById('currentDate');
        const timeElement = document.getElementById('currentTime');
        const timezoneElement = document.getElementById('currentTimezone');

        if (dateElement) {
            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
        }

        if (timeElement) {
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // Animate time change
            if (timeElement.textContent !== timeString) {
                this.animateTimeChange(timeElement, timeString);
            }
        }

        if (timezoneElement) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            timezoneElement.textContent = `(${timezone})`;
        }
    }

    updateWorldClocks() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

        const clocks = [
            { id: 'nyTime', timezone: 'America/New_York' },
            { id: 'londonTime', timezone: 'Europe/London' },
            { id: 'tokyoTime', timezone: 'Asia/Tokyo' },
            { id: 'sydneyTime', timezone: 'Australia/Sydney' }
        ];

        clocks.forEach(clock => {
            const element = document.getElementById(clock.id);
            if (element) {
                try {
                    const timeString = now.toLocaleTimeString('en-US', {
                        ...timeOptions,
                        timeZone: clock.timezone
                    });
                    element.textContent = timeString;
                } catch (error) {
                    element.textContent = '--:--';
                }
            }
        });
    }

    updateTimeProgress() {
        const now = new Date();
        const secondsProgress = document.getElementById('secondsProgress');
        const secondsCount = document.getElementById('secondsCount');
        const dayProgress = document.getElementById('dayProgress');

        if (secondsProgress) {
            const seconds = now.getSeconds();
            const progress = (seconds / 60) * 100;
            secondsProgress.style.width = `${progress}%`;
        }

        if (secondsCount) {
            secondsCount.textContent = now.getSeconds().toString().padStart(2, '0');
        }

        if (dayProgress) {
            const startOfDay = new Date(now);
            startOfDay.setHours(0, 0, 0, 0);
            const msInDay = 24 * 60 * 60 * 1000;
            const msPassed = now.getTime() - startOfDay.getTime();
            const dayProgressPercent = (msPassed / msInDay) * 100;
            dayProgress.textContent = `${Math.round(dayProgressPercent)}%`;
        }
    }

    updateDashboardStats() {
        const now = new Date();

        // Day of year
        const dayOfYearElement = document.getElementById('dayOfYear');
        if (dayOfYearElement) {
            const start = new Date(now.getFullYear(), 0, 0);
            const diff = now - start;
            const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
            dayOfYearElement.textContent = dayOfYear.toString();
        }

        // Week number
        const weekNumberElement = document.getElementById('weekNumber');
        if (weekNumberElement) {
            const weekNumber = this.getWeekNumber(now);
            weekNumberElement.textContent = weekNumber.toString();
        }

        // Days to weekend
        const daysToWeekendElement = document.getElementById('daysToWeekend');
        if (daysToWeekendElement) {
            const dayOfWeek = now.getDay();
            const daysToWeekend = dayOfWeek === 0 ? 0 : dayOfWeek === 6 ? 0 : 6 - dayOfWeek;
            daysToWeekendElement.textContent = daysToWeekend.toString();
        }

        // Days to New Year
        const daysToNewYearElement = document.getElementById('daysToNewYear');
        if (daysToNewYearElement) {
            const newYear = new Date(now.getFullYear() + 1, 0, 1);
            const diffTime = newYear.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            daysToNewYearElement.textContent = diffDays.toString();
        }
    }

    // Calendar Management
    generateMiniCalendar() {
        const calendar = document.getElementById('miniCalendar');
        const titleElement = document.getElementById('calendarTitle');

        if (!calendar || !titleElement) return;

        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const today = new Date();

        titleElement.textContent = this.currentMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        calendar.innerHTML = '';

        // Add day headers
        const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayHeaders.forEach(header => {
            const headerElement = document.createElement('div');
            headerElement.className = 'calendar-header';
            headerElement.textContent = header;
            headerElement.style.cssText = `
                padding: 0.5rem;
                text-align: center;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.8rem;
            `;
            calendar.appendChild(headerElement);
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendar.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day.toString();

            const currentDate = new Date(year, month, day);
            if (this.isSameDay(currentDate, today)) {
                dayElement.classList.add('today');
            }

            // Add click handler
            dayElement.addEventListener('click', () => {
                this.handleCalendarDayClick(currentDate);
            });

            calendar.appendChild(dayElement);
        }

        // Animate calendar generation
        this.animateCalendarGeneration(calendar);
    }

    // Core Date Calculations
    calculateMonthLengths() {
        const yearInput = document.getElementById('yearInput');
        const year = parseInt(yearInput?.value || new Date().getFullYear());

        if (!this.isValidYear(year)) {
            this.showError('monthLengthsResult', 'Please enter a valid year (1000-9999)');
            return;
        }

        const isLeapYear = this.isLeapYear(year);
        const leapInfo = document.getElementById('leapYearInfo');

        if (leapInfo) {
            leapInfo.textContent = `${year} is ${isLeapYear ? 'a leap year' : 'not a leap year'} ${isLeapYear ? '🎯' : '📅'}`;
            leapInfo.className = `info-banner ${isLeapYear ? 'leap-year' : ''}`;
            leapInfo.style.display = 'block';
            this.animateElement(leapInfo);
        }

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (isLeapYear) monthLengths[1] = 29;

        let html = '';
        monthNames.forEach((month, index) => {
            html += `
                <div class="month-item" style="animation-delay: ${index * 0.1}s">
                    <div class="month-name">${month}</div>
                    <div class="month-days">${monthLengths[index]} days</div>
                </div>
            `;
        });

        const resultElement = document.getElementById('monthLengthsResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'month-grid-result';
            this.animateResults(resultElement);
        }

        // Add to recent calculations
        this.addNotification(`Month lengths calculated for ${year}`, 'calculation');
    }

    findMondays() {
        const monthSelect = document.getElementById('monthSelect');
        const yearInput = document.getElementById('mondayYearInput');

        const month = parseInt(monthSelect?.value || new Date().getMonth() + 1);
        const year = parseInt(yearInput?.value || new Date().getFullYear());

        if (!this.isValidYear(year) || month < 1 || month > 12) {
            this.showError('mondaysResult', 'Please enter valid month and year');
            return;
        }

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const mondays = [];
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            if (date.getDay() === 1) { // Monday is day 1
                mondays.push(date);
            }
        }

        let html = `
            <div class="result-header">
                <h3>📅 Mondays in ${monthNames[month - 1]} ${year}</h3>
            </div>
        `;

        if (mondays.length === 0) {
            html += '<p>No Mondays found (this should not happen!)</p>';
        } else {
            html += '<ul class="monday-list">';
            mondays.forEach((monday, index) => {
                const dateString = monday.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                html += `
                    <li class="monday-item" style="animation-delay: ${index * 0.1}s">
                        <div class="monday-date">Monday #${index + 1}: ${dateString}</div>
                        <div class="monday-details">Day ${monday.getDate()} of the month</div>
                    </li>
                `;
            });
            html += '</ul>';
            html += `<div class="summary">Total Mondays: ${mondays.length}</div>`;
        }

        const resultElement = document.getElementById('mondaysResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'result-container';
            this.animateResults(resultElement);
        }

        this.addNotification(`Found ${mondays.length} Mondays in ${monthNames[month - 1]} ${year}`, 'calculation');
    }

    checkFridayThe13th() {
        const dateInput = document.getElementById('checkDate');
        if (!dateInput?.value) {
            this.showError('fridayThe13thResult', 'Please select a date');
            return;
        }

        const date = new Date(dateInput.value + 'T00:00:00');
        const isFriday = date.getDay() === 5;
        const is13th = date.getDate() === 13;
        const isFridayThe13th = isFriday && is13th;

        const dateString = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let html = `
            <div class="friday-13th-result ${isFridayThe13th ? 'is-friday' : 'not-friday'}">
                <h3>${dateString}</h3>
        `;

        if (isFridayThe13th) {
            html += `
                <div style="font-size: 3rem; margin: 1rem 0; animation: spookySpin 2s infinite;">🎃👻</div>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 1rem 0;">YES! This is Friday the 13th!</p>
                <p style="font-size: 1.1rem; opacity: 0.9;">Feeling superstitious? 🌙</p>
            `;
        } else {
            html += '<p style="font-size: 1.2rem; margin: 1rem 0;">This is not Friday the 13th.</p>';
            if (!is13th) {
                html += `<p>📅 It's the ${this.getOrdinalNumber(date.getDate())}, not the 13th.</p>`;
            } else {
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                html += `<p>📆 It's a ${dayNames[date.getDay()]}, not Friday.</p>`;
            }
        }

        html += '</div>';

        const resultElement = document.getElementById('fridayThe13thResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'result-container';
            this.animateResults(resultElement);
        }

        this.addNotification(
            isFridayThe13th ? '🎃 Found Friday the 13th!' : 'Date checked - not Friday the 13th',
            'calculation'
        );
    }

    findAllFridayThe13th() {
        const yearInput = document.getElementById('friday13Year');
        const year = parseInt(yearInput?.value || new Date().getFullYear());

        if (!this.isValidYear(year)) {
            this.showError('fridayThe13thResult', 'Please enter a valid year (1000-9999)');
            return;
        }

        const fridayThe13ths = [];
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        for (let month = 0; month < 12; month++) {
            const date = new Date(year, month, 13);
            if (date.getDay() === 5) {
                fridayThe13ths.push(date);
            }
        }

        let html = `
            <div class="result-header">
                <h3>🎃 Friday the 13th dates in ${year}</h3>
            </div>
        `;

        if (fridayThe13ths.length === 0) {
            html += `
                <div class="no-results">
                    <p>😌 No Friday the 13th dates in ${year}</p>
                    <p style="font-size: 0.9rem; opacity: 0.7;">Lucky year!</p>
                </div>
            `;
        } else {
            html += '<div class="friday-13th-list">';
            fridayThe13ths.forEach((date, index) => {
                const dateString = date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                html += `
                    <div class="friday-13th-item" style="animation-delay: ${index * 0.2}s">
                        🎃 ${dateString}
                    </div>
                `;
            });
            html += '</div>';
            html += `
                <div class="summary">
                    Total Friday the 13th dates: ${fridayThe13ths.length}
                    ${fridayThe13ths.length > 2 ? ' 😱' : fridayThe13ths.length === 0 ? ' 😊' : ' 🤔'}
                </div>
            `;
        }

        const resultElement = document.getElementById('fridayThe13thResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'result-container';
            this.animateResults(resultElement);
        }

        this.addNotification(`Found ${fridayThe13ths.length} Friday the 13th dates in ${year}`, 'calculation');
    }

    formatDate() {
        const dateInput = document.getElementById('formatDate');
        const formatSelect = document.getElementById('formatPattern');

        if (!dateInput?.value) {
            this.showError('formatResult', 'Please select a date');
            return;
        }

        const date = new Date(dateInput.value + 'T00:00:00');
        const formatType = formatSelect?.value || 'full';

        let formattedDates = [];

        switch (formatType) {
            case 'full':
                formattedDates = [
                    { label: 'Full Format', value: date.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })},
                    { label: 'Full with Time', value: date.toLocaleString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })},
                    { label: 'Formal', value: date.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}
                ];
                break;
            case 'iso':
                formattedDates = [
                    { label: 'ISO Date', value: date.toISOString().split('T')[0] },
                    { label: 'ISO DateTime', value: date.toISOString() },
                    { label: 'ISO Week Date', value: this.getISOWeekDate(date) }
                ];
                break;
            case 'short':
                formattedDates = [
                    { label: 'US Format', value: date.toLocaleDateString('en-US') },
                    { label: 'UK Format', value: date.toLocaleDateString('en-GB') },
                    { label: 'Numeric', value: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` }
                ];
                break;
            case 'custom':
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                formattedDates = [
                    { label: 'DD/MM/YYYY', value: `${day}/${month}/${year}` },
                    { label: 'MM-DD-YYYY', value: `${month}-${day}-${year}` },
                    { label: 'YYYY.MM.DD', value: `${year}.${month}.${day}` },
                    { label: 'DD-MM-YY', value: `${day}-${month}-${year.toString().slice(-2)}` }
                ];
                break;
            case 'international':
                formattedDates = [
                    { label: 'German', value: date.toLocaleDateString('de-DE') },
                    { label: 'French', value: date.toLocaleDateString('fr-FR') },
                    { label: 'Japanese', value: date.toLocaleDateString('ja-JP') },
                    { label: 'Chinese', value: date.toLocaleDateString('zh-CN') }
                ];
                break;
        }

        let html = '<div class="format-results">';
        formattedDates.forEach((format, index) => {
            html += `
                <div class="format-result" style="animation-delay: ${index * 0.1}s">
                    <div class="format-label">${format.label}:</div>
                    <div class="format-value">${format.value}</div>
                </div>
            `;
        });
        html += '</div>';

        const resultElement = document.getElementById('formatResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'result-container';
            this.animateResults(resultElement);
        }

        this.addNotification(`Date formatted in ${formattedDates.length} styles`, 'format');
    }

    calculateDateDifference() {
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');

        if (!startDateInput?.value || !endDateInput?.value) {
            this.showError('calculatorResult', 'Please select both start and end dates');
            return;
        }

        const startDate = new Date(startDateInput.value + 'T00:00:00');
        const endDate = new Date(endDateInput.value + 'T00:00:00');

        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
        const weeksDiff = Math.floor(daysDiff / 7);
        const monthsDiff = Math.abs((endDate.getFullYear() - startDate.getFullYear()) * 12 +
                                   (endDate.getMonth() - startDate.getMonth()));
        const yearsDiff = Math.abs(endDate.getFullYear() - startDate.getFullYear());

        const isNegative = timeDiff < 0;

        let html = `
            <h3>📊 Date Difference Analysis</h3>
            <div class="date-diff-result">
                <div class="diff-metric">
                    <span class="diff-label">From:</span>
                    <span class="diff-value">${startDate.toLocaleDateString('en-US', {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                    })}</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">To:</span>
                    <span class="diff-value">${endDate.toLocaleDateString('en-US', {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                    })}</span>
                </div>
                <hr style="margin: 1rem 0; border: 1px solid rgba(255,255,255,0.2);">
                <div class="diff-metric">
                    <span class="diff-label">📅 Days:</span>
                    <span class="diff-value">${daysDiff} days</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">📊 Weeks:</span>
                    <span class="diff-value">${weeksDiff} weeks</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">📈 Months:</span>
                    <span class="diff-value">${monthsDiff} months</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">🗓️ Years:</span>
                    <span class="diff-value">${yearsDiff} years</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">⏱️ Hours:</span>
                    <span class="diff-value">${Math.abs(Math.floor(timeDiff / (1000 * 60 * 60)))} hours</span>
                </div>
            </div>
        `;

        if (isNegative) {
            html += '<div class="warning-note">⚠️ End date is before start date</div>';
        }

        const resultElement = document.getElementById('calculatorResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'result-container';
            this.animateResults(resultElement);
        }

        this.addNotification(`Calculated difference: ${daysDiff} days`, 'calculation');
    }

    addDaysToDate() {
        const baseDateInput = document.getElementById('baseDate');
        const daysInput = document.getElementById('addDays');

        if (!baseDateInput?.value) {
            this.showError('calculatorResult', 'Please select a base date');
            return;
        }

        const daysToAdd = parseInt(daysInput?.value || '0');

        const baseDate = new Date(baseDateInput.value + 'T00:00:00');
        const resultDate = new Date(baseDate);
        resultDate.setDate(baseDate.getDate() + daysToAdd);

        const operation = daysToAdd >= 0 ? 'Adding' : 'Subtracting';
        const absDays = Math.abs(daysToAdd);

        let html = `
            <h3>🧮 Date Calculation</h3>
            <div class="date-diff-result">
                <div class="diff-metric">
                    <span class="diff-label">📅 Base Date:</span>
                    <span class="diff-value">${baseDate.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">⚡ Operation:</span>
                    <span class="diff-value">${operation} ${absDays} day${absDays !== 1 ? 's' : ''}</span>
                </div>
                <hr style="margin: 1rem 0; border: 1px solid rgba(255,255,255,0.2);">
                <div class="diff-metric">
                    <span class="diff-label">🎯 Result:</span>
                    <span class="diff-value">${resultDate.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">📊 Day of Year:</span>
                    <span class="diff-value">${this.getDayOfYear(resultDate)}</span>
                </div>
                <div class="diff-metric">
                    <span class="diff-label">📈 Week Number:</span>
                    <span class="diff-value">Week ${this.getWeekNumber(resultDate)}</span>
                </div>
            </div>
        `;

        const resultElement = document.getElementById('calculatorResult');
        if (resultElement) {
            resultElement.innerHTML = html;
            resultElement.className = 'result-container';
            this.animateResults(resultElement);
        }

        this.addNotification(`${operation} ${absDays} days to date`, 'calculation');
    }

    // Enhanced Animation Methods
    animateElement(element) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';

        requestAnimationFrame(() => {
            element.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    // New engaging visual effects
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    createButtonRipple(button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: buttonRipple 0.8s ease-out;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 800);
    }

    addHoverGlow(element) {
        element.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)';
        element.style.transform = 'scale(1.02)';
        element.style.transition = 'all 0.3s ease';
    }

    removeHoverGlow(element) {
        element.style.boxShadow = '';
        element.style.transform = 'scale(1)';
    }

    addButtonHoverEffect(button) {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)';
        button.style.filter = 'brightness(1.1)';
        button.style.transition = 'all 0.3s ease';
    }

    removeButtonHoverEffect(button) {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '';
        button.style.filter = 'brightness(1)';
    }

    validateInputRealTime(input) {
        const value = input.value.trim();
        const isValid = this.validateInput(input);

        if (isValid && value) {
            input.style.borderColor = '#48bb78';
            input.style.boxShadow = '0 0 0 3px rgba(72, 187, 120, 0.1)';
            this.createSuccessCheckmark(input);
        } else if (!isValid && value) {
            input.style.borderColor = '#e53e3e';
            input.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
        } else {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }
    }

    createSuccessCheckmark(input) {
        const existing = input.parentElement.querySelector('.success-checkmark');
        if (existing) existing.remove();

        const checkmark = document.createElement('div');
        checkmark.className = 'success-checkmark';
        checkmark.style.cssText = `
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #48bb78;
            font-size: 16px;
            animation: checkmarkPop 0.3s ease;
        `;
        checkmark.innerHTML = '✓';

        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(checkmark);

        setTimeout(() => checkmark.remove(), 2000);
    }

    addProgressiveDisclosure(container) {
        const items = container.querySelectorAll('.calc-card, .dashboard-card');

        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';

            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    addParallaxEffect() {
        const cards = document.querySelectorAll('.dashboard-card, .calc-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.transition = 'transform 0.1s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    }

    animateResults(container) {
        const items = container.querySelectorAll('.month-item, .monday-item, .format-result, .friday-13th-item, .diff-metric');

        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateTimeChange(element, newTime) {
        element.style.transform = 'rotateX(90deg)';

        setTimeout(() => {
            element.textContent = newTime;
            element.style.transform = 'rotateX(0deg)';
        }, 150);
    }

    animateSectionTransition(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateX(30px)';

        requestAnimationFrame(() => {
            section.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        });
    }

    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '';
        }, 150);
    }

    animateInputFocus(input) {
        const wrapper = input.closest('.input-wrapper') || input.parentElement;
        wrapper.style.transform = 'scale(1.02)';

        setTimeout(() => {
            wrapper.style.transform = 'scale(1)';
        }, 200);
    }

    animateHamburgerMenu(button) {
        const spans = button.querySelectorAll('span');
        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    }

    animateSidebarToggle() {
        const toggleBtn = document.getElementById('sidebarToggle');
        if (toggleBtn) {
            toggleBtn.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                toggleBtn.style.transform = 'rotate(0deg)';
            }, 300);
        }
    }

    animateThemeChange() {
        const body = document.body;
        body.style.transition = 'all 0.5s ease';

        // Create a flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.isDarkTheme ? '#000' : '#fff'};
            opacity: 0;
            pointer-events: none;
            z-index: 10000;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(flash);

        requestAnimationFrame(() => {
            flash.style.opacity = '0.5';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 300);
            }, 150);
        });
    }

    animateCalendarGeneration(calendar) {
        const days = calendar.querySelectorAll('.calendar-day');
        days.forEach((day, index) => {
            day.style.opacity = '0';
            day.style.transform = 'scale(0.8)';

            setTimeout(() => {
                day.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                day.style.opacity = '1';
                day.style.transform = 'scale(1)';
            }, index * 20);
        });
    }

    // Utility Methods
    isValidYear(year) {
        return year >= 1000 && year <= 9999;
    }

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    getISOWeekDate(date) {
        const year = date.getFullYear();
        const week = this.getWeekNumber(date);
        const day = date.getDay() || 7;
        return `${year}-W${week.toString().padStart(2, '0')}-${day}`;
    }

    getOrdinalNumber(num) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }

    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    // Tab Management
    switchTab(tabName, container) {
        const tabBtns = container.querySelectorAll('.tab-btn');
        const tabContents = container.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const activeBtn = container.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = container.querySelector(`#${tabName}`);

        if (activeBtn && activeContent) {
            activeBtn.classList.add('active');
            activeContent.classList.add('active');
        }
    }

    // Search Functionality
    performSearch(query) {
        if (!query.trim()) return;

        const searchableElements = document.querySelectorAll('.card-title h3, .nav-item span, .form-label');
        let matches = [];

        searchableElements.forEach(element => {
            if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
                matches.push({
                    element,
                    text: element.textContent,
                    section: this.findParentSection(element)
                });
            }
        });

        if (matches.length > 0) {
            this.highlightSearchResults(matches);
            // Navigate to first match
            if (matches[0].section) {
                this.navigateToSection(matches[0].section);
            }
        }
    }

    findParentSection(element) {
        let parent = element.parentElement;
        while (parent) {
            if (parent.classList.contains('content-section')) {
                return parent.id;
            }
            parent = parent.parentElement;
        }
        return null;
    }

    highlightSearchResults(matches) {
        // Clear previous highlights
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.classList.remove('search-highlight');
        });

        // Add new highlights
        matches.forEach(match => {
            match.element.classList.add('search-highlight');
        });

        // Remove highlights after 3 seconds
        setTimeout(() => {
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });
        }, 3000);
    }

    // Notification System
    setupNotifications() {
        this.addNotification('Welcome to ChronoSphere! 🎉', 'welcome');
        this.addNotification('All systems initialized', 'system');
        this.updateNotificationBadge();
    }

    addNotification(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message,
            type,
            time: new Date(),
            read: false
        };

        this.notifications.unshift(notification);

        // Limit to 10 notifications
        if (this.notifications.length > 10) {
            this.notifications = this.notifications.slice(0, 10);
        }

        this.updateNotificationBadge();
        this.showToast(message, type);
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const unreadCount = this.notifications.filter(n => !n.read).length;
            badge.textContent = unreadCount.toString();
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1rem 1.5rem;
            color: white;
            font-size: 0.9rem;
            max-width: 300px;
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        `;

        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Utility Functions
    focusElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.focus();
            this.animateInputFocus(element);
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;

        let isValid = true;
        let errorMessage = '';

        if (type === 'number') {
            const num = parseFloat(value);
            if (isNaN(num)) {
                isValid = false;
                errorMessage = 'Please enter a valid number';
            }
        } else if (type === 'date') {
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a date';
            }
        }

        if (!isValid) {
            input.style.borderColor = '#ff6b6b';
            this.showToast(errorMessage, 'error');
        } else {
            input.style.borderColor = '';
        }

        return isValid;
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="error-message" style="
                    padding: 1rem;
                    background: rgba(255, 107, 107, 0.2);
                    border: 1px solid rgba(255, 107, 107, 0.5);
                    border-radius: 8px;
                    color: #ff6b6b;
                    text-align: center;
                ">
                    ❌ ${message}
                </div>
            `;
            element.className = 'result-container error';
        }
    }

    setDefaultValues() {
        const today = new Date().toISOString().split('T')[0];
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        // Set default dates
        const dateInputs = ['checkDate', 'formatDate', 'startDate', 'endDate', 'baseDate'];
        dateInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = today;
        });

        // Set current month
        const monthSelect = document.getElementById('monthSelect');
        if (monthSelect) monthSelect.value = currentMonth.toString();
    }

    handleCalendarDayClick(date) {
        const dateString = date.toISOString().split('T')[0];

        // Set the clicked date in relevant inputs
        const dateInputs = document.querySelectorAll('input[type="date"]');
        if (dateInputs.length > 0) {
            dateInputs[0].value = dateString;
            this.animateInputFocus(dateInputs[0]);
        }

        this.addNotification(`Selected date: ${date.toLocaleDateString()}`, 'interaction');
    }

    closePanels() {
        document.getElementById('notificationPanel')?.classList.remove('open');
        document.getElementById('shortcutsPanel')?.classList.remove('open');
        document.getElementById('sidebar')?.classList.remove('open');
    }

    handleResize() {
        // Handle responsive layout changes
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar')?.classList.remove('open');
        }
    }

    handleScroll() {
        // Handle scroll-based animations or updates
        const scrollY = window.scrollY;
        const header = document.querySelector('.main-header');

        if (header) {
            if (scrollY > 50) {
                header.style.backdropFilter = 'blur(25px)';
                header.style.background = 'rgba(255, 255, 255, 0.3)';
            } else {
                header.style.backdropFilter = 'blur(20px)';
                header.style.background = 'var(--glass-bg)';
            }
        }
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    // New engaging features
    setupMouseTracker() {
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create subtle cursor trail
            this.createCursorTrail(mouseX, mouseY);

            // Update floating particles based on mouse
            this.updateFloatingParticles(mouseX, mouseY);
        });
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation: trailFade 1s ease-out forwards;
        `;

        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
    }

    createFloatingElements() {
        const container = document.querySelector('.animated-bg');
        if (!container) return;

        // Create additional floating geometric shapes
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-shape';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
                border-radius: ${Math.random() > 0.5 ? '50%' : '0%'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatShape ${15 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                opacity: 0.6;
            `;
            container.appendChild(element);
        }
    }

    updateFloatingParticles(mouseX, mouseY) {
        const particles = document.querySelectorAll('.particle, .floating-shape');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        particles.forEach((particle, index) => {
            const distance = Math.sqrt(
                Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
            );
            const influence = Math.max(0, 100 - distance / 5);

            const offsetX = (mouseX - centerX) * influence * 0.0002;
            const offsetY = (mouseY - centerY) * influence * 0.0002;

            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }

    startPerformanceOptimization() {
        // Implement intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.triggerCounterAnimations(entry.target);
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe all cards and important elements
        document.querySelectorAll('.calc-card, .dashboard-card').forEach(el => {
            observer.observe(el);
        });
    }

    triggerCounterAnimations(element) {
        const counters = element.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 60; // 1 second duration

            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);

                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16); // 60fps
        });
    }

    addMagneticEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
                button.style.transition = 'transform 0.3s ease';
            });

            button.addEventListener('mouseenter', () => {
                button.style.transition = 'transform 0.1s ease';
            });
        });
    }

    addGlowEffect(element, color = '139, 92, 246') {
        element.style.boxShadow = `
            0 0 20px rgba(${color}, 0.4),
            0 0 40px rgba(${color}, 0.2),
            0 0 80px rgba(${color}, 0.1)
        `;
        element.style.transition = 'box-shadow 0.3s ease';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
    }

    createPulseEffect(element) {
        element.style.animation = 'pulse 2s infinite';
    }

    addTextTypewriterEffect(element, text) {
        element.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        typeWriter();
    }

    // Enhanced User-Friendliness Features
    setupSmartNavigation() {
        // Auto-navigation based on user behavior
        this.trackUserPreferences();
        this.setupContextualHelp();
        this.addSmartSuggestions();
        this.setupGuidedTour();
    }

    trackUserPreferences() {
        const preferences = {
            mostUsedSection: localStorage.getItem('chronosphere-preferred-section') || 'dashboard',
            theme: localStorage.getItem('chronosphere-theme') || 'dark',
            lastCalculations: JSON.parse(localStorage.getItem('chronosphere-recent') || '[]')
        };

        // Apply saved preferences
        if (preferences.theme !== (this.isDarkTheme ? 'dark' : 'light')) {
            this.toggleTheme();
        }

        // Auto-navigate to preferred section after 3 seconds if no interaction
        setTimeout(() => {
            if (this.currentSection === 'dashboard' && preferences.mostUsedSection !== 'dashboard') {
                this.showAutoNavigationPrompt(preferences.mostUsedSection);
            }
        }, 3000);
    }

    showAutoNavigationPrompt(section) {
        const prompt = document.createElement('div');
        prompt.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1rem;
            color: white;
            max-width: 300px;
            z-index: 10000;
            animation: slideInLeft 0.5s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        `;

        prompt.innerHTML = `
            <div style="margin-bottom: 0.5rem; font-weight: 600;">Quick Navigation</div>
            <div style="font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.8;">
                Would you like to go to ${section.charAt(0).toUpperCase() + section.slice(1)}?
                It's your most used section.
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="this.parentElement.parentElement.remove()" style="
                    padding: 0.5rem 1rem;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    border-radius: 6px;
                    color: white;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">Later</button>
                <button onclick="chronoSphere.navigateToSection('${section}'); this.parentElement.parentElement.remove()" style="
                    padding: 0.5rem 1rem;
                    background: var(--primary-purple);
                    border: none;
                    border-radius: 6px;
                    color: white;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">Go Now</button>
            </div>
        `;

        document.body.appendChild(prompt);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (prompt.parentElement) prompt.remove();
        }, 5000);
    }

    setupContextualHelp() {
        // Add help tooltips that appear contextually
        const helpElements = document.querySelectorAll('input, select, button');

        helpElements.forEach(element => {
            element.addEventListener('focus', () => {
                this.showContextualHelp(element);
            });

            element.addEventListener('blur', () => {
                this.hideContextualHelp();
            });
        });
    }

    showContextualHelp(element) {
        const helpMessages = {
            'yearInput': 'Enter any year between 1000-9999 to analyze month lengths',
            'monthSelect': 'Select a month to find all Mondays within it',
            'checkDate': 'Pick any date to check if it falls on Friday the 13th',
            'formatDate': 'Choose a date to see it formatted in various international styles',
            'globalSearch': 'Search for any functionality or navigate quickly'
        };

        const message = helpMessages[element.id];
        if (!message) return;

        this.hideContextualHelp(); // Remove any existing help

        const helpTooltip = document.createElement('div');
        helpTooltip.className = 'contextual-help';
        helpTooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.8rem;
            max-width: 200px;
            z-index: 10001;
            animation: fadeInScale 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        helpTooltip.textContent = message;

        const rect = element.getBoundingClientRect();
        helpTooltip.style.left = rect.left + 'px';
        helpTooltip.style.top = (rect.bottom + 5) + 'px';

        document.body.appendChild(helpTooltip);
    }

    hideContextualHelp() {
        const existing = document.querySelector('.contextual-help');
        if (existing) existing.remove();
    }

    addSmartSuggestions() {
        // Add smart suggestions based on current date/context
        const today = new Date();
        const suggestions = [];

        // Suggest checking if today is Friday the 13th
        if (today.getDay() === 5 && today.getDate() === 13) {
            suggestions.push({
                title: "🎃 Today is Friday the 13th!",
                action: () => this.navigateToSection('analyzer'),
                priority: 'high'
            });
        }

        // Suggest month analysis for new months
        if (today.getDate() <= 3) {
            suggestions.push({
                title: "📅 Analyze this month's structure",
                action: () => this.navigateToSection('calculator'),
                priority: 'medium'
            });
        }

        // Show suggestions if any
        if (suggestions.length > 0) {
            setTimeout(() => this.showSmartSuggestions(suggestions), 2000);
        }
    }

    showSmartSuggestions(suggestions) {
        const container = document.createElement('div');
        container.className = 'smart-suggestions';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1rem;
            color: white;
            max-width: 320px;
            z-index: 10000;
            animation: slideInUp 0.6s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        `;

        let html = '<div style="font-weight: 600; margin-bottom: 0.75rem; display: flex; align-items: center;"><span style="margin-right: 0.5rem;">💡</span>Smart Suggestions</div>';

        suggestions.forEach((suggestion, index) => {
            html += `
                <div style="
                    margin-bottom: 0.5rem;
                    padding: 0.5rem;
                    background: rgba(255,255,255,0.05);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                "
                onclick="chronoSphere.executeSuggestion(${index})"
                onmouseover="this.style.background='rgba(139,92,246,0.2)'"
                onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                    <div style="font-size: 0.9rem;">${suggestion.title}</div>
                </div>
            `;
        });

        html += `
            <div style="margin-top: 0.75rem; text-align: right;">
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">Dismiss</button>
            </div>
        `;

        container.innerHTML = html;
        document.body.appendChild(container);

        // Store suggestions for execution
        window.chronosphereSuggestions = suggestions;

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (container.parentElement) container.remove();
        }, 10000);
    }

    executeSuggestion(index) {
        const suggestions = window.chronosphereSuggestions || [];
        if (suggestions[index]) {
            suggestions[index].action();
            document.querySelector('.smart-suggestions')?.remove();
        }
    }

    setupGuidedTour() {
        // Check if user has seen the tour
        const hasSeenTour = localStorage.getItem('chronosphere-tour-completed');

        if (!hasSeenTour) {
            setTimeout(() => this.startGuidedTour(), 5000);
        }
    }

    startGuidedTour() {
        const tourSteps = [
            {
                element: '.sidebar',
                title: 'Navigation Sidebar',
                description: 'Use this sidebar to navigate between different sections of ChronoSphere.',
                position: 'right'
            },
            {
                element: '.main-clock',
                title: 'Live Dashboard',
                description: 'Your real-time dashboard shows current time, world clocks, and daily statistics.',
                position: 'bottom'
            },
            {
                element: '.global-search',
                title: 'Smart Search',
                description: 'Use Ctrl+/ to quickly search and navigate to any feature.',
                position: 'bottom'
            },
            {
                element: '.calc-card:first-child',
                title: 'Date Calculations',
                description: 'Perform various date calculations and analyses with our powerful tools.',
                position: 'top'
            }
        ];

        this.currentTourStep = 0;
        this.tourSteps = tourSteps;
        this.showTourStep();
    }

    showTourStep() {
        if (this.currentTourStep >= this.tourSteps.length) {
            this.completeTour();
            return;
        }

        const step = this.tourSteps[this.currentTourStep];
        const element = document.querySelector(step.element);

        if (!element) {
            this.currentTourStep++;
            this.showTourStep();
            return;
        }

        // Create tour overlay
        const overlay = document.createElement('div');
        overlay.className = 'tour-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10002;
            animation: fadeInScale 0.3s ease;
        `;

        // Create tour popup
        const popup = document.createElement('div');
        popup.className = 'tour-popup';
        const rect = element.getBoundingClientRect();

        popup.style.cssText = `
            position: fixed;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1.5rem;
            color: white;
            max-width: 300px;
            z-index: 10003;
            animation: slideInUp 0.4s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        `;

        // Position popup based on step position
        switch (step.position) {
            case 'right':
                popup.style.left = (rect.right + 20) + 'px';
                popup.style.top = rect.top + 'px';
                break;
            case 'bottom':
                popup.style.left = rect.left + 'px';
                popup.style.top = (rect.bottom + 20) + 'px';
                break;
            case 'top':
                popup.style.left = rect.left + 'px';
                popup.style.top = (rect.top - 200) + 'px';
                break;
        }

        popup.innerHTML = `
            <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">${step.title}</div>
            <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 1.5rem;">${step.description}</div>
            <div style="display: flex; justify-content: between; align-items: center;">
                <div style="font-size: 0.8rem; opacity: 0.7;">Step ${this.currentTourStep + 1} of ${this.tourSteps.length}</div>
                <div style="margin-left: auto; display: flex; gap: 0.5rem;">
                    <button onclick="chronoSphere.skipTour()" style="
                        background: none;
                        border: 1px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.8rem;
                    ">Skip</button>
                    <button onclick="chronoSphere.nextTourStep()" style="
                        background: var(--primary-purple);
                        border: none;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.8rem;
                    ">${this.currentTourStep === this.tourSteps.length - 1 ? 'Finish' : 'Next'}</button>
                </div>
            </div>
        `;

        // Highlight target element
        element.style.position = 'relative';
        element.style.zIndex = '10003';
        element.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.6)';
        element.style.borderRadius = '8px';

        document.body.appendChild(overlay);
        document.body.appendChild(popup);

        // Store references for cleanup
        this.currentTourOverlay = overlay;
        this.currentTourPopup = popup;
        this.currentTourElement = element;
    }

    nextTourStep() {
        this.cleanupTourStep();
        this.currentTourStep++;
        this.showTourStep();
    }

    skipTour() {
        this.cleanupTourStep();
        this.completeTour();
    }

    cleanupTourStep() {
        if (this.currentTourOverlay) this.currentTourOverlay.remove();
        if (this.currentTourPopup) this.currentTourPopup.remove();
        if (this.currentTourElement) {
            this.currentTourElement.style.position = '';
            this.currentTourElement.style.zIndex = '';
            this.currentTourElement.style.boxShadow = '';
            this.currentTourElement.style.borderRadius = '';
        }
    }

    completeTour() {
        localStorage.setItem('chronosphere-tour-completed', 'true');
        this.showToast('🎉 Tour completed! You\'re ready to explore ChronoSphere!', 'success');
    }

    setupAccessibilityEnhancements() {
        // Add ARIA labels and roles
        this.addAriaLabels();
        this.setupKeyboardNavigation();
        this.addScreenReaderSupport();
        this.setupFocusManagement();
    }

    addAriaLabels() {
        // Add proper ARIA labels to interactive elements
        const elements = [
            { selector: '.sidebar', role: 'navigation', label: 'Main navigation' },
            { selector: '.main-header', role: 'banner', label: 'Page header' },
            { selector: '.dashboard-grid', role: 'main', label: 'Dashboard content' },
            { selector: '.calc-card', role: 'region', label: 'Calculator tool' },
            { selector: '.btn-primary', role: 'button', label: 'Primary action button' },
            { selector: '.form-input', role: 'textbox', label: 'Input field' }
        ];

        elements.forEach(({ selector, role, label }) => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('role', role);
                if (!element.getAttribute('aria-label')) {
                    element.setAttribute('aria-label', label);
                }
            });
        });
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation beyond existing shortcuts
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach((element, index) => {
            element.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        // Tab navigation cycle
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.manageFocusCycle(e);
            }
        });
    }

    manageFocusCycle(event) {
        const focusable = Array.from(document.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ));

        const currentIndex = focusable.indexOf(document.activeElement);

        if (event.shiftKey) {
            const prevIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
            focusable[prevIndex].focus();
        } else {
            const nextIndex = currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1;
            focusable[nextIndex].focus();
        }

        event.preventDefault();
    }

    addScreenReaderSupport() {
        // Add live regions for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);

        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }

    setupFocusManagement() {
        // Manage focus when navigating sections
        const originalNavigateToSection = this.navigateToSection.bind(this);
        this.navigateToSection = (sectionName) => {
            originalNavigateToSection(sectionName);

            // Focus first interactive element in new section
            const newSection = document.getElementById(sectionName);
            if (newSection) {
                const firstFocusable = newSection.querySelector('input, button, select, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    setTimeout(() => firstFocusable.focus(), 100);
                }

                // Announce section change
                this.announceToScreenReader(`Navigated to ${sectionName} section`);
            }
        };
    }

    logWelcomeMessage() {
        console.log(`
%c🕒 ChronoSphere Analytics Platform
%c===================================
%cAdvanced Date & Time Intelligence System
%cBuilt with modern web technologies

%c🚀 Features:
%c• Real-time dashboard with live clock
%c• Advanced date calculations
%c• Interactive calendar system
%c• Multi-timezone support
%c• Comprehensive date analysis
%c• Professional UI/UX design

%c⌨️  Keyboard Shortcuts:
%c• Ctrl/Cmd + M: Focus month selector
%c• Ctrl/Cmd + Y: Focus year input
%c• Ctrl/Cmd + F: Focus date input
%c• Ctrl/Cmd + /: Focus search
%c• Ctrl/Cmd + 1-3: Navigate sections
%c• Escape: Close panels

%c🎯 Ready to explore temporal analytics!
        `,
            'color: #667eea; font-size: 24px; font-weight: bold;',
            'color: #667eea; font-size: 14px;',
            'color: #9f7aea; font-size: 16px; font-weight: 600;',
            'color: #718096; font-size: 14px;',
            'color: #4ecdc4; font-size: 14px; font-weight: 600;',
            'color: #68d391; font-size: 12px;',
            'color: #68d391; font-size: 12px;',
            'color: #68d391; font-size: 12px;',
            'color: #68d391; font-size: 12px;',
            'color: #68d391; font-size: 12px;',
            'color: #68d391; font-size: 12px;',
            'color: #f093fb; font-size: 14px; font-weight: 600;',
            'color: #fbb6ce; font-size: 12px;',
            'color: #fbb6ce; font-size: 12px;',
            'color: #fbb6ce; font-size: 12px;',
            'color: #fbb6ce; font-size: 12px;',
            'color: #fbb6ce; font-size: 12px;',
            'color: #fbb6ce; font-size: 12px;',
            'color: #667eea; font-size: 16px; font-weight: bold;'
        );
    }

    // Cleanup
    destroy() {
        // Clear all timers
        this.timers.forEach((timer, key) => {
            clearInterval(timer);
        });
        this.timers.clear();

        // Remove event listeners
        // (In a real application, you'd store references to remove them)
    }
}

// Global functions for HTML onclick handlers (maintaining backward compatibility)
let chronoSphere;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    chronoSphere = new ChronoSphere();
});

// Expose global functions for onclick handlers
window.calculateMonthLengths = () => chronoSphere?.calculateMonthLengths();
window.findMondays = () => chronoSphere?.findMondays();
window.checkFridayThe13th = () => chronoSphere?.checkFridayThe13th();
window.findAllFridayThe13th = () => chronoSphere?.findAllFridayThe13th();
window.formatDate = () => chronoSphere?.formatDate();
window.calculateDateDifference = () => chronoSphere?.calculateDateDifference();
window.addDaysToDate = () => chronoSphere?.addDaysToDate();

// CSS for additional styling and animations
const additionalStyles = `
.search-highlight {
    background: rgba(255, 215, 0, 0.3) !important;
    border-radius: 4px;
    transition: background 0.3s ease;
}

.error-message {
    animation: shake 0.5s ease-in-out;
}

/* Enhanced Animations */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes spookySpin {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
}

@keyframes ripple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}

@keyframes buttonRipple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.8;
    }
    100% {
        transform: translate(-50%, -50%) scale(6);
        opacity: 0;
    }
}

@keyframes trailFade {
    0% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
}

@keyframes floatShape {
    0% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.6;
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 0.8;
    }
    100% {
        transform: translateY(0px) rotate(360deg);
        opacity: 0.6;
    }
}

@keyframes checkmarkPop {
    0% {
        transform: translateY(-50%) scale(0);
        opacity: 0;
    }
    50% {
        transform: translateY(-50%) scale(1.2);
        opacity: 1;
    }
    100% {
        transform: translateY(-50%) scale(1);
        opacity: 1;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    }
    50% {
        transform: scale(1.02);
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    }
}

@keyframes slideInUp {
    0% {
        transform: translateY(30px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideInLeft {
    0% {
        transform: translateX(-30px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeInScale {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Enhanced interactive elements */
.animate-in {
    animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.calc-card:hover,
.dashboard-card:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

.btn-primary:active,
.btn-secondary:active {
    transform: scale(0.98) !important;
    transition: transform 0.1s ease !important;
}

.form-input:focus {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    border-color: rgba(139, 92, 246, 0.8);
}

.nav-item:hover {
    transform: translateX(5px);
    background: rgba(139, 92, 246, 0.1);
}

.calendar-day:hover {
    transform: scale(1.1);
    background: var(--primary-purple);
    color: white;
}

.world-clock-item:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.1);
}

.stat-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* Loading enhancements */
.loading-screen {
    backdrop-filter: blur(20px);
}

.loading-animation {
    animation: pulse 2s infinite ease-in-out;
}

/* Notification enhancements */
.notification-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

/* Result styling improvements */
.summary {
    margin-top: 1.5rem;
    padding: 1rem;
    background: var(--success-gradient);
    color: white;
    border-radius: var(--border-radius);
    text-align: center;
    font-weight: 600;
    box-shadow: var(--shadow-base);
    animation: slideInUp 0.5s ease;
}

.result-header {
    margin-bottom: 1.5rem;
    animation: fadeInScale 0.4s ease;
}

.result-header h3 {
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
}

.no-results {
    text-align: center;
    padding: 2rem;
    color: rgba(255, 255, 255, 0.8);
    animation: fadeInScale 0.6s ease;
}

.warning-note {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 107, 107, 0.2);
    border: 1px solid rgba(255, 107, 107, 0.5);
    border-radius: var(--border-radius);
    color: #ff6b6b;
    font-weight: 500;
    text-align: center;
    animation: shake 0.5s ease;
}

/* Mobile responsiveness enhancements */
@media (max-width: 768px) {
    .calc-card:hover,
    .dashboard-card:hover {
        transform: none !important;
        box-shadow: var(--shadow-base) !important;
    }

    .form-input:focus {
        transform: none;
    }

    .nav-item:hover {
        transform: none;
    }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .calc-card,
    .dashboard-card {
        border: 2px solid white;
    }

    .btn-primary,
    .btn-secondary {
        border: 2px solid white;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);