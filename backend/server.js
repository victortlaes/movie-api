require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const compression = require('compression');
app.use(express.json());
app.use(cors());
app.use(compression());


// Rota de teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

const favoriteRoutes = require('./routes/favorites');
app.use('/favorites', favoriteRoutes);
