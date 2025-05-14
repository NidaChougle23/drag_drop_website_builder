import React from 'react';
import { useDrop } from 'react-dnd';
import Element from './Element';

const Canvas = ({ elements, setElements, selectedElement, setSelectedElement }) => {
  const [, drop] = useDrop(() => ({
    accept: 'sidebar-item',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document.querySelector('.canvas').getBoundingClientRect();
      
      // Add boundary constraints
      const x = Math.max(0, Math.min(offset.x - canvasRect.left, canvasRect.width - 50));
      const y = Math.max(0, Math.min(offset.y - canvasRect.top, canvasRect.height - 50));

      const newElement = {
        id: `element-${Date.now()}`,
        type: item.type,
        content: getDefaultContent(item.type),
        style: {
          left: `${x}px`,
          top: `${y}px`,
          position: 'absolute',
          zIndex: elements.length + 1,  // Proper z-index management
        },
        props: getDefaultProps(item.type),
      };

      setElements(prevElements => [...prevElements, newElement]);
    },
  }));

  const handleElementClick = (element, e) => {
    e.stopPropagation();
    setSelectedElement(element.id);
  };

  const handleCanvasClick = () => {
    setSelectedElement(null);
  };

  const updateElement = (id, updates) => {
    setElements(prevElements => 
      prevElements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    );
  };

  const deleteElement = (id) => {
    setElements(prevElements => prevElements.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'text': return 'Edit me';
      case 'button': return 'Click me';
      case 'heading': return 'Heading';
      case 'paragraph': return 'Lorem ipsum...';
      default: return '';
    }
  };

  const getDefaultProps = (type) => {
    switch (type) {
      case 'button': 
        return { className: 'default-button' };
      case 'heading':
        return { level: 1 };
      default:
        return {};
    }
  };

  return (
    <div 
      ref={drop} 
      className="canvas" 
      onClick={handleCanvasClick}
    >
      {elements.map(element => (
        <Element
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onClick={handleElementClick}
          onUpdate={updateElement}
          onDelete={deleteElement}
        />
      ))}
    </div>
  );
};

export default Canvas;