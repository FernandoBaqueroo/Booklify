const { query, param, validationResult } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                value: err.value,
            })),
        });
    }
    next();
};

/**
 * Validadores para búsqueda de libros
 */
const searchBooksValidators = [
    query('q')
        .trim()
        .notEmpty()
        .withMessage('El parámetro q es requerido')
        .isLength({ min: 1, max: 500 })
        .withMessage('La búsqueda debe tener entre 1 y 500 caracteres')
        .escape(),
    
    query('maxResults')
        .optional()
        .isInt({ min: 1, max: 40 })
        .withMessage('maxResults debe ser un número entre 1 y 40')
        .toInt(),
    
    query('startIndex')
        .optional()
        .isInt({ min: 0 })
        .withMessage('startIndex debe ser un número mayor o igual a 0')
        .toInt(),
    
    handleValidationErrors,
];

/**
 * Validadores para búsqueda por autor
 */
const searchByAuthorValidators = [
    query('author')
        .trim()
        .notEmpty()
        .withMessage('El parámetro author es requerido')
        .isLength({ min: 1, max: 200 })
        .withMessage('El nombre del autor debe tener entre 1 y 200 caracteres')
        .escape(),
    
    query('maxResults')
        .optional()
        .isInt({ min: 1, max: 40 })
        .withMessage('maxResults debe ser un número entre 1 y 40')
        .toInt(),
    
    handleValidationErrors,
];

/**
 * Validadores para búsqueda por categoría
 */
const searchByCategoryValidators = [
    query('category')
        .trim()
        .notEmpty()
        .withMessage('El parámetro category es requerido')
        .isLength({ min: 1, max: 100 })
        .withMessage('La categoría debe tener entre 1 y 100 caracteres')
        .escape(),
    
    query('maxResults')
        .optional()
        .isInt({ min: 1, max: 40 })
        .withMessage('maxResults debe ser un número entre 1 y 40')
        .toInt(),
    
    handleValidationErrors,
];

/**
 * Validadores para búsqueda por ISBN
 */
const searchByISBNValidators = [
    param('isbn')
        .trim()
        .notEmpty()
        .withMessage('El parámetro ISBN es requerido')
        .matches(/^(?:\d{10}|\d{13})$/)
        .withMessage('El ISBN debe tener 10 o 13 dígitos'),
    
    query('maxResults')
        .optional()
        .isInt({ min: 1, max: 40 })
        .withMessage('maxResults debe ser un número entre 1 y 40')
        .toInt(),
    
    handleValidationErrors,
];

/**
 * Validadores para obtener libro por ID
 */
const getBookByIdValidators = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El parámetro ID es requerido')
        .isLength({ min: 1, max: 50 })
        .withMessage('El ID debe tener entre 1 y 50 caracteres'),
    
    handleValidationErrors,
];

module.exports = {
    searchBooksValidators,
    searchByAuthorValidators,
    searchByCategoryValidators,
    searchByISBNValidators,
    getBookByIdValidators,
};

