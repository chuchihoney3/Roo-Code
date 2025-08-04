// Heart Animation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.heart');
    const playButton = document.querySelector('.play-button');
    const container = document.querySelector('.container');
    
    // Add click effect to hearts
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            createHeartBurst(this);
        });
    });
    
    // Play button functionality
    playButton.addEventListener('click', function() {
        toggleAnimation();
    });
    
    // Add mouse move effect
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create subtle parallax effect
        hearts.forEach((heart, index) => {
            const speed = (index + 1) * 0.02;
            const moveX = (x - rect.width / 2) * speed;
            const moveY = (y - rect.height / 2) * speed;
            
            heart.style.transform = `rotate(-45deg) translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Create heart burst effect
    function createHeartBurst(heart) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'heart-particle';
            particle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(0, 150, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 50;
            const startX = heart.offsetLeft + heart.offsetWidth / 2;
            const startY = heart.offsetTop + heart.offsetHeight / 2;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            container.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                const endX = startX + Math.cos(angle) * distance;
                const endY = startY + Math.sin(angle) * distance;
                
                particle.style.transition = 'all 0.5s ease-out';
                particle.style.left = endX + 'px';
                particle.style.top = endY + 'px';
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    container.removeChild(particle);
                }, 500);
            }, 10);
        }
    }
    
    // Toggle animation
    function toggleAnimation() {
        const isPaused = hearts[0].style.animationPlayState === 'paused';
        
        hearts.forEach(heart => {
            heart.style.animationPlayState = isPaused ? 'running' : 'paused';
        });
        
        // Change play button icon
        const playIcon = playButton.querySelector('.play-icon');
        if (isPaused) {
            playIcon.style.borderLeft = '15px solid rgba(255, 255, 255, 0.8)';
            playIcon.style.borderTop = '10px solid transparent';
            playIcon.style.borderBottom = '10px solid transparent';
        } else {
            playIcon.style.borderLeft = 'none';
            playIcon.style.borderTop = 'none';
            playIcon.style.borderBottom = 'none';
            playIcon.style.border = '2px solid rgba(255, 255, 255, 0.8)';
            playIcon.style.width = '20px';
            playIcon.style.height = '20px';
        }
    }
    
    // Add keyboard controls
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                toggleAnimation();
                break;
            case 'r':
            case 'R':
                resetAnimation();
                break;
        }
    });
    
    // Reset animation
    function resetAnimation() {
        hearts.forEach(heart => {
            heart.style.animation = 'none';
            heart.offsetHeight; // Trigger reflow
            heart.style.animation = null;
        });
    }
    
    // Add touch support for mobile
    let touchStartTime = 0;
    container.addEventListener('touchstart', function(e) {
        touchStartTime = Date.now();
    });
    
    container.addEventListener('touchend', function(e) {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        if (touchDuration < 200) {
            // Short tap - create burst
            const touch = e.changedTouches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('heart')) {
                createHeartBurst(element);
            }
        } else {
            // Long press - toggle animation
            toggleAnimation();
        }
    });
    
    // Add window resize handler
    window.addEventListener('resize', function() {
        // Reset any transform effects
        hearts.forEach(heart => {
            heart.style.transform = 'rotate(-45deg)';
        });
    });
    
    // Add some random sparkle effects
    setInterval(() => {
        if (Math.random() < 0.3) {
            createRandomSparkle();
        }
    }, 2000);
    
    function createRandomSparkle() {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 150, 255, 1);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
        `;
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            if (container.contains(sparkle)) {
                container.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // Add sparkle animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Heart animation loaded successfully!');
    console.log('Controls:');
    console.log('- Click hearts to create burst effects');
    console.log('- Click play button or press SPACE to pause/resume');
    console.log('- Press R to reset animation');
    console.log('- Long press on mobile to toggle animation');
});