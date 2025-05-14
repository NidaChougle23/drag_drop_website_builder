const [{ isDragging }, drag, preview] = useDrag(() => ({
  type: 'sidebar-item',
  item: { type },
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging(),
  }),
}));
