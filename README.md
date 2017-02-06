# Web-App-From-Scratch

## Annotations Lesson 1 (06-02-2017)

* **The scope:** Where you can access specific information.
* **The context:** What information is available in the scope.

### Object with Method
```javascript
  var students = [
    {
      name: "Camille", // Name property
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
```

### Function with for loop
```javascript
  function generateStudentInfo(infoArray) { // Function with parameter 'infoArray'
    for (var i in infoArray) { // Loop trough each item in array
      console.log('Infofield: ' + i + ' : ' + infoArray[i]); // I is the index
    }
  };
```

### IFFE
```javascript
  (function() {
      /* All the code inside is wrapped in a function that calls itself.
         The code is not available in the global scope. */
    }()
  );
```
