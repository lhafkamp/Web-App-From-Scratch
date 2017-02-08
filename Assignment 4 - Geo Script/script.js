/* Assignment 4 - Refactoring CMDAan Geo Script
----------------------------------------------------------------- */
"use strict";

// Makes sure that variables aren't global
(function() {

  function EventTarget() {
      this._listeners = {}
  }
  EventTarget.prototype = {
      constructor: EventTarget,
      addListener: function(a, c) {
          "undefined" == typeof this._listeners[a] && (this._listeners[a] = []);
          this._listeners[a].push(c)
      },
      fire: function(a) {
          "string" == typeof a && (a = {
              type: a
          });
          a.target || (a.target = this);
          if (!a.type) throw Error("Event object missing 'type' property.");
          if (this._listeners[a.type] instanceof Array)
              for (var c = this._listeners[a.type], b = 0, d = c.length; b < d; b++) c[b].call(this, a)
      },
      removeListener: function(a, c) {
          if (this._listeners[a] instanceof Array)
              for (var b =
                      this._listeners[a], d = 0, e = b.length; d < e; d++)
                  if (b[d] === c) {
                      b.splice(d, 1);
                      break
                  }
      }
  };

  var ET = new EventTarget();

  // Array with all constant variables, stored in an array.
  var config = {
    sandbox: "SANDBOX",
    lineair: "LINEAIR",
    gpsAvailable: "GPS_AVAILABLE",
    gpsUnavailable: "GPS_UNAVAILABLE",
    positionUpdated: "POSITION_UPDATED",
    refreshRate: 1000,
    currentPosition: false,
    currentPositionMarker: false,
    customDebugging: false,
    debugId: false,
    map: false,
    interval: false,
    intervalCounter: false,
    updateMap: false,
    locationArray: [],
    markerArray: []
  }

  var locationModule = {
    // Test for GPS availability (in geo.js) and fire a event.
    init: function() {
      ET.addListener(config.gpsAvailable, startInterval);
      ET.addListener(config.gpsUnavailable, function() {
        debugMessage('GPS is not available.')
      });
      (geo_position_js.init()) ? ET.fire(config.gpsAvailable) : ET.fire(config.gpsUnavailable);
    },

    // Start interval which based on the refreshRate, updates the position
    startInterval: function(event) {
      debugMessage("GPS is available, asking for position.");
      updatePosition();
      config.interval = self.setInterval(updatePosition, config.refreshRate);
      ET.addListener(config.positionUpdated, checkLocations);
    },

    // Ask for the actual position in geo.js, initiate a callback for the result
    updatePosition: function() {
      config.intervalCounter++;
      geo_position_js.getCurrentPosition(setPosition, geoErrorHandler, {
        enableHighAccuracy: true
      });
    },

    // Callback function for initializing the actual position, fires a event.
    setPosition: function(position) {
      config.currentPosition = position
      ET.fire("config.positionUpdated");
      debugMessage(config.intervalCounter + " position lat: " + position.coords.latitude + " long: " + position.coords.longitude);
    },

    // Check the location and redirect to a different page when on location
    checkLocations: function(event) {
      for (var i = 0; i < locaties.length; i++) {
          var locatie = {
            coords: {
              latitude: locaties[i][3],
              longitude: locaties[i][4]
            }
          };
          if(calculateDistance(locatie, config.currentPosition) < locaties[i][2]) {
              // Check if we are on that location, if not were going to the page
              if(window.location != locaties[i][1] && localStorage[locaties[i][0]] == "false") {
                  // Try local storage, if it exists increment the location
                  try {
                      (localStorage[locaties[i][0]] == "false") ? localStorage[locaties[i][0]] = 1 : localStorage[locaties[i][0]]++;
                  } catch(error) {
                      debugMessage("Localstorage cant be reached: " + error);
                  }
                  // TODO: Animate the actual marker
                  window.location = locaties[i][1];
                  debugMessage("Player is within a range of " + locaties[i][2] + " meter of " + locaties[i][0]);
                }
              }
            }
      },

      // Calculate difference between two points in meters
      calculateDistance: function(p1, p2) {
        var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
        var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
      }
    };


  /** GOOGLE MAPS FUNCTIONS
      ---------------------
       * generateMap(myOptions, canvasId)
       * calls based on given options the google maps API
       * to generate a map and places this in the HTML element
       * thats indicated by the given ID
       *
       * @param myOptions:object - a object with configurable options
       *  for calling the google maps API
       * @param canvasID:string - the id of the HTML element where the
       *   map in pre-rendered moet worden, <div> of <canvas>
       */

   var gMapsModule = {
     generateMap: function(myOptions, canvasID) {
       // TODO: Can I call the maps API async? Less calls
       debugMessage("Generate a Google Maps maps and show this in #" + canvasId);
       config.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

       var routeList = [];
       // Add the markers to themap dependending on the tour type
       debugMessage("Locaties intekenen, tourtype is: " + tourType);
       for (var i = 0; i < locaties.length; i++) {
         try {
             (localStorage.visited == undefined || isNumber(localStorage.visited)) ? localStorage[locaties[i][0]] = false : null;
         } catch (error) {
             debugMessage("Localstorage can't be reached: " + error);
         }
         var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
         routeList.push(markerLatLng);

         config.markerArray[i] = {};
         for (var attr in locatieMarker) {
             config.markerArray[i][attr] = locatieMarker[attr];
         }
         markerArray[i].scale = locaties[i][2] / 3;

         var marker = new google.maps.Marker({
             position: markerLatLng,
             map: config.map,
             icon: config.markerArray[i],
             title: locaties[i][0]
         });
       }

       if(tourType == config.lineair){
           // Draw lines between the points
           debugMessage("Drawing route");
           var route = new google.maps.Polyline({
               clickable: false,
               map: config.map,
               path: routeList,
               strokeColor: 'Black',
               strokeOpacity: .6,
               strokeWeight: 3
           });
       }
       // Add the location of the user
       config.currentPositionMarker = new google.maps.Marker({
           position: kaartOpties.center,
           map: config.map,
           icon: positieMarker,
           title: 'U are here'
       });
       ET.addListener(config.positionUpdated, updatePositie);
     },

     isNumber: function(n) {
       return !isNaN(parseFloat(n)) && isFinite(n);
     },

     // Update the users position on the map
     updatePositie: function(event) {
       // use currentPosition to center the map
       var newPos = new google.maps.LatLng(config.currentPosition.coords.latitude, config.currentPosition.coords.longitude);
       config.map.setCenter(newPos);
       config.currentPositionMarker.setPosition(newPos);
     }
   };

   var debugModule = {
     geoErrorHandler: function(code, message) {
       debugMessage('geo.js error ' + code + ': ' + message);
     },

     debugMessage: function(message) {
       (config.customDebugging && config.debugId) ? document.getElementById(config.debugId).innerHTML : console.log(message);
     },

     setCustomDebugging: function(debugId) {
       config.debugId = this.debugId;
       config.customDebugging = true;
     }
   };
  }()
);

/* -------------------------------------------------------------- */

/*
Original Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
https://github.com/ju5tu5/cmdgeo/blob/master/src/cmdgeo-0.1.js

Code refactoring: Camille Sébastien Niessen
*/
