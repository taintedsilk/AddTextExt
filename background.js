// Listen for the keyboard shortcut command
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-text-area') {
    // Send a message to the active tab to toggle the text area
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'toggleTextArea' });
    });
  }
});

// Rest of the code (for saving/loading) remains the same:
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'saveText') {
    chrome.storage.local.set({ storedText: request.text }, () => {
      console.log('Text saved in Background:', request.text);
    });
  } else if (request.type === 'loadState') {
    chrome.storage.local.get(['storedText', 'collapsedState'], (data) => {
      sendResponse({ text: data.storedText, collapsed: data.collapsedState });
    });
    return true;
  } else if (request.type === 'saveCollapsedState') {
    chrome.storage.local.set({ collapsedState: request.collapsed }, () => {
      console.log('Collapsed state saved:', request.collapsed);
    });
  }
  return true;
});