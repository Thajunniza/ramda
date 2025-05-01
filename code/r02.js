const R = require("ramda");

//Pipe function
// It allows you to create a new function by
// connecting multiple functions in sequence,
// where the output of each function becomes the input to the next.
// R.pipe(func1, func2, func3, ...)(initialValue)

const data = [
  { name: "Thaj", age: 34 },
  { name: "Zayd", age: 8 },
  { name: "Zia", age: 5 },
  { name: "Zunaira", age: 4 },
];

// Solution 1 - normal solution to extract only the names in data obj to array and change to upper case
const extract1 = data.map((item) => item.name.toUpperCase());
console.log(extract1);

//Solution 2 through Ramda
const getName = R.prop("name");
const extract2 = R.map((item) => R.toUpper(getName(item)), data);
console.log(extract2);

//Solution 3 through Ramda
// const extract3 = R.map(R.toUpper(getName), data);
// console.log(extract3);

// The above code will error out because
// R.toUpper(getName) is attempting to pass a function (getName) to R.toUpper, but R.toUpper expects a string as its argument, not a function.

// When you write R.toUpper(getName), it:

// Takes the getName function (not its result)
// Tries to convert that function object to uppercase
// Fails because R.toUpper can only work on strings

// Using pipe for composition
const getUpper = R.pipe(getName, R.toUpper);
const extract3 = R.map(getUpper, data);
console.log(extract3);

//Solution 4
const extract4 = R.map(R.pipe(R.prop("name"), R.toUpper))(data);
console.log(extract4);

//Another example
// Need to calculate a number by adding 10 to it squaring it and divide by 10
const getCal = (num) => {
  const add2 = num + 2;
  return add2 ** 2 / 10;
};
console.log(getCal(5));

// Rewritten using pipe
const square = (x) => R.multiply(x, x);
const getCal1 = R.pipe(
  R.add(2), // Add 2 to the input
  square, // Square it (multiply by itself)
  R.divide(R.__, 10)
);
console.log(getCal1(5)); // 4.9

//Another way
const getCal2 = R.pipe(R.add(2), (x) => R.multiply(x, x), R.divide(R.__, 10));
console.log(getCal2(5));

/** Output
 * 
[ 'THAJ', 'ZAYD', 'ZIA', 'ZUNAIRA' ]
[ 'THAJ', 'ZAYD', 'ZIA', 'ZUNAIRA' ]
[ 'THAJ', 'ZAYD', 'ZIA', 'ZUNAIRA' ]
[ 'THAJ', 'ZAYD', 'ZIA', 'ZUNAIRA' ]
4.9
4.9
4.9
 */
