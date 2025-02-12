import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login.js';
import Busca from './views/Busca.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/busca" element={<Busca />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
