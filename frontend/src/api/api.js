import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

//! Interceptor para manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Manejo de errores personalizados
      if (error.response) {
        // El servidor respondió con un código de error
        console.error('Error de respuesta:', error.response.data);
        
        // Rate limiting
        if (error.response.status === 429) {
          throw new Error('Demasiadas peticiones. Por favor, espera un momento.');
        }
        
        // Validación
        if (error.response.status === 400) {
          const errors = error.response.data.errors;
          if (errors && errors.length > 0) {
            throw new Error(errors.map(e => e.message).join(', '));
          }
          throw new Error(error.response.data.error || 'Petición inválida');
        }
        
        // Error del servidor
        if (error.response.status >= 500) {
          throw new Error('Error del servidor. Por favor, intenta más tarde.');
        }
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        console.error('Sin respuesta del servidor:', error.request);
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        // Algo pasó al configurar la petición
        console.error('Error de configuración:', error.message);
        throw new Error('Error al realizar la petición');
      }
      
      return Promise.reject(error);
    }
);

//! SERVICIOS - API
export const booksAPI = {
    search: async (query, maxResults = 10, startIndex = 0) => {
        const response = await api.get('books/search', {
            params: {q:query, maxResults, startIndex}
        });

        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/books/${id}`);

        return response.data;
    },

    searchByAuthor: async (author, maxResults = 10) => {
        const response = await api.get('/books/author', {
            params: {author, maxResults}
        });

        return response.data
    },

    searchByCategory: async (category, maxResults = 10) => {
        const response = await api.get('/books/category', {
            params: { category, maxResults }
        });

        return response.data;
    },

    searchByISBN: async (isbn, maxResults) => {
        const response = await api.get(`/books/isbn/${isbn}`, {
            params: { maxResults }
        });

        return response.data;
    },

    healthCheck: async () => {
        const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
          return response.data;
      }
};