// utils/response.js
const success = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        status:statusCode,
        success: true,
        message:message,
        data
    });
};

const error = (res, message, statusCode = 500, errors = {}) => {
    return res.status(statusCode).json({
        status:statusCode,
        success: false,
        message:message,
        errors
    });
};

module.exports = { success, error };
