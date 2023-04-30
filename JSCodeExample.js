
//#CodeSnippet1_General
// function budgetController(fun){
//     // fun().publicTest(12);
//     // fun().add(11);
//     fun()(12);
//     // PT = fun();
//     // PT.publicTest(12);
//     // console.log(fun().add);
//    }
// 
// budgetController(function() {
//     var x =23;
//     function add(a){
//         return x+a;
//     }
//     // return { abc : 11};
//     return function publicTest(b) {
//         console.log(add(b)); 
//     };
// });



// function doSomething() {
//     this.name2 = 'John';
//     return 'random';
// }

// doSomething.ABC = 'ABC';
// console.log(doSomething.ABC);



//#CodeSnippet2_General
// function counter(abcde) {
//     // var obj = {
//     //     abc : 11
//     // }
//     var count = 11;
//     return function() {
//         console.log("Ankit"); 
//         console.log(abcde);
//     }
// }
// // var count = counter();
// // count();
// counter("Ekta")();
// count();



//#CodeSnippet3_Iffe
// var budgetController = (function() {
//     var x =23;
// 
//     function add(a){
//         return x+a;
//     }
// 
//     return {
//         publicTest: function(b) {
//         console.log(add(b)); 
//         }
//     }
// 
// })().publicTest




//#CodeSnippet4_ObjectsInJS
// var ElementTest = {
// 
//     myFunction: function(){}
// 
// };
// 
// // new ElementTest().myFunction();
// ElementTest.myFunction();




//#CodeSnippet5_General
// var ElementJs = {
//     onglicky: function(){
//         console.log("onglick as it is");
//     }
// };
// 
// // ElementJs.onglicky = function(){
// //     console.log("onglicky changed");
// // }
// 
// ElementJs.onglicky();


var abc = {
    ijk: 'vyu',
    get pqr() {
        return this.ijk;
    }
}

console.log(abc.pqr);


function mno() {
    this.abc = 'uvw';
}

mno.prototype = {
    get pqr() {
        return this.abc;
    }
}

console.log(new mno().pqr);


class lmn {
    constructor() {
        this.ghi = 'ugj';
    }

    get pqr() { // It is equivalent to a function prototype
        return this.ghi;
    }
}

console.log(new lmn().pqr);

// getter and setter can't be defined inside a function, It can only be defined inside an object.....
//.....Since, prototype of a function is also an object it can be defined inside a prototype object as well 