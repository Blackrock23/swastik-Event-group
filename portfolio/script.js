document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Fade in sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Stagger project cards when projects section appears
                if (entry.target.id === 'projects') {
                    const projects = entry.target.querySelectorAll('.project');
                    projects.forEach((p, i) => {
                        const d = p.getAttribute('data-animate-delay') || (i * 0.08);
                        p.style.setProperty('--delay', d + 's');
                        setTimeout(() => p.classList.add('revealed'), parseFloat(d) * 1000 + 50);
                    });
                }

                // Animate skill badges when skills section appears
                if (entry.target.id === 'skills') {
                    const badges = entry.target.querySelectorAll('.skill-badge');
                    badges.forEach((b, i) => {
                        const lvl = b.getAttribute('data-level') || 70;
                        // small stagger for nicer effect
                        setTimeout(() => {
                            b.style.setProperty('--level', lvl);
                        }, i * 120);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
