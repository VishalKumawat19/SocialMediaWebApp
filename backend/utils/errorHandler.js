// Enhanced errorHandler.js

function errorHandler(err, req, res, next) {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const errorResponse = {
        success: false,
        message: err.message || 'Internal Server Error',
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        errorResponse.message = 'Validation failed';
        errorResponse.errors = err.errors; // Add validation errors if any
        res.status(400).json(errorResponse);
    } else if (err.name === 'UnauthorizedError') {
        res.status(401).json(errorResponse);
    } else {
        res.status(statusCode).json(errorResponse);
    }
}

module.exports = errorHandler;
