/**
R.__
R.curry
R.add
R.addIndex
R.adjust
 */

const R = require('ramda');

/**
 * Curried function
 */

const f = (x,y,z) => x + y + z;  //normal

const c = x => y => z => x + y + z; //Curried
console.log(f(1,2,3));
console.log(c(1)(2)(3));

/** R.__
 * The placeholder (R.__) allows you to skip arguments
 * when partially applying a function, essentially creating "holes" 
 * that will be filled later when the returned function is called.
 */
//If i want decrement a number by 1
//This will alwasys take 1 as a first arg 
const dec = R.subtract(1);
console.log(dec(5));  // -4
//but i need 1 to be a secound arg or it goes on negative
//So i  pass a placeholder
const dec1 = R.subtract(R.__,1);
console.log(dec1(5));  // 4


/** R.addIndex
 * transforms list-iteration functions like map, filter, or forEach
 * to include the index as an additional argument to the iterating function.
 * Suppose you need to calculate something with the index of array use this
 * R.addIndex is a Ramda function that adds the ability to use the position (index)
 * of items in a list when you're working with functions like map or filter.
 */
const arr = [10,20,30,40,50];

//Normally, when you use R.map, your function only gets the value:
const add1 = R.map(item => item + 1 , arr);
console.log(add1);      //[ 11, 21, 31, 41, 51 ]

const mapwithIndex = R.addIndex(R.map);
const labelIndex = mapwithIndex((value,index) => `Item ${index} is ${value}`);
console.log(labelIndex(arr));
// //[
//     'Item 0 is 10',
//     'Item 1 is 20',
//     'Item 2 is 30',
//     'Item 3 is 40',
//     'Item 4 is 50'
//   ]//

const indx = R.addIndex(R.map)(R.add,arr);
console.log(indx);      //[ 10, 21, 32, 43, 54 ]

//Imagine you have a list of tasks and want to number them:
const tasks = ['Buy groceries', 'Clean house', 'Pay bills'];
const addIndex = (value,index) => `${R.add(index,1)} : ${value}`;
const taskwithidx = R.addIndex(R.map)(addIndex,tasks);
console.log(taskwithidx);  //[ '1 : Buy groceries', '2 : Clean house', '3 : Pay bills' ] 
R.fil

//Example with R.filter to consider only even idex
const filterarr = R.addIndex(R.filter);
const isEven = x => x % 2 === 0;
const evenIndex = filterarr( (_,index) =>isEven(index),arr);
console.log(evenIndex);  //[ 10, 30, 50 ]

/**
 * R.adjust
 * R.adjust is a function in Ramda that lets you transform a 
 * specific element in a list by its index, without mutating the original list.
 * R.adjust(index, transformFn, list)
 */
const arr1 = [10,20,30,40,50]
const adjustadd = R.adjust(2,R.add(1),arr1);
console.log(adjustadd);     //[ 10, 20, 31, 40, 50 ]

const rec1 = R.subtract(R.__,1);
const adjustsub = R.adjust(2,rec1,arr1);
console.log(adjustsub);





