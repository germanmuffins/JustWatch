function searchJustWatch(info, tab) {
  var text = info.selectionText;
  var url = "https://www.justwatch.com/us/search?q=" + encodeURIComponent(text);
  chrome.tabs.create({url: url});
}

chrome.contextMenus.create({
  id: "sjw",
  title: "Search JustWatch for '%s'",
  contexts: ["selection"],
  onclick: searchJustWatch
});

browser.menus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId == "sjw") {
    if (info.linkUrl) {
      let newTab = await browser.tabs.create({ 'active': false, 'url': info.linkUrl, 'index': tab.index+1 });
      browser.tabs.update(newTab.id, { 'muted': true });
    }
  }
});
