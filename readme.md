Why? : I have to download the file if I want to check the size so I wanted to simplify this using chrome extension. 
How?

Wanted to create a chrome extension that shows size of JavaScript without downloading.

So I started reading articles on creating chrome extension, difference between content scripts and background scripts and then overview of extension from developer.chrome.com/extensions.

Directly tried making an AJAX HEAD request to get content-length response header which will give you the size of the resource without actually downloading.
This is redundant because browser already fetching the JS. 
If we can intercept the browser request and read the response we can easily calculate the size

There is webRequest API which allows to intercept requests made by webpage. However, this API currently do not support reading response.

checking the content of body and measuring the length of the pre tag since browsers formats json/js/css in pre tags

I'm able to log the file size for URLs ending with .js (js URLS)
I've used content script to calculate the size of loaded css/js/json

Planning to extend this addon for additional files like IMG

Previously I've used contenscript which runs when the document start and because of this I had to wrap js in DOMContentLoaded event but after going through https://developer.chrome.com/extensions/content_scripts
I started using document_idle for run_at which means our content script will run before browser fires load event so no need of wrapping js in DOMContentLoaded

Now next step is to set the size as badge text for which I need to use background script as below:
calculate the size in content script
create a message and send the size to background.js(since content script doens't have access to all the APIs)
in background.js listen for the event and set the badgeText based on the recieved data

I'm done with setting badgeText however there is an issue with this.

this badgeText is updating across chrome in all tabs. 
so even I switch tabs it is showing the previously set badgeText

For this we need to pass optional tabId to setBadgeText method

Insteadof passing badge now I'm ussing content script to inject htmland css to site itself

testing urls:
https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.2/angular.js
https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js
https://code.angularjs.org/1.7.5/angular.js
https://raw.githubusercontent.com/googlearchive/IMD/master/imd.js
https://code.jquery.com/jquery.min.js