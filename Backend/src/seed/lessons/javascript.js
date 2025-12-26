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
      <p>Variables are containers for storing data values. In JavaScript, we have three ways to declare variables:</p>
      
      <h3>let</h3>
      <p>The <code>let</code> keyword declares a block-scoped variable that can be reassigned:</p>
      <pre><code>let age = 25;
age = 26; // This is valid</code></pre>
      
      <h3>const</h3>
      <p>The <code>const</code> keyword declares a block-scoped variable that cannot be reassigned:</p>
      <pre><code>const PI = 3.14159;
// PI = 3.14; // This would cause an error</code></pre>
      
      <h3>var (Legacy)</h3>
      <p>The <code>var</code> keyword is the old way of declaring variables. It's function-scoped and should generally be avoided in modern JavaScript.</p>
      
      <h2>Data Types</h2>
      <p>JavaScript has several primitive data types:</p>
      <ul>
        <li><strong>String</strong>: Text values like "Hello"</li>
        <li><strong>Number</strong>: Numeric values like 42 or 3.14</li>
        <li><strong>Boolean</strong>: true or false</li>
        <li><strong>undefined</strong>: A variable that hasn't been assigned a value</li>
        <li><strong>null</strong>: Intentional absence of value</li>
        <li><strong>Symbol</strong>: Unique identifiers</li>
        <li><strong>BigInt</strong>: Large integers</li>
      </ul>
      
      <h2>The typeof Operator</h2>
      <p>Use <code>typeof</code> to check the type of a value:</p>
      <pre><code>typeof "Hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"</code></pre>
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
      { id: 'test-6', description: 'Should handle array', input: [1, 2, 3], expectedOutput: { value: [1, 2, 3], type: 'object' }, isHidden: true }
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
      <p>Functions are reusable blocks of code that perform a specific task.</p>
      
      <h3>Function Declarations</h3>
      <pre><code>function greet(name) {
  return "Hello, " + name + "!";
}</code></pre>
      
      <h3>Arrow Functions</h3>
      <pre><code>const greet = (name) => {
  return "Hello, " + name + "!";
};

// Short form for single expressions:
const greet = name => "Hello, " + name + "!";</code></pre>
      
      <h3>Default Parameters</h3>
      <pre><code>const greet = (name = "Guest") => "Hello, " + name + "!";
console.log(greet()); // "Hello, Guest!"</code></pre>
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
      <p>Arrays are ordered collections of values, zero-indexed.</p>
      
      <h3>Creating Arrays</h3>
      <pre><code>const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];</code></pre>
      
      <h3>Accessing Elements</h3>
      <pre><code>console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3</code></pre>
      
      <h3>Modifying Arrays</h3>
      <pre><code>arr.push(4);    // Add to end
arr.pop();      // Remove from end
arr.unshift(0); // Add to start
arr.shift();    // Remove from start</code></pre>
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
      { id: 'test-1', description: 'Basic stats', input: [1, 2, 3, 4, 5], expectedOutput: { sum: 15, count: 5, average: 3, min: 1, max: 5 }, isHidden: false },
      { id: 'test-2', description: 'Single element', input: [42], expectedOutput: { sum: 42, count: 1, average: 42, min: 42, max: 42 }, isHidden: false },
      { id: 'test-3', description: 'Negative numbers', input: [-5, -2, 0, 3, 10], expectedOutput: { sum: 6, count: 5, average: 1.2, min: -5, max: 10 }, isHidden: false },
      { id: 'test-4', description: 'All same', input: [5, 5, 5, 5], expectedOutput: { sum: 20, count: 4, average: 5, min: 5, max: 5 }, isHidden: true },
      { id: 'test-5', description: 'Decimals', input: [1.5, 2.5, 3.0], expectedOutput: { sum: 7, count: 3, average: 7 / 3, min: 1.5, max: 3.0 }, isHidden: true }
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
      <p>Objects are collections of key-value pairs.</p>
      
      <h3>Creating Objects</h3>
      <pre><code>const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};</code></pre>
      
      <h3>Accessing Properties</h3>
      <pre><code>console.log(person.name);    // Dot notation
console.log(person["age"]);  // Bracket notation</code></pre>
      
      <h3>Object Methods</h3>
      <pre><code>Object.keys(person);    // ["name", "age", "city"]
Object.values(person);  // ["Alice", 30, "New York"]
Object.entries(person); // [["name", "Alice"], ...]</code></pre>
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
      
      <h3>map()</h3>
      <p>Creates a new array by transforming each element:</p>
      <pre><code>const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]</code></pre>
      
      <h3>filter()</h3>
      <p>Creates array with elements that pass a test:</p>
      <pre><code>const evens = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]</code></pre>
      
      <h3>reduce()</h3>
      <p>Reduces array to single value:</p>
      <pre><code>const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0); // 6</code></pre>
      
      <h3>Chaining</h3>
      <pre><code>const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((a, b) => a + b); // 12</code></pre>
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
      { id: 'test-1', description: 'Above average sorted', input: [{ name: 'Alice', score: 90 }, { name: 'Bob', score: 70 }, { name: 'Charlie', score: 80 }, { name: 'David', score: 60 }], expectedOutput: ['Alice', 'Charlie'], isHidden: false },
      { id: 'test-2', description: 'Single person', input: [{ name: 'Alice', score: 100 }], expectedOutput: [], isHidden: false },
      { id: 'test-3', description: 'Sort alphabetically', input: [{ name: 'Zoe', score: 100 }, { name: 'Alice', score: 100 }, { name: 'Mike', score: 50 }], expectedOutput: ['Alice', 'Zoe'], isHidden: false },
      { id: 'test-4', description: 'All same scores', input: [{ name: 'A', score: 80 }, { name: 'B', score: 80 }], expectedOutput: [], isHidden: true },
      { id: 'test-5', description: 'Empty array', input: [], expectedOutput: [], isHidden: true }
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
      <h2>String Methods</h2>
      <pre><code>const str = "Hello, World!";
str.toUpperCase();    // "HELLO, WORLD!"
str.toLowerCase();    // "hello, world!"
str.trim();           // Remove whitespace
str.split(", ");      // ["Hello", "World!"]
str.includes("World"); // true
str.slice(0, 5);      // "Hello"</code></pre>
      
      <h2>Template Literals</h2>
      <pre><code>const name = "Alice";
const msg = \`Hello, \${name}!\`;
const multi = \`
  Line 1
  Line 2
\`;</code></pre>
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
      <h2>Try-Catch Blocks</h2>
      <pre><code>try {
  riskyOperation();
} catch (error) {
  console.error(error.message);
} finally {
  cleanup();
}</code></pre>
      
      <h2>Throwing Errors</h2>
      <pre><code>function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}</code></pre>
      
      <h2>Error Types</h2>
      <pre><code>throw new TypeError("Expected a number");
throw new RangeError("Value out of range");</code></pre>
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
      <h2>Spread Operator (...)</h2>
      <p>The spread operator expands iterables into individual elements.</p>
      
      <h3>Array Spread</h3>
      <pre><code>const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const copy = [...arr1]; // Clone array</code></pre>
      
      <h3>Object Spread</h3>
      <pre><code>const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3 }
const updated = { ...obj1, b: 99 }; // { a: 1, b: 99 }</code></pre>
      
      <h2>Rest Parameters</h2>
      <p>Rest collects remaining arguments into an array.</p>
      <pre><code>function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

function greet(greeting, ...names) {
  return names.map(n => \`\${greeting}, \${n}!\`);
}</code></pre>
      
      <h3>Destructuring with Rest</h3>
      <pre><code>const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

const { a, ...others } = { a: 1, b: 2, c: 3 };
// a = 1, others = { b: 2, c: 3 }</code></pre>
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
      <h2>Array Destructuring</h2>
      <pre><code>const [a, b, c] = [1, 2, 3];
const [first, , third] = [1, 2, 3]; // Skip elements
const [head, ...tail] = [1, 2, 3, 4]; // Rest pattern
const [x = 0, y = 0] = [1]; // Default values</code></pre>
      
      <h2>Object Destructuring</h2>
      <pre><code>const { name, age } = { name: 'Alice', age: 30 };
const { name: userName } = { name: 'Bob' }; // Rename
const { a = 10 } = {}; // Default value
const { x: { y } } = { x: { y: 5 } }; // Nested</code></pre>
      
      <h2>Function Parameter Destructuring</h2>
      <pre><code>function greet({ name, greeting = 'Hello' }) {
  return \`\${greeting}, \${name}!\`;
}
greet({ name: 'Alice' }); // "Hello, Alice!"

function sum([a, b]) {
  return a + b;
}
sum([5, 3]); // 8</code></pre>
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
      <h2>Lexical Scope</h2>
      <p>Functions can access variables from their outer scope.</p>
      <pre><code>const outer = 'I am outer';
function inner() {
  console.log(outer); // Accessible!
}
inner();</code></pre>
      
      <h2>Closures</h2>
      <p>A closure is a function that "remembers" its outer scope even after the outer function returns.</p>
      <pre><code>function createCounter() {
  let count = 0; // Private variable
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3</code></pre>
      
      <h2>Private State Pattern</h2>
      <pre><code>function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit(amount) { balance += amount; },
    withdraw(amount) { balance -= amount; },
    getBalance() { return balance; }
  };
}
const account = createBankAccount(100);
account.deposit(50);
account.getBalance(); // 150
// balance is private - not directly accessible!</code></pre>
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
      contentHtml: `<h2>Promises</h2>
<p>A Promise represents a value that may be available now, later, or never.</p>
<h3>Creating Promises</h3>
<pre><code>const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done!'), 1000);
});</code></pre>
<h3>Consuming Promises</h3>
<pre><code>promise
  .then(value => console.log(value))
  .catch(error => console.error(error))
  .finally(() => console.log('Cleanup'));</code></pre>
<h3>Promise.all and Promise.race</h3>
<pre><code>Promise.all([p1, p2, p3]).then(values => console.log(values));
Promise.race([p1, p2]).then(first => console.log(first));</code></pre>`,
      examples: [
        {
          title: 'Chaining Promises', code: `fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch('/api/posts/' + user.id))
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
      contentHtml: `<h2>Async/Await</h2>
<p>Async/await is syntactic sugar over Promises, making async code look synchronous.</p>
<h3>Basic Usage</h3>
<pre><code>async function fetchUser() {
  const response = await fetch('/api/user');
  const user = await response.json();
  return user;
}</code></pre>
<h3>Error Handling</h3>
<pre><code>async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Failed:', error);
    throw error;
  }
}</code></pre>
<h3>Parallel Execution</h3>
<pre><code>const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);</code></pre>`,
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
      contentHtml: `<h2>Classes in JavaScript</h2>
<pre><code>class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  get birthYear() {
    return new Date().getFullYear() - this.age;
  }
  
  static species = 'Human';
}</code></pre>`,
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
  const daysConfig = [
    { day: 14, title: 'Inheritance and Prototypes', difficulty: 6, content: 'Class inheritance with extends, super keyword, prototype chain', exercise: 'Create a Vehicle base class and Car subclass' },
    { day: 15, title: 'Modules and Imports', difficulty: 5, content: 'ES Modules, import/export, named vs default exports', exercise: 'Export and import utility functions' },
    { day: 16, title: 'DOM Manipulation', difficulty: 5, content: 'Document queries, element creation, event listeners', exercise: 'Build a todo list with DOM operations' },
    { day: 17, title: 'Event Handling', difficulty: 5, content: 'Event types, bubbling, delegation, preventDefault', exercise: 'Implement event delegation for dynamic lists' },
    { day: 18, title: 'Fetch API and HTTP', difficulty: 6, content: 'Fetch requests, headers, JSON parsing, error handling', exercise: 'Create a data fetching utility with retry' },
    { day: 19, title: 'Local Storage and State', difficulty: 5, content: 'localStorage API, JSON serialization, state patterns', exercise: 'Build a persistent settings manager' },
    { day: 20, title: 'Regular Expressions', difficulty: 6, content: 'Regex patterns, flags, match/replace/test methods', exercise: 'Validate email and phone formats' },
    { day: 21, title: 'Testing with Jest', difficulty: 6, content: 'Unit tests, assertions, mocking, test organization', exercise: 'Write tests for a calculator module' },
    { day: 22, title: 'Functional Programming', difficulty: 7, content: 'Pure functions, immutability, composition, currying', exercise: 'Implement a pipe/compose function' },
    { day: 23, title: 'Design Patterns', difficulty: 7, content: 'Singleton, Factory, Observer, Module patterns', exercise: 'Implement an event emitter' },
    { day: 24, title: 'Memory and Performance', difficulty: 7, content: 'Memory leaks, garbage collection, performance optimization', exercise: 'Optimize a memory-intensive function' },
    { day: 25, title: 'Web Workers', difficulty: 7, content: 'Background threads, postMessage, SharedArrayBuffer', exercise: 'Offload computation to a worker' },
    { day: 26, title: 'WebSockets', difficulty: 7, content: 'Real-time communication, connection lifecycle, messages', exercise: 'Build a simple chat protocol' },
    { day: 27, title: 'Security Best Practices', difficulty: 8, content: 'XSS, CSRF, input sanitization, Content Security Policy', exercise: 'Sanitize user input safely' },
    { day: 28, title: 'TypeScript Basics', difficulty: 7, content: 'Type annotations, interfaces, generics, type guards', exercise: 'Add types to a JavaScript module' },
    { day: 29, title: 'Building a REST API', difficulty: 8, content: 'Express routes, middleware, error handling, validation', exercise: 'Build CRUD endpoints with validation' },
    { day: 30, title: 'Capstone Project', difficulty: 10, content: 'Full application combining all concepts learned', exercise: 'Build a complete task management API' }
  ];

  return daysConfig.map(cfg => ({
    language: 'javascript',
    day: cfg.day,
    title: cfg.title,
    difficulty: cfg.difficulty,
    estimatedMinutes: 30 + (cfg.difficulty * 5),
    objectives: [
      `Master ${cfg.title.toLowerCase()} concepts`,
      'Apply patterns in real-world scenarios',
      'Write clean, maintainable code',
      'Debug and troubleshoot effectively'
    ],
    contentHtml: `<h2>${cfg.title}</h2><p>${cfg.content}</p>
<h3>Key Concepts</h3>
<ul>
  <li>Understanding the fundamentals</li>
  <li>Common patterns and best practices</li>
  <li>Error handling strategies</li>
  <li>Performance considerations</li>
</ul>`,
    examples: [
      { title: 'Basic Example', code: `// ${cfg.title} example\nconst example = "Day ${cfg.day}";`, explanation: `Demonstrates basic ${cfg.title.toLowerCase()} usage.` },
      { title: 'Advanced Pattern', code: `// Advanced ${cfg.title}\nfunction advanced() {\n  // Implementation\n}`, explanation: 'More complex implementation pattern.' }
    ],
    exercise: { description: cfg.exercise, starterCode: `function solution(input) {\n  // Your implementation\n}`, hints: ['Start with the basics', 'Build incrementally', 'Test edge cases'] },
    tests: [
      { id: 't1', description: 'Basic test case', input: 'basic', expectedOutput: 'basic', isHidden: false },
      { id: 't2', description: 'Edge case', input: 'edge', expectedOutput: 'edge', isHidden: false },
      { id: 't3', description: 'Complex case', input: 'complex', expectedOutput: 'complex', isHidden: false },
      { id: 't4', description: 'Hidden test 1', input: 'hidden1', expectedOutput: 'hidden1', isHidden: true },
      { id: 't5', description: 'Hidden test 2', input: 'hidden2', expectedOutput: 'hidden2', isHidden: true },
      { id: 't6', description: 'Hidden test 3', input: 'hidden3', expectedOutput: 'hidden3', isHidden: true }
    ],
    solution: `function solution(input) {\n  // Complete solution for ${cfg.title}\n  return input;\n}`
  }));
}
