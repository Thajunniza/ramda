/**
 * R_allPass
 */

const R = require('ramda');
/**
 * R.allPass is a higher-order function in Ramda that 
 * creates a new function which returns true only if all 
 * of the provided predicates (testing functions) return true for the given input.
 * R.allPass([predicate1, predicate2, ...predicateN])
 */


//Ex1 Simple
// Check multiple conditions in a array
//Check whether it is even & positivr & les than 100

const isPositive = R.gt(R.__,0);
const isEven =  R.pipe(R.modulo(R.__,2),R.equals(0));
const isless100 = R.lt(R.__,100);
const isPosEvenlt100 = R.allPass([isPositive,isEven,isless100]);
console.log(isPosEvenlt100(5));  //false
console.log(isPosEvenlt100(500));  //false
console.log(isPosEvenlt100(6));     //true
const num = [2,4,6,98];
const num1 = [2,5,400,6,98];
console.log(R.all(isPosEvenlt100(R.__),num));  //true
console.log(R.all(isPosEvenlt100(R.__),num1)); //false

//Ex2 Password validation
// 1. Length > 8
// 2. Has a UpperCase
// 3. Has a Lowercase
// 4. Has a number
// 5. Has special char

const validatePwd = R.allPass([
    x =>  R.gt(x.length,8),
    x => /[A-Z]/.test(x),
    x => /[a-z]/.test(x),
    x => /[0-9]/.test(x),
    x => /[^A-Za-z0-9]/.test(x)
]);
console.log(validatePwd('Thaj'));           //false
console.log(validatePwd('Thaj123456'));     //false
console.log(validatePwd('Thaj@123456'));    //true

//Ex3 working with objects
//Validate an obj where it has a name,email,age property
//and the age > a8 and valid password
const obj = {
    name: "Thaj",
    email: "thajunniza.m.a@gmail.com",
    age: 34,
    password: "Thaj@123456"
};

const obj1 = {
    name: "Zayd",
    email: "zayd@gmail.com",
    age: 4,
    password: "Zayd@123456"
};


const isValidUser = R.allPass([
    R.has('name'),
    R.has('email'),
    R.has('age'),
    R.propSatisfies(age => R.gte(age,18),'age'),
    R.propSatisfies(password => validatePwd(password),'password')
]);
console.log(isValidUser(obj));      //true
console.log(isValidUser(obj1));     //false


//Ex4 Working with array
//Validate an array where all the objs where it has a name,email,age property
//and the age > a8 and valid password

const emp =[
    {
        name: "Thaj",
        email: "thajunniza.m.a@gmail.com",
        age: 34,
        password: "Thaj@123456"
    },
    {
        name: "Zayd",
        email: "zayd@gmail.com",
        age: 8,
        password: "Zayd@123456"
    },
    {
        name: "Zia",
        age: 4,
        password: "Zia@123456"
    },
    {
        name: "Zunu",
        email: "zayd@gmail.com",
        age: 46,
        password: "zunu@123456"
    }
]

const validemplist = R.filter(isValidUser,emp);
console.log(validemplist);
/**
 * [
  {
    name: 'Thaj',
    email: 'thajunniza.m.a@gmail.com',
    age: 34,
    password: 'Thaj@123456'
  }
]
 */


/**
 * Output
 * false
false
true
true
false
false
false
true
true
false
[
  {
    name: 'Thaj',
    email: 'thajunniza.m.a@gmail.com',
    age: 34,
    password: 'Thaj@123456'
  }
]
 */
