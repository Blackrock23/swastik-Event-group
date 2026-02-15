// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
    }
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        openMobileMenu();
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
    });
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
}

// Close menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeMobileMenu();
    });
});

// Mobile dropdown toggle
if (mobileDropdownToggle) {
    mobileDropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.parentElement.classList.toggle('active');
    });
}

// Close menu on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Set current year in footer
if (document.getElementById('year')) {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Check if user is logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.loggedIn) {
            // User is logged in - you can display user info or add logout button
            console.log('User logged in:', user.email);
            return user;
        }
    }
    return null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    window.location.href = './login-signup/login.html';
}

// Check login status on page load
checkLoginStatus();