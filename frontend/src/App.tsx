// JSX/TSX é a sintaxe do XML dentro do Javascript
import React from 'react';
import './App.css';
import Routes from './routes';

//  import React, { useState } from 'react';
//  import Header from './Header'
//  import Home from './pages/Home'

function App() {
  /**
    *  const [counter, setCounter] = useState(0); // retorna [valor do estado, função para atualizar o valor do estado]
    *  function handleButtonClick() {
    *    setCounter(counter + 1);
    *  }
    *  <Header title={`contador: ${counter}`} />
    *  <button type="button" onClick={handleButtonClick}>CLICK</button>
   */

  return (
    <div>
     <Routes/>
    </div>
  );
}

export default App;
