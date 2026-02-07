// Run Google Dork
function runDork(dork) {
    const domain = document.getElementById('domainInput').value.trim();
    
    if (!domain) {
        showNotification('Please enter a target domain', 'error');
        return;
    }
    
    const finalDork = dork.replace(/example\.com/g, domain);
    
    if (finalDork.startsWith('http://') || finalDork.startsWith('https://')) {
        window.open(finalDork, '_blank', 'noopener,noreferrer');
    } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(finalDork)}`, '_blank', 'noopener,noreferrer');
    }
}

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);
}

// Set theme
function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        font-size: 0.9rem;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Domain input enhancement
const domainInput = document.getElementById('domainInput');

domainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const firstButton = document.querySelector('.dork-btn');
        if (firstButton) {
            firstButton.click();
        }
    }
});

// Add placeholder animation
let placeholderIndex = 0;
const placeholders = [
    'example.com',
    'target-domain.com',
    'company.com',
    'website.org'
];

function rotatePlaceholder() {
    if (document.activeElement !== domainInput && !domainInput.value) {
        domainInput.placeholder = `Enter target domain (e.g., ${placeholders[placeholderIndex]})`;
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }
}

// Rotate placeholder every 3 seconds
setInterval(rotatePlaceholder, 3000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add ripple effect to buttons (optional enhancement)
    document.querySelectorAll('.dork-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .dork-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Performance optimization - lazy load categories
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe category cards for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
});
