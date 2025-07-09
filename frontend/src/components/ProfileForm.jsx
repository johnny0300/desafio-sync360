import { useState, useEffect, useRef } from "react";
import './ProfileForm.css';

export default function ProfileForm({ dadosIniciais, onSalvo, onCancelar }) {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    rua: '',
    bairro: '',
    estado: '',
    biografia: '',
    imagem_url: ''
    // telefone: '',
    // cidade: ''
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    document.title = "Editar Perfil";
  }, []);

  useEffect(() => {
    if (dadosIniciais) {
      setForm(dadosIniciais);
    }
  }, [dadosIniciais]);

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const novosErros = {};

    if (!form.nome || form.nome.trim().length < 3) {
      novosErros.nome = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!form.idade || Number(form.idade) < 13) {
      novosErros.idade = "A idade deve ser maior ou igual a 13";
    }

    if (!form.rua || form.rua.trim().length < 3) {
      novosErros.rua = "Rua deve conter alguma informação ";
    }

    if (!form.bairro || form.rua.trim().length < 3) {
      novosErros.bairro = "Bairro deve conter alguma informação ";
    }

    if (!form.estado) {
      novosErros.estado = "Por favor, selecione um estado";
    }

    return novosErros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});

    fetch('http://localhost:3001/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        onSalvo();
      })
      .catch(err => console.error("Erro ao salvar:", err));
  };

  return (
    <div className="form-content">
        <h2>Editar Perfil</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="form" id="form">
        <div>
          
          <input type="text" placeholder="Digite a URL da Imagem" className="inputs" name="imagem_url" value={form.imagem_url} onChange={handleChange} />
        </div>

        <div>
          
          <input type="text" placeholder="Digite seu nome" name="nome" className="inputs required" value={form.nome} onChange={handleChange} />
          {erros.nome && <span className="span-required">{erros.nome}</span>}
        </div>

        <div>
          
          <input type="number" placeholder="Digite ou selecione sua idade" name="idade" className="inputs required" value={form.idade} onChange={handleChange} />
          {erros.idade && <span className="span-required">{erros.idade}</span>}
        </div>

        <div>
          
          <input type="text" placeholder="Digite a rua de seu endereço" name="rua" className="inputs" value={form.rua} onChange={handleChange} />
          {erros.rua && <span className="span-required">{erros.rua}</span>}
        </div>

        <div>
          
          <input type="text" placeholder="Digite o bairro de seu endereço" name="bairro" className="inputs" value={form.bairro} onChange={handleChange} />
          {erros.bairro && <span className="span-required">{erros.bairro}</span>}
        </div>

        <div>
          
          <select id="estado" name="estado" className="inputs" value={form.estado} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          {erros.estado && <span className="span-required">{erros.estado}</span>}
        </div>

        {/* <div>
          <label>Cidade</label>
          <input type="text" placeholder="Digite sua cidade" name="cidade" className="inputs" value={form.cidade} onChange={handleChange} />
          {erros.cidade && <span className="span-required">{erros.cidade}</span>}
        </div>

        <div>
          <label>Telefone</label>
          <input type="text" placeholder="Digite seu telefone para contato" name="telefone" className="inputs required" value={form.telefone} onChange={handleChange} />
          {erros.telefone && <span className="span-required">{erros.telefone}</span>}
        </div> */}

        <div>
          
          <textarea name="biografia" placeholder="Conte um pouco sobre você" className="inputs" value={form.biografia} onChange={handleChange} />
        </div>

        
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
        

      </form>
      
    </div>
  );
}
