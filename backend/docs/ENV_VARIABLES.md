# Variables de Entorno - Booklify API

## Archivo `.env`

Crea un archivo `.env` en la raíz del directorio `backend` con las siguientes variables:

```env
# Configuración del Servidor
NODE_ENV=development
PORT=3000

# Google Books API
GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1
GOOGLE_BOOKS_API_KEY=tu_api_key_aqui

# CORS - Orígenes permitidos en producción (separados por coma)
# ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Cache
CACHE_TTL_SECONDS=600
```

## Descripción de Variables

### NODE_ENV
- **Desarrollo**: `development`
- **Producción**: `production`
- Controla el nivel de logging y mensajes de error detallados

### PORT
- Puerto donde escucha el servidor
- Por defecto: `3000`

### GOOGLE_BOOKS_API_KEY
- Obtén tu API key en: https://console.cloud.google.com/
- Activa la Google Books API
- Crea credenciales (API Key)

### RATE_LIMIT_WINDOW_MS
- Ventana de tiempo para el rate limiting en milisegundos
- 900000 ms = 15 minutos

### RATE_LIMIT_MAX_REQUESTS
- Número máximo de peticiones por ventana de tiempo
- Valor recomendado: 100-200

### CACHE_TTL_SECONDS
- Tiempo de vida del cache en segundos
- 600 segundos = 10 minutos

