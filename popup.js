const textBox = document.getElementById('text-box');

// Load text into the popup's text box
async function loadPopupText() {
  chrome.storage.local.get('persistentText', async (data) => {
    if (data.persistentText) {
      textBox.value = data.persistentText;
    } else {
        const response = await fetch(chrome.runtime.getURL('tinhoc.txt'));
        if (response.ok) {
            textBox.value = await response.text();
        } else {
            console.error('Failed to load default text from tinhoc.txt');
        }
    }
  });
}

loadPopupText();

// Save text when the popup's text box changes
textBox.addEventListener('input', () => {
  chrome.storage.local.set({ 'persistentText': textBox.value });
});