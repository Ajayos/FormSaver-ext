// Listen for changes on all form inputs
document.addEventListener('input', (event) => {
  if (event.target.form) {
    const form = event.target.form;
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const url = window.location.href;
    chrome.storage.local.set({ [url]: formObject });
  }
});

// Clear all storage data on a specific key combination for testing
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.shiftKey && event.key === 'X') {
    chrome.storage.local.clear(() => {
      console.log('All storage data cleared.');
    });
  }
});
