// Get the login form and button
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const signupLink = document.getElementById('signup-link');

// Add submit event listener to the form
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        
        // Get form values
        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;
        
        // Simple validation
        if (email && password) {
            // In a real app, you'd send this to a backend
            // For demo purposes, redirect to index.html on successful login
            window.location.href = '../index.html';
        }
    });
}

// Handle login button click as backup
// if (loginBtn) {
//     loginBtn.addEventListener('click', function(event) {
//         event.preventDefault();
//         window.location.href = '../index.html';
//     });
// }

// Handle signup link click
if (signupLink) {
    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'signup.html';
    });
}

// register form
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission

        // Get form values
        const email = signupForm.querySelector('input[name="email"]').value;
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirm-password"]').value;

        // Simple validation 
        if (email && password && password === confirmPassword) {
            // In a real app, you'd send this to a backend
            // For demo purposes, redirect to login.html on successful signup
            window.location.href = 'login.html';
        } else {
            alert('Please fill out all fields and ensure passwords match.');
        }
    });
}   