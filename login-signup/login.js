// User data storage functions
function getUsers() {
    const users = localStorage.getItem('swastikUsers');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('swastikUsers', JSON.stringify(users));
}

function getUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

function addUser(email, password) {
    const users = getUsers();
    // Check if user already exists
    if (getUserByEmail(email)) {
        return false; // User already exists
    }
    // Add new user
    users.push({
        email: email,
        password: password, // In production, this should be hashed
        createdAt: new Date().toISOString()
    });
    saveUsers(users);
    return true;
}

// Get the login form and button
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const signupLink = document.getElementById('signup-link');

// Add submit event listener to the login form
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        
        // Get form values
        const email = loginForm.querySelector('input[name="email"]').value.trim();
        const password = loginForm.querySelector('input[name="password"]').value;
        
        // Validation
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Check if user exists
        const user = getUserByEmail(email);
        
        if (user) {
            // User exists, check password
            if (user.password === password) {
                // Password matches - successful login
                // Store current user session
                localStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    loggedIn: true,
                    loginTime: new Date().toISOString()
                }));
                
                // Check "Remember Me" checkbox
                const rememberMe = loginForm.querySelector('input[name="remember me"]').checked;
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                // Redirect to swastik.html
                window.location.href = '../swastik.html';
            } else {
                // Password incorrect
                alert('Incorrect password. Please try again.');
            }
        } else {
            // User doesn't exist - redirect to signup
            alert('User not found. Redirecting to registration page...');
            window.location.href = 'signup.html';
        }
    });
}

 // Handle signup link click
if (signupLink) {
    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'signup.html';
    });
}

// Register/Signup form
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission

        // Get form values
        const email = signupForm.querySelector('input[name="email"]').value.trim();
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirm-password"]').value;

        // Validation
        if (!email || !password || !confirmPassword) {
            alert('Please fill out all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Password validation
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Check if user already exists
        if (getUserByEmail(email)) {
            alert('This email is already registered. Please login instead.');
            window.location.href = 'login.html';
            return;
        }

        // Add new user
        const success = addUser(email, password);
        
        if (success) {
            // Store current user session
            localStorage.setItem('currentUser', JSON.stringify({
                email: email,
                loggedIn: true,
                loginTime: new Date().toISOString()
            }));
            
            alert('Registration successful! Redirecting to home page...');
            // Redirect to swastik.html after successful registration
            window.location.href = '../swastik.html';
        } else {
            alert('Registration failed. User may already exist.');
        }
    });
}   