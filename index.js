function fetchFayePI() {
    return window.fetch('https://fayepi.herokuapp.com/romcoms')
    .then(function(response) {
        return response.json()
    })
    .then(function(actualRez) {
        var ul = document.createElement('ol');
        for(var i = 0; i < actualRez.length; i++) {
            var tmp = generateList(actualRez[i]);
            ul.appendChild(tmp);
        }

        document.getElementById('contents').appendChild(ul);
    })
    .catch(function(err) {
        console.log('err! ', err);
    });
}

function generateList(movie) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(movie.movie_title));
    return li;
}

fetchFayePI();

if(navigator.serviceWorker) {
    navigator.serviceWorker.register('./serviceworker.js')
    .catch(function(err) {
        console.log('err ', err);
    });
}
