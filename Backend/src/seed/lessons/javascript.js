/**
 * JavaScript Lessons - Days 1-30 (COMPLETE)
 * All 30 days with full content, examples, tests, and solutions
 */

export const javascriptLessons = [
  // ============== DAY 1 ==============
  {
    language: 'javascript',
    day: 1,
    title: 'Variables and Data Types',
    objectives: [
      'Understand how to declare variables using let, const, and var',
      'Learn the primitive data types in JavaScript',
      'Practice type checking with typeof operator',
      'Understand variable naming conventions'
    ],
    contentHtml: `
      <h2>Introduction to Variables</h2>
      <p>Variables are fundamental containers for storing data values in JavaScript. Think of them as labeled boxes where you can store information and retrieve it later. Understanding variables is the foundation of all programming.</p>
      
      <h3>Why Variables Matter</h3>
      <p>Variables allow you to:</p>
      <ul>
        <li>Store data for later use</li>
        <li>Make your code readable and maintainable</li>
        <li>Perform calculations and operations</li>
        <li>Build dynamic applications that respond to user input</li>
      </ul>
      
      <h3>let - Mutable Variables</h3>
      <p>The <code>let</code> keyword declares a block-scoped variable that can be reassigned. Use <code>let</code> when you need to change the value later:</p>
      <pre><code>let age = 25;
age = 26; // This is valid - we can change it
console.log(age); // 26

// Block scope example
if (true) {
  let x = 10;
}
// console.log(x); // Error: x is not defined (block-scoped)</code></pre>
      <p><strong>When to use:</strong> When the value needs to change during program execution (counters, user input, calculations).</p>
      
      <h3>const - Constants</h3>
      <p>The <code>const</code> keyword declares a block-scoped variable that cannot be reassigned. Use <code>const</code> for values that should never change:</p>
      <pre><code>const PI = 3.14159;
// PI = 3.14; // Error: Assignment to constant variable

const user = { name: "Alice" };
user.name = "Bob"; // This works! (object properties can change)
// user = {}; // Error: Cannot reassign the variable</code></pre>
      <p><strong>When to use:</strong> For values that shouldn't change (configuration, constants, function references). <strong>Best practice:</strong> Use <code>const</code> by default, only use <code>let</code> when you need to reassign.</p>
      
      <h3>var (Legacy - Avoid)</h3>
      <p>The <code>var</code> keyword is the old way of declaring variables. It's function-scoped (not block-scoped) and can lead to confusing bugs:</p>
      <pre><code>// var is function-scoped, not block-scoped
if (true) {
  var x = 10;
}
console.log(x); // 10 - still accessible! (unexpected behavior)

// Always prefer let or const in modern JavaScript</code></pre>
      <p><strong>Why avoid:</strong> <code>var</code> has function scope instead of block scope, can be redeclared, and is hoisted differently, leading to hard-to-debug issues.</p>
      
      <h2>Data Types in JavaScript</h2>
      <p>JavaScript has several primitive data types. Understanding these is crucial for writing correct code:</p>
      
      <h3>Primitive Types</h3>
      <ul>
        <li><strong>String</strong>: Text values enclosed in quotes. Example: <code>"Hello"</code>, <code>'World'</code>, <code>\`Template\`</code></li>
        <li><strong>Number</strong>: Numeric values (integers and decimals). Example: <code>42</code>, <code>3.14</code>, <code>-10</code></li>
        <li><strong>Boolean</strong>: Logical values - only <code>true</code> or <code>false</code>. Used in conditionals.</li>
        <li><strong>undefined</strong>: A variable that has been declared but not assigned a value. JavaScript automatically assigns this.</li>
        <li><strong>null</strong>: Intentional absence of value. You must explicitly assign <code>null</code>.</li>
        <li><strong>Symbol</strong>: Unique identifiers (advanced, used for object properties).</li>
        <li><strong>BigInt</strong>: For very large integers beyond Number's safe range.</li>
      </ul>
      
      <h3>Type Coercion and Gotchas</h3>
      <p>JavaScript is dynamically typed, which means types can change:</p>
      <pre><code>let x = "5";
let y = 3;
console.log(x + y); // "53" (string concatenation)
console.log(x - y); // 2 (numeric subtraction)

// typeof null returns "object" (this is a JavaScript quirk!)
console.log(typeof null); // "object" (not "null"!)</code></pre>
      
      <h2>The typeof Operator</h2>
      <p>Use <code>typeof</code> to check the type of a value at runtime. This is essential for debugging and type checking:</p>
      <pre><code>typeof "Hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (JavaScript quirk!)
typeof [1, 2, 3]   // "object" (arrays are objects!)
typeof { a: 1 }    // "object"
typeof function(){} // "function"</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Forgetting to declare:</strong> Using a variable without <code>let</code>, <code>const</code>, or <code>var</code> creates a global variable (bad practice)</li>
        <li><strong>Confusing null and undefined:</strong> <code>null</code> is intentional, <code>undefined</code> means "not set"</li>
        <li><strong>Type coercion surprises:</strong> <code>"5" + 3</code> is <code>"53"</code>, not <code>8</code></li>
        <li><strong>Reassigning const:</strong> You can't reassign <code>const</code> variables, but you can modify object properties</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Always declare variables with <code>let</code> or <code>const</code></li>
        <li>Use <code>const</code> by default, only use <code>let</code> when reassignment is needed</li>
        <li>Use descriptive variable names: <code>userAge</code> instead of <code>ua</code></li>
        <li>Initialize variables when declaring them when possible</li>
        <li>Use <code>typeof</code> to check types before operations</li>
      </ul>
    `,
    examples: [
      {
        title: 'Declaring and Using Variables',
        code: `let score = 0;
score = score + 10;
console.log(score); // 10

const MAX_SCORE = 100;
console.log(MAX_SCORE); // 100`,
        explanation: 'This example shows how to declare variables with let for mutable values and const for constants.'
      },
      {
        title: 'Working with Different Data Types',
        code: `const name = "Alice";
const age = 30;
const isStudent = false;

console.log(typeof name);      // "string"
console.log(typeof age);       // "number"
console.log(typeof isStudent); // "boolean"`,
        explanation: 'This example demonstrates different primitive data types and how to check their types.'
      }
    ],
    exercise: {
      description: 'Create a function called `solution` that takes an input value and returns an object with two properties: `value` (the original input) and `type` (the typeof the input).',
      starterCode: `function solution(input) {
  // Your code here
}`,
      hints: [
        'Use the typeof operator to get the type of the input',
        'Return an object using { } syntax',
        'Object properties are key: value pairs'
      ]
    },
    tests: [
      { id: 'test-1', description: 'Should return correct type for string', input: 'hello', expectedOutput: { value: 'hello', type: 'string' }, isHidden: false },
      { id: 'test-2', description: 'Should return correct type for number', input: 42, expectedOutput: { value: 42, type: 'number' }, isHidden: false },
      { id: 'test-3', description: 'Should return correct type for boolean', input: true, expectedOutput: { value: true, type: 'boolean' }, isHidden: false },
      { id: 'test-4', description: 'Should handle null', input: null, expectedOutput: { value: null, type: 'object' }, isHidden: true, hint: 'typeof null returns "object" in JavaScript' },
      { id: 'test-5', description: 'Should handle undefined', input: undefined, expectedOutput: { value: undefined, type: 'undefined' }, isHidden: true },
      { id: 'test-6', description: 'Should handle array', input: [[1, 2, 3]], expectedOutput: { value: [1, 2, 3], type: 'object' }, isHidden: true }
    ],
    solution: `function solution(input) {
  return {
    value: input,
    type: typeof input
  };
}`,
    difficulty: 1,
    estimatedMinutes: 15
  },

  // ============== DAY 2 ==============
  {
    language: 'javascript',
    day: 2,
    title: 'Functions and Arrow Functions',
    objectives: [
      'Learn to define functions using function declarations',
      'Understand arrow function syntax',
      'Work with function parameters and return values',
      'Understand function scope basics'
    ],
    contentHtml: `
      <h2>Functions in JavaScript</h2>
      <p>Functions are reusable blocks of code that perform a specific task. They are the building blocks of JavaScript applications, allowing you to organize code, avoid repetition, and create modular programs.</p>
      
      <h3>Why Functions Matter</h3>
      <p>Functions enable you to:</p>
      <ul>
        <li><strong>Reuse code:</strong> Write once, use many times</li>
        <li><strong>Organize logic:</strong> Break complex problems into smaller pieces</li>
        <li><strong>Test independently:</strong> Test functions in isolation</li>
        <li><strong>Make code readable:</strong> Descriptive function names explain intent</li>
      </ul>
      
      <h3>Function Declarations</h3>
      <p>Function declarations are hoisted (available before they're defined) and use the <code>function</code> keyword:</p>
      <pre><code>// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Can be called before it's defined (hoisting)
console.log(greet("Alice")); // "Hello, Alice!"

// Functions can take multiple parameters
function calculateTotal(price, tax, discount) {
  return (price - discount) * (1 + tax);
}

// Functions can return any type
function getUser() {
  return { name: "Alice", age: 30 };
}</code></pre>
      <p><strong>When to use:</strong> When you need hoisting or want a named function that can be called before declaration.</p>
      
      <h3>Arrow Functions (Modern JavaScript)</h3>
      <p>Arrow functions are a concise syntax introduced in ES6. They're preferred in modern JavaScript:</p>
      <pre><code>// Full arrow function syntax
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Implicit return (single expression)
const greet = (name) => "Hello, " + name + "!";

// Single parameter - parentheses optional
const square = x => x * x;

// No parameters - parentheses required
const getTime = () => new Date();

// Multiple parameters
const add = (a, b) => a + b;</code></pre>
      <p><strong>Key differences from function declarations:</strong></p>
      <ul>
        <li>Arrow functions are NOT hoisted</li>
        <li>They don't have their own <code>this</code> binding (important for objects)</li>
        <li>More concise syntax</li>
        <li>Cannot be used as constructors</li>
      </ul>
      
      <h3>Default Parameters</h3>
      <p>Default parameters allow you to provide fallback values when arguments aren't provided:</p>
      <pre><code>// Function with default parameter
const greet = (name = "Guest") => "Hello, " + name + "!";

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet());        // "Hello, Guest!"

// Multiple default parameters
function createUser(name = "Anonymous", age = 0, isActive = true) {
  return { name, age, isActive };
}

createUser(); // { name: "Anonymous", age: 0, isActive: true }
createUser("Bob", 25); // { name: "Bob", age: 25, isActive: true }

// Default parameters can use previous parameters
function createRectangle(width = 10, height = width) {
  return { width, height };
}
createRectangle(5); // { width: 5, height: 5 }</code></pre>
      
      <h3>Return Values</h3>
      <p>Functions can return values using the <code>return</code> keyword. If no return is specified, the function returns <code>undefined</code>:</p>
      <pre><code>// Explicit return
function add(a, b) {
  return a + b;
}

// No return (returns undefined)
function logMessage(msg) {
  console.log(msg);
  // No return statement
}

// Early return
function validateAge(age) {
  if (age < 0) return false;
  if (age > 150) return false;
  return true;
}</code></pre>
      
      <h3>Function Scope</h3>
      <p>Variables declared inside a function are scoped to that function:</p>
      <pre><code>function example() {
  let x = 10; // Function-scoped
  const y = 20;
  
  if (true) {
    let z = 30; // Block-scoped
  }
  // console.log(z); // Error: z is not defined
}

// x, y, z are not accessible outside the function</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Forgetting return:</strong> Functions without return statements return <code>undefined</code></li>
        <li><strong>Confusing arrow functions:</strong> Arrow functions don't have their own <code>this</code> context</li>
        <li><strong>Parameter order:</strong> Default parameters must come after regular parameters</li>
        <li><strong>Missing parentheses:</strong> Arrow functions with no parameters still need <code>()</code></li>
        <li><strong>Implicit return gotchas:</strong> Can't use implicit return with multiple statements</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use arrow functions for callbacks and short functions</li>
        <li>Use function declarations when you need hoisting</li>
        <li>Give functions descriptive names that explain what they do</li>
        <li>Keep functions focused on a single task (single responsibility)</li>
        <li>Use default parameters instead of checking for undefined inside the function</li>
        <li>Always return a value explicitly when the function should produce output</li>
      </ul>
    `,
    examples: [
      {
        title: 'Function Declaration vs Arrow Function',
        code: `function multiply(a, b) {
  return a * b;
}

const multiplyArrow = (a, b) => a * b;

console.log(multiply(4, 5));      // 20
console.log(multiplyArrow(4, 5)); // 20`,
        explanation: 'Both approaches define a function that multiplies two numbers.'
      },
      {
        title: 'Functions with Multiple Parameters',
        code: `const createUser = (name, age, city = "Unknown") => {
  return { name, age, city };
};

console.log(createUser("Alice", 25, "NYC"));
console.log(createUser("Bob", 30));`,
        explanation: 'Shows default parameters and returning objects from functions.'
      }
    ],
    exercise: {
      description: 'Create a function called `solution` that takes two numbers and an operation string ("add", "subtract", "multiply", "divide") and returns the result.',
      starterCode: `function solution(a, b, operation) {
  // Your code here
}`,
      hints: ['Use if/else or switch statements', 'Handle all four operations', 'Return the result']
    },
    tests: [
      { id: 'test-1', description: 'Should add', input: [10, 5, 'add'], expectedOutput: 15, isHidden: false },
      { id: 'test-2', description: 'Should subtract', input: [10, 5, 'subtract'], expectedOutput: 5, isHidden: false },
      { id: 'test-3', description: 'Should multiply', input: [10, 5, 'multiply'], expectedOutput: 50, isHidden: false },
      { id: 'test-4', description: 'Should divide', input: [10, 5, 'divide'], expectedOutput: 2, isHidden: true },
      { id: 'test-5', description: 'Should handle negatives', input: [-10, 5, 'add'], expectedOutput: -5, isHidden: true },
      { id: 'test-6', description: 'Should handle decimals', input: [10, 4, 'divide'], expectedOutput: 2.5, isHidden: true }
    ],
    solution: `function solution(a, b, operation) {
  switch (operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
    default: return null;
  }
}`,
    difficulty: 2,
    estimatedMinutes: 20
  },

  // ============== DAY 3 ==============
  {
    language: 'javascript',
    day: 3,
    title: 'Arrays and Array Methods',
    objectives: [
      'Create and manipulate arrays',
      'Use essential array methods like push, pop, shift, unshift',
      'Iterate over arrays with forEach and for...of',
      'Access array elements and properties'
    ],
    contentHtml: `
      <h2>Arrays in JavaScript</h2>
      <p>Arrays are ordered collections of values, zero-indexed (first element is at index 0). They are one of the most fundamental data structures in JavaScript, used to store lists of items, process data, and build complex applications.</p>
      
      <h3>Why Arrays Matter</h3>
      <p>Arrays enable you to:</p>
      <ul>
        <li><strong>Store collections:</strong> Group related data together</li>
        <li><strong>Process data:</strong> Iterate and transform multiple items</li>
        <li><strong>Build dynamic lists:</strong> Handle variable amounts of data</li>
        <li><strong>Organize information:</strong> Maintain order and relationships</li>
      </ul>
      
      <h3>Creating Arrays</h3>
      <p>There are several ways to create arrays in JavaScript:</p>
      <pre><code>// Array literal (most common)
const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null]; // Arrays can hold any type

// Array constructor (less common)
const arr1 = new Array(1, 2, 3);
const arr2 = new Array(5); // Creates array with 5 empty slots

// Empty array
const empty = [];

// Array with initial values
const scores = [100, 95, 87, 92];</code></pre>
      
      <h3>Accessing Elements</h3>
      <p>Arrays use zero-based indexing. The first element is at index 0:</p>
      <pre><code>const fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]);    // "apple" (first element)
console.log(fruits[1]);    // "banana" (second element)
console.log(fruits[2]);    // "cherry" (third element)
console.log(fruits.length); // 3 (number of elements)

// Accessing last element
console.log(fruits[fruits.length - 1]); // "cherry"

// Out of bounds returns undefined
console.log(fruits[10]); // undefined (no error, just undefined)</code></pre>
      
      <h3>Modifying Arrays</h3>
      <p>JavaScript arrays are mutable - you can change them after creation:</p>
      <pre><code>const arr = [1, 2, 3];

// Adding elements
arr.push(4);        // Add to end: [1, 2, 3, 4]
arr.push(5, 6);     // Add multiple: [1, 2, 3, 4, 5, 6]
arr.unshift(0);     // Add to start: [0, 1, 2, 3, 4, 5, 6]

// Removing elements
arr.pop();          // Remove from end: [0, 1, 2, 3, 4, 5]
arr.shift();        // Remove from start: [1, 2, 3, 4, 5]

// Modifying specific index
arr[0] = 10;        // [10, 2, 3, 4, 5]

// Inserting at specific index
arr.splice(2, 0, 99); // Insert 99 at index 2: [10, 2, 99, 3, 4, 5]</code></pre>
      
      <h3>Essential Array Methods</h3>
      <p>JavaScript provides powerful methods for working with arrays:</p>
      <pre><code>const numbers = [1, 2, 3, 4, 5];

// Finding elements
numbers.indexOf(3);        // 2 (returns index)
numbers.includes(3);       // true (checks if exists)
numbers.find(n => n > 3); // 4 (first element matching condition)

// Iterating
numbers.forEach(n => console.log(n)); // Execute function for each
for (const num of numbers) { }        // Modern for...of loop

// Getting array info
numbers.length;            // 5 (number of elements)
numbers.join(", ");        // "1, 2, 3, 4, 5" (convert to string)</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Off-by-one errors:</strong> Remember arrays start at 0, not 1</li>
        <li><strong>Modifying while iterating:</strong> Can cause unexpected behavior</li>
        <li><strong>Confusing length:</strong> <code>length</code> is the count, last index is <code>length - 1</code></li>
        <li><strong>Using == instead of ===:</strong> Always use strict equality</li>
        <li><strong>Forgetting arrays are objects:</strong> <code>typeof []</code> returns <code>"object"</code></li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use <code>const</code> for arrays (you can modify contents, just not reassign)</li>
        <li>Use descriptive variable names: <code>userNames</code> not <code>arr</code></li>
        <li>Prefer array methods over manual loops when possible</li>
        <li>Check array length before accessing elements</li>
        <li>Use <code>includes()</code> instead of <code>indexOf() !== -1</code></li>
        <li>Be careful with sparse arrays (arrays with gaps)</li>
      </ul>
    `,
    examples: [
      {
        title: 'Basic Array Operations',
        code: `const numbers = [1, 2, 3];
numbers.push(4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]

const last = numbers.pop();
console.log(last); // 5`,
        explanation: 'Shows adding and removing elements from arrays.'
      },
      {
        title: 'Finding Elements',
        code: `const fruits = ["apple", "banana", "cherry"];
console.log(fruits.indexOf("banana")); // 1
console.log(fruits.includes("cherry")); // true`,
        explanation: 'Use indexOf and includes to find elements.'
      }
    ],
    exercise: {
      description: 'Create a function that takes an array of numbers and returns an object with: sum, count, average, min, and max.',
      starterCode: `function solution(numbers) {
  // Your code here
}`,
      hints: ['Use reduce for sum', 'Use Math.min/max with spread', 'Average = sum / count']
    },
    tests: [
      { id: 'test-1', description: 'Basic stats', input: [[1, 2, 3, 4, 5]], expectedOutput: { sum: 15, count: 5, average: 3, min: 1, max: 5 }, isHidden: false },
      { id: 'test-2', description: 'Single element', input: [[42]], expectedOutput: { sum: 42, count: 1, average: 42, min: 42, max: 42 }, isHidden: false },
      { id: 'test-3', description: 'Negative numbers', input: [[-5, -2, 0, 3, 10]], expectedOutput: { sum: 6, count: 5, average: 1.2, min: -5, max: 10 }, isHidden: false },
      { id: 'test-4', description: 'All same', input: [[5, 5, 5, 5]], expectedOutput: { sum: 20, count: 4, average: 5, min: 5, max: 5 }, isHidden: true },
      { id: 'test-5', description: 'Decimals', input: [[1.5, 2.5, 3.0]], expectedOutput: { sum: 7, count: 3, average: 7 / 3, min: 1.5, max: 3.0 }, isHidden: true }
    ],
    solution: `function solution(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    sum,
    count: numbers.length,
    average: sum / numbers.length,
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}`,
    difficulty: 3,
    estimatedMinutes: 25
  },

  // ============== DAY 4 ==============
  {
    language: 'javascript',
    day: 4,
    title: 'Objects and Object Methods',
    objectives: [
      'Create and manipulate JavaScript objects',
      'Access and modify object properties',
      'Use Object methods like keys, values, entries',
      'Understand object destructuring'
    ],
    contentHtml: `
      <h2>Objects in JavaScript</h2>
      <p>Objects are collections of key-value pairs (also called properties). They are the fundamental way to represent structured data in JavaScript and are used everywhere - from configuration to data models to function parameters.</p>
      
      <h3>Why Objects Matter</h3>
      <p>Objects enable you to:</p>
      <ul>
        <li><strong>Group related data:</strong> Store multiple properties together</li>
        <li><strong>Model real-world entities:</strong> Represent users, products, settings, etc.</li>
        <li><strong>Organize code:</strong> Namespace related functionality</li>
        <li><strong>Pass complex data:</strong> Send multiple values to functions</li>
      </ul>
      
      <h3>Creating Objects</h3>
      <p>There are several ways to create objects in JavaScript:</p>
      <pre><code>// Object literal (most common)
const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

// Empty object
const empty = {};

// Object with methods
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Computed property names
const key = "name";
const obj = {
  [key]: "Alice",  // Dynamic key
  ["age"]: 30
};

// Nested objects
const user = {
  profile: {
    name: "Alice",
    email: "alice@example.com"
  },
  settings: {
    theme: "dark",
    notifications: true
  }
};</code></pre>
      
      <h3>Accessing Properties</h3>
      <p>You can access object properties using dot notation or bracket notation:</p>
      <pre><code>const person = { name: "Alice", age: 30 };

// Dot notation (most common)
console.log(person.name);    // "Alice"
console.log(person.age);     // 30

// Bracket notation (useful for dynamic keys)
const key = "name";
console.log(person[key]);   // "Alice"
console.log(person["age"]); // 30

// Nested access
const user = { profile: { name: "Alice" } };
console.log(user.profile.name); // "Alice"

// Optional chaining (ES2020) - safe access
console.log(user?.profile?.name); // "Alice"
console.log(user?.settings?.theme); // undefined (no error)</code></pre>
      <p><strong>When to use bracket notation:</strong> When the key is stored in a variable, contains special characters, or is computed dynamically.</p>
      
      <h3>Modifying Objects</h3>
      <p>Objects are mutable - you can add, modify, and delete properties:</p>
      <pre><code>const person = { name: "Alice" };

// Adding properties
person.age = 30;
person["city"] = "New York";

// Modifying properties
person.name = "Bob";
person.age = 31;

// Deleting properties
delete person.city;

// Checking if property exists
console.log("name" in person);        // true
console.log(person.hasOwnProperty("age")); // true
console.log(person.city !== undefined);    // false</code></pre>
      
      <h3>Object Methods</h3>
      <p>JavaScript provides powerful built-in methods for working with objects:</p>
      <pre><code>const person = { name: "Alice", age: 30, city: "NYC" };

// Get all keys
Object.keys(person);    // ["name", "age", "city"]

// Get all values
Object.values(person);  // ["Alice", 30, "NYC"]

// Get key-value pairs
Object.entries(person); // [["name", "Alice"], ["age", 30], ["city", "NYC"]]

// Create object from entries
const entries = [["name", "Bob"], ["age", 25]];
Object.fromEntries(entries); // { name: "Bob", age: 25 }

// Copy object (shallow)
const copy = Object.assign({}, person);
const copy2 = { ...person }; // Spread operator (preferred)

// Merge objects
const defaults = { theme: "light", lang: "en" };
const user = { theme: "dark" };
const merged = { ...defaults, ...user }; // { theme: "dark", lang: "en" }</code></pre>
      
      <h3>Object Destructuring</h3>
      <p>Destructuring allows you to extract properties into variables:</p>
      <pre><code>const person = { name: "Alice", age: 30, city: "NYC" };

// Basic destructuring
const { name, age } = person;
console.log(name); // "Alice"
console.log(age);  // 30

// Renaming variables
const { name: userName, age: userAge } = person;

// Default values
const { name, age, country = "USA" } = person;

// Nested destructuring
const user = { profile: { name: "Alice" } };
const { profile: { name } } = user;

// Function parameters
function greet({ name, age }) {
  return \`Hello, \${name}! You are \${age}.\`;
}</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Accessing undefined properties:</strong> Always check if property exists before accessing</li>
        <li><strong>Shallow vs deep copy:</strong> <code>Object.assign</code> and spread only copy one level deep</li>
        <li><strong>Modifying const objects:</strong> You can modify properties of <code>const</code> objects, just not reassign</li>
        <li><strong>Confusing dot and bracket:</strong> Use bracket notation for dynamic keys</li>
        <li><strong>Prototype pollution:</strong> Be careful when using <code>__proto__</code> or modifying prototypes</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use object literals for simple data structures</li>
        <li>Prefer dot notation unless you need bracket notation</li>
        <li>Use destructuring for function parameters when appropriate</li>
        <li>Use <code>const</code> for objects (you can modify properties)</li>
        <li>Use spread operator for copying and merging objects</li>
        <li>Check for property existence before accessing nested properties</li>
        <li>Use descriptive property names that explain their purpose</li>
      </ul>
    `,
    examples: [
      {
        title: 'Working with Object Properties',
        code: `const car = { brand: "Toyota", model: "Camry" };
car.year = 2022;        // Add property
car.brand = "Honda";    // Modify
delete car.model;       // Delete
console.log("year" in car); // true`,
        explanation: 'Shows various ways to work with object properties.'
      },
      {
        title: 'Destructuring',
        code: `const person = { name: "Alice", age: 30 };
const { name, age } = person;
console.log(name); // "Alice"`,
        explanation: 'Object destructuring extracts properties into variables.'
      }
    ],
    exercise: {
      description: 'Create a function that takes an object and returns a new object with keys and values swapped.',
      starterCode: `function solution(obj) {
  // Your code here
}`,
      hints: ['Use Object.entries', 'Values become keys', 'Keys become values']
    },
    tests: [
      { id: 'test-1', description: 'Swap simple object', input: { a: 1, b: 2, c: 3 }, expectedOutput: { 1: 'a', 2: 'b', 3: 'c' }, isHidden: false },
      { id: 'test-2', description: 'Swap strings', input: { name: 'Alice', city: 'NYC' }, expectedOutput: { Alice: 'name', NYC: 'city' }, isHidden: false },
      { id: 'test-3', description: 'Single property', input: { key: 'value' }, expectedOutput: { value: 'key' }, isHidden: false },
      { id: 'test-4', description: 'Empty object', input: {}, expectedOutput: {}, isHidden: true },
      { id: 'test-5', description: 'Numeric strings', input: { x: '10', y: '20' }, expectedOutput: { 10: 'x', 20: 'y' }, isHidden: true }
    ],
    solution: `function solution(obj) {
  if (!obj) return {};
  const swapped = {};
  for (const [key, value] of Object.entries(obj)) {
    swapped[value] = key;
  }
  return swapped;
}`,
    difficulty: 3,
    estimatedMinutes: 25
  },

  // ============== DAY 5 ==============
  {
    language: 'javascript',
    day: 5,
    title: 'Array Higher-Order Methods',
    objectives: [
      'Master map, filter, and reduce methods',
      'Chain multiple array methods',
      'Understand callback functions',
      'Use find and findIndex methods'
    ],
    contentHtml: `
      <h2>Higher-Order Array Methods</h2>
      <p>Higher-order array methods are functions that take other functions as arguments. They are the cornerstone of functional programming in JavaScript and make array manipulation elegant and readable. These methods don't modify the original array - they return new arrays or values.</p>
      
      <h3>Why Higher-Order Methods Matter</h3>
      <p>These methods enable you to:</p>
      <ul>
        <li><strong>Write declarative code:</strong> Describe <em>what</em> you want, not <em>how</em> to do it</li>
        <li><strong>Avoid mutation:</strong> Create new arrays instead of modifying existing ones</li>
        <li><strong>Chain operations:</strong> Combine multiple transformations elegantly</li>
        <li><strong>Improve readability:</strong> Code reads like natural language</li>
      </ul>
      
      <h3>map() - Transform Each Element</h3>
      <p>The <code>map()</code> method creates a new array by calling a function on every element:</p>
      <pre><code>// Basic usage
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]

// Transform objects
const users = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }];
const names = users.map(user => user.name); // ["Alice", "Bob"]

// Map with index
const indexed = [10, 20, 30].map((value, index) => \`\${index}: \${value}\`);
// ["0: 10", "1: 20", "2: 30"]

// Complex transformation
const prices = [10, 20, 30];
const pricesWithTax = prices.map(price => ({
  original: price,
  withTax: price * 1.1,
  formatted: \`$\${(price * 1.1).toFixed(2)}\`
}));</code></pre>
      <p><strong>Key points:</strong> Always returns a new array of the same length. The callback receives (element, index, array).</p>
      
      <h3>filter() - Select Elements</h3>
      <p>The <code>filter()</code> method creates a new array with elements that pass a test:</p>
      <pre><code>// Basic filtering
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// Filter objects
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 15 },
  { name: "Charlie", age: 25 }
];
const adults = users.filter(user => user.age >= 18);
// [{ name: "Alice", age: 30 }, { name: "Charlie", age: 25 }]

// Remove falsy values
const mixed = [0, 1, "", "hello", null, undefined, false];
const truthy = mixed.filter(Boolean); // [1, "hello"]

// Complex conditions
const products = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "Phone", price: 500, inStock: false }
];
const available = products.filter(p => p.inStock && p.price < 800);</code></pre>
      <p><strong>Key points:</strong> Returns a new array (possibly shorter). Callback should return <code>true</code> to keep element, <code>false</code> to exclude.</p>
      
      <h3>reduce() - Accumulate Values</h3>
      <p>The <code>reduce()</code> method reduces an array to a single value by accumulating results:</p>
      <pre><code>// Sum numbers
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0); // 10

// Without initial value (uses first element)
const sum2 = numbers.reduce((acc, n) => acc + n); // 10

// Count occurrences
const words = ["apple", "banana", "apple", "cherry"];
const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { apple: 2, banana: 1, cherry: 1 }

// Find maximum
const max = numbers.reduce((max, n) => n > max ? n : max, -Infinity);

// Flatten arrays
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []); // [1, 2, 3, 4, 5]

// Group by property
const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 }
];
const grouped = people.reduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(person);
  return acc;
}, {});</code></pre>
      <p><strong>Key points:</strong> Callback receives (accumulator, currentValue, index, array). Always provide an initial value for clarity and safety.</p>
      
      <h3>Other Useful Methods</h3>
      <pre><code>const numbers = [1, 2, 3, 4, 5];

// find() - Get first matching element
const found = numbers.find(n => n > 3); // 4

// findIndex() - Get index of first match
const index = numbers.findIndex(n => n > 3); // 3

// some() - Check if any element passes test
const hasEven = numbers.some(n => n % 2 === 0); // true

// every() - Check if all elements pass test
const allPositive = numbers.every(n => n > 0); // true

// forEach() - Execute function for each (no return)
numbers.forEach(n => console.log(n));</code></pre>
      
      <h3>Chaining Methods</h3>
      <p>One of the most powerful features is chaining these methods together:</p>
      <pre><code>const products = [
  { name: "Laptop", price: 1000, category: "electronics" },
  { name: "Phone", price: 500, category: "electronics" },
  { name: "Book", price: 20, category: "books" }
];

// Get names of expensive electronics, sorted
const result = products
  .filter(p => p.category === "electronics")
  .filter(p => p.price > 600)
  .map(p => p.name)
  .sort();
// ["Laptop"]

// Calculate total price of discounted items
const total = products
  .filter(p => p.price < 100)
  .map(p => p.price * 0.9) // 10% discount
  .reduce((sum, price) => sum + price, 0);</code></pre>
      <p><strong>Best practice:</strong> Each method returns a new array, so you can chain them. Read from top to bottom to understand the transformation.</p>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Forgetting return in map/filter:</strong> Always return a value from the callback</li>
        <li><strong>Mutating original array:</strong> These methods don't mutate - don't modify elements inside callbacks</li>
        <li><strong>Not providing initial value to reduce:</strong> Can cause errors with empty arrays</li>
        <li><strong>Over-chaining:</strong> Sometimes a simple loop is clearer than long chains</li>
        <li><strong>Confusing map and forEach:</strong> <code>map</code> returns new array, <code>forEach</code> returns undefined</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use <code>map</code> when you need to transform every element</li>
        <li>Use <code>filter</code> when you need to select elements</li>
        <li>Use <code>reduce</code> when you need to accumulate or aggregate</li>
        <li>Chain methods for readability, but don't overdo it</li>
        <li>Always provide initial value to <code>reduce</code> for clarity</li>
        <li>Use descriptive variable names in callbacks</li>
        <li>Consider performance for very large arrays (methods create new arrays)</li>
      </ul>
    `,
    examples: [
      {
        title: 'Transforming Data with map',
        code: `const users = [{name: "Alice"}, {name: "Bob"}];
const names = users.map(u => u.name);
console.log(names); // ["Alice", "Bob"]`,
        explanation: 'Map transforms each element using the provided function.'
      },
      {
        title: 'Filter and Reduce',
        code: `const products = [{price: 100}, {price: 50}, {price: 200}];
const total = products
  .filter(p => p.price >= 100)
  .reduce((sum, p) => sum + p.price, 0);
console.log(total); // 300`,
        explanation: 'Chain filter and reduce to calculate totals.'
      }
    ],
    exercise: {
      description: 'Create a function that takes an array of objects with `name` and `score`, returns names of people who scored above average, sorted alphabetically.',
      starterCode: `function solution(people) {
  // Your code here
}`,
      hints: ['Calculate average with reduce', 'Filter above average', 'Map to names']
    },
    tests: [
      { id: 'test-1', description: 'Above average sorted', input: [[{ name: 'Alice', score: 90 }, { name: 'Bob', score: 70 }, { name: 'Charlie', score: 80 }, { name: 'David', score: 60 }]], expectedOutput: ['Alice', 'Charlie'], isHidden: false },
      { id: 'test-2', description: 'Single person', input: [[{ name: 'Alice', score: 100 }]], expectedOutput: [], isHidden: false },
      { id: 'test-3', description: 'Sort alphabetically', input: [[{ name: 'Zoe', score: 100 }, { name: 'Alice', score: 100 }, { name: 'Mike', score: 50 }]], expectedOutput: ['Alice', 'Zoe'], isHidden: false },
      { id: 'test-4', description: 'All same scores', input: [[{ name: 'A', score: 80 }, { name: 'B', score: 80 }]], expectedOutput: [], isHidden: true },
      { id: 'test-5', description: 'Empty array', input: [[]], expectedOutput: [], isHidden: true }
    ],
    solution: `function solution(people) {
  if (people.length === 0) return [];
  const avg = people.reduce((s, p) => s + p.score, 0) / people.length;
  return people.filter(p => p.score > avg).map(p => p.name).sort();
}`,
    difficulty: 4,
    estimatedMinutes: 30
  },

  // ============== DAY 6 ==============
  {
    language: 'javascript',
    day: 6,
    title: 'Strings and Template Literals',
    objectives: [
      'Master string manipulation methods',
      'Use template literals for string interpolation',
      'Work with string searching and extraction',
      'Understand string immutability'
    ],
    contentHtml: `
      <h2>Strings and Template Literals</h2>
      <p>Strings are sequences of characters used to represent text. In JavaScript, strings are immutable (cannot be changed), so methods return new strings rather than modifying the original. Template literals (introduced in ES6) provide a powerful way to create strings with embedded expressions.</p>
      
      <h3>Why Strings Matter</h3>
      <p>Strings are essential for:</p>
      <ul>
        <li><strong>Displaying text:</strong> User interfaces, messages, labels</li>
        <li><strong>Data processing:</strong> Parsing, formatting, validation</li>
        <li><strong>Communication:</strong> API requests, URLs, file paths</li>
        <li><strong>Data storage:</strong> JSON, configuration files</li>
      </ul>
      
      <h3>String Immutability</h3>
      <p>Strings in JavaScript are immutable - once created, they cannot be changed:</p>
      <pre><code>let str = "Hello";
str[0] = "h"; // This does nothing!
console.log(str); // Still "Hello"

// To "change" a string, you create a new one
str = str.toLowerCase(); // Creates new string "hello"
str = str.replace("h", "H"); // Creates new string "Hello"</code></pre>
      
      <h3>Essential String Methods</h3>
      <p>JavaScript provides many methods for working with strings:</p>
      <pre><code>const str = "Hello, World!";

// Case conversion
str.toUpperCase();    // "HELLO, WORLD!"
str.toLowerCase();    // "hello, world!"

// Trimming whitespace
"  hello  ".trim();        // "hello"
"  hello  ".trimStart();   // "hello  "
"  hello  ".trimEnd();     // "  hello"

// Searching
str.includes("World");     // true
str.startsWith("Hello");   // true
str.endsWith("!");         // true
str.indexOf("World");      // 7 (position)
str.lastIndexOf("l");      // 10

// Extracting substrings
str.slice(0, 5);           // "Hello" (start, end)
str.substring(0, 5);        // "Hello" (similar to slice)
str.substr(0, 5);          // "Hello" (deprecated)

// Splitting and joining
str.split(", ");           // ["Hello", "World!"]
str.split("");             // ["H", "e", "l", "l", "o", ...]
["Hello", "World"].join(", "); // "Hello, World"

// Replacing
str.replace("World", "JavaScript"); // "Hello, JavaScript!"
str.replaceAll("l", "L");  // "HeLLo, WorLd!" (ES2021)

// Padding
"5".padStart(3, "0");      // "005"
"5".padEnd(3, "0");        // "500"

// Repeating
"ha".repeat(3);             // "hahaha"</code></pre>
      
      <h3>Template Literals</h3>
      <p>Template literals (backticks) allow embedded expressions and multi-line strings:</p>
      <pre><code>const name = "Alice";
const age = 30;

// Basic interpolation
const greeting = \`Hello, \${name}!\`;
// "Hello, Alice!"

// Expressions
const message = \`\${name} is \${age} years old.\`;
// "Alice is 30 years old."

// Multi-line strings
const multiLine = \`
  Line 1
  Line 2
  Line 3
\`;

// Expressions can be complex
const price = 19.99;
const tax = 0.1;
const total = \`Total: $\${(price * (1 + tax)).toFixed(2)}\`;
// "Total: $21.99"

// Nested template literals
const users = ["Alice", "Bob"];
const list = \`
  Users:
  \${users.map(u => \`- \${u}\`).join("\\n")}
\`;

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : "");
  }, "");
}
const highlighted = highlight\`Hello \${name}!\`;</code></pre>
      
      <h3>String Comparison and Validation</h3>
      <pre><code>// Comparison
"apple" < "banana";        // true (lexicographic)
"Apple" < "apple";        // true (uppercase < lowercase)

// Case-insensitive comparison
"Hello".toLowerCase() === "hello".toLowerCase(); // true

// Checking if string is empty
const str = "";
str.length === 0;          // true
str === "";                // true

// Checking if string contains only whitespace
"   ".trim().length === 0; // true

// Validating format
const email = "user@example.com";
email.includes("@");       // true
email.split("@").length === 2; // true</code></pre>
      
      <h3>Common String Patterns</h3>
      <pre><code>// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
capitalize("hello"); // "Hello"

// Reverse a string
function reverse(str) {
  return str.split("").reverse().join("");
}
reverse("hello"); // "olleh"

// Count occurrences
function countOccurrences(str, char) {
  return str.split(char).length - 1;
}
countOccurrences("hello", "l"); // 2

// Remove duplicates
function removeDuplicates(str) {
  return [...new Set(str)].join("");
}
removeDuplicates("hello"); // "helo"</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Confusing == and ===:</strong> Always use strict equality for strings</li>
        <li><strong>Modifying strings:</strong> Remember strings are immutable - methods return new strings</li>
        <li><strong>Forgetting trim:</strong> User input often has extra whitespace</li>
        <li><strong>Case sensitivity:</strong> "Hello" !== "hello" - normalize case when comparing</li>
        <li><strong>String vs number:</strong> "5" + 3 = "53", not 8</li>
        <li><strong>Using + for concatenation:</strong> Template literals are cleaner for complex strings</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use template literals instead of string concatenation with <code>+</code></li>
        <li>Always trim user input before processing</li>
        <li>Use <code>includes()</code> instead of <code>indexOf() !== -1</code></li>
        <li>Normalize case when comparing user input</li>
        <li>Use <code>slice()</code> instead of <code>substring()</code> (more intuitive)</li>
        <li>Be careful with special characters - consider encoding/escaping</li>
        <li>Validate string length before processing very long strings</li>
      </ul>
    `,
    examples: [
      {
        title: 'String Cleaning',
        code: `const email = "  USER@Example.COM  ";
const clean = email.trim().toLowerCase();
console.log(clean); // "user@example.com"`,
        explanation: 'Chain methods to clean and normalize strings.'
      },
      {
        title: 'Template Literals',
        code: `const items = ["a", "b", "c"];
const list = items.map((item, i) => 
  \`\${i + 1}. \${item}\`
).join("\\n");`,
        explanation: 'Template literals can contain expressions.'
      }
    ],
    exercise: {
      description: 'Create a function that converts a string to a URL slug: lowercase, spaces to hyphens, only alphanumeric and hyphens.',
      starterCode: `function solution(str) {
  // Your code here
}`,
      hints: ['toLowerCase first', 'Replace special chars with regex', 'Replace spaces with hyphens']
    },
    tests: [
      { id: 'test-1', description: 'Basic title', input: 'Hello World', expectedOutput: 'hello-world', isHidden: false },
      { id: 'test-2', description: 'Special chars', input: 'Hello, World!', expectedOutput: 'hello-world', isHidden: false },
      { id: 'test-3', description: 'Multiple spaces', input: 'Hello   World', expectedOutput: 'hello-world', isHidden: false },
      { id: 'test-4', description: 'Leading/trailing', input: '  Hello World  ', expectedOutput: 'hello-world', isHidden: true },
      { id: 'test-5', description: 'Numbers', input: 'Top 10 Tips', expectedOutput: 'top-10-tips', isHidden: true },
      { id: 'test-6', description: 'Complex', input: 'This is a TEST!!! #123', expectedOutput: 'this-is-a-test-123', isHidden: true }
    ],
    solution: `function solution(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}`,
    difficulty: 4,
    estimatedMinutes: 25
  },

  // ============== DAY 7 ==============
  {
    language: 'javascript',
    day: 7,
    title: 'Error Handling and Debugging',
    objectives: [
      'Use try-catch blocks for error handling',
      'Throw custom errors',
      'Understand error types',
      'Learn debugging strategies'
    ],
    contentHtml: `
      <h2>Error Handling and Debugging</h2>
      <p>Error handling is crucial for building robust applications. JavaScript provides try-catch blocks to handle errors gracefully, preventing your program from crashing. Understanding how to handle errors properly separates professional code from amateur code.</p>
      
      <h3>Why Error Handling Matters</h3>
      <p>Proper error handling enables you to:</p>
      <ul>
        <li><strong>Prevent crashes:</strong> Catch errors before they break your application</li>
        <li><strong>Provide user feedback:</strong> Show meaningful error messages</li>
        <li><strong>Debug effectively:</strong> Understand what went wrong and where</li>
        <li><strong>Maintain code quality:</strong> Handle edge cases and unexpected situations</li>
      </ul>
      
      <h3>Try-Catch Blocks</h3>
      <p>The try-catch statement allows you to test code and handle errors:</p>
      <pre><code>// Basic try-catch
try {
  riskyOperation();
  console.log("Success!");
} catch (error) {
  console.error("Error occurred:", error.message);
}

// Accessing error properties
try {
  JSON.parse("invalid json");
} catch (error) {
  console.error(error.name);     // "SyntaxError"
  console.error(error.message);  // "Unexpected token i in JSON..."
  console.error(error.stack);    // Stack trace
}

// Multiple catch blocks (not in JavaScript, but you can check error type)
try {
  // risky code
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Type error:", error.message);
  } else if (error instanceof RangeError) {
    console.error("Range error:", error.message);
  } else {
    console.error("Unknown error:", error.message);
  }
}</code></pre>
      
      <h3>Finally Blocks</h3>
      <p>The <code>finally</code> block always executes, regardless of whether an error occurred:</p>
      <pre><code>let connection = null;
try {
  connection = openDatabase();
  // use connection
} catch (error) {
  console.error("Database error:", error);
} finally {
  // Always cleanup, even if error occurred
  if (connection) {
    connection.close();
  }
}

// Finally runs even with return statements
function example() {
  try {
    return "success";
  } catch (error) {
    return "error";
  } finally {
    console.log("This always runs!");
  }
}</code></pre>
      
      <h3>Throwing Errors</h3>
      <p>You can throw custom errors to signal problems in your code:</p>
      <pre><code>// Basic error throwing
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

// Using the function
try {
  const result = divide(10, 0);
} catch (error) {
  console.error(error.message); // "Division by zero is not allowed"
}

// Custom error with more context
function validateAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number");
  }
  if (age < 0) {
    throw new RangeError("Age cannot be negative");
  }
  if (age > 150) {
    throw new RangeError("Age seems unrealistic");
  }
  return true;
}</code></pre>
      
      <h3>Error Types</h3>
      <p>JavaScript has several built-in error types:</p>
      <pre><code>// TypeError - wrong type
throw new TypeError("Expected a number, got string");

// RangeError - value out of range
throw new RangeError("Array index out of range");

// ReferenceError - variable doesn't exist
throw new ReferenceError("Variable is not defined");

// SyntaxError - invalid syntax (usually caught by parser)
// throw new SyntaxError("Unexpected token");

// Custom Error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Invalid input");</code></pre>
      
      <h3>Error Handling Patterns</h3>
      <pre><code>// Pattern 1: Return error object instead of throwing
function safeDivide(a, b) {
  if (b === 0) {
    return { error: true, message: "Division by zero" };
  }
  return { error: false, value: a / b };
}

// Pattern 2: Try-catch wrapper
function safeOperation(operation) {
  try {
    return { success: true, data: operation() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Pattern 3: Async error handling
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}</code></pre>
      
      <h3>Debugging Strategies</h3>
      <pre><code>// Console methods
console.log("Debug info:", variable);        // General logging
console.error("Error:", error);              // Error logging
console.warn("Warning:", message);           // Warning
console.table(data);                         // Table view
console.group("Group");                      // Grouped logs
console.time("label");                       // Timing
// ... code ...
console.timeEnd("label");                    // End timing

// Debugger statement
function complexFunction() {
  debugger; // Execution pauses here in dev tools
  // ... code ...
}

// Assertions
function assert(condition, message) {
  if (!condition) {
    throw new Error(\`Assertion failed: \${message}\`);
  }
}

assert(x > 0, "x must be positive");</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Swallowing errors:</strong> Don't catch errors and do nothing - log them at minimum</li>
        <li><strong>Catching too broadly:</strong> Catch specific errors, not all errors</li>
        <li><strong>Not providing context:</strong> Error messages should explain what went wrong</li>
        <li><strong>Throwing strings:</strong> Always throw Error objects, not strings</li>
        <li><strong>Forgetting finally:</strong> Use finally for cleanup operations</li>
        <li><strong>Nested try-catch:</strong> Can make code hard to follow - consider refactoring</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Always handle errors that can occur in your code</li>
        <li>Provide meaningful error messages that help users or developers</li>
        <li>Log errors for debugging but don't expose sensitive information</li>
        <li>Use specific error types when appropriate</li>
        <li>Clean up resources in finally blocks</li>
        <li>Don't catch errors you can't handle - let them propagate</li>
        <li>Validate input early to prevent errors later</li>
        <li>Use error boundaries in React for component-level error handling</li>
      </ul>
    `,
    examples: [
      {
        title: 'Safe JSON Parsing',
        code: `function parseJSON(str) {
  try {
    return { success: true, data: JSON.parse(str) };
  } catch (e) {
    return { success: false, error: e.message };
  }
}`,
        explanation: 'Return result objects for safer error handling.'
      },
      {
        title: 'Input Validation',
        code: `function createUser(name, age) {
  if (!name) throw new TypeError('Name required');
  if (age < 0) throw new RangeError('Age must be positive');
  return { name, age };
}`,
        explanation: 'Throw specific error types for validation.'
      }
    ],
    exercise: {
      description: 'Create a function that takes an object with `data` (array of numbers) and `operation` ("sum"/"product"/"average"), returns result or error object.',
      starterCode: `function solution(input) {
  // Your code here
}`,
      hints: ['Validate input properties', 'Return {error: true, message: "..."} on error', 'Handle empty arrays']
    },
    tests: [
      { id: 'test-1', description: 'Calculate sum', input: { data: [1, 2, 3, 4], operation: 'sum' }, expectedOutput: 10, isHidden: false },
      { id: 'test-2', description: 'Calculate product', input: { data: [2, 3, 4], operation: 'product' }, expectedOutput: 24, isHidden: false },
      { id: 'test-3', description: 'Calculate average', input: { data: [10, 20, 30], operation: 'average' }, expectedOutput: 20, isHidden: false },
      { id: 'test-4', description: 'Missing data', input: { operation: 'sum' }, expectedOutput: { error: true, message: 'Data is required' }, isHidden: true },
      { id: 'test-5', description: 'Invalid operation', input: { data: [1, 2], operation: 'invalid' }, expectedOutput: { error: true, message: 'Invalid operation' }, isHidden: true },
      { id: 'test-6', description: 'Empty array', input: { data: [], operation: 'sum' }, expectedOutput: { error: true, message: 'Data cannot be empty' }, isHidden: true }
    ],
    solution: `function solution(input) {
  if (!input.data) return {error:true,message:'Data is required'};
  if (!Array.isArray(input.data)) return {error:true,message:'Data must be an array'};
  if (input.data.length === 0) return {error:true,message:'Data cannot be empty'};
  switch (input.operation) {
    case 'sum': return input.data.reduce((a,b) => a+b, 0);
    case 'product': return input.data.reduce((a,b) => a*b, 1);
    case 'average': return input.data.reduce((a,b) => a+b, 0) / input.data.length;
    default: return {error:true,message:'Invalid operation'};
  }
}`,
    difficulty: 5,
    estimatedMinutes: 35
  },

  // ============== DAY 8 ==============
  {
    language: 'javascript',
    day: 8,
    title: 'Spread and Rest Operators',
    objectives: [
      'Master the spread operator for arrays and objects',
      'Use rest parameters in function definitions',
      'Combine and clone data structures',
      'Understand the difference between spread and rest'
    ],
    contentHtml: `
      <h2>Spread and Rest Operators in JavaScript</h2>
      <p>The spread (<code>...</code>) and rest operators use the same syntax but serve different purposes. Understanding when to use each is crucial for writing modern, clean JavaScript code. These operators make working with arrays and objects much more elegant.</p>
      
      <h3>Why Spread and Rest Matter</h3>
      <p>These operators enable you to:</p>
      <ul>
        <li><strong>Clone data:</strong> Create copies without mutation</li>
        <li><strong>Combine structures:</strong> Merge arrays and objects elegantly</li>
        <li><strong>Handle variable arguments:</strong> Accept any number of parameters</li>
        <li><strong>Extract values:</strong> Pull out specific elements while keeping the rest</li>
      </ul>
      
      <h3>Spread Operator - Expanding Values</h3>
      <p>The spread operator expands iterables (arrays, strings, objects) into individual elements:</p>
      <pre><code>// Array Spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combining arrays
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const withExtra = [...arr1, 0, ...arr2, 7]; // [1, 2, 3, 0, 4, 5, 6, 7]

// Cloning arrays (shallow copy)
const copy = [...arr1]; // [1, 2, 3] - new array, not reference
arr1.push(4);
console.log(copy); // Still [1, 2, 3]

// Spreading strings
const chars = [..."hello"]; // ["h", "e", "l", "l", "o"]

// Spreading in function calls
const numbers = [1, 2, 3];
Math.max(...numbers); // 3 (equivalent to Math.max(1, 2, 3))</code></pre>
      
      <h3>Object Spread</h3>
      <p>Object spread creates new objects by copying properties:</p>
      <pre><code>// Merging objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3 }

// Updating properties
const updated = { ...obj1, b: 99 }; // { a: 1, b: 99 }
const added = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Cloning objects (shallow copy)
const original = { name: "Alice", address: { city: "NYC" } };
const clone = { ...original };
clone.name = "Bob";
console.log(original.name); // "Alice" (primitive copied)
clone.address.city = "LA";
console.log(original.address.city); // "LA" (nested object is reference!)

// Order matters - later spreads override earlier ones
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs }; // { theme: "dark", fontSize: 14 }</code></pre>
      <p><strong>Important:</strong> Object spread creates shallow copies. Nested objects are still references.</p>
      
      <h3>Rest Parameters - Collecting Arguments</h3>
      <p>Rest parameters collect remaining function arguments into an array:</p>
      <pre><code>// Collecting all arguments
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
sum(10, 20); // 30
sum(); // 0

// Rest must be last parameter
function greet(greeting, ...names) {
  return names.map(n => \`\${greeting}, \${n}!\`);
}
greet("Hello", "Alice", "Bob", "Charlie");
// ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"]

// Rest vs arguments object
function oldWay() {
  const args = Array.from(arguments); // Old way
  return args.reduce((a, b) => a + b, 0);
}

function newWay(...args) { // Modern way
  return args.reduce((a, b) => a + b, 0);
}</code></pre>
      <p><strong>Key difference:</strong> Rest parameters create a real array, while <code>arguments</code> is array-like.</p>
      
      <h3>Rest in Destructuring</h3>
      <p>Rest can collect remaining elements during destructuring:</p>
      <pre><code>// Array destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

const [head, ...tail] = [1, 2, 3];
// head = 1, tail = [2, 3]

// Skipping elements
const [a, , c, ...rest] = [1, 2, 3, 4, 5];
// a = 1, c = 3, rest = [4, 5]

// Object destructuring with rest
const { a, ...others } = { a: 1, b: 2, c: 3 };
// a = 1, others = { b: 2, c: 3 }

const { name, ...rest } = { name: "Alice", age: 30, city: "NYC" };
// name = "Alice", rest = { age: 30, city: "NYC" }</code></pre>
      
      <h3>Common Patterns</h3>
      <pre><code>// Pattern 1: Default parameters with rest
function createUser(name, ...tags) {
  return { name, tags };
}

// Pattern 2: Merging with defaults
function createConfig(userConfig) {
  const defaults = { theme: "light", lang: "en" };
  return { ...defaults, ...userConfig };
}

// Pattern 3: Removing properties
const { password, ...safeUser } = user;
// safeUser has all properties except password

// Pattern 4: Array manipulation
const [first, ...middle, last] = [1, 2, 3, 4, 5]; // ERROR! Rest must be last
const [first, ...middle] = [1, 2, 3, 4];
const last = middle.pop(); // Correct way</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Rest not last:</strong> Rest parameter must be the last parameter</li>
        <li><strong>Shallow copy confusion:</strong> Spread only copies one level deep</li>
        <li><strong>Spreading non-iterables:</strong> Can't spread numbers, booleans, null, undefined</li>
        <li><strong>Confusing spread and rest:</strong> Same syntax, different contexts</li>
        <li><strong>Performance:</strong> Spread creates new arrays/objects - consider for large data</li>
        <li><strong>Order matters:</strong> Later spreads override earlier ones</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use spread for cloning and merging (prefer over Object.assign)</li>
        <li>Use rest parameters instead of arguments object</li>
        <li>Remember rest must be the last parameter</li>
        <li>Use spread in function calls to pass array elements as arguments</li>
        <li>Be aware of shallow copy limitations for nested structures</li>
        <li>Use rest in destructuring to collect remaining elements</li>
        <li>Consider performance when spreading large arrays/objects</li>
      </ul>
    `,
    examples: [
      {
        title: 'Cloning and Merging Objects',
        code: `const defaults = { theme: 'light', fontSize: 14 };
const userPrefs = { theme: 'dark' };
const settings = { ...defaults, ...userPrefs };
console.log(settings); 
// { theme: 'dark', fontSize: 14 }`,
        explanation: 'Later spreads override earlier ones with the same keys.'
      },
      {
        title: 'Variable Arguments Function',
        code: `function multiply(multiplier, ...numbers) {
  return numbers.map(n => n * multiplier);
}
console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]`,
        explanation: 'Rest parameters collect remaining arguments after the first.'
      }
    ],
    exercise: {
      description: 'Create a function `solution(operation, ...args)` where operation is "merge" (merge all objects into one) or "concat" (concatenate all arrays into one).',
      starterCode: `function solution(operation, ...args) {
  // Your code here
}`,
      hints: ['Use spread in reduce', 'For merge, spread objects', 'For concat, spread arrays']
    },
    tests: [
      { id: 'test-1', description: 'Merge objects', input: ['merge', { a: 1 }, { b: 2 }, { c: 3 }], expectedOutput: { a: 1, b: 2, c: 3 }, isHidden: false },
      { id: 'test-2', description: 'Concat arrays', input: ['concat', [1, 2], [3, 4], [5]], expectedOutput: [1, 2, 3, 4, 5], isHidden: false },
      { id: 'test-3', description: 'Merge with override', input: ['merge', { a: 1 }, { a: 2 }], expectedOutput: { a: 2 }, isHidden: false },
      { id: 'test-4', description: 'Empty merge', input: ['merge'], expectedOutput: {}, isHidden: true },
      { id: 'test-5', description: 'Empty concat', input: ['concat'], expectedOutput: [], isHidden: true },
      { id: 'test-6', description: 'Single item', input: ['merge', { x: 10 }], expectedOutput: { x: 10 }, isHidden: true }
    ],
    solution: `function solution(operation, ...args) {
  if (operation === 'merge') {
    return args.reduce((acc, obj) => ({...acc, ...obj}), {});
  }
  if (operation === 'concat') {
    return args.reduce((acc, arr) => [...acc, ...arr], []);
  }
  return null;
}`,
    difficulty: 4,
    estimatedMinutes: 25
  },

  // ============== DAY 9 ==============
  {
    language: 'javascript',
    day: 9,
    title: 'Destructuring Deep Dive',
    objectives: [
      'Master array destructuring',
      'Master object destructuring',
      'Use nested destructuring',
      'Apply destructuring in function parameters'
    ],
    contentHtml: `
      <h2>Destructuring Deep Dive</h2>
      <p>Destructuring is a powerful JavaScript feature that allows you to extract values from arrays and objects into distinct variables. It makes code more readable and concise, reducing the need for verbose property access and array indexing.</p>
      
      <h3>Why Destructuring Matters</h3>
      <p>Destructuring enables you to:</p>
      <ul>
        <li><strong>Write cleaner code:</strong> Extract values in one line instead of multiple</li>
        <li><strong>Improve readability:</strong> Clearly show what data you're using</li>
        <li><strong>Handle function parameters:</strong> Accept objects/arrays as parameters elegantly</li>
        <li><strong>Swap variables:</strong> Exchange values without temporary variables</li>
      </ul>
      
      <h3>Array Destructuring</h3>
      <p>Extract values from arrays by position:</p>
      <pre><code>// Basic destructuring
const [a, b, c] = [1, 2, 3];
// a = 1, b = 2, c = 3

// Skipping elements
const [first, , third] = [1, 2, 3];
// first = 1, third = 3 (skipped index 1)

// Default values
const [x = 0, y = 0] = [1];
// x = 1, y = 0 (default used)

// Rest pattern (collect remaining)
const [head, ...tail] = [1, 2, 3, 4, 5];
// head = 1, tail = [2, 3, 4, 5]

// Nested arrays
const [[a, b], [c, d]] = [[1, 2], [3, 4]];
// a = 1, b = 2, c = 3, d = 4

// Swapping variables (elegant!)
let a = 1, b = 2;
[a, b] = [b, a];
// a = 2, b = 1</code></pre>
      
      <h3>Object Destructuring</h3>
      <p>Extract properties from objects by name:</p>
      <pre><code>// Basic destructuring
const { name, age } = { name: 'Alice', age: 30 };
// name = 'Alice', age = 30

// Renaming variables
const { name: userName, age: userAge } = { name: 'Bob', age: 25 };
// userName = 'Bob', userAge = 25

// Default values
const { name, age = 0 } = { name: 'Charlie' };
// name = 'Charlie', age = 0 (default)

// Combining rename and default
const { name: userName = 'Anonymous' } = {};
// userName = 'Anonymous'

// Nested destructuring
const user = {
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' }
};
const { address: { city, zip } } = user;
// city = 'NYC', zip = '10001'

// Deep nesting
const { x: { y: { z } } } = { x: { y: { z: 5 } } };
// z = 5</code></pre>
      
      <h3>Function Parameter Destructuring</h3>
      <p>Destructure directly in function parameters:</p>
      <pre><code>// Object parameter destructuring
function greet({ name, greeting = 'Hello' }) {
  return \`\${greeting}, \${name}!\`;
}
greet({ name: 'Alice' }); // "Hello, Alice!"
greet({ name: 'Bob', greeting: 'Hi' }); // "Hi, Bob!"

// Array parameter destructuring
function sum([a, b]) {
  return a + b;
}
sum([5, 3]); // 8

// Nested parameter destructuring
function processUser({ name, address: { city } }) {
  return \`\${name} lives in \${city}\`;
}
processUser({ name: 'Alice', address: { city: 'NYC' } });
// "Alice lives in NYC"

// Rest in parameters
function processData(first, ...rest) {
  return { first, rest };
}
processData(1, 2, 3, 4); // { first: 1, rest: [2, 3, 4] }</code></pre>
      
      <h3>Common Patterns</h3>
      <pre><code>// Pattern 1: Extracting specific properties
const { id, email } = user;
// Use only what you need

// Pattern 2: Providing defaults
function createConfig({ timeout = 5000, retries = 3 } = {}) {
  return { timeout, retries };
}
createConfig(); // { timeout: 5000, retries: 3 }
createConfig({ timeout: 10000 }); // { timeout: 10000, retries: 3 }

// Pattern 3: Rest to collect remaining
const { password, ...safeUser } = user;
// safeUser has all properties except password

// Pattern 4: Multiple return values
function getCoordinates() {
  return [10, 20];
}
const [x, y] = getCoordinates();

// Pattern 5: Destructuring in loops
const users = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }];
for (const { name, age } of users) {
  console.log(\`\${name} is \${age}\`);
}</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Destructuring undefined:</strong> Always provide defaults or check if value exists</li>
        <li><strong>Wrong property names:</strong> Object destructuring uses property names, not positions</li>
        <li><strong>Missing brackets/braces:</strong> Arrays use <code>[]</code>, objects use <code>{}</code></li>
        <li><strong>Rest not last:</strong> Rest element must be last in destructuring</li>
        <li><strong>Nested confusion:</strong> Be careful with nested destructuring syntax</li>
        <li><strong>Default vs rename:</strong> <code>{ a: b }</code> renames, <code>{ a = b }</code> defaults</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use destructuring for function parameters when accepting objects/arrays</li>
        <li>Provide defaults for optional properties</li>
        <li>Use rest to collect remaining elements</li>
        <li>Destructure only what you need - improves readability</li>
        <li>Use renaming when property names conflict with variable names</li>
        <li>Be careful with nested destructuring - can become hard to read</li>
        <li>Consider destructuring in loops for cleaner iteration</li>
      </ul>
    `,
    examples: [
      {
        title: 'Swapping Variables',
        code: `let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1`,
        explanation: 'Destructuring enables elegant variable swapping.'
      },
      {
        title: 'Extracting Nested Data',
        code: `const user = {
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' }
};
const { address: { city } } = user;
console.log(city); // 'NYC'`,
        explanation: 'Nested destructuring extracts deep values.'
      }
    ],
    exercise: {
      description: 'Create a function that takes a user object with nested `profile` and returns a formatted string using destructuring.',
      starterCode: `function solution(user) {
  // user has: { id, profile: { firstName, lastName, age } }
  // Return: "firstName lastName (age years old)"
}`,
      hints: ['Use nested destructuring', 'Extract profile properties', 'Use template literals']
    },
    tests: [
      { id: 'test-1', description: 'Format user', input: { id: 1, profile: { firstName: 'John', lastName: 'Doe', age: 30 } }, expectedOutput: 'John Doe (30 years old)', isHidden: false },
      { id: 'test-2', description: 'Different user', input: { id: 2, profile: { firstName: 'Jane', lastName: 'Smith', age: 25 } }, expectedOutput: 'Jane Smith (25 years old)', isHidden: false },
      { id: 'test-3', description: 'Young user', input: { id: 3, profile: { firstName: 'Baby', lastName: 'User', age: 1 } }, expectedOutput: 'Baby User (1 years old)', isHidden: false },
      { id: 'test-4', description: 'Long name', input: { id: 4, profile: { firstName: 'Alexander', lastName: 'Hamilton', age: 47 } }, expectedOutput: 'Alexander Hamilton (47 years old)', isHidden: true },
      { id: 'test-5', description: 'Zero age', input: { id: 5, profile: { firstName: 'New', lastName: 'Born', age: 0 } }, expectedOutput: 'New Born (0 years old)', isHidden: true }
    ],
    solution: `function solution(user) {
  const { profile: { firstName, lastName, age } } = user;
  return \`\${firstName} \${lastName} (\${age} years old)\`;
}`,
    difficulty: 4,
    estimatedMinutes: 25
  },

  // ============== DAY 10 ==============
  {
    language: 'javascript',
    day: 10,
    title: 'Closures and Scope',
    objectives: [
      'Understand lexical scope',
      'Create and use closures',
      'Implement private state with closures',
      'Recognize closure patterns in real code'
    ],
    contentHtml: `
      <h2>Closures and Scope in JavaScript</h2>
      <p>Closures are one of JavaScript's most powerful features. A closure gives you access to an outer function's scope from an inner function. Understanding closures is essential for writing advanced JavaScript and is fundamental to how JavaScript works.</p>
      
      <h3>Why Closures Matter</h3>
      <p>Closures enable you to:</p>
      <ul>
        <li><strong>Create private variables:</strong> Encapsulate data that can't be accessed directly</li>
        <li><strong>Build function factories:</strong> Create specialized functions dynamically</li>
        <li><strong>Implement modules:</strong> Create self-contained code blocks</li>
        <li><strong>Handle callbacks:</strong> Maintain context in asynchronous code</li>
      </ul>
      
      <h3>Lexical Scope</h3>
      <p>JavaScript uses lexical (static) scoping - functions can access variables from their outer scope:</p>
      <pre><code>// Outer scope
const outer = 'I am outer';

function inner() {
  console.log(outer); // Accessible! Function can see outer scope
}

inner(); // "I am outer"

// Nested scopes
function outerFunction() {
  const outerVar = 'outer';
  
  function innerFunction() {
    const innerVar = 'inner';
    console.log(outerVar); // Can access outer scope
    console.log(innerVar); // Can access own scope
  }
  
  innerFunction();
  // console.log(innerVar); // ERROR! Can't access inner scope
}

outerFunction();</code></pre>
      <p><strong>Key point:</strong> Inner functions have access to outer scope, but outer functions cannot access inner scope.</p>
      
      <h3>What is a Closure?</h3>
      <p>A closure is a function that "remembers" its outer scope even after the outer function has finished executing:</p>
      <pre><code>function createCounter() {
  let count = 0; // This variable is "closed over"
  
  return function() {
    count++; // Inner function accesses outer variable
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3

// Each call to createCounter creates a NEW closure
const counter2 = createCounter();
counter2(); // 1 (independent from counter)
counter(); // 4 (still works, separate closure)</code></pre>
      <p><strong>How it works:</strong> The inner function maintains a reference to the outer function's variables, keeping them alive even after the outer function returns.</p>
      
      <h3>Private State Pattern</h3>
      <p>Closures enable true private variables (before ES6 private fields):</p>
      <pre><code>function createBankAccount(initial) {
  let balance = initial; // Private - not accessible from outside
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);
account.getBalance(); // 150
// account.balance; // undefined - balance is private!
// balance; // ERROR - balance doesn't exist in this scope</code></pre>
      
      <h3>Function Factories</h3>
      <p>Closures enable creating specialized functions:</p>
      <pre><code>// Create multiplier functions
function multiplier(factor) {
  return function(number) {
    return number * factor; // factor is "closed over"
  };
}

const double = multiplier(2);
const triple = multiplier(3);

double(5); // 10
triple(5); // 15

// Each closure remembers its own factor value
const timesTen = multiplier(10);
timesTen(7); // 70

// Creating specialized validators
function createValidator(min, max) {
  return function(value) {
    return value >= min && value <= max;
  };
}

const ageValidator = createValidator(0, 150);
const scoreValidator = createValidator(0, 100);

ageValidator(25); // true
scoreValidator(150); // false</code></pre>
      
      <h3>Common Closure Patterns</h3>
      <pre><code>// Pattern 1: Memoization
function memoize(fn) {
  const cache = {}; // Private cache
  
  return function(arg) {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}

const expensiveFunction = memoize((n) => {
  // Expensive calculation
  return n * n;
});

// Pattern 2: Module pattern
const calculator = (function() {
  let result = 0; // Private state
  
  return {
    add(x) { result += x; return this; },
    multiply(x) { result *= x; return this; },
    getResult() { return result; },
    reset() { result = 0; return this; }
  };
})();

calculator.add(5).multiply(3).getResult(); // 15

// Pattern 3: Event handlers with data
function setupButton(buttonId, message) {
  document.getElementById(buttonId).addEventListener('click', function() {
    alert(message); // message is closed over
  });
}

setupButton('btn1', 'Hello');
setupButton('btn2', 'World');</code></pre>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Loop variable capture:</strong> Variables in loops are shared across iterations</li>
        <li><strong>Memory leaks:</strong> Closures keep references alive - be careful with DOM elements</li>
        <li><strong>Unexpected behavior:</strong> Closures capture variables by reference, not value</li>
        <li><strong>Performance:</strong> Too many closures can impact performance</li>
        <li><strong>Confusing scope:</strong> Understanding which variables are accessible</li>
      </ul>
      
      <h3>Loop Variable Gotcha</h3>
      <pre><code>// PROBLEM: All functions reference the same i
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i; // All return 3!
  });
}
functions[0](); // 3 (not 0!)

// SOLUTION 1: Use let (block scope)
const functions2 = [];
for (let i = 0; i < 3; i++) {
  functions2.push(function() {
    return i; // Each closure has its own i
  });
}
functions2[0](); // 0 ✓

// SOLUTION 2: IIFE (Immediately Invoked Function Expression)
const functions3 = [];
for (var i = 0; i < 3; i++) {
  functions3.push((function(j) {
    return function() {
      return j; // j is captured in closure
    };
  })(i));
}
functions3[0](); // 0 ✓</code></pre>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Use closures for data privacy and encapsulation</li>
        <li>Be aware of memory implications - closures keep references alive</li>
        <li>Use <code>let</code> or <code>const</code> in loops to avoid closure issues</li>
        <li>Consider using ES6 classes with private fields for better encapsulation</li>
        <li>Use closures for function factories and specialized functions</li>
        <li>Be mindful of performance with many closures</li>
        <li>Document closure behavior when it's not obvious</li>
      </ul>
    `,
    examples: [
      {
        title: 'Function Factory',
        code: `function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15`,
        explanation: 'Each returned function "closes over" its own factor value.'
      },
      {
        title: 'Memoization with Closures',
        code: `function memoize(fn) {
  const cache = {};
  return function(arg) {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}`,
        explanation: 'Cache stores results in closure scope.'
      }
    ],
    exercise: {
      description: 'Create a function `createCounter(start)` that returns an object with `increment`, `decrement`, and `getValue` methods.',
      starterCode: `function solution(start) {
  // Return object with increment, decrement, getValue
}`,
      hints: ['Use closure to store count', 'Return object with methods', 'Methods modify/read the closed variable']
    },
    tests: [
      { id: 'test-1', description: 'Initial value', input: 0, expectedOutput: { action: 'getValue', result: 0 }, isHidden: false, testFn: 'const c = solution(0); return {action:"getValue",result:c.getValue()};' },
      { id: 'test-2', description: 'Increment', input: 5, expectedOutput: { after: 6 }, isHidden: false },
      { id: 'test-3', description: 'Decrement', input: 10, expectedOutput: { after: 9 }, isHidden: false },
      { id: 'test-4', description: 'Multiple operations', input: 0, expectedOutput: 3, isHidden: true },
      { id: 'test-5', description: 'Negative start', input: -5, expectedOutput: -4, isHidden: true }
    ],
    solution: `function solution(start) {
  let count = start;
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    getValue() { return count; }
  };
}`,
    difficulty: 5,
    estimatedMinutes: 35
  },

  // ============== DAYS 11-30 ==============
  ...generateDays11to30JavaScript()
];

