/**
 * Portfolio Website - Main TypeScript Module
 * Handles smooth scrolling, navigation highlighting, and interactive features
 */

interface NavLink {
  element: HTMLElement;
  href: string;
  section: HTMLElement | null;
}

interface ScrollState {
  activeSection: string | null;
  isScrolling: boolean;
}

class Portfolio {
  private navLinks: NavLink[] = [];
  private navToggle: HTMLElement | null = null;
  private navMenu: HTMLElement | null = null;
  private scrollState: ScrollState = {
    activeSection: 'home',
    isScrolling: false
  };

  constructor() {
    this.init();
  }

  /**
   * Initialize the portfolio
   */
  private init(): void {
    this.cacheElements();
    this.attachEventListeners();
    this.setupIntersectionObserver();
  }

  /**
   * Cache DOM elements
   */
  private cacheElements(): void {
    // Navigation elements
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');

    // Navigation links
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach((link) => {
      const href = (link as HTMLAnchorElement).getAttribute('href');
      if (href) {
        const section = document.querySelector(href) as HTMLElement;
        this.navLinks.push({
          element: link as HTMLElement,
          href,
          section
        });
      }
    });
  }

  /**
   * Attach event listeners
   */
  private attachEventListeners(): void {
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Navigation links
    this.navLinks.forEach((link) => {
      link.element.addEventListener('click', (e) => {
        e.preventDefault();
        this.smoothScroll(link.href);
        this.closeMobileMenu();
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });

    // Project filtering
    this.setupProjectFilters();

    // Contact form
    this.setupContactForm();
  }

  /**
   * Toggle mobile menu
   */
  private toggleMobileMenu(): void {
    if (!this.navToggle || !this.navMenu) return;

    const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
    this.navToggle.setAttribute('aria-expanded', (!isExpanded).toString());
    this.navMenu.classList.toggle('active');
  }

  /**
   * Close mobile menu
   */
  private closeMobileMenu(): void {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navMenu.classList.remove('active');
  }

  /**
   * Smooth scroll to section
   */
  private smoothScroll(target: string): void {
    const section = document.querySelector(target) as HTMLElement;
    if (!section) return;

    const offsetTop = section.offsetTop - 70; // Account for sticky navbar

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  /**
   * Setup Intersection Observer for active section highlighting
   */
  private setupIntersectionObserver(): void {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0% -80% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
  }

  /**
   * Set active section and update nav links
   */
  private setActiveSection(sectionId: string): void {
    if (this.scrollState.activeSection === sectionId) return;

    this.scrollState.activeSection = sectionId;

    // Update nav links
    this.navLinks.forEach((link) => {
      const isActive = link.href === `#${sectionId}`;
      if (isActive) {
        link.element.classList.add('active');
      } else {
        link.element.classList.remove('active');
      }
    });
  }

  /**
   * Setup project filtering
   */
  private setupProjectFilters(): void {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove('active'));

        // Add active class to clicked button
        (btn as HTMLElement).classList.add('active');

        // Get filter value
        const filterValue = (btn as HTMLElement).getAttribute('data-filter');

        // Filter projects
        projectCards.forEach((card) => {
          const cardCategory = (card as HTMLElement).getAttribute('data-category');

          if (filterValue === 'all' || filterValue === cardCategory) {
            (card as HTMLElement).classList.remove('hidden');
            // Trigger animation
            void (card as HTMLElement).offsetWidth;
          } else {
            (card as HTMLElement).classList.add('hidden');
          }
        });
      });
    });
  }

  /**
   * Setup contact form
   */
  private setupContactForm(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      console.log('Form submitted:', data);

      // Here you would typically send this to a backend service
      // For now, we'll just show a success message

      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Message sent! 🎉';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  /**
   * Utility: Add scroll event listener for advanced effects
   */
  public onScroll(callback: (scrollY: number) => void): void {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          callback(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Utility: Emit custom events
   */
  public emit(eventName: string, detail?: any): void {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }
}

/**
 * Initialize portfolio when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});

/**
 * Type definitions for better IDE support
 */
declare global {
  interface Window {
    Portfolio: typeof Portfolio;
  }
}

export { Portfolio };
