import React from "react";
import Form from "./Form"; // Importa o componente Form que será utilizado para editar ou criar novos usuários

// Componente Table, que recebe como props: uma lista de usuários (users), funções para postar (postUser), atualizar (updateUser) e deletar (deleteUser) um usuário
const Table = ({ users, postUser, updateUser, deleteUser }) => {
    
    // Função que exibe/oculta o formulário de atualização de um usuário específico
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`); // Seleciona o formulário correspondente ao id do usuário
		form[0].classList.toggle("hide-form"); // Adiciona ou remove a classe 'hide-form', que provavelmente controla a visibilidade do formulário
	};

    // Componente Row, que renderiza cada linha da tabela para um usuário
	const Row = ({ user }) => {
		return (
			<>
				{/* Linha contendo os dados do usuário */}
				<div className='row'>
					<div>{user.name}</div> {/* Exibe o nome do usuário */}
					<div>{user.email}</div> {/* Exibe o email do usuário */}
					<div>{user.phone}</div> {/* Exibe o telefone do usuário */}
					<div>{user.companies.name}</div> {/* Exibe o nome da empresa associada ao usuário */}
					<div className='buttons'>
						{/* Botão para exibir o formulário de atualização do usuário */}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						
                        {/* Botão para deletar o usuário, utilizando a função deleteUser passada como prop */}
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
                
				{/* Formulário oculto para atualizar o usuário, que será exibido/ocultado com base no estado */}
				<div className={`hide-form show-form-${user.id}`}>
					{/* Componente Form que permite a edição dos dados do usuário */}
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		);
	};

    // Renderiza a tabela
	return (
		<div className='table'>
			{/* Cabeçalhos das colunas da tabela */}
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			
			{/* Renderiza as linhas da tabela para cada usuário existente */}
			<div className='rows'>
				{users && users.map(u => <Row user={u} key={u.id} />)} {/* Gera uma linha (Row) para cada usuário na lista */}
			</div>
		</div>
	);
};

export default Table; // Exporta o componente Table
