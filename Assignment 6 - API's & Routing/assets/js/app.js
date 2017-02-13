/* Sources:

*/

(() => {
  "use strict"

  const getData = {
    init(filter) {
      const request = new XMLHttpRequest()
      const apiKey = '?api_key=76244b12adc0042d55a0f0f57905f0be'
      const getUrl = `https://api.themoviedb.org/3/movie/${filter}${apiKey}`

      request.open('GET', getUrl , true)
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          let data = JSON.parse(request.responseText)
          console.log(data)
        } else {
         console.log('There is no data to display')
        }
      };
      request.onerror = () => {
       console.log('error')
      };
      request.send()
    }
  }

  routie('popular', function() {
    getData.init('popular')
  })

  routie('top_rated', function() {
    getData.init('top_rated')
  })

})()
