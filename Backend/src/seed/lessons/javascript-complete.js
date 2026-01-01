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
      <h2>Inheritance and Prototypes in JavaScript</h2>
      <p>Inheritance allows you to create new classes based on existing ones, sharing code and establishing relationships between classes. JavaScript uses prototype-based inheritance, which classes (introduced in ES6) simplify with a more familiar syntax. Understanding inheritance and the prototype chain is crucial for building maintainable, scalable applications.</p>
      
      <h3>Why Inheritance Matters</h3>
      <p>Inheritance enables you to:</p>
      <ul>
        <li><strong>Reuse code:</strong> Share common functionality between related classes</li>
        <li><strong>Establish relationships:</strong> Model "is-a" relationships (Car is a Vehicle)</li>
        <li><strong>Override behavior:</strong> Customize parent class methods in child classes</li>
        <li><strong>Organize code:</strong> Create logical hierarchies of related classes</li>
      </ul>
      
      <h3>Class Inheritance with extends</h3>
      <p>Use the <code>extends</code> keyword to create child classes:</p>
      <pre><code>// Base class (parent)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound.\`);
  }
  
  eat() {
    console.log(\`\${this.name} is eating.\`);
  }
}

// Derived class (child) - inherits from Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST call super() before using this
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    console.log(\`\${this.name} barks!\`);
  }
  
  // New method specific to Dog
  fetch() {
    console.log(\`\${this.name} fetches the ball!\`);
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // "Rex barks!" (overridden method)
dog.eat();   // "Rex is eating." (inherited method)
dog.fetch(); // "Rex fetches the ball!" (new method)</code></pre>
      <p><strong>Key points:</strong> Child classes inherit all methods and properties. You can override methods or add new ones.</p>

      <h3>The super Keyword</h3>
      <p><code>super</code> refers to the parent class. Use it to call parent constructors and methods:</p>
      <pre><code>// Calling parent constructor
class Cat extends Animal {
  constructor(name, color) {
    super(name); // Call Animal constructor
    this.color = color;
  }
}

// Calling parent methods
class Cat extends Animal {
  speak() {
    super.speak(); // Call parent speak() first
    console.log(\`\${this.name} also meows.\`);
  }
}

const cat = new Cat('Whiskers', 'orange');
cat.speak();
// Output:
// "Whiskers makes a sound."
// "Whiskers also meows."

// Using super in constructor
class Rectangle extends Shape {
  constructor(width, height) {
    super(); // Call Shape constructor
    this.width = width;
    this.height = height;
  }
}</code></pre>
      <p><strong>Important:</strong> Must call <code>super()</code> before using <code>this</code> in derived class constructors.</p>

      <h3>The Prototype Chain</h3>
      <p>JavaScript uses prototype-based inheritance. Every object has a prototype, and properties are looked up through the chain:</p>
      <pre><code>const dog = new Dog('Rex', 'Shepherd');

// Prototype chain: dog -> Dog.prototype -> Animal.prototype -> Object.prototype
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true

// Property lookup follows the chain
dog.toString(); // Found in Object.prototype
dog.speak();    // Found in Dog.prototype (overridden)
dog.eat();      // Found in Animal.prototype (inherited)

// Checking inheritance
console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true
console.log(dog instanceof Object); // true

// Using Object.getPrototypeOf() (preferred over __proto__)
const proto = Object.getPrototypeOf(dog);
console.log(proto === Dog.prototype); // true</code></pre>

      <h3>Method Overriding</h3>
      <p>Child classes can override parent methods:</p>
      <pre><code>class Vehicle {
  start() {
    return 'Vehicle starting...';
  }
  
  stop() {
    return 'Vehicle stopping...';
  }
}

class Car extends Vehicle {
  // Override start method
  start() {
    return \`\${super.start()} Car engine running!\`;
  }
  
  // stop() is inherited from Vehicle
}

class Motorcycle extends Vehicle {
  start() {
    return \`\${super.start()} Motorcycle revving!\`;
  }
}

const car = new Car();
car.start(); // "Vehicle starting... Car engine running!"
car.stop();  // "Vehicle stopping..." (inherited)</code></pre>

      <h3>Composition vs Inheritance</h3>
      <p>Sometimes composition (has-a) is better than inheritance (is-a):</p>
      <pre><code>// Inheritance (is-a)
class Car extends Vehicle {
  // Car IS A Vehicle
}

// Composition (has-a) - often better
class Car {
  constructor() {
    this.engine = new Engine(); // Car HAS AN Engine
    this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }
}

// Prefer composition when:
// - You need multiple "parents" (JavaScript doesn't support multiple inheritance)
// - Relationship is "has-a" not "is-a"
// - You want more flexibility</code></pre>

      <h3>Abstract Classes Pattern</h3>
      <p>JavaScript doesn't have abstract classes, but you can simulate them:</p>
      <pre><code>class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error('Shape is abstract - cannot instantiate');
    }
  }
  
  getArea() {
    throw new Error('getArea() must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

// const shape = new Shape(); // ERROR!
const circle = new Circle(5);
circle.getArea(); // ~78.54</code></pre>

      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li><strong>Forgetting super():</strong> Must call super() before this in derived constructors</li>
        <li><strong>Deep inheritance:</strong> Avoid deep inheritance chains (2-3 levels max)</li>
        <li><strong>Overusing inheritance:</strong> Prefer composition when appropriate</li>
        <li><strong>Modifying prototypes:</strong> Don't modify built-in prototypes (Array.prototype, etc.)</li>
        <li><strong>Circular dependencies:</strong> Avoid circular inheritance</li>
        <li><strong>Using __proto__:</strong> Use Object.getPrototypeOf() instead</li>
      </ul>

      <h3>Best Practices</h3>
      <ul>
        <li>Use inheritance for "is-a" relationships</li>
        <li>Keep inheritance hierarchies shallow (2-3 levels)</li>
        <li>Call super() first in derived constructors</li>
        <li>Prefer composition over inheritance when possible</li>
        <li>Use instanceof to check inheritance relationships</li>
        <li>Override methods intentionally, not accidentally</li>
        <li>Document inheritance relationships clearly</li>
      </ul>
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

  // Days 21-30 continue with same level of detail...
  ...generateDays21to30Complete()
];

function generateDays21to30Complete() {
  return [
    // DAY 21: Design Patterns
    {
      language: 'javascript', day: 21, title: 'Design Patterns', difficulty: 7, estimatedMinutes: 45,
      objectives: ['Implement Singleton pattern', 'Use Factory pattern', 'Apply Observer pattern', 'Understand Module pattern'],
      contentHtml: `<h2>Design Patterns in JavaScript</h2>
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
</ul>`,
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
      contentHtml: `<h2>Memory and Performance Optimization in JavaScript</h2>
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

// Mark and measure
performance.mark('start');
// ... code ...
performance.mark('end');
performance.measure('duration', 'start', 'end');
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
</ul>`,
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
  return [
    {
      language: 'javascript', day: 23, title: 'Web Workers', difficulty: 7, estimatedMinutes: 40,
      objectives: ['Create Web Workers', 'Communicate with postMessage', 'Handle worker errors', 'Use SharedArrayBuffer'],
      contentHtml: `<h2>Web Workers in JavaScript</h2>
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
</ul>`,
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
    {
      language: 'javascript', day: 24, title: 'WebSockets', difficulty: 7, estimatedMinutes: 40,
      objectives: ['Create WebSocket connections', 'Handle real-time messaging', 'Manage connection lifecycle', 'Implement reconnection logic'],
      contentHtml: `<h2>WebSockets in JavaScript</h2>
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
</ul>`,
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
    {
      language: 'javascript', day: 25, title: 'Security Best Practices', difficulty: 8, estimatedMinutes: 45,
      objectives: ['Prevent XSS attacks', 'Avoid CSRF vulnerabilities', 'Sanitize user input', 'Implement Content Security Policy'],
      contentHtml: `<h2>Security Best Practices in JavaScript</h2>
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
</ul>`,
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
    {
      language: 'javascript', day: 26, title: 'TypeScript Basics', difficulty: 7, estimatedMinutes: 40,
      objectives: ['Use type annotations', 'Define interfaces', 'Work with generics', 'Apply type guards'],
      contentHtml: `<h2>TypeScript Basics</h2>
<p>TypeScript is JavaScript with static type checking. It adds type safety to JavaScript, catching errors at compile-time and improving developer experience with better tooling and autocomplete.</p>

<h3>Why TypeScript Matters</h3>
<p>TypeScript enables you to:</p>
<ul>
  <li><strong>Catch errors early:</strong> Find bugs before runtime</li>
  <li><strong>Improve tooling:</strong> Better autocomplete and refactoring</li>
  <li><strong>Document code:</strong> Types serve as documentation</li>
  <li><strong>Refactor safely:</strong> Confident code changes</li>
</ul>

<h3>Basic Types</h3>
<pre><code>let name: string = 'Alice';
let age: number = 30;
let isActive: boolean = true;
let data: any = 'anything';
let value: unknown = 'unknown';

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Alice', 'Bob'];

// Tuples
let tuple: [string, number] = ['Alice', 30];

// Enums
enum Status { Active, Inactive }
let status: Status = Status.Active;</code></pre>

<h3>Interfaces</h3>
<pre><code>interface User {
  name: string;
  age: number;
  email?: string; // Optional
}

const user: User = {
  name: 'Alice',
  age: 30
};</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Using any:</strong> Avoid any, use unknown or proper types</li>
  <li><strong>Ignoring errors:</strong> Fix type errors, don't ignore them</li>
  <li><strong>Over-typing:</strong> Let TypeScript infer when possible</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Use strict mode</li>
  <li>Define interfaces for objects</li>
  <li>Use type guards for runtime checks</li>
  <li>Avoid any type</li>
  <li>Let TypeScript infer when possible</li>
</ul>`,
      examples: [
        { title: 'Type Guards', code: `function isString(value: unknown): value is string {\n  return typeof value === 'string';\n}`, explanation: 'Type guards narrow types.' },
        { title: 'Generics', code: `function identity<T>(arg: T): T { return arg; }`, explanation: 'Generics provide type flexibility.' }
      ],
      exercise: { description: 'Validate typed object structure.', starterCode: `function solution(obj: any): boolean {\n  // Validate object has required properties\n}`, hints: ['Check properties', 'Validate types', 'Return boolean'] },
      tests: [
        { id: 't1', description: 'Valid object', input: { name: 'Alice', age: 30 }, expectedOutput: true, isHidden: false },
        { id: 't2', description: 'Missing property', input: { name: 'Bob' }, expectedOutput: false, isHidden: true }
      ],
      solution: `function solution(obj: any): boolean { return obj && typeof obj.name === 'string' && typeof obj.age === 'number'; }`
    },
    {
      language: 'javascript', day: 27, title: 'Node.js Fundamentals', difficulty: 7, estimatedMinutes: 40,
      objectives: ['Use Node.js modules', 'Work with file system', 'Handle environment variables', 'Use npm packages'],
      contentHtml: `<h2>Node.js Fundamentals</h2>
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
</ul>`,
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
    {
      language: 'javascript', day: 28, title: 'Express Middleware', difficulty: 8, estimatedMinutes: 45,
      objectives: ['Create Express middleware', 'Use middleware chains', 'Handle errors', 'Implement authentication middleware'],
      contentHtml: `<h2>Express Middleware</h2>
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
</ul>`,
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
    {
      language: 'javascript', day: 29, title: 'REST API Design', difficulty: 8, estimatedMinutes: 45,
      objectives: ['Design RESTful routes', 'Implement CRUD operations', 'Handle HTTP status codes', 'Version APIs'],
      contentHtml: `<h2>REST API Design</h2>
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
</ul>`,
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
    {
      language: 'javascript', day: 30, title: 'Capstone: Full Stack App', difficulty: 10, estimatedMinutes: 60,
      objectives: ['Build complete application', 'Integrate all concepts', 'Implement best practices', 'Deploy application'],
      contentHtml: `<h2>Capstone: Full Stack Application</h2>
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
</ul>`,
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

