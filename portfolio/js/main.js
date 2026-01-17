// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Load and render data from JSON
    loadData();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all dynamic cards
    document.querySelectorAll('.skill-card, .project-card, .certificate-card').forEach(card => {
        observer.observe(card);
    });
}

// Data Loading and Rendering
async function loadData() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Error loading data:', error);
        showErrorMessage();
    }
}

function showErrorMessage() {
    const containers = ['skills-container', 'projects-container', 'certificates-container'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <p>Unable to load content. Please check your connection and try again.</p>
                    <button onclick="loadData()" class="btn btn-primary">Retry</button>
                </div>
            `;
        }
    });
}

function renderData(data) {
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderCertificates(data.certificates);
}

// Render Skills Section
function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    skills.forEach(skill => {
        const skillCard = createSkillCard(skill);
        container.appendChild(skillCard);
    });
    
    // Re-initialize scroll animations for new elements
    setTimeout(initScrollAnimations, 100);
}

function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card fade-in';
    
    // Determine color based on skill level
    let levelColor;
    switch(skill.level.toLowerCase()) {
        case 'advanced': levelColor = '#00d4aa'; break;
        case 'intermediate': levelColor = '#5a67ff'; break;
        case 'beginner': levelColor = '#ff6b9d'; break;
        default: levelColor = '#b0b0c0';
    }
    
    card.innerHTML = `
        <div class="skill-header">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div>
                <h3 class="skill-name">${skill.name}</h3>
                <div class="skill-level" style="color: ${levelColor}">${skill.level}</div>
            </div>
        </div>
        <p>${skill.description}</p>
        <div class="skill-tags">
            ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

// Render Projects Section
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
    
    // Re-initialize scroll animations for new elements
    setTimeout(initScrollAnimations, 100);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    
    card.innerHTML = `
        <div class="project-image">
            <i class="${project.icon}"></i>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> Code</a>` : ''}
                ${project.live ? `<a href="${project.live}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
        </div>
    `;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

// Render Certificates Section
function renderCertificates(certificates) {
    const container = document.getElementById('certificates-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    certificates.forEach(certificate => {
        const certificateCard = createCertificateCard(certificate);
        container.appendChild(certificateCard);
    });
    
    // Re-initialize scroll animations for new elements
    setTimeout(initScrollAnimations, 100);
}

function createCertificateCard(certificate) {
    const card = document.createElement('div');
    card.className = 'certificate-card fade-in';
    
    card.innerHTML = `
        <div class="certificate-header">
            <div class="certificate-icon">
                <i class="${certificate.icon}"></i>
            </div>
            <div>
                <h3 class="certificate-title">${certificate.title}</h3>
                <p class="certificate-issuer">${certificate.issuer}</p>
            </div>
        </div>
        <p>${certificate.description}</p>
        <div class="certificate-date">
            <i class="far fa-calendar"></i> ${certificate.date}
            ${certificate.credentialId ? `<br><i class="fas fa-id-card"></i> ${certificate.credentialId}` : ''}
        </div>
    `;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}