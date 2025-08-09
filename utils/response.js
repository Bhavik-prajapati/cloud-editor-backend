// utils/response.js
const success = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const error = (res, message, statusCode = 500, errors = {}) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};

module.exports = { success, error };
