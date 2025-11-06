# 🚀 Guía Rápida de Inicio - Booklify API

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar Dependencias
```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la carpeta `backend`:

```env
NODE_ENV=development
PORT=3000
GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1
GOOGLE_BOOKS_API_KEY=tu_clave_api_aqui
```

> **Obtener API Key**: https://console.cloud.google.com/ → Activa Google Books API → Credenciales → Crear API Key

### 3. Iniciar Servidor
```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

### 4. Verificar
```bash
# Health check
curl http://localhost:3000/health

# Información de la API
curl http://localhost:3000/

# Búsqueda de prueba
curl "http://localhost:3000/api/books/search?q=javascript&maxResults=5"
```

---

## 📍 Endpoints Principales

| Endpoint | Método | Descripción | Ejemplo |
|----------|--------|-------------|---------|
| `/health` | GET | Estado del servidor | `curl http://localhost:3000/health` |
| `/` | GET | Info de la API | `curl http://localhost:3000/` |
| `/api/books/search` | GET | Buscar libros | `curl "http://localhost:3000/api/books/search?q=python"` |
| `/api/books/:id` | GET | Libro por ID | `curl http://localhost:3000/api/books/zyTCAlFPygYC` |
| `/api/books/author` | GET | Buscar por autor | `curl "http://localhost:3000/api/books/author?author=Stephen+King"` |
| `/api/books/category` | GET | Buscar por categoría | `curl "http://localhost:3000/api/books/category?category=Fiction"` |
| `/api/books/isbn/:isbn` | GET | Buscar por ISBN | `curl http://localhost:3000/api/books/isbn/9780596517748` |

---

## 🎯 Características Implementadas

### ✅ Seguridad
- 🔒 **Helmet**: Headers HTTP seguros
- 🌐 **CORS**: Configurado con lista blanca
- 🛡️ **Rate Limiting**: 
  - General: 100 req/15min
  - Búsquedas: 30 req/min
- ✅ **Validación**: express-validator en todos los endpoints
- 🔐 **Sanitización**: Escape automático de inputs

### ✅ Rendimiento
- ⚡ **Cache**: Node-Cache en memoria
  - Búsquedas generales: 10 min
  - Por autor/categoría: 15 min
  - Por ISBN/ID: 30 min
- 📦 **Compresión**: Gzip (~70% reducción)
- 🚀 **Optimización**: Validación en middlewares

### ✅ Monitoreo
- 📊 **Logging**: Morgan HTTP Logger
- ❤️ **Health Check**: `/health` endpoint
- 🚨 **Error Handling**: Centralizado

---

## 🧪 Pruebas Rápidas

### Verificar Cache
```bash
# Primera llamada (MISS)
curl "http://localhost:3000/api/books/search?q=javascript"

# Segunda llamada (HIT - más rápida)
curl "http://localhost:3000/api/books/search?q=javascript"
```

En los logs del servidor verás:
```
❌ Cache MISS: /api/books/search?q=javascript
✅ Cache HIT: /api/books/search?q=javascript
```

### Verificar Rate Limiting
```bash
# Hacer 31+ peticiones rápidas
for i in {1..35}; do
  curl "http://localhost:3000/api/books/search?q=test$i"
done
```

Después de 30, recibirás:
```json
{
  "success": false,
  "error": "Demasiadas búsquedas, por favor espera un momento."
}
```

### Verificar Validación
```bash
# Sin parámetro requerido (400)
curl "http://localhost:3000/api/books/search"

# ISBN inválido (400)
curl "http://localhost:3000/api/books/isbn/123"

# Respuesta de error
{
  "success": false,
  "errors": [
    {
      "field": "isbn",
      "message": "El ISBN debe tener 10 o 13 dígitos",
      "value": "123"
    }
  ]
}
```

---

## 📂 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Documentación completa de la API |
| `BEST_PRACTICES.md` | Guía de mejores prácticas implementadas |
| `RESUMEN_MEJORAS.md` | Comparativa antes/después |
| `ENV_VARIABLES.md` | Variables de entorno |
| `QUICK_START.md` | Esta guía |

---

## 🔧 Configuración Avanzada

### CORS en Producción
Edita `src/config/corsOptions.js`:

```javascript
const allowedOrigins = [
    'http://localhost:5173',
    'https://tudominio.com',     // ← Añade tu dominio
    'https://www.tudominio.com',
];
```

### Ajustar Rate Limits
Edita `src/middlewares/rateLimiter.js`:

```javascript
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // ← Ajusta este número
    // ...
});
```

### Tiempos de Cache
Edita `src/routes/booksRoutes.js`:

```javascript
router.get(
    '/search',
    searchLimiter,
    searchBooksValidators,
    cacheMiddleware(600), // ← Segundos (600 = 10 min)
    booksController.searchBooks
);
```

---

## 🐛 Solución de Problemas

### Error: "No se puede conectar"
- Verifica que el servidor esté corriendo
- Comprueba el puerto en `.env`
- Revisa que no haya otro proceso usando el puerto

### Error: "API Key no configurada"
- Crea el archivo `.env`
- Añade `GOOGLE_BOOKS_API_KEY=tu_clave`
- Reinicia el servidor

### Error: "Module not found"
```bash
cd backend
npm install
```

---

## 📊 Logs del Servidor

Al iniciar verás:
```
╔════════════════════════════════════════════════════════════╗
║        🚀 BOOKLIFY API - Servidor iniciado                ║
╠════════════════════════════════════════════════════════════╣
║  🌍 Entorno:     development                              ║
║  🔗 Puerto:      3000                                     ║
║  📍 URL:         http://localhost:3000                    ║
║  📚 API Docs:    http://localhost:3000/api/books         ║
║  ❤️  Health:     http://localhost:3000/health             ║
╚════════════════════════════════════════════════════════════╝

✅ Middlewares activos:
   • Helmet (Seguridad HTTP)
   • CORS (Configurado)
   • Rate Limiting (100 req/15min general, 30 req/min búsquedas)
   • Compression (Gzip)
   • Cache (En memoria)
   • Morgan (Logging)
   • Express Validator (Validación de inputs)
```

---

## ✅ Checklist Pre-Deploy

Antes de desplegar a producción:

- [ ] `NODE_ENV=production` en variables de entorno
- [ ] CORS configurado con tu dominio
- [ ] HTTPS configurado
- [ ] API Key de Google Books válida
- [ ] Health check funcionando
- [ ] Logs configurados
- [ ] `npm audit` sin vulnerabilidades críticas

---

## 🎓 Siguientes Pasos

1. **Testing**: Añade tests con Jest
2. **Base de Datos**: MongoDB o PostgreSQL
3. **Autenticación**: JWT para usuarios
4. **Documentación**: Swagger/OpenAPI
5. **Docker**: Contenedorización

---

## 📞 Recursos

- [Documentación Completa](./README.md)
- [Mejores Prácticas](./BEST_PRACTICES.md)
- [Google Books API Docs](https://developers.google.com/books)

---

**¡Listo! Tu API REST profesional está funcionando. 🎉**

