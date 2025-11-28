/**
 * Portfolio Website - Main JavaScript Module
 * Handles search navigation, smooth scrolling, and interactive features
 */

class Portfolio {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.searchResults = document.getElementById('searchResults');
    this.resultItems = document.querySelectorAll('.result-item');
    this.timeDisplay = document.getElementById('timeDisplay');
    
    this.init();
  }

  init() {
    this.setupSearchNavigation();
    this.updateTime();
    this.setupIntersectionObserver();
    
    // Update time every minute
    setInterval(() => this.updateTime(), 60000);
  }

  /**
   * Setup search navigation functionality
   */
  setupSearchNavigation() {
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.searchInput.blur();
      }
    });

    // Add click handlers to result items
    this.resultItems.forEach((item) => {
      item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        if (section) {
          this.scrollToSection(`#${section}`);
          this.searchInput.blur();
          this.searchInput.value = '';
        }
      });
    });

    // Add keyboard support
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const firstItem = this.searchResults.querySelector('.result-item');
        if (firstItem) {
          firstItem.click();
        }
      }
      if (e.key === 'Escape') {
        this.searchInput.blur();
      }
    });
  }

  /**
   * Smooth scroll to section
   */
  scrollToSection(target) {
    const section = document.querySelector(target);
    if (!section) return;

    const offsetTop = section.offsetTop - 60;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  /**
   * Update time display
   */
  updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.timeDisplay.textContent = `${hours}:${minutes} GMT+5:30`;
  }

  /**
   * Setup Intersection Observer for scroll animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.style.opacity = '0.8';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s ease-out';
      observer.observe(section);
    });
  }
}

/**
 * Initialize portfolio when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});


/**
 * Initialize portfolio when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});
