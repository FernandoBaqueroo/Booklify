require('dotenv').config();
const express = require('express');
const bookRoutes = require('./routes/booksRoutes')

const app = express();

//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Configuracion CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//! Ruta de Bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de libros',
        endpoint: {
            search: '/api/books/search',
            getBookById: '/api/books/:id',
            searchByAuthor: '/api/books/author',
            searchByCategory: '/api/books/category',
            searchByISBN: '/api/books/isbn/:isbn',
        }
    });
});

//! Rutas de la API
app.use('/api/books', bookRoutes);

//!Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
    });
});

module.exports = app;