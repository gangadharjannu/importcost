// console.log(location.href);
(function () {
    //  execute only after DOMContentLoaded
    // document.addEventListener('DOMContentLoaded', ready, false);
    // similar to jQuery $(document).ready function
    // function ready() {
    var contentElem = document.body.childNodes[0];
    var contentLength = (contentElem && contentElem.nodeName === 'PRE' && contentElem.textContent.length) || 0;
    if (contentLength) {
        console.log(humanFileSize(contentLength))
        addContentSizeText(humanFileSize(contentLength));
        // chrome.browserAction.setBadgeText({
        //     text: humanFileSize(contentLength)
        // });
        // chrome.runtime.sendMessage({
        //     type: 'UPDATE_CONTENT_SIZE',
        //     contentSize: humanFileSize(contentLength)
        // });
    }
    // };

    function addContentSizeText(contentSize) {
        var fragment = document
            .createRange()
            .createContextualFragment('<div class="ic-content-size ic-' +
                contentSize.slice(-2) + '">' + contentSize + '</div>');
        document.body.appendChild(fragment);
    }

    function humanFileSize(bytes) {
        var i = bytes == 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB'][i];
    };
}());