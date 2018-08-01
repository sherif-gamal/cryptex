function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// watchlist unmarked count
function setBadge(watchlist) {
  if (chrome.browserAction) {
    const count = watchlist.filter(todo => !todo.marked).length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      // saveState(state);
      setBadge(state.watchlist);
    });
    return store;
  };
}
