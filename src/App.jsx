// App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import './styles.css';

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div className="app">
      <Toolbar 
        elements={elements} 
        selectedElement={selectedElement} 
        setElements={setElements} 
      />
      <div className="builder-container">
        <Sidebar />
        <Canvas 
          elements={elements} 
          setElements={setElements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
      </div>
    </div>
  );
}

export default App;