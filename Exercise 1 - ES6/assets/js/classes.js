/* TEAM TREEHOUSE TUTORIAL ES6
https://teamtreehouse.com/library/getting-started-with-es2015

Note: Use babel to compile ES6 to ES5 for older browsers
https://teamtreehouse.com/library/introduction-to-babel
--------------------------------------------------- */

/* CLASSES
JS Classes are NOT hoisted, define classes at the top of scripts before other code uses it.
--------------------------------------------------- */
class Car {
  constructor( { model, miles, price = 1000 } = {  } ) {
    this.model = model;
    this.miles = miles;
    this.price = price;
    this.owners = new Map();
  }
}

let audi = new Car({ model: 'Audi A3', miles: 2500 });
let volkswagen = new Car({ model: 'volkswagen Golf', miles: 20477, price: 5000 });

audi.owners.set('First owner', 'Barack Obama');
audi.owners.set('Second owner', 'Camille Sébastien Niessen');

console.log(Array.from(audi.owners));

/* SUB-CLASSES
--------------------------------------------------- */
class Person {
  dance() {
    const dances = [
      'waltz',
      'tango',
      'mambo',
      'foxtrot'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  constructor({ name, age, eyeColor = 'brown' } = {}) { // Gets called when the new keyword is used
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {  // It now inherits the dance method of the Person class
  dance(traditional) {
    if(traditional) {
      const dances = [
        'technodance',
        'konijnendans',
        'tap',
        'ballet'
      ];
      console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
      super.dance();
      return;
    }
  }

  constructor({ name, age, interestLevel = 5 } = {} ) {
    super({ name, age }); // Call the superfunction: Calls the constructor function on Person (needs only name and age).
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student({ name: 'Steven', age: 22, interestLevel: 3 });
console.log(stevenJ.interestLevel);
stevenJ.dance(true); // Now has it own dances (traditional = true)
