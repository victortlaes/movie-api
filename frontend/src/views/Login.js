import { useState } from 'react';
import api from '../api/api.js'; // Importa o Axios configurado
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha_hash, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await api.post('/auth/login', { email, senha_hash });
            localStorage.setItem('token', resposta.data.token); // Salva o token no navegador
            navigate('/busca'); // Redireciona para a página de busca
        } catch (err) {
            setErro(err.response?.data?.error || 'Erro ao fazer login');
        }
    };

    return (
        <div className="body">
            <h2 className="titulo">Login</h2>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <form onSubmit={handleLogin} className="campos">
                <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Senha" value={senha_hash} onChange={(e) => setSenha(e.target.value)} required />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
