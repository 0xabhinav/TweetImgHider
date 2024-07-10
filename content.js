function toggleMedia(imagesHidden) {
  const paddingSelector = 'div.r-1adg3ll.r-13qz1uu[style*="padding-bottom:"]';
  const mediaSelectors = [
    'img',
    'video',
    '[data-testid="tweetPhoto"]',
    '[data-testid="tweetVideo"]',
    '[data-testid="tweetGif"]',
    paddingSelector
  ];

  mediaSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (selector === 'img' && el.src.startsWith('https://abs-0.twimg.com/emoji')) {
        return; // Skip emojis
      }
      el.style.display = imagesHidden ? 'none' : '';
      if (selector === paddingSelector && el.parentElement) {
        el.parentElement.style.display = imagesHidden ? 'none' : '';
      }
    });
  });
}


// Initial setup
// Assume image disabled in first load, then update if needed
toggleMedia(false);

chrome.storage.local.get('imagesHidden', function(data) {
    toggleMedia(data.imagesHidden);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleMedia") {
      toggleMedia(request.imagesHidden);
    }
});
  
// Use a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver(() => {
chrome.storage.local.get('imagesHidden', function(data) {
    toggleMedia(data.imagesHidden);
});
});

observer.observe(document.body, { childList: true, subtree: true });
