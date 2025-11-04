# 📚 Booklify API - Documentación Completa

API REST para la búsqueda y consulta de libros utilizando la API de Google Books. Esta API proporciona endpoints para buscar libros por diferentes criterios: búsqueda general, por autor, por categoría, por ISBN y por ID.

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Inicio del Servidor](#inicio-del-servidor)
7. [Endpoints de la API](#endpoints-de-la-api)
8. [Ejemplos de Uso](#ejemplos-de-uso)
9. [Manejo de Errores](#manejo-de-errores)
10. [Tecnologías Utilizadas](#tecnologías-utilizadas)
11. [Mejoras Opcionales](#mejoras-opcionales)

---

## 🎯 Descripción General

Booklify API es una API REST construida con Node.js y Express que actúa como un intermediario entre tu aplicación y la API de Google Books. Proporciona una interfaz simplificada para buscar y obtener información detallada sobre libros.

### Características Principales

- ✅ Búsqueda general de libros
- ✅ Búsqueda por autor
- ✅ Búsqueda por categoría
- ✅ Búsqueda por ISBN
- ✅ Obtener libro por ID
- ✅ Paginación de resultados
- ✅ CORS habilitado
- ✅ Manejo de errores robusto

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior)
- **Clave API de Google Books** ([Obtener aquí](https://console.cloud.google.com/apis/library/books.googleapis.com))

---

## 🔧 Instalación

1. **Clonar o navegar al directorio del proyecto:**
```bash
cd backend
```

2. **Instalar dependencias:**
```bash
npm install
```

Las dependencias instaladas son:
- `express`: Framework web para Node.js
- `axios`: Cliente HTTP para realizar peticiones
- `dotenv`: Gestión de variables de entorno

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del directorio `backend` con las siguientes variables:

```env
# Puerto del servidor (opcional, por defecto 3000)
PORT=3000

# URL base de la API de Google Books
GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1

# Tu clave API de Google Books (obligatorio)
GOOGLE_BOOKS_API_KEY=tu_clave_api_aqui
```

### Obtener Clave API de Google Books

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Books
4. Ve a "Credenciales" y crea una nueva clave API
5. Copia la clave y añádela a tu archivo `.env`

⚠️ **Importante:** No subas el archivo `.env` a control de versiones. Asegúrate de agregarlo a `.gitignore`.

---

## 📁 Estructura del Proyecto

```
backend/
├── node_modules/          # Dependencias instaladas
├── src/
│   ├── app.js             # Configuración principal de Express
│   ├── controllers/
│   │   └── booksController.js    # Lógica de controladores
│   ├── routes/
│   │   └── booksRoutes.js        # Definición de rutas
│   └── services/
│       └── googleBookService.js   # Servicio para Google Books API
├── server.js               # Punto de entrada del servidor
├── package.json            # Configuración del proyecto
├── package-lock.json       # Lock de dependencias
└── .env                    # Variables de entorno (crear manualmente)
```

### Descripción de Archivos

- **`server.js`**: Punto de entrada que inicializa el servidor Express
- **`src/app.js`**: Configuración de Express, middlewares y rutas principales
- **`src/controllers/booksController.js`**: Controladores que manejan la lógica de negocio
- **`src/routes/booksRoutes.js`**: Definición de todas las rutas de la API
- **`src/services/googleBookService.js`**: Servicio que interactúa con la API de Google Books

---

## 🚀 Inicio del Servidor

### Modo Desarrollo (con recarga automática)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000` (o el puerto configurado en `.env`)

---

## 🌐 Endpoints de la API

### Base URL

```
http://localhost:3000/api/books
```

### 1. Búsqueda General de Libros

Busca libros utilizando una consulta general.

**Endpoint:**
```
GET /api/books/search
```

**Parámetros de Query:**
| Parámetro | Tipo | Requerido | Descripción | Valor por Defecto |
|-----------|------|-----------|-------------|-------------------|
| `q` | string | ✅ Sí | Término de búsqueda | - |
| `maxResults` | number | ❌ No | Número máximo de resultados | 10 |
| `startIndex` | number | ❌ No | Índice de inicio para paginación | 10 |

**Ejemplo de Petición:**
```bash
GET http://localhost:3000/api/books/search?q=javascript&maxResults=5&startIndex=0
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "totalItems": 1500,
  "items": [
    {
      "id": "book_id",
      "volumeInfo": {
        "title": "JavaScript: The Good Parts",
        "authors": ["Douglas Crockford"],
        "description": "Descripción del libro...",
        "publishedDate": "2008-05-01",
        "pageCount": 176,
        "categories": ["Computers"],
        "imageLinks": {
          "thumbnail": "https://..."
        }
      }
    }
  ],
  "query": "javascript"
}
```

---

### 2. Obtener Libro por ID

Obtiene información detallada de un libro específico usando su ID de Google Books.

**Endpoint:**
```
GET /api/books/:id
```

**Parámetros de URL:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `id` | string | ✅ Sí | ID del libro en Google Books | - |

**Ejemplo de Petición:**
```bash
GET http://localhost:3000/api/books/zyTCAlFPygYC
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "book": {
    "id": "zyTCAlFPygYC",
    "volumeInfo": {
      "title": "JavaScript: The Good Parts",
      "authors": ["Douglas Crockford"],
      "description": "Descripción completa...",
      "publishedDate": "2008-05-01",
      "pageCount": 176,
      "categories": ["Computers"],
      "language": "en",
      "previewLink": "https://books.google.com/...",
      "infoLink": "https://books.google.com/..."
    }
  }
}
```

---

### 3. Búsqueda por Autor

Busca libros escritos por un autor específico.

**Endpoint:**
```
GET /api/books/author
```

**Parámetros de Query:**
| Parámetro | Tipo | Requerido | Descripción | Valor por Defecto |
|-----------|------|-----------|-------------|-------------------|
| `author` | string | ✅ Sí | Nombre del autor | - |
| `maxResults` | number | ❌ No | Número máximo de resultados | 10 |

**Ejemplo de Petición:**
```bash
GET http://localhost:3000/api/books/author?author=Gabriel García Márquez&maxResults=5
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "totalItems": 45,
  "items": [
    {
      "id": "book_id",
      "volumeInfo": {
        "title": "Cien años de soledad",
        "authors": ["Gabriel García Márquez"],
        "description": "..."
      }
    }
  ],
  "author": "Gabriel García Márquez"
}
```

---

### 4. Búsqueda por Categoría

Busca libros pertenecientes a una categoría específica.

**Endpoint:**
```
GET /api/books/category
```

**Parámetros de Query:**
| Parámetro | Tipo | Requerido | Descripción | Valor por Defecto |
|-----------|------|-----------|-------------|-------------------|
| `category` | string | ✅ Sí | Categoría del libro (ej: "Fiction", "Science", "History") | - |
| `maxResults` | number | ❌ No | Número máximo de resultados | 10 |

**Ejemplo de Petición:**
```bash
GET http://localhost:3000/api/books/category?category=Fiction&maxResults=10
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "totalItems": 2500,
  "items": [
    {
      "id": "book_id",
      "volumeInfo": {
        "title": "Libro de Ficción",
        "categories": ["Fiction"],
        "description": "..."
      }
    }
  ],
  "category": "Fiction"
}
```

---

### 5. Búsqueda por ISBN

Busca un libro utilizando su número ISBN.

**Endpoint:**
```
GET /api/books/isbn/:isbn
```

**Parámetros de URL:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `isbn` | string | ✅ Sí | Número ISBN (10 o 13 dígitos) | - |

**Ejemplo de Petición:**
```bash
GET http://localhost:3000/api/books/isbn/9780596517748
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "totalItems": 1,
  "items": [
    {
      "id": "book_id",
      "volumeInfo": {
        "title": "JavaScript: The Good Parts",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9780596517748"
          }
        ]
      }
    }
  ],
  "isbn": "9780596517748"
}
```

---

### 6. Ruta de Bienvenida

Información general sobre la API y sus endpoints disponibles.

**Endpoint:**
```
GET /
```

**Ejemplo de Petición:**
```bash
GET http://localhost:3000/
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Bienvenido a la API de libros",
  "endpoint": {
    "search": "/api/books/search",
    "getBookById": "/api/books/:id",
    "searchByAuthor": "/api/books/author",
    "searchByCategory": "/api/books/category",
    "searchByISBN": "/api/books/isbn/:isbn"
  }
}
```

---

## 💡 Ejemplos de Uso

### Usando cURL

```bash
# Búsqueda general
curl "http://localhost:3000/api/books/search?q=python&maxResults=5"

# Buscar por autor
curl "http://localhost:3000/api/books/author?author=Stephen%20King&maxResults=10"

# Buscar por categoría
curl "http://localhost:3000/api/books/category?category=Science"

# Obtener libro por ID
curl "http://localhost:3000/api/books/zyTCAlFPygYC"

# Buscar por ISBN
curl "http://localhost:3000/api/books/isbn/9780596517748"
```

### Usando JavaScript (Fetch API)

```javascript
// Búsqueda general
const searchBooks = async (query) => {
  const response = await fetch(
    `http://localhost:3000/api/books/search?q=${encodeURIComponent(query)}&maxResults=10`
  );
  const data = await response.json();
  return data;
};

// Buscar por autor
const searchByAuthor = async (author) => {
  const response = await fetch(
    `http://localhost:3000/api/books/author?author=${encodeURIComponent(author)}`
  );
  const data = await response.json();
  return data;
};

// Obtener libro por ID
const getBookById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/books/${id}`);
  const data = await response.json();
  return data;
};
```

### Usando Axios

```javascript
const axios = require('axios');

// Búsqueda general
const searchBooks = async (query) => {
  try {
    const response = await axios.get('http://localhost:3000/api/books/search', {
      params: {
        q: query,
        maxResults: 10,
        startIndex: 0
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## ⚠️ Manejo de Errores

La API utiliza códigos de estado HTTP estándar para indicar el resultado de las peticiones:

### Códigos de Estado

| Código | Descripción |
|--------|-------------|
| `200` | ✅ Petición exitosa |
| `400` | ❌ Error de validación (parámetros faltantes o inválidos) |
| `404` | ❌ Ruta no encontrada |
| `500` | ❌ Error interno del servidor |

### Formato de Respuesta de Error

```json
{
  "success": false,
  "error": "Descripción del error"
}
```

### Ejemplos de Errores

**Error 400 - Parámetro faltante:**
```json
{
  "error": "El parametro q es requerido"
}
```

**Error 404 - Ruta no encontrada:**
```json
{
  "success": false,
  "message": "Ruta no encontrada"
}
```

**Error 500 - Error del servidor:**
```json
{
  "success": false,
  "error": "Error al buscar libros"
}
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **Express.js**: Framework web minimalista y flexible
- **Axios**: Cliente HTTP basado en promesas
- **dotenv**: Gestión de variables de entorno
- **nodemon**: Herramienta de desarrollo para recarga automática

### Versiones

Las versiones específicas se pueden consultar en `package.json`:
- Express: ^5.1.0
- Axios: ^1.13.1
- dotenv: ^17.2.3

---

## 🚀 Mejoras Opcionales

Después de haber finalizado la configuración inicial de la API, puedes considerar implementar las siguientes mejoras para hacer tu API más robusta, escalable y profesional:

### 1. Agregar Caché con Redis

**Descripción:** Implementar un sistema de caché con Redis para almacenar resultados de búsquedas frecuentes y reducir el número de llamadas a la API de Google Books.

**Beneficios:**
- ⚡ Mejora significativa en el tiempo de respuesta
- 💰 Reduce costos de llamadas a APIs externas
- 📈 Mejor rendimiento bajo carga alta

**Instalación:**
```bash
npm install redis ioredis
```

**Ejemplo de implementación:**
```javascript
const redis = require('redis');
const client = redis.createClient();

// En el controlador
const cacheKey = `books:${query}:${maxResults}`;
const cached = await client.get(cacheKey);
if (cached) return JSON.parse(cached);

// Guardar en caché después de obtener datos
await client.setex(cacheKey, 3600, JSON.stringify(data));
```

---

### 2. Paginación Más Robusta

**Descripción:** Mejorar el sistema de paginación actual con validaciones, límites máximos y mejor formato de respuesta.

**Beneficios:**
- 📄 Mejor experiencia de usuario con navegación clara
- 🔒 Prevención de sobrecarga con límites de resultados
- 📊 Información más detallada sobre paginación

**Implementación sugerida:**
- Validar que `startIndex` y `maxResults` sean números positivos
- Establecer límites máximos (ej: `maxResults` máximo de 40)
- Incluir información de paginación en la respuesta (página actual, total de páginas, etc.)

---

### 3. Rate Limiting para Proteger tu API

**Descripción:** Implementar límites de tasa de solicitudes para prevenir abuso y proteger tu API.

**Beneficios:**
- 🛡️ Protección contra abuso y ataques DDoS
- ⚖️ Distribución equitativa de recursos
- 📊 Control de uso de la API

**Instalación:**
```bash
npm install express-rate-limit
```

**Ejemplo de implementación:**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por ventana
});

app.use('/api/', limiter);
```

---

### 4. Validación de Datos con express-validator

**Descripción:** Implementar validación robusta de parámetros de entrada para prevenir errores y mejorar la seguridad.

**Beneficios:**
- ✅ Validación consistente de datos de entrada
- 🔒 Mejor seguridad contra inyecciones
- 📝 Mensajes de error más descriptivos

**Instalación:**
```bash
npm install express-validator
```

**Ejemplo de implementación:**
```javascript
const { body, query, validationResult } = require('express-validator');

// Middleware de validación
const validateSearch = [
  query('q').notEmpty().withMessage('El parámetro q es requerido'),
  query('maxResults').optional().isInt({ min: 1, max: 40 }).withMessage('maxResults debe ser entre 1 y 40')
];

// En la ruta
router.get('/search', validateSearch, booksController.searchBooks);
```

---

### 5. Documentación con Swagger

**Descripción:** Crear documentación interactiva de la API usando Swagger/OpenAPI.

**Beneficios:**
- 📖 Documentación interactiva y siempre actualizada
- 🧪 Permite probar endpoints directamente desde la documentación
- 👥 Facilita la integración para otros desarrolladores

**Instalación:**
```bash
npm install swagger-jsdoc swagger-ui-express
```

**Ejemplo de implementación:**
```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booklify API',
      version: '1.0.0',
      description: 'API para búsqueda de libros'
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

---

### 6. Tests con Jest

**Descripción:** Implementar suite de pruebas unitarias e integración usando Jest para garantizar la calidad del código.

**Beneficios:**
- ✅ Detección temprana de bugs
- 🔄 Confianza al refactorizar código
- 📊 Métricas de cobertura de código
- 🚀 CI/CD más robusto

**Instalación:**
```bash
npm install --save-dev jest supertest
```

**Ejemplo de implementación:**
```javascript
// tests/books.test.js
const request = require('supertest');
const app = require('../src/app');

describe('GET /api/books/search', () => {
  test('debe retornar 400 si falta el parámetro q', async () => {
    const response = await request(app)
      .get('/api/books/search')
      .expect(400);
    
    expect(response.body.error).toBeDefined();
  });

  test('debe retornar resultados cuando se proporciona q', async () => {
    const response = await request(app)
      .get('/api/books/search?q=javascript')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.items).toBeDefined();
  });
});
```

**Script de package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 📝 Notas Adicionales

- La API utiliza la API de Google Books, por lo que está sujeta a sus límites y políticas de uso.
- Se recomienda implementar las mejoras opcionales en producción para un mejor rendimiento y seguridad.
- Mantén tu clave API segura y nunca la expongas en el código fuente.

---

## 📞 Soporte

Para preguntas o problemas, consulta la documentación oficial de:
- [Google Books API](https://developers.google.com/books/docs/v1/using)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

