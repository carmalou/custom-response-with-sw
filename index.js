function fetchFayePI() {
    return window.fetch('https://fayepi.herokuapp.com/romcoms')
    .then(function(response) {
        console.log('index line4: ', response);
        document.getElementById('contents').appendChild(document.createTextNode(response.statusText));
        return;
    })
    .catch(function(err) {
        console.log('err! ', err);
    });
}

fetchFayePI();

if(navigator.serviceWorker) {
    navigator.serviceWorker.register('./serviceworker.js')
    .catch(function(err) {
        console.log('err ', err);
    });
}
