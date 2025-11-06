const rateLimit = require('express-rate-limit');

/**
 * Rate limiter general para toda la API
 * Limita a 100 peticiones por 15 minutos por IP
 */
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // 100 peticiones por ventana
    message: {
        success: false,
        error: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
    },
    standardHeaders: true, // Devuelve info en los headers `RateLimit-*`
    legacyHeaders: false, // Desactiva los headers `X-RateLimit-*`
});

/**
 * Rate limiter más estricto para búsquedas
 * Limita a 30 peticiones por minuto
 */
const searchLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 30, // 30 peticiones por ventana
    message: {
        success: false,
        error: 'Demasiadas búsquedas, por favor espera un momento.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    generalLimiter,
    searchLimiter,
};

