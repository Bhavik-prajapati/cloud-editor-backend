const logger = require("../config/logger");

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMsg = error.details.map(d => d.message).join(", ");
            logger.warn(`Validation failed: ${errorMsg}`);
            return res.status(400).json({ error: errorMsg });
        }
        next();
    };
};

module.exports = validate;
