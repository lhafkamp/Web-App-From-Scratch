(function() {
  "use strict";

  var app = {
    init: function() {
      routes.init();
    }
  };

  var routes = {
    init: function() {
      // Object that stores all location data
      var oldHash = window.location.hash;
      var newHash = oldHash;
      if(!newHash) {
        newHash = "#introduction";
      }
      // Check for changes in hash, then run this function
      window.onhashchange = function() {
        oldHash = newHash;
        newHash = window.location.hash;
        var route = {
          old: oldHash,
          new: newHash
        };
        // Send hash data to the sections toggle function.
        sections.toggle(route);
      }
    }
  };

  var sections = {
    toggle: function(route) {
      // Toggle old hash to display none, the new one to display block
      var oldView = document.querySelector(route.old);
      var newView = document.querySelector(route.new);
      oldView.classList.add('hidden');
      newView.classList.remove('hidden');
    }
  };

  // Start app.init function
  app.init();

  }()
);
