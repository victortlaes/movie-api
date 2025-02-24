const winston = require('winston');
const path = require('path');

// Configuração do logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, 'logs', 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Função para registrar ações específicas
const logAction = (message) => {
    logger.info(message);
};

module.exports = { logger, logAction };
