// components/Element.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Element = ({ element, isSelected, onClick, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);
  const elementRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'element',
    hover: (draggedItem) => {
      if (draggedItem.id !== element.id) {
        // Swap elements logic can be added here
      }
    },
    drop: (draggedItem) => {
      if (draggedItem.id !== element.id) {
        // Handle element repositioning
      }
    },
  }));

  drag(drop(elementRef));

  const handleDoubleClick = () => {
    if (element.type !== 'image') {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(element.id, { content });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(element.id);
  };

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return isEditing ? (
          <input
            type="text"
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span>{content}</span>
        );
      case 'button':
        return <button className={element.props.className}>{content}</button>;
      case 'heading':
        const HeadingTag = `h${element.props.level}`;
        return isEditing ? (
          <input
            type="text"
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <HeadingTag>{content}</HeadingTag>
        );
      case 'paragraph':
        return isEditing ? (
          <textarea
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <p>{content}</p>
        );
      case 'image':
        return <img src={content} alt="User uploaded" />;
      default:
        return <div>{content}</div>;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`element ${isSelected ? 'selected' : ''}`}
      style={{
        ...element.style,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onClick={(e) => onClick(element, e)}
      onDoubleClick={handleDoubleClick}
    >
      {renderElement()}
      {isSelected && (
        <button className="delete-btn" onClick={handleDelete}>
          ×
        </button>
      )}
    </div>
  );
};

export default Element;