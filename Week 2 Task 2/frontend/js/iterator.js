/**
 * Iterator Interface Simulation in JavaScript
 * This file contains the JavaScript implementation that mirrors the Java iterator interface
 * functionality demonstrated in the backend ListIterator.java file.
 */

class CustomListIterator {
    constructor(list) {
        this.list = [...list];
        this.currentIndex = 0;
        this.canRemove = false;
        this.originalList = [...list];
    }

    hasNext() {
        return this.currentIndex < this.list.length;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error('No more elements in the list');
        }
        this.canRemove = true;
        return this.list[this.currentIndex++];
    }

    remove() {
        if (!this.canRemove) {
            throw new Error('Cannot remove element. Call next() first.');
        }
        this.list.splice(--this.currentIndex, 1);
        this.canRemove = false;
    }

    removeIf(predicate) {
        let removedCount = 0;
        let originalIndex = this.currentIndex;

        this.currentIndex = 0;

        while (this.currentIndex < this.list.length) {
            if (predicate(this.list[this.currentIndex])) {
                this.list.splice(this.currentIndex, 1);
                removedCount++;
            } else {
                this.currentIndex++;
            }
        }

        this.currentIndex = Math.min(originalIndex, this.list.length);
        this.canRemove = false;

        return removedCount;
    }

    forEachRemaining(action) {
        while (this.hasNext()) {
            action(this.next());
        }
        this.canRemove = false;
    }

    reset() {
        this.list = [...this.originalList];
        this.currentIndex = 0;
        this.canRemove = false;
    }

    getList() {
        return [...this.list];
    }

    getOriginalList() {
        return [...this.originalList];
    }

    size() {
        return this.list.length;
    }

    originalSize() {
        return this.originalList.length;
    }
}

class IteratorDemoRunner {
    constructor() {
        this.currentIterator = null;
        this.executionStartTime = 0;
        this.animationDelay = 300;
    }

    async runBasicDemo(inputItems, targetItem) {
        const startTime = performance.now();
        this.executionStartTime = startTime;

        const items = this.parseInput(inputItems);
        this.currentIterator = new CustomListIterator(items);

        updateVisualization(this.currentIterator.getOriginalList(), [], 'basic');

        await this.delay(500);

        let found = false;
        const processedItems = [];
        const removedItems = [];

        while (this.currentIterator.hasNext()) {
            const item = this.currentIterator.next();
            processedItems.push(item);

            if (item.trim().toLowerCase() === targetItem.trim().toLowerCase() && !found) {
                this.currentIterator.remove();
                removedItems.push(item);
                found = true;

                await this.animateRemoval(item);
                updateVisualization(this.currentIterator.getOriginalList(), this.currentIterator.getList(), 'basic');
                break;
            }

            await this.delay(this.animationDelay);
        }

        const endTime = performance.now();
        this.updateStats(
            this.currentIterator.originalSize(),
            removedItems.length,
            this.currentIterator.size(),
            endTime - startTime
        );

        return {
            original: this.currentIterator.getOriginalList(),
            result: this.currentIterator.getList(),
            removed: removedItems.length,
            executionTime: endTime - startTime
        };
    }

    async runWordsDemo(inputSentences, filterWord) {
        const startTime = performance.now();
        this.executionStartTime = startTime;

        const sentences = this.parseInput(inputSentences);
        this.currentIterator = new CustomListIterator(sentences);

        updateVisualization(this.currentIterator.getOriginalList(), [], 'words');

        await this.delay(500);

        const removedItems = [];
        const predicate = (sentence) => {
            const shouldRemove = sentence.toLowerCase().includes(filterWord.toLowerCase());
            if (shouldRemove) {
                removedItems.push(sentence);
            }
            return shouldRemove;
        };

        const removedCount = await this.animatedRemoveIf(predicate);

        const endTime = performance.now();
        this.updateStats(
            this.currentIterator.originalSize(),
            removedCount,
            this.currentIterator.size(),
            endTime - startTime
        );

        updateVisualization(this.currentIterator.getOriginalList(), this.currentIterator.getList(), 'words');

        return {
            original: this.currentIterator.getOriginalList(),
            result: this.currentIterator.getList(),
            removed: removedCount,
            executionTime: endTime - startTime
        };
    }

    async runCharactersDemo(inputWords, filterChar) {
        const startTime = performance.now();
        this.executionStartTime = startTime;

        const words = this.parseInput(inputWords);
        this.currentIterator = new CustomListIterator(words);

        updateVisualization(this.currentIterator.getOriginalList(), [], 'characters');

        await this.delay(500);

        const removedItems = [];
        const predicate = (word) => {
            const shouldRemove = word.toLowerCase().includes(filterChar.toLowerCase());
            if (shouldRemove) {
                removedItems.push(word);
            }
            return shouldRemove;
        };

        const removedCount = await this.animatedRemoveIf(predicate);

        const endTime = performance.now();
        this.updateStats(
            this.currentIterator.originalSize(),
            removedCount,
            this.currentIterator.size(),
            endTime - startTime
        );

        updateVisualization(this.currentIterator.getOriginalList(), this.currentIterator.getList(), 'characters');

        return {
            original: this.currentIterator.getOriginalList(),
            result: this.currentIterator.getList(),
            removed: removedCount,
            executionTime: endTime - startTime
        };
    }

