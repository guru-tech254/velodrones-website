/* === PORTFOLIO DATABASE INTEGRATION === */

// Sanity.io Configuration
const SANITY_CONFIG = {
    projectId: '6utlniqd', // Replace with your Sanity project ID
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false
};

// Initialize Plyr
let players = [];

// Fetch Projects from Sanity
async function loadProjects() {
    const query = `*[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        category,
        thumbnail {
            asset->{
                url
            }
        },
        videoUrl,
        challenge,
        solution,
        roi,
        _createdAt
    }`;

    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;

    const portfolioGrid = document.getElementById('portfolio-grid');
    
    if (!portfolioGrid) return;

    // Show loading state
    portfolioGrid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 3rem;"><div class="loading"></div><p style="margin-top: 1rem; color: var(--text-muted);">Loading projects...</p></div>';

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.result && data.result.length > 0) {
            renderProjects(data.result);
        } else {
            portfolioGrid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 3rem;"><p style="color: var(--text-muted);">No projects available yet. Check back soon!</p></div>';
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        portfolioGrid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 3rem;"><p style="color: var(--error);">Error loading projects. Please try again later.</p></div>';
    }
}

// Render Projects to DOM
function renderProjects(projects) {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    portfolioGrid.innerHTML = projects.map(project => {
        const imageUrl = project.thumbnail?.asset?.url ? 
            `${project.thumbnail.asset.url}?w=800&auto=format` : 
            'https://via.placeholder.com/800x600/0f1115/007BFF?text=Velodrones+Project';

        return `
            <div class="project-card fade-in" data-category="${project.category}">
                <div class="project-media">
                    ${project.videoUrl ? `
                        <video class="plyr" playsinline controls data-plyr-provider="html5">
                            <source src="${project.videoUrl}" type="video/mp4">
                        </video>
                    ` : `
                        <img src="${imageUrl}" alt="${project.title}" loading="lazy">
                    `}
                </div>
                <div class="project-content">
                    <span class="project-tag">${formatCategory(project.category)}</span>
                    <h3>${project.title}</h3>
                    ${project.challenge ? `<p><strong>Challenge:</strong> ${project.challenge}</p>` : ''}
                    ${project.solution ? `<p><strong>Solution:</strong> ${project.solution}</p>` : ''}
                    ${project.roi ? `
                        <div class="project-roi">
                            <i class="fas fa-chart-line"></i>
                            <span>${project.roi}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Initialize Plyr for all videos
    setTimeout(() => {
        players = Array.from(document.querySelectorAll('.plyr')).map(p => new Plyr(p, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
        }));
    }, 100);

    // Trigger fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.project-card.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

// Format Category Name
function formatCategory(category) {
    const categories = {
        'inspection': 'Industrial Inspection',
        'mapping': 'Drone Mapping',
        'lidar': 'LiDAR Surveying',
        'surveillance': 'Aerial Surveillance'
    };
    return categories[category] || category;
}

// Filter Projects by Category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Setup Filter Buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter projects
            const category = btn.dataset.filter;
            filterProjects(category);
        });
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadProjects();
        setupFilters();
    });
} else {
    loadProjects();
    setupFilters();
}

// Cleanup Plyr instances when navigating away
window.addEventListener('beforeunload', () => {
    players.forEach(player => {
        if (player && player.destroy) {
            player.destroy();
        }
    });
});