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

    if(event.request.method == 'GET') {
        return this.fetch(event.request.url)
        .then(function(response) {
            console.log(response);
            return response.json()
        })
        .then(function(jsonRez) {
            console.log(jsonRez);
        })
        .catch(function(err) {
            console.log('err! ', err);
        });
    }
}