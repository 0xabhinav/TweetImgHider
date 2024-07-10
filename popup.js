document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');
  
  chrome.storage.local.get('imagesHidden', function(data) {
    toggleButton.textContent = data.imagesHidden ? 'Show Images' : 'Hide Images';
  });

  toggleButton.addEventListener('click', function() {
    chrome.storage.local.get('imagesHidden', function(data) {
      const newState = !data.imagesHidden;
      chrome.storage.local.set({imagesHidden: newState}, function() {
        toggleButton.textContent = newState ? 'Show Images' : 'Hide Images';
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "toggleMedia", imagesHidden: newState});
        });
      });
    });
  });
});
