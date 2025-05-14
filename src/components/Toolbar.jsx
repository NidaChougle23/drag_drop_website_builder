// components/Toolbar.jsx
import React from 'react';
import { exportToHTML } from '../utils/exportUtils';

const Toolbar = ({ elements, selectedElement, setElements }) => {
  const handleExport = () => {
    exportToHTML(elements);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      setElements([]);
    }
  };

  return (
    <div className="toolbar">
      <h1>Website Builder</h1>
      <div className="toolbar-actions">
        <button onClick={handleExport}>Export HTML</button>
        <button onClick={handleClear}>Clear Canvas</button>
      </div>
    </div>
  );
};

export default Toolbar;