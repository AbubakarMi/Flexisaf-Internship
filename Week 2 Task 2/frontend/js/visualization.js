/**
 * Visualization Module for Iterator Interface Demo
 * Handles all visual updates, animations, and real-time display of iterator operations
 */

class VisualizationManager {
    constructor() {
        this.originalContainer = null;
        this.resultContainer = null;
        this.animationQueue = [];
        this.isAnimating = false;
        this.currentTheme = 'default';
        this.animationSpeed = 300;
    }

    init() {
        this.originalContainer = document.getElementById('original-list');
        this.resultContainer = document.getElementById('result-list');

        if (!this.originalContainer || !this.resultContainer) {
            console.error('Visualization containers not found');
            return false;
        }

        this.setupEventListeners();
        return true;
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    async updateVisualization(originalList, resultList, demoType = 'default') {
        this.currentTheme = demoType;

        await Promise.all([
            this.renderOriginalList(originalList),
            this.renderResultList(resultList)
        ]);

        this.updateArrowAnimation();
    }

    async renderOriginalList(items) {
        if (!this.originalContainer) return;

        if (!items || items.length === 0) {
            this.renderEmptyState(this.originalContainer, 'original');
            return;
        }

        this.originalContainer.innerHTML = '';

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const element = this.createListItemElement(item, i, 'original');
            this.originalContainer.appendChild(element);

            await this.delay(50);
            element.classList.add('animate-slideInLeft', `stagger-${Math.min(i + 1, 5)}`);
        }
    }

    async renderResultList(items) {
        if (!this.resultContainer) return;

        if (!items || items.length === 0) {
            this.renderEmptyState(this.resultContainer, 'result');
            return;
        }

        this.resultContainer.innerHTML = '';

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const element = this.createListItemElement(item, i, 'result');
            this.resultContainer.appendChild(element);

            await this.delay(50);
            element.classList.add('animate-slideInRight', `stagger-${Math.min(i + 1, 5)}`);
        }
    }

    createListItemElement(item, index, type) {
        const element = document.createElement('div');
        element.className = `list-item ${type}-item`;
        element.setAttribute('data-index', index);
        element.setAttribute('data-item', item);

        const content = document.createElement('span');
        content.className = 'item-content';
        content.textContent = item;

        const indexLabel = document.createElement('span');
        indexLabel.className = 'item-index';
        indexLabel.textContent = `[${index}]`;

        element.appendChild(indexLabel);
        element.appendChild(content);

        element.addEventListener('mouseenter', () => this.highlightItem(element));
        element.addEventListener('mouseleave', () => this.unhighlightItem(element));

        return element;
    }

    renderEmptyState(container, type) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';

        const icon = document.createElement('i');
        const text = document.createElement('div');

        if (type === 'original') {
            icon.className = 'fas fa-arrow-up';
            text.textContent = 'Run a demo to see the visualization';
        } else {
            icon.className = 'fas fa-hourglass-half';
            text.textContent = 'Processing results will appear here';
        }

        emptyState.appendChild(icon);
        emptyState.appendChild(text);
        container.innerHTML = '';
        container.appendChild(emptyState);
    }

    async animateItemRemoval(item, fromContainer = 'original') {
        const container = fromContainer === 'original' ? this.originalContainer : this.resultContainer;
        const itemElements = container.querySelectorAll('.list-item');

        let targetElement = null;
        itemElements.forEach(element => {
            if (element.getAttribute('data-item') === item) {
                targetElement = element;
            }
        });

        if (targetElement) {
            targetElement.classList.add('removing');
            await this.delay(300);

            targetElement.classList.add('animate-removeItem');
            await this.delay(500);

            if (targetElement.parentNode) {
                targetElement.parentNode.removeChild(targetElement);
            }
        }

        this.reorderItemIndices(container);
    }

    async animateItemProcessing(item, container = 'original') {
        const containerElement = container === 'original' ? this.originalContainer : this.resultContainer;
        const itemElements = containerElement.querySelectorAll('.list-item');

        let targetElement = null;
        itemElements.forEach(element => {
            if (element.getAttribute('data-item') === item) {
                targetElement = element;
            }
        });

        if (targetElement) {
            targetElement.classList.add('processing');
            targetElement.classList.add('animate-processItem');

            await this.delay(500);

            targetElement.classList.remove('processing');
            targetElement.classList.add('processed');
        }
    }

    async animateItemHighlight(item, container = 'original') {
        const containerElement = container === 'original' ? this.originalContainer : this.resultContainer;
        const itemElements = containerElement.querySelectorAll('.list-item');

        let targetElement = null;
        itemElements.forEach(element => {
            if (element.getAttribute('data-item') === item) {
                targetElement = element;
            }
        });

        if (targetElement) {
            targetElement.classList.add('animate-highlight');
            await this.delay(800);
            targetElement.classList.remove('animate-highlight');
        }
    }

    reorderItemIndices(container) {
        const items = container.querySelectorAll('.list-item');
        items.forEach((item, index) => {
            const indexLabel = item.querySelector('.item-index');
            if (indexLabel) {
                indexLabel.textContent = `[${index}]`;
            }
            item.setAttribute('data-index', index);
        });
    }

    highlightItem(element) {
        element.classList.add('highlight');
        element.style.transform = 'scale(1.02)';
        element.style.zIndex = '10';
    }

    unhighlightItem(element) {
        element.classList.remove('highlight');
        element.style.transform = '';
        element.style.zIndex = '';
    }

    updateArrowAnimation() {
        const arrow = document.querySelector('.viz-arrow i');
        if (arrow) {
            arrow.classList.remove('animate-pulse');
            void arrow.offsetWidth;
            arrow.classList.add('animate-pulse');
        }
    }

    async showProcessingFlow(items, predicate, demoType) {
        this.updateVisualization(items, [], demoType);

        const processedItems = [];
        const removedItems = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            await this.animateItemHighlight(item, 'original');

            if (predicate(item)) {
                await this.animateItemRemoval(item, 'original');
                removedItems.push(item);
            } else {
                await this.animateItemProcessing(item, 'original');
                processedItems.push(item);

                const resultElement = this.createListItemElement(item, processedItems.length - 1, 'result');
                this.resultContainer.appendChild(resultElement);
                resultElement.classList.add('animate-addItem');
            }

            await this.delay(this.animationSpeed);
        }

        return {
            processed: processedItems,
            removed: removedItems
        };
    }

    resetVisualization() {
        if (this.originalContainer) {
            this.renderEmptyState(this.originalContainer, 'original');
        }
        if (this.resultContainer) {
            this.renderEmptyState(this.resultContainer, 'result');
        }

        this.resetStats();
        this.clearAnimationQueue();
    }

    resetStats() {
        const stats = ['original-count', 'removed-count', 'remaining-count', 'execution-time'];
        stats.forEach(statId => {
            const element = document.getElementById(statId);
            if (element) {
                if (statId === 'execution-time') {
                    element.textContent = '0ms';
                } else {
                    element.textContent = '0';
                }
                element.classList.remove('animate-countUp');
            }
        });
    }

    exportVisualizationData() {
        const data = {
            timestamp: new Date().toISOString(),
            demoType: this.currentTheme,
            originalItems: this.getItemsFromContainer(this.originalContainer),
            resultItems: this.getItemsFromContainer(this.resultContainer),
            stats: {
                original: document.getElementById('original-count')?.textContent || '0',
                removed: document.getElementById('removed-count')?.textContent || '0',
                remaining: document.getElementById('remaining-count')?.textContent || '0',
                executionTime: document.getElementById('execution-time')?.textContent || '0ms'
            }
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `iterator-demo-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getItemsFromContainer(container) {
        if (!container) return [];

        const itemElements = container.querySelectorAll('.list-item');
        return Array.from(itemElements).map(element =>
            element.getAttribute('data-item')
        ).filter(item => item !== null);
    }

    setAnimationSpeed(speed) {
        this.animationSpeed = Math.max(100, Math.min(1000, speed));
    }

    addToAnimationQueue(animation) {
        this.animationQueue.push(animation);
        if (!this.isAnimating) {
            this.processAnimationQueue();
        }
    }

    async processAnimationQueue() {
        this.isAnimating = true;

        while (this.animationQueue.length > 0) {
            const animation = this.animationQueue.shift();
            await animation();
        }

        this.isAnimating = false;
    }

    clearAnimationQueue() {
        this.animationQueue = [];
        this.isAnimating = false;
    }

    handleResize() {
        const containers = [this.originalContainer, this.resultContainer];
        containers.forEach(container => {
            if (container && container.children.length === 0) {
                const type = container.id.includes('original') ? 'original' : 'result';
                this.renderEmptyState(container, type);
            }
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showSuccessNotification(message) {
        this.showNotification(message, 'success');
    }

    showErrorNotification(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        notification.classList.add('animate-slideInRight');

        setTimeout(() => {
            notification.classList.add('animate-slideOutRight');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

const visualizationManager = new VisualizationManager();

function updateVisualization(originalList, resultList, demoType) {
    if (visualizationManager.originalContainer && visualizationManager.resultContainer) {
        visualizationManager.updateVisualization(originalList, resultList, demoType);
    } else {
        visualizationManager.init();
        setTimeout(() => {
            visualizationManager.updateVisualization(originalList, resultList, demoType);
        }, 100);
    }
}

function resetVisualization() {
    visualizationManager.resetVisualization();
}

function exportResults() {
    visualizationManager.exportVisualizationData();
}

window.visualizationManager = visualizationManager;
window.updateVisualization = updateVisualization;
window.resetVisualization = resetVisualization;
window.exportResults = exportResults;