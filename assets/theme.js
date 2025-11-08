/**
 * Ethereal Theme - Main JavaScript
 * Version: 1.0.0
 * Progressive enhancement only - minimal JS
 */

(function() {
  'use strict';

  /**
   * DOM Ready
   */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /**
   * Header: Search Drawer
   */
  function initSearchDrawer() {
    const searchToggle = document.getElementById('search-toggle');
    const searchDrawer = document.getElementById('search-drawer');
    const searchClose = document.getElementById('search-close');
    const searchInput = searchDrawer?.querySelector('.search-input');

    if (!searchToggle || !searchDrawer) return;

    searchToggle.addEventListener('click', () => {
      searchDrawer.hidden = false;
      searchInput?.focus();
    });

    searchClose?.addEventListener('click', () => {
      searchDrawer.hidden = true;
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !searchDrawer.hidden) {
        searchDrawer.hidden = true;
      }
    });
  }

  /**
   * Header: Mobile Menu
   */
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('mobile-menu-close');
    const menuOverlay = mobileMenu?.querySelector('.mobile-menu__overlay');

    if (!menuToggle || !mobileMenu) return;

    function openMenu() {
      mobileMenu.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.hidden = true;
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);
    menuOverlay?.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hidden) {
        closeMenu();
      }
    });
  }

  /**
   * Header: Sticky Header Effect
   */
  function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '';
      }

      lastScroll = currentScroll;
    });
  }

  /**
   * Cart: Drawer
   */
  function initCartDrawer() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartClose = cartDrawer?.querySelector('.cart-drawer__close');
    const cartOverlay = cartDrawer?.querySelector('.cart-drawer__overlay');

    if (!cartToggle || !cartDrawer) return;

    function openCart() {
      cartDrawer.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      cartDrawer.hidden = true;
      document.body.style.overflow = '';
    }

    cartToggle.addEventListener('click', openCart);
    cartClose?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !cartDrawer.hidden) {
        closeCart();
      }
    });
  }

  /**
   * Cart: Update Quantity
   */
  function initCartQuantity() {
    const cartDrawer = document.getElementById('cart-drawer');
    if (!cartDrawer) return;

    cartDrawer.addEventListener('click', (e) => {
      const target = e.target;

      // Quantity buttons
      if (target.classList.contains('qty-btn')) {
        const line = target.dataset.line;
        const input = cartDrawer.querySelector(`.qty-input[data-line="${line}"]`);
        const action = target.dataset.action;

        if (!input) return;

        let quantity = parseInt(input.value);

        if (action === 'increase') {
          quantity += 1;
        } else if (action === 'decrease') {
          quantity = Math.max(0, quantity - 1);
        }

        updateCartLine(line, quantity);
      }

      // Remove button
      if (target.classList.contains('cart-item__remove')) {
        const line = target.dataset.line;
        updateCartLine(line, 0);
      }
    });

    // Quantity input change
    cartDrawer.addEventListener('change', (e) => {
      if (e.target.classList.contains('qty-input')) {
        const line = e.target.dataset.line;
        const quantity = Math.max(0, parseInt(e.target.value) || 0);
        updateCartLine(line, quantity);
      }
    });
  }

  /**
   * Update cart line item
   */
  function updateCartLine(line, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        line: line,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      updateCartUI(data);
    })
    .catch(error => {
      console.error('Error updating cart:', error);
    });
  }

  /**
   * Update cart UI
   */
  function updateCartUI(cart) {
    // Update cart count
    const cartCounts = document.querySelectorAll('[data-cart-count]');
    cartCounts.forEach(count => {
      count.textContent = cart.item_count;
    });

    // Reload cart drawer content
    fetch(window.location.href)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newCartItems = doc.getElementById('cart-items');
        const currentCartItems = document.getElementById('cart-items');

        if (newCartItems && currentCartItems) {
          currentCartItems.innerHTML = newCartItems.innerHTML;
        }

        // Update subtotal
        const subtotalPrice = document.querySelector('.cart-subtotal__price');
        if (subtotalPrice) {
          subtotalPrice.textContent = formatMoney(cart.total_price);
        }
      });
  }

  /**
   * Add to Cart
   */
  function initAddToCart() {
    document.addEventListener('submit', (e) => {
      const form = e.target;

      if (form.getAttribute('action') === '/cart/add') {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          // Update cart count
          return fetch('/cart.js');
        })
        .then(response => response.json())
        .then(cart => {
          updateCartUI(cart);

          // Open cart drawer
          const cartDrawer = document.getElementById('cart-drawer');
          if (cartDrawer) {
            cartDrawer.hidden = false;
            document.body.style.overflow = 'hidden';
          }
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
          alert('Error adding item to cart. Please try again.');
        });
      }
    });
  }

  /**
   * Quick View Modal
   */
  function initQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    const modalClose = modal.querySelector('.modal__close');
    const modalOverlay = modal.querySelector('.modal__overlay');
    const modalContent = document.getElementById('quick-view-content');

    function openModal(productHandle) {
      fetch(`/products/${productHandle}?view=quick`)
        .then(response => response.text())
        .then(html => {
          if (modalContent) {
            modalContent.innerHTML = html;
          }
          modal.hidden = false;
          document.body.style.overflow = 'hidden';
        })
        .catch(error => {
          console.error('Error loading product:', error);
        });
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    // Quick view button click
    document.addEventListener('click', (e) => {
      if (e.target.closest('.product-card__quick-view')) {
        e.preventDefault();
        const button = e.target.closest('.product-card__quick-view');
        const productHandle = button.dataset.productHandle;
        if (productHandle) {
          openModal(productHandle);
        }
      }
    });

    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });
  }

  /**
   * Product Filters (Collection Page)
   */
  function initFilters() {
    const filtersToggle = document.querySelector('.filters__toggle');
    const filters = document.getElementById('product-filters');

    if (!filtersToggle || !filters) return;

    // Mobile: Toggle filters
    filtersToggle.addEventListener('click', () => {
      filters.classList.toggle('filters--open');
    });

    // Clear all filters
    const clearButton = document.getElementById('clear-filters');
    clearButton?.addEventListener('click', () => {
      const checkboxes = filters.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      applyFilters();
    });

    // Apply filters
    const applyButton = filters.querySelector('.filters__apply');
    applyButton?.addEventListener('click', applyFilters);

    function applyFilters() {
      const checkboxes = filters.querySelectorAll('input[type="checkbox"]:checked');
      const tags = Array.from(checkboxes).map(cb => cb.value);

      let url = window.location.pathname;
      if (tags.length > 0) {
        url += '/' + tags.join('+');
      }

      window.location.href = url;
    }
  }

  /**
   * Sorting (Collection Page)
   */
  function initSorting() {
    const sortSelect = document.getElementById('sort-by');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
      const value = sortSelect.value;
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', value);
      window.location.href = url.toString();
    });

    // Set current value from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentSort = urlParams.get('sort_by');
    if (currentSort) {
      sortSelect.value = currentSort;
    }
  }

  /**
   * Format money (simple version)
   */
  function formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    return '$' + amount;
  }

  /**
   * Image Lazy Loading (Fallback for older browsers)
   */
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      return; // Native lazy loading supported
    }

    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.removeAttribute('loading');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback: load all images immediately
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
        img.removeAttribute('loading');
      });
    }
  }

  /**
   * Accessibility: Keyboard Navigation
   */
  function initA11y() {
    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const activeModal = document.querySelector('.modal:not([hidden]), .cart-drawer:not([hidden]), .mobile-menu:not([hidden])');
      if (!activeModal) return;

      const focusableElements = activeModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });
  }

  /**
   * Initialize all
   */
  ready(() => {
    initSearchDrawer();
    initMobileMenu();
    initStickyHeader();
    initCartDrawer();
    initCartQuantity();
    initAddToCart();
    initQuickView();
    initFilters();
    initSorting();
    initLazyLoading();
    initA11y();

    console.log('Ethereal Theme initialized');
  });
})();
