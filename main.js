// Setup the editors

const editorOptions = {
  lineNumbers: "off",
  theme: "vs-dark",
  fontFamily: 'Consolas, Menlo, Monaco, "Courier New", monospace',
  quickSuggestions: true,
  wordBasedSuggestions: true,
  minimap: { enabled: false },
  formatOnType: true,
  formatOnPaste: true,
};

const htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
  value: `<button id="color-button">Change my color!</button>`,
  language: 'html',
  ...editorOptions
});

const cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
  value: `#color-button {
  padding: 10px 20px;
  font-size: 20px;
  transition: background-color 0.5s;
}`,
  language: 'css',
  ...editorOptions
});

const jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
  value: `
  const button = document.getElementById('color-button');
  button.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    button.style.backgroundColor = randomColor;
  });
  `,
  language: 'javascript',
  ...editorOptions
});



// Setup the live preview
const previewFrame = document.getElementById('preview-frame');

const updatePreview = () => {
  const htmlCode = htmlEditor.getValue();
  const cssCode = cssEditor.getValue();
  const jsCode = jsEditor.getValue();

  const code = `
    <style>${cssCode}</style>
    <div>${htmlCode}</div>
    <script>${jsCode}</script>
  `;

  const preview = previewFrame.contentDocument;
  preview.open();
  preview.write(code);
  preview.close();
}

// Listen for changes in the editors and update the live preview
htmlEditor.onDidChangeModelContent(updatePreview);
cssEditor.onDidChangeModelContent(updatePreview);
jsEditor.onDidChangeModelContent(updatePreview);

updatePreview(); // Initial load


