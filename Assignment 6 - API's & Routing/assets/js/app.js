/* Sources:
  - http://handlebarsjs.com/
  - http://projects.jga.me/routie/
  - http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
*/

(() => {
  "use strict"
  const sections = document.querySelectorAll('section');
  const movieList = document.getElementsByClassName('movie_list')[0];
  const movieSingle = document.getElementsByClassName('movie_single')[0];

  const App = {

  }

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
      });
      let attributes = { movie_image: { src: function() { return this.backdrop_path; }, alt: function() { return this.title; }},
                         title_url: { href: function() { return `#movie/${this.id}`; }}};
      showData.list(data.results, attributes);
    },

    cleanSingle(data) {
      data.poster_path = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      data.budget = this.formatCurrency(data.budget);
      data.imdb_id = `http://www.imdb.com/title/${data.imdb_id}`;
      let attributes = { movie_image: { src: function() { return this.poster_path; }, alt: function() { return this.title; }},
                         imdb_url: { href: function() { return this.imdb_id }}};
      showData.single(data, attributes);
    },

    formatCurrency(amount) {
      amount = amount.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
      });
      return `€${amount},-`;
    }
  };

  const showData = {
    list(cleanedData, attributes) {
      sections[1].classList.remove('hidden');
      sections[2].classList.add('hidden');
      Transparency.render(movieList, cleanedData, attributes);
    },

    single(cleanedData, attributes) {
      sections[2].classList.remove('hidden');
      sections[1].classList.add('hidden');
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
