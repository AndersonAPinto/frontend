import React from 'react';
import './global.css';
import Header from './header/Header';
import Body from './body/Body';


function App() {
  return (
    <>
      <Header title={''} subtitle={["Sobre o site", "Como Funciona?", "Taxas na conta"]} />
      <Body />
    </>
  );
}

export default App;
