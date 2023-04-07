// PS1='\[\033[01;32m\]\u\[\033[00m\]:\[\033[01;34m\]\W\[\033[00m\]\$ ' //VSCode intergrated terminal prompt shorten command

// //Snippet 1
// var person = {
//     firstname: 'Default',
//     lastname: 'Default',
//     getFullName: function() {
//         return this.firstname;
//     }    
// };

// var john = {
//     firstname: 'John',
//     lastname:  'Doe'
// };

// john.prototype = 'bhadiya hai !'; 

// console.log(john);
// // console.log(john.getFullName());
// console.log(john.firstname);


// Snippet 2
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

function Car(name, model, year) {
  this.name = name;
  this.model = model;
  this.year = year;
  stereo1 = 'JBL';
  // this.owner = owner;
  this.login = function (a, b) {
    return a + b;
  }
  return {
    ankit: function (a, b) {
      return a + b;
    }
  }
  // return this;
}

// Car.ankit = function (a, b) {
//   return a + b;
// }

stereoDJ = 'Radio';
// Car().stereo2 = 'Boat';
Car.stereo = 'Bose';

function randomFunction() {         //TODO: learn hoisting and relate to this example.. how this.randomTwo is working
  this.randomTwo = function () {
    console.log("Inside randomTwo");
  }
  var a = 5;
}

if (Car.stereo == Window.stereo) {
  console.log('True');
}
else {
  console.log('false');
}

// Car.prototype.Person = function (name, age, sex) {
//   this.name = name;
//   this.age = age;
//   this.sex = sex;
// };
// Car.prototype.model = 'classic';

// var car1 = new Car('Eagle', 'Talon TSi', 1993);
// var car2 = new Car('Nissan', '300ZX', 1992, ken);
// var rand = new Person('Rand McNally', 34, 'M');
// var ken = new Person('Ken Jones', 39, 'M');  

// car1.__proto__= rand;
// console.log(car1.Person('Rand McNally', 34, 'M'));
// console.log(car1);
Car.z = 5;
var car1 = new Car('Eagle', 'Talon TSi', 1993);
// console.log("Hi5!");
// console.log(randomFunction());
new randomFunction().randomTwo();
// console.log(Array);
console.log(car1.name);
console.log(Car.stereo);
console.log(window.stereo1);
// console.log(Car().stereo2);
console.log(Car().ankit(5, 7));
console.log(window.stereoDJ);


// //Snippet 3
// var A = function(n,m){
//   // return function(p){
//   //   return p+n+m; 
//   // };
//   this.name = 'James Bond';
//   console.log('The name is Bond..' +this.name);
// };

// // var B = A(2,8);
// // console.log(B);
// // console.log(B(11));
// console.log(A(1,2));
// console.log(new A(1,2));



// //Snippet 4
// var Harry = {
//   Ron: 'Friend',
//   Hermoine: 'FriendGirl'
// }; 

// Harry['Ginni'] = 'GirlFriend';
// console.log(Harry);