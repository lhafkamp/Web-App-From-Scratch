/* TEAM TREEHOUSE TUTORIAL ES6
https://teamtreehouse.com/library/getting-started-with-es2015

Note: Use babel to compile ES6 to ES5 for older browsers
https://teamtreehouse.com/library/introduction-to-babel
--------------------------------------------------- */

/* VARIABLES
--------------------------------------------------- */
let i = 0; // The let variable is only available in block-scope. It's contents are not constant.
// Use let when you need to reassign a variable, or scope a variable at block level.

const apiKey = "adjds1fdjx2jh72"; // The const variable can't be overwritten.
const student = {
  name: "Camille",
  age: 23
}
 // const student = "hello"; is not possible, because the variable was already defined in this scope.
 student.name = "Camille Sébastien"; // The properties can be changed though.
 // Use const when you don't want a variable's value to change throughout your project

 /* STRINGS
 --------------------------------------------------- */
 let string = `Hallo, mijn naam is ${student.name}. Ik ben ${student.age} jaar oud`;  // String begins with ` (backtick), var values can be concatted using ${varname}

console.log('String search methods:')
console.log(string.startsWith('Hallo')); // Checks if the string starts with 'Hallo', in this case TRUE will be returned
console.log(string.startsWith('Hallo', 2)); // Checks if the word 'Hallo' begins from the 3rd character, in this case False
console.log(string.endsWith('oud')); // Checks if the string ends with 'oud', in this case TRUE will be returned
console.log(string.endsWith('oud', 20)); // Checks only 20 characters, and thus if 'oud' is at the last 3 of the 20 characters, in this case False
console.log(string.includes('Ik ben')); // Checks if 'Ik ben' is included inside the string, in this case TRUE.
console.log('------------------------------');

/* ARROW FUNCTIONS
--------------------------------------------------- */
console.log('Arrow functions:')
// No argument
const sayHi = () => {
  console.log('Hi.');
}

// Single argument
const greetStudent = name => console.log(`Hi ${name}.`)  // You don't need the return keyword & no { } if it's a single line function

// Multiple arguments
const logStudentInfo = (name, age) => {
  console.log(`${name} is ${age} jaar oud.`)
}

sayHi();
greetStudent('Camillos');
logStudentInfo(student.name, student.age);
console.log('------------------------------');

/* CONSTRUCTOR FUNCTIONS
--------------------------------------------------- */
// console.log('Constructor functions:')
//
// let Car = data => {
//   this.model = data.model;
//   this.miles = data.miles;
// }
//
// let audi = new Car({model: 'Audi A3', miles: 2500}); // Creates an new car via the constructor function
//
// console.log('------------------------------');

/* DEFAULT PARAMETERS
--------------------------------------------------- */
console.log('Default parameters:')
const logPrice = (price = 22) => { // If 'price' is undefined, the default value of 'price' will be 22.
  console.log(`The item costs €${price},-`);
}

logPrice();
logPrice(66);
console.log('------------------------------');

/* REST PARAMETERS AND SPREAD OPERATOR
--------------------------------------------------- */
console.log('Rest Parameters and Spread Operator:')

// Rest parameters
const restParam = (message, ...rest) => { // All arguments, except message, will be put inside an array
  console.log(message, rest);
}

// Spread Operator
const studentNames = ['Camille', 'Piet', 'Jan'];
const invitedPeople = ['Hans', 'Kevin', ...studentNames];  // Add's the studentNames array to the invitedPeople array

const whatDoYouLike = (name, flavour) => { console.log(`${name} houd van ${flavour} ijs.`) }

console.log(invitedPeople);

const iLike = ['Camille Sébastien', 'aardbei']

restParam('Hola you!', 'rest-param1', 'rest-param2');
whatDoYouLike(...iLike); // Sends the array as seperate arguments.
console.log('------------------------------');

/* DESTRUCTURING
--------------------------------------------------- */
console.log('Destructuring:')

// Destructuring an object
let toybox = { item1: 'car', item2: 'ball', item3: 'frisbee'};
let {item1, item2} = toybox; // Now item 1 & item 2 are 'destructed', and stored in variable 'item1' & 'item2'. 'item3' is not stored as variable
let {item1: present} = toybox; // 'item1' is now stored in the variable present.

console.log(toybox);
console.log(item1, item2);
console.log(present);

// Destructuring an array
let inStock = ['Apples', 'Potatos', 'Beer', 'Candy', 'Chocolate'];
let [healthy, alcohol, ...sugar] = inStock; // Sugar is stored with the last 2 values of the array

let parentObject = {
  title: 'Super important',
  childObject: {
    title: 'Equally Important'
  }
}

let { title, childObject: { title: childTitle } } = parentObject;  // Save the title of the childObject in variable childTitle

console.log(healthy, alcohol, sugar);
console.log(childTitle);

console.log('------------------------------');

/* OBJECT PROPERTY SHORTHAND
--------------------------------------------------- */
console.log('Object propery shorthand:')

const submitRating = (name, comments, rating = 5) => {
  let data = {name, comments, rating}; // Shorthand for object properties
  for (let key in data) {
    console.log(key + ': ', data[key]);
  }
}

const logAllRatings = () => {
  const ratings = [
    { name: 'Kevin', comment: 'Awesome!', rate: 8},
    { name: 'Camille', comment: 'Whuuut..!', rate: 6},
    { name: 'Anna', comment: 'Great movie!', rate: 9},
    { name: 'Tim', comment: 'Super wauw!', rate: 7}
  ];

  for (let rating of ratings) {    // It doesn't loop over all instances now, but quits if its conditions are met.
    if(rating.name === 'Camille') {
      console.log(rating.rate);
      break; // Code stops here as soon as 'Camille' rating is found.
    }
  }
}

submitRating('Camille', 'Nice Movie', 4);
logAllRatings();
console.log('------------------------------');

/* SET
--------------------------------------------------- */
console.log('Set:')

let classroom = new Set();  // new Set object

let stevenJ = { name: 'Steven', age: 22 },
    sarah = { name: 'Sarah', age: 25 };

classroom.add(stevenJ); // adds steven to the classroom object
classroom.add(sarah);

if(classroom.has(stevenJ)) console.log('StevenJ is present');  // .has checks if stevenJ is added to classroom. (TRUE)
console.log('Classroom size:', classroom.size); // Returns total amount of objects stored in the set object

classroom.delete(stevenJ); // Deletes stevenJ from the Set object
console.log('Classroom size:', classroom.size);

let arrayOfStudents = Array.from(classroom);
console.log(arrayOfStudents);

let alumni = new Set(arrayOfStudents); // Creates an Set object from the array
console.log(alumni);

console.log('------------------------------');

/* MAP
--------------------------------------------------- */
console.log('Map:')

var secondClassroom = new Map();
secondClassroom.set('stevenJ', stevenJ);
secondClassroom.set('sarah', sarah);
console.log(secondClassroom.size);

if(secondClassroom.has('stevenJ')) console.log('Steven J is insidee!');
console.log('Sarah:', secondClassroom.get('sarah'));

for (let student of secondClassroom) {
  console.log(`'${student[0]}': ${student[1].name} is ${student[1].age} years old.`);
}

console.log(secondClassroom.values);

secondClassroom.clear() // Empties the object

console.log('------------------------------');
