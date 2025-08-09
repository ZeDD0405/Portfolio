'use strict';

// ===== UTILITY FUNCTIONS =====

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ===== SIDEBAR FUNCTIONALITY =====

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ===== TESTIMONIALS MODAL =====

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");
    
    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) {
      modalTitle.innerHTML = title.innerHTML;
    }
    if (modalText && text) {
      modalText.innerHTML = text.innerHTML;
    }

    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// ===== CUSTOM SELECT AND FILTER =====

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
  
  // Also handle project items if they exist
  const projectItems = document.querySelectorAll('.project-post-item');
  projectItems.forEach(item => {
    if (selectedValue === "all") {
      item.style.display = "block";
    } else if (selectedValue === item.dataset.category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  
  // Reset focus states when filtering
  if (window.projectManager) {
    window.projectManager.unfocusAllCards();
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ===== CONTACT FORM =====

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && form.checkValidity()) {
      formBtn?.removeAttribute("disabled");
    } else {
      formBtn?.setAttribute("disabled", "");
    }
  });
}

// ===== PAGE NAVIGATION =====

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// ===== EXPERIENCE CARDS =====

// Experience Card hover logic
function toggleExperience(element) {
  const items = document.querySelectorAll('.experience-item');
  items.forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
    }
  });
  element.classList.toggle('active');
}

document.addEventListener('click', function (event) {
  const isClickInside = event.target.closest('.experience-item');
  if (!isClickInside) {
    document.querySelectorAll('.experience-item').forEach(item => item.classList.remove('active'));
  }
});

// ===== EDUCATION TIMELINE =====

// Education Timeline hover logic
function toggleEducation(element) {
  const items = document.querySelectorAll('.education-item');
  items.forEach(item => {
    if (item !== element) {
      item.classList.remove('active');
    }
  });
  element.classList.toggle('active');
}

document.addEventListener('click', function (event) {
  const isClickInside = event.target.closest('.education-item');
  if (!isClickInside) {
    document.querySelectorAll('.education-item').forEach(item => item.classList.remove('active'));
  }
});

// ===== PDF VIEWER =====

// PDF Viewer
function openPDF(fileName) {
  window.open('assets/pdfs/' + fileName, '_blank');
}

// ===== PROJECT CARD MANAGER =====

// Project Card Focus Manager
class ProjectCardManager {
  constructor() {
    this.projectItems = document.querySelectorAll('.project-post-item');
    this.videos = document.querySelectorAll('[data-project-video]');
    this.fullscreenOverlay = null;
    this.activeCard = null;
    
    console.log('ProjectCardManager initialized');
    console.log('Found project items:', this.projectItems.length);
    
    this.init();
  }

  init() {
    this.createFullscreenOverlay();
    this.setupCardInteractions();
    this.setupVideoHoverEffects();
    this.setupFullscreenButtons();
    this.setupClickOutside();
  }

  createFullscreenOverlay() {
    // Create fullscreen overlay for videos
    this.fullscreenOverlay = document.createElement('div');
    this.fullscreenOverlay.className = 'fullscreen-overlay';
    this.fullscreenOverlay.innerHTML = `
      <video class="fullscreen-video" controls>
        <source src="" type="video/mp4">
        <source src="" type="video/webm">
      </video>
      <button class="fullscreen-close">&times;</button>
    `;
    document.body.appendChild(this.fullscreenOverlay);

    // Close fullscreen on button click
    const closeBtn = this.fullscreenOverlay.querySelector('.fullscreen-close');
    closeBtn.addEventListener('click', () => this.closeFullscreen());

    // Close fullscreen on overlay click
    this.fullscreenOverlay.addEventListener('click', (e) => {
      if (e.target === this.fullscreenOverlay) {
        this.closeFullscreen();
      }
    });

    // Close fullscreen on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.fullscreenOverlay.classList.contains('active')) {
        this.closeFullscreen();
      }
    });
  }

  setupCardInteractions() {
    this.projectItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        // Don't trigger if clicking fullscreen button
        if (e.target.closest('.fullscreen-btn')) {
          return;
        }
        
        console.log('Card clicked:', index);
        this.toggleCardFocus(item);
      });
    });
  }

  toggleCardFocus(clickedCard) {
    const isAlreadyFocused = clickedCard.classList.contains('focused');
    
    if (isAlreadyFocused) {
      // If already focused, unfocus it
      this.unfocusAllCards();
    } else {
      // Focus this card and fade others
      this.focusCard(clickedCard);
    }
  }

  focusCard(targetCard) {
    this.activeCard = targetCard;
    
    this.projectItems.forEach(item => {
      if (item === targetCard) {
        item.classList.add('focused');
        item.classList.remove('faded');
      } else {
        item.classList.remove('focused');
        item.classList.add('faded');
      }
    });

    // Scroll to the focused card
    setTimeout(() => {
      targetCard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 200);
  }

  unfocusAllCards() {
    this.activeCard = null;
    this.projectItems.forEach(item => {
      item.classList.remove('focused', 'faded');
    });
  }

  setupVideoHoverEffects() {
    this.projectItems.forEach((item, index) => {
      const video = item.querySelector('[data-project-video]');
      if (!video) return;

      let hoverTimeout;
      
      item.addEventListener('mouseenter', () => {
        if (!item.classList.contains('faded')) {
          hoverTimeout = setTimeout(() => {
            this.playVideo(video);
          }, 300);
        }
      });

      item.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        if (!item.classList.contains('focused')) {
          this.pauseVideo(video);
        }
      });
    });
  }

  setupFullscreenButtons() {
    const fullscreenBtns = document.querySelectorAll('[data-fullscreen-btn]');
    
    fullscreenBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Fullscreen button clicked:', index);
        
        const video = btn.closest('.project-banner-box').querySelector('[data-project-video]');
        if (video) {
          this.openFullscreen(video);
        }
      });
    });
  }

  setupClickOutside() {
    document.addEventListener('click', (e) => {
      // Check if click is outside all project cards
      const isClickInsideProject = e.target.closest('.project-post-item');
      
      if (!isClickInsideProject && this.activeCard) {
        console.log('Clicked outside, unfocusing cards');
        this.unfocusAllCards();
      }
    });
  }

  openFullscreen(video) {
    const fullscreenVideo = this.fullscreenOverlay.querySelector('.fullscreen-video');
    const sources = video.querySelectorAll('source');
    const fullscreenSources = fullscreenVideo.querySelectorAll('source');
    
    // Copy video sources
    sources.forEach((source, i) => {
      if (fullscreenSources[i]) {
        fullscreenSources[i].src = source.src;
      }
    });
    
    fullscreenVideo.load();
    this.fullscreenOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Fullscreen video opened');
  }

  closeFullscreen() {
    const fullscreenVideo = this.fullscreenOverlay.querySelector('.fullscreen-video');
    fullscreenVideo.pause();
    this.fullscreenOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    console.log('Fullscreen video closed');
  }

  playVideo(video) {
    if (video && video.readyState >= 2) {
      video.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }

  pauseVideo(video) {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}

// ===== INITIALIZATION =====

// Initialize project functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing portfolio features...');
  
  // Small delay to ensure all elements are rendered
  setTimeout(() => {
    // Initialize project card manager
    window.projectManager = new ProjectCardManager();
    console.log('Project card manager initialized');
  }, 100);
});

// ===== GLOBAL EXPORTS =====

// Export functions for global use
window.toggleExperience = toggleExperience;
window.toggleEducation = toggleEducation;
window.openPDF = openPDF;