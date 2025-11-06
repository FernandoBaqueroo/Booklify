/**
 * Configuración de CORS para la API
 * En producción, debes especificar los orígenes permitidos
 */

const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Otro posible puerto
    'http://127.0.0.1:5173',
    // Agrega aquí tu dominio de producción cuando lo despliegues
    // 'https://tuapp.com',
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir peticiones sin origin (como apps móviles o Postman)
        if (!origin) {
            return callback(null, true);
        }

        if (process.env.NODE_ENV === 'development') {
            // En desarrollo, permitir todos los orígenes
            return callback(null, true);
        }

        // En producción, solo permitir orígenes específicos
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

module.exports = corsOptions;

