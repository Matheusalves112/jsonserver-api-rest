import React, { useState, useEffect } from "react"  
import Form from "./Form"  
import Table from "./Table"

// Importação dos hooks "useState" e "useEffect" do React para gerenciar o estado e o ciclo de vida do componente.
// Importação de dois componentes: "Form" e "Table", que são componentes customizados para o formulário e tabela de usuários.

// Importação do helper para fazer requisições HTTP.
import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {
  // Criação do estado 'users' com o hook "useState". Inicialmente, o estado é 'null', indicando que não há dados de usuários carregados ainda.
  const [users, setUsers] = useState(null)

  // Definição da URL base para as operações CRUD na API local de usuários.
  const url = "http://localhost:5000/users"
  
  // Criação de uma instância do helper para facilitar as chamadas HTTP (GET, POST, PUT, DELETE).
  const api = httpHelper()

  // Hook "useEffect" que executa o efeito assim que o componente é montado. Chama a função getUsers para carregar os usuários ao iniciar.
  useEffect(() => {
    getUsers()
  }, [])

  // Função para adicionar um novo usuário via uma requisição POST.
  const postUser = user => {
    api
      .post(`${url}`, { body: user })  // Envia uma requisição POST para a URL base com o usuário como corpo.
      .then(res => getUsers())         // Após o sucesso da requisição, atualiza a lista de usuários chamando getUsers.
      .catch(err => console.log(err))  // Em caso de erro, loga o erro no console.
  }

  // Função para atualizar um usuário existente via uma requisição PUT.
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user })  // Envia uma requisição PUT para a URL do usuário específico com o novo dado.
      .then(res => getUsers())              // Após o sucesso, atualiza a lista de usuários.
      .catch(err => console.log(err))       // Loga erro em caso de falha.
  }

  // Função para deletar um usuário via uma requisição DELETE.
  const deleteUser = id => {
    api
      .del(`${url}/${id}`, {})           // Envia uma requisição DELETE para remover o usuário pelo ID.
      .then(res => getUsers())           // Após sucesso, atualiza a lista de usuários.
      .catch(err => console.log(err))    // Loga erro em caso de falha.
  }

  // Função que recupera todos os usuários da API com a expansão de informações relacionadas a "companies".
  const getUsers = () => {
    api
      .get(`${url}?_expand=companies`)   // Requisição GET para obter a lista de usuários com a expansão dos dados de "companies".
      .then(res => {
        setUsers(res)                    // Atualiza o estado "users" com a resposta da API.
      })
      .catch(err => console.log(err))    // Loga erro em caso de falha.
  }

  // Se a lista de usuários ainda não foi carregada (users é null), não renderiza nada.
  if (!users) return null

  return (
    <>
      {/* Renderiza o título e o formulário para adicionar um novo usuário. */}
      <h3>New user</h3>
      <Form postUser={postUser} />
      
      {/* Renderiza a tabela com todos os usuários. Passa as funções para criar, atualizar e deletar usuários. */}
      <div className='all-users'>
        <h3>All users</h3>
        <Table
          users={users}
          setUsers={setUsers}
          postUser={postUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  )
}

export default CrudUser
