const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { cacheMiddleware } = require('../middlewares/cache');
const { searchLimiter } = require('../middlewares/rateLimiter');
const {
    searchBooksValidators,
    searchByAuthorValidators,
    searchByCategoryValidators,
    searchByISBNValidators,
    getBookByIdValidators,
} = require('../middlewares/validators');

/**
 * IMPORTANTE: El orden de las rutas importa en Express
 * Las rutas más específicas deben ir ANTES que las dinámicas
 */

//! Búsqueda general - Cache 10 min
router.get(
    '/search',
    searchLimiter,
    searchBooksValidators,
    cacheMiddleware(600),
    booksController.searchBooks
);

//! Búsqueda por autor - Cache 15 min
router.get(
    '/author',
    searchLimiter,
    searchByAuthorValidators,
    cacheMiddleware(900),
    booksController.searchByAuthor
);

//! Búsqueda por categoría - Cache 15 min
router.get(
    '/category',
    searchLimiter,
    searchByCategoryValidators,
    cacheMiddleware(900),
    booksController.searchByCategory
);

//! Búsqueda por ISBN - Cache 30 min (los ISBNs no cambian)
router.get(
    '/isbn/:isbn',
    searchLimiter,
    searchByISBNValidators,
    cacheMiddleware(1800),
    booksController.searchByISBN
);

//! Obtener libro por ID - Cache 30 min (los libros no cambian frecuentemente)
router.get(
    '/:id',
    getBookByIdValidators,
    cacheMiddleware(1800),
    booksController.getBookById
);

module.exports = router;