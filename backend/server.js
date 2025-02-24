require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');

const app = express();
const compression = require('compression');
app.use(express.json());
app.use(cors());
app.use(compression());

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 requisições por IP a cada 15 minutos
    message: { error: 'Muitas requisições. Tente novamente mais tarde.' }
});

// Aplica o Rate Limiter a todas as rotas
app.use(limiter);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

const favoriteRoutes = require('./routes/favorites');
app.use('/favorites', favoriteRoutes);


// Carregando cert SSL para Https
const options = {
    key: fs.readFileSync('server.key'),  // Chave privada
    cert: fs.readFileSync('server.cert') // Certificado
};

const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor rodando com HTTPS na porta ${PORT}`);
});
