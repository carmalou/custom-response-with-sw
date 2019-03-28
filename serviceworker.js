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

// noticing that both the request and response have the originally requested URL. maybe that + a combination of header info is how the request <-> response is matched up??

// response.clone

// caches.put??

self.onfetch = function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(cachedFiles) {
            if(cachedFiles) {
                return cachedFiles;
            } else {
                fetch(event.request)
                .then(function(response) {
                    caches.open('cache-response1')
                    .then(function(cache) {
                        var clone = response.clone();
                        return cache.add(clone);
                    })
                    .then(function() {
                        return response;
                    })
                    .catch(function(err) {
                        console.log('err! ', err);
                    })
                })


                // var returnRez = newRez.clone();

                // var cache = await caches.open('cache-response1');

                // console.log(cache);
                // // await cache.add(newRez);

                // return returnRez;
            }
        })
    )
}