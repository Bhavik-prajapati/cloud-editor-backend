const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const { Writable } = require('stream');
const pool = require('./db'); // PostgreSQL pool

// Log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a custom writable stream for DB logging
const dbStream = new Writable({
    write(chunk, encoding, callback) {
        const msg = chunk.toString().trim();
        const level = msg.includes('[ERROR]') ? 'error' : 'info';

        pool.query(
            'INSERT INTO logs (level, message) VALUES ($1, $2)',
            [level, msg]
        ).then(() => callback())
         .catch(err => {
             console.error('Error logging to DB:', err.message);
             callback();
         });
    }
});

const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.Stream({ stream: dbStream }) // ✅ Real writable stream
    ],
});

module.exports = logger;
