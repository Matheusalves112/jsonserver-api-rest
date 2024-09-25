// Importando React e o hook useState, usado para gerenciar o estado do componente.
import React, { useState } from "react"

// Importando o componente DropCompanies, que será usado para selecionar empresas.
import DropComapies from "./DropCompanies"

// Definindo o componente funcional Form, que recebe as props userData, postUser, e updateUser.
const Form = ({ userData = {}, postUser, updateUser }) => {
  // Inicializando o estado 'user' com valores padrões ou os valores fornecidos por 'userData'.
  const [user, setUser] = useState({
    name: userData.name ?? "",             // Nome do usuário
    username: userData.username ?? "",     // Nome de usuário
    email: userData.email ?? "",           // Email do usuário
    phone: userData.phone ?? "",           // Telefone do usuário
    companiesId: userData.companiesId ?? "0", // ID da empresa, com valor inicial "0"
  })

  // Função para atualizar o estado 'user' com base nos valores do input.
  const handleValue = e => {
    setUser({ ...user, [e.target.name]: e.target.value }) // Atualiza o campo específico (name, email, etc.)
  }

  // Função chamada quando o formulário é submetido.
  const submitUser = e => {
    e.preventDefault() // Previne o comportamento padrão do formulário (recarregar a página)

    // Se 'companiesId' for "0" (nenhuma empresa selecionada), a função para aqui.
    if (user.companiesId === "0") return

    // Se 'userData.id' existir, significa que estamos atualizando um usuário existente.
    // Chama a função updateUser com o id e os dados do usuário.
    if (userData.id) {
      updateUser(userData.id, user)
    } else {
      // Caso contrário, é um novo usuário, então chama a função postUser com os dados do usuário.
      postUser(user)
    }
  }

  return (
    // Formulário que, ao ser submetido, chama a função submitUser.
    <form onSubmit={submitUser} className='row'>
      {/* Campo de input para o nome, controlado pelo estado 'user.name' */}
      <input
        type='text'
        name='name'
        value={user.name}
        placeholder='Name'
        onChange={e => handleValue(e)} // Atualiza o estado quando o valor muda
      />
      {/* Campo de input para o email, controlado pelo estado 'user.email' */}
      <input
        type='email'
        name='email'
        value={user.email}
        placeholder='Email'
        onChange={e => handleValue(e)} // Atualiza o estado quando o valor muda
      />
      {/* Campo de input para o telefone, controlado pelo estado 'user.phone' */}
      <input
        type='tel'
        name='phone'
        value={user.phone}
        placeholder='Phone (10)' // Placeholder sugere um número de telefone de 10 dígitos
        pattern='[0-9]{10}' // Define um padrão que só permite números de 10 dígitos
        onChange={e => handleValue(e)} // Atualiza o estado quando o valor muda
      />
      {/* Componente DropCompanies para selecionar uma empresa, passando o 'companiesId' e a função handleValue */}
      <DropComapies companiesId={user.companiesId} handleValue={handleValue} />
      {/* Botão de submissão, o texto varia dependendo se estamos adicionando ou editando um usuário */}
      <input
        className='btn-submit'
        type='submit'
        value={`${!userData.id ? "Add new user" : "Save user"}`} // Se userData.id existe, mostra "Save user", caso contrário "Add new user"
      />
    </form>
  )
}

export default Form
