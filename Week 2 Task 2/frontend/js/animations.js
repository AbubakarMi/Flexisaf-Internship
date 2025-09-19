/**
 * Animation Controller for Iterator Interface Visualizer
 * Manages complex animations, transitions, and visual effects
 */

class AnimationController {
    constructor() {
        this.activeAnimations = new Map();
        this.animationId = 0;
        this.defaultDuration = 300;
        this.easing = {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };
    }

    createParticleSystem(container, count = 20) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.6);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle${(i % 3) + 1} ${3 + Math.random() * 2}s infinite linear;
            `;

            container.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (3 + Math.random() * 2) * 1000);
        }
    }

    async animateCounter(element, startValue, endValue, duration = 1000) {
        if (!element) return;

        const animationId = ++this.animationId;
        this.activeAnimations.set(animationId, true);

        const startTime = performance.now();
        const valueRange = endValue - startValue;

        const animate = (currentTime) => {
            if (!this.activeAnimations.get(animationId)) return;

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = Math.floor(startValue + valueRange * this.easeOutCubic(progress));
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.activeAnimations.delete(animationId);
            }
        };

        requestAnimationFrame(animate);
    }

    async morphContainer(element, fromClass, toClass, duration = 400) {
        if (!element) return;

        element.classList.add('morphing');

        await this.delay(duration / 2);

        element.classList.remove(fromClass);
        element.classList.add(toClass);

        await this.delay(duration / 2);

        element.classList.remove('morphing');
    }

    async typewriterEffect(element, text, speed = 50) {
        if (!element) return;

        element.textContent = '';
        element.style.borderRight = '2px solid';
        element.style.animation = 'blink 1s infinite';

        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.delay(speed);
        }

        element.style.borderRight = '';
        element.style.animation = '';
    }

    async slideInFromDirection(element, direction = 'right', distance = 100, duration = 300) {
        if (!element) return;

        const transforms = {
            right: `translateX(${distance}px)`,
            left: `translateX(-${distance}px)`,
            top: `translateY(-${distance}px)`,
            bottom: `translateY(${distance}px)`
        };

        element.style.transform = transforms[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ${this.easing.easeOut}`;

        await this.delay(10);

        element.style.transform = 'translate(0, 0)';
        element.style.opacity = '1';

        await this.delay(duration);

        element.style.transition = '';
    }

    async pulseElement(element, intensity = 1.1, duration = 300) {
        if (!element) return;

        const originalTransform = element.style.transform;

        element.style.transition = `transform ${duration / 2}ms ${this.easing.easeOut}`;
        element.style.transform = `${originalTransform} scale(${intensity})`;

        await this.delay(duration / 2);

        element.style.transform = originalTransform;

        await this.delay(duration / 2);

        element.style.transition = '';
    }

    async shakeElement(element, intensity = 10, duration = 500) {
        if (!element) return;

        const animationId = ++this.animationId;
        this.activeAnimations.set(animationId, true);

        const startTime = performance.now();
        const originalTransform = element.style.transform;

        const animate = (currentTime) => {
            if (!this.activeAnimations.get(animationId)) return;

            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                const shake = intensity * (1 - progress) * Math.sin(elapsed * 0.1);
                element.style.transform = `${originalTransform} translateX(${shake}px)`;
                requestAnimationFrame(animate);
            } else {
                element.style.transform = originalTransform;
                this.activeAnimations.delete(animationId);
            }
        };

        requestAnimationFrame(animate);
    }

    async glowEffect(element, color = 'rgba(102, 126, 234, 0.6)', duration = 1000) {
        if (!element) return;

        const originalBoxShadow = element.style.boxShadow;

        element.style.transition = `box-shadow ${duration / 2}ms ${this.easing.easeInOut}`;
        element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;

        await this.delay(duration / 2);

        element.style.boxShadow = originalBoxShadow;

        await this.delay(duration / 2);

        element.style.transition = '';
    }

    async fadeTransition(elementOut, elementIn, duration = 300) {
        if (elementOut) {
            elementOut.style.transition = `opacity ${duration}ms ${this.easing.easeOut}`;
            elementOut.style.opacity = '0';
        }

        await this.delay(duration);

        if (elementOut) {
            elementOut.style.display = 'none';
        }

        if (elementIn) {
            elementIn.style.display = 'block';
            elementIn.style.opacity = '0';
            elementIn.style.transition = `opacity ${duration}ms ${this.easing.easeOut}`;

            await this.delay(10);

            elementIn.style.opacity = '1';

            await this.delay(duration);

            elementIn.style.transition = '';
        }
    }

    async cascadeIn(elements, delay = 100, animation = 'slideInLeft') {
        if (!elements || elements.length === 0) return;

        const promises = Array.from(elements).map((element, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    element.classList.add(`animate-${animation}`);
                    element.addEventListener('animationend', resolve, { once: true });
                }, index * delay);
            });
        });

        await Promise.all(promises);
    }

    async cascadeOut(elements, delay = 100, animation = 'slideOutRight') {
        if (!elements || elements.length === 0) return;

        const promises = Array.from(elements).map((element, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    element.classList.add(`animate-${animation}`);
                    element.addEventListener('animationend', () => {
                        if (element.parentNode) {
                            element.parentNode.removeChild(element);
                        }
                        resolve();
                    }, { once: true });
                }, index * delay);
            });
        });

        await Promise.all(promises);
    }

    async rippleEffect(element, x, y, color = 'rgba(102, 126, 234, 0.3)') {
        if (!element) return;

        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: ${color};
            transform: scale(0);
            animation: ripple 600ms linear;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        const container = element.querySelector('.ripple-container') || element;
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        container.appendChild(ripple);

        await this.delay(600);

        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }

    async loadingSpinner(element, show = true) {
        if (!element) return;

        if (show) {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = '<i class="fas fa-spinner animate-rotate"></i>';
            spinner.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
            `;

            element.style.position = 'relative';
            element.appendChild(spinner);
        } else {
            const spinner = element.querySelector('.loading-spinner');
            if (spinner) {
                spinner.remove();
            }
        }
    }

    async progressBar(element, progress, duration = 1000) {
        if (!element) return;

        const bar = element.querySelector('.progress-bar') || element;
        bar.style.transition = `width ${duration}ms ${this.easing.easeOut}`;
        bar.style.width = `${Math.max(0, Math.min(100, progress))}%`;

        await this.delay(duration);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    easeOutBounce(t) {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    }

    stopAnimation(animationId) {
        this.activeAnimations.delete(animationId);
    }

    stopAllAnimations() {
        this.activeAnimations.clear();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    addGlobalStyles() {
        if (document.getElementById('animation-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'animation-styles';
        styles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            .morphing {
                animation: morphing 0.4s ease-in-out;
            }

            .particle {
                will-change: transform;
            }

            .loading-spinner {
                color: var(--primary-color);
                font-size: 1.5rem;
            }

            .progress-bar {
                background: var(--primary-gradient);
                height: 100%;
                border-radius: inherit;
                transition: width 0.3s ease;
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 500;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            .notification-success {
                background: var(--secondary-color);
            }

            .notification-error {
                background: var(--danger-color);
            }

            .notification-info {
                background: var(--primary-color);
            }
        `;

        document.head.appendChild(styles);
    }
}

const animationController = new AnimationController();

document.addEventListener('DOMContentLoaded', () => {
    animationController.addGlobalStyles();
});

window.animationController = animationController;