// Particle system for the animated heart
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particlesContainer = document.querySelector('.particles');
        this.maxParticles = 50;
        this.init();
    }

    init() {
        // Create initial particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }

        // Add click event for particle burst
        document.querySelector('.heart').addEventListener('click', () => {
            this.createParticleBurst();
        });

        // Add hover effect
        document.querySelector('.heart').addEventListener('mouseenter', () => {
            this.intensifyParticles();
        });

        document.querySelector('.heart').addEventListener('mouseleave', () => {
            this.normalizeParticles();
        });
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position around the heart
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const x = Math.cos(angle) * distance + 150;
        const y = Math.sin(angle) * distance + 150;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 4 + 's';
        
        this.particlesContainer.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 4000);
    }

    createParticleBurst() {
        // Create extra particles on click
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 50);
        }
    }

    intensifyParticles() {
        // Increase particle intensity on hover
        this.particles.forEach(particle => {
            particle.style.boxShadow = '0 0 20px #00a8ff, 0 0 40px #00a8ff';
            particle.style.transform = 'scale(1.5)';
        });
    }

    normalizeParticles() {
        // Return to normal intensity
        this.particles.forEach(particle => {
            particle.style.boxShadow = '0 0 10px #00a8ff';
            particle.style.transform = 'scale(1)';
        });
    }
}

// Audio context for sound effects (optional)
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.init();
    }

    init() {
        // Initialize audio context on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    playHeartbeatSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// Main application class
class HeartAnimation {
    constructor() {
        this.particleSystem = new ParticleSystem();
        this.audioManager = new AudioManager();
        this.isPlaying = false;
        this.init();
    }

    init() {
        // Add play button functionality
        const playButton = document.querySelector('.play-button');
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleAnimation();
        });

        // Add keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.toggleAnimation();
                    break;
                case 'KeyH':
                    this.createHeartbeatEffect();
                    break;
            }
        });

        // Add touch support for mobile
        let touchStartTime = 0;
        document.querySelector('.heart').addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
        });

        document.querySelector('.heart').addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 200) {
                this.createHeartbeatEffect();
            }
        });

        // Add performance monitoring
        this.monitorPerformance();
    }

    toggleAnimation() {
        const heart = document.querySelector('.heart');
        const playButton = document.querySelector('.play-button');
        
        if (this.isPlaying) {
            heart.style.animationPlayState = 'paused';
            playButton.textContent = '▶';
            this.isPlaying = false;
        } else {
            heart.style.animationPlayState = 'running';
            playButton.textContent = '⏸';
            this.isPlaying = true;
        }
    }

    createHeartbeatEffect() {
        // Create a more intense heartbeat effect
        const heart = document.querySelector('.heart');
        heart.style.animation = 'none';
        heart.offsetHeight; // Trigger reflow
        heart.style.animation = 'heartbeat 0.5s ease-in-out';
        
        // Play sound
        this.audioManager.playHeartbeatSound();
        
        // Create particle burst
        this.particleSystem.createParticleBurst();
        
        // Reset animation after effect
        setTimeout(() => {
            heart.style.animation = 'heartbeat 2s ease-in-out infinite';
        }, 500);
    }

    monitorPerformance() {
        // Monitor frame rate and adjust particle count if needed
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Adjust particle count based on performance
                if (fps < 30 && this.particleSystem.maxParticles > 20) {
                    this.particleSystem.maxParticles = Math.max(20, this.particleSystem.maxParticles - 10);
                } else if (fps > 50 && this.particleSystem.maxParticles < 80) {
                    this.particleSystem.maxParticles = Math.min(80, this.particleSystem.maxParticles + 10);
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeartAnimation();
    
    // Add loading animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        container.style.transition = 'all 1s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
    }, 100);
});

// Add service worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}