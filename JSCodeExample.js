
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



function doSomething() {
    this.name2 = 'John';
    return 'random';
}

doSomething.ABC = 'ABC';
console.log(doSomething.ABC);



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
