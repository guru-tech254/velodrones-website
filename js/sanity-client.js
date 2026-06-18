const sanityClient = {
    projectId: 'YOUR_SANITY_PROJECT_ID',
    dataset: 'production',
    apiVersion: '2024-01-01',
    
    getBaseUrl() {
        return `https://${this.projectId}.api.sanity.io/v${this.apiVersion}`;
    },
    
    async fetch(query, params = {}) {
        const url = `${this.getBaseUrl()}/data/query/${this.dataset}`;
        const queryParams = new URLSearchParams({ query, ...params });
        
        try {
            const response = await fetch(`${url}?${queryParams}`);
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Sanity fetch error:', error);
            throw error;
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = sanityClient;
} else {
    window.sanityClient = sanityClient;
}