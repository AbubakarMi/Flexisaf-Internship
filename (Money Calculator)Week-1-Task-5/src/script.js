/**
 * CURRENCYFLEX - ADVANCED MONEY CALCULATOR
 * Modern ES6+ Implementation with Enhanced Features
 * Features: Real-time updates, History tracking, Animations, Smart UX
 */

// Enhanced exchange rates with more currencies
const exchangeRates = {
    'USD': {
        'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0, 'CAD': 1.25,
        'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45, 'USD': 1.0
    },
    'EUR': {
        'USD': 1.18, 'GBP': 0.86, 'JPY': 129.0, 'CAD': 1.47,
        'AUD': 1.59, 'CHF': 1.08, 'CNY': 7.60, 'EUR': 1.0
    },
    'GBP': {
        'USD': 1.37, 'EUR': 1.16, 'JPY': 151.0, 'CAD': 1.71,
        'AUD': 1.85, 'CHF': 1.26, 'CNY': 8.84, 'GBP': 1.0
    },
    'JPY': {
        'USD': 0.0091, 'EUR': 0.0078, 'GBP': 0.0066, 'CAD': 0.0114,
        'AUD': 0.0123, 'CHF': 0.0084, 'CNY': 0.0586, 'JPY': 1.0
    },
    'CAD': {
        'USD': 0.80, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 88.0,
        'AUD': 1.08, 'CHF': 0.74, 'CNY': 5.16, 'CAD': 1.0
    },
    'AUD': {
        'USD': 0.74, 'EUR': 0.63, 'GBP': 0.54, 'JPY': 81.5,
        'CAD': 0.93, 'CHF': 0.68, 'CNY': 4.77, 'AUD': 1.0
    },
    'CHF': {
        'USD': 1.09, 'EUR': 0.93, 'GBP': 0.79, 'JPY': 119.6,
        'CAD': 1.36, 'AUD': 1.47, 'CNY': 7.03, 'CHF': 1.0
    },
    'CNY': {
        'USD': 0.155, 'EUR': 0.132, 'GBP': 0.113, 'JPY': 17.05,
        'CAD': 0.194, 'AUD': 0.210, 'CHF': 0.142, 'CNY': 1.0
    }
};

// Enhanced currency symbols mapping
const currencySymbols = {
    'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥',
    'CAD': 'C$', 'AUD': 'A$', 'CHF': 'Fr', 'CNY': '¥'
};

// Currency names for display
const currencyNames = {
    'USD': 'US Dollar', 'EUR': 'Euro', 'GBP': 'British Pound', 'JPY': 'Japanese Yen',
    'CAD': 'Canadian Dollar', 'AUD': 'Australian Dollar', 'CHF': 'Swiss Franc', 'CNY': 'Chinese Yuan'
};

// Main Application Class
class CurrencyFlex {
    constructor() {
        this.calculationHistory = JSON.parse(localStorage.getItem('currencyflexHistory') || '[]');
        this.calculationCount = parseInt(localStorage.getItem('currencyflexCount') || '0');
        this.lastUpdate = new Date();

        this.init();
    }

    async init() {
        await this.showLoadingScreen();
        this.setupEventListeners();
        this.updateStats();
        this.updateRateDisplay();
        this.setupAnimations();
        this.setupRealTimeUpdates();
        this.loadHistory();
        this.hideLoadingScreen();
        this.showWelcomeAnimation();
    }

    // Loading Screen Management
    async showLoadingScreen() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen?.remove(), 500);
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Form inputs with real-time validation
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('focus', () => this.animateInputFocus(input));
            input.addEventListener('blur', () => this.animateInputBlur(input));
        });

        // Enter key support for all inputs
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const section = input.closest('.calc-card');
                    const button = section?.querySelector('.btn-primary');
                    if (button) {
                        this.animateButtonPress(button);
                        button.click();
                    }
                }
            });
        });

        // Currency selects with change animations
        const selects = document.querySelectorAll('.currency-select');
        selects.forEach(select => {
            select.addEventListener('change', () => this.animateSelectChange(select));
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => this.addButtonHoverEffect(button));
            button.addEventListener('mouseleave', () => this.removeButtonHoverEffect(button));
        });
    }

    // Enhanced Money Class
    createMoney(amount, currency) {
        return {
            amount: parseFloat(amount),
            currency: currency,
            symbol: currencySymbols[currency],
            name: currencyNames[currency],
            toString() {
                const formatted = this.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                return `${formatted} ${this.symbol}`;
            },
            toDisplayString() {
                return `${this.toString()} (${this.name})`;
            }
        };
    }

    // Enhanced Calculator with detailed results
    convert(money, toCurrency) {
        if (money.currency === toCurrency) {
            return { result: money, rate: 1.0, details: 'Same currency - no conversion needed' };
        }

        const rate = exchangeRates[money.currency]?.[toCurrency];
        if (!rate) {
            throw new Error(`Exchange rate not available for ${money.currency} to ${toCurrency}`);
        }

        const convertedAmount = money.amount * rate;
        const result = this.createMoney(convertedAmount, toCurrency);

        return {
            result,
            rate,
            details: `1 ${money.currency} = ${rate.toFixed(6)} ${toCurrency}`
        };
    }

    add(money1, money2, resultCurrency) {
        const conversion1 = this.convert(money1, resultCurrency);
        const conversion2 = this.convert(money2, resultCurrency);

        const result = this.createMoney(
            conversion1.result.amount + conversion2.result.amount,
            resultCurrency
        );

        return { result, conversions: [conversion1, conversion2] };
    }

    subtract(money1, money2, resultCurrency) {
        const conversion1 = this.convert(money1, resultCurrency);
        const conversion2 = this.convert(money2, resultCurrency);

        const result = this.createMoney(
            conversion1.result.amount - conversion2.result.amount,
            resultCurrency
        );

        return { result, conversions: [conversion1, conversion2] };
    }

    // Currency Conversion with Enhanced Features
    convertCurrency() {
        try {
            const amount = parseFloat(document.getElementById('convert-amount').value);
            const fromCurrency = document.getElementById('from-currency').value;
            const toCurrency = document.getElementById('to-currency').value;

            if (isNaN(amount) || amount <= 0) {
                throw new Error('Please enter a valid positive amount');
            }

            if (amount > 1000000000) {
                throw new Error('Amount too large. Please enter a value less than 1 billion');
            }

            const money = this.createMoney(amount, fromCurrency);
            const conversion = this.convert(money, toCurrency);

            // Display main result
            const resultElement = document.getElementById('conversion-result');
            resultElement.innerHTML = `
                <div class="result-main">${money.toString()} = ${conversion.result.toString()}</div>
            `;

            // Display detailed information
            const detailsElement = document.getElementById('conversion-details');
            detailsElement.innerHTML = `
                <div class="conversion-rate">Exchange Rate: ${conversion.details}</div>
                <div class="conversion-time">Updated: ${this.formatTime(new Date())}</div>
            `;

            this.animateResults(resultElement);
            this.addToHistory('conversion', `${money.toString()} → ${conversion.result.toString()}`, conversion.result.toString());
            this.incrementCalculationCount();

        } catch (error) {
            this.showError('conversion-result', error.message);
        }
    }

    // Enhanced Addition with Detailed Results
    addMoney() {
        try {
            const amount1 = parseFloat(document.getElementById('add-amount1').value);
            const currency1 = document.getElementById('add-currency1').value;
            const amount2 = parseFloat(document.getElementById('add-amount2').value);
            const currency2 = document.getElementById('add-currency2').value;
            const resultCurrency = document.getElementById('add-result-currency').value;

            if (isNaN(amount1) || amount1 < 0 || isNaN(amount2) || amount2 < 0) {
                throw new Error('Please enter valid positive amounts');
            }

            const money1 = this.createMoney(amount1, currency1);
            const money2 = this.createMoney(amount2, currency2);
            const calculation = this.add(money1, money2, resultCurrency);

            const resultElement = document.getElementById('add-result');
            resultElement.innerHTML = `
                <div class="operation-result">
                    <div class="operation-display">${money1.toString()} + ${money2.toString()}</div>
                    <div class="operation-equals">=</div>
                    <div class="operation-final">${calculation.result.toString()}</div>
                </div>
            `;

            this.animateResults(resultElement);
            this.addToHistory('addition', `${money1.toString()} + ${money2.toString()}`, calculation.result.toString());
            this.incrementCalculationCount();

        } catch (error) {
            this.showError('add-result', error.message);
        }
    }

    // Enhanced Subtraction with Detailed Results
    subtractMoney() {
        try {
            const amount1 = parseFloat(document.getElementById('sub-amount1').value);
            const currency1 = document.getElementById('sub-currency1').value;
            const amount2 = parseFloat(document.getElementById('sub-amount2').value);
            const currency2 = document.getElementById('sub-currency2').value;
            const resultCurrency = document.getElementById('sub-result-currency').value;

            if (isNaN(amount1) || amount1 < 0 || isNaN(amount2) || amount2 < 0) {
                throw new Error('Please enter valid positive amounts');
            }

            const money1 = this.createMoney(amount1, currency1);
            const money2 = this.createMoney(amount2, currency2);
            const calculation = this.subtract(money1, money2, resultCurrency);

            const resultElement = document.getElementById('sub-result');
            resultElement.innerHTML = `
                <div class="operation-result">
                    <div class="operation-display">${money1.toString()} - ${money2.toString()}</div>
                    <div class="operation-equals">=</div>
                    <div class="operation-final">${calculation.result.toString()}</div>
                </div>
            `;

            this.animateResults(resultElement);
            this.addToHistory('subtraction', `${money1.toString()} - ${money2.toString()}`, calculation.result.toString());
            this.incrementCalculationCount();

        } catch (error) {
            this.showError('sub-result', error.message);
        }
    }

    // Swap Currencies Function
    swapCurrencies() {
        const fromSelect = document.getElementById('from-currency');
        const toSelect = document.getElementById('to-currency');

        const fromValue = fromSelect.value;
        const toValue = toSelect.value;

        // Animate swap
        this.animateSwap();

        setTimeout(() => {
            fromSelect.value = toValue;
            toSelect.value = fromValue;
        }, 150);
    }

    // History Management
    addToHistory(type, calculation, result) {
        const historyItem = {
            id: Date.now(),
            type,
            calculation,
            result,
            timestamp: new Date().toISOString(),
            rate: this.getCurrentRate(type)
        };

        this.calculationHistory.unshift(historyItem);

        // Keep only last 50 calculations
        if (this.calculationHistory.length > 50) {
            this.calculationHistory = this.calculationHistory.slice(0, 50);
        }

        localStorage.setItem('currencyflexHistory', JSON.stringify(this.calculationHistory));
        this.displayHistory();
    }

    displayHistory() {
        const historyList = document.getElementById('history-list');

        if (this.calculationHistory.length === 0) {
            historyList.innerHTML = `
                <div class="no-history">
                    <span class="history-icon">📈</span>
                    <p>No calculations yet</p>
                    <span class="history-subtitle">Start converting currencies to see your history</span>
                </div>
            `;
            return;
        }

        const historyHTML = this.calculationHistory.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-calculation">${item.calculation}</div>
                <div class="history-result">${item.result}</div>
                <div class="history-time">${this.formatTime(new Date(item.timestamp))}</div>
            </div>
        `).join('');

        historyList.innerHTML = historyHTML;

        // Add click handlers for history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                this.animateHistoryItemClick(item);
            });
        });
    }

    clearHistory() {
        this.calculationHistory = [];
        localStorage.removeItem('currencyflexHistory');
        this.displayHistory();
        this.showToast('History cleared successfully', 'success');
    }

    // Stats and Updates
    updateStats() {
        document.getElementById('calcCount').textContent = this.calculationCount.toString();
        document.getElementById('lastUpdate').textContent = this.formatTime(this.lastUpdate);
    }

    incrementCalculationCount() {
        this.calculationCount++;
        localStorage.setItem('currencyflexCount', this.calculationCount.toString());
        this.updateStats();
        this.animateCounterUpdate('calcCount');
    }

    updateRateDisplay() {
        const pairs = [
            { from: 'USD', to: 'EUR', element: document.querySelector('.rate-item:nth-child(1) .rate-value') },
            { from: 'USD', to: 'GBP', element: document.querySelector('.rate-item:nth-child(2) .rate-value') },
            { from: 'USD', to: 'JPY', element: document.querySelector('.rate-item:nth-child(3) .rate-value') },
            { from: 'EUR', to: 'GBP', element: document.querySelector('.rate-item:nth-child(4) .rate-value') }
        ];

        pairs.forEach(pair => {
            if (pair.element && exchangeRates[pair.from]?.[pair.to]) {
                const rate = exchangeRates[pair.from][pair.to];
                pair.element.textContent = this.formatRate(rate);
            }
        });
    }

    setupRealTimeUpdates() {
        // Simulate real-time rate updates (in production, this would fetch from an API)
        setInterval(() => {
            this.simulateRateFluctuation();
            this.updateRateDisplay();
            this.lastUpdate = new Date();
            this.updateStats();
        }, 30000); // Update every 30 seconds
    }

    simulateRateFluctuation() {
        // Add small random fluctuations to rates (±1%)
        Object.keys(exchangeRates).forEach(fromCurrency => {
            Object.keys(exchangeRates[fromCurrency]).forEach(toCurrency => {
                if (fromCurrency !== toCurrency) {
                    const currentRate = exchangeRates[fromCurrency][toCurrency];
                    const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% fluctuation
                    exchangeRates[fromCurrency][toCurrency] = currentRate * (1 + fluctuation);
                }
            });
        });
    }

    // Animation Methods
    setupAnimations() {
        this.addParallaxEffect();
        this.setupHoverEffects();
    }

    addParallaxEffect() {
        const cards = document.querySelectorAll('.calc-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    setupHoverEffects() {
        const rateItems = document.querySelectorAll('.rate-item');

        rateItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateRateHover(item);
            });
        });
    }

    animateInputFocus(input) {
        input.style.transform = 'scale(1.02)';
        input.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)';

        // Create ripple effect
        this.createRippleEffect(input);
    }

    animateInputBlur(input) {
        input.style.transform = 'scale(1)';
        input.style.boxShadow = '';
    }

    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        this.createButtonRipple(button);

        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    animateSelectChange(select) {
        select.style.transform = 'scale(1.05)';
        setTimeout(() => {
            select.style.transform = 'scale(1)';
        }, 200);
    }

    animateResults(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    animateSwap() {
        const swapBtn = document.querySelector('.swap-btn');
        swapBtn.style.transform = 'rotate(180deg) scale(1.2)';

        setTimeout(() => {
            swapBtn.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    }

    animateCounterUpdate(elementId) {
        const element = document.getElementById(elementId);
        element.style.transform = 'scale(1.2)';
        element.style.color = '#10B981';

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 500);
    }

    animateRateHover(item) {
        item.style.transform = 'translateY(-2px) scale(1.02)';
        item.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    }

    animateHistoryItemClick(item) {
        item.style.transform = 'translateX(10px)';
        item.style.background = 'rgba(139, 92, 246, 0.2)';

        setTimeout(() => {
            item.style.transform = 'translateX(0)';
            item.style.background = '';
        }, 300);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%);
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
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: buttonRipple 0.6s linear;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
        `;

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    addButtonHoverEffect(button) {
        button.style.transform = 'translateY(-3px)';
        button.style.filter = 'brightness(1.1)';
    }

    removeButtonHoverEffect(button) {
        button.style.transform = 'translateY(0)';
        button.style.filter = 'brightness(1)';
    }

    showWelcomeAnimation() {
        const cards = document.querySelectorAll('.calc-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';

            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Utility Methods
    validateInput(input) {
        const value = parseFloat(input.value);

        if (input.value && (isNaN(value) || value < 0)) {
            input.style.borderColor = '#EF4444';
            return false;
        } else if (input.value && value > 0) {
            input.style.borderColor = '#10B981';
            return true;
        } else {
            input.style.borderColor = '';
            return true;
        }
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        element.innerHTML = `
            <div class="error-display">
                <span class="error-icon">⚠️</span>
                <span class="error-message">${message}</span>
            </div>
        `;
        element.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';

        this.animateResults(element);
    }

    showToast(message, type = 'info') {
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
            font-weight: 500;
            max-width: 300px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
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

    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatRate(rate) {
        if (rate >= 1) {
            return rate.toFixed(4);
        } else {
            return rate.toFixed(6);
        }
    }

    getCurrentRate(type) {
        // This would return the current rate used in the calculation
        // For now, return a placeholder
        return 'Live rate';
    }

    loadHistory() {
        this.displayHistory();
    }
}

// Initialize the application
let currencyFlex;

document.addEventListener('DOMContentLoaded', () => {
    currencyFlex = new CurrencyFlex();
});

// Global functions for HTML onclick handlers (backward compatibility)
window.convertCurrency = () => currencyFlex?.convertCurrency();
window.addMoney = () => currencyFlex?.addMoney();
window.subtractMoney = () => currencyFlex?.subtractMoney();
window.swapCurrencies = () => currencyFlex?.swapCurrencies();
window.clearHistory = () => currencyFlex?.clearHistory();

// Add CSS animations
const additionalStyles = `
@keyframes ripple {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
}

@keyframes buttonRipple {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
}

.operation-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
}

.operation-display {
    font-size: 1rem;
    opacity: 0.9;
}

.operation-equals {
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 0.7;
}

.operation-final {
    font-size: 1.5rem;
    font-weight: bold;
}

.error-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
}

.error-icon {
    font-size: 1.2rem;
}

.result-main {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
}

.conversion-rate,
.conversion-time {
    font-size: 0.9rem;
    opacity: 0.8;
    text-align: center;
    margin-bottom: 0.25rem;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);