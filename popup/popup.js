const storeSelectionForm = document.querySelector('form');

chrome.storage.sync.get(["stores"]).then(({ stores }) => {
    for (let store of stores) {
        storeSelectionForm.elements[store.name].checked = true;
    }
})

storeSelectionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { amazon, ebay, temu } = e.target.elements;
    const stores = [amazon, ebay, temu];
    console.log(stores)

    const storesToSearch = [];


    for (let store of stores) {
        if (store.checked === true) {
            storesToSearch.push({
                name: store.name,
                urlBase: store.getAttribute('url-base')
            });
        }
    }

    chrome.storage.sync.set({ stores: storesToSearch }).then(() => {
        chrome.notifications.create({
            title: "Shopping Search Tool",
            message: "Store selection updated successfully! Get to shopping!",
            type: "basic",
            iconUrl: chrome.runtime.getURL("assets/icons/icon-500.png")
        })
    });

});