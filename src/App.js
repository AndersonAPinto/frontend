import React from 'react';
import './global.css';
import Header from './header/Header';
import Body from './body/Body';


function App() {
  return (
    <>
      <Header title={'Título'} subtitle={["Sobre", "Como Funciona?", "Taxas"]} />
      <Body />
    </>
  );
}

export default App;
