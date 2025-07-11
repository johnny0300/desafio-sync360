import './ProfileView.css';

export default function ProfileView({ dados }) {
  if (!dados) {
    return <p className="mensagem-carregando">Carregando...</p>;
  }

  return (
    <div className="view-content">
        <img
        src={dados.imagem_url}
        alt="Imagem de perfil"
        className="imagem-perfil"
        onError={(e) => e.target.src = '/default.jpg'} // ou um link qualquer
        />
      
      
      <h1 className="nome-perfil">{dados.nome}</h1>
      <p className="idade-perfil">{dados.idade} anos</p>

      <div className="endereco-perfil">
        <p><strong>Rua:</strong> {dados.rua}</p>
        <p><strong>Bairro:</strong> {dados.bairro}</p>
        <p><strong>Estado:</strong> {dados.estado}</p>
        {/* <p><strong>Cidade:</strong> {dados.cidade}</p>
        <p><strong>Telefone:</strong> {dados.telefone}</p> */}
      </div>

      <div className="bio-perfil">
        <p><strong>Biografia:</strong></p>
        <p>{dados.biografia}</p>
      </div>
    </div>
  );
}
