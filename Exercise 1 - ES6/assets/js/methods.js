/* TEAM TREEHOUSE TUTORIAL ES6
https://teamtreehouse.com/library/getting-started-with-es2015

Note: Use babel to compile ES6 to ES5 for older browsers
https://teamtreehouse.com/library/introduction-to-babel
--------------------------------------------------- */

/* STATIC METHODS
--------------------------------------------------- */class Bird {
  static changeColor(bird, color) {
    bird.color = color;
  }
  constructor({ color = 'red' } = {}) {
    this.color = color;
  }
}

let redBird = new Bird;
console.log(redBird.color);
Bird.changeColor(redBird, 'blue'); // Changes the birds color
console.log(redBird.color);

/* GETTERS AND SETTERS
    - Getter = function with no parameters, that must return a value.
--------------------------------------------------- */
class Student {

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  set name(input) {
    let name = input.split(' '); // Splits first- and lastname
    this.firstName = name[0];
    this.lastName = name[1];
  }

  constructor({ firstName, lastName, age, interestLevel = 5 } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let stevenJ = new Student({ firstName: 'Steven', lastName: 'Jones', age: 25 });
console.log(stevenJ.name);
stevenJ.name = ('Camille Sébastien'); // Name is changed using the set function.
console.log(stevenJ.name);
