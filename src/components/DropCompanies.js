import React, { useState, useEffect } from "react";
import { httpHelper } from "../helpers/httpHelper";

// Componente DropCompanies recebe dois props: 
// 'companiesId' (o ID da empresa atualmente selecionada) 
// e 'handleValue' (uma função para tratar mudanças no valor do dropdown).
const DropCompanies = ({ companiesId, handleValue }) => {
  // Declaração de estado para armazenar a lista de empresas.
  const [companies, setCompanies] = useState(null);
  // Declaração de estado para armazenar a empresa atualmente selecionada (ID da empresa).
  const [company, setCompany] = useState(companiesId);

  // URL da API de onde os dados das empresas serão obtidos.
  const url = "http://localhost:5000/companies";
  // Inicialização de um objeto helper para fazer requisições HTTP.
  const api = httpHelper();

  // Hook useEffect para fazer a requisição à API quando o componente é montado.
  useEffect(() => {
    api
      .get(url) // Faz uma requisição GET para a URL definida acima.
      .then(res => {
        // Se a requisição for bem-sucedida, insere a opção "Select Company" no início da lista
        // e atualiza o estado 'companies' com os dados da API.
        setCompanies([{ id: 0, name: "Select Company" }, ...res]);
      })
      .catch(err => console.log(err)); // Caso ocorra erro, imprime no console.
  }, []); // A dependência vazia [] faz com que o efeito seja executado apenas uma vez, na montagem.

  // Se os dados das empresas ainda não tiverem sido carregados, retorna null e não renderiza nada.
  if (!companies) return null;

  // Renderiza um elemento <select> com as opções de empresas.
  return (
    <select
      name="companiesId" // Define o nome do select (útil para formulários).
      value={company} // Define o valor atual do select como o ID da empresa selecionada.
      onChange={e => {
        // Quando o valor do select muda:
        setCompany(e.target.value); // Atualiza o estado 'company' com o novo valor.
        handleValue(e); // Chama a função 'handleValue' passada por props para informar a mudança ao componente pai.
      }}
    >
      {companies.map(c => (
        // Cria uma <option> para cada empresa na lista de 'companies'.
        // Define o valor da opção como o ID da empresa e a exibe pelo nome.
        <option value={c.id} key={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default DropCompanies;
