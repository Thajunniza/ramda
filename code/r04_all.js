/**
R.all
 */

const R = require('ramda');

/**
 * R.all
 * R.all is a function in Ramda that tests whether all elements 
 * in a list satisfy a predicate (testing function). 
 * It returns true only if the predicate returns a truthy value for every element in the list.
 * R.all(predicateFn, list)
 */

//Ex1 -> a simple example whch checks all nums are even
const num = [2,4,6,8];
const num1 = [2,4,5,6,8,9];
const checkEven = x => x % 2 === 0;
const allEven = R.all(checkEven);
console.log(allEven(num));      //true
console.log(allEven(num1));     //false

//Ex2 -> a simple example which checks whether length of all words are > 5
const name = ['Apple','Banana','Grape'];
const name1 = ['Thaj','Zayd','Zia','Zunu'];
const islen5 = x => x.length >= 5;
const alllen5 = R.all(islen5);
console.log(alllen5(name));//true
console.log(alllen5(name1));//false

//Ex3 -> More than one object in array
//Check with the student are eleigible to vote
const student = [
    {name:"Thaj",age:34},
    {name:"Zayd",age:8},
    {name:"Zunu",age:5},
    {name:"Zia",age:3}
];
const isVote = x => x >= 18;
const allVote = R.all(field => isVote(field.age));
console.log(allVote(student)); //false


//Better way using R.pipe and R.prop for cleanr composition
const canAllVote = R.all(R.pipe(R.prop('age'),isVote));
console.log(canAllVote(student));  //false
