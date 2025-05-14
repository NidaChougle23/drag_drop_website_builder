// utils/exportUtils.js
export const exportToHTML = (elements) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .default-button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .default-button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  ${elements.map(element => {
    const style = Object.entries(element.style || {})
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
    
    switch (element.type) {
      case 'text':
        return `<div style="${style}">${element.content}</div>`;
      case 'button':
        return `<button class="${element.props.className}" style="${style}">${element.content}</button>`;
      case 'heading':
        return `<h${element.props.level} style="${style}">${element.content}</h${element.props.level}>`;
      case 'paragraph':
        return `<p style="${style}">${element.content}</p>`;
      case 'image':
        return `<img src="${element.content}" style="${style}" alt="User uploaded" />`;
      default:
        return `<div style="${style}">${element.content}</div>`;
    }
  }).join('\n')}
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};