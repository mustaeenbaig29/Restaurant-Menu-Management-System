import React from 'react';
import Header from './components/header/Header';
import DisheshList from './components/All Dishesh/DisheshList';


const App: React.FC = () => {
  return (
    <div>
      <Header/>
      <DisheshList />
    </div>
  );
}

export default App;
