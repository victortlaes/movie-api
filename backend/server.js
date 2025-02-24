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

// Carregando cert SSL para Https
const options = {
    key: fs.readFileSync('server.key'),  // Chave privada
    cert: fs.readFileSync('server.cert') // Certificado
};

const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor rodando com HTTPS na porta ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

const favoriteRoutes = require('./routes/favorites');
app.use('/favorites', favoriteRoutes);

