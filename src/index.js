// Importa a biblioteca React para criar componentes e gerenciar o estado da aplicação.
import React from "react";

// Importa ReactDOM, que é responsável por manipular a árvore de elementos DOM no navegador.
import ReactDOM from "react-dom";

// Importa o componente principal "App" da aplicação, que será renderizado.
import App from "./App";

// Usa o método render de ReactDOM para renderizar o componente <App /> dentro do elemento HTML com o ID "root".
// O React.StrictMode é um wrapper para ajudar a detectar erros no código durante o desenvolvimento.
ReactDOM.render(
  // StrictMode ativa verificações adicionais e alertas no desenvolvimento
  <React.StrictMode>
    {/* O componente principal da aplicação que será exibido */}
    <App />
  </React.StrictMode>,
  
  // Seleciona o elemento com ID "root" no HTML como ponto de montagem da aplicação React
  document.getElementById("root")
);
