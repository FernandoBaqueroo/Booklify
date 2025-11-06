require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const corsOptions = require('./config/corsOptions');
const { generalLimiter } = require('./middlewares/rateLimiter');
const bookRoutes = require('./routes/booksRoutes');

const app = express();

//! Seguridad: Helmet - Protege contra vulnerabilidades conocidas
app.use(helmet());

//! CORS - Configuración segura de orígenes permitidos
app.use(cors(corsOptions));

//! Logging - Morgan para registrar peticiones HTTP
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logs detallados en desarrollo
} else {
    app.use(morgan('combined')); // Logs estándar en producción
}

//! Compresión - Reduce el tamaño de las respuestas
app.use(compression());

//! Body Parsing
app.use(express.json({ limit: '10kb' })); // Limitar tamaño del body a 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//! Rate Limiting - Prevenir abuso de la API
app.use('/api/', generalLimiter);

//! Health Check - Para monitoreo
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

//! Ruta de Bienvenida
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Bienvenido a Booklify API - API de libros',
        version: '1.0.0',
        documentation: 'https://developers.google.com/books',
        endpoints: {
            search: {
                url: '/api/books/search',
                method: 'GET',
                params: 'q (requerido), maxResults, startIndex',
            },
            getBookById: {
                url: '/api/books/:id',
                method: 'GET',
            },
            searchByAuthor: {
                url: '/api/books/author',
                method: 'GET',
                params: 'author (requerido), maxResults',
            },
            searchByCategory: {
                url: '/api/books/category',
                method: 'GET',
                params: 'category (requerido), maxResults',
            },
            searchByISBN: {
                url: '/api/books/isbn/:isbn',
                method: 'GET',
                params: 'maxResults',
            },
        },
    });
});

//! Rutas de la API
app.use('/api/books', bookRoutes);

//! Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.originalUrl,
    });
});

//! Manejo centralizado de errores
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

module.exports = app;