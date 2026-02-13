// ===== 3D Computer Portfolio Script =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initParticles();
    initThreeJS();
    initScrollAnimations();
    initSkillBars();
    initStatsCounter();
    initTiltEffect();
    initTypingEffect();
});

// ===== Floating Particles =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        
        // Random colors from palette
        const colors = ['#00ff88', '#00d4ff', '#ff00ff', '#ffffff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        particlesContainer.appendChild(particle);
    }
}

// ===== Three.js 3D Scene =====
function initThreeJS() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded, using fallback animations');
        initFallbackAnimations();
        return;
    }
    
    const canvas = document.getElementById('computer-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create computer-like structure (wireframe)
    const computerGroup = new THREE.Group();
    
    // Main monitor frame
    const monitorGeometry = new THREE.BoxGeometry(4, 3, 0.2);
    const monitorMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    computerGroup.add(monitor);
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(3.5, 2.5);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00d4ff, 
        transparent: true, 
        opacity: 0.1,
        side: THREE.DoubleSide
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.15;
    computerGroup.add(screen);
    
    // Keyboard base
    const keyboardGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
    const keyboardMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff00ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, -2, 0.5);
    computerGroup.add(keyboard);
    
    // Floating cubes (data blocks)
    const cubes = [];
    for (let i = 0; i < 20; i++) {
        const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const cubeMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x00ff88 : 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        cube.position.x = (Math.random() - 0.5) * 10;
        cube.position.y = (Math.random() - 0.5) * 10;
        cube.position.z = (Math.random() - 0.5) * 5;
        
        cube.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.01 + 0.005,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        cubes.push(cube);
        computerGroup.add(cube);
    }
    
    // Circuit lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePoints = [];
    for (let i = 0; i < 50; i++) {
        linePoints.push(new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 5
        ));
    }
    lineGeometry.setFromPoints(linePoints);
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ff88, 
        transparent: true, 
        opacity: 0.2 
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    computerGroup.add(lines);
    
    scene.add(computerGroup);
    
    camera.position.z = 6;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Rotate entire computer group based on mouse
        computerGroup.rotation.x = mouseY * 0.3;
        computerGroup.rotation.y = mouseX * 0.3;
        
        // Animate cubes
        cubes.forEach((cube, index) => {
            cube.rotation.x += cube.userData.rotationSpeed.x;
            cube.rotation.y += cube.userData.rotationSpeed.y;
            
            // Floating animation
            cube.position.y += Math.sin(time + cube.userData.floatOffset) * cube.userData.floatSpeed;
        });
        
        // Pulse effect on monitor
        monitorMaterial.opacity = 0.2 + Math.sin(time * 2) * 0.1;
        
        // Animate circuit lines
        lineMaterial.opacity = 0.1 + Math.sin(time * 3) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== Fallback Animations (when Three.js not available) =====
function initFallbackAnimations() {
    const canvas = document.getElementById('computer-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const shapes = [];
    
    // Create floating shapes
    for (let i = 0; i < 30; i++) {
        shapes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 5,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            color: Math.random() > 0.5 ? '#00ff88' : '#00d4ff',
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05
        });
    }
    
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connecting lines
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < shapes.length; i++) {
            for (let j = i + 1; j < shapes.length; j++) {
                const dx = shapes[i].x - shapes[j].x;
                const dy = shapes[i].y - shapes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(shapes[i].x, shapes[i].y);
                    ctx.lineTo(shapes[j].x, shapes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw shapes
        shapes.forEach(shape => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 2;
            ctx.shadowColor = shape.color;
            ctx.shadowBlur = 10;
            
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            
            ctx.restore();
            
            // Update position
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            
            // Bounce off walls
            if (shape.x < 0 || shape.x > canvas.width) shape.speedX *= -1;
            if (shape.y < 0 || shape.y > canvas.height) shape.speedY *= -1;
        });
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Animate stats
                if (entry.target.id === 'about') {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== Skill Bars Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
        const skillLevel = bar.parentElement.parentElement.getAttribute('data-skill');
        setTimeout(() => {
            bar.style.width = skillLevel + '%';
        }, 200);
    });
}

function initSkillBars() {
    // Reset skill bars initially
    const skillBars = document.querySelectorAll('.skill-fill');
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
}

// ===== Stats Counter Animation =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

function initStatsCounter() {
    // Initial state
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.textContent = '0';
    });
}

// ===== Tilt Effect for Cards =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .stat-item, .skill-icon');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===== Typing Effect =====
function initTypingEffect() {
    const text = 'Full Stack Developer | Creative Problem Solver';
    const typedElement = document.getElementById('typed');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typedElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Glitch Effect on Hover =====
document.querySelectorAll('.glitch').forEach(glitch => {
    glitch.addEventListener('mouseenter', () => {
        glitch.style.animation = 'glitch-skew 0.3s infinite';
    });
    
    glitch.addEventListener('mouseleave', () => {
        glitch.style.animation = '';
    });
});

// ===== Contact Cards Hover Effect =====
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.contact-icon').style.transform = 'scale(1.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.contact-icon').style.transform = 'scale(1)';
    });
});

// ===== Console Easter Egg =====
console.log('%c🖥️  Welcome to Sahil\'s 3D Portfolio!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with Three.js and pure CSS magic ✨', 'color: #00d4ff; font-size: 14px;');
