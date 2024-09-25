// Importa o componente LogoIcon do diretório "./assets/icons"
import { LogoIcon } from "./assets/icons"

// Importa o componente CrudUser do diretório "./components/CrudUser"
import CrudUser from "./components/CrudUser"

// Importa o arquivo de estilos CSS para o App
import "./styles/App.css"

// Função principal do componente App
function App() {
  return (
    <>
      {/* Definindo o cabeçalho da aplicação */}
      <header>
        <div className='header__content'>
          {/* Seção da logo no cabeçalho */}
          <div className='logo'>
            {/* Componente LogoIcon que renderiza um ícone de logo */}
            <LogoIcon />
            {/* Título forte com o nome da aplicação */}
            <strong>JSON SERVER API</strong>
          </div>
        </div>
      </header>

      {/* Corpo principal da aplicação */}
      <main>
        {/* Renderiza o componente CrudUser que provavelmente é responsável por operações de CRUD (Create, Read, Update, Delete) de usuários */}
        <CrudUser />
      </main>
    </>
  )
}

// Exporta o componente App como padrão para ser usado em outras partes da aplicação
export default App

