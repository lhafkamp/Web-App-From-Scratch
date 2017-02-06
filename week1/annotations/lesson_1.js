/* Annotations of the first Live Code session
----------------------------------------------------------------- */

"use strict";

/* Closure = function within function
   Context = What information is accesable in this scope
   Scope = Where can u acces specific information
   Iffe = A function that starts itself as soon as it is loaded / page is loaded */

var students = [
  {
    name: "Camille", // Property
    age: 23,
    smart: true,
    generateMyInfo: function() { // Method
      return generateStudentInfo([this.name, this.age]); // Only return the name and age to function
    }
  },
  {
    name: "John Doe",
    age: 20,
    smart: false
  },
];

function generateStudentInfo(infoArray) { // Function with parameter 'infoArray'
  for (var i in infoArray) { // Loop trough each item in array
    console.log('Infofield: ' + i + ' : ' + infoArray[i]); // I is the index
  }
};

generateStudentInfo(students[0]); // Print name student one
console.log(students[0].generateMyInfo()); // Call function in Object

// IFFE
(function() {
    /* All code inside is wraped in a function that calls itself.
       The code is not available in the global scope */
  }()
);
