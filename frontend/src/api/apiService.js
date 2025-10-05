import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: API_URL,
});

// 💡 Use an interceptor to automatically add the auth token to every request
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- AUTHENTICATION ---
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);

// --- BOOKS ---
export const getBooks = (page = 1) => api.get(`/books?page=${page}`);
export const getBookById = (id) => api.get(`/books/${id}`);
export const addBook = (bookData) => api.post('/books', bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// --- REVIEWS ---
export const addReview = (bookId, reviewData) => api.post(`/reviews/${bookId}`, reviewData);
export const updateReview = (reviewId, reviewData) => api.put(`/reviews/review/${reviewId}`, reviewData);
export const deleteReview = (reviewId) => api.delete(`/reviews/review/${reviewId}`);

export default api;