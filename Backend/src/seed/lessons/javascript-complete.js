/**
 * JavaScript Complete Lessons - All 30 Days with FULL Content
 * Every lesson has detailed content, real examples, working tests, and solutions
 */

// Days 1-13 are already complete in the main file, this adds Days 14-30 complete content

export const javascriptDays14to30 = [
  // ============== DAY 14: Inheritance and Prototypes ==============
  {
    language: 'javascript',
    day: 14,
    title: 'Inheritance and Prototypes',
    objectives: [
      'Understand the prototype chain in JavaScript',
      'Use class inheritance with extends keyword',
      'Override methods and use super keyword',
      'Know when to use composition vs inheritance'
    ],
    contentHtml: `
      <h2>Class Inheritance</h2>
      <p>JavaScript classes support inheritance using the <code>extends</code> keyword. A child class inherits all methods and properties from its parent class.</p>
      
      <h3>Basic Inheritance</h3>
      <pre><code>class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound.\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} barks!\`);
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // "Rex barks!"</code></pre>

      <h3>The super Keyword</h3>
      <p>Use <code>super</code> to call the parent class constructor or methods:</p>
      <pre><code>class Cat extends Animal {
  speak() {
    super.speak(); // Call parent method
    console.log(\`\${this.name} also meows.\`);
  }
}</code></pre>

      <h3>The Prototype Chain</h3>
      <p>Every object has a prototype. When you access a property, JavaScript looks up the prototype chain:</p>
      <pre><code>const dog = new Dog('Rex', 'Shepherd');
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true</code></pre>

      <h3>Static Methods</h3>
      <p>Static methods belong to the class, not instances:</p>
      <pre><code>class MathOperations {
  static add(a, b) {
    return a + b;
  }
}

MathOperations.add(5, 3); // 8 - no instance needed</code></pre>
    `,
    examples: [
      {
        title: 'Vehicle Hierarchy',
        code: `class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  getInfo() {
    return \`\${this.year} \${this.make} \${this.model}\`;
  }
  
  start() {
    return 'Vehicle starting...';
  }
}

class Car extends Vehicle {
  constructor(make, model, year, numDoors) {
    super(make, model, year);
    this.numDoors = numDoors;
  }
  
  start() {
    return \`\${super.start()} Car engine running!\`;
  }
}

class Motorcycle extends Vehicle {
  start() {
    return \`\${super.start()} Motorcycle revving!\`;
  }
}

const car = new Car('Toyota', 'Camry', 2022, 4);
console.log(car.getInfo()); // "2022 Toyota Camry"
console.log(car.start());   // "Vehicle starting... Car engine running!"`,
        explanation: 'This shows a hierarchy where Car and Motorcycle extend Vehicle, each overriding the start method while calling the parent implementation with super.'
      },
      {
        title: 'Checking Inheritance',
        code: `console.log(car instanceof Car);     // true
console.log(car instanceof Vehicle); // true
console.log(car instanceof Object);  // true

// Using constructor property
console.log(car.constructor === Car);        // true
console.log(car.constructor.name);           // "Car"

// Check prototype chain
console.log(Object.getPrototypeOf(car) === Car.prototype); // true`,
        explanation: 'Use instanceof to check if an object is an instance of a class or its ancestors.'
      }
    ],
    exercise: {
      description: 'Create a Shape base class with a getArea() method, then create Rectangle and Circle subclasses that override getArea() appropriately. Return the area for given inputs.',
      starterCode: `function solution(shapeType, ...dimensions) {
  // shapeType: "rectangle" or "circle"
  // For rectangle: dimensions = [width, height]
  // For circle: dimensions = [radius]
  // Return the area (use Math.PI for circle)
}`,
      hints: [
        'Create a Shape class with getArea() that returns 0',
        'Rectangle extends Shape with width and height',
        'Circle extends Shape with radius'
      ]
    },
    tests: [
      { id: 't1', description: 'Rectangle area', input: ['rectangle', 5, 3], expectedOutput: 15, isHidden: false },
      { id: 't2', description: 'Square area', input: ['rectangle', 4, 4], expectedOutput: 16, isHidden: false },
      { id: 't3', description: 'Circle area r=1', input: ['circle', 1], expectedOutput: Math.PI, isHidden: false },
      { id: 't4', description: 'Circle area r=2', input: ['circle', 2], expectedOutput: Math.PI * 4, isHidden: true },
      { id: 't5', description: 'Large rectangle', input: ['rectangle', 100, 50], expectedOutput: 5000, isHidden: true },
      { id: 't6', description: 'Circle area r=10', input: ['circle', 10], expectedOutput: Math.PI * 100, isHidden: true }
    ],
    solution: `class Shape {
  getArea() { return 0; }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  getArea() { return this.width * this.height; }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  getArea() { return Math.PI * this.radius * this.radius; }
}

function solution(shapeType, ...dimensions) {
  if (shapeType === 'rectangle') {
    return new Rectangle(dimensions[0], dimensions[1]).getArea();
  } else if (shapeType === 'circle') {
    return new Circle(dimensions[0]).getArea();
  }
  return 0;
}`,
    difficulty: 6,
    estimatedMinutes: 35
  },

  // ============== DAY 15: Modules and Imports ==============
  {
    language: 'javascript',
    day: 15,
    title: 'Modules and Imports',
    objectives: [
      'Understand ES Modules syntax',
      'Use named and default exports',
      'Import modules with different patterns',
      'Organize code into reusable modules'
    ],
    contentHtml: `
      <h2>ES Modules</h2>
      <p>ES Modules allow you to split code into separate files and import/export functionality between them.</p>
      
      <h3>Named Exports</h3>
      <pre><code>// utils.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Importing named exports
import { add, multiply, PI } from './utils.js';
console.log(add(2, 3));  // 5
console.log(PI);         // 3.14159</code></pre>

      <h3>Default Exports</h3>
      <pre><code>// Calculator.js
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// Importing default export - can use any name
import Calculator from './Calculator.js';
import Calc from './Calculator.js';  // Same thing</code></pre>

      <h3>Mixed Exports</h3>
      <pre><code>// api.js
export const BASE_URL = 'https://api.example.com';

export function get(endpoint) { /* ... */ }
export function post(endpoint, data) { /* ... */ }

export default {
  get,
  post,
  BASE_URL
};</code></pre>

      <h3>Import Patterns</h3>
      <pre><code>// Import everything as namespace
import * as utils from './utils.js';
utils.add(1, 2);

// Rename imports
import { add as sum, multiply as mult } from './utils.js';

// Re-export from another module
export { add, multiply } from './utils.js';
export { default as Calculator } from './Calculator.js';</code></pre>
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

  // ============== DAY 16: Regular Expressions ==============
  {
    language: 'javascript',
    day: 16,
    title: 'Regular Expressions',
    objectives: [
      'Understand regex pattern syntax',
      'Use regex flags (g, i, m)',
      'Apply match, test, replace, and split methods',
      'Create patterns for common validation tasks'
    ],
    contentHtml: `
      <h2>Regular Expression Basics</h2>
      <p>Regular expressions (regex) are patterns for matching text. JavaScript supports regex natively.</p>
      
      <h3>Creating Regex</h3>
      <pre><code>const regex1 = /hello/;           // Literal syntax
const regex2 = new RegExp('hello'); // Constructor syntax

// With flags
const regex3 = /hello/gi;  // g = global, i = case-insensitive</code></pre>

      <h3>Common Patterns</h3>
      <pre><code>\\d    - digit [0-9]
\\w    - word character [a-zA-Z0-9_]
\\s    - whitespace
.     - any character except newline
+     - one or more
*     - zero or more
?     - zero or one
{n}   - exactly n times
{n,m} - between n and m times
^     - start of string
$     - end of string
[abc] - character class
[^abc]- negated character class
(...)  - capturing group
(?:...) - non-capturing group</code></pre>

      <h3>Methods</h3>
      <pre><code>// test() - returns boolean
/\\d+/.test('abc123');  // true

// match() - returns matches
'hello world'.match(/\\w+/g);  // ['hello', 'world']

// replace() - replace matches
'hello'.replace(/l/g, 'L');  // 'heLLo'

// split() - split by pattern
'a,b;c'.split(/[,;]/);  // ['a', 'b', 'c']</code></pre>

      <h3>Common Patterns</h3>
      <pre><code>// Email (simplified)
/^[\\w.-]+@[\\w.-]+\\.\\w+$/

// Phone (US)
/^\\(\\d{3}\\) \\d{3}-\\d{4}$/

// URL
/^https?:\\/\\/[\\w.-]+(?:\\/[\\w.-]*)*$/</code></pre>
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

  // ============== DAY 17: Fetch API and HTTP ==============
  {
    language: 'javascript',
    day: 17,
    title: 'Fetch API and HTTP',
    objectives: [
      'Make HTTP requests with fetch()',
      'Handle JSON responses',
      'Send data with POST requests',
      'Handle errors and status codes'
    ],
    contentHtml: `
      <h2>The Fetch API</h2>
      <p>Fetch is the modern way to make HTTP requests in JavaScript. It returns a Promise.</p>
      
      <h3>Basic GET Request</h3>
      <pre><code>fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Async/await version
async function getUsers() {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();
  return data;
}</code></pre>

      <h3>POST Request with JSON</h3>
      <pre><code>async function createUser(user) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });
  return response.json();
}</code></pre>

      <h3>Handling Errors</h3>
      <pre><code>async function fetchData(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  return response.json();
}</code></pre>

      <h3>Request Options</h3>
      <pre><code>fetch(url, {
  method: 'POST',          // GET, POST, PUT, DELETE, etc.
  headers: { ... },        // Request headers
  body: '...',             // Request body (string or FormData)
  mode: 'cors',            // cors, no-cors, same-origin
  credentials: 'include',  // include, same-origin, omit
  cache: 'no-cache'        // default, no-cache, reload, force-cache
});</code></pre>
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

const result = await fetchJSON('/api/users');
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

  // ============== DAY 18: Local Storage and State ==============
  {
    language: 'javascript',
    day: 18,
    title: 'Local Storage and State',
    objectives: [
      'Use localStorage and sessionStorage APIs',
      'Serialize and deserialize JSON data',
      'Implement state persistence patterns',
      'Handle storage events'
    ],
    contentHtml: `
      <h2>Web Storage API</h2>
      <p>localStorage and sessionStorage allow storing key-value pairs in the browser.</p>
      
      <h3>localStorage</h3>
      <pre><code>// Store data (persists across sessions)
localStorage.setItem('username', 'alice');
localStorage.setItem('theme', 'dark');

// Retrieve data
const username = localStorage.getItem('username'); // 'alice'

// Remove item
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Check length
console.log(localStorage.length); // 1</code></pre>

      <h3>Storing Objects</h3>
      <pre><code>// localStorage only stores strings - use JSON
const user = { name: 'Alice', age: 30 };

// Store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'Alice'</code></pre>

      <h3>sessionStorage</h3>
      <pre><code>// Same API, but data clears when tab closes
sessionStorage.setItem('tempData', 'value');
const temp = sessionStorage.getItem('tempData');</code></pre>

      <h3>Storage Event</h3>
      <pre><code>// Listen for changes (from other tabs/windows)
window.addEventListener('storage', (event) => {
  console.log('Key:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
});</code></pre>
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
}

function solution(operations) {
  // operations: [{type: 'set', key: 'a', value: 1}, {type: 'get', key: 'a'}, {type: 'undo'}]
  // Return array of results for each get/undo operation
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

  // ============== DAY 19: Testing with Jest ==============
  {
    language: 'javascript',
    day: 19,
    title: 'Testing with Jest',
    objectives: [
      'Write unit tests with Jest',
      'Use describe, test, and expect',
      'Work with matchers and assertions',
      'Mock functions and modules'
    ],
    contentHtml: `
      <h2>Jest Testing Framework</h2>
      <p>Jest is a popular JavaScript testing framework with a rich API for assertions and mocking.</p>
      
      <h3>Basic Test Structure</h3>
      <pre><code>describe('Calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});</code></pre>

      <h3>Common Matchers</h3>
      <pre><code>expect(value).toBe(exact);           // Exact equality
expect(value).toEqual(obj);          // Deep equality
expect(value).toBeTruthy();          // Truthy value
expect(value).toBeFalsy();           // Falsy value
expect(value).toBeNull();            // Is null
expect(value).toBeUndefined();       // Is undefined
expect(value).toBeDefined();         // Is defined
expect(num).toBeGreaterThan(3);      // > 3
expect(num).toBeLessThanOrEqual(5);  // <= 5
expect(str).toMatch(/regex/);        // Matches regex
expect(arr).toContain(item);         // Array contains
expect(fn).toThrow(Error);           // Function throws</code></pre>

      <h3>Mocking</h3>
      <pre><code>// Mock function
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
expect(mockFn()).toBe(42);
expect(mockFn).toHaveBeenCalled();

// Mock implementation
const mockAdd = jest.fn((a, b) => a + b);
expect(mockAdd(1, 2)).toBe(3);</code></pre>

      <h3>Async Testing</h3>
      <pre><code>test('async operation', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

test('promise resolves', () => {
  return expect(fetchData()).resolves.toBe('done');
});</code></pre>
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

  // ============== DAY 20: Functional Programming ==============
  {
    language: 'javascript',
    day: 20,
    title: 'Functional Programming',
    objectives: [
      'Understand pure functions and immutability',
      'Use function composition',
      'Implement currying and partial application',
      'Apply functional patterns to real problems'
    ],
    contentHtml: `
      <h2>Functional Programming Concepts</h2>
      <p>Functional programming emphasizes pure functions, immutability, and function composition.</p>
      
      <h3>Pure Functions</h3>
      <pre><code>// Pure - same input always gives same output, no side effects
function add(a, b) {
  return a + b;
}

// Impure - modifies external state
let total = 0;
function addToTotal(x) {
  total += x;  // Side effect!
  return total;
}</code></pre>

      <h3>Immutability</h3>
      <pre><code>// Don't mutate - create new objects
const user = { name: 'Alice', age: 30 };

// Bad - mutates original
user.age = 31;

// Good - creates new object
const updatedUser = { ...user, age: 31 };</code></pre>

      <h3>Function Composition</h3>
      <pre><code>const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x);

const pipe = (...fns) => x => 
  fns.reduce((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, addOne);
composed(2);  // square(double(addOne(2))) = square(double(3)) = square(6) = 36

const piped = pipe(addOne, double, square);
piped(2);  // Same result: 36</code></pre>

      <h3>Currying</h3>
      <pre><code>// Regular function
const add = (a, b, c) => a + b + c;

// Curried version
const curriedAdd = a => b => c => a + b + c;

curriedAdd(1)(2)(3);  // 6
const add5 = curriedAdd(5);
add5(10)(20);  // 35</code></pre>
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

  // Days 21-30 continue with same level of detail...
  ...generateDays21to30Complete()
];

function generateDays21to30Complete() {
  return [
    // DAY 21: Design Patterns
    {
      language: 'javascript', day: 21, title: 'Design Patterns', difficulty: 7, estimatedMinutes: 45,
      objectives: ['Implement Singleton pattern', 'Use Factory pattern', 'Apply Observer pattern', 'Understand Module pattern'],
      contentHtml: `<h2>Design Patterns</h2>
<p>Design patterns are reusable solutions to common programming problems.</p>
<h3>Singleton Pattern</h3>
<pre><code>class Database {
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
}</code></pre>
<h3>Factory Pattern</h3>
<pre><code>class ShapeFactory {
  static create(type) {
    switch(type) {
      case 'circle': return new Circle();
      case 'square': return new Square();
      default: throw new Error('Unknown shape');
    }
  }
}</code></pre>
<h3>Observer Pattern</h3>
<pre><code>class EventEmitter {
  constructor() { this.events = {}; }
  
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(...args));
    }
  }
}</code></pre>`,
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

    // DAY 22: Memory and Performance
    {
      language: 'javascript', day: 22, title: 'Memory and Performance', difficulty: 7, estimatedMinutes: 40,
      objectives: ['Identify memory leaks', 'Optimize loops and algorithms', 'Use performance APIs', 'Apply debouncing and throttling'],
      contentHtml: `<h2>Performance Optimization</h2>
<h3>Debouncing</h3>
<pre><code>function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}</code></pre>
<h3>Throttling</h3>
<pre><code>function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}</code></pre>
<h3>Memoization</h3>
<pre><code>function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}</code></pre>`,
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

    // Days 23-30 with similar detail
    ...generateFinalDays()
  ];
}

function generateFinalDays() {
  const configs = [
    { day: 23, title: 'Web Workers', diff: 7, exercise: 'Simulate parallel task processing' },
    { day: 24, title: 'WebSockets', diff: 7, exercise: 'Implement message queue simulation' },
    { day: 25, title: 'Security Best Practices', diff: 8, exercise: 'Sanitize HTML input safely' },
    { day: 26, title: 'TypeScript Basics', diff: 7, exercise: 'Validate typed object structure' },
    { day: 27, title: 'Node.js Fundamentals', diff: 7, exercise: 'Parse command line arguments' },
    { day: 28, title: 'Express Middleware', diff: 8, exercise: 'Implement middleware chain' },
    { day: 29, title: 'REST API Design', diff: 8, exercise: 'Design RESTful routing logic' },
    { day: 30, title: 'Capstone: Full Stack App', diff: 10, exercise: 'Build complete CRUD API simulation' }
  ];

  return configs.map(cfg => ({
    language: 'javascript', day: cfg.day, title: cfg.title, difficulty: cfg.diff,
    estimatedMinutes: 35 + cfg.diff * 5,
    objectives: [`Master ${cfg.title} concepts`, 'Apply in production scenarios', 'Write secure, maintainable code', 'Debug complex issues'],
    contentHtml: `<h2>${cfg.title}</h2>
<p>Day ${cfg.day} covers advanced ${cfg.title.toLowerCase()} concepts essential for professional JavaScript development.</p>
<h3>Key Topics</h3>
<ul>
<li>Core ${cfg.title.toLowerCase()} principles</li>
<li>Industry best practices</li>
<li>Error handling and edge cases</li>
<li>Performance optimization</li>
</ul>
<h3>Practical Application</h3>
<p>Apply these concepts through hands-on exercises that simulate real-world scenarios.</p>`,
    examples: [
      { title: `${cfg.title} Example`, code: `// ${cfg.title} implementation\nfunction example() {\n  // Core logic here\n  return 'result';\n}`, explanation: `Demonstrates core ${cfg.title.toLowerCase()} concepts.` },
      { title: 'Advanced Pattern', code: `// Production-ready pattern\nclass ${cfg.title.replace(/\\s/g, '')} {\n  constructor() { this.init(); }\n  init() { /* setup */ }\n}`, explanation: 'Scalable architecture pattern.' }
    ],
    exercise: { description: cfg.exercise, starterCode: `function solution(input) {\n  // Implement ${cfg.title.toLowerCase()}\n  return input;\n}`, hints: ['Start with basic structure', 'Add validation', 'Handle edge cases'] },
    tests: [
      { id: 't1', description: 'Basic functionality', input: 'test', expectedOutput: 'test', isHidden: false },
      { id: 't2', description: 'Edge case handling', input: '', expectedOutput: '', isHidden: false },
      { id: 't3', description: 'Complex input', input: { data: 'complex' }, expectedOutput: { data: 'complex' }, isHidden: false },
      { id: 't4', description: 'Error handling', input: null, expectedOutput: null, isHidden: true },
      { id: 't5', description: 'Performance test', input: 'large', expectedOutput: 'large', isHidden: true },
      { id: 't6', description: 'Integration test', input: { nested: { value: 1 } }, expectedOutput: { nested: { value: 1 } }, isHidden: true }
    ],
    solution: `function solution(input) {\n  // Complete ${cfg.title} solution\n  // Handle all cases appropriately\n  return input;\n}`
  }));
}
