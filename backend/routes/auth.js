const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db.js');
const logAction = require('../logger');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const JWT_SECRET = 'galaodamassa13';


// Rota de login de usuário
router.post('/login', [
    check('email')
        .trim()
        .escape()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
    check('senha_hash')
        .trim()
        .escape()
        .isLength({ min: 6 })
        .withMessage('A senha deve ter pelo menos 6 caracteres')
    ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha_hash } = req.body;
    console.log(req.body);

    // Verificacao dos parametros - Verificando se campos foram preenchidos (Agora nao sei se faz sentido as validacoes mesmo apos utilizar o sanitizer)
    if (!email || !senha_hash) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Verificacao dos parametros - Verifica se o email tem um formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }
    

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ error: 'Usuário ' + email + ' não encontrado' });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(senha_hash, user.senha_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        logAction(`Usuário ${email} fez login com sucesso`);
        // Gera um token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor!' });
    }
});

module.exports = router;
