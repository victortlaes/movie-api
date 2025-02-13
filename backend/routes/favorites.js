const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const logAction = require('../logger');

const JWT_SECRET = 'galaodamassa13';

// Middleware para verificar autenticação
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Rota para salvar um filme como favorito
router.post('/add', authenticateToken, async (req, res) => {
    const { imdb_id, titulo, ano, poster_url } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;


    if (!imdb_id || !titulo || !ano) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        // Insere no banco de dados
        await pool.query(
            'INSERT INTO favoritos (user_id, imdb_id, titulo, ano, poster_url) VALUES (?, ?, ?, ?, ?)',
            [userId, imdb_id, titulo, ano, poster_url]
        );

        logAction(`Usuário ${userEmail} favoritou o filme ${titulo} com sucesso`);
        res.json({ message: 'Filme salvo como favorito!' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Filme já está nos favoritos' });
        }
        res.status(500).json({ error: 'Erro ao salvar favorito' });
    }
});

// Rota para listar os filmes favoritos do usuário
router.get('/list', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const [favoritos] = await pool.query(
            'SELECT imdb_id, titulo, ano, poster_url FROM favoritos WHERE user_id = ?',
            [userId]
        );

        res.json(favoritos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar favoritos' });
    }
});

// Rota para remover um filme dos favoritos
router.delete('/remove/:imdb_id', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const { imdb_id } = req.params;
    const { titulo } = req.body;

    try {
        const [result] = await pool.query(
            'DELETE FROM favoritos WHERE user_id = ? AND imdb_id = ?',
            [userId, imdb_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Filme não encontrado nos favoritos' });
        }

        logAction(`Usuário ${userEmail} desfavoritou o filme ${titulo} com sucesso`);
        res.json({ message: 'Filme removido dos favoritos com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover filme dos favoritos' });
    }
});


module.exports = router;