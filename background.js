(function () {
    chrome.runtime.onInstalled.addListener(function () {
        console.log('init');
    });

    // chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //     if ((!changeInfo.url) && changeInfo.status === 'complete') {
    //         console.log(tabId);
    //     }
    // });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type = 'UPDATE_CONTENT_SIZE') {
            console.log(sender);
            chrome.browserAction.setBadgeText({
                tabId: sender.tab.id,
                text: message.contentSize
            });
        }
    })
}());