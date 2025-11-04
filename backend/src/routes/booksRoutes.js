const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/search', booksController.searchBooks);
router.get('/author', booksController.searchByAuthor);
router.get('/category', booksController.searchByCategory);
router.get('/isbn/:isbn', booksController.searchByISBN);
router.get('/:id', booksController.getBookById);

module.exports = router;