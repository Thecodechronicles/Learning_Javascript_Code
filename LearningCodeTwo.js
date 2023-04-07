// 'use strict';

// function abc(name2) {
//     abc.i = 5;
//     this.z = name2;
//     // var i = 11;
//     // this.ghi = function () {
//     //     return i;
//     // }
//     // g = abc.i;
//     // console.log(abc.i);
//     console.log('abc');
//     console.log(this);
// }

// abc();

// abc.randomObject = {
//     ro: function () {
//         console.log('randomObject');
//         console.log(this.name2);
//     }
// };

// abc.call(abc.randomObject);
// // console.log('after calling call..')
// // console.log(abc.randomObject);
// // abc();

// var p = new abc('Batman');
// p.random = abc.randomObject;
// p.random.ro();

// // function ghi() {
// //     jkl();
// // }

// // ghi();

// console.log(function () {
//     jkl.pqr = function (name4) {
//         return name4;
//     }
// }.__proto__);

// function cvb() { }

// // cvb.hjk()
// cvb.prototype.v = function () { }
// asd = new cvb();




// //[Symbol.toStringTag]
// // Object.prototype[Symbol.toStringTag] = 'PYW_ObjectPrototype';

// function pyw() {
//     this.abcd = 'qrst';
//     this.ijkl = 'mnop'
//     // this[Symbol.toStringTag] = 'PYW_Object';
// }

// // pyw.prototype[Symbol.toStringTag] = 'PYW_Prototype';

// var PywObject = new pyw();
// // console.log(PywObject.toString());
// console.log(Object.prototype.toString.call(PywObject))


// Object.prototype[Symbol.toStringTag] = '<Hello id = hi>';
// var objectNew = new abc();
// var hey = {
//     abcd: 'qrst',
//     ijkl: 'mnop'
// }
// {
//     let ijn = 'ngj';
// {
//     let hky = 'hgkh';
function abc(eventOrElement) {
    console.log(arguments);
    // console.log(event);
    // console.log(bgcolor);
    // hky;
    // ijn;
    // h2.style.backgroundColor = 'yellow';
    // element.id = "H5";
    // console.log('inside abc: ', element);
    // this.id = "H5";
    eventOrElement.id = "H5";
    console.log('inside abc: ', this);
}
// }
// }

function anotherAbc(e) {

    // console.log('e.target.value: ', e.target.value);
    // var arr = []
    // console.log('Array', arr)

    // e.preventDefault()
    // console.log(this, e.target.elements);
    // e.target.style.backgroundColor = 'yellow';
    console.log('anotherAbc clicked !');

    // setTimeout(() => {  // It doesn't work in 'React' because of 'event pooling' and use of 'synthetic events' i.e 'e.target' would be null
    //     console.log(this, e.target);
    //     e.target.style.backgroundColor = 'yellow';
    //     console.log('anotherAbc clicked !');
    // }, 5000)
}

// function abc() {
//     // hky;
//     // h2.style.backgroundColor = 'yellow';
//     // element.id = "H5";
//     // console.log('inside abc: ', element);
//     this.id = "H5";
//     console.log('inside abc: ', this);
// }

var h2 = document.getElementById("H2");
// document.addEventListener('submit', anotherAbc);
h2.addEventListener('click', anotherAbc); // DOM Level 2 event handler
// // console.log('onclick ', h2.onclick);
h2.onclick = abc; // DOM Level 1 event handler
// // console.log('here is h2.onclick: ', h2);

// abc();
// var abcBind = abc.bind(h2);
// abcBind();


// console.log(hey);
// console.log(objectNew);
// h2.style.backgroundColor = function () { }
// setTimeout(function () {
//     console.log("ABCD");
// }, 5000);

// h2.addEventListener('click', abc);

// var h1 = {
//     someMethod: function (event, callback) {
//         callback.bind(this); // bind returns a newly created function while call and aply calls the function immediately
//     }
// }

// h1.someMethod('click', abc);

// var a = {
//     abc: function (x) {
//         console.log(x);
//         console.log(this);
//     }
// }
// var b = {
//     ghi: function (func) {
//         func("Hello World!");
//     }
// }

// //alerts "Hello World!"
// b.ghi(a.abc);

// function def() {
//     console.log("d is: ");
//     console.log(this);
//     console.log("value of i: " + i);
// }

// var ijk = {
//     pqr: function (d) {
//         console.log("ijk is: ");
//         console.log(this);
//         mno: "Hi !";
//         var i = 5;
//         d.call(this);
//     }
// }

// ijk.pqr(def);



// function k() {
//     console.log("k");
// }

// k.prototype = function g() {
//     console.log("g")
// }

// var hjk = {
//     j: function () {
//         console.log("j");
//         console.log(this);
//         this.j.k = function () {
//             console.log("j.k");
//             console.log(this);
//         }
//         // return this.j;
//     },
// }

// // j.__proto__ = k.prototype

// var uvw = hjk.j();
// hjk.j.k();



// function a() {
//     console.log(this);
//     this.b = function () {
//         console.log(this);
//     }
// }

// var d = new a();
// d.b();
// a();
// b();



// 'use strict'

// function abc() {
//     console.log(this);
//     abc.ghi = function () {
//         console.log(this);
//     }
// }

// abc();
// abc.ghi();

// function outer(callback1) {
//     setTimeout(callback1, 5000);
//     console.log("Outer execution has finished");
// }

// outer(function () {
//     console.log("Callback execution has finished");
// }); 

// function tuv() {
//     console.log('inside tuv');
// }

// function uvw() {
//     console.log('inside uvw');
// }

// jkl = 'Shaktiman !';

// function randomFunction() {

// }

// var Abc_Once = new function () {

//     this.jkl = 'Superman';
//     this.uvw = function () {
//         console.log(jkl);
//         tuv();
//     }
//     this.mno = function () {
//         console.log('inside mno of abc');
//     }
//     // this.uvw();

//     var mno = function () {
//         console.log(this);
//         tuv();
//     }
//     mno();

//     // this.toString = function () {
//     //     return 'ABC_Funtion'
//     // }
// }

// // Abc_Once.__proto__ = randomFunction.prototype;

// // Abc.prototype.toString = function () {
// //     return 'ABC_Function';
// // }


// // var AbcObj = new Abc_Once();
// // console.log(AbcObj);

// var ghj = {
//     io: function () {

//     }
// }

// abc = {
//     toString: function () {
//         return 'ABC';
//     }
// };

// console.log(abc);

// abc.ghj = ghj;


// function Win() {

// }

// function WinProp() {

// }

// Win.prototype = new Win();
// // Win.prototype.

// var win = Object.create(Win.prototype)

// var ankit = 'Mittal'

// var user = {

//     [Symbol.toStringTag]: 'User',
//     [ankit]() {
//         console.log('Batman !');
//     },

//     // get [Symbol.toStringTag]() {
//     //     return 'User'; // The string tag description
//     // }

// }

// function dfg() {

//     // this[Symbol.toStringTag] = 'PQR';
// }
// dfg.prototype[Symbol.toStringTag] = 'ABC';
// var jkl = new dfg();
// // jkl[Symbol.toStringTag] = 'ABC';

// console.log();

// // user[ankit]();

// console.log(dfg);

// function rty() {
//     console.log(this);
// }

// const mno = {
//     ghj: function () {
//         console.log(this);
//         this.ghj.hjk = function () {
//             console.log(this);
//         }
//         this.ghj.hjk();
//     }
// }

// mno.ghj();

// var c = 'Hey !';



// function a() {
//     var c = 'Hi !!';
//     var u = 'Hello !!';
//     this.m = 5;
//     this.cvb = function () {
//         console.log(c);
//         console.log(this.m);
//     }
//     this.b = function () {
//         console.log(c);
//         console.log(this);
//         this.rgb = function () {
//             console.log(u);
//             console.log(this);
//         }
//         this.rgb();
//     }
//     var k = function () {
//         console.log(c);
//         console.log('Inside K');
//         console.log(this);
//     }
//     // return function d() {
//     //     console.log(u);
//     // }

//     // this.b();
//     // k();
//     // return d;
//     cvb();
// }

// a();
// // new a();

// a.tyu = function () {
//     console.log(this);
//     console.log(c);
// }

// // var ui = new a()
// // ui.b();
// // var io = ui.cvb;
// // io();
// // a.b();
// // ui.nop = function () {
// //     console.log(c);
// // }

// // ui.nop();
// a.tyu();


// //Chalk Emulation Code
// function chalk() {
//     console.log('chalk');
//     // chalk.color = 'None';
// }
// Function.prototype.abc = {};
// // chalk.__proto__ = function Abc() { }
// // chalk.__proto__ = function () { };

// // color.prototype.green = function () { };
// // color.prototype.blue = function () { };

// chalk.__proto__.green = function () {
//     console.log('green')
//     console.log('Color: ' + this.color);
//     // console.log(this.green);
//     // console.log(this);
//     // this.green.color = 'greenColour';
// }
// chalk.green.color = 'greenColour';

// chalk.__proto__.blue = function () {
//     console.log('blue')
//     console.log('Color: ' + this.color);
// }
// chalk.blue.color = 'blueColour';

// // chalk.green.__proto__ = function () { }
// // chalk.blue.__proto__ = function () { }

// chalk.__proto__.bgRed = function () {
//     console.log('bgRed')
// }
// chalk.bgRed.bgColor = 'backgroundRed';
// // chalk.blue.__proto__.bgRed = function () { console.log('bgRed inside blue') }

// chalk.__proto__.underline = function () {
//     console.log('underline');
//     console.log('fontStyle: ' + this.underline.fontStyle);

// }
// chalk.underline.fontStyle = 'fontUnderline';

// // chalk();
// // chalk.green();
// // chalk.green.bgRed();

// // chalk.blue();
// // // chalk.blue.bgRed();
// // // chalk.bgRed.green();
// // // chalk.blue.green();
// // // chalk.green.blue();
// // chalk.green.blue();
// // chalk.green.bgRed.underline();

// myProp = 'abc';
// var chalkTwo = {

//     abcmno: myProp,

//     // abcd: {
//     //     bcd: abcmno
//     // },
//     // set greenTwo(color) {
//     //     this.color = color;
//     // },
//     myProp: 'bgYellowJi !',

//     get greenTwo() {
//         this.color = 'Green';
//         console.log(myProp);
//         return this;
//     },

//     set bgYellow(bgColor) {

//     },

//     get bgYellow() {
//         this.bgColor = 'bgYellow';
//         return this;
//     },

//     // bgYellow(bgColor) {
//     //     this.bgColor = 'bgYellow';
//     // },

//     // bgYellow: function (bgColor) {
//     //     this.bgColor = 'bgYellow';
//     //     return this;
//     // },

// }

// // chalkTwo.bgYellow = function (bgColor) {

// // }

// // chalk.__proto__ = {
// //     set bgYellow(bgColor) {
// //         this.bgColor = bgColor;
// //     }
// // }

// chalkTwo.greenTwo = 'yellow';
// console.log(chalkTwo.greenTwo.bgYellow);

function Hello() {
    // try {
    //     this.abc = get(){

    //     }
    // }
    // catch (e) {

    // }
    console.log("Hello Ji !")
}

Hello();

var hyu = {

}

function uej() {
    hyu.tyu = 'Namaste !';
}

var poi = function () {
    function ayz() {
        var rjg = 'Batman !';
        console.log("ayz: ", this);
    }
    ayz();
    var tyu = 'Hello there !';
    hyu.ty
    uej();
    poi.ghj = 'hey there !';
    console.log(window.ayz);
    // throw new Error('poi error');
    var someObject = {
        uio: this
    };

    console.log(someObject.uio);
}

// console.log(arguments[0]);


// poi.prototype = {
//     [Symbol.toStringTag]: 'abc'
// }


var iop = Object.create(poi.prototype);
iop.rty = 'Hi there !';
// iop[Symbol.toStringTag] = 'IOP'
// // var someFunctionAbc = function () {
// //     console.log('someFunctionAbc');
// //     return 'HelloJi !'
// // }
var car = 'jkl';
var yui = {
    "ijk": "abc",
    // hjk: someFunctionAbc()
    // head: asColor(chalk.cyan, ['Stat', 'User', 'System', 'Process'])
}

var personOne = {
    [Symbol.toStringTag]: 'ThisIsPersonOne',
    nameTwo: "Ram",
    "age": 27,
    "vehicles": {
        car: yui,
        "bike": car,
        // "scooter": personOne.nameTwo,
        "airlines": {
            "lufthansa": "Air123",
            "British airways": "Brt707"
        }
    }
}

iop.person1 = personOne;

personOne.cycle = {
    type: '2 wheels',
    carrier: this.type
};

console.log(window.personOne);

(function () {
    console.log('Here is this :', this);
    // console.log(arguments[0]);
    poi();
})();



// Window
// new Window();

// var employeeJson = {
//     "employee": {
//     "name": "sonoo",
//     "salary": 56000,
//     "married": true.
//     }
//     }

// // console.log(yui.hjk);
// var yuiString = JSON.stringify(yui);
// console.log(yuiString);
// var JsonData = JSON.parse(yuiString);
// JsonData.push('HI!');

// var RandomVar = 'RandomName';
// function bcd() {
//     var RandomVar = 'RandonNameTwo';
//     // return {
//     //     abcRandom: function (RandomArgs) {
//     //         console.log(RandomArgs);
//     //         console.log(RandomVar);
//     //     }
//     // }
//     bcd.RandomProp = function () {
//         console.log(RandomVar);
//     }
// }

// bcd();
// bcd.RandomProp();



// bannerApi Save and Pre functions emulation
function withoutEvent(someFunction) {
    withoutEvent.someMethod = someFunction;
}

function withoutEventmitter(anotherFunction) {
    withoutEvent.someMethod(anotherFunction);
}

withoutEvent(function (cb) {
    var Err = null;
    var Result = 'successful';
    cb(Err, Result);
});

withoutEventmitter(function (someErr, someResult) {
    if (someErr) {
        console.log('Emulation successful with emulated Error:', someErr);
    }
    else if (someResult) {
        console.log('Emulation sucessful with emulated Result:', someResult)
    }
});


// var jyh = {
//     jhg: 'abc'
// }

// var hmt = {
//     jki: function () {
//         wuj = 'hello !';
//         console.log(this);
//         console.log(wuj);
//     }
// }

// var ytg = hmt.jki;

// hmt.jki();

// var yip = ytg.bind(jyh);
// yip();

// console.log(jyh);


// var myConsole = console.log;
// myConsole('Hi here in myConsole !');



var h = 11;
var j = 5;

function abcd() {
    var a = 5;
}

abcd.h = 15;

abcd.tuv = function () {
    console.log(h);
    console.log(this.h);
}

abcd.tuv();

var hijk = new abcd();
hijk.j = 21;
hijk.l = function () {
    // var j = 21;
    console.log(j);
    console.log(this.j);
}

hijk.l();



// function wipj() {
//     var h = 5;
//     var a = function () {
//         console.log(h);
//         console.log(h);
//         console.log(h);
//         console.log(h);
//         console.log(h);
//         console.log('this inside a');
//         console.log('this inside a1');
//         console.log(this);
//         console.log('this inside a2', this);
//         console.log('this inside a4', this);
//     }

//     var b = () => {
//         console.log(h);
//         // console.log('this inside b');
//         // console.log(this);
//     }
//     return a;
//     // b();
// }

// var yop = new wipj();
// // console.log(yop());




// function kgj() {
//     var b = 'Hello !';
//     this.h = function () {
//         console.log(b);
//         console.log(this);
//     }
// }

// var ghi = new kgj();
// var l = ghi.h
// // ghi.h();
// l();




// var gbv = 'Hi !';

// function yhd() {
//     // var gbv = 'Hey !';

//     var ObjOne = {
//         hjk: 'Hello !',
//         iyv: gbv
//     };

//     console.log(ObjOne);
// }

// yhd();




// function gkj() {

// }

// function hyj(callback) {
//     callback(gkj)
//     console.log('Hi !');
// }

// hyj(function (param) {
//     if (param instanceof Object) {
//         console.log('Yes! It is an instance of Object')
//     }
//     else {
//         console.log('No! It is not an instance of Object');
//     }
//     return;
// });




// function kyi() {
//     var hio = 'hi !';
//     function iyk() {
//         var abj = hio;
//         // console.log(hio);
//     }

//     iyk.prototype = function qma() {

//     }

//     return iyk;
// }

// var hzn = kyi();



// function piu() {

// }

// piu.prototype.ank = function () {
//     console.log('hey !');
// }

// piu().ank();




// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         }, 2000);
//     });
// }

// add(1, 2)
//     .then((sum) => {
//         console.log(sum);
//         return sum + 4;
//     })
//     .then((sum2) => {
//         console.log(sum2);
//     })
//     .catch(
//         (error) => {
//             console.log(error);
//         });

arr = [{ 'name1': [1, 2, 3, 4, 5], 'name2': [6, 7, 8, 9, 10, 11] }];

arr[0].name1.push(21);
console.log(arr[0]);
console.log(arr[0].name1[1]);




// function vbj() {
//     console.log('vbj: ', this);
// }

// h2.vbj = function () {
//     console.log(this);
// }

// var yig = 'Namaste !!';

// function yij() {
//     console.log(this);
//     console.log(yig);
// }

// h2.yij = yij;
// h2.yig = 'HelloHaiJi !!';

// with (h2) {
//     var ifh = 'helloJi !!';
//     console.log('this inside with block: ', this);
//     // console.log(vbj);
//     function onhehe2(event) {
//         console.log('onhehe2');
//         console.log('inside with block of H2 ', this);
//         // console.log(baseURI);
//         // abc.call(this);
//         // onhehe2();
//     }
//     // yij();
// }

// onhehe2();

// // yij();

// h2.onhehe = onhehe2;

// h2.onhehe();

// // console.log(ifh);