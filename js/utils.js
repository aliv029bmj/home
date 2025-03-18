/**
 * Utility functions for the Learning Journey website
 */

// Namespace for utility functions
const Utils = {
    /**
     * Formats a date string to a more readable format
     * @param {string} dateString - The date string to format
     * @returns {string} Formatted date string
     */
    formatDate: function(dateString) {
        if (!dateString) return '';
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    },
    
    /**
     * Truncates text to a specified length and adds ellipsis
     * @param {string} text - The text to truncate
     * @param {number} length - Maximum length before truncation
     * @returns {string} Truncated text
     */
    truncateText: function(text, length = 100) {
        if (!text) return '';
        
        if (text.length <= length) return text;
        
        return text.substring(0, length) + '...';
    },
    
    /**
     * Sanitizes user input to prevent XSS attacks
     * @param {string} input - The user input to sanitize
     * @returns {string} Sanitized input
     */
    sanitizeInput: function(input) {
        if (!input) return '';
        
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },
    
    /**
     * Debounces a function to limit how often it can be called
     * @param {Function} func - The function to debounce
     * @param {number} wait - The time to wait in milliseconds
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait = 300) {
        let timeout;
        
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Adds lazy loading to images
     * @param {string} selector - CSS selector for images
     */
    lazyLoadImages: function(selector = 'img') {
        const images = document.querySelectorAll(selector);
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        } else {
            // Fallback for browsers that don't support native lazy loading
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px 100px 0px',
                threshold: 0
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        observer.unobserve(img);
                    }
                });
            }, observerOptions);
            
            images.forEach(img => {
                if (img.hasAttribute('data-src')) {
                    observer.observe(img);
                }
            });
        }
    },
    
    /**
     * Detects if the user is on a mobile device
     * @returns {boolean} True if on mobile device
     */
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
};

// Export the Utils object for use in other scripts
window.Utils = Utils;