    async runLengthDemo(inputItems, minLength) {
        const startTime = performance.now();
        this.executionStartTime = startTime;

        const items = this.parseInput(inputItems);
        this.currentIterator = new CustomListIterator(items);

        updateVisualization(this.currentIterator.getOriginalList(), [], 'length');

        await this.delay(500);

        const removedItems = [];
        const predicate = (item) => {
            const shouldRemove = item.trim().length < minLength;
            if (shouldRemove) {
                removedItems.push(item);
            }
            return shouldRemove;
        };

        const removedCount = await this.animatedRemoveIf(predicate);

        const endTime = performance.now();
        this.updateStats(
            this.currentIterator.originalSize(),
            removedCount,
            this.currentIterator.size(),
            endTime - startTime
        );

        updateVisualization(this.currentIterator.getOriginalList(), this.currentIterator.getList(), 'length');

        return {
            original: this.currentIterator.getOriginalList(),
            result: this.currentIterator.getList(),
            removed: removedCount,
            executionTime: endTime - startTime
        };
    }

    async runComplexDemo(inputEmails, transformToUppercase = true) {
        const startTime = performance.now();
        this.executionStartTime = startTime;

        const emails = this.parseInput(inputEmails);
        this.currentIterator = new CustomListIterator(emails);

        updateVisualization(this.currentIterator.getOriginalList(), [], 'complex');

        await this.delay(500);

        const removedItems = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const predicate = (email) => {
            const isValid = emailRegex.test(email.trim());
            if (!isValid) {
                removedItems.push(email);
            }
            return !isValid;
        };

        const removedCount = await this.animatedRemoveIf(predicate);

        let resultList = this.currentIterator.getList();

        if (transformToUppercase) {
            resultList = resultList.map(email => email.toUpperCase());
            this.currentIterator.list = resultList;
        }

        const endTime = performance.now();
        this.updateStats(
            this.currentIterator.originalSize(),
            removedCount,
            this.currentIterator.size(),
            endTime - startTime
        );

        updateVisualization(this.currentIterator.getOriginalList(), resultList, 'complex');

        return {
            original: this.currentIterator.getOriginalList(),
            result: resultList,
            removed: removedCount,
            executionTime: endTime - startTime
        };
    }

    async animatedRemoveIf(predicate) {
        let removedCount = 0;
        let currentIndex = 0;

        while (currentIndex < this.currentIterator.list.length) {
            const item = this.currentIterator.list[currentIndex];

            await this.highlightItem(item, currentIndex);

            if (predicate(item)) {
                await this.animateRemoval(item);
                this.currentIterator.list.splice(currentIndex, 1);
                removedCount++;
            } else {
                await this.animateProcess(item);
                currentIndex++;
            }

            await this.delay(this.animationDelay);
        }

        return removedCount;
    }

    async highlightItem(item, index) {
        const originalContainer = document.getElementById('original-list');
        const items = originalContainer.querySelectorAll('.list-item');

        if (items[index]) {
            items[index].classList.add('animate-highlight');
            await this.delay(200);
            items[index].classList.remove('animate-highlight');
        }
    }

    async animateRemoval(item) {
        console.log(`Removing item: ${item}`);
        await this.delay(200);
    }

    async animateProcess(item) {
        console.log(`Processing item: ${item}`);
        await this.delay(100);
    }

    parseInput(input) {
        if (typeof input === 'string') {
            return input.split(',').map(item => item.trim()).filter(item => item.length > 0);
        }
        return Array.isArray(input) ? input : [];
    }

    updateStats(original, removed, remaining, executionTime) {
        const originalCountEl = document.getElementById('original-count');
        const removedCountEl = document.getElementById('removed-count');
        const remainingCountEl = document.getElementById('remaining-count');
        const executionTimeEl = document.getElementById('execution-time');

        if (originalCountEl) {
            this.animateCounter(originalCountEl, 0, original);
        }
        if (removedCountEl) {
            this.animateCounter(removedCountEl, 0, removed);
        }
        if (remainingCountEl) {
            this.animateCounter(remainingCountEl, 0, remaining);
        }
        if (executionTimeEl) {
            executionTimeEl.textContent = `${Math.round(executionTime)}ms`;
            executionTimeEl.classList.add('animate-countUp');
        }
    }

    async animateCounter(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const startValue = start;
        const endValue = end;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (endValue - startValue) * progress);

            element.textContent = currentValue;
            element.classList.add('animate-countUp');

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset() {
        if (this.currentIterator) {
            this.currentIterator.reset();
        }
        this.executionStartTime = 0;
    }

    getCurrentIterator() {
        return this.currentIterator;
    }

    setAnimationDelay(delay) {
        this.animationDelay = Math.max(100, Math.min(1000, delay));
    }
}

const iteratorDemo = new IteratorDemoRunner();

window.iteratorDemo = iteratorDemo;