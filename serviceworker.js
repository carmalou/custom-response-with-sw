self.oninstall = function() {
    caches.open('cache-response1').then(function(cache) {
        cache.addAll([
            '/',
            'index.html',
            'index.js'
        ])
        .then(function() {
            console.log('added files');
        })
        .catch(function(err) {
            console.log('err! ', err);
        })
    })
}

self.onactivate = function(event) {
    console.log('sw is up and running!');
}

// stack overflow on clone: https://stackoverflow.com/questions/37747332/response-whose-body-is-locked-cannot-be-used-to-respond-to-a-request
// mdn: https://developer.mozilla.org/en-US/docs/Web/API/Response/clone

self.onfetch = function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(async function(cachedFiles) {
            if(cachedFiles) {
                var rezToReturn =cachedFiles.clone();
                var tmp = await cachedFiles.text();
                console.log(cachedFiles);
                console.log(tmp);
                console.log(event.request);
                return rezToReturn;
            }
            // if(cachedFiles) {
            //     return cachedFiles;
            // } else {
            //     // I do a check here to make sure nothing from the app itself is being requested.
            //     // if something from the app were being requested -- like say the index.html page -- this would be returned instead and we don't want that.
            //     if(!event.request.url.includes(location.origin)) {
            //         var init = { "status" : 200 , "statusText" : "I am a custom service worker response!" };
            //         return new Response(null, init);
            //     }
            // }
        })
    )
}