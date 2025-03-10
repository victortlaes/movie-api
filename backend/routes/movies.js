const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const cache = require('../cache');
const { check, validationResult } = require('express-validator');

const API_KEY = '7c56ac3b';
const API_URL = 'https://www.omdbapi.com/';
const JWT_SECRET = 'galaodamassa13';

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Rota de busca de filmes (protegida por autenticação)
router.get('/search', authenticateToken, [
    check('title')
        .trim()
        .escape()
        .notEmpty().withMessage('O título do filme é obrigatório')
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage('O título contém caracteres inválidos')
], async (req, res) => {
    // Captura erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.query;
    if (!title) return res.status(400).json({ error: 'O título do filme é obrigatório' });

    // Verifica se já temos a resposta em cache
    const cachedMovies = cache.get(title);
    if (cachedMovies) {
        console.log("Carregou do cache!")
        return res.json(cachedMovies);
    }

    try {
        // Chama a API OMDb
        const response = await axios.get(`${API_URL}?s=${title}&apikey=${API_KEY}`);
        
        
        if (response.data.Response === 'False') {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        // Salva a busca no banco de dados
        await pool.query('INSERT INTO historico_busca (user_id, termo_busca) VALUES (?, ?)', [req.user.id, title]);

        // Salva no cache
        cache.set(title, response.data.Search);
        res.json(response.data.Search);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
});

module.exports = router;
