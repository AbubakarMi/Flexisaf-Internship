/**
 * Main Controller for Iterator Interface Visualizer
 * Handles user interactions, demo execution, and application state
 */

class IteratorVisualizerApp {
    constructor() {
        this.currentDemo = 'basic';
        this.isRunning = false;
        this.settings = {
            animationSpeed: 300,
            autoScroll: true,
            soundEnabled: false
        };
        this.demoHistory = [];
    }

    init() {
        this.setupEventListeners();
        this.initializeUI();
        this.setupLoadingSequence();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupTabSwitching();
            this.setupDemoButtons();
            this.setupUtilityButtons();
            this.setupMobileMenu();
            this.setupScrollEffects();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupLoadingSequence() {
        const loadingScreen = document.getElementById('loading-screen');

        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                this.showWelcomeAnimation();
            }, 2000);
        }
    }

    showWelcomeAnimation() {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-stats');

        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fadeInUp');
            }, index * 200);
        });
    }

    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const demoPanels = document.querySelectorAll('.demo-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const demoType = button.getAttribute('data-demo');
                this.switchDemo(demoType, tabButtons, demoPanels);
            });
        });
    }

    switchDemo(demoType, tabButtons, demoPanels) {
        if (this.isRunning) {
            this.showNotification('Please wait for the current demo to complete', 'warning');
            return;
        }

        this.currentDemo = demoType;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        demoPanels.forEach(panel => panel.classList.remove('active'));

        const activeButton = document.querySelector(`[data-demo="${demoType}"]`);
        const activePanel = document.getElementById(`${demoType}-demo`);

        if (activeButton && activePanel) {
            activeButton.classList.add('active');
            activePanel.classList.add('active');

            animationController.rippleEffect(
                activeButton,
                activeButton.offsetWidth / 2,
                activeButton.offsetHeight / 2
            );
        }

        resetVisualization();
    }

    setupDemoButtons() {
        const runButtons = {
            'basic': () => this.runBasicDemo(),
            'words': () => this.runWordsDemo(),
            'characters': () => this.runCharactersDemo(),
            'length': () => this.runLengthDemo(),
            'complex': () => this.runComplexDemo()
        };

        Object.keys(runButtons).forEach(demoType => {
            const button = document.querySelector(`#${demoType}-demo .btn-primary`);
            if (button) {
                button.addEventListener('click', runButtons[demoType]);
            }
        });
    }

    setupUtilityButtons() {
        const resetBtn = document.querySelector('[onclick="resetVisualization()"]');
        const exportBtn = document.querySelector('[onclick="exportResults()"]');

        if (resetBtn) {
            resetBtn.onclick = () => this.resetDemo();
        }

        if (exportBtn) {
            exportBtn.onclick = () => this.exportResults();
        }
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                mobileToggle.classList.toggle('active');
            });
        }
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.doc-card, .stat-card, .viz-panel');
        animateElements.forEach(el => observer.observe(el));
    }

    async runBasicDemo() {
        if (this.isRunning) return;

        const input = document.getElementById('basic-input').value;
        const removeItem = document.getElementById('basic-remove').value;

        if (!input.trim()) {
            this.showNotification('Please enter some items', 'error');
            return;
        }

        if (!removeItem.trim()) {
            this.showNotification('Please specify an item to remove', 'error');
            return;
        }

        this.setRunning(true);

        try {
            const result = await iteratorDemo.runBasicDemo(input, removeItem);
            this.logDemoResult('basic', result);
            this.showNotification('Basic iteration demo completed successfully!', 'success');
        } catch (error) {
            this.showNotification(`Error: ${error.message}`, 'error');
        } finally {
            this.setRunning(false);
        }
    }

    async runWordsDemo() {
        if (this.isRunning) return;

        const input = document.getElementById('words-input').value;
        const filterWord = document.getElementById('words-filter').value;

        if (!input.trim()) {
            this.showNotification('Please enter some sentences', 'error');
            return;
        }

        if (!filterWord.trim()) {
            this.showNotification('Please specify a word to filter', 'error');
            return;
        }

        this.setRunning(true);

        try {
            const result = await iteratorDemo.runWordsDemo(input, filterWord);
            this.logDemoResult('words', result);
            this.showNotification(`Word filtering completed! Removed ${result.removed} items.`, 'success');
        } catch (error) {
            this.showNotification(`Error: ${error.message}`, 'error');
        } finally {
            this.setRunning(false);
        }
    }

    async runCharactersDemo() {
        if (this.isRunning) return;

        const input = document.getElementById('char-input').value;
        const filterChar = document.getElementById('char-filter').value;

        if (!input.trim()) {
            this.showNotification('Please enter some words', 'error');
            return;
        }

        if (!filterChar.trim()) {
            this.showNotification('Please specify a character to filter', 'error');
            return;
        }

        this.setRunning(true);

        try {
            const result = await iteratorDemo.runCharactersDemo(input, filterChar);
            this.logDemoResult('characters', result);
            this.showNotification(`Character filtering completed! Removed ${result.removed} items.`, 'success');
        } catch (error) {
            this.showNotification(`Error: ${error.message}`, 'error');
        } finally {
            this.setRunning(false);
        }
    }

    async runLengthDemo() {
        if (this.isRunning) return;

        const input = document.getElementById('length-input').value;
        const minLength = parseInt(document.getElementById('min-length').value);

        if (!input.trim()) {
            this.showNotification('Please enter some items', 'error');
            return;
        }

        if (isNaN(minLength) || minLength < 1) {
            this.showNotification('Please enter a valid minimum length', 'error');
            return;
        }

        this.setRunning(true);

        try {
            const result = await iteratorDemo.runLengthDemo(input, minLength);
            this.logDemoResult('length', result);
            this.showNotification(`Length filtering completed! Removed ${result.removed} items.`, 'success');
        } catch (error) {
            this.showNotification(`Error: ${error.message}`, 'error');
        } finally {
            this.setRunning(false);
        }
    }

    async runComplexDemo() {
        if (this.isRunning) return;

        const input = document.getElementById('email-input').value;
        const transformUpper = document.getElementById('uppercase-transform').checked;

        if (!input.trim()) {
            this.showNotification('Please enter some email addresses', 'error');
            return;
        }

        this.setRunning(true);

        try {
            const result = await iteratorDemo.runComplexDemo(input, transformUpper);
            this.logDemoResult('complex', result);
            this.showNotification(`Email validation completed! ${result.removed} invalid emails removed.`, 'success');
        } catch (error) {
            this.showNotification(`Error: ${error.message}`, 'error');
        } finally {
            this.setRunning(false);
        }
    }

    setRunning(running) {
        this.isRunning = running;
        const buttons = document.querySelectorAll('.demo-panel .btn-primary');

        buttons.forEach(button => {
            if (running) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner animate-rotate"></i> Running...';
            } else {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-play"></i> Run Demo';
            }
        });
    }

    logDemoResult(demoType, result) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            demoType,
            result
        };

        this.demoHistory.push(logEntry);
        console.log('Demo Result:', logEntry);
    }

    resetDemo() {
        if (this.isRunning) {
            this.showNotification('Cannot reset while demo is running', 'warning');
            return;
        }

        resetVisualization();
        iteratorDemo.reset();

        animationController.createParticleSystem(
            document.querySelector('.visualization'),
            15
        );

        this.showNotification('Visualization reset successfully', 'success');
    }

    exportResults() {
        try {
            const exportData = {
                timestamp: new Date().toISOString(),
                currentDemo: this.currentDemo,
                demoHistory: this.demoHistory,
                settings: this.settings
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `iterator-demo-results-${Date.now()}.json`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);

            this.showNotification('Results exported successfully!', 'success');
        } catch (error) {
            this.showNotification('Failed to export results', 'error');
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleResize() {
        if (window.innerWidth <= 768) {
            this.setupMobileOptimizations();
        } else {
            this.removeMobileOptimizations();
        }
    }

    setupMobileOptimizations() {
        const visualization = document.querySelector('.viz-content');
        if (visualization) {
            visualization.classList.add('mobile-layout');
        }
    }

    removeMobileOptimizations() {
        const visualization = document.querySelector('.viz-content');
        if (visualization) {
            visualization.classList.remove('mobile-layout');
        }
    }

    initializeUI() {
        this.updateTheme();
        this.loadSettings();
        this.setupKeyboardShortcuts();
    }

    updateTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('iterator-visualizer-settings');
            if (savedSettings) {
                this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            }
        } catch (error) {
            console.warn('Could not load settings:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('iterator-visualizer-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Could not save settings:', error);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'r':
                        e.preventDefault();
                        this.resetDemo();
                        break;
                    case 's':
                        e.preventDefault();
                        this.exportResults();
                        break;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                        e.preventDefault();
                        this.switchToDemoByNumber(parseInt(e.key) - 1);
                        break;
                }
            }

            if (e.key === 'Escape' && this.isRunning) {
                this.showNotification('Demo cannot be interrupted', 'info');
            }
        });
    }

    switchToDemoByNumber(index) {
        const demoTypes = ['basic', 'words', 'characters', 'length', 'complex'];
        if (index >= 0 && index < demoTypes.length) {
            const tabButtons = document.querySelectorAll('.tab-button');
            const demoPanels = document.querySelectorAll('.demo-panel');
            this.switchDemo(demoTypes[index], tabButtons, demoPanels);
        }
    }

    showNotification(message, type = 'info') {
        visualizationManager.showNotification(message, type);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

const app = new IteratorVisualizerApp();

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

window.scrollToSection = scrollToSection;
window.runBasicDemo = () => app.runBasicDemo();
window.runWordsDemo = () => app.runWordsDemo();
window.runCharactersDemo = () => app.runCharactersDemo();
window.runLengthDemo = () => app.runLengthDemo();
window.runComplexDemo = () => app.runComplexDemo();
window.resetVisualization = () => app.resetDemo();
window.exportResults = () => app.exportResults();

window.iteratorApp = app;