
// each time the user updates the text in the omnibox this event
// is fired and we will use it to suggest 
// search terms for our internal users.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
      {content: "CRM" , description: "will fetch the internal CRM"},
      {content: "ERP" , description: "will fetch the internal ERP"},
      {content: "sales", description: "will fetch the lastest sales report"}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {

    if (text.indexOf("/") < 1) {
      text += "/";
    }
    if (text.indexOf("http") < 0) {
      text = "http://our-internal-portal/" + text;
    }
    alert('We are taking you to: "' + text + '"');
    navigate(text);
  });


function navigate(url) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: url});
  });
}