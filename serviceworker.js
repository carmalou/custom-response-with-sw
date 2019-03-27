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

self.onfetch = function(event) {
    console.log('event ', event);

    if(!event.request.url.includes(location.origin)) {
        var init = { "status" : 200 , "statusText" : "sucks to be you!" };
        var myResponse = new Response(null,init);
        event.respondWith(myResponse);
    }

    // function test() {
    //     if(event.request.method == 'GET') {
    //         fetch(event.request.url)
    //         .then(function(response) {
    //             console.log(response);
    //             return response.json()
    //         })
    //         .then(function(jsonRez) {
    //             console.log(jsonRez);
    //             var init = { "status" : 200 , "statusText" : "sucks to be you!" };
    //             var myResponse = new Response(null,init);
                
    //             event.respondWith(myResponse);
    //         })
    //         .catch(function(err) {
    //             console.log('err! ', err);
    //         });
    //     }
    // }
}