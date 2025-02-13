const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db.js'); // Importa a conexão com o MySQL
const logAction = require('../logger');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'galaodamassa13'; // Defina uma chave segura para tokens


// Rota de login de usuário
router.post('/login', async (req, res) => {
    const { email, senha_hash } = req.body;
    console.log(req.body);

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
