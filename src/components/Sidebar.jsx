// components/Sidebar.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const SIDEBAR_ITEMS = [
  { type: 'text', label: 'Text Box' },
  { type: 'button', label: 'Button' },
  { type: 'image', label: 'Image' },
  { type: 'heading', label: 'Heading' },
  { type: 'paragraph', label: 'Paragraph' },
];

const SidebarItem = ({ type, label }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'sidebar-item',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag} 
      className="sidebar-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Elements</h3>
      {SIDEBAR_ITEMS.map((item, index) => (
        <SidebarItem key={index} type={item.type} label={item.label} />
      ))}
    </div>
  );
};


export default Sidebar;