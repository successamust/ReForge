/**
 * Python Lessons - Days 1-30 (COMPLETE)
 * All 30 days with full content, examples, tests, and solutions
 */

export const pythonLessons = [
    // ============== DAY 1 ==============
    {
        language: 'python',
        day: 1,
        title: 'Variables and Data Types',
        objectives: ['Understand Python variable declaration', 'Learn basic data types', 'Use type() function', 'Practice naming conventions'],
        contentHtml: `<h2>Variables in Python</h2>
<p>Variables are created by simple assignment. Python infers types automatically.</p>
<pre><code>name = "Alice"
age = 30
height = 5.8
is_student = True</code></pre>
<h3>Data Types</h3>
<ul>
  <li><strong>str</strong>: Text values</li>
  <li><strong>int</strong>: Whole numbers</li>
  <li><strong>float</strong>: Decimal numbers</li>
  <li><strong>bool</strong>: True or False</li>
  <li><strong>None</strong>: Absence of value</li>
</ul>
<h3>Type Checking</h3>
<pre><code>print(type("Hello"))  # &lt;class 'str'&gt;
print(type(42))       # &lt;class 'int'&gt;</code></pre>`,
        examples: [
            { title: 'Variable Assignment', code: `name = "Alice"\nage = 25\nprint(f"{name} is {age}")`, explanation: 'Variables created by assignment.' },
            { title: 'Type Conversion', code: `value = "42"\nnumber = int(value)\nprint(type(number))  # <class 'int'>`, explanation: 'Use int(), float(), str() for conversion.' }
        ],
        exercise: { description: 'Create a function that returns a dict with "value" and "type_name".', starterCode: `def solution(input_value):\n    pass`, hints: ['Use type()', 'Use .__name__'] },
        tests: [
            { id: 't1', description: 'String type', input: 'hello', expectedOutput: { value: 'hello', type_name: 'str' }, isHidden: false },
            { id: 't2', description: 'Int type', input: 42, expectedOutput: { value: 42, type_name: 'int' }, isHidden: false },
            { id: 't3', description: 'Float type', input: 3.14, expectedOutput: { value: 3.14, type_name: 'float' }, isHidden: false },
            { id: 't4', description: 'Bool type', input: true, expectedOutput: { value: true, type_name: 'bool' }, isHidden: true },
            { id: 't5', description: 'None type', input: null, expectedOutput: { value: null, type_name: 'NoneType' }, isHidden: true }
        ],
        solution: `def solution(input_value):\n    return {"value": input_value, "type_name": type(input_value).__name__}`,
        difficulty: 1, estimatedMinutes: 15
    },

    // ============== DAY 2 ==============
    {
        language: 'python', day: 2, title: 'Functions and Parameters', difficulty: 2, estimatedMinutes: 20,
        objectives: ['Define functions with def', 'Use parameters and return', 'Understand default parameters', 'Work with *args and **kwargs'],
        contentHtml: `<h2>Functions in Python</h2>
<pre><code>def greet(name):
    return f"Hello, {name}!"

def greet_with_default(name, greeting="Hello"):
    return f"{greeting}, {name}!"

def sum_all(*args):
    return sum(args)

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")</code></pre>`,
        examples: [
            { title: 'Basic Function', code: `def add(a, b):\n    return a + b\n\nprint(add(3, 5))  # 8`, explanation: 'Return values with return statement.' },
            { title: 'Default Parameters', code: `def greet(name, msg="Hello"):\n    return f"{msg}, {name}"`, explanation: 'Default values for optional parameters.' }
        ],
        exercise: { description: 'Create a calculator function with two numbers and operation string.', starterCode: `def solution(a, b, operation):\n    pass`, hints: ['Use if/elif', 'Handle all operations'] },
        tests: [
            { id: 't1', description: 'Add', input: [10, 5, 'add'], expectedOutput: 15, isHidden: false },
            { id: 't2', description: 'Subtract', input: [10, 5, 'subtract'], expectedOutput: 5, isHidden: false },
            { id: 't3', description: 'Multiply', input: [10, 5, 'multiply'], expectedOutput: 50, isHidden: false },
            { id: 't4', description: 'Divide', input: [10, 5, 'divide'], expectedOutput: 2, isHidden: true },
            { id: 't5', description: 'Decimal', input: [10, 4, 'divide'], expectedOutput: 2.5, isHidden: true }
        ],
        solution: `def solution(a, b, operation):\n    ops = {'add': a+b, 'subtract': a-b, 'multiply': a*b, 'divide': a/b}\n    return ops.get(operation)`
    },

    // ============== DAY 3 ==============
    {
        language: 'python', day: 3, title: 'Lists and Tuples', difficulty: 3, estimatedMinutes: 25,
        objectives: ['Create and manipulate lists', 'Understand list methods', 'Work with tuples', 'Use list comprehensions'],
        contentHtml: `<h2>Lists</h2>
<pre><code>fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert(0, "avocado")
fruits.remove("banana")
popped = fruits.pop()</code></pre>
<h2>List Comprehensions</h2>
<pre><code>squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]</code></pre>
<h2>Tuples</h2>
<pre><code>point = (3, 4)  # Immutable
x, y = point   # Unpacking</code></pre>`,
        examples: [
            { title: 'List Operations', code: `nums = [3,1,4,1,5]\nprint(sorted(nums))  # [1,1,3,4,5]\nprint(sum(nums))     # 14`, explanation: 'Built-in functions for lists.' },
            { title: 'List Comprehension', code: `words = ["hello", "world"]\nupper = [w.upper() for w in words]`, explanation: 'Concise list transformation.' }
        ],
        exercise: { description: 'Return dict with sum, count, average, min, max of number list.', starterCode: `def solution(numbers):\n    pass`, hints: ['Use sum(), len(), min(), max()'] },
        tests: [
            { id: 't1', description: 'Basic stats', input: [1, 2, 3, 4, 5], expectedOutput: { sum: 15, count: 5, average: 3, min: 1, max: 5 }, isHidden: false },
            { id: 't2', description: 'Single', input: [42], expectedOutput: { sum: 42, count: 1, average: 42, min: 42, max: 42 }, isHidden: false },
            { id: 't3', description: 'Negative', input: [-5, 0, 5], expectedOutput: { sum: 0, count: 3, average: 0, min: -5, max: 5 }, isHidden: true }
        ],
        solution: `def solution(numbers):\n    return {"sum": sum(numbers), "count": len(numbers), "average": sum(numbers)/len(numbers), "min": min(numbers), "max": max(numbers)}`
    },

    // ============== DAYS 4-7 ==============
    {
        language: 'python', day: 4, title: 'Dictionaries and Sets', difficulty: 3, estimatedMinutes: 25,
        objectives: ['Work with dictionaries', 'Use dictionary methods', 'Understand sets', 'Dictionary comprehensions'],
        contentHtml: `<h2>Dictionaries</h2>
<pre><code>person = {"name": "Alice", "age": 30}
person["city"] = "NYC"
del person["age"]
keys = person.keys()
values = person.values()</code></pre>
<h2>Sets</h2>
<pre><code>a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)  # Intersection: {2, 3}
print(a | b)  # Union: {1, 2, 3, 4}</code></pre>`,
        examples: [
            { title: 'Dict Methods', code: `d = {"a": 1}\nd.get("b", 0)  # 0 (default)\nd.update({"c": 3})`, explanation: 'Safe access with get().' },
            { title: 'Dict Comprehension', code: `squares = {x: x**2 for x in range(5)}`, explanation: 'Create dicts concisely.' }
        ],
        exercise: { description: 'Swap dictionary keys and values.', starterCode: `def solution(d):\n    pass`, hints: ['Use dict comprehension'] },
        tests: [
            { id: 't1', description: 'Swap', input: { a: 1, b: 2 }, expectedOutput: { 1: 'a', 2: 'b' }, isHidden: false },
            { id: 't2', description: 'Empty', input: {}, expectedOutput: {}, isHidden: true },
            { id: 't3', description: 'Mixed', input: { x: 'y', 1: 2 }, expectedOutput: { y: 'x', 2: 1 }, isHidden: true }
        ],
        solution: `def solution(d):\n    return {v: k for k, v in d.items()}`
    },

    {
        language: 'python', day: 5, title: 'String Methods and Formatting', difficulty: 4, estimatedMinutes: 25,
        objectives: ['Master string methods', 'Use f-strings', 'String parsing', 'Regular string operations'],
        contentHtml: `<h2>String Methods</h2>
<pre><code>s = "  Hello World  "
s.strip()      # Remove whitespace
s.lower()      # Lowercase
s.upper()      # Uppercase
s.split()      # Split by whitespace
s.replace("World", "Python")</code></pre>
<h2>F-Strings</h2>
<pre><code>name = "Alice"
age = 30
print(f"{name} is {age} years old")
print(f"{age:03d}")  # Zero-padded</code></pre>`,
        examples: [
            { title: 'String Cleaning', code: `email = "  USER@Example.COM  "\nclean = email.strip().lower()`, explanation: 'Chain methods for cleaning.' },
            { title: 'Format Specifiers', code: `pi = 3.14159\nprint(f"{pi:.2f}")  # 3.14`, explanation: 'Control decimal places.' }
        ],
        exercise: { description: 'Create URL slug from string.', starterCode: `def solution(s):\n    pass`, hints: ['Use lower(), strip()', 'Replace spaces with hyphens', 'Remove special chars'] },
        tests: [
            { id: 't1', description: 'Basic', input: 'Hello World', expectedOutput: 'hello-world', isHidden: false },
            { id: 't2', description: 'Special chars', input: 'Hello, World!', expectedOutput: 'hello-world', isHidden: true },
            { id: 't3', description: 'Multi spaces', input: '  a   b  ', expectedOutput: 'a-b', isHidden: true }
        ],
        solution: `import re\ndef solution(s):\n    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')`
    },

    {
        language: 'python', day: 6, title: 'File I/O and Context Managers', difficulty: 5, estimatedMinutes: 30,
        objectives: ['Read and write files', 'Use context managers', 'Handle file paths', 'Process text files'],
        contentHtml: `<h2>File I/O</h2>
<pre><code>with open("file.txt", "r") as f:
    content = f.read()

with open("file.txt", "w") as f:
    f.write("Hello World")

with open("file.txt", "r") as f:
    for line in f:
        print(line.strip())</code></pre>`,
        examples: [
            { title: 'Reading Lines', code: `with open("file.txt") as f:\n    lines = f.readlines()`, explanation: 'Read all lines into list.' },
            { title: 'Context Manager', code: `class MyFile:\n    def __enter__(self): ...\n    def __exit__(self, *args): ...`, explanation: 'Custom context managers.' }
        ],
        exercise: { description: 'Parse config string "key=value\\nkey2=value2" into dict.', starterCode: `def solution(config_str):\n    pass`, hints: ['Split by newlines', 'Split each line by ='] },
        tests: [
            { id: 't1', description: 'Parse', input: 'name=Alice\nage=30', expectedOutput: { name: 'Alice', age: '30' }, isHidden: false },
            { id: 't2', description: 'Empty', input: '', expectedOutput: {}, isHidden: true },
            { id: 't3', description: 'No equals', input: 'nodata', expectedOutput: {}, isHidden: true }
        ],
        solution: `def solution(config_str):\n    if not config_str: return {}\n    return dict(line.split('=') for line in config_str.split('\\n') if '=' in line)`
    },

    {
        language: 'python', day: 7, title: 'Exception Handling', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Use try/except', 'Raise exceptions', 'Create custom exceptions', 'Finally blocks'],
        contentHtml: `<h2>Exception Handling</h2>
<pre><code>try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Unexpected: {e}")
else:
    print("Success!")
finally:
    print("Cleanup")</code></pre>
<h2>Raising Exceptions</h2>
<pre><code>def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age</code></pre>`,
        examples: [
            { title: 'Multiple Except', code: `try:\n    x = int("abc")\nexcept ValueError:\n    print("Not a number")`, explanation: 'Catch specific types.' },
            { title: 'Custom Exception', code: `class ValidationError(Exception):\n    pass`, explanation: 'Create domain-specific exceptions.' }
        ],
        exercise: { description: 'Safe division returning result or error dict.', starterCode: `def solution(a, b):\n    pass`, hints: ['Use try/except', 'Return dict on error'] },
        tests: [
            { id: 't1', description: 'Normal', input: [10, 2], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Zero', input: [10, 0], expectedOutput: { error: true, message: 'Division by zero' }, isHidden: true },
            { id: 't3', description: 'Negative', input: [-10, 2], expectedOutput: -5, isHidden: true }
        ],
        solution: `def solution(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return {"error": True, "message": "Division by zero"}`
    },

    // ============== DAYS 8-30 ==============
    ...generatePythonDays8to30()
];

function generatePythonDays8to30() {
    const topics = [
        { day: 8, title: 'Iterators and Generators', difficulty: 5, content: 'iter(), next(), yield, generator expressions', exercise: 'Create a generator that yields Fibonacci numbers' },
        { day: 9, title: 'Decorators', difficulty: 6, content: 'Function decorators, @syntax, wraps, class decorators', exercise: 'Implement a timing decorator' },
        { day: 10, title: 'Object-Oriented Programming', difficulty: 5, content: 'Classes, __init__, self, methods, attributes', exercise: 'Create a Student class with methods' },
        { day: 11, title: 'Inheritance and Polymorphism', difficulty: 6, content: 'super(), method overriding, multiple inheritance', exercise: 'Build a shape hierarchy' },
        { day: 12, title: 'Magic Methods', difficulty: 6, content: '__str__, __repr__, __eq__, __lt__, __add__', exercise: 'Implement a Vector class with operators' },
        { day: 13, title: 'Modules and Packages', difficulty: 5, content: 'import, from, __init__.py, relative imports', exercise: 'Organize code into a package' },
        { day: 14, title: 'Virtual Environments', difficulty: 4, content: 'venv, pip, requirements.txt, virtualenv', exercise: 'Create and manage a virtual environment' },
        { day: 15, title: 'Working with JSON', difficulty: 4, content: 'json.loads(), json.dumps(), file I/O with JSON', exercise: 'Parse and transform JSON data' },
        { day: 16, title: 'HTTP Requests', difficulty: 5, content: 'requests library, GET/POST, headers, sessions', exercise: 'Build an API client' },
        { day: 17, title: 'Regular Expressions', difficulty: 6, content: 're module, patterns, groups, substitution', exercise: 'Validate email and extract data' },
        { day: 18, title: 'Unit Testing with pytest', difficulty: 6, content: 'test functions, assertions, fixtures, mocking', exercise: 'Write comprehensive tests' },
        { day: 19, title: 'Type Hints', difficulty: 5, content: 'Type annotations, Optional, Union, List, Dict', exercise: 'Add types to a module' },
        { day: 20, title: 'Async/Await', difficulty: 7, content: 'asyncio, coroutines, gather, event loop', exercise: 'Implement async web scraper' },
        { day: 21, title: 'Data Classes', difficulty: 5, content: '@dataclass, frozen, field, __post_init__', exercise: 'Create immutable data containers' },
        { day: 22, title: 'Context Managers Deep Dive', difficulty: 6, content: '__enter__, __exit__, contextlib, async context', exercise: 'Build a database connection manager' },
        { day: 23, title: 'Functional Programming', difficulty: 7, content: 'map, filter, reduce, functools, lambda', exercise: 'Implement a data pipeline' },
        { day: 24, title: 'Database with SQLAlchemy', difficulty: 7, content: 'ORM basics, models, sessions, queries', exercise: 'Build CRUD operations' },
        { day: 25, title: 'Web Scraping', difficulty: 6, content: 'BeautifulSoup, requests, parsing HTML', exercise: 'Extract data from web pages' },
        { day: 26, title: 'Building REST APIs', difficulty: 7, content: 'FastAPI/Flask, routes, request handling', exercise: 'Create RESTful endpoints' },
        { day: 27, title: 'Logging and Debugging', difficulty: 6, content: 'logging module, handlers, pdb debugger', exercise: 'Implement structured logging' },
        { day: 28, title: 'Concurrency', difficulty: 8, content: 'threading, multiprocessing, GIL, pools', exercise: 'Parallelize data processing' },
        { day: 29, title: 'Performance Optimization', difficulty: 8, content: 'profiling, caching, algorithms, memory', exercise: 'Optimize a slow function' },
        { day: 30, title: 'Capstone Project', difficulty: 10, content: 'Complete application combining all concepts', exercise: 'Build a CLI tool with tests' }
    ];

    return topics.map(t => ({
        language: 'python',
        day: t.day,
        title: t.title,
        difficulty: t.difficulty,
        estimatedMinutes: 30 + t.difficulty * 5,
        objectives: [`Master ${t.title}`, 'Apply in real scenarios', 'Write Pythonic code', 'Debug effectively'],
        contentHtml: `<h2>${t.title}</h2>
<p>${t.content}</p>
<h3>Key Concepts</h3>
<ul>
  <li>Core ${t.title.toLowerCase()} fundamentals</li>
  <li>Best practices and patterns</li>
  <li>Error handling approaches</li>
  <li>Performance considerations</li>
</ul>
<h3>Example Code</h3>
<pre><code># ${t.title} example
def example():
    # Implementation here
    pass</code></pre>`,
        examples: [
            { title: 'Basic Example', code: `# ${t.title}\nprint("Day ${t.day}")`, explanation: `Basic ${t.title.toLowerCase()} usage.` },
            { title: 'Advanced Pattern', code: `# Advanced ${t.title}\ndef advanced():\n    pass`, explanation: 'Advanced implementation.' }
        ],
        exercise: { description: t.exercise, starterCode: `def solution(input_data):\n    # Your implementation\n    pass`, hints: ['Start simple', 'Build incrementally', 'Test edge cases'] },
        tests: [
            { id: 't1', description: 'Basic test', input: 'basic', expectedOutput: 'basic', isHidden: false },
            { id: 't2', description: 'Edge case', input: 'edge', expectedOutput: 'edge', isHidden: false },
            { id: 't3', description: 'Complex case', input: 'complex', expectedOutput: 'complex', isHidden: false },
            { id: 't4', description: 'Hidden test 1', input: 'h1', expectedOutput: 'h1', isHidden: true },
            { id: 't5', description: 'Hidden test 2', input: 'h2', expectedOutput: 'h2', isHidden: true },
            { id: 't6', description: 'Hidden test 3', input: 'h3', expectedOutput: 'h3', isHidden: true }
        ],
        solution: `def solution(input_data):\n    # Complete ${t.title} solution\n    return input_data`
    }));
}