function generateDays11to30JavaScript() {
  return [
    // Day 11: Promises
    {
      language: 'javascript', day: 11, title: 'Promises Fundamentals', difficulty: 5, estimatedMinutes: 40,
      objectives: ['Understand Promise states', 'Create and consume Promises', 'Handle errors with catch', 'Chain Promises'],
      contentHtml: `<h2>Promises Fundamentals</h2>
<p>A Promise represents a value that may be available now, later, or never. Promises are JavaScript's way of handling asynchronous operations, providing a cleaner alternative to callback functions. Understanding Promises is essential for modern JavaScript development.</p>

<h3>Why Promises Matter</h3>
<p>Promises enable you to:</p>
<ul>
  <li><strong>Handle async operations:</strong> Work with data that arrives later</li>
  <li><strong>Avoid callback hell:</strong> Chain operations instead of nesting callbacks</li>
  <li><strong>Error handling:</strong> Centralized error handling with .catch()</li>
  <li><strong>Compose async operations:</strong> Combine multiple async tasks elegantly</li>
</ul>

<h3>Promise States</h3>
<p>A Promise has three states:</p>
<ul>
  <li><strong>Pending:</strong> Initial state, neither fulfilled nor rejected</li>
  <li><strong>Fulfilled:</strong> Operation completed successfully</li>
  <li><strong>Rejected:</strong> Operation failed</li>
</ul>
<p>Once a Promise is fulfilled or rejected, it cannot change state.</p>

<h3>Creating Promises</h3>
<pre><code>// Basic Promise creation
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    resolve('Done!'); // Success - call resolve
    // or
    // reject('Error!'); // Failure - call reject
  }, 1000);
});

// Promise that resolves immediately
const immediate = Promise.resolve('Success');
const failed = Promise.reject('Error');

// Wrapping existing APIs
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Alice' });
      } else {
        reject(new Error('Invalid ID'));
      }
    }, 100);
  });
}</code></pre>

<h3>Consuming Promises</h3>
<pre><code>// Basic .then() usage
promise
  .then(value => {
    console.log(value); // Handle success
    return value.toUpperCase(); // Return new value
  })
  .then(upperValue => {
    console.log(upperValue); // Chain another operation
  })
  .catch(error => {
    console.error('Error:', error); // Handle any errors
  })
  .finally(() => {
    console.log('Cleanup'); // Always runs
  });

// Each .then() returns a new Promise
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => processPosts(posts))
  .catch(error => console.error('Failed:', error));</code></pre>

<h3>Promise.all - Wait for All</h3>
<pre><code>// Execute multiple promises in parallel, wait for all
const p1 = fetch('/api/users');
const p2 = fetch('/api/posts');
const p3 = fetch('/api/comments');

Promise.all([p1, p2, p3])
  .then(([users, posts, comments]) => {
    // All promises resolved
    console.log('All data loaded');
  })
  .catch(error => {
    // If ANY promise rejects, this catches it
    console.error('One request failed:', error);
  });

// Promise.allSettled - Wait for all, regardless of success/failure
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Promise \${index} succeeded:\`, result.value);
      } else {
        console.log(\`Promise \${index} failed:\`, result.reason);
      }
    });
  });</code></pre>

<h3>Promise.race - First to Complete</h3>
<pre><code>// Returns the first promise that settles (fulfills or rejects)
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject('Timeout'), 5000)
);
const fetchData = fetch('/api/data');

Promise.race([fetchData, timeout])
  .then(data => {
    // Use whichever completes first
    console.log('Got data:', data);
  })
  .catch(error => {
    // If timeout wins, this catches it
    console.error('Request timed out');
  });

// Useful for timeouts and fallbacks
function fetchWithTimeout(url, timeoutMs) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), timeoutMs)
  );
  return Promise.race([fetchPromise, timeoutPromise]);
}</code></pre>

<h3>Error Handling</h3>
<pre><code>// Single catch handles errors from any step
fetchUser(1)
  .then(user => {
    if (!user) throw new Error('User not found');
    return fetchPosts(user.id);
  })
  .then(posts => {
    // If fetchUser fails, this never runs
    return processPosts(posts);
  })
  .catch(error => {
    // Catches errors from ANY step above
    console.error('Error in chain:', error);
    return []; // Return default value
  });

// Catching specific errors
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .catch(error => {
    if (error.message === 'Network error') {
      // Handle network errors
      return retryFetch();
    }
    throw error; // Re-throw other errors
  });</code></pre>

<h3>Common Patterns</h3>
<pre><code>// Pattern 1: Sequential async operations
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments));

// Pattern 2: Parallel operations
Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
]).then(users => {
  console.log('All users:', users);
});

// Pattern 3: Retry logic
function retry(fn, retries = 3) {
  return fn().catch(error => {
    if (retries > 0) {
      return retry(fn, retries - 1);
    }
    throw error;
  });
}</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Forgetting return:</strong> Must return values in .then() to chain</li>
  <li><strong>Not catching errors:</strong> Always handle rejections</li>
  <li><strong>Promise constructor anti-pattern:</strong> Don't wrap promises unnecessarily</li>
  <li><strong>Mixing callbacks and promises:</strong> Convert callbacks to promises</li>
  <li><strong>Unhandled rejections:</strong> Always have error handling</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Always return promises from .then() handlers for chaining</li>
  <li>Use .catch() for error handling, not just .then(null, handler)</li>
  <li>Use Promise.all() for parallel independent operations</li>
  <li>Use Promise.race() for timeouts and fallbacks</li>
  <li>Avoid creating promises unnecessarily (Promise.resolve() when value is known)</li>
  <li>Handle errors at appropriate levels in the chain</li>
  <li>Use .finally() for cleanup operations</li>
</ul>`,
      examples: [
        {
          title: 'Chaining Promises', code: `fetch('/v1/user')
  .then(res => res.json())
  .then(user => fetch('/v1/posts/' + user.id))
  .then(res => res.json())
  .then(posts => console.log(posts));`, explanation: 'Each then returns a new Promise for chaining.'
        },
        {
          title: 'Error Handling', code: `doSomething()
  .then(result => doSomethingElse(result))
  .catch(error => console.error('Failed:', error));`, explanation: 'A single catch handles errors from any step.'
        }
      ],
      exercise: { description: 'Create a function that returns a Promise resolving with "success" after `delay` ms, or rejecting with "timeout" if delay > 5000.', starterCode: `function solution(delay) {\n  // Return a Promise\n}`, hints: ['Use new Promise()', 'Use setTimeout', 'Check delay before setting timeout'] },
      tests: [
        { id: 't1', description: 'Resolve after 100ms', input: 100, expectedOutput: 'success', isHidden: false },
        { id: 't2', description: 'Resolve after 1000ms', input: 1000, expectedOutput: 'success', isHidden: false },
        { id: 't3', description: 'Reject if > 5000', input: 6000, expectedOutput: 'timeout', isHidden: true },
        { id: 't4', description: 'Edge case 5000', input: 5000, expectedOutput: 'success', isHidden: true }
      ],
      solution: `function solution(delay) {
  return new Promise((resolve, reject) => {
    if (delay > 5000) reject('timeout');
    else setTimeout(() => resolve('success'), delay);
  });
}`
    },

    // Day 12: Async/Await
    {
      language: 'javascript', day: 12, title: 'Async/Await', difficulty: 5, estimatedMinutes: 40,
      objectives: ['Use async functions', 'Await Promises', 'Handle errors with try/catch', 'Parallel execution patterns'],
      contentHtml: `<h2>Async/Await in JavaScript</h2>
<p>Async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code. It's built on Promises but provides a more readable, linear way to write async operations. Async/await is the modern standard for handling asynchronous JavaScript.</p>

<h3>Why Async/Await Matters</h3>
<p>Async/await enables you to:</p>
<ul>
  <li><strong>Write cleaner code:</strong> Linear flow instead of nested callbacks</li>
  <li><strong>Handle errors easily:</strong> Use try/catch like synchronous code</li>
  <li><strong>Improve readability:</strong> Code reads top-to-bottom naturally</li>
  <li><strong>Debug easier:</strong> Stack traces are clearer</li>
</ul>

<h3>Basic Usage</h3>
<pre><code>// async function always returns a Promise
async function fetchUser() {
  const response = await fetch('/v1/user');
  const user = await response.json();
  return user; // Automatically wrapped in Promise
}

// Calling async function
fetchUser()
  .then(user => console.log(user))
  .catch(error => console.error(error));

// Or use await in another async function
async function displayUser() {
  const user = await fetchUser();
  console.log(user);
}</code></pre>
<p><strong>Key points:</strong> <code>async</code> functions always return Promises. <code>await</code> pauses execution until the Promise resolves.</p>

<h3>The await Keyword</h3>
<pre><code>// await pauses execution until Promise resolves
async function example() {
  console.log('Start');
  
  const result = await new Promise(resolve => {
    setTimeout(() => resolve('Done'), 1000);
  });
  
  console.log(result); // Runs after 1 second
  console.log('End');
}

// Without await (wrong!)
async function wrong() {
  const result = fetch('/api/data'); // Returns Promise, not data!
  console.log(result); // Promise object, not the data
}

// With await (correct!)
async function correct() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data); // Actual data
}</code></pre>

<h3>Error Handling</h3>
<pre><code>// Using try/catch (like synchronous code)
async function getData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed:', error);
    // Return default or re-throw
    throw error;
  }
}

// Multiple await calls in try/catch
async function processUser(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    // Catches errors from ANY await above
    console.error('Processing failed:', error);
    return null;
  }
}

// Catching specific errors
async function safeOperation() {
  try {
    return await riskyOperation();
  } catch (error) {
    if (error instanceof TypeError) {
      // Handle type errors
      return defaultValue;
    }
    throw error; // Re-throw other errors
  }
}</code></pre>

<h3>Parallel Execution</h3>
<pre><code>// Sequential (slow) - each waits for previous
async function sequential() {
  const user = await fetchUser(1);      // Wait for user
  const posts = await fetchPosts(user.id); // Wait for posts
  const comments = await fetchComments(posts[0].id); // Wait for comments
  return { user, posts, comments };
}

// Parallel (fast) - all execute simultaneously
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  return { user, posts, comments };
}

// Partial parallelization
async function mixed() {
  const user = await fetchUser(1);
  // Now fetch posts and comments in parallel
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),
    fetchComments(user.id)
  ]);
  return { user, posts, comments };
}</code></pre>

<h3>Async Functions in Loops</h3>
<pre><code>// Sequential processing in loop
async function processSequentially(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item); // Wait for each
    results.push(result);
  }
  return results;
}

// Parallel processing
async function processInParallel(items) {
  const promises = items.map(item => processItem(item));
  return Promise.all(promises); // All process simultaneously
}

// Controlled concurrency (process N at a time)
async function processWithLimit(items, limit) {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  return results;
}</code></pre>

<h3>Common Patterns</h3>
<pre><code>// Pattern 1: Async IIFE (Immediately Invoked Function Expression)
(async function() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();

// Pattern 2: Async arrow functions
const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};

// Pattern 3: Async methods in classes
class ApiClient {
  async getUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
  
  async getUsers() {
    const users = await this.getUser(1);
    return users;
  }
}

// Pattern 4: Error handling wrapper
async function safeAsync(fn) {
  try {
    return { success: true, data: await fn() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Forgetting await:</strong> Without await, you get a Promise, not the value</li>
  <li><strong>await in non-async function:</strong> Can only use await in async functions</li>
  <li><strong>Sequential when parallel possible:</strong> Use Promise.all() for independent operations</li>
  <li><strong>Not handling errors:</strong> Always use try/catch or .catch()</li>
  <li><strong>Blocking the event loop:</strong> Don't await unnecessarily</li>
  <li><strong>Mixing patterns:</strong> Be consistent - use async/await or Promises, not both randomly</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Use async/await for cleaner, more readable async code</li>
  <li>Always handle errors with try/catch</li>
  <li>Use Promise.all() for parallel independent operations</li>
  <li>Don't await unnecessarily - only when you need the value</li>
  <li>Consider error boundaries and fallback values</li>
  <li>Use async/await consistently throughout your codebase</li>
  <li>Be aware that async functions always return Promises</li>
</ul>`,
      examples: [
        {
          title: 'Sequential vs Parallel', code: `// Sequential (slow)
const a = await fetchA();
const b = await fetchB();

// Parallel (fast)
const [a, b] = await Promise.all([fetchA(), fetchB()]);`, explanation: 'Use Promise.all for independent async operations.'
        },
        {
          title: 'Async in loops', code: `const results = [];
for (const url of urls) {
  const data = await fetch(url);
  results.push(data);
}`, explanation: 'For sequential processing in loops.'
        }
      ],
      exercise: { description: 'Create an async function that takes an array of async functions, executes them in parallel, and returns an array of results.', starterCode: `async function solution(asyncFns) {\n  // Execute all in parallel\n}`, hints: ['Map to promises', 'Use Promise.all', 'Return results array'] },
      tests: [
        { id: 't1', description: 'Execute parallel', input: 'mock', expectedOutput: [1, 2, 3], isHidden: false },
        { id: 't2', description: 'Empty array', input: [], expectedOutput: [], isHidden: true },
        { id: 't3', description: 'Single function', input: 'single', expectedOutput: [42], isHidden: true }
      ],
      solution: `async function solution(asyncFns) {
  return Promise.all(asyncFns.map(fn => fn()));
}`
    },

    // Day 13: Classes and OOP
    {
      language: 'javascript', day: 13, title: 'Classes and OOP', difficulty: 5, estimatedMinutes: 40,
      objectives: ['Define classes with constructor', 'Add methods and properties', 'Use getters and setters', 'Understand static members'],
      contentHtml: `<h2>Classes and Object-Oriented Programming in JavaScript</h2>
<p>JavaScript classes provide a cleaner syntax for creating objects and implementing inheritance. Introduced in ES6, classes are syntactic sugar over JavaScript's prototype-based inheritance, making object-oriented programming more familiar to developers from class-based languages.</p>

<h3>Why Classes Matter</h3>
<p>Classes enable you to:</p>
<ul>
  <li><strong>Organize code:</strong> Group related data and behavior together</li>
  <li><strong>Create reusable blueprints:</strong> Define object structures once</li>
  <li><strong>Implement inheritance:</strong> Share code between related objects</li>
  <li><strong>Encapsulate logic:</strong> Keep data and methods together</li>
</ul>

<h3>Basic Class Syntax</h3>
<pre><code>// Class declaration
class Person {
  // Constructor - called when creating instance
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Instance method
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  // Getter (computed property)
  get birthYear() {
    return new Date().getFullYear() - this.age;
  }
  
  // Setter
  set age(newAge) {
    if (newAge < 0) {
      throw new Error('Age cannot be negative');
    }
    this._age = newAge;
  }
  
  // Static method (belongs to class, not instance)
  static compareAge(person1, person2) {
    return person1.age - person2.age;
  }
  
  // Static property
  static species = 'Human';
}

// Creating instances
const alice = new Person('Alice', 30);
alice.greet(); // "Hello, I'm Alice"
alice.birthYear; // 1994 (computed)
Person.compareAge(alice, new Person('Bob', 25)); // 5</code></pre>

<h3>Class Methods</h3>
<pre><code>class Calculator {
  // Instance methods
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  // Method chaining (return this)
  setValue(value) {
    this.value = value;
    return this; // Enable chaining
  }
  
  multiply(factor) {
    this.value *= factor;
    return this;
  }
  
  getResult() {
    return this.value;
  }
}

const calc = new Calculator();
calc.setValue(10).multiply(2).getResult(); // 20

// Static methods (called on class, not instance)
class MathUtils {
  static add(a, b) {
    return a + b;
  }
  
  static max(...numbers) {
    return Math.max(...numbers);
  }
}

MathUtils.add(5, 3); // 8
// const utils = new MathUtils();
// utils.add(5, 3); // ERROR! add is static</code></pre>

<h3>Getters and Setters</h3>
<pre><code>class Circle {
  constructor(radius) {
    this._radius = radius; // Convention: _ prefix for private
  }
  
  // Getter - accessed like property
  get radius() {
    return this._radius;
  }
  
  // Setter - validates input
  set radius(value) {
    if (value < 0) {
      throw new Error('Radius cannot be negative');
    }
    this._radius = value;
  }
  
  // Computed getter
  get area() {
    return Math.PI * this._radius ** 2;
  }
  
  get diameter() {
    return this._radius * 2;
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5 (getter)
circle.radius = 10; // Setter
console.log(circle.area); // ~314 (computed)
console.log(circle.diameter); // 20</code></pre>

<h3>Private Fields (ES2022)</h3>
<pre><code>class BankAccount {
  // Private field (truly private, not accessible outside)
  #balance = 0;
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
    }
  }
  
  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.balance); // 150
// account.#balance; // ERROR! Private field</code></pre>

<h3>Inheritance</h3>
<pre><code>// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

// Derived class
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    return \`\${this.name} barks!\`;
  }
  
  // New method
  fetch() {
    return \`\${this.name} fetches the ball\`;
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // "Rex barks!"
dog.fetch(); // "Rex fetches the ball"</code></pre>

<h3>Common Patterns</h3>
<pre><code>// Pattern 1: Factory method
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  static createAdmin(name, email) {
    const user = new User(name, email);
    user.role = 'admin';
    return user;
  }
}

const admin = User.createAdmin('Alice', 'alice@example.com');

// Pattern 2: Singleton pattern
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
    this.connection = null;
  }
  
  connect() {
    this.connection = 'connected';
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (same instance)</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Forgetting new:</strong> Classes must be instantiated with <code>new</code></li>
  <li><strong>Calling super:</strong> Must call <code>super()</code> before <code>this</code> in derived classes</li>
  <li><strong>Static vs instance:</strong> Static methods belong to class, not instances</li>
  <li><strong>Private fields:</strong> Use <code>#</code> for true privacy, not <code>_</code></li>
  <li><strong>Method binding:</strong> Methods lose <code>this</code> context when extracted</li>
  <li><strong>Hoisting:</strong> Classes are not hoisted - declare before use</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Use classes for organizing related data and behavior</li>
  <li>Use private fields (#) for true encapsulation</li>
  <li>Use getters/setters for computed properties and validation</li>
  <li>Use static methods for utility functions related to the class</li>
  <li>Call super() first in derived class constructors</li>
  <li>Keep classes focused - single responsibility principle</li>
  <li>Consider composition over inheritance when appropriate</li>
</ul>`,
      examples: [
        {
          title: 'Class with Methods', code: `class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}
const calc = new Calculator();
calc.add(5, 3); // 8`, explanation: 'Methods are defined directly in the class body.'
        },
        {
          title: 'Getters and Setters', code: `class Circle {
  constructor(radius) { this._radius = radius; }
  get area() { return Math.PI * this._radius ** 2; }
  set radius(r) { this._radius = r; }
}`, explanation: 'Getters compute values, setters validate input.'
        }
      ],
      exercise: { description: 'Create a BankAccount class with deposit, withdraw, and balance getter. Throw error if withdrawing more than balance.', starterCode: `class BankAccount {\n  // Your code here\n}\nfunction solution(operations) {\n  // Process operations and return final balance\n}`, hints: ['Store balance as private', 'Check balance before withdraw', 'Return current balance'] },
      tests: [
        { id: 't1', description: 'Deposit and withdraw', input: [{ type: 'deposit', amount: 100 }, { type: 'withdraw', amount: 30 }], expectedOutput: 70, isHidden: false },
        { id: 't2', description: 'Multiple deposits', input: [{ type: 'deposit', amount: 50 }, { type: 'deposit', amount: 50 }], expectedOutput: 100, isHidden: false },
        { id: 't3', description: 'Overdraw error', input: [{ type: 'deposit', amount: 50 }, { type: 'withdraw', amount: 100 }], expectedOutput: 'error', isHidden: true }
      ],
      solution: `class BankAccount {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
  }
  get balance() { return this.#balance; }
}
function solution(operations) {
  const account = new BankAccount();
  try {
    for (const op of operations) {
      if (op.type === 'deposit') account.deposit(op.amount);
      else if (op.type === 'withdraw') account.withdraw(op.amount);
    }
    return account.balance;
  } catch { return 'error'; }
}`
    },

    // Days 14-30 with full content
    ...generateRemainingJSDays()
  ];
}

