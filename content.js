(function () {
    var contentElem = document.body.childNodes[0];
    var className = 'ic-content-size';
    // content size
    var contentLength = (contentElem && contentElem.nodeName === 'PRE' && contentElem.textContent.length) || 0;

    // appends contentSize HTMLElement to body and make that draggable
    if (contentLength) {
        addContentSizeText(humanFileSize(contentLength));
        dragElement(document.querySelector('.' + className));
    }

    /**
     * appends contentSize DIV element to body
     * 
     * @param contentSize accepts String 
     */
    function addContentSizeText(contentSize) {
        var fragment = document
            .createRange()
            .createContextualFragment('<div class="' + className + ' ic-' +
                contentSize.slice(-2) + '">' + contentSize + '</div>');
        document.body.appendChild(fragment);
    }
    /**
     * returns the human readable file size
     * @param bytes accepts number 
     */
    function humanFileSize(bytes) {
        var i = bytes == 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB'][i];
    };

    // make an element draggable
    function dragElement(elem) {
        var newPosX = 0,
            newPosY = 0,
            posX = 0,
            posY = 0;
        elem.onmousedown = dragMouseDown;

        /**
         * fired on mousedown event
         * @param  mousedown event e 
         */
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            posX = e.clientX;
            posY = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        /**
         * fired on drag
         * @param mousemove event e
         */
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            newPosX = posX - e.clientX;
            newPosY = posY - e.clientY;
            posX = e.clientX;
            posY = e.clientY;
            // set the element's new position:
            elem.style.top = (elem.offsetTop - newPosY) + "px";
            elem.style.left = (elem.offsetLeft - newPosX) + "px";
            (once(function () {
                elem.style.right = "auto";
            })());
        }
        /**
         * fired on mouseup
         * 
         * event handler cleanup
         */
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    /**
     * returns a function which will be executed only once
     * 
     * @param fn accepts function
     * @param context accepts this context
     */
    function once(fn, context) {
        var result;
        return function () {
            if (fn) {
                result = fn.apply(context || this, arguments);
                fn = null;
            }
            return result;
        }
    }
}());