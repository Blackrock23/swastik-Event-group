// Get the login form and button
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const signupLink = document.getElementById('signup-link');
const register = document.getElementById('signup-btn');

// Add submit event listener to the form
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission
    
    // Get form values
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;
    
    // Simple validation
    if (email && password) {
        // In a real app, you'd send this to a backend
        // For demo purposes, redirect to swastik.html on successful login
        window.location.href = 'swastik.html';
    }
});

// Handle login button click as backup
loginBtn.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'swastik.html';
});

// Handle signup link click
signupLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'signup.html';
});
// Get the signup form and button
register.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'login.html';
});