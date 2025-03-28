import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './formulario';
import Tabela from './tabela';

function App() {

  // Objeto produto
  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name] : e.target.value}); // Pega o valor do Obj produto
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', { //Fazendo a requisição
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com suecesso!')
        limparFormulario();
      }

    })
     
  }

  //Limpar formulario
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }


  //Selecionar Produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} />   
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
