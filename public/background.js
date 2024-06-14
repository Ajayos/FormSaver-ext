chrome.runtime.onInstalled.addListener(() => {
    console.log('FormSaver installed');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveFormData') {
      chrome.storage.local.set({ [request.url]: request.data }, () => {
        sendResponse({ status: 'success' });
      });
    }
    return true;
  });
  