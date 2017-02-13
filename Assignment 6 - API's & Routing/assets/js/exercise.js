console.log('loaded');
var request = new XMLHttpRequest();
var apiKey = '?api_key=76244b12adc0042d55a0f0f57905f0be';
var apiBaseUrl = 'https://api.themoviedb.org/3/';

request.open('GET', apiBaseUrl + 'movie/popular' + apiKey, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    console.log(data.results[0]);
  } else {
   console.log('error');
  }
};

request.onerror = function() {
 console.log('error');
};

request.send();
