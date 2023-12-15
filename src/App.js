import React from 'react';
import './global.css';
import Header from './header/Header';
import Body from './body/Body';


function App() {
  return (
    <>
      <Header title={''} subtitle={["Instagram: @carros_eletricosBr"]} />
      <Body />
    </>
  );
}

export default App;
