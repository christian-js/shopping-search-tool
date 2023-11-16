chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        contexts: ["selection"],
        type: "normal",
        title: "Search Amazon for '%s'",
        id: "search-amazon"
    });

    chrome.contextMenus.create({
        contexts: ["selection"],
        type: "normal",
        title: "Search eBay for '%s'",
        id: "search-ebay"
    });

    chrome.contextMenus.create({
        contexts: ["selection"],
        type: "normal",
        title: "Search Temu for '%s'",
        id: "search-temu"
    });

    chrome.contextMenus.create({
        contexts: ["selection"],
        type: "normal",
        title: "Search all stores for '%s'",
        id: "search-all"
    });

    chrome.contextMenus.onClicked.addListener((info) => {
        const { menuItemId, selectionText } = info;

        switch (menuItemId) {
            case "search-all":
                chrome.storage.sync.get(["stores"]).then(({ stores }) => {
                    for (let store of stores) {
                        chrome.tabs.create({
                            active: false,
                            url: store.urlBase + selectionText
                        })
                    }
                })
                break;

            case "search-amazon":
                chrome.tabs.create({
                    active: false,
                    url: "https://amazon.com/s?k=" + selectionText
                });
                break;

            case "search-ebay":
                chrome.tabs.create({
                    active: false,
                    url: "https://www.ebay.com/sch/i.html?_nkw=" + selectionText
                });
                break;

            case "search-temu":
                chrome.tabs.create({
                    active: false,
                    url: "https://www.temu.com/search_result.html?search_key=" + selectionText
                });
                break;
            default:
                break;
        }
    });

})