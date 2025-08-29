'use strict';

/* ========= Utility Functions ========= */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/* ========= Sidebar Toggle ========= */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/* ========= Testimonials Modal Logic ========= */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

/* ========= Custom Select + Filtering ========= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

/* ========= Contact Form Validation ========= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// ===== Submit form via mailto =====
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = form.querySelector('input[name="fullname"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    const mailtoLink = `mailto:sagarkallimani0405@gmail.com?subject=Message from ${encodeURIComponent(fullname)}&body=${encodeURIComponent("Name: " + fullname + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

    window.location.href = mailtoLink;

    form.reset();
    formBtn.setAttribute("disabled", "");
  });
}

/* ========= Page Navigation ========= */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, i) => {
  link.addEventListener("click", function () {
    pages.forEach((page, j) => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        page.classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    });
  });
});

/* ========= Experience & Education Toggles ========= */
function toggleExperience(element) {
  document.querySelectorAll('.experience-item').forEach(item => {
    if (item !== element) item.classList.remove('active');
  });
  element.classList.toggle('active');
}

document.addEventListener('click', function (event) {
  if (!event.target.closest('.experience-item')) {
    document.querySelectorAll('.experience-item').forEach(item => item.classList.remove('active'));
  }
});

function toggleEducation(element) {
  document.querySelectorAll('.education-item').forEach(item => {
    if (item !== element) item.classList.remove('active');
  });
  element.classList.toggle('active');
}

document.addEventListener('click', function (event) {
  if (!event.target.closest('.education-item')) {
    document.querySelectorAll('.education-item').forEach(item => item.classList.remove('active'));
  }
});

/* ========= PDF Viewer ========= */
function openPDF(fileName) {
  window.open('assets/pdfs/' + fileName, '_blank');
}

/* ========= Project Modal Logic (With Smooth Animation) ========= */
const projectCards = document.querySelectorAll(".project-post-item");
const projectModal = document.getElementById("projectModal");
const closeProjectModal = document.getElementById("closeProjectModal");
const projectOverlay = document.getElementById("projectOverlay");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalProjectDescription = document.getElementById("modalProjectDescription");
const modalProjectVideo = document.getElementById("modalProjectVideo");

projectCards.forEach(card => {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    modalProjectTitle.textContent = card.getAttribute("data-project-title");
    modalProjectDescription.textContent = card.getAttribute("data-project-description");

    const videoSrc = card.getAttribute("data-project-video");
    modalProjectVideo.querySelector("source").src = videoSrc;
    modalProjectVideo.load();
    modalProjectVideo.play();

    // Smooth open animation
    projectModal.classList.add("active");
    projectOverlay.classList.add("active");
    projectModal.style.opacity = "0";
    projectModal.style.transform = "scale(0.9)";
    setTimeout(() => {
      projectModal.style.transition = "all 0.3s ease";
      projectModal.style.opacity = "1";
      projectModal.style.transform = "scale(1)";
    }, 10);
  });
});

function closeModal() {
  projectModal.style.opacity = "0";
  projectModal.style.transform = "scale(0.9)";
  projectOverlay.classList.remove("active");
  setTimeout(() => {
    projectModal.classList.remove("active");
    modalProjectVideo.pause();
  }, 250);
}

if (closeProjectModal) closeProjectModal.addEventListener("click", closeModal);
if (projectOverlay) projectOverlay.addEventListener("click", closeModal);

/* ========= Card Hover Ripple Effect ========= */
projectCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

/* ========= Project Dropdown Filter (College / Hackathon / Learning / Freelancing) ========= */
const projectFilterDropdown = document.getElementById("projectCategory");
if (projectFilterDropdown) {
  projectFilterDropdown.addEventListener("change", () => {
    const selected = projectFilterDropdown.value;
    projectCards.forEach(card => {
      if (selected === "all" || card.dataset.category === selected) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
