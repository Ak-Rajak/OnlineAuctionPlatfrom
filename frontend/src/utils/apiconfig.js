/**
 * Central configuration for API endpoints
 * Uses environment variables with fallback to localhost for development
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export default API_BASE_URL;