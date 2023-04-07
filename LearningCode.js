// "use strict";

// codeSnippet1
// function doSomething() {
//     return 'Beep';
// };

// doSomething.name = 'Tom';  // Property attributes of Function.name:- Writable: NO; Enumerable: NO; Configurable:Yes; 
// // ("name" property of a function is non-wrtable)
// doSomething.name2 = 'John';

// console.log('doSomething.name : ' + doSomething.name);
// console.log('doSomething.name2 : ' + doSomething.name2);
// console.log('doSomething() : ' + doSomething());
// console.log('doSomething.name : ' + doSomething.name);
// console.log('doSomething.name2 : ' + doSomething.name2);



// // codeSnipet2
// console.log(a); //undefined (no error)
// console.log(b); //ReferenceError: b is not defined
// var a = 24;
// window.b = 36;


// // codeSnipet
// function bcd() {
//     var i = 1;
//     for (var j = 0; j < 1; j++) {
//         i = i + 1;
//     }
//     // console.log('Inside function: var i = ' + i);
// }

// bcd.z = '12345';
// var p = new bcd();
// if (p.z === bcd.z) {
//     console.log('true');
// }
// else {
//     console.log('false');
// }

// // var q = new bcd();
// // console.log('p.z = ' + bcd.z);
// // console.log('q.z = ' + q.z);
// // q.z = '45678'
// // console.log('p.z = ' + p.z);
// // console.log('p.z = ' + q.z);



// // codeSnippet3
// function abc() {
//     this.y = 'Hello';
//     this.jkl = function () {
//         return 'ok';
//     }
//     // return 'Ankit';
// }

// abc.b = 11;
// var a = new abc();
// console.log(a.jkl());
// console.log(abc.b);
// console.log(a);


// // CodeSnippet4
// function abc() {
//     abc.i = 5;
//     this.z = 11;
//     // var i = 11;
//     // this.ghi = function () {
//     //     return i;
//     // }
//     // g = abc.i;
//     // console.log(abc.i);
// }

// abc.randomObject = {
//     ro: function () {
//         return this.z;
//     }
// };

// abc.call(abc.randomObject);
// console.log('Z of abc returning from randomObject:' + abc.randomObject.ro());

// abc.ghi = function () {
//     return this.i;
// }
// abc();
// console.log(abc.ghi());

// abc.prototype.d = "Hello !";
// abc.prototype.m = function () { };
// console.log(abc.d);
// // var jkl = {};
// // var jkl = {
// //     log: function () { }
// // }

// // Object.defineProperty(jkl, "log", { value: function () { } });

// abc.bcd = {}
// abc.bcd.jkl = abc;

// var ijk = new abc();
// // abc();
// ijk.bcd = function () {
//     return this.i;
// }

// ijk.random = abc.randomObject;
// console.log(ijk.bcd());
// // console.log(ijk.ghi());
// console.log(ijk.d);


// 'use strict'
// function abc(name2) {
//     var bgn = 11;
//     this.name2 = name2;
//     this.somefunction = function () {
//         console.log(`The name is: ${this.name2}`);
//         console.log(bgn);
//     }
// }

// var b = 'Hi !';
// const a = 'Hi !';
// // a = 2;
// const d = function () {
//     this.b = 'hello !';

// }
// d();
// console.log(b);

// var name2 = 'abc';
// var b = new abc('Joker');
// b.somefunction();

// const y = {
//     name4: 'Batman',
//     anotherFunction() {
//         console.log(`Here the name is: ${this.name4}`);
//     }
// }

// var d = b.somefunction;
// d();

// const j = y.anotherFunction;
// j();


// function promiseM(mainCalback) {
//     mainCalback(function resolve() {

//     }, function reject() {

//     })
//     this.thenM = function (resultCallback) {

//         return this;
//     }
//     this.catchM = function (errorCallback) {

//         return this;
//     }
// }



// var arr = ['a', 'b', 'c', 'd', 1, 2, 3, 4];
// console.log(arr.splice(-5, 2));




// function abc(object, options, callback) {

//     if (typeof options === 'function') {
//         callback = options;
//         options = undefined;
//     } else if (options !== undefined) {
//         console.log('from abc: ', options);
//     }

//     if (callback !== undefined) {
//         callback(undefined, "It's a success !! " + JSON.stringify(object));
//     }
// }

// abc({ jhk: 'abcd' }, function (err, result) {
//     console.log(result);
// });




// function iokj(hijk) {
//     this.abcd = hijk;
//     this.amn = function () {
//         var j;
//     }
// }

// iokj.prototype.iokjFunc = function () {

// }

// new iokj('Hello');

// class iokjTwo {
//     constructor(hijk) {
//         this.abcd = hijk;
//         this.amn = function () {
//             var j;
//         }
//     }

//     iokjTwoFunc() {

//     }
// }




// inheritence in javascript using es6
// class ujm {
//     // constructor(args) {
//     //     // this.iop = args;
//     //     this.iop = 'ujm iop';
//     //     // console.log('constuctor this: ', this);

//     //     // function uig() {
//     //     //     console.log('uig this: ', this);
//     //     // }

//     //     // uig();
//     // }

//     someFunc = () => {
//         console.log('inside someFunction class here !!', this);
//     };

//     anotherFunc() {
//         this.someFunc();
//     }
// }


// class nhg extends ujm {
//     constructor(args) {
//         // console.log(arguments[0]);
//         // super(...arguments);
//         super();
//         this.uio = args;
//     }

//     // render() {  // Testing something for React
//     //     return <p>Namaste !!</p>
//     // }
// }




// inheritence in javascript using es5
function ujm(params) {
    this.iop = params;
    console.log('ujm this: ', this);

    function uig() {
        console.log('uig this: ', this);
    }

    uig();
}

ujm.prototype.someFunc = () => {
    console.log('inside someFunction !!');
    console.log(this.iop);
}

ujm.prototype.isComponent = 'It is a component !'; // Testing something for React.. Note: A transpiled code probably wouldn't have such a property

function nhg(params) {
    ujm.call(this, params);
    this.uio = params;
    this.uio = this.params; // how this.props works inside constructor in react
    console.log(params);
}

// nhg.prototype = Object.create(ujm.prototype); // These (this and the one below) two statements have to
// nhg.prototype.constructor = nhg; // be used in conjunction with each other
nhg.prototype.__proto__ = ujm.prototype;

nhg.__proto__ = ujm;

// if (nhg.prototype.isComponent) {  // Testing something for React
//     new nhg('Hello hai !!').render();
// } else {
//     nhg('Hello ji !!');
// }

if (nhg.prototype instanceof ujm) { // Testing something for React 
    new nhg('Hello, Spiderman !!');
}
else {
    nhg('Namaste !!');
}

// nhg();
var vkb = new nhg('Hello !!');
vkb.someFunc();

// new ujm().someFunc();
// var ujmObj = new ujm();
// var someAnother = ujmObj.anotherFunc;
// someAnother.call(ujmObj);




// {   // This block is not to be confused with object literal
//     var abc = 'Hello there!'   // rather, it is just a block defined by curly braces
// }

// function fjg() {
//     console.log(abc);
// }

// fjg()



// var name = 'Peter';
// function greet() {
//     var greeting = 'Hello';
//     {
//         var lang = 'English';
//         console.log(`${lang}: ${greeting} ${name}`);
//     }
//     lang;

// }
// greet();




// var i = 0;
//     function actionL() {
//         i = i + 1;
//         console.log('clicked !!', i);
//     }

//     var nmo;
//     setTimeout(() => {
//         // nmo = actionL;
//         actionL = null;
//         console.log('nullified')
//     }, 5000);

//     document.addEventListener('click', actionL);

//     setTimeout(() => {
//         actionL = null;
//     }, 5000);

//     setTimeout(() => {
//         console.log('Automatic invokation ');
//         // nmo();
//         actionL();
//     }, 11000);

//     actionL();
//     actionL();


// var propertyJi = 'ValueHaiJi';

// var ObjectJi = {
//     propertyJi: 'valueJi',
//     functionJi: () => {
//         console.log('ObjectJi propertyJi ', this.propertyJi);
//     }

//     // functionJi: function () {
//     //     console.log('ObjectJi propertyJi ', this.propertyJi);
//     // }

// }

// ObjectJi.functionJi();


// function hgj() {
//     this.fgi = 'fkgj';
//     this.jgi = () => {
//         console.log(this.fgi);
//     }

//     function withoutArrow() {
//         console.log('withoutArrow: ', this);
//     }

//     var withArrow = () => {
//         console.log('withArrow: ', this);
//     }

//     withoutArrow();
//     withArrow();

// }

// new hgj().jgi();

function abcd() {
    // console.log(abc);
}

abcd.ghi = function () { }

// function NotArray(len) {
//     console.log("NotArray called with length", len);
// }

// Array.of.call(function NotArray(len) {
//     console.log("NotArray called with length", len);
// }, 1, 2, 3);

// const ArrName = 'optionArr';
// const defaultProps = {
//     // ArrName: 'optionArr',
//     [ArrName]: []
// }


