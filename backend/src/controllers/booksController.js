const googleBookService = require('../services/googleBookService');

const booksController = {
    searchBooks: async (req, res, next) => {
        try {
            const {q, maxResults = 10, startIndex = 0} = req.query;
            
            const data = await googleBookService.searchBooks(q, maxResults, startIndex);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                query: q,
            });

        } catch (error) {
            console.error('Error en searchBooks controller:', error.message);
            next(error); // Delegar al manejador central de errores
        }
    },

    getBookById: async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const data = await googleBookService.getBookById(id);
            res.json({
                success: true,
                book: data,
            });
        } catch (error) {
            console.error('Error en getBookById controller:', error.message);
            next(error);
        }
    },

    searchByAuthor: async (req, res, next) => {
        try {
            const {author, maxResults = 10} = req.query;

            const data = await googleBookService.searchBooksByAuthor(author, maxResults);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                author: author,
            });  
        } catch (error) {
            console.error('Error en searchByAuthor controller:', error.message);
            next(error);
        }
    },

    searchByCategory: async (req, res, next) => {
        try {
            const {category, maxResults = 10} = req.query;

            const data = await googleBookService.searchBooksByCategory(category, maxResults);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                category: category,
            });
        } catch (error) {
            console.error('Error en searchByCategory controller:', error.message);
            next(error);
        }
    },

    searchByISBN: async (req, res, next) => {
        try {
            const {isbn} = req.params;
            const {maxResults = 10} = req.query;

            const data = await googleBookService.searchBooksByISBN(isbn, maxResults);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                isbn: isbn,
            });
        } catch (error) {
            console.error('Error en searchByISBN controller:', error.message);
            next(error);
        }
    }
};

module.exports = booksController;