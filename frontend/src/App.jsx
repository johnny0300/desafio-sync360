import { useState, useEffect } from 'react';
import './App.css';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Função para buscar os dados atualizados do usuário
  const buscarUsuario = () => {
    fetch('http://localhost:3001/usuario')
      .then(res => res.json())
      .then(data => setUsuario(data))
      .catch(err => console.error('Erro ao buscar usuário:', err));
  };

  useEffect(() => {
    buscarUsuario();
  }, []);

  const handleEditar = () => setModoEdicao(true);
  const handleCancelar = () => setModoEdicao(false);

  const handleSalvo = () => {
    buscarUsuario();       // Atualiza os dados do usuário
    setModoEdicao(false);  // Volta para o modo visualização
  };

  return (
    <div className="pagina">
        {!usuario ? (
        <p>Carregando...</p>
      ) : modoEdicao ? (
        <ProfileForm 
          dadosIniciais={usuario}
          onSalvo={handleSalvo}
          onCancelar={handleCancelar}
        />
      ) : (
        <>
          <ProfileView dados={usuario} />
          <button className="button-edit" onClick={handleEditar}>Editar Perfil</button>
        </>
      )}
    </div>
  );
}

export default App;
