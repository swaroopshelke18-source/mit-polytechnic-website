/* ===================================
   MIT Polytechnic - Main JavaScript
   =================================== */

// ---- Navbar: Hamburger Menu Toggle ----
document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }

  // ---- Active nav link highlight ----
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- Contact Form Validation ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(contactForm)) {
        showSuccess(contactForm, 'contact-success');
        contactForm.reset();
      }
    });
  }

  // ---- Admission Form Validation ----
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(admissionForm)) {
        showSuccess(admissionForm, 'admission-success');
        admissionForm.reset();
      }
    });
  }

});

/* ---- Form Validation Helper ----
   Checks all required fields in a form
   Returns true if valid, false if not
*/
function validateForm(form) {
  let isValid = true;

  // Clear previous error states
  const errorMsgs = form.querySelectorAll('.form-error-msg');
  errorMsgs.forEach(function (msg) {
    msg.classList.remove('show');
  });

  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(function (input) {
    input.classList.remove('error');
  });

  // Check each required field
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(function (field) {
    const value = field.value.trim();
    const errorId = field.id + '-error';
    const errorEl = document.getElementById(errorId);

    if (!value) {
      field.classList.add('error');
      if (errorEl) errorEl.classList.add('show');
      isValid = false;
    }

    // Email format check
    if (field.type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        field.classList.add('error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address.';
          errorEl.classList.add('show');
        }
        isValid = false;
      }
    }

    // Phone number basic check (if applicable)
    if (field.type === 'tel' && value) {
      const phonePattern = /^[6-9]\d{9}$/;
      if (!phonePattern.test(value.replace(/\s/g, ''))) {
        field.classList.add('error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid 10-digit mobile number.';
          errorEl.classList.add('show');
        }
        isValid = false;
      }
    }
  });

  return isValid;
}

/* ---- Show Success Message ----
   Displays a green success banner below the form
*/
function showSuccess(form, successId) {
  const successEl = document.getElementById(successId);
  if (successEl) {
    successEl.classList.add('show');
    // Hide after 6 seconds
    setTimeout(function () {
      successEl.classList.remove('show');
    }, 6000);
  }
}
