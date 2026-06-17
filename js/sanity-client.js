/* === SANITY CLIENT HELPER FUNCTIONS === */

// Sanity Client Configuration
const sanityClient = {
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    
    // Get base URL
    getBaseUrl() {
        return `https://${this.projectId}.api.sanity.io/v${this.apiVersion}`;
    },
    
    // Fetch data from Sanity
    async fetch(query, params = {}) {
        const url = `${this.getBaseUrl()}/data/query/${this.dataset}`;
        const queryParams = new URLSearchParams({
            query: query,
            ...params
        });
        
        try {
            const response = await fetch(`${url}?${queryParams}`);
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Sanity fetch error:', error);
            throw error;
        }
    },
    
    // Get image URL with transformations
    getImageUrl(asset, options = {}) {
        if (!asset || !asset.url) return null;
        
        const params = new URLSearchParams();
        if (options.w) params.append('w', options.w);
        if (options.h) params.append('h', options.h);
        if (options.q) params.append('q', options.q);
        if (options.auto) params.append('auto', options.auto);
        if (options.fit) params.append('fit', options.fit);
        
        return `${asset.url}?${params.toString()}`;
    },
    
    // Get document by ID
    async getDocument(id) {
        const query = `*[_id == $id][0]`;
        const result = await this.fetch(query, { id });
        return result;
    },
    
    // Get all projects
    async getProjects(options = {}) {
        const { limit = 100, category = null } = options;
        let query = `*[_type == "project"]`;
        
        if (category) {
            query += ` | order(_createdAt desc) [0...${limit}]`;
        } else {
            query += ` | order(_createdAt desc) [0...${limit}]`;
        }
        
        query += ` {
            _id,
            title,
            category,
            thumbnail {
                asset->{
                    url,
                    metadata
                }
            },
            videoUrl,
            challenge,
            solution,
            roi,
            _createdAt,
            slug
        }`;
        
        return await this.fetch(query);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sanityClient;
} else {
    window.sanityClient = sanityClient;
}