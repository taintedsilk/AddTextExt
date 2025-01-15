// Function to create the text box
function createTextBox() {
  const textBox = document.createElement('textarea');
  textBox.id = 'persistent-text-box';
  textBox.style.width = '95%';
  textBox.style.height = '100px';
  textBox.style.position = 'relative'; 
  textBox.style.bottom = '0';
  textBox.style.left = '0';
  textBox.style.zIndex = '1000'; // Ensure it's on top of other elements

  // Load saved text
  loadText(textBox);

  // Save text on change
  textBox.addEventListener('input', () => {
    saveText(textBox.value);
  });

  // Add the text box to the end of the body
  document.body.appendChild(textBox);
}

// Function to save text to Chrome storage
function saveText(text) {
  chrome.storage.local.set({ 'persistentText': text });
}

// Function to load text from Chrome storage
function loadText(textBox) {
  chrome.storage.local.get('persistentText', (data) => {
    if (data.persistentText) {
      textBox.value = data.persistentText;
    }
  });
}

// Check if the text box already exists, if not, create it
if (!document.getElementById('persistent-text-box')) {
    createTextBox();
}