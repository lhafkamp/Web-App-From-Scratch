/* Sources:
  - http://handlebarsjs.com/
  - http://projects.jga.me/routie/
*/

(() => {
  "use strict"
  const sections = document.querySelectorAll('section');
  const movieList = document.getElementsByClassName('movie_list')[0];
  const movieSingle = document.getElementsByClassName('movie_single')[0];

  const getData = {
    get(filter) {
      const request = new XMLHttpRequest();
      const apiKey = '?api_key=76244b12adc0042d55a0f0f57905f0be';
      const getUrl = `https://api.themoviedb.org/3/${filter}${apiKey}`;

      request.open('GET', getUrl , true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          let data = JSON.parse(request.responseText);
          cleanData.init(data);
        } else {
          window.location.hash = 'error';
        }
      };
      request.onerror = () => {
       console.log('Error');
      };
      request.send();
    }
  };

  const cleanData = {
    init(originalData) {
      console.log(originalData);
      if(!originalData.results) {
        this.cleanSingle(originalData);
      } else {
        this.cleanList(originalData);
      }
    },

    cleanList(data) {
      data.results.map(function(el) {
        el.backdrop_path = `https://image.tmdb.org/t/p/w500/${el.backdrop_path}`;
        el.id = `ID: ${el.id}`;
      });
      let attributes = { movie_image: { src: function() { return this.backdrop_path; }, alt: function() { return this.title; }}};
      showData.list(data.results, attributes);
    },

    cleanSingle(data) {
      data.backdrop_path = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
      let attributes = { movie_image: { src: function() { return this.backdrop_path; }, alt: function() { return this.title; }}};
      showData.single(data, attributes);
    }
  };

  const showData = {
    list(cleanedData, attributes) {
      Transparency.render(movieList, cleanedData, attributes);
    },

    single(cleanedData, attributes) {
      Transparency.render(movieSingle, cleanedData, attributes);
    }
  };

  routie({
    'trending': function() {
      getData.get('movie/popular');
    },
    'toplist': function() {
      getData.get('movie/top_rated');
    },
    'latest': function() {
      getData.get('movie/now_playing');
    },
    'upcoming': function() {
      getData.get('movie/upcoming');
    },
    'movie/:id': function(id) {
      getData.get(`movie/${id}`);
    }
  });


})();
