const textBox = document.getElementById('text-box');

// Load text into the popup's text box
chrome.storage.local.get('persistentText', (data) => {
  if (data.persistentText) {
    textBox.value = data.persistentText;
  }
});

// Save text when the popup's text box changes
textBox.addEventListener('input', () => {
  chrome.storage.local.set({ 'persistentText': textBox.value });
});