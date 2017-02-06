# Web-App-From-Scratch
This readme contains all documentation and annotations made during the course.

## Annotations lesson 1 - 06/02/2017

This are the annotations of the first lesson Web App From Scratch. The annotations are part of the live coding example in class: http://codepen.io/Razpudding/pen/XpBbXa?editors=1010

### Objects and methods

- An **object** is an unordered list of primitive data types (numbers, strings, booleans, undefined, null). Each item in the unordered list is called a **property**.

```javascript
    var student = {
        name: "Camille",
        age: 23  
    }
```

- It is also possible to make an **array of objects**:
```javascript
    var students = [
        {
            name: "Camille",
            age: 23  
        },
        {
            name: "John Doe",
            age: 27
        }
    ];
```

- A **method** is a **function inside an object**.
```javascript
var student = {
    name: "Camille",
    age: 23,
    smart: true,
    generateMyInfo: function() {
      return generateStudentInfo([this.name, this.age]);
    }
  }

  // This is how u can call the method:
  student.generateStudentInfo();
```

- After calling the method (see above), a function outside of the object is called. It has two **arguments**: The name and age of the student.

- The function below has a **parameter** called 'infoArray'. It stores the arguments given in the example above as array. The **For Loop** loops trough all the items in that array.

```javascript
function generateStudentInfo(infoArray) {
  for (var i in infoArray) {
    console.log('Infofield: ' + i + ' : ' + infoArray[i]);
  }
};
```

### This and Strict Mode

- Using **Strict mode**, your code will be validated in a more strict way than normal. It makes it impossible to use a variable with the same name multiple times for example. It can be placed on the first line of your code.

```javascript
"use strict";
```

- The **this** keyword can (for example) be used in a function. When 'this' is used inside a function, it contains information given to that function.

## Sources
- http://javascriptissexy.com/16-javascript-concepts-you-must-know-well/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
