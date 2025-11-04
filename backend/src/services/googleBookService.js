const axios = require('axios');

/**
 * ! ESTE ARCHIVO MANEJA TODAS LAS PETICIONES A GOOGLE BOOKS
 */
class GoogleBookService {
    constructor () {
        this.baseURL = process.env.GOOGLE_BOOKS_API_URL || 'https://www.googleapis.com/books/v1';
        this.apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        
        if (!this.baseURL) {
            throw new Error('GOOGLE_BOOKS_API_URL no está configurada');
        }
        
        if (!this.apiKey) {
            console.warn('⚠️  ADVERTENCIA: GOOGLE_BOOKS_API_KEY no está configurada. La API funcionará con límites reducidos.');
        }
    }

    //? Buscar libro por query
    async searchBooks(query, maxResults = 10, startIndex = 0) {
        try {
            const params = {
                q: query,
                maxResults,
                startIndex,
            };
            
            if (this.apiKey) {
                params.key = this.apiKey;
            }
            
            const response = await axios.get(`${this.baseURL}/volumes`, {
                params
            });
            
            return response.data;
        } catch (error) {
            console.error('❌ Error al buscar libros:', error.message);
            if (error.response) {
                console.error('   Status:', error.response.status);
                console.error('   Data:', error.response.data);
            }
            throw error;
        }
    }

    //? Obtener libro por ID
    async getBookById(id) {
        try {
            const params = {};
            
            if (this.apiKey) {
                params.key = this.apiKey;
            }
            
            const response = await axios.get(`${this.baseURL}/volumes/${id}`, {
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener libro por ID:', error.message);
            if (error.response) {
                console.error('   Status:', error.response.status);
                console.error('   Data:', error.response.data);
            }
            throw error;
        }
    }

    //? Buscar por autor
    // Según la documentación: inauthor: (sin espacio, distingue mayúsculas)
    async searchBooksByAuthor(author, maxResults = 10) {
        try {
            // Usar comillas para frases exactas según la documentación
            const query = author.includes(' ') ? `inauthor:"${author}"` : `inauthor:${author}`;
            return this.searchBooks(query, maxResults);
        } catch (error) {   
            console.error('Error al buscar libros por autor:', error.message);
            throw error;
        }
    }

    //? Buscar por categoria
    // Según la documentación: subject: (sin espacio, distingue mayúsculas)
    async searchBooksByCategory(category, maxResults = 10) {
        try {
            // Usar comillas para frases exactas según la documentación
            const query = category.includes(' ') ? `subject:"${category}"` : `subject:${category}`;
            return this.searchBooks(query, maxResults);
        } catch (error) {
            console.error('Error al buscar libros por categoria:', error.message);
            throw error;
        }
    }
    //? Buscar por ISBN
    // Según la documentación: isbn: (sin espacio, distingue mayúsculas)
    async searchBooksByISBN(isbn, maxResults = 10) {
        try {
            // ISBN no debe tener espacios según la documentación
            return this.searchBooks(`isbn:${isbn}`, maxResults);
        } catch (error) {
            console.error('Error al buscar libros por ISBN:', error.message);
            throw error;
        }
    }
}

module.exports = new GoogleBookService();