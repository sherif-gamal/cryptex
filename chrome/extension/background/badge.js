chrome.storage.local.get('watchlist', (obj) => {
  let watchlist = obj.watchlist;
  if (watchlist) {
    watchlist = JSON.parse(watchlist);
    const len = watchlist.filter(todo => !todo.marked).length;
    if (len > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {
    // Initial
    chrome.browserAction.setBadgeText({ text: '1' });
  }
});
