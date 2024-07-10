chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({imagesHidden: true});
});
