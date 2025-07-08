import { useState, useEffect } from "react";

export default function ProfileForm() {
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
    fetch('http://localhost:3001/usuario')
      .then(res => res.json())
      .then(data => setForm(data))
      .catch(err => console.error("Erro ao buscar usuário:", err));
  }, []);

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
      .then(msg => alert(msg))
      .catch(err => console.error("Erro ao salvar:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titulo">Editar Perfil</h2>

      <label className="label" htmlFor="imagem_url">Imagem (URL)</label>
      <input className="input-imagem" type="text" name="imagem_url" value={form.imagem_url} onChange={handleChange} />

      <label className="label" htmlFor="nome">Nome completo</label>
      <input className="input-nome" type="text" name="nome" value={form.nome} onChange={handleChange} />

      <label className="label" htmlFor="idade">Idade</label>
      <input className="input-idade" type="number" name="idade" value={form.idade} onChange={handleChange} />

      <label className="label" htmlFor="rua">Rua</label>
      <input className="input-rua" type="text" name="rua" value={form.rua} onChange={handleChange} />

      <label className="label" htmlFor="bairro">Bairro</label>
      <input className="input-bairro" type="text" name="bairro" value={form.bairro} onChange={handleChange} />

      <label className="label" htmlFor="estado">Estado</label>
      <input className="input-estado" type="text" name="estado" value={form.estado} onChange={handleChange} />

      <label className="label" htmlFor="telefone">Telefone</label>
      <input className="input-telefone" type="text" name="telefone" value={form.telefone} onChange={handleChange} />

      <label className="label" htmlFor="biografia">Biografia</label>
      <textarea className="input-biografia" name="biografia" value={form.biografia} onChange={handleChange}></textarea>

      <button className="botao-salvar" type="submit">Salvar</button>
    </form>
  );
}
