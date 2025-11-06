const NodeCache = require('node-cache');

/**
 * Cache en memoria para respuestas de la API
 * stdTTL: tiempo de vida por defecto (10 minutos)
 * checkperiod: cada cuánto revisar elementos expirados (120 segundos)
 */
const cache = new NodeCache({
    stdTTL: 600, // 10 minutos
    checkperiod: 120, // 2 minutos
});

/**
 * Middleware para cachear respuestas GET
 * Usa la URL completa como clave
 */
const cacheMiddleware = (duration = 600) => {
    return (req, res, next) => {
        // Solo cachear peticiones GET
        if (req.method !== 'GET') {
            return next();
        }

        const key = req.originalUrl || req.url;
        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            console.log(`✅ Cache HIT: ${key}`);
            return res.json(cachedResponse);
        }

        console.log(`❌ Cache MISS: ${key}`);
        
        // Interceptar el método json() original
        const originalJson = res.json.bind(res);
        
        res.json = (body) => {
            // Solo cachear respuestas exitosas
            if (res.statusCode === 200) {
                cache.set(key, body, duration);
            }
            return originalJson(body);
        };

        next();
    };
};

/**
 * Función para limpiar el cache manualmente si es necesario
 */
const clearCache = () => {
    cache.flushAll();
    console.log('🗑️  Cache limpiado');
};

/**
 * Obtener estadísticas del cache
 */
const getCacheStats = () => {
    return cache.getStats();
};

module.exports = {
    cacheMiddleware,
    clearCache,
    getCacheStats,
};

