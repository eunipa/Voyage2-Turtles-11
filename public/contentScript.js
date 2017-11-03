// sending a message to the content script in the selected tab.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
    console.log(response.farewell);
  });
});