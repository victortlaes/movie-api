require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Rota de teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);