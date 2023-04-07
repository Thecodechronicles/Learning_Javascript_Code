// function wipj() {
//     var h = 5;
//     console.log(this);
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
//         console.log(h);
//         console.log(h);
//         console.log(h);
//         console.log(h);
//         console.log(h);
//         console.log('this inside b');
//         console.log('this inside b1');
//         console.log(this);
//         console.log('this inside b2', this);
//         console.log('this inside b4', this);
//         return 11;
//     }
//     return b;
//     // b();
// }

// var yop = new wipj();
// yop();

var i = 1;

function abc() {
    i = i + 1;
    console.log(i);
}

abc();
// abc();

function myFunction() {
    const div = document.querySelector('div');
    // div.classList.remove('info');
    div.removeAttribute("class");
}