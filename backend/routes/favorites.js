const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const logAction = require('../logger');
const { check, validationResult } = require('express-validator');

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
router.post('/add', authenticateToken, [
    check('imdb_id').trim().escape().notEmpty().withMessage('imdb_id é obrigatório'),
    check('titulo').trim().escape().notEmpty().withMessage('Título é obrigatório'),
    check('ano').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Ano inválido'),
    check('poster_url').optional().isURL().withMessage('URL inválida')
], async (req, res) => {
    // Captura erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { imdb_id, titulo, ano, poster_url } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;


    if (!imdb_id || !titulo || !ano) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificacao dos parametros - Verifica se o ano é um número válido
    if (!/^\d{4}$/.test(ano)) {
        return res.status(400).json({ error: 'Ano inválido. Deve conter 4 dígitos numéricos.' });
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
router.delete('/remove/:imdb_id', authenticateToken, [
    check('imdb_id').trim().escape().notEmpty().withMessage('imdb_id é obrigatório'),
    check('titulo').optional().trim().escape()
], async (req, res) => {
    // Captura erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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