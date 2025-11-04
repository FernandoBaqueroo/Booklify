const googleBookService = require('../services/googleBookService');

const booksController = {
    searchBooks: async (req, res) => {
        try {
            const {q, maxResults = 10, startIndex = 0} = req.query;

            if (!q) {
                return res.status(400).json({ error: 'El parametro q es requerido' });
            }

            const data = await googleBookService.searchBooks(q, maxResults, startIndex);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                query: q,
            });

        } catch (error) {
            console.error('Error en searchBooks controller:', error.message);
            res.status(500).json({ 
                success: false, 
                error: 'Error al buscar libros',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    getBookById: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await googleBookService.getBookById(id);
            res.json({
                success: true,
                book: data,
            });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error al obtener libro por ID'});
        }
    },

    searchByAuthor: async (req, res) => {
        try {
            const {author, maxResults = 10} = req.query;
            if (!author) {
                return res.status(400).json({ error: 'El parametro author es requerido' });
            }

            const data = await googleBookService.searchBooksByAuthor(author, maxResults);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                author: author,
            });  
        } catch (error) {
            console.error('Error en searchByAuthor controller:', error.message);
            res.status(500).json({ 
                success: false, 
                error: 'Error al buscar libros por autor',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    searchByCategory: async (req, res) => {
        try {
            const {category, maxResults = 10} = req.query;
            if (!category) {
                return res.status(400).json({ error: 'El parametro category es requerido' });
            }

            const data = await googleBookService.searchBooksByCategory(category, maxResults);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                category: category,
            });
        } catch (error) {
            console.error('Error en searchByCategory controller:', error.message);
            res.status(500).json({ 
                success: false, 
                error: 'Error al buscar libros por categoría',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    searchByISBN: async (req, res) => {
        try {
            const {isbn} = req.params;
            const {maxResults = 10} = req.query;
            if (!isbn) {
                return res.status(400).json({ error: 'El parametro isbn es requerido' });
            }   

            const data = await googleBookService.searchBooksByISBN(isbn, maxResults);
            res.json({
                success: true,
                totalItems: data.totalItems,
                items: data.items || [],
                isbn: isbn,
            });
        } catch (error) {
            console.error('Error en searchByISBN controller:', error.message);
            res.status(500).json({ 
                success: false, 
                error: 'Error al buscar libros por ISBN',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

module.exports = booksController;