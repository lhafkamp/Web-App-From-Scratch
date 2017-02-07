/* Assignment 4 - Refactoring CMDAan Geo Script
----------------------------------------------------------------- */
"use strict";

// Makes sure that variables aren't global
(function() {

  // Array with all constant variables, stored in an array.
  var varArray = {

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

      ET.addListener(varArray.gpsAvailable, _start_interval);
      ET.addListener(varArray.gpsUnavailable, function() {
        debug_message('GPS is not available.')
      });

      (geo_position_js.init()) ? ET.fire(varArray.gpsAvailable) : ET.fire(varArray.gpsUnavailable);

    },

    // Start interval which based on the refreshRate, updates the position
    _start_interval: function(event) {

      debug_message("GPS is available, asking for position.");
      _update_position();
      varArray.interval = self.setInterval(_update_position, varArray.refreshRate);
      ET.addListener(varArray.positionUpdated, _check_locations);

    },

    // Ask for the actual position in geo.js, initiate a callback for the result
    _update_position: function() {

      varArray.intervalCounter++;
      geo_position_js.getCurrentPosition(_set_position, _geo_error_handler, {
        enableHighAccuracy: true
      });

    },

    // Callback function for initializing the actual position, fires a event.
    _set_position: function(position) {

      varArray.currentPosition = position
      ET.fire("varArray.positionUpdated");
      debug_message(varArray.intervalCounter + " position lat: " + position.coords.latitude + " long: " + position.coords.longitude);

    },

    // Check the location and redirect to a different page when on location
    _check_locations: function(event) {

      for (var i = 0; i < locaties.length; i++) {
          var locatie = {
            coords: {
              latitude: locaties[i][3],
              longitude: locaties[i][4]
            }
          };

          if(_calculate_distance(locatie, varArray.currentPosition) < locaties[i][2]) {
              // Check if we are on that location, if not were going to the page
              if(window.location != locaties[i][1] && localStorage[locaties[i][0]] == "false") {
                  // Try local storage, if it exists increment the location
                  try {
                      (localStorage[locaties[i][0]] == "false") ? localStorage[locaties[i][0]] = 1 : localStorage[locaties[i][0]]++;
                  } catch(error) {
                      debug_message("Localstorage cant be reached: " + error);
                  }
                  // TODO: Animate the actual marker
                  window.location = locaties[i][1];
                  debug_message("Player is within a range of " + locaties[i][2] + " meter of " + locaties[i][0]);

                }
              }
            }

      },

      // Calculate difference between two points in meters
      _calculate_distance: function(p1, p2) {

        var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
        var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
        return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);

      }
    };


  /** GOOGLE MAPS FUNCTIONS
      ---------------------
       * generate_map(myOptions, canvasId)
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

     generate_map: function(myOptions, canvasID) {
       // TODO: Can I call the maps API async? Less calls
       debug_message("Generate a Google Maps maps and show this in #" + canvasId);
       varArray.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

       var routeList = [];
       // Add the markers to themap dependending on the tour type
       

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




function generate_map(myOptions, canvasId){

    var routeList = [];
    // Voeg de markers toe aan de map afhankelijk van het tourtype
    debug_message("Locaties intekenen, tourtype is: "+tourType);
    for (var i = 0; i < locaties.length; i++) {

        // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
        try {
            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
        } catch (error) {
            debug_message("Localstorage kan niet aangesproken worden: "+error);
        }

        var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
        routeList.push(markerLatLng);

        markerRij[i] = {};
        for (var attr in locatieMarker) {
            markerRij[i][attr] = locatieMarker[attr];
        }
        markerRij[i].scale = locaties[i][2]/3;

        var marker = new google.maps.Marker({
            position: markerLatLng,
            map: map,
            icon: markerRij[i],
            title: locaties[i][0]
        });
    }
// TODO: Kleur aanpassen op het huidige punt van de tour
    if(tourType == LINEAIR){
        // Trek lijnen tussen de punten
        debug_message("Route intekenen");
        var route = new google.maps.Polyline({
            clickable: false,
            map: map,
            path: routeList,
            strokeColor: 'Black',
            strokeOpacity: .6,
            strokeWeight: 3
        });

    }

    // Voeg de locatie van de persoon door
    currentPositionMarker = new google.maps.Marker({
        position: kaartOpties.center,
        map: map,
        icon: positieMarker,
        title: 'U bevindt zich hier'
    });

    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
    ET.addListener(POSITION_UPDATED, update_positie);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Update de positie van de gebruiker op de kaart
function update_positie(event){
    // use currentPosition to center the map
    var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
    map.setCenter(newPos);
    currentPositionMarker.setPosition(newPos);
}

// FUNCTIES VOOR DEBUGGING

function _geo_error_handler(code, message) {
    debug_message('geo.js error '+code+': '+message);
}
function debug_message(message){
    (customDebugging && debugId)?document.getElementById(debugId).innerHTML:console.log(message);
}
function set_custom_debugging(debugId){
    debugId = this.debugId;
    customDebugging = true;
}



// Event functies - bron: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/ Copyright (c) 2010 Nicholas C. Zakas. All rights reserved. MIT License
// Gebruik: ET.addListener('foo', handleEvent); ET.fire('event_name'); ET.removeListener('foo', handleEvent);
function EventTarget(){this._listeners={}}
EventTarget.prototype={constructor:EventTarget,addListener:function(a,c){"undefined"==typeof this._listeners[a]&&(this._listeners[a]=[]);this._listeners[a].push(c)},fire:function(a){"string"==typeof a&&(a={type:a});a.target||(a.target=this);if(!a.type)throw Error("Event object missing 'type' property.");if(this._listeners[a.type]instanceof Array)for(var c=this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a)},removeListener:function(a,c){if(this._listeners[a]instanceof Array)for(var b=
this._listeners[a],d=0,e=b.length;d<e;d++)if(b[d]===c){b.splice(d,1);break}}}; var ET = new EventTarget();
