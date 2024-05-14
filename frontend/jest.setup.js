// Mocking ResizeObserver for Jest testing environment

class ResizeObserver {
    constructor(callback) {
      this.callback = callback;
    }
    
    observe(target) {
      // Mock observe functionality
      this.callback([{ target, contentRect: target.getBoundingClientRect() }]);
    }
    
    unobserve() {
      // Mock unobserve functionality
    }
    
    disconnect() {
      // Mock disconnect functionality
    }
  }
  
  // Assign the mock ResizeObserver to the global object
  global.ResizeObserver = ResizeObserver;
  
  // Extend expect with jest-dom matchers
  import '@testing-library/jest-dom/extend-expect';
  