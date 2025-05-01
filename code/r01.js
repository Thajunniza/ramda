const R = require('ramda');

const data = [
    {name : "Thaj", age: 34},
    {name : "Zayd", age: 8},
    {name : "Zia", age: 5},
    {name: "Zunaira", age : 4}
]

// Solution 1 - normal solution to extract only the names in data obj to array
const extract1 = data.map( item => item.name);
console.log(extract1);

//Solution 2 - Using Ramda
const extract2 = R.map(item => item.name, data);
console.log(extract2);

//Solution 3 - Using props
const getName = R.prop('name');
const extract3 = R.map(item => getName(item), data);
console.log(extract3);

//Solution 4 - Using props
const extract4 = R.map(getName(), data);
console.log(extract4);

//Solution 5 - Using Curring
const getExtract = R.map(getName());
console.log(getExtract(data));