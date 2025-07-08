import { useState, useEffect } from 'react';
import './App.css'
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/usuario')
      .then(res => res.json())
      .then(data => setUsuario(data))
      .catch(err => console.error('Erro ao buscar usuário:', err));
  }, []);

  return (
    <div className="pagina">
      <ProfileView dados={usuario} />
    </div>
  );
  
}

export default App;


