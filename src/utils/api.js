// Utility to provide API base URL for frontend requests.
// Set REACT_APP_API_BASE in your .env for a custom backend (e.g. https://api.example.com)
// Default to localhost backend during development if not provided.
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export { API_BASE };