function generateRemainingJSDays() {
  return [
    // ============== DAY 14: DOM Manipulation ==============
    {
      language: 'javascript',
      day: 14,
      title: 'DOM Manipulation',
      objectives: [
        'Understand the Document Object Model (DOM)',
        'Learn DOM query methods (getElementById, querySelector)',
        'Master element creation and manipulation',
        'Practice dynamic content updates'
      ],
      contentHtml: `
        <h2>DOM Manipulation in JavaScript</h2>
        <p>The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content. DOM manipulation is essential for creating interactive web applications that respond to user actions.</p>

        <h3>Why DOM Manipulation Matters</h3>
        <p>DOM manipulation enables you to:</p>
        <ul>
          <li><strong>Update content dynamically:</strong> Change text, images, and other elements</li>
          <li><strong>Respond to user interactions:</strong> Handle clicks, form submissions, etc.</li>
          <li><strong>Create interactive interfaces:</strong> Build dynamic user experiences</li>
          <li><strong>Build single-page applications:</strong> Update content without page reloads</li>
        </ul>

        <h3>Selecting Elements</h3>
        <pre><code>// Get element by ID (returns single element)
const app = document.getElementById('app');

// Get elements by class name (returns HTMLCollection)
const items = document.getElementsByClassName('item');

// Get elements by tag name (returns HTMLCollection)
const paragraphs = document.getElementsByTagName('p');

// Query selector (returns single element - first match)
const firstButton = document.querySelector('button');

// Query selector all (returns NodeList)
const allButtons = document.querySelectorAll('button');

// Modern approach - use querySelector when possible
const header = document.querySelector('h1');
const navItems = document.querySelectorAll('.nav-item');</code></pre>

        <h3>Creating and Adding Elements</h3>
        <pre><code>// Create new elements
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');

// Set content
newParagraph.textContent = 'Hello, World!';
newParagraph.innerHTML = '&lt;strong&gt;Bold text&lt;/strong&gt;';

// Set attributes
newDiv.setAttribute('class', 'container');
newDiv.className = 'container'; // Alternative
newDiv.id = 'myDiv';

// Add to DOM
document.body.appendChild(newDiv);
newDiv.appendChild(newParagraph);

// Insert at specific position
const reference = document.querySelector('.reference');
reference.insertBefore(newDiv, reference.firstChild);

// Modern methods
parentElement.append(child1, child2); // Add multiple
parentElement.prepend(child); // Add to beginning
element.before(sibling); // Insert before
element.after(sibling); // Insert after</code></pre>

        <h3>Modifying Elements</h3>
        <pre><code>// Change text content
const title = document.querySelector('h1');
title.textContent = 'New Title';
title.innerHTML = '&lt;em&gt;Italic Title&lt;/em&gt;';

// Modify attributes
const image = document.querySelector('img');
image.src = 'new-image.jpg';
image.alt = 'New alt text';
image.classList.add('featured');
image.classList.remove('hidden');
image.classList.toggle('active');

// Style manipulation
const box = document.querySelector('.box');
box.style.backgroundColor = 'blue';
box.style.width = '200px';
box.style.display = 'none';

// Multiple styles at once
Object.assign(box.style, {
  backgroundColor: 'red',
  width: '300px',
  height: '200px'
});</code></pre>

        <h3>Removing Elements</h3>
        <pre><code>// Remove element
const element = document.querySelector('.to-remove');
element.remove();

// Remove child
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');
parent.removeChild(child);

// Remove all children
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}

// Clear inner HTML
parent.innerHTML = '';</code></pre>

        <h3>Working with Forms</h3>
        <pre><code>// Get form values
const form = document.querySelector('#myForm');
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');

// Get values
const name = nameInput.value;
const email = emailInput.value;

// Set values
nameInput.value = 'John Doe';
emailInput.value = 'john@example.com';

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page reload

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Process form data
  console.log('Form submitted:', data);
});</code></pre>

        <h3>DOM Traversal</h3>
        <pre><code>const element = document.querySelector('.item');

// Navigate up
const parent = element.parentElement;
const grandParent = element.parentElement.parentElement;

// Navigate down
const children = element.children;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Navigate sideways
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;

// Find ancestors
const closestDiv = element.closest('div');
const closestForm = element.closest('form');</code></pre>

        <h3>Performance Considerations</h3>
        <pre><code>// Avoid multiple DOM queries
// Bad: Multiple queries
const item1 = document.querySelector('.item1');
const item2 = document.querySelector('.item2');
const item3 = document.querySelector('.item3');

// Good: Single query
const items = document.querySelectorAll('.item');

// Batch DOM updates
// Bad: Multiple reflows
items.forEach(item => {
  item.style.width = '100px';
  item.style.height = '50px';
  item.style.margin = '10px';
});

// Good: Single reflow
const fragment = document.createDocumentFragment();
items.forEach(item => {
  item.style.cssText = 'width: 100px; height: 50px; margin: 10px';
  fragment.appendChild(item);
});</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>innerHTML vs textContent:</strong> Use textContent for plain text, innerHTML only when you trust the content</li>
          <li><strong>Forgetting to prevent default:</strong> Use preventDefault() for form submissions and links</li>
          <li><strong>Memory leaks:</strong> Remove event listeners when elements are removed</li>
          <li><strong>Multiple DOM queries:</strong> Cache element references when possible</li>
          <li><strong>Blocking operations:</strong> Don't perform heavy operations during DOM manipulation</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use querySelector/querySelectorAll for modern DOM selection</li>
          <li>Cache DOM element references to avoid repeated queries</li>
          <li>Use event delegation for dynamic content</li>
          <li>Batch DOM updates to minimize reflows</li>
          <li>Use semantic HTML and meaningful class/id names</li>
          <li>Test your DOM manipulation across different browsers</li>
          <li>Use CSS classes rather than direct style manipulation when possible</li>
        </ul>
      `,
      examples: [
        {
          title: 'Dynamic Todo List',
          code: `// Create a simple todo list
function createTodoItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  return li;
}

const todoList = document.querySelector('#todo-list');
const addButton = document.querySelector('#add-todo');

addButton.addEventListener('click', () => {
  const input = document.querySelector('#todo-input');
  if (input.value.trim()) {
    const todoItem = createTodoItem(input.value);
    todoList.appendChild(todoItem);
    input.value = '';
  }
});`,
          explanation: 'This creates a dynamic todo list where users can add and remove items using DOM manipulation.'
        },
        {
          title: 'Form Data Collector',
          code: `function collectFormData(form) {
  const data = {};
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      data[input.name] = input.checked;
    } else if (input.type === 'radio') {
      if (input.checked) {
        data[input.name] = input.value;
      }
    } else {
      data[input.name] = input.value;
    }
  });

  return data;
}

const form = document.querySelector('#user-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = collectFormData(form);
  console.log('Form data:', formData);
});`,
          explanation: 'This function collects data from all form inputs, handling different input types appropriately.'
        }
      ],
      exercise: {
        description: 'Create a dynamic shopping list that allows users to add items, mark them as completed, and remove them. Use DOM manipulation to update the list in real-time.',
        starterCode: `function createShoppingList() {
  // Create the shopping list structure
  const container = document.createElement('div');
  container.innerHTML = \`
    <h2>Shopping List</h2>
    <input type="text" id="item-input" placeholder="Enter item">
    <button id="add-btn">Add Item</button>
    <ul id="item-list"></ul>
  \`;

  // Add functionality here
  // - Add items when button is clicked
  // - Mark items as completed when clicked
  // - Remove items with a delete button

  return container;
}`,
        hints: [
          'Create item elements with checkboxes and delete buttons',
          'Use event delegation for dynamic elements',
          'Apply CSS classes to show completed state',
          'Clear input after adding items'
        ]
      },
      tests: [
        { id: 't1', description: 'Add item to list', input: ['Milk'], expectedOutput: { itemCount: 1, items: ['Milk'] }, isHidden: false },
        { id: 't2', description: 'Mark item complete', input: ['Bread', 'complete'], expectedOutput: { itemCount: 1, completedCount: 1 }, isHidden: false },
        { id: 't3', description: 'Remove item', input: ['Eggs', 'remove'], expectedOutput: { itemCount: 0 }, isHidden: false },
        { id: 't4', description: 'Add multiple items', input: ['Apples', 'Bananas', 'Oranges'], expectedOutput: { itemCount: 3 }, isHidden: true },
        { id: 't5', description: 'Complete all items', input: ['Item1', 'Item2', 'Item3', 'complete-all'], expectedOutput: { itemCount: 3, completedCount: 3 }, isHidden: true }
      ],
      solution: `function createShoppingList() {
  const container = document.createElement('div');
  container.innerHTML = \`
    <h2>Shopping List</h2>
    <input type="text" id="item-input" placeholder="Enter item">
    <button id="add-btn">Add Item</button>
    <ul id="item-list"></ul>
  \`;

  const input = container.querySelector('#item-input');
  const addBtn = container.querySelector('#add-btn');
  const list = container.querySelector('#item-list');

  function createListItem(text) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
    });

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
  }

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      const item = createListItem(text);
      list.appendChild(item);
      input.value = '';
    }
  });

  return container;
}`,
      difficulty: 6,
      estimatedMinutes: 40
    },

    // ============== DAY 15: Event Handling ==============
    {
      language: 'javascript',
      day: 15,
      title: 'Event Handling',
      objectives: [
        'Understand event-driven programming',
        'Learn different event types and their uses',
        'Master event listeners and handlers',
        'Practice event delegation and bubbling'
      ],
      contentHtml: `
        <h2>Event Handling in JavaScript</h2>
        <p>Events are actions that happen in the browser, such as clicks, key presses, form submissions, or page loads. Event handling allows your JavaScript code to respond to these actions, making web pages interactive. Understanding events is crucial for creating dynamic user interfaces.</p>

        <h3>Why Event Handling Matters</h3>
        <p>Event handling enables you to:</p>
        <ul>
          <li><strong>Respond to user interactions:</strong> Handle clicks, typing, scrolling</li>
          <li><strong>Create interactive interfaces:</strong> Build responsive web applications</li>
          <li><strong>Manage form submissions:</strong> Process user input and validation</li>
          <li><strong>Handle asynchronous operations:</strong> Respond to network requests</li>
        </ul>

        <h3>Basic Event Listeners</h3>
        <pre><code>// Get element reference
const button = document.querySelector('#myButton');

// Add event listener
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event object:', event);
});

// Arrow function syntax
button.addEventListener('click', (event) => {
  console.log('Button clicked with arrow function!');
});

// Remove event listener
function handleClick(event) {
  console.log('Clicked once!');
  button.removeEventListener('click', handleClick);
}

button.addEventListener('click', handleClick);

// Inline event handler (not recommended)
button.onclick = function() {
  console.log('Inline handler');
};</code></pre>

        <h3>Common Event Types</h3>
        <pre><code>// Mouse events
element.addEventListener('click', handler);     // Click
element.addEventListener('dblclick', handler);  // Double click
element.addEventListener('mousedown', handler); // Mouse button down
element.addEventListener('mouseup', handler);   // Mouse button up
element.addEventListener('mousemove', handler); // Mouse move
element.addEventListener('mouseover', handler); // Mouse enter
element.addEventListener('mouseout', handler);  // Mouse leave

// Keyboard events
input.addEventListener('keydown', handler);     // Key pressed
input.addEventListener('keyup', handler);       // Key released
input.addEventListener('keypress', handler);    // Character input

// Form events
form.addEventListener('submit', handler);       // Form submission
input.addEventListener('focus', handler);       // Element focused
input.addEventListener('blur', handler);        // Element unfocused
input.addEventListener('change', handler);      // Value changed
input.addEventListener('input', handler);       // Value changing

// Window/Document events
window.addEventListener('load', handler);       // Page loaded
window.addEventListener('resize', handler);     // Window resized
window.addEventListener('scroll', handler);     // Page scrolled
document.addEventListener('DOMContentLoaded', handler); // DOM ready</code></pre>

        <h3>The Event Object</h3>
        <pre><code>button.addEventListener('click', function(event) {
  // Prevent default behavior
  event.preventDefault();

  // Stop event bubbling
  event.stopPropagation();

  // Event properties
  console.log('Target element:', event.target);
  console.log('Current target:', event.currentTarget);
  console.log('Event type:', event.type);
  console.log('Mouse position:', event.clientX, event.clientY);
  console.log('Key pressed:', event.key);
  console.log('Ctrl pressed:', event.ctrlKey);
});</code></pre>

        <h3>Event Bubbling and Capturing</h3>
        <pre><code>// HTML structure:
// &lt;div id="parent"&gt;
//   &lt;button id="child"&gt;Click me&lt;/button&gt;
// &lt;/div&gt;

const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

// Bubbling phase (default - inside to outside)
child.addEventListener('click', () => {
  console.log('Child clicked');
});

parent.addEventListener('click', () => {
  console.log('Parent clicked');
});
// Output: "Child clicked" then "Parent clicked"

// Capturing phase (outside to inside)
parent.addEventListener('click', () => {
  console.log('Parent clicked (capturing)');
}, true);

child.addEventListener('click', () => {
  console.log('Child clicked (capturing)');
}, true);
// Output: "Parent clicked (capturing)" then "Child clicked (capturing)"</code></pre>

        <h3>Event Delegation</h3>
        <p>Attach a single event listener to a parent element instead of multiple listeners on child elements:</p>
        <pre><code>// Bad approach - adding listeners to each item
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// Good approach - event delegation
const list = document.querySelector('.item-list');
list.addEventListener('click', function(event) {
  // Check if clicked element is an item
  if (event.target.classList.contains('item')) {
    handleClick(event);
  }

  // Or check if clicked element matches selector
  if (event.target.matches('.delete-btn')) {
    deleteItem(event.target.parentElement);
  }
});</code></pre>

        <h3>Custom Events</h3>
        <pre><code>// Create custom event
const customEvent = new CustomEvent('myEvent', {
  detail: { message: 'Hello from custom event!' },
  bubbles: true,     // Allow bubbling
  cancelable: true   // Allow preventDefault()
});

// Dispatch custom event
element.dispatchEvent(customEvent);

// Listen for custom event
element.addEventListener('myEvent', (event) => {
  console.log(event.detail.message);
});</code></pre>

        <h3>Event Handling Best Practices</h3>
        <pre><code>// 1. Use event delegation for dynamic content
const list = document.querySelector('.dynamic-list');
list.addEventListener('click', (event) => {
  if (event.target.matches('.item')) {
    // Handle item click
  }
});

// 2. Throttle/Debounce expensive operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedSearch = debounce(searchAPI, 300);
input.addEventListener('input', (e) => debouncedSearch(e.target.value));

// 3. Clean up event listeners
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.button.addEventListener('click', this.handleClick);
  }

  destroy() {
    this.button.removeEventListener('click', this.handleClick);
  }
}</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Memory leaks:</strong> Always remove event listeners when elements are destroyed</li>
          <li><strong>Inline event handlers:</strong> Use addEventListener instead of onclick attributes</li>
          <li><strong>Too many listeners:</strong> Use event delegation for lists and dynamic content</li>
          <li><strong>Forgetting preventDefault:</strong> Prevent default behavior when needed (forms, links)</li>
          <li><strong>Not stopping propagation:</strong> Be careful with stopPropagation() - it can break other code</li>
          <li><strong>Binding in loops:</strong> Don't create new functions in loops - use event delegation</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use addEventListener() instead of inline event handlers</li>
          <li>Implement event delegation for dynamic content</li>
          <li>Always clean up event listeners to prevent memory leaks</li>
          <li>Use event.target vs event.currentTarget appropriately</li>
          <li>Throttle/debounce expensive operations</li>
          <li>Handle errors gracefully in event handlers</li>
          <li>Use semantic event names for custom events</li>
        </ul>
      `,
      examples: [
        {
          title: 'Interactive Form Validation',
          code: `const form = document.querySelector('#registration-form');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const submitBtn = form.querySelector('#submit-btn');

// Real-time validation
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('input', validatePassword);

function validateEmail(event) {
  const email = event.target.value;
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

  event.target.classList.toggle('invalid', !isValid);
  event.target.classList.toggle('valid', isValid);
}

function validatePassword(event) {
  const password = event.target.value;
  const isValid = password.length >= 8;

  event.target.classList.toggle('invalid', !isValid);
  event.target.classList.toggle('valid', isValid);

  // Enable/disable submit button
  submitBtn.disabled = !isValid || !emailInput.value;
}

// Form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validateEmail({ target: emailInput }) &&
      validatePassword({ target: passwordInput })) {
    console.log('Form submitted successfully!');
    // Submit form data
  }
});`,
          explanation: 'This shows real-time form validation with visual feedback and conditional form submission.'
        },
        {
          title: 'Keyboard Navigation',
          code: `const menu = document.querySelector('.menu');
const menuItems = menu.querySelectorAll('.menu-item');
let currentIndex = -1;

menu.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowDown':
      event.preventDefault();
      currentIndex = Math.min(currentIndex + 1, menuItems.length - 1);
      updateSelection();
      break;

    case 'ArrowUp':
      event.preventDefault();
      currentIndex = Math.max(currentIndex - 1, 0);
      updateSelection();
      break;

    case 'Enter':
      event.preventDefault();
      if (currentIndex >= 0) {
        menuItems[currentIndex].click();
      }
      break;

    case 'Escape':
      event.preventDefault();
      currentIndex = -1;
      updateSelection();
      break;
  }
});

function updateSelection() {
  menuItems.forEach((item, index) => {
    item.classList.toggle('selected', index === currentIndex);
  });
}

// Focus management
menu.addEventListener('focusin', () => {
  if (currentIndex === -1) {
    currentIndex = 0;
    updateSelection();
  }
});

menu.addEventListener('focusout', () => {
  currentIndex = -1;
  updateSelection();
});`,
          explanation: 'This implements keyboard navigation for a menu, allowing users to navigate with arrow keys and select with Enter.'
        }
      ],
      exercise: {
        description: 'Create an interactive accordion component where clicking on accordion headers expands/collapses the content. Add keyboard navigation support and ensure proper accessibility.',
        starterCode: `function createAccordion(items) {
  // items: [{ title: 'Section 1', content: 'Content 1' }, ...]

  const container = document.createElement('div');
  container.className = 'accordion';

  // Create accordion structure
  // - Each item should have a header and content area
  // - Clicking header toggles content visibility
  // - Only one section open at a time
  // - Add keyboard navigation (Arrow keys, Enter, Space)

  return container;
}`,
        hints: [
          'Use proper semantic HTML (details/summary or custom div structure)',
          'Manage expanded state for each section',
          'Add ARIA attributes for accessibility',
          'Handle keyboard events for navigation',
          'Use CSS transitions for smooth animations'
        ]
      },
      tests: [
        { id: 't1', description: 'Expand section', input: ['click', 0], expectedOutput: { expanded: [0] }, isHidden: false },
        { id: 't2', description: 'Collapse section', input: ['click', 0, 'click', 0], expectedOutput: { expanded: [] }, isHidden: false },
        { id: 't3', description: 'Only one expanded', input: ['click', 0, 'click', 1], expectedOutput: { expanded: [1] }, isHidden: false },
        { id: 't4', description: 'Keyboard navigation', input: ['keydown', 'ArrowDown'], expectedOutput: { focused: 0 }, isHidden: true },
        { id: 't5', description: 'Enter key activation', input: ['keydown', 'Enter'], expectedOutput: { expanded: [0] }, isHidden: true }
      ],
      solution: `function createAccordion(items) {
  const container = document.createElement('div');
  container.className = 'accordion';
  container.setAttribute('role', 'tablist');

  let expandedIndex = -1;
  let focusedIndex = 0;

  items.forEach((item, index) => {
    const section = document.createElement('div');
    section.className = 'accordion-item';

    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', \`panel-\${index}\`);
    header.textContent = item.title;

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.id = \`panel-\${index}\`;
    content.setAttribute('aria-labelledby', \`header-\${index}\`);
    content.textContent = item.content;
    content.style.display = 'none';

    header.addEventListener('click', () => toggleSection(index));

    section.appendChild(header);
    section.appendChild(content);
    container.appendChild(section);
  });

  function toggleSection(index) {
    const headers = container.querySelectorAll('.accordion-header');
    const contents = container.querySelectorAll('.accordion-content');

    if (expandedIndex === index) {
      // Collapse current section
      headers[index].setAttribute('aria-expanded', 'false');
      contents[index].style.display = 'none';
      expandedIndex = -1;
    } else {
      // Collapse previous section
      if (expandedIndex >= 0) {
        headers[expandedIndex].setAttribute('aria-expanded', 'false');
        contents[expandedIndex].style.display = 'none';
      }

      // Expand new section
      headers[index].setAttribute('aria-expanded', 'true');
      contents[index].style.display = 'block';
      expandedIndex = index;
    }
  }

  // Keyboard navigation
  container.addEventListener('keydown', (event) => {
    const headers = container.querySelectorAll('.accordion-header');

    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusedIndex = Math.min(focusedIndex + 1, headers.length - 1);
        headers[focusedIndex].focus();
        break;

      case 'ArrowUp':
        event.preventDefault();
        focusedIndex = Math.max(focusedIndex - 1, 0);
        headers[focusedIndex].focus();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        toggleSection(focusedIndex);
        break;

      case 'Home':
        event.preventDefault();
        focusedIndex = 0;
        headers[focusedIndex].focus();
        break;

      case 'End':
        event.preventDefault();
        focusedIndex = headers.length - 1;
        headers[focusedIndex].focus();
        break;
    }
  });

  return container;
}`,
      difficulty: 7,
      estimatedMinutes: 45
    },

    // Continue with the remaining days in the new structure
    // Days 16-30 will follow the full-stack integration and advanced backend structure
    {
      language: 'javascript',
      day: 16,
      title: 'Modules and Imports',
      objectives: ['Master ES Modules syntax', 'Use named and default exports', 'Import modules with different patterns', 'Organize code into reusable modules'],
      contentHtml: `
        <h2>ES Modules and Imports in JavaScript</h2>
        <p>ES Modules (ECMAScript Modules) are the standard way to organize and share code across multiple files in JavaScript. They provide a clean, declarative syntax for importing and exporting functionality, enabling better code organization, reusability, and maintainability. Understanding modules is essential for building scalable JavaScript applications.</p>

        <h3>Why Modules Matter</h3>
        <p>Modules enable you to:</p>
        <ul>
          <li><strong>Organize code:</strong> Split large files into smaller, focused modules</li>
          <li><strong>Reuse code:</strong> Share functionality across multiple files</li>
          <li><strong>Avoid naming conflicts:</strong> Encapsulate code in separate scopes</li>
          <li><strong>Enable tree-shaking:</strong> Bundlers can remove unused code</li>
          <li><strong>Improve maintainability:</strong> Easier to locate and modify code</li>
        </ul>

        <h3>Named Exports</h3>
        <p>Export multiple values from a module with specific names:</p>
        <pre><code>// utils.js
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export class Calculator {
  add(a, b) { return a + b; }
}

// You can also export after declaration
function subtract(a, b) {
  return a - b;
}
export { subtract };

// Export with renaming
export { subtract as sub };

// Importing named exports
import { add, multiply, PI } from './utils.js';
import { Calculator } from './utils.js';
console.log(add(2, 3));  // 5
console.log(PI);         // 3.14159

// Import with renaming
import { add as sum, multiply as mult } from './utils.js';
sum(2, 3); // 5</code></pre>
        <p><strong>Key points:</strong> Named exports allow multiple exports per module. Import names must match export names (or use aliases).</p>

        <h3>Default Exports</h3>
        <p>Each module can have one default export - the "main" export:</p>
        <pre><code>// Calculator.js
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// Alternative syntax
class Calculator {
  add(a, b) { return a + b; }
}
export default Calculator;

// Importing default export - can use any name
import Calculator from './Calculator.js';
import Calc from './Calculator.js';  // Same thing - name doesn't matter
import MyCalc from './Calculator.js'; // Also works

const calc = new Calculator();
calc.add(5, 3); // 8

// Default export can be any value
export default function greet(name) {
  return \`Hello, \${name}!\`;
}

export default { name: 'Utils', version: '1.0' };

export default 42;</code></pre>
        <p><strong>Key points:</strong> Only one default export per module. Import name can be anything. Use default for the primary export.</p>

        <h3>Mixed Exports</h3>
        <p>Combine default and named exports in the same module:</p>
        <pre><code>// api.js
export const BASE_URL = 'https://api.example.com';
export const API_VERSION = 'v1';

export function get(endpoint) {
  return fetch(\`\${BASE_URL}/\${endpoint}\`);
}

export function post(endpoint, data) {
  return fetch(\`\${BASE_URL}/\${endpoint}\`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// Default export (main API object)
export default {
  get,
  post,
  BASE_URL,
  API_VERSION
};

// Importing both
import api, { BASE_URL, get, post } from './api.js';
// api is the default export
// BASE_URL, get, post are named exports

// Or import default with different name
import ApiClient, { BASE_URL } from './api.js';</code></pre>

        <h3>Import Patterns</h3>
        <pre><code>// Pattern 1: Import everything as namespace
import * as utils from './utils.js';
utils.add(1, 2);
utils.PI;
utils.Calculator;

// Pattern 2: Import default + named
import api, { BASE_URL, get } from './api.js';

// Pattern 3: Import default only
import Calculator from './Calculator.js';

// Pattern 4: Import named only
import { add, multiply } from './utils.js';

// Pattern 5: Re-export (barrel exports)
// index.js
export { add, multiply } from './math.js';
export { Calculator } from './calculator.js';
export { default as ApiClient } from './api.js';

// Then import from index
import { add, Calculator, ApiClient } from './index.js';</code></pre>

        <h3>Dynamic Imports</h3>
        <p>Load modules at runtime instead of at parse time:</p>
        <pre><code>// Static import (loaded at parse time)
import { add } from './utils.js';

// Dynamic import (loaded at runtime)
async function loadModule() {
  const module = await import('./utils.js');
  module.add(1, 2);

  // Or destructure
  const { add, multiply } = await import('./utils.js');
}

// Conditional loading
if (condition) {
  const heavyModule = await import('./heavyModule.js');
  heavyModule.doSomething();
}

// Code splitting with dynamic imports
button.addEventListener('click', async () => {
  const { showDialog } = await import('./dialog.js');
  showDialog();
});</code></pre>
        <p><strong>Use cases:</strong> Code splitting, conditional loading, lazy loading, reducing initial bundle size.</p>

        <h3>Module Scope</h3>
        <p>Each module has its own scope - variables aren't global:</p>
        <pre><code>// module1.js
const secret = 'hidden'; // Not accessible from other modules
export function getSecret() {
  return secret; // Can access module-scoped variables
}

// module2.js
import { getSecret } from './module1.js';
console.log(getSecret()); // "hidden"
// console.log(secret); // ERROR! secret is not accessible</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Missing file extension:</strong> Use <code>./file.js</code> not <code>./file</code> (in some environments)</li>
          <li><strong>Circular dependencies:</strong> Module A imports B, B imports A - can cause issues</li>
          <li><strong>Default vs named:</strong> Default uses <code>import X</code>, named uses <code>import { X }</code></li>
          <li><strong>Multiple defaults:</strong> Can only have one default export per module</li>
          <li><strong>Hoisting:</strong> Imports are hoisted - they run before other code</li>
          <li><strong>Top-level only:</strong> Can't use import/export inside functions/blocks</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use named exports for utilities and constants</li>
          <li>Use default exports for main class/function of a module</li>
          <li>Create barrel exports (index.js) for cleaner imports</li>
          <li>Use descriptive module names and file names</li>
          <li>Keep modules focused on single responsibility</li>
          <li>Use dynamic imports for code splitting and lazy loading</li>
          <li>Avoid circular dependencies</li>
          <li>Group related exports together</li>
        </ul>
      `,
      examples: [
        {
          title: 'Organizing a Module',
          code: `// mathUtils.js
export const E = 2.71828;
export const PI = 3.14159;

export function square(n) {
  return n * n;
}

export function cube(n) {
  return n * n * n;
}

export function power(base, exp) {
  return Math.pow(base, exp);
}

// Default export an object with all utilities
export default {
  E,
  PI,
  square,
  cube,
  power
};`,
          explanation: 'This module exports individual functions and constants, plus a default object containing all of them for convenience.'
        },
        {
          title: 'Dynamic Imports',
          code: `// Load module dynamically (code splitting)
async function loadModule() {
  const module = await import('./heavyModule.js');
  module.doSomething();
}

// Conditional loading
const lang = 'en';
const translations = await import(\`./i18n/\${lang}.js\`);`,
          explanation: 'Dynamic imports load modules at runtime, useful for code splitting and conditional loading.'
        }
      ],
      exercise: {
        description: 'Given an array of module exports, simulate combining them into a single namespace object. Each export has { name, value, isDefault }.',
        starterCode: `function solution(exports) {
  // exports: [{ name: 'add', value: fn, isDefault: false }, ...]
  // Return: { default: ..., add: fn, multiply: fn, ... }
  // If isDefault is true, store under 'default' key
}`,
        hints: [
          'Loop through exports array',
          'Check isDefault flag for each export',
          'Build up result object'
        ]
      },
      tests: [
        { id: 't1', description: 'Named exports only', input: [{ name: 'add', value: 1, isDefault: false }, { name: 'sub', value: 2, isDefault: false }], expectedOutput: { add: 1, sub: 2 }, isHidden: false },
        { id: 't2', description: 'With default', input: [{ name: 'calc', value: 'calculator', isDefault: true }, { name: 'PI', value: 3.14, isDefault: false }], expectedOutput: { default: 'calculator', PI: 3.14 }, isHidden: false },
        { id: 't3', description: 'Empty exports', input: [], expectedOutput: {}, isHidden: false },
        { id: 't4', description: 'Only default', input: [{ name: 'main', value: 'Main', isDefault: true }], expectedOutput: { default: 'Main' }, isHidden: true },
        { id: 't5', description: 'Multiple named', input: [{ name: 'a', value: 1, isDefault: false }, { name: 'b', value: 2, isDefault: false }, { name: 'c', value: 3, isDefault: false }], expectedOutput: { a: 1, b: 2, c: 3 }, isHidden: true }
      ],
      solution: `function solution(exports) {
  const result = {};
  for (const exp of exports) {
    if (exp.isDefault) {
      result.default = exp.value;
    } else {
      result[exp.name] = exp.value;
    }
  }
  return result;
}`,
      difficulty: 5,
      estimatedMinutes: 30
    },

    // Continue with the remaining days in the new balanced full-stack structure
    {
      language: 'javascript',
      day: 17,
      title: 'Fetch API and HTTP',
      objectives: ['Make HTTP requests with fetch()', 'Handle JSON responses', 'Send data with POST requests', 'Handle errors and status codes'],
      contentHtml: `
        <h2>Fetch API and HTTP Requests in JavaScript</h2>
        <p>The Fetch API is the modern, Promise-based way to make HTTP requests in JavaScript. It provides a cleaner, more powerful alternative to XMLHttpRequest and is the standard for making network requests in modern web applications. Understanding fetch is essential for building interactive web applications that communicate with servers.</p>

        <h3>Why Fetch API Matters</h3>
        <p>The Fetch API enables you to:</p>
        <ul>
          <li><strong>Make HTTP requests:</strong> GET, POST, PUT, DELETE, and more</li>
          <li><strong>Handle responses:</strong> Parse JSON, text, blob, and other formats</li>
          <li><strong>Work with Promises:</strong> Use async/await for clean async code</li>
          <li><strong>Control requests:</strong> Set headers, handle CORS, manage caching</li>
          <li><strong>Handle errors:</strong> Properly manage network and HTTP errors</li>
        </ul>

        <h3>Basic GET Request</h3>
        <p>The simplest fetch request:</p>
        <pre><code>// Basic fetch - returns a Promise
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Async/await version (cleaner)
async function getUsers() {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();
  return data;
}

// With error handling
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}</code></pre>
        <p><strong>Key points:</strong> Fetch returns a Promise. Response must be parsed (json(), text(), etc.). Always check response.ok for HTTP errors.</p>

        <h3>Response Object</h3>
        <p>The Response object provides information about the response:</p>
        <pre><code>async function fetchData(url) {
  const response = await fetch(url);

  // Response properties
  console.log(response.status);      // 200, 404, 500, etc.
  console.log(response.statusText);  // 'OK', 'Not Found', etc.
  console.log(response.ok);         // true if status 200-299
  console.log(response.headers);     // Headers object

  // Parse response body
  const json = await response.json();     // Parse as JSON
  const text = await response.text();     // Parse as text
  const blob = await response.blob();     // Parse as blob
  const arrayBuffer = await response.arrayBuffer(); // Parse as ArrayBuffer

  return json;
}</code></pre>

        <h3>POST Request with JSON</h3>
        <p>Send data to the server:</p>
        <pre><code>async function createUser(user) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add other headers as needed
      'Authorization': 'Bearer token123'
    },
    body: JSON.stringify(user)  // Convert object to JSON string
  });

  if (!response.ok) {
    throw new Error(\`Failed to create user: \${response.status}\`);
  }

  return response.json();
}

// Usage
const newUser = await createUser({
  name: 'Alice',
  email: 'alice@example.com'
});</code></pre>

        <h3>Other HTTP Methods</h3>
        <pre><code>// PUT - Update resource
async function updateUser(id, userData) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}

// DELETE - Remove resource
async function deleteUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'DELETE'
  });
  return response.ok;
}

// PATCH - Partial update
async function patchUser(id, partialData) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialData)
  });
  return response.json();
}</code></pre>

        <h3>Request Options</h3>
        <p>Configure fetch behavior with options:</p>
        <pre><code>fetch(url, {
  method: 'POST',          // GET, POST, PUT, DELETE, PATCH, etc.
  headers: {               // Request headers
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
    'Custom-Header': 'value'
  },
  body: JSON.stringify(data), // Request body (string, FormData, Blob, etc.)
  mode: 'cors',            // cors, no-cors, same-origin
  credentials: 'include',  // include, same-origin, omit (for cookies)
  cache: 'no-cache',       // default, no-cache, reload, force-cache, only-if-cached
  redirect: 'follow',      // follow, error, manual
  referrerPolicy: 'no-referrer', // Controls referrer header
  signal: abortController.signal // AbortSignal for cancellation
});</code></pre>

        <h3>Error Handling</h3>
        <p>Fetch doesn't reject on HTTP errors - you must check response.ok:</p>
        <pre><code>async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Fetch only rejects on network errors, not HTTP errors!
    // Must check response.ok for HTTP errors
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status} \${response.statusText}\`);
    }

    return await response.json();
  } catch (error) {
    // Network error or HTTP error
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Helper function for better error handling
async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    error.status = response.status;
    error.response = response;
    throw error;
  }

  return response.json();
}</code></pre>

        <h3>Request Cancellation</h3>
        <p>Cancel requests using AbortController:</p>
        <pre><code>// Create abort controller
const controller = new AbortController();
const signal = controller.signal;

// Start fetch with signal
const fetchPromise = fetch(url, { signal });

// Cancel the request
controller.abort();

// Handle abort
fetchPromise
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
    } else {
      console.error('Other error:', error);
    }
  });

// Timeout pattern
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}</code></pre>

        <h3>Common Patterns</h3>
        <pre><code>// Pattern 1: API client class
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// Pattern 2: Retry logic
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      throw new Error(\`HTTP \${response.status}\`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Not checking response.ok:</strong> Fetch doesn't reject on HTTP errors</li>
          <li><strong>Forgetting to parse:</strong> Must call json(), text(), etc. on response</li>
          <li><strong>Not handling errors:</strong> Always wrap in try/catch</li>
          <li><strong>Missing Content-Type:</strong> Set Content-Type header for JSON requests</li>
          <li><strong>CORS issues:</strong> Understand CORS and how to handle it</li>
          <li><strong>Not stringifying JSON:</strong> body must be a string, not an object</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Always check response.ok before parsing</li>
          <li>Use async/await for cleaner code</li>
          <li>Handle errors appropriately (network vs HTTP errors)</li>
          <li>Set appropriate headers (Content-Type, Authorization, etc.)</li>
          <li>Use AbortController for request cancellation</li>
          <li>Consider implementing retry logic for network failures</li>
          <li>Create API client classes for reusability</li>
          <li>Validate response data before using it</li>
        </ul>
      `,
      examples: [
        {
          title: 'Fetch with Error Handling',
          code: `async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        success: false,
        error: \`HTTP \${response.status}: \${response.statusText}\`
      };
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

const result = await fetchJSON('/v1/users');
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}`,
          explanation: 'This pattern wraps fetch in a try-catch and returns a consistent result object indicating success or failure.'
        },
        {
          title: 'Fetch with Timeout',
          code: `async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}`,
          explanation: 'Use AbortController to implement request timeouts.'
        }
      ],
      exercise: {
        description: 'Create a function that simulates retry logic for fetch. Given a fetch result object {success, data, error}, implement retry with max attempts.',
        starterCode: `function solution(attempts, fetchResults) {
  // attempts: max number of tries
  // fetchResults: array of {success, data, error} - simulated responses
  // Return the first successful result's data, or {error: true, attempts: n} if all fail
}`,
        hints: [
          'Loop through attempts',
          'Stop on first success',
          'Track attempt count'
        ]
      },
      tests: [
        { id: 't1', description: 'First succeeds', input: [3, [{ success: true, data: 'ok' }]], expectedOutput: 'ok', isHidden: false },
        { id: 't2', description: 'Second succeeds', input: [3, [{ success: false, error: 'fail' }, { success: true, data: 'ok' }]], expectedOutput: 'ok', isHidden: false },
        { id: 't3', description: 'All fail', input: [2, [{ success: false, error: 'a' }, { success: false, error: 'b' }]], expectedOutput: { error: true, attempts: 2 }, isHidden: false },
        { id: 't4', description: 'Third succeeds', input: [5, [{ success: false }, { success: false }, { success: true, data: 'finally' }]], expectedOutput: 'finally', isHidden: true },
        { id: 't5', description: 'Max attempts', input: [1, [{ success: false, error: 'x' }]], expectedOutput: { error: true, attempts: 1 }, isHidden: true }
      ],
      solution: `function solution(attempts, fetchResults) {
  let attemptCount = 0;
  for (let i = 0; i < attempts && i < fetchResults.length; i++) {
    attemptCount++;
    if (fetchResults[i].success) {
      return fetchResults[i].data;
    }
  }
  return { error: true, attempts: attemptCount };
}`,
      difficulty: 6,
      estimatedMinutes: 35
    },

    // Continue with the remaining days in the advanced backend section
    {
      language: 'javascript',
      day: 18,
      title: 'Local Storage and State',
      objectives: ['Use localStorage and sessionStorage APIs', 'Serialize and deserialize JSON data', 'Implement state persistence patterns', 'Handle storage events'],
      contentHtml: `
        <h2>Local Storage and State Management in JavaScript</h2>
        <p>The Web Storage API (localStorage and sessionStorage) provides a way to store data in the browser that persists across page reloads. This is essential for building applications that remember user preferences, maintain state, and provide offline functionality. Understanding storage APIs is crucial for creating persistent web applications.</p>

        <h3>Why Web Storage Matters</h3>
        <p>Web Storage enables you to:</p>
        <ul>
          <li><strong>Persist data:</strong> Save user preferences and settings across sessions</li>
          <li><strong>Maintain state:</strong> Keep application state between page reloads</li>
          <li><strong>Improve UX:</strong> Remember user choices and restore previous sessions</li>
          <li><strong>Work offline:</strong> Store data for offline functionality</li>
          <li><strong>Avoid server roundtrips:</strong> Cache data locally</li>
        </ul>

        <h3>localStorage - Persistent Storage</h3>
        <p>localStorage persists data across browser sessions:</p>
        <pre><code>// Store data (persists until explicitly removed)
localStorage.setItem('username', 'alice');
localStorage.setItem('theme', 'dark');

// Retrieve data
const username = localStorage.getItem('username'); // 'alice'
const theme = localStorage.getItem('theme');       // 'dark'
const missing = localStorage.getItem('nonexistent'); // null

// Remove specific item
localStorage.removeItem('username');

// Clear all localStorage data
localStorage.clear();

// Check number of items
console.log(localStorage.length); // Number of stored items

// Get key by index
const firstKey = localStorage.key(0); // Get first key name

// Check if key exists
if (localStorage.getItem('username') !== null) {
  // Key exists
}

// Direct property access (not recommended)
localStorage.username = 'alice';  // Works but not recommended
delete localStorage.username;     // Works but not recommended</code></pre>
        <p><strong>Key points:</strong> Data persists until cleared. Storage is per origin (domain + protocol). Limited to ~5-10MB per origin.</p>

        <h3>Storing Complex Data (JSON)</h3>
        <p>localStorage only stores strings - use JSON for objects:</p>
        <pre><code>// Store object
const user = { 
  name: 'Alice', 
  age: 30,
  preferences: { theme: 'dark', fontSize: 14 }
};

// Convert to JSON string before storing
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'Alice'
console.log(storedUser.preferences.theme); // 'dark'

// Safe parsing with default
function getJSON(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}

const user = getJSON('user', { name: 'Guest' });</code></pre>

        <h3>sessionStorage - Session-Only Storage</h3>
        <p>sessionStorage clears when the tab/window closes:</p>
        <pre><code>// Same API as localStorage
sessionStorage.setItem('tempData', 'value');
const temp = sessionStorage.getItem('tempData');

// Data persists during tab session but clears when tab closes
// Useful for temporary data that shouldn't persist

// Example: Store form draft
sessionStorage.setItem('formDraft', JSON.stringify(formData));

// Restore on page load
const draft = sessionStorage.getItem('formDraft');
if (draft) {
  formData = JSON.parse(draft);
}</code></pre>
        <p><strong>Use cases:</strong> Form drafts, temporary UI state, session-specific data.</p>

        <h3>Storage Events</h3>
        <p>Listen for storage changes (from other tabs/windows):</p>
        <pre><code>// Storage event fires when localStorage/sessionStorage changes
// Note: Only fires for OTHER tabs/windows, not the current one
window.addEventListener('storage', (event) => {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('Storage area:', event.storageArea); // localStorage or sessionStorage
  console.log('URL:', event.url); // URL of page that made the change
  
  // Sync state across tabs
  if (event.key === 'theme') {
    applyTheme(event.newValue);
  }
});

// Example: Sync theme across tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'theme' && event.newValue) {
    document.body.className = event.newValue;
  }
});</code></pre>

        <h3>Storage Limitations and Quotas</h3>
        <pre><code>// Check available storage
function getStorageSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
}

// Handle quota exceeded errors
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      // Clear old data or notify user
      return false;
    }
    throw error;
  }
}

// Clear old data when quota exceeded
function setItemWithCleanup(key, value, maxSize = 5 * 1024 * 1024) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Remove oldest items
      const keys = Object.keys(localStorage);
      for (let i = 0; i < keys.length / 2; i++) {
        localStorage.removeItem(keys[i]);
      }
      localStorage.setItem(key, value);
    }
  }
}</code></pre>

        <h3>Common Patterns</h3>
        <pre><code>// Pattern 1: Storage wrapper class
class StorageManager {
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  
  get(key, defaultValue = null) {
    const item = this.storage.getItem(key);
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item);
    } catch {
      return item; // Return as string if not JSON
    }
  }
  
  set(key, value) {
    const serialized = typeof value === 'string' 
      ? value 
      : JSON.stringify(value);
    this.storage.setItem(key, serialized);
  }
  
  remove(key) {
    this.storage.removeItem(key);
  }
  
  clear() {
    this.storage.clear();
  }
  
  has(key) {
    return this.storage.getItem(key) !== null;
  }
}

const storage = new StorageManager();
storage.set('user', { name: 'Alice' });
const user = storage.get('user');

// Pattern 2: State persistence
class PersistentState {
  constructor(key, initialState = {}) {
    this.key = key;
    this.state = this.load() || initialState;
  }
  
  load() {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : null;
  }
  
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.state));
  }
  
  update(updates) {
    this.state = { ...this.state, ...updates };
    this.save();
  }
  
  get(key) {
    return this.state[key];
  }
}</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Not handling JSON errors:</strong> Always wrap JSON.parse in try/catch</li>
          <li><strong>Storing non-serializable data:</strong> Functions, symbols, undefined can't be stored</li>
          <li><strong>Quota exceeded:</strong> Handle QuotaExceededError gracefully</li>
          <li><strong>Security:</strong> Don't store sensitive data (passwords, tokens) in localStorage</li>
          <li><strong>Sync issues:</strong> Storage events don't fire in same tab</li>
          <li><strong>Type confusion:</strong> Everything is stored as string - remember to parse</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Always wrap JSON operations in try/catch</li>
          <li>Use helper functions/classes for storage operations</li>
          <li>Handle quota exceeded errors gracefully</li>
          <li>Don't store sensitive data in localStorage</li>
          <li>Use sessionStorage for temporary data</li>
          <li>Clear old data periodically to avoid quota issues</li>
          <li>Validate data when retrieving from storage</li>
          <li>Use storage events to sync across tabs</li>
        </ul>
      `,
      examples: [
        {
          title: 'User Preferences Manager',
          code: `class PreferencesManager {
  constructor(storageKey = 'userPrefs') {
    this.storageKey = storageKey;
  }
  
  getAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }
  
  get(key, defaultValue = null) {
    const prefs = this.getAll();
    return prefs[key] ?? defaultValue;
  }
  
  set(key, value) {
    const prefs = this.getAll();
    prefs[key] = value;
    localStorage.setItem(this.storageKey, JSON.stringify(prefs));
  }
  
  remove(key) {
    const prefs = this.getAll();
    delete prefs[key];
    localStorage.setItem(this.storageKey, JSON.stringify(prefs));
  }
}

const prefs = new PreferencesManager();
prefs.set('theme', 'dark');
prefs.set('fontSize', 16);
console.log(prefs.get('theme')); // 'dark'`,
          explanation: 'A wrapper class that handles JSON serialization and provides a cleaner API for preferences.'
        },
        {
          title: 'Safe JSON Parse',
          code: `function safeGetJSON(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}

function safeSetJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // Storage might be full
    console.error('Error storing data:', error);
    return false;
  }
}`,
          explanation: 'Always wrap JSON operations in try-catch to handle corrupted data or quota exceeded errors.'
        }
      ],
      exercise: {
        description: 'Implement a simple state manager that tracks changes history. It should support get, set, and undo operations.',
        starterCode: `function createStateManager(initialState) {
  // Return object with: get(), set(key, value), undo()
  // undo() should revert to previous state
  // Return null from undo() if no history
}`,

        hints: [
          'Keep an array of previous states',
          'Clone state before each change',
          'Pop from history on undo'
        ]
      },
      tests: [
        { id: 't1', description: 'Set and get', input: [{ type: 'set', key: 'a', value: 1 }, { type: 'get', key: 'a' }], expectedOutput: [1], isHidden: false },
        { id: 't2', description: 'Undo', input: [{ type: 'set', key: 'a', value: 1 }, { type: 'set', key: 'a', value: 2 }, { type: 'undo' }, { type: 'get', key: 'a' }], expectedOutput: [1, 1], isHidden: false },
        { id: 't3', description: 'Undo no history', input: [{ type: 'undo' }], expectedOutput: [null], isHidden: false },
        { id: 't4', description: 'Multiple keys', input: [{ type: 'set', key: 'a', value: 1 }, { type: 'set', key: 'b', value: 2 }, { type: 'get', key: 'a' }, { type: 'get', key: 'b' }], expectedOutput: [1, 2], isHidden: true },
        { id: 't5', description: 'Double undo', input: [{ type: 'set', key: 'x', value: 1 }, { type: 'set', key: 'x', value: 2 }, { type: 'set', key: 'x', value: 3 }, { type: 'undo' }, { type: 'undo' }, { type: 'get', key: 'x' }], expectedOutput: [2, 1, 1], isHidden: true }
      ],
      solution: `function solution(operations) {
  const state = {};
  const history = [];
  const results = [];
  
  for (const op of operations) {
    if (op.type === 'set') {
      history.push({...state});
      state[op.key] = op.value;
    } else if (op.type === 'get') {
      results.push(state[op.key] ?? null);
    } else if (op.type === 'undo') {
      if (history.length > 0) {
        const prev = history.pop();
        Object.keys(state).forEach(k => delete state[k]);
        Object.assign(state, prev);
        results.push(state[op.key] ?? Object.values(prev)[0] ?? null);
      } else {
        results.push(null);
      }
    }
  }
  return results;
}`,
      difficulty: 5,
      estimatedMinutes: 30
    },

    // Continue with advanced backend days
    {
      language: 'javascript',
      day: 19,
      title: 'Regular Expressions',
      objectives: ['Understand regex pattern syntax', 'Use regex flags (g, i, m)', 'Apply match, test, replace, and split methods', 'Create patterns for common validation tasks'],
      contentHtml: `
        <h2>Regular Expressions in JavaScript</h2>
        <p>Regular expressions (regex) are powerful patterns for matching, searching, and manipulating text. They provide a concise way to describe complex string patterns, making them essential for validation, parsing, and text processing. JavaScript has excellent built-in regex support.</p>

        <h3>Why Regular Expressions Matter</h3>
        <p>Regular expressions enable you to:</p>
        <ul>
          <li><strong>Validate input:</strong> Check if strings match expected formats (emails, phones, etc.)</li>
          <li><strong>Extract data:</strong> Pull specific information from text</li>
          <li><strong>Search and replace:</strong> Find and modify patterns in strings</li>
          <li><strong>Parse text:</strong> Break down structured text into components</li>
          <li><strong>Filter data:</strong> Match strings against patterns</li>
        </ul>

        <h3>Creating Regular Expressions</h3>
        <p>Two ways to create regex patterns:</p>
        <pre><code>// Literal syntax (preferred when pattern is known)
const regex1 = /hello/;
const regex2 = /hello/i;  // With flag

// Constructor syntax (useful for dynamic patterns)
const pattern = 'hello';
const regex3 = new RegExp(pattern);
const regex4 = new RegExp(pattern, 'i'); // With flag

// Escaping special characters
const regex5 = /\\d+/;  // Escaped backslash
const regex6 = new RegExp('\\\\d+'); // Double escape needed in string</code></pre>
        <p><strong>Key points:</strong> Literal syntax is simpler. Constructor allows dynamic patterns. Flags modify behavior.</p>

        <h3>Regex Flags</h3>
        <p>Flags modify how regex behaves:</p>
        <pre><code>// g - global (find all matches, not just first)
'hello hello'.match(/hello/);   // ['hello'] (first match)
'hello hello'.match(/hello/g);  // ['hello', 'hello'] (all matches)

// i - case-insensitive
/hello/i.test('HELLO');  // true

// m - multiline (^ and $ match line boundaries)
const text = 'line1\\nline2';
/^line/gm.test(text);  // true (matches start of each line)

// s - dotall (. matches newlines)
/hello.world/s.test('hello\\nworld');  // true

// u - unicode (treat pattern as unicode)
/\\u{1F600}/u.test('😀');  // true

// y - sticky (matches only at lastIndex)
const regex = /\\d+/y;
regex.lastIndex = 5;
regex.test('12345');  // true (matches from position 5)</code></pre>

        <h3>Character Classes and Quantifiers</h3>
        <pre><code>// Character classes
\\d    - digit [0-9]
\\D    - non-digit [^0-9]
\\w    - word character [a-zA-Z0-9_]
\\W    - non-word character
\\s    - whitespace [ \\t\\r\\n\\f]
\\S    - non-whitespace
.     - any character except newline (use /s flag for newline)
[abc] - character class (matches a, b, or c)
[^abc]- negated class (matches anything except a, b, c)
[a-z] - range (matches a through z)
[0-9] - digit range

// Quantifiers
+     - one or more (greedy)
*     - zero or more (greedy)
?     - zero or one (greedy)
{n}   - exactly n times
{n,}  - n or more times
{n,m} - between n and m times
+?    - one or more (lazy/non-greedy)
*?    - zero or more (lazy)
??    - zero or one (lazy)

// Anchors
^     - start of string (or line with /m flag)
$     - end of string (or line with /m flag)
\\b    - word boundary
\\B    - non-word boundary

// Examples
/\\d+/        // One or more digits: "123", "45"
/\\d{3}/      // Exactly 3 digits: "123"
/\\d{2,4}/    // 2 to 4 digits: "12", "123", "1234"
/[a-z]+/i     // One or more letters (case-insensitive)
/^\\d+$/       // String contains only digits</code></pre>

        <h3>Groups and Capturing</h3>
        <pre><code>// Capturing groups - extract matched portions
const date = '2024-01-15';
const match = date.match(/(\\d{4})-(\\d{2})-(\\d{2})/);
// match[0] = '2024-01-15' (full match)
// match[1] = '2024' (first group)
// match[2] = '01' (second group)
// match[3] = '15' (third group)

// Named groups (ES2018+)
const namedMatch = date.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);
namedMatch.groups.year;   // '2024'
namedMatch.groups.month;  // '01'
namedMatch.groups.day;    // '15'

// Non-capturing groups (?:...)
/(?:hello|hi) world/  // Matches "hello world" or "hi world" but doesn't capture

// Lookahead assertions
/(?=pattern)/  // Positive lookahead (followed by pattern)
/(?!pattern)/  // Negative lookahead (not followed by pattern)

// Lookbehind assertions (ES2018+)
/(?<=pattern)/ // Positive lookbehind (preceded by pattern)
/(?<!pattern)/ // Negative lookbehind (not preceded by pattern)</code></pre>

        <h3>Regex Methods</h3>
        <pre><code>// test() - returns boolean
/\\d+/.test('abc123');  // true
/\\d+/.test('abc');     // false

// exec() - returns match details or null
const regex = /\\d+/g;
regex.exec('abc123def456');  // ['123', index: 3, input: 'abc123def456']
regex.exec('abc123def456');  // ['456', index: 9, ...] (with /g flag)

// match() - returns array of matches
'hello world'.match(/\\w+/g);  // ['hello', 'world']
'hello'.match(/\\d+/);         // null (no match)

// matchAll() - returns iterator of all matches (ES2020)
const matches = 'hello123world456'.matchAll(/\\d+/g);
for (const match of matches) {
  console.log(match[0]); // '123', then '456'
}

// search() - returns index of first match or -1
'hello world'.search(/world/);  // 6
'hello'.search(/world/);        // -1

// replace() - replace matches
'hello world'.replace(/world/, 'universe');  // 'hello universe'
'hello hello'.replace(/hello/g, 'hi');       // 'hi hi'

// Replace with function
'123 456'.replace(/\\d+/g, (match) => parseInt(match) * 2);  // '246 912'

// Replace with groups
'2024-01-15'.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, '$3/$2/$1');  // '15/01/2024'

// split() - split by pattern
'a,b;c'.split(/[,;]/);        // ['a', 'b', 'c']
'hello world'.split(/\\s+/);   // ['hello', 'world']</code></pre>

        <h3>Common Patterns</h3>
        <pre><code>// Email (simplified - real validation is more complex)
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
emailPattern.test('user@example.com');  // true

// Phone (US format)
const phonePattern = /^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;
phonePattern.test('(555) 123-4567');  // true
phonePattern.test('555-123-4567');   // true

// URL (simplified)
const urlPattern = /^https?:\\/\\/[\\w.-]+(?:\\/[\\w.-]*)*\\/?$/;
urlPattern.test('https://example.com/path');  // true

// Password: 8+ chars, uppercase, lowercase, digit, special
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

// Credit card (simplified)
const cardPattern = /^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$/;

// Date (YYYY-MM-DD)
const datePattern = /^\\d{4}-\\d{2}-\\d{2}$/;</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Escaping special chars:</strong> Escape <code>.</code>, <code>+</code>, <code>*</code>, <code>?</code>, etc. when matching literally</li>
          <li><strong>Greedy vs lazy:</strong> <code>.*</code> is greedy, <code>.*?</code> is lazy</li>
          <li><strong>Anchors:</strong> Use <code>^</code> and <code>$</code> for full string matching</li>
          <li><strong>Global flag:</strong> Remember <code>test()</code> with <code>/g</code> updates lastIndex</li>
          <li><strong>Case sensitivity:</strong> Use <code>/i</code> flag for case-insensitive matching</li>
          <li><strong>Overly complex patterns:</strong> Sometimes simpler code is better than complex regex</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use regex for pattern matching, not for complex parsing</li>
          <li>Test regex thoroughly with edge cases</li>
          <li>Use named groups for readability when possible</li>
          <li>Consider performance for large strings or complex patterns</li>
          <li>Comment complex regex patterns</li>
          <li>Use regex testers/validators during development</li>
          <li>Prefer simple patterns over complex ones when possible</li>
          <li>Be aware of regex injection vulnerabilities in user input</li>
        </ul>
      `,
      examples: [
        {
          title: 'Email Validation',
          code: `function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

console.log(isValidEmail('user@example.com'));  // true
console.log(isValidEmail('invalid-email'));      // false
console.log(isValidEmail('user@domain'));        // false`,
          explanation: 'This regex validates basic email format: alphanumeric + special chars, @, domain, and TLD of at least 2 characters.'
        },
        {
          title: 'Extract Data with Groups',
          code: `const dateStr = '2024-01-15';
const pattern = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = dateStr.match(pattern);

if (match) {
  const [full, year, month, day] = match;
  console.log(\`Year: \${year}, Month: \${month}, Day: \${day}\`);
  // "Year: 2024, Month: 01, Day: 15"
}

// Named groups (ES2018+)
const namedPattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const { groups } = dateStr.match(namedPattern);
console.log(groups.year); // "2024"`,
          explanation: 'Capturing groups extract parts of a match. Named groups provide more readable access.'
        }
      ],
      exercise: {
        description: 'Create a function that validates a password: min 8 chars, at least one uppercase, one lowercase, one digit, and one special char (!@#$%^&*).',
        starterCode: `function solution(password) {
  // Return true if password meets all requirements
  // false otherwise
}`,
        hints: [
          'Check length first',
          'Use separate regex for each requirement',
          'Or combine with lookahead assertions'
        ]
      },
      tests: [
        { id: 't1', description: 'Valid password', input: 'Passw0rd!', expectedOutput: true, isHidden: false },
        { id: 't2', description: 'Too short', input: 'Aa1!', expectedOutput: false, isHidden: false },
        { id: 't3', description: 'No special char', input: 'Password1', expectedOutput: false, isHidden: false },
        { id: 't4', description: 'No uppercase', input: 'password1!', expectedOutput: false, isHidden: true },
        { id: 't5', description: 'No digit', input: 'Password!', expectedOutput: false, isHidden: true },
        { id: 't6', description: 'Complex valid', input: 'MyP@ssw0rd123', expectedOutput: true, isHidden: true }
      ],
      solution: `function solution(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*]/.test(password)) return false;
  return true;
}`,
      difficulty: 6,
      estimatedMinutes: 35
    },

    // Days 20-30: Advanced Backend
    {
      language: 'javascript',
      day: 20,
      title: 'Testing with Jest',
      objectives: ['Write unit tests with Jest', 'Use describe, test, and expect', 'Work with matchers and assertions', 'Mock functions and modules'],
      contentHtml: `
        <h2>Testing with Jest in JavaScript</h2>
        <p>Jest is a comprehensive JavaScript testing framework developed by Facebook. It provides a complete testing solution with built-in assertion library, mocking capabilities, code coverage, and more. Writing tests is essential for building reliable, maintainable applications and catching bugs before they reach production.</p>

        <h3>Why Testing Matters</h3>
        <p>Testing enables you to:</p>
        <ul>
          <li><strong>Catch bugs early:</strong> Find issues during development, not in production</li>
          <li><strong>Document behavior:</strong> Tests serve as executable documentation</li>
          <li><strong>Enable refactoring:</strong> Confidently change code knowing tests will catch regressions</li>
          <li><strong>Improve design:</strong> Writing testable code leads to better architecture</li>
          <li><strong>Prevent regressions:</strong> Ensure new changes don't break existing functionality</li>
        </ul>

        <h3>Basic Test Structure</h3>
        <p>Jest uses describe blocks to group tests and test/it functions for individual tests:</p>
        <pre><code>// Basic test file structure
describe('Calculator', () => {
  // Group related tests together
  
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  
  // it() is an alias for test()
  it('subtracts 5 - 3 to equal 2', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

// Nested describe blocks
describe('Math Utils', () => {
  describe('Basic Operations', () => {
    test('addition works', () => {
      expect(add(1, 1)).toBe(2);
    });
  });
  
  describe('Advanced Operations', () => {
    test('power works', () => {
      expect(power(2, 3)).toBe(8);
    });
  });
});</code></pre>
        <p><strong>Key points:</strong> Use describe to group tests. Use test/it for individual tests. Tests should be independent.</p>

        <h3>Common Matchers</h3>
        <p>Jest provides many matchers for different types of assertions:</p>
        <pre><code>// Equality
expect(value).toBe(4);              // Exact equality (===)
expect(value).toEqual({a: 1});     // Deep equality (for objects/arrays)
expect(value).not.toBe(5);          // Negation

// Truthiness
expect(value).toBeTruthy();         // Truthy value
expect(value).toBeFalsy();          // Falsy value
expect(value).toBeNull();           // Is null
expect(value).toBeUndefined();      // Is undefined
expect(value).toBeDefined();        // Is defined (not undefined)

// Numbers
expect(num).toBeGreaterThan(3);     // > 3
expect(num).toBeGreaterThanOrEqual(3.5); // >= 3.5
expect(num).toBeLessThan(5);        // < 5
expect(num).toBeLessThanOrEqual(4.5); // <= 4.5
expect(num).toBeCloseTo(0.3, 5);    // Floating point comparison

// Strings
expect(str).toMatch(/regex/);        // Matches regex
expect(str).toContain('substring');  // Contains substring

// Arrays and iterables
expect(arr).toContain(item);        // Array contains item
expect(arr).toHaveLength(3);        // Array length
expect(arr).toEqual([1, 2, 3]);     // Array equality

// Objects
expect(obj).toHaveProperty('key');  // Has property
expect(obj).toHaveProperty('key', 'value'); // Property with value
expect(obj).toMatchObject({a: 1});  // Partial match

// Exceptions
expect(() => fn()).toThrow();       // Function throws
expect(() => fn()).toThrow('error message'); // Throws with message
expect(() => fn()).toThrow(Error);  // Throws specific error type</code></pre>

        <h3>Setup and Teardown</h3>
        <p>Jest provides hooks for setup and cleanup:</p>
        <pre><code>describe('Database Tests', () => {
  let db;
  
  // Runs once before all tests in this describe block
  beforeAll(async () => {
    db = await connectDatabase();
  });
  
  // Runs once after all tests
  afterAll(async () => {
    await db.close();
  });
  
  // Runs before each test
  beforeEach(async () => {
    await db.clear();
  });
  
  // Runs after each test
  afterEach(() => {
    // Cleanup after each test
  });
  
  test('inserts a record', async () => {
    await db.insert({ id: 1, name: 'Test' });
    const result = await db.find(1);
    expect(result.name).toBe('Test');
  });
});</code></pre>

        <h3>Mocking Functions</h3>
        <p>Jest makes it easy to mock functions and modules:</p>
        <pre><code>// Mock function
const mockFn = jest.fn();

// Configure return value
mockFn.mockReturnValue(42);
expect(mockFn()).toBe(42);

// Configure implementation
mockFn.mockImplementation((a, b) => a + b);
expect(mockFn(1, 2)).toBe(3);

// Check if called
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith(1, 2);
expect(mockFn).toHaveBeenLastCalledWith(3, 4);

// Reset mock
mockFn.mockReset();
mockFn.mockClear();

// Mock async function
const asyncMock = jest.fn();
asyncMock.mockResolvedValue('success');
const result = await asyncMock();
expect(result).toBe('success');

// Mock rejected promise
asyncMock.mockRejectedValue(new Error('failed'));
await expect(asyncMock()).rejects.toThrow('failed');</code></pre>

        <h3>Mocking Modules</h3>
        <pre><code>// Mock entire module
jest.mock('./api');

// Mock specific function
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Test' }))
}));

// Partial mock (keep some real functions)
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  expensiveFunction: jest.fn()
}));

// Manual mock (create __mocks__ folder)
// __mocks__/api.js
module.exports = {
  fetchUser: jest.fn()
};</code></pre>

        <h3>Async Testing</h3>
        <p>Jest handles async code elegantly:</p>
        <pre><code>// Async/await
test('fetches user data', async () => {
  const user = await fetchUser(1);
  expect(user).toBeDefined();
  expect(user.id).toBe(1);
});

// Promise-based
test('promise resolves', () => {
  return expect(fetchUser(1)).resolves.toEqual({ id: 1 });
});

test('promise rejects', () => {
  return expect(fetchUser(999)).rejects.toThrow('User not found');
});

// Using done callback (for callbacks)
test('callback completes', (done) => {
  function callback(data) {
    expect(data).toBe('done');
    done(); // Tell Jest test is complete
  }
  asyncFunction(callback);
});</code></pre>

        <h3>Testing Best Practices</h3>
        <pre><code>// 1. Arrange-Act-Assert pattern
test('calculates total correctly', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(30);
});

// 2. Test one thing per test
test('validates email format', () => {
  expect(validateEmail('user@example.com')).toBe(true);
});

test('rejects invalid email', () => {
  expect(validateEmail('invalid')).toBe(false);
});

// 3. Use descriptive test names
test('returns error when user not found', () => {
  // ...
});

// 4. Test edge cases
test('handles empty array', () => {
  expect(sum([])).toBe(0);
});

test('handles null input', () => {
  expect(process(null)).toBeNull();
});</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Not awaiting async:</strong> Always await async operations in tests</li>
          <li><strong>Shared state:</strong> Don't share mutable state between tests</li>
          <li><strong>Testing implementation:</strong> Test behavior, not implementation details</li>
          <li><strong>Too many assertions:</strong> Keep tests focused on one thing</li>
          <li><strong>Not cleaning up:</strong> Use afterEach to clean up side effects</li>
          <li><strong>Flaky tests:</strong> Avoid tests that depend on timing or external state</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Write tests before or alongside code (TDD/BDD)</li>
          <li>Keep tests simple and focused</li>
          <li>Use descriptive test names that explain what's being tested</li>
          <li>Test edge cases and error conditions</li>
          <li>Keep tests independent - they should run in any order</li>
          <li>Mock external dependencies (APIs, databases, etc.)</li>
          <li>Aim for high code coverage but focus on meaningful tests</li>
          <li>Refactor tests along with code</li>
        </ul>
      `,
      examples: [
        {
          title: 'Testing a User Service',
          code: `// userService.test.js
describe('UserService', () => {
  describe('validateEmail', () => {
    test('accepts valid email', () => {
      expect(validateEmail('user@example.com')).toBe(true);
    });
    
    test('rejects invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
    });
    
    test('rejects empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });
  
  describe('createUser', () => {
    test('creates user with valid data', () => {
      const user = createUser('Alice', 'alice@test.com');
      expect(user).toEqual({
        name: 'Alice',
        email: 'alice@test.com',
        id: expect.any(String)
      });
    });
    
    test('throws on invalid email', () => {
      expect(() => createUser('Bob', 'invalid'))
        .toThrow('Invalid email');
    });
  });
});`,
          explanation: 'Group related tests with describe blocks. Use specific test names that describe expected behavior.'
        },
        {
          title: 'Setup and Teardown',
          code: `describe('Database Tests', () => {
  let db;
  
  beforeAll(async () => {
    db = await connectDatabase();
  });
  
  afterAll(async () => {
    await db.close();
  });
  
  beforeEach(async () => {
    await db.clear();
  });
  
  test('inserts a record', async () => {
    await db.insert({ id: 1, name: 'Test' });
    const result = await db.find(1);
    expect(result.name).toBe('Test');
  });
});`,
          explanation: 'Use beforeAll/afterAll for expensive setup, beforeEach/afterEach for test isolation.'
        }
      ],
      exercise: {
        description: 'Create a test runner simulation. Given a set of test cases and a function, return which tests pass or fail.',
        starterCode: `function solution(testCases, fn) {
  // testCases: [{input, expected, description}]
  // fn: the function to test (receives result from input)
  // Return: {passed: number, failed: number, results: [{description, passed}]}
}`,
        hints: [
          'Loop through test cases',
          'Call fn with input, compare to expected',
          'Track pass/fail counts'
        ]
      },
      tests: [
        { id: 't1', description: 'All pass', input: [[{ input: 1, expected: 2, description: 'add1' }], (x) => x + 1], expectedOutput: { passed: 1, failed: 0, results: [{ description: 'add1', passed: true }] }, isHidden: false },
        { id: 't2', description: 'All fail', input: [[{ input: 1, expected: 3, description: 'wrong' }], (x) => x + 1], expectedOutput: { passed: 0, failed: 1, results: [{ description: 'wrong', passed: false }] }, isHidden: false },
        { id: 't3', description: 'Mixed', input: [[{ input: 2, expected: 4, description: 't1' }, { input: 3, expected: 5, description: 't2' }], (x) => x * 2], expectedOutput: { passed: 1, failed: 1, results: [{ description: 't1', passed: true }, { description: 't2', passed: false }] }, isHidden: true }
      ],
      solution: `function solution(testCases, fn) {
  let passed = 0;
  let failed = 0;
  const results = [];
  
  for (const tc of testCases) {
    const actual = fn(tc.input);
    const didPass = JSON.stringify(actual) === JSON.stringify(tc.expected);
    if (didPass) passed++; else failed++;
    results.push({ description: tc.description, passed: didPass });
  }
  
  return { passed, failed, results };
}`,
      difficulty: 6,
      estimatedMinutes: 35
    },

    // Continue with remaining advanced backend days
    {
      language: 'javascript',
      day: 21,
      title: 'Functional Programming',
      objectives: ['Understand pure functions and immutability', 'Use function composition', 'Implement currying and partial application', 'Apply functional patterns to real problems'],
      contentHtml: `
        <h2>Functional Programming in JavaScript</h2>
        <p>Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. JavaScript supports functional programming patterns, and understanding them enables you to write more predictable, testable, and maintainable code.</p>

        <h3>Why Functional Programming Matters</h3>
        <p>Functional programming enables you to:</p>
        <ul>
          <li><strong>Write predictable code:</strong> Pure functions always produce same output for same input</li>
          <li><strong>Avoid bugs:</strong> Immutability prevents accidental state changes</li>
          <li><strong>Improve testability:</strong> Pure functions are easy to test</li>
          <li><strong>Enable composition:</strong> Build complex operations from simple functions</li>
          <li><strong>Parallelize code:</strong> Pure functions can run in parallel safely</li>
        </ul>

        <h3>Pure Functions</h3>
        <p>Pure functions have no side effects and always return the same output for the same input:</p>
        <pre><code>// Pure function - no side effects, predictable
function add(a, b) {
  return a + b;
}

// Pure function - doesn't modify input
function incrementAge(user) {
  return { ...user, age: user.age + 1 };
}

// Impure - modifies external state
let total = 0;
function addToTotal(x) {
  total += x;  // Side effect!
  return total;
}

// Impure - depends on external state
function getCurrentTime() {
  return new Date(); // Different result each call
}

// Impure - modifies input
function updateUser(user) {
  user.age = user.age + 1;  // Mutates input!
  return user;
}

// Benefits of pure functions:
// - Easy to test
// - Easy to reason about
// - Can be memoized
// - Can run in parallel
// - No hidden dependencies</code></pre>
        <p><strong>Key points:</strong> Pure functions don't modify external state or depend on mutable state. Same input always produces same output.</p>

        <h3>Immutability</h3>
        <p>Avoid mutating data - create new data instead:</p>
        <pre><code>// Mutable approach (avoid)
const user = { name: 'Alice', age: 30 };
user.age = 31;  // Mutates original object

// Immutable approach (prefer)
const user = { name: 'Alice', age: 30 };
const updatedUser = { ...user, age: 31 };  // New object

// Arrays - avoid mutation
const numbers = [1, 2, 3];

// Bad - mutates array
numbers.push(4);

// Good - creates new array
const newNumbers = [...numbers, 4];
const doubled = numbers.map(n => n * 2);  // New array
const filtered = numbers.filter(n => n > 1);  // New array

// Nested objects - deep copy when needed
const user = { name: 'Alice', address: { city: 'NYC' } };
const updated = {
  ...user,
  address: { ...user.address, city: 'LA' }
};

// Using Object.assign (alternative)
const updated2 = Object.assign({}, user, { age: 31 });</code></pre>
        <p><strong>Benefits:</strong> Prevents bugs, enables time-travel debugging, makes code easier to reason about.</p>

        <h3>Higher-Order Functions</h3>
        <p>Functions that take functions as arguments or return functions:</p>
        <pre><code>// Array methods are higher-order functions
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]

// filter - select elements
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]

// reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15

// forEach - side effects (use sparingly)
numbers.forEach(n => console.log(n));

// find - find first match
const found = numbers.find(n => n > 3);  // 4

// some - check if any match
const hasEven = numbers.some(n => n % 2 === 0);  // true

// every - check if all match
const allPositive = numbers.every(n => n > 0);  // true</code></pre>

        <h3>Function Composition</h3>
        <p>Combine simple functions to build complex operations:</p>
        <pre><code>// Compose - right to left
const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x);

// Pipe - left to right (more readable)
const pipe = (...fns) => x => 
  fns.reduce((acc, fn) => fn(acc), x);

// Example functions
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Compose: apply right to left
const composed = compose(square, double, addOne);
composed(2);  
// addOne(2) = 3
// double(3) = 6
// square(6) = 36

// Pipe: apply left to right (more intuitive)
const piped = pipe(addOne, double, square);
piped(2);  
// addOne(2) = 3
// double(3) = 6
// square(6) = 36

// Real-world example
const processUser = pipe(
  user => ({ ...user, name: user.name.trim() }),
  user => ({ ...user, name: user.name.toLowerCase() }),
  user => ({ ...user, email: \`\${user.name}@example.com\` })
);

const user = { name: '  ALICE  ' };
processUser(user);  
// { name: 'alice', email: 'alice@example.com' }</code></pre>

        <h3>Currying</h3>
        <p>Transform a function with multiple arguments into a series of functions with single arguments:</p>
        <pre><code>// Regular function
const add = (a, b, c) => a + b + c;

// Curried version
const curriedAdd = a => b => c => a + b + c;

curriedAdd(1)(2)(3);  // 6

// Partial application
const add5 = curriedAdd(5);
const add5And10 = add5(10);
add5And10(20);  // 35

// Generic curry helper
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

const curriedMultiply = curry((a, b, c) => a * b * c);
curriedMultiply(2)(3)(4);  // 24
curriedMultiply(2, 3)(4);  // 24
curriedMultiply(2)(3, 4);  // 24</code></pre>

        <h3>Partial Application</h3>
        <p>Pre-fill some arguments of a function:</p>
        <pre><code>// Generic partial application
const partial = (fn, ...args) => 
  (...moreArgs) => fn(...args, ...moreArgs);

const multiply = (a, b, c) => a * b * c;
const double = partial(multiply, 2);
const quadruple = partial(multiply, 2, 2);

double(3, 4);      // 24 (2 * 3 * 4)
quadruple(5);      // 20 (2 * 2 * 5)

// Using bind
const multiplyBy2 = multiply.bind(null, 2);
multiplyBy2(3, 4);  // 24</code></pre>

        <h3>Common Patterns</h3>
        <pre><code>// Pattern 1: Point-free style
const numbers = [1, 2, 3, 4, 5];

// Instead of:
numbers.map(n => double(n))

// Use:
numbers.map(double)

// Pattern 2: Function factories
const createValidator = (min, max) => value => 
  value >= min && value <= max;

const ageValidator = createValidator(0, 150);
ageValidator(25);  // true

// Pattern 3: Memoization with closures
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFunction = memoize((n) => {
  // Expensive calculation
  return n * n;
});</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Mutating shared state:</strong> Always create new objects/arrays</li>
          <li><strong>Side effects in pure functions:</strong> Avoid console.log, DOM manipulation, etc.</li>
          <li><strong>Over-composition:</strong> Don't compose functions just because you can</li>
          <li><strong>Ignoring performance:</strong> Immutability can create many objects - be mindful</li>
          <li><strong>Forgetting to return:</strong> Pure functions must return values</li>
          <li><strong>Mixing paradigms:</strong> Be consistent - don't mix FP and OOP randomly</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Prefer pure functions when possible</li>
          <li>Use immutability for data structures</li>
          <li>Compose small functions into larger ones</li>
          <li>Use higher-order functions (map, filter, reduce) instead of loops</li>
          <li>Keep functions small and focused</li>
          <li>Use currying for reusable function factories</li>
          <li>Consider performance implications of immutability</li>
          <li>Document when side effects are necessary</li>
        </ul>
      `,
      examples: [
        {
          title: 'Pipe and Compose',
          code: `const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processUser = pipe(
  user => ({ ...user, name: user.name.trim() }),
  user => ({ ...user, name: user.name.toLowerCase() }),
  user => ({ ...user, email: \`\${user.name}@example.com\` })
);

const user = { name: '  ALICE  ' };
console.log(processUser(user));
// { name: 'alice', email: 'alice@example.com' }`,
          explanation: 'Pipe applies functions left to right, creating a processing pipeline.'
        },
        {
          title: 'Partial Application',
          code: `// Generic partial application
const partial = (fn, ...args) => 
  (...moreArgs) => fn(...args, ...moreArgs);

const multiply = (a, b, c) => a * b * c;
const double = partial(multiply, 2);
const quadruple = partial(multiply, 2, 2);

console.log(double(3, 4));   // 24 (2 * 3 * 4)
console.log(quadruple(5));   // 20 (2 * 2 * 5)`,
          explanation: 'Partial application pre-fills some arguments, creating a new function.'
        }
      ],
      exercise: {
        description: 'Implement a compose function that combines multiple functions right-to-left. Then use it to create a text processing pipeline.',
        starterCode: `function solution(functions, input) {
  // functions: array of function names ['trim', 'toLowerCase', 'reverse']
  // input: the string to process
  // Apply functions right-to-left (compose order)
  // Available: trim, toLowerCase, toUpperCase, reverse
}`,
        hints: [
          'Implement a compose function',
          'Map function names to actual functions',
          'Apply in right-to-left order'
        ]
      },
      tests: [
        { id: 't1', description: 'Single function', input: [['toLowerCase'], 'HELLO'], expectedOutput: 'hello', isHidden: false },
        { id: 't2', description: 'Compose two', input: [['trim', 'toLowerCase'], '  HELLO  '], expectedOutput: 'hello', isHidden: false },
        { id: 't3', description: 'With reverse', input: [['reverse'], 'hello'], expectedOutput: 'olleh', isHidden: false },
        { id: 't4', description: 'Complex', input: [['trim', 'toUpperCase', 'reverse'], '  abc  '], expectedOutput: 'CBA', isHidden: true },
        { id: 't5', description: 'Empty input', input: [['trim'], ''], expectedOutput: '', isHidden: true }
      ],
      solution: `function solution(functions, input) {
  const fns = {
    trim: s => s.trim(),
    toLowerCase: s => s.toLowerCase(),
    toUpperCase: s => s.toUpperCase(),
    reverse: s => s.split('').reverse().join('')
  };
  
  const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
  const funcsToApply = functions.map(name => fns[name]);
  
  return compose(...funcsToApply)(input);
}`,
      difficulty: 7,
      estimatedMinutes: 40
    },

    // Continue with remaining advanced backend days
    {
      language: 'javascript',
      day: 22,
      title: 'Design Patterns',
      objectives: ['Implement Singleton pattern', 'Use Factory pattern', 'Apply Observer pattern', 'Understand Module pattern'],
      contentHtml: `
        <h2>Design Patterns in JavaScript</h2>
        <p>Design patterns are proven solutions to common programming problems. They provide templates for solving recurring design challenges and help create maintainable, scalable code. Understanding design patterns enables you to write better code and communicate design decisions effectively.</p>

        <h3>Why Design Patterns Matter</h3>
        <p>Design patterns enable you to:</p>
        <ul>
          <li><strong>Solve common problems:</strong> Use proven solutions instead of reinventing the wheel</li>
          <li><strong>Improve code quality:</strong> Patterns lead to more maintainable, readable code</li>
          <li><strong>Facilitate communication:</strong> Patterns provide a shared vocabulary</li>
          <li><strong>Enable flexibility:</strong> Patterns make code more adaptable to change</li>
          <li><strong>Reduce complexity:</strong> Patterns simplify complex problems</li>
        </ul>

        <h3>Singleton Pattern</h3>
        <p>Ensures a class has only one instance and provides global access to it:</p>
        <pre><code>// Classic Singleton
class Database {
  static instance = null;
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  constructor() {
    if (Database.instance) {
      throw new Error('Use Database.getInstance()');
    }
    this.connection = 'connected';
  }
  
  query(sql) {
    return \`Executing: \${sql}\`;
  }
}

// Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true - same instance

// Module pattern singleton (simpler in JavaScript)
const Config = (function() {
  let instance;
  
  function createInstance() {
    return {
      apiUrl: 'https://api.example.com',
      timeout: 5000
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// ES6 module singleton (simplest)
// config.js
let instance = null;

export default function getConfig() {
  if (!instance) {
    instance = { apiUrl: 'https://api.example.com' };
  }
  return instance;
}</code></pre>
        <p><strong>Use cases:</strong> Database connections, configuration objects, logging systems.</p>

        <h3>Factory Pattern</h3>
        <p>Creates objects without specifying the exact class:</p>
        <pre><code>// Simple Factory
class ShapeFactory {
  static create(type, ...args) {
    switch(type) {
      case 'circle':
        return new Circle(...args);
      case 'square':
        return new Square(...args);
      case 'rectangle':
        return new Rectangle(...args);
      default:
        throw new Error(\`Unknown shape type: \${type}\`);
    }
  }
}

// Usage
const circle = ShapeFactory.create('circle', 5);
const square = ShapeFactory.create('square', 10);

// Factory with registration
class AnimalFactory {
  static types = {};
  
  static register(type, AnimalClass) {
    AnimalFactory.types[type] = AnimalClass;
  }
  
  static create(type, ...args) {
    const AnimalClass = AnimalFactory.types[type];
    if (!AnimalClass) {
      throw new Error(\`Unknown animal type: \${type}\`);
    }
    return new AnimalClass(...args);
  }
}

// Register types
AnimalFactory.register('dog', Dog);
AnimalFactory.register('cat', Cat);

// Create instances
const dog = AnimalFactory.create('dog', 'Rex');
const cat = AnimalFactory.create('cat', 'Whiskers');</code></pre>
        <p><strong>Use cases:</strong> Object creation based on configuration, plugin systems, dynamic class instantiation.</p>

        <h3>Observer Pattern</h3>
        <p>Defines a one-to-many dependency between objects - when one changes, all dependents are notified:</p>
        <pre><code>// Event Emitter (Observer pattern)
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  // Subscribe to event
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.off(event, callback);
    };
  }
  
  // Unsubscribe from event
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  // Emit event to all subscribers
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
  
  // Subscribe once
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// Usage
const emitter = new EventEmitter();

// Subscribe
const unsubscribe = emitter.on('data', (data) => {
  console.log('Received:', data);
});

emitter.on('error', (error) => {
  console.error('Error:', error);
});

// Emit events
emitter.emit('data', { message: 'Hello' });
emitter.emit('data', { message: 'World' });

// Unsubscribe
unsubscribe();

// Observer pattern for state management
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(o => o !== observer);
    };
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

class Subject extends Observable {
  constructor() {
    super();
    this.state = {};
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify(this.state);
  }
  
  getState() {
    return this.state;
  }
}</code></pre>
        <p><strong>Use cases:</strong> Event systems, state management, model-view architectures.</p>

        <h3>Module Pattern</h3>
        <p>Encapsulates code and provides public API:</p>
        <pre><code>// Revealing Module Pattern
const UserModule = (function() {
  // Private variables
  let users = [];
  let nextId = 1;
  
  // Private functions
  function validateUser(user) {
    return user.name && user.email;
  }
  
  // Public API
  return {
    add(user) {
      if (validateUser(user)) {
        users.push({ ...user, id: nextId++ });
        return true;
      }
      return false;
    },
    
    getAll() {
      return [...users]; // Return copy
    },
    
    findById(id) {
      return users.find(u => u.id === id);
    },
    
    remove(id) {
      users = users.filter(u => u.id !== id);
    }
  };
})();

// Usage
UserModule.add({ name: 'Alice', email: 'alice@example.com' });
const allUsers = UserModule.getAll();</code></pre>

        <h3>Strategy Pattern</h3>
        <p>Defines a family of algorithms and makes them interchangeable:</p>
        <pre><code>// Payment strategies
class PaymentStrategy {
  pay(amount) {
    throw new Error('pay() must be implemented');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber) {
    super();
    this.cardNumber = cardNumber;
  }
  
  pay(amount) {
    return \`Paid \${amount} using credit card \${this.cardNumber}\`;
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }
  
  pay(amount) {
    return \`Paid \${amount} using PayPal \${this.email}\`;
  }
}

// Context that uses strategy
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  processPayment(amount) {
    return this.strategy.pay(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardStrategy('1234-5678'));
processor.processPayment(100);

processor.setStrategy(new PayPalStrategy('user@example.com'));
processor.processPayment(200);</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Overusing patterns:</strong> Don't force patterns where simple code works</li>
          <li><strong>Singleton abuse:</strong> Singletons can make testing difficult</li>
          <li><strong>Complex factories:</strong> Keep factories simple - don't over-engineer</li>
          <li><strong>Memory leaks:</strong> Remember to unsubscribe observers</li>
          <li><strong>Pattern mismatch:</strong> Choose patterns that fit the problem</li>
          <li><strong>Ignoring JavaScript idioms:</strong> Adapt patterns to JavaScript's strengths</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use patterns when they solve real problems, not just because they exist</li>
          <li>Adapt patterns to JavaScript's strengths (closures, first-class functions)</li>
          <li>Keep implementations simple - don't over-engineer</li>
          <li>Consider alternatives - sometimes simple functions are better than patterns</li>
          <li>Document why you're using a pattern</li>
          <li>Be aware of trade-offs (e.g., singletons make testing harder)</li>
          <li>Use modern JavaScript features (modules, classes) when appropriate</li>
        </ul>
      `,
      examples: [
        { title: 'Event Emitter Usage', code: `const emitter = new EventEmitter();\nemitter.on('data', (d) => console.log(d));\nemitter.emit('data', { msg: 'Hello' });`, explanation: 'Observer pattern for event handling.' },
        { title: 'Factory with Polymorphism', code: `const shapes = ['circle', 'square'].map(ShapeFactory.create);\nshapes.forEach(s => s.draw());`, explanation: 'Factory creates objects without specifying exact class.' }
      ],
      exercise: { description: 'Implement a simple EventEmitter with on, off, and emit methods.', starterCode: `function solution(operations) {\n  // [{type:'on',event,callback}, {type:'emit',event,args}, {type:'off',event,callback}]\n  // Return array of emitted callback results\n}`, hints: ['Store listeners in object', 'on adds, off removes', 'emit calls all listeners'] },
      tests: [
        { id: 't1', description: 'Basic emit', input: [{ type: 'on', event: 'test', cbId: 1 }, { type: 'emit', event: 'test', args: ['hello'] }], expectedOutput: [{ cbId: 1, args: ['hello'] }], isHidden: false },
        { id: 't2', description: 'Multiple listeners', input: [{ type: 'on', event: 'e', cbId: 1 }, { type: 'on', event: 'e', cbId: 2 }, { type: 'emit', event: 'e', args: [1] }], expectedOutput: [{ cbId: 1, args: [1] }, { cbId: 2, args: [1] }], isHidden: false },
        { id: 't3', description: 'Off removes', input: [{ type: 'on', event: 'e', cbId: 1 }, { type: 'off', event: 'e', cbId: 1 }, { type: 'emit', event: 'e', args: [1] }], expectedOutput: [], isHidden: true }
      ],
      solution: `function solution(operations) {
  const events = {};
  const results = [];
  for (const op of operations) {
    if (op.type === 'on') {
      if (!events[op.event]) events[op.event] = [];
      events[op.event].push(op.cbId);
    } else if (op.type === 'off') {
      events[op.event] = events[op.event]?.filter(id => id !== op.cbId) || [];
    } else if (op.type === 'emit') {
      (events[op.event] || []).forEach(cbId => results.push({cbId, args: op.args}));
    }
  }
  return results;
}`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 23,
      title: 'Memory and Performance',
      objectives: ['Identify memory leaks', 'Optimize loops and algorithms', 'Use performance APIs', 'Apply debouncing and throttling'],
      contentHtml: `
        <h2>Memory and Performance Optimization in JavaScript</h2>
        <p>Performance optimization is crucial for creating fast, responsive applications. Understanding memory management, performance bottlenecks, and optimization techniques enables you to build applications that scale and provide excellent user experiences. JavaScript's performance characteristics require specific strategies.</p>

        <h3>Why Performance Matters</h3>
        <p>Performance optimization enables you to:</p>
        <ul>
          <li><strong>Improve user experience:</strong> Faster applications feel more responsive</li>
          <li><strong>Reduce costs:</strong> Efficient code uses fewer resources</li>
          <li><strong>Scale better:</strong> Optimized code handles more load</li>
          <li><strong>Save battery:</strong> Efficient code uses less CPU/power</li>
          <li><strong>Handle large datasets:</strong> Optimize for processing big data</li>
        </ul>

        <h3>Debouncing</h3>
        <p>Delay function execution until after a period of inactivity:</p>
        <pre><code>function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Usage: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Immediate execution option
function debounceImmediate(fn, delay, immediate = false) {
  let timeoutId;
  return function(...args) {
    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}</code></pre>
        <p><strong>Use cases:</strong> Search inputs, resize handlers, scroll handlers, API calls on user input.</p>

        <h3>Throttling</h3>
        <p>Limit function execution to at most once per time period:</p>
        <pre><code>function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Leading and trailing options
function throttleAdvanced(fn, limit) {
  let lastRun;
  let timeoutId;
  
  return function(...args) {
    if (!lastRun) {
      fn.apply(this, args);
      lastRun = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRun >= limit) {
          fn.apply(this, args);
          lastRun = Date.now();
        }
      }, limit - (Date.now() - lastRun));
    }
  };
}

// Usage: Scroll handler
const throttledScroll = throttle(() => {
  console.log('Scrolling');
}, 100);

window.addEventListener('scroll', throttledScroll);</code></pre>
        <p><strong>Use cases:</strong> Scroll handlers, resize handlers, mouse move events, API polling.</p>

        <h3>Memoization</h3>
        <p>Cache function results to avoid recomputation:</p>
        <pre><code>// Basic memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage: Expensive calculations
const expensiveFunction = memoize((n) => {
  console.log('Computing...');
  return n * n * n;
});

expensiveFunction(5);  // Computing... returns 125
expensiveFunction(5);  // Returns 125 (from cache)

// Memoization with size limit (LRU cache)
function memoizeLRU(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn.apply(this, args);
    
    if (cache.size >= maxSize) {
      // Remove least recently used (first item)
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}</code></pre>

        <h3>Performance Measurement</h3>
        <pre><code>// Performance API
const start = performance.now();
// ... code to measure ...
const end = performance.now();
console.log(\`Execution time: \${end - start}ms\`);

const measure = performance.getEntriesByName('duration')[0];
console.log(\`Duration: \${measure.duration}ms\`);

// Memory usage (if available)
if (performance.memory) {
  console.log('Used:', performance.memory.usedJSHeapSize);
  console.log('Total:', performance.memory.totalJSHeapSize);
  console.log('Limit:', performance.memory.jsHeapSizeLimit);
}</code></pre>

        <h3>Memory Leaks</h3>
        <p>Common causes and how to avoid them:</p>
        <pre><code>// 1. Event listeners not removed
function setup() {
  const button = document.getElementById('btn');
  button.addEventListener('click', handleClick);
  // Missing: button.removeEventListener('click', handleClick);
}

// Fix: Remove listeners
function setup() {
  const button = document.getElementById('btn');
  const handler = () => handleClick();
  button.addEventListener('click', handler);
  
  // Cleanup
  return () => button.removeEventListener('click', handler);
}

// 2. Closures holding references
function createHandler() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    // largeData is kept in memory even if not used!
    console.log('Handler');
  };
}

// Fix: Clear references
function createHandler() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    console.log('Handler');
    // Clear reference when done
    largeData.length = 0;
  };
}

// 3. Timers not cleared
const intervalId = setInterval(() => {
  // ...
}, 1000);
// Missing: clearInterval(intervalId);

// Fix: Always clear
const intervalId = setInterval(() => {
  // ...
}, 1000);

// Cleanup
clearInterval(intervalId);</code></pre>

        <h3>Optimization Techniques</h3>
        <pre><code>// 1. Use efficient algorithms
// O(n²) - slow
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) duplicates.push(arr[i]);
    }
  }
  return duplicates;
}

// O(n) - fast
function findDuplicatesFast(arr) {
  const seen = new Set();
  const duplicates = [];
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.push(item);
    } else {
      seen.add(item);
    }
  }
  return duplicates;
}

// 2. Lazy evaluation
function* generateNumbers() {
  for (let i = 0; i < 1000000; i++) {
    yield i;
  }
}

// Only computes what's needed
const numbers = generateNumbers();
const firstTen = Array.from({ length: 10 }, () => numbers.next().value);

// 3. Virtual scrolling (for large lists)
function renderVisibleItems(items, containerHeight, itemHeight) {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = startIndex + visibleCount;
  
  return items.slice(startIndex, endIndex);
}

// 4. Batch DOM updates
// Bad: Multiple reflows
for (let i = 0; i < 1000; i++) {
  element.style.width = i + 'px';
}

// Good: Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.style.width = i + 'px';
  fragment.appendChild(div);
}
container.appendChild(fragment);</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Premature optimization:</strong> Measure first, optimize what matters</li>
          <li><strong>Memory leaks:</strong> Always clean up event listeners, timers, subscriptions</li>
          <li><strong>Inefficient loops:</strong> Use appropriate array methods or optimized loops</li>
          <li><strong>Unnecessary re-renders:</strong> Avoid creating new objects/functions in render</li>
          <li><strong>Large bundle sizes:</strong> Code split and lazy load when possible</li>
          <li><strong>Blocking the main thread:</strong> Use Web Workers for heavy computation</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Measure performance before optimizing</li>
          <li>Use debounce/throttle for frequent events</li>
          <li>Memoize expensive function calls</li>
          <li>Clean up resources (listeners, timers, subscriptions)</li>
          <li>Use efficient data structures (Map, Set when appropriate)</li>
          <li>Avoid creating unnecessary objects in loops</li>
          <li>Use Web Workers for CPU-intensive tasks</li>
          <li>Profile memory usage and watch for leaks</li>
        </ul>
      `,
      examples: [
        { title: 'Memoized Fibonacci', code: `const fib = memoize(n => n <= 1 ? n : fib(n-1) + fib(n-2));\nconsole.log(fib(50)); // Fast!`, explanation: 'Memoization caches results of expensive function calls.' },
        { title: 'Debounced Search', code: `const search = debounce(query => fetch('/search?q=' + query), 300);\ninput.addEventListener('input', e => search(e.target.value));`, explanation: 'Debounce waits until user stops typing.' }
      ],
      exercise: { description: 'Implement a memoize function that caches results based on arguments.', starterCode: `function solution(fn, calls) {\n  // Use memoize\n  // calls: array of argument arrays\n  // Return: {results: [], cacheHits: number}\n}`, hints: ['Use Map for cache', 'JSON.stringify args as key', 'Track cache hits'] },
      tests: [
        { id: 't1', description: 'No cache hits', input: [(x) => x * 2, [[1], [2], [3]]], expectedOutput: { results: [2, 4, 6], cacheHits: 0 }, isHidden: false },
        { id: 't2', description: 'With cache hit', input: [(x) => x * 2, [[1], [1], [2]]], expectedOutput: { results: [2, 2, 4], cacheHits: 1 }, isHidden: false },
        { id: 't3', description: 'All cached', input: [(x) => x, [[5], [5], [5]]], expectedOutput: { results: [5, 5, 5], cacheHits: 2 }, isHidden: true }
      ],
      solution: `function solution(fn, calls) {
  const cache = new Map();
  let cacheHits = 0;
  const results = [];
  for (const args of calls) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      results.push(cache.get(key));
      cacheHits++;
    } else {
      const result = fn(...args);
      cache.set(key, result);
      results.push(result);
    }
  }
  return { results, cacheHits };
}`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 24,
      title: 'Web Workers',
      objectives: ['Create Web Workers', 'Communicate with postMessage', 'Handle worker errors', 'Use SharedArrayBuffer'],
      contentHtml: `
        <h2>Web Workers in JavaScript</h2>
        <p>Web Workers enable you to run JavaScript code in background threads, separate from the main execution thread. This allows you to perform CPU-intensive operations without blocking the UI, creating responsive applications even during heavy computation.</p>

        <h3>Why Web Workers Matter</h3>
        <p>Web Workers enable you to:</p>
        <ul>
          <li><strong>Prevent UI blocking:</strong> Run heavy computations without freezing the browser</li>
          <li><strong>Improve responsiveness:</strong> Keep the main thread free for user interactions</li>
          <li><strong>Parallelize work:</strong> Process multiple tasks simultaneously</li>
          <li><strong>Handle large datasets:</strong> Process big data without blocking</li>
        </ul>

        <h3>Creating a Web Worker</h3>
        <pre><code>// worker.js (separate file)
self.onmessage = function(e) {
  const data = e.data;
  // Process data
  const result = heavyComputation(data);
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

worker.onmessage = function(e) {
  console.log('Result:', e.data);
};

worker.onerror = function(error) {
  console.error('Worker error:', error);
};

// Terminate worker when done
worker.terminate();</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Blocking main thread:</strong> Use workers for heavy computation</li>
          <li><strong>Not handling errors:</strong> Always implement error handlers</li>
          <li><strong>Memory leaks:</strong> Terminate workers when done</li>
          <li><strong>Overhead:</strong> Don't use workers for trivial operations</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use workers for CPU-intensive tasks</li>
          <li>Keep message payloads small</li>
          <li>Terminate workers when finished</li>
          <li>Handle errors gracefully</li>
          <li>Consider worker pools for multiple tasks</li>
        </ul>
      `,
      examples: [
        { title: 'Worker Pool', code: `const workers = Array(4).fill(null).map(() => new Worker('worker.js'));\n// Distribute tasks across workers`, explanation: 'Use multiple workers for parallel processing.' },
        { title: 'SharedArrayBuffer', code: `const buffer = new SharedArrayBuffer(1024);\nworker.postMessage(buffer);`, explanation: 'Share memory between main thread and workers.' }
      ],
      exercise: { description: 'Simulate parallel task processing with workers.', starterCode: `function solution(tasks, workerCount) {\n  // Process tasks in parallel using workers\n}`, hints: ['Create worker pool', 'Distribute tasks', 'Collect results'] },
      tests: [
        { id: 't1', description: 'Process tasks', input: [[1, 2, 3], 2], expectedOutput: [2, 4, 6], isHidden: false },
        { id: 't2', description: 'Single worker', input: [[5], 1], expectedOutput: [10], isHidden: true }
      ],
      solution: `function solution(tasks, workerCount) {\n  return tasks.map(t => t * 2);\n}`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 25,
      title: 'WebSockets',
      objectives: ['Create WebSocket connections', 'Handle real-time messaging', 'Manage connection lifecycle', 'Implement reconnection logic'],
      contentHtml: `
        <h2>WebSockets in JavaScript</h2>
        <p>WebSockets provide full-duplex communication channels over a single TCP connection, enabling real-time, bidirectional communication between client and server. This is essential for building interactive applications like chat, live updates, and gaming.</p>

        <h3>Why WebSockets Matter</h3>
        <p>WebSockets enable you to:</p>
        <ul>
          <li><strong>Real-time communication:</strong> Instant bidirectional messaging</li>
          <li><strong>Lower latency:</strong> No HTTP overhead after initial handshake</li>
          <li><strong>Persistent connections:</strong> Maintain connection for continuous communication</li>
          <li><strong>Efficient updates:</strong> Server can push updates without polling</li>
        </ul>

        <h3>Basic WebSocket Usage</h3>
        <pre><code>const ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = () => {
  console.log('Connected');
  ws.send('Hello Server');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

ws.onerror = (error) => {
  console.error('Error:', error);
};

ws.onclose = () => {
  console.log('Disconnected');
};

// Send data
ws.send(JSON.stringify({ type: 'message', data: 'Hello' }));

// Close connection
ws.close();</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Not handling reconnection:</strong> Implement reconnection logic</li>
          <li><strong>Memory leaks:</strong> Close connections properly</li>
          <li><strong>No error handling:</strong> Always handle errors</li>
          <li><strong>Message format:</strong> Use consistent message structure</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Implement reconnection logic</li>
          <li>Use structured message formats (JSON)</li>
          <li>Handle connection states properly</li>
          <li>Clean up on component unmount</li>
          <li>Use wss:// for secure connections</li>
        </ul>
      `,
      examples: [
        { title: 'WebSocket Wrapper', code: `class WSClient {\n  constructor(url) {\n    this.url = url;\n    this.ws = null;\n  }\n  connect() { /* ... */ }\n  send(data) { /* ... */ }\n}`, explanation: 'Wrap WebSocket in a class for better management.' },
        { title: 'Reconnection Logic', code: `function reconnect(ws, delay) {\n  setTimeout(() => {\n    ws = new WebSocket(ws.url);\n  }, delay);\n}`, explanation: 'Implement automatic reconnection.' }
      ],
      exercise: { description: 'Implement message queue simulation.', starterCode: `function solution(messages) {\n  // Process messages in order\n}`, hints: ['Use queue', 'Process sequentially', 'Handle errors'] },
      tests: [
        { id: 't1', description: 'Process queue', input: ['msg1', 'msg2'], expectedOutput: ['msg1', 'msg2'], isHidden: false },
        { id: 't2', description: 'Empty queue', input: [], expectedOutput: [], isHidden: true }
      ],
      solution: `function solution(messages) { return messages; }`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 26,
      title: 'Security Best Practices',
      objectives: ['Prevent XSS attacks', 'Avoid CSRF vulnerabilities', 'Sanitize user input', 'Implement Content Security Policy'],
      contentHtml: `
        <h2>Security Best Practices in JavaScript</h2>
        <p>Security is paramount in web development. Understanding common vulnerabilities and how to prevent them is essential for building safe applications. JavaScript applications face unique security challenges that require specific defensive strategies.</p>

        <h3>Why Security Matters</h3>
        <p>Security practices enable you to:</p>
        <ul>
          <li><strong>Protect users:</strong> Prevent data breaches and attacks</li>
          <li><strong>Maintain trust:</strong> Users trust secure applications</li>
          <li><strong>Comply with regulations:</strong> Meet security requirements</li>
          <li><strong>Prevent attacks:</strong> Stop XSS, CSRF, and injection attacks</li>
        </ul>

        <h3>XSS (Cross-Site Scripting) Prevention</h3>
        <pre><code>// Dangerous - XSS vulnerability
const userInput = '<script>alert("XSS")</script>';
element.innerHTML = userInput; // Executes script!

// Safe - escape HTML
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

element.innerHTML = escapeHTML(userInput); // Safe

// Or use textContent
element.textContent = userInput; // Safe

// Sanitize with DOMPurify library
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);</code></pre>

        <h3>CSRF (Cross-Site Request Forgery) Prevention</h3>
        <pre><code>// Include CSRF token in requests
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});</code></pre>

        <h3>Input Validation</h3>
        <pre><code>function sanitizeInput(input) {
  // Remove script tags
  return input.replace(/<script[^>]*>.*?<\\/script>/gi, '');
  
  // Validate format
  if (!/^[a-zA-Z0-9]+$/.test(input)) {
    throw new Error('Invalid input');
  }
  
  return input;
}</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Using innerHTML:</strong> Use textContent or sanitize</li>
          <li><strong>eval():</strong> Never use eval() with user input</li>
          <li><strong>Not validating:</strong> Always validate and sanitize input</li>
          <li><strong>Exposing sensitive data:</strong> Don't expose tokens, keys in client code</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Always sanitize user input</li>
          <li>Use Content Security Policy (CSP)</li>
          <li>Validate on both client and server</li>
          <li>Use HTTPS for all connections</li>
          <li>Implement proper authentication</li>
          <li>Keep dependencies updated</li>
        </ul>
      `,
      examples: [
        { title: 'Input Sanitization', code: `function sanitize(str) {\n  return str.replace(/[<>]/g, '');\n}`, explanation: 'Remove potentially dangerous characters.' },
        { title: 'CSP Header', code: `Content-Security-Policy: default-src 'self'; script-src 'self'`, explanation: 'Restrict resource loading.' }
      ],
      exercise: { description: 'Sanitize HTML input safely.', starterCode: `function solution(html) {\n  // Remove script tags and dangerous attributes\n}`, hints: ['Remove script tags', 'Remove event handlers', 'Return safe HTML'] },
      tests: [
        { id: 't1', description: 'Remove script', input: '<p>Hello</p><script>alert(1)</script>', expectedOutput: '<p>Hello</p>', isHidden: false },
        { id: 't2', description: 'Safe HTML', input: '<p>Safe</p>', expectedOutput: '<p>Safe</p>', isHidden: true }
      ],
      solution: `function solution(html) { return html.replace(/<script[^>]*>.*?<\\/script>/gi, ''); }`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 27,
      title: 'Node.js Fundamentals',
      objectives: ['Use Node.js modules', 'Work with file system', 'Handle environment variables', 'Use npm packages'],
      contentHtml: `
        <h2>Node.js Fundamentals</h2>
        <p>Node.js enables JavaScript to run on the server, opening up backend development possibilities. Understanding Node.js fundamentals is essential for full-stack JavaScript development.</p>

        <h3>Why Node.js Matters</h3>
        <p>Node.js enables you to:</p>
        <ul>
          <li><strong>Full-stack JavaScript:</strong> Use same language frontend and backend</li>
          <li><strong>Build APIs:</strong> Create RESTful and GraphQL APIs</li>
          <li><strong>Handle I/O:</strong> Efficiently handle file system and network operations</li>
          <li><strong>Use npm ecosystem:</strong> Access vast package ecosystem</li>
        </ul>

        <h3>Core Modules</h3>
        <pre><code>// File system
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Path
const path = require('path');
const fullPath = path.join(__dirname, 'file.txt');

// Process
process.env.NODE_ENV;
process.argv; // Command line arguments</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Blocking operations:</strong> Use async versions</li>
          <li><strong>Not handling errors:</strong> Always handle errors</li>
          <li><strong>Sync operations:</strong> Avoid sync methods in production</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use async/await for file operations</li>
          <li>Handle errors properly</li>
          <li>Use environment variables for config</li>
          <li>Follow Node.js conventions</li>
        </ul>
      `,
      examples: [
        { title: 'Async File Read', code: `const fs = require('fs').promises;\nasync function read() {\n  const data = await fs.readFile('file.txt', 'utf8');\n}`, explanation: 'Use promises for async operations.' },
        { title: 'Environment Variables', code: `const port = process.env.PORT || 3000;`, explanation: 'Use env vars for configuration.' }
      ],
      exercise: { description: 'Parse command line arguments.', starterCode: `function solution(args) {\n  // Parse --key=value format\n}`, hints: ['Split arguments', 'Parse key=value', 'Return object'] },
      tests: [
        { id: 't1', description: 'Parse args', input: ['--name=Alice', '--age=30'], expectedOutput: { name: 'Alice', age: '30' }, isHidden: false },
        { id: 't2', description: 'Empty', input: [], expectedOutput: {}, isHidden: true }
      ],
      solution: `function solution(args) {\n  const result = {};\n  args.forEach(arg => {\n    const [key, value] = arg.replace('--', '').split('=');\n    result[key] = value;\n  });\n  return result;\n}`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 28,
      title: 'Express Middleware',
      objectives: ['Create Express middleware', 'Use middleware chains', 'Handle errors', 'Implement authentication middleware'],
      contentHtml: `
        <h2>Express Middleware</h2>
        <p>Express middleware are functions that execute during the request-response cycle. They can modify requests, responses, end the cycle, or call the next middleware. Understanding middleware is crucial for building Express applications.</p>

        <h3>Why Middleware Matters</h3>
        <p>Middleware enables you to:</p>
        <ul>
          <li><strong>Modify requests:</strong> Parse, validate, transform data</li>
          <li><strong>Add functionality:</strong> Logging, authentication, error handling</li>
          <li><strong>Reuse code:</strong> Share logic across routes</li>
          <li><strong>Control flow:</strong> Decide request handling</li>
        </ul>

        <h3>Basic Middleware</h3>
        <pre><code>app.use((req, res, next) => {
  console.log('Request:', req.method, req.path);
  next(); // Continue to next middleware
});

// Route-specific middleware
app.get('/users', authMiddleware, (req, res) => {
  res.json(users);
});</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Forgetting next():</strong> Call next() or response ends</li>
          <li><strong>Wrong order:</strong> Middleware order matters</li>
          <li><strong>Not handling errors:</strong> Use error middleware</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Always call next() or send response</li>
          <li>Order middleware correctly</li>
          <li>Use error handling middleware</li>
          <li>Keep middleware focused</li>
        </ul>
      `,
      examples: [
        { title: 'Auth Middleware', code: `function auth(req, res, next) {\n  if (req.headers.authorization) next();\n  else res.status(401).json({ error: 'Unauthorized' });\n}`, explanation: 'Protect routes with authentication.' },
        { title: 'Error Middleware', code: `app.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});`, explanation: 'Handle errors globally.' }
      ],
      exercise: { description: 'Implement middleware chain.', starterCode: `function solution(middlewares, req) {\n  // Execute middlewares in order\n}`, hints: ['Chain middlewares', 'Call next()', 'Return final result'] },
      tests: [
        { id: 't1', description: 'Chain works', input: [[(req, next) => { req.x = 1; next(); }, (req, next) => { req.x += 1; next(); }], {}], expectedOutput: { x: 2 }, isHidden: false },
        { id: 't2', description: 'Single middleware', input: [[(req, next) => { req.y = 5; next(); }], {}], expectedOutput: { y: 5 }, isHidden: true }
      ],
      solution: `function solution(middlewares, req) {\n  let index = 0;\n  function next() {\n    if (index < middlewares.length) {\n      middlewares[index++](req, next);\n    }\n  }\n  next();\n  return req;\n}`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 29,
      title: 'REST API Design',
      objectives: ['Design RESTful routes', 'Implement CRUD operations', 'Handle HTTP status codes', 'Version APIs'],
      contentHtml: `
        <h2>REST API Design</h2>
        <p>REST (Representational State Transfer) is an architectural style for designing web services. Well-designed REST APIs are intuitive, scalable, and maintainable. Understanding REST principles is essential for backend development.</p>

        <h3>Why REST Matters</h3>
        <p>REST enables you to:</p>
        <ul>
          <li><strong>Standardize APIs:</strong> Follow consistent patterns</li>
          <li><strong>Improve scalability:</strong> Stateless design scales well</li>
          <li><strong>Enable caching:</strong> HTTP caching works naturally</li>
          <li><strong>Simplify integration:</strong> Standard HTTP methods</li>
        </ul>

        <h3>REST Principles</h3>
        <pre><code>// Resources are nouns
GET    /api/users          // Get all users
GET    /api/users/1        // Get user 1
POST   /api/users          // Create user
PUT    /api/users/1        // Update user 1
DELETE /api/users/1        // Delete user 1

// Status codes
200 OK           // Success
201 Created      // Resource created
400 Bad Request  // Client error
404 Not Found    // Resource not found
500 Server Error // Server error</code></pre>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Using verbs in URLs:</strong> Use nouns for resources</li>
          <li><strong>Wrong HTTP methods:</strong> Use appropriate methods</li>
          <li><strong>Inconsistent responses:</strong> Standardize response format</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Use nouns for resources</li>
          <li>Use proper HTTP methods</li>
          <li>Return appropriate status codes</li>
          <li>Version your APIs</li>
          <li>Use consistent response format</li>
        </ul>
      `,
      examples: [
        { title: 'RESTful Routes', code: `app.get('/api/v1/users', getUsers);\napp.post('/api/v1/users', createUser);\napp.put('/api/v1/users/:id', updateUser);`, explanation: 'Follow REST conventions.' },
        { title: 'Response Format', code: `res.status(200).json({ success: true, data: users });`, explanation: 'Consistent response structure.' }
      ],
      exercise: { description: 'Design RESTful routing logic.', starterCode: `function solution(method, path) {\n  // Return {resource, id, action}\n}`, hints: ['Parse path', 'Extract resource', 'Determine action'] },
      tests: [
        { id: 't1', description: 'GET users', input: ['GET', '/api/users'], expectedOutput: { resource: 'users', id: null, action: 'list' }, isHidden: false },
        { id: 't2', description: 'GET user by id', input: ['GET', '/api/users/1'], expectedOutput: { resource: 'users', id: '1', action: 'get' }, isHidden: true }
      ],
      solution: `function solution(method, path) {\n  const parts = path.split('/').filter(p => p);\n  const resource = parts[parts.length - 2] || parts[parts.length - 1];\n  const id = parts[parts.length - 1] !== resource ? parts[parts.length - 1] : null;\n  const actions = { GET: id ? 'get' : 'list', POST: 'create', PUT: 'update', DELETE: 'delete' };\n  return { resource, id, action: actions[method] };\n}`
    },

    // Continue with the remaining advanced backend days
    {
      language: 'javascript',
      day: 30,
      title: 'Capstone: Full Stack App',
      objectives: ['Build complete application', 'Integrate all concepts', 'Implement best practices', 'Deploy application'],
      contentHtml: `
        <h2>Capstone: Full Stack Application</h2>
        <p>This capstone project brings together all concepts learned throughout the 30-day journey. You'll build a complete full-stack application using modern JavaScript practices, combining frontend, backend, database, authentication, and deployment.</p>

        <h3>Project Overview</h3>
        <p>Build a task management application with:</p>
        <ul>
          <li>User authentication (register, login, OAuth)</li>
          <li>CRUD operations for tasks</li>
          <li>Real-time updates</li>
          <li>Data persistence</li>
          <li>Responsive UI</li>
        </ul>

        <h3>Architecture</h3>
        <pre><code>Frontend (React)
  ↓
API Layer (Express)
  ↓
Database (MongoDB)
  ↓
Authentication (JWT)</code></pre>

        <h3>Key Features</h3>
        <ul>
          <li>User registration and authentication</li>
          <li>Task creation, reading, updating, deletion</li>
          <li>Task filtering and search</li>
          <li>User profiles</li>
          <li>Real-time notifications</li>
        </ul>

        <h3>Best Practices Applied</h3>
        <ul>
          <li>RESTful API design</li>
          <li>Error handling</li>
          <li>Input validation</li>
          <li>Security best practices</li>
          <li>Code organization</li>
          <li>Testing</li>
        </ul>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Not planning:</strong> Plan architecture before coding</li>
          <li><strong>Skipping validation:</strong> Validate all inputs</li>
          <li><strong>Ignoring errors:</strong> Handle errors properly</li>
          <li><strong>Not testing:</strong> Write tests for critical paths</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Plan before implementing</li>
          <li>Build incrementally</li>
          <li>Test as you go</li>
          <li>Follow security best practices</li>
          <li>Document your code</li>
          <li>Optimize for performance</li>
        </ul>
      `,
      examples: [
        { title: 'Complete API', code: `// Express routes\napp.post('/api/tasks', createTask);\napp.get('/api/tasks', getTasks);\napp.put('/api/tasks/:id', updateTask);`, explanation: 'Full CRUD API implementation.' },
        { title: 'Frontend Integration', code: `const tasks = await fetch('/api/tasks').then(r => r.json());`, explanation: 'Consume API from frontend.' }
      ],
      exercise: { description: 'Build complete CRUD API simulation.', starterCode: `function solution(operations) {\n  // Simulate full CRUD API\n}`, hints: ['Handle CREATE, READ, UPDATE, DELETE', 'Maintain state', 'Return appropriate responses'] },
      tests: [
        { id: 't1', description: 'Create and read', input: [{ type: 'CREATE', data: { id: 1, name: 'Task' } }, { type: 'READ', id: 1 }], expectedOutput: [{ id: 1, name: 'Task' }], isHidden: false },
        { id: 't2', description: 'Update', input: [{ type: 'CREATE', data: { id: 1, name: 'Old' } }, { type: 'UPDATE', id: 1, data: { name: 'New' } }], expectedOutput: [{ id: 1, name: 'New' }], isHidden: true }
      ],
      solution: `function solution(operations) {\n  const store = {};\n  const results = [];\n  for (const op of operations) {\n    if (op.type === 'CREATE') store[op.data.id] = op.data;\n    else if (op.type === 'READ') results.push(store[op.id]);\n    else if (op.type === 'UPDATE') store[op.id] = { ...store[op.id], ...op.data };\n    else if (op.type === 'DELETE') delete store[op.id];\n  }\n  return results;\n}`
    }
  ];
}
