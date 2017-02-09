(function() {
  "use strict";
  var allSections = document.querySelectorAll('section');

  var app = {
    init: function() {
      // First make sure that only the intro page is visible
      allSections.forEach(function(section) {
        if('#' + section.id != "#introduction") {
          section.classList.add('hidden');
        }
      });
      routes.init();
    }
  };

  var routes = {
    init: function() {
      window.onhashchange = function() {
        sections.toggle();
      }
    }
  };

  var sections = {
    toggle: function() {
      // Toggle old hash to display none, the new one to display block
      allSections.forEach(function(section) {
        if('#' + section.id === window.location.hash) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    }
  };

  // Start app.init function
  app.init();

  }()
);

/* Sources:

- http://www.w3schools.com/jsref/event_onhashchange.asp
- Idea for the forEach loop from Dave Bitter
- Pull request edits by Timo Verkroost & Colin Dorr

*/
