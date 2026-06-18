const SANITY_CONFIG = { projectId: 'YOUR_SANITY_PROJECT_ID', dataset: 'production', apiVersion: '2024-01-01' };

async function loadProjects() {
    const query = `*[_type == "project"] | order(_createdAt desc) { title, category, thumbnail { asset->{ url } }, videoUrl, challenge, solution, roi }`;
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;
    const grid = document.getElementById('portfolio-grid');
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if(data.result.length > 0) {
            grid.innerHTML = data.result.map(p => {
                const imgUrl = p.thumbnail?.asset?.url ? `${p.thumbnail.asset.url}?w=800&auto=format` : '';
                return `
                <div class="card fade-in visible" data-category="${p.category}">
                    ${p.videoUrl ? `<video class="plyr" playsinline controls style="width:100%; border-radius:8px; margin-bottom:1rem;"><source src="${p.videoUrl}" type="video/mp4"></video>` : `<img src="${imgUrl}" alt="${p.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:1rem;">`}
                    <span style="color:var(--accent-blue); font-size:0.85rem; font-weight:600;">${p.category.toUpperCase()}</span>
                    <h3 style="margin:0.5rem 0;">${p.title}</h3>
                    <p style="font-size:0.9rem;"><strong>Challenge:</strong> ${p.challenge}</p>
                    <p style="font-size:0.9rem;"><strong>Solution:</strong> ${p.solution}</p>
                    <p style="color:#10b981; font-weight:600; margin-top:1rem;"><i class="fas fa-chart-line"></i> ${p.roi}</p>
                </div>`;
            }).join('');
            
            setTimeout(() => new Plyr('.plyr'), 100);
        } else {
            grid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No projects added yet.</p>';
        }
    } catch(e) { console.error(e); grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:red;">Error loading projects.</p>'; }
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => { loadProjects(); setupFilters(); });