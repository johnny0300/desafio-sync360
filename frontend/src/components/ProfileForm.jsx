import { useState, useEffect } from "react";

export default function ProfileForm({ dadosIniciais, onSalvo, onCancelar }) {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    rua: '',
    bairro: '',
    estado: '',
    biografia: '',
    imagem_url: '',
    telefone: ''
  });

  useEffect(() => {
    if (dadosIniciais) {
      setForm(dadosIniciais);
    }
  }, [dadosIniciais]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        onSalvo(); // <- volta pra visualização
      })
      .catch(err => console.error("Erro ao salvar:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Editar Perfil</h2>

      <label>Imagem (URL)</label>
      <input type="text" name="imagem_url" value={form.imagem_url} onChange={handleChange} />

      <label>Nome</label>
      <input type="text" name="nome" value={form.nome} onChange={handleChange} />

      <label>Idade</label>
      <input type="number" name="idade" value={form.idade} onChange={handleChange} />

      <label>Rua</label>
      <input type="text" name="rua" value={form.rua} onChange={handleChange} />

      <label>Bairro</label>
      <input type="text" name="bairro" value={form.bairro} onChange={handleChange} />

      <label>Estado</label>
      <input type="text" name="estado" value={form.estado} onChange={handleChange} />

      <label>Telefone</label>
      <input type="text" name="telefone" value={form.telefone} onChange={handleChange} />

      <label>Biografia</label>
      <textarea name="biografia" value={form.biografia} onChange={handleChange} />

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}
