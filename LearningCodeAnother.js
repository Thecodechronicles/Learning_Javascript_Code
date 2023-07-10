
// var abcIffe = (function () {
//     function abc() {
//         abc.jhi = 'Hi ! abc';
//     }

//     abc();
//     return abc;
// })();

function abc() {
    // abc.jhi;
    console.log('abc.jhi: ', abc.jhi)
    // console.log(arguments[Symbol.iterator]());
    // eval('var ' + 'value1' + '' + '=' + '{ abcd: "hey !" }');
    // console.log('new.target: ', new.target);
    // console.log('new.target: ', new.target.name);
}

// Note: 
// The new.target syntax consists of the keyword new, a dot, and the identifier target. Because new is a reserved word, not an identifier, this is not a property accessor, but a special expression syntax.
// The new.target meta-property is available in all function/class bodies; using new.target outside of functions or classes is a syntax error.
// (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target)

abc();

// abc.igj = abc(abc.igj);

new abc('dfg', 'ghd');

var byu = {
    [abc.jhi]: 'hello !'
}

abc();

var jyu = ('hello', 'hi');

console.log(jyu);

var mathObj = {
    [Symbol.toStringTag]: 'heyMathObj',
    abc: function () {

    }
}

console.log(mathObj[Symbol.toStringTag]);

// Map();



function ijkl() {

    if (!(this instanceof ijkl)) {
        throw new TypeError(`can't call it as a function`);
    }

    this.lmn = 'very good !'
    this.mno = () => {
        console.log(this.lmn);
    }
    function ygh() {
        console.log('ygh: ', this);
    }
    ygh();
}

ijkl.prototype = {
    // mno: () => {
    //     console.log(this.lmn);
    // },

    uvw: function () {
        console.log(this.lmn);
    }
}

var uyv = new ijkl();

uyv.uvw();
// uyv.mno();
var yuj = uyv.mno;
yuj();




callbackFunc = function (state = { count: 0 }) {

}

function createStore(callback) {
    const stateValue = callback();
    return {
        getState: function () {
            return stateValue;
        },
        dispatch: function (obj) {
            stateValue = callback(obj);
        }
    }
}

const testObj = {
    randomProp: 'hello !'
}

console.log({
    ...testObj,
    anotherProp: 'Hi !'
})




// var People = [
//     { Name: "Name", Surname: "Surname" },
//     { Name: "AAA", Surname: "ZZZ" },
//     { Name: "Name", Surname: "AAA" }
// ];

// class MyArray extends Array {
//     sortBy(...args) {
//         return this.sort(dynamicSortMultiple(...args));
//     }
// }

// console.log('MyArray: ', (MyArray.from(People) instanceof MyArray));


// function SomeArray() {

// }

// SomeArray.fromSA = function () {
//     console.log('fromSA');
// }


// function MyArray() {

// }

// MyArray.prototype.sortBy = function () {

// }

// MyArray.prototype.__proto__ = SomeArray.prototype;

// console.log(MyArray.fromSA());




class SomeClass {
    static someMethod() {
        console.log('someMethod');
    }
}

// function SomeClass() {

// }

class UserClass extends SomeClass {

}

UserClass.someMethod();



const inputField = document.getElementsByTagName('input');
console.log(inputField);
// document.getElementById('rootElement').addEventListener('keypress', function (e) {
//     e.preventDefault();
//     console.log('default behaviour hes been prevented !!');
// });

// var keypressEvent;

inputField[0].addEventListener('keypress', function (e) {
    // // e.preventDefault();
    // const amount = e.target.value;
    // // e.preventDefault();
    // // console.log("amount is: ", amount);
    // // if (!amount.toLowerCase().includes("h")) {
    // //     console.log("this value: ", this.value);
    // //     this.value = amount;
    // //     e.preventDefault();
    // // }
    // const Event = new CustomEvent('inputData', { detail: amount })
    // this.dispatchEvent(Event);

    // e.preventDefault();
    // const amount = e.target.value;
    // console.log("amount is: ", amount);
    // if (!amount.toLowerCase().includes("h")) {
    //     console.log("this value: ", this.value);
    //     // this.value = amount;
    //     this.setAttribute('value', amount);
    //     // const inputElement = document.createElement('input');
    //     // inputElement.setAttribute('value', amount);
    //     // this.parentNode.replaceChild(inputElement, this);
    // }
    // else {
    //     e.preventDefault();
    //     this.setAttribute('value', amount);
    // }


    // if (e.key == "h") {
    //     console.log("this value: ", this.value);
    //     console.log('key Pressed !')
    //     e.preventDefault();
    // }
    // else {
    console.log('sent Object: ', e);
    console.log(e.key);
    // const key = e.key;
    // keypressEvent = e;
    e.preventDefault(); // react will put this event listener at the root and only put e.preventDefault here if react component has a 'value' prop. Otherwise, react assumes since you don't want to change any value and hence, you don't want to control it's behaviour.. so, why it should prevent default behaviour from taking place. In that case e.preventDefault won't be put here and default behaviour would continue to take place normally
    this.dispatchEvent(new CustomEvent('inputData', { detail: e }));
    // }
})

var keyValue = "";
// /^\d*(\.\d{0,2})?$/)
// '<input type="text" name="random" value="' + { amount } + '" />'

// Assumed React Code
inputField[0].addEventListener('inputData', function (e) {
    console.log('recieved object: ', e)
    // e.preventDefault();
    keyValue = keyValue + e.detail.key;
    var workingAmount = keyValue;
    // var amount = "";
    console.log("amount is: ", workingAmount);

    // code assumed inside of react handler: an event object is made and workingAmount value thrown into it as e.target.value
    // imagine workingAmount in this if block as e.target.value
    if (workingAmount.toLowerCase().includes('h')) {
        console.log("this value: ", this.value);
        console.log('key Pressed !');

        // code assumed outside of react handler: when setState hasn't been called inside react handler
        // Both inside and outside code is clubbed into one If block...
        keyValue = workingAmount.slice(0, workingAmount.length - 1);
        // e.preventDefault();
    }
    // ...Assumed React Code 
    else {
        // amount = workingAmount;
        // this.setAttribute('value', workingAmount + 'One');
        this.setAttribute('value', workingAmount);//Attribute 'Value'
        this.value = workingAmount; // Property 'Value'
        // Almost everytime browser keeps the two in sync but In form inputs those aren't automatically made in sync
    }

    // if (!amount.toLowerCase().includes("h")) {
    //     console.log("this value: ", this.value);
    // this.value = amount;
    // this.setAttribute('value', amount + 'One');
    // this.value = amount;

    // console.log('keypress value: ', keypressEvent.target.value);
    // keypressEvent.preventDefault();
    // const inputElement = document.createElement('input');
    // inputElement.setAttribute('value', amount);
    // this.parentNode.replaceChild(inputElement, this);
    // }
    // else {
    //     // this.dispatchEvent(new KeyboardEvent('keypressed'), {
    //     //     view: window,
    //     //     bubbles: true,
    //     //     cancelable: true
    //     // })
    //     // console.log(amount.length);
    //     e.preventDefault();
    //     // const result = amount.slice(0, amount.length - 1);
    //     // this.setAttribute('value', result);
    // }
});


function pmj() {
    const obj = { pqr: 'ijk' }
    const someObj = 'Hello !';
    const abc = obj || someObj
    console.log('pmj wala abc ', abc);
}

pmj();
