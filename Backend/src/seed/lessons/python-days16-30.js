/**
 * Python Days 16-30 - COMPLETE with REAL solutions
 */

export const pythonDays16to30Real = [
    // DAY 16: HTTP Requests
    {
        language: 'python', day: 16, title: 'HTTP Requests', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Use requests library', 'Handle GET and POST', 'Work with headers and params', 'Parse JSON responses'],
        contentHtml: `<h2>HTTP Requests with requests Library</h2>
<pre><code>import requests

# GET request
response = requests.get('https://api.example.com/users')
print(response.status_code)  # 200
data = response.json()

# POST request
payload = {'name': 'Alice', 'email': 'alice@example.com'}
response = requests.post('https://api.example.com/users', json=payload)

# With headers
headers = {'Authorization': 'Bearer token123'}
response = requests.get(url, headers=headers)

# Query parameters
params = {'page': 1, 'limit': 10}
response = requests.get(url, params=params)</code></pre>`,
        examples: [
            { title: 'Error Handling', code: `try:\n    response = requests.get(url, timeout=5)\n    response.raise_for_status()\n    return response.json()\nexcept requests.exceptions.Timeout:\n    return {'error': 'Request timed out'}\nexcept requests.exceptions.HTTPError as e:\n    return {'error': str(e)}`, explanation: 'Always handle network errors.' },
            { title: 'Session', code: `s = requests.Session()\ns.headers.update({'x-test': 'true'})\ns.get('http://httpbin.org/headers')`, explanation: 'Use Session to persist parameters.' }
        ],
        exercise: { description: 'Count HTTP requests by method+path combination.', starterCode: `def solution(requests_list):\n    # requests_list: [{'method': 'GET', 'url': '/users'}, ...]\n    # Return: {'GET /users': 2, 'POST /users': 1}\n    pass`, hints: ['Combine method and url as key', 'Use dict to count'] },
        tests: [
            { id: 't1', description: 'Single request', input: [[{ 'method': 'GET', 'url': '/users' }]], expectedOutput: { 'GET /users': 1 }, isHidden: false },
            { id: 't2', description: 'Multiple same', input: [[{ 'method': 'GET', 'url': '/a' }, { 'method': 'GET', 'url': '/a' }]], expectedOutput: { 'GET /a': 2 }, isHidden: false },
            { id: 't3', description: 'Mixed', input: [[{ 'method': 'GET', 'url': '/a' }, { 'method': 'POST', 'url': '/a' }]], expectedOutput: { 'GET /a': 1, 'POST /a': 1 }, isHidden: true },
            { id: 't4', description: 'Empty', input: [[]], expectedOutput: {}, isHidden: true }
        ],
        solution: `def solution(requests_list):\n    counts = {}\n    for req in requests_list:\n        key = f"{req['method']} {req['url']}"\n        counts[key] = counts.get(key, 0) + 1\n    return counts`
    },

    // DAY 17: Regular Expressions
    {
        language: 'python', day: 17, title: 'Regular Expressions', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use re module', 'Write patterns with special chars', 'Extract groups', 'Apply substitution'],
        contentHtml: `<h2>Regular Expressions</h2>
<pre><code>import re

# Match
if re.match(r'^hello', 'hello world'):
    print('Starts with hello')

# Search
match = re.search(r'\\d+', 'age: 25')
if match:
    print(match.group())  # '25'

# Find all
numbers = re.findall(r'\\d+', 'a1b2c3')  # ['1', '2', '3']

# Groups
pattern = r'(\\w+)@(\\w+\\.\\w+)'
match = re.match(pattern, 'user@example.com')
print(match.groups())  # ('user', 'example.com')

# Substitution
result = re.sub(r'\\d+', 'X', 'a1b2c3')  # 'aXbXcX'</code></pre>`,
        examples: [
            { title: 'Email Validation', code: `import re\n\ndef is_valid_email(email):\n    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'\n    return bool(re.match(pattern, email))`, explanation: 'Comprehensive email pattern.' },
            { title: 'Phone Number', code: `pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'\nre.findall(pattern, 'Call 555-123-4567')`, explanation: 'Find patterns in text.' }
        ],
        exercise: { description: 'Validate email format.', starterCode: `def solution(email):\n    # Return True if valid email format\n    pass`, hints: ['Use re.match', 'Pattern: user@domain.tld', 'Check for proper structure'] },
        tests: [
            { id: 't1', description: 'Valid email', input: ['user@example.com'], expectedOutput: true, isHidden: false },
            { id: 't2', description: 'No @', input: ['userexample.com'], expectedOutput: false, isHidden: false },
            { id: 't3', description: 'No domain', input: ['user@'], expectedOutput: false, isHidden: true },
            { id: 't4', description: 'Valid with dots', input: ['user.name@sub.example.com'], expectedOutput: true, isHidden: true }
        ],
        solution: `import re\ndef solution(email):\n    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'\n    return bool(re.match(pattern, email))`
    },

    // DAY 18: Unit Testing
    {
        language: 'python', day: 18, title: 'Unit Testing with pytest', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write test functions', 'Use assertions', 'Apply fixtures', 'Run parameterized tests'],
        contentHtml: `<h2>pytest Testing</h2>
<pre><code># test_example.py
def test_addition():
    assert 1 + 1 == 2

def test_string():
    assert 'hello'.upper() == 'HELLO'

# Fixtures
import pytest

@pytest.fixture
def sample_data():
    return [1, 2, 3, 4, 5]

def test_sum(sample_data):
    assert sum(sample_data) == 15</code></pre>`,
        examples: [
            { title: 'Parameterized Tests', code: `import pytest\n\n@pytest.mark.parametrize("input,expected", [\n    (1, 1),\n    (2, 4),\n    (3, 9),\n])\ndef test_square(input, expected):\n    assert input ** 2 == expected`, explanation: 'Test multiple inputs with one function.' },
            { title: 'Exception Testing', code: `def test_error():\n    with pytest.raises(ValueError):\n        raise ValueError("Bad value")`, explanation: 'Verify exceptions are raised.' }
        ],
        exercise: { description: 'Calculate statistics from numbers list.', starterCode: `def solution(numbers):\n    # Return {'sum': X, 'avg': X, 'min': X, 'max': X}\n    pass`, hints: ['Use sum(), len(), min(), max()', 'avg = sum/len', 'Handle empty list'] },
        tests: [
            { id: 't1', description: 'Basic stats', input: [[1, 2, 3, 4, 5]], expectedOutput: { 'sum': 15, 'avg': 3, 'min': 1, 'max': 5 }, isHidden: false },
            { id: 't2', description: 'Single', input: [[10]], expectedOutput: { 'sum': 10, 'avg': 10, 'min': 10, 'max': 10 }, isHidden: false },
            { id: 't3', description: 'Negative', input: [[-5, 0, 5]], expectedOutput: { 'sum': 0, 'avg': 0, 'min': -5, 'max': 5 }, isHidden: true }
        ],
        solution: `def solution(numbers):\n    if not numbers:\n        return {'sum':0,'avg':0,'min':0,'max':0}\n    return {\n        'sum': sum(numbers),\n        'avg': sum(numbers) / len(numbers),\n        'min': min(numbers),\n        'max': max(numbers)\n    }`
    },

    // DAY 19: Type Hints
    {
        language: 'python', day: 19, title: 'Type Hints', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Add type annotations', 'Use Optional and Union', 'Work with generic types', 'Apply typing module'],
        contentHtml: `<h2>Type Hints</h2>
<pre><code>from typing import Optional, Union, List, Dict

def greet(name: str) -> str:
    return f"Hello, {name}!"

def process(data: List[int]) -> Dict[str, int]:
    return {'sum': sum(data), 'count': len(data)}

def find_user(user_id: int) -> Optional[dict]:
    # Returns None if not found
    pass

def parse(value: Union[str, int]) -> str:
    return str(value)</code></pre>`,
        examples: [
            { title: 'Generic Types', code: `from typing import TypeVar, Generic\n\nT = TypeVar('T')\n\nclass Box(Generic[T]):\n    def __init__(self, value: T):\n        self.value = value\n    \n    def get(self) -> T:\n        return self.value`, explanation: 'Create reusable generic classes.' },
            { title: 'Typed Dict', code: `from typing import TypedDict\nclass User(TypedDict):\n    name: str\n    age: int`, explanation: 'Define dictionary structures.' }
        ],
        exercise: { description: 'Validate object has correct types based on schema.', starterCode: `def solution(obj, schema):\n    # schema: {'name': 'str', 'age': 'int'}\n    # Return True if all fields match types\n    pass`, hints: ['Check each field in schema', 'Use type().__name__', 'Compare with expected type'] },
        tests: [
            { id: 't1', description: 'Valid types', input: [{ 'name': 'Alice', 'age': 30 }, { 'name': 'str', 'age': 'int' }], expectedOutput: true, isHidden: false },
            { id: 't2', description: 'Wrong type', input: [{ 'name': 'Alice', 'age': '30' }, { 'name': 'str', 'age': 'int' }], expectedOutput: false, isHidden: false },
            { id: 't3', description: 'Missing field', input: [{ 'name': 'Alice' }, { 'name': 'str', 'age': 'int' }], expectedOutput: false, isHidden: true }
        ],
        solution: `def solution(obj, schema):\n    for field, expected_type in schema.items():\n        if field not in obj:\n            return False\n        if type(obj[field]).__name__ != expected_type:\n            return False\n    return True`
    },

    // DAY 20: Async/Await
    {
        language: 'python', day: 20, title: 'Async/Await', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Write async functions', 'Use await keyword', 'Work with asyncio', 'Handle concurrent tasks'],
        contentHtml: `<h2>Async Programming</h2>
<pre><code>import asyncio

async def fetch_data(url):
    await asyncio.sleep(1)  # Simulate network delay
    return f"Data from {url}"

async def main():
    # Sequential
    result1 = await fetch_data("url1")
    result2 = await fetch_data("url2")
    
    # Concurrent
    results = await asyncio.gather(
        fetch_data("url1"),
        fetch_data("url2")
    )

asyncio.run(main())</code></pre>`,
        examples: [
            { title: 'Async Context Manager', code: `class AsyncDB:\n    async def __aenter__(self):\n        await self.connect()\n        return self\n    \n    async def __aexit__(self, *args):\n        await self.close()\n\nasync def main():\n    async with AsyncDB() as db:\n        await db.query("SELECT 1")`, explanation: 'Async with statement for resource management.' },
            { title: 'Asyncio Gather', code: `async def main():\n    results = await asyncio.gather(task1(), task2())`, explanation: 'Run tasks concurrently.' }
        ],
        exercise: { description: 'Simulate parallel task times. Return max time (parallel execution).', starterCode: `def solution(task_times):\n    # task_times: [100, 200, 150] ms\n    # Parallel = max time, Sequential = sum\n    # Return max\n    pass`, hints: ['Use max() for parallel', 'All tasks run simultaneously'] },
        tests: [
            { id: 't1', description: 'Find max', input: [[100, 200, 150]], expectedOutput: 200, isHidden: false },
            { id: 't2', description: 'Single task', input: [[500]], expectedOutput: 500, isHidden: false },
            { id: 't3', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: true },
            { id: 't4', description: 'Equal times', input: [[100, 100, 100]], expectedOutput: 100, isHidden: true }
        ],
        solution: `def solution(task_times):\n    return max(task_times) if task_times else 0`
    },

    // DAY 21-30 with real solutions
    ...generatePythonDays21to30()
];

function generatePythonDays21to30() {
    return [
        // DAY 21: Data Classes
        {
            language: 'python', day: 21, title: 'Data Classes', difficulty: 5, estimatedMinutes: 35,
            objectives: ['Use @dataclass decorator', 'Define fields', 'Apply frozen for immutability', 'Implement __post_init__'],
            contentHtml: `<h2>Data Classes</h2>
<pre><code>from dataclasses import dataclass, field

@dataclass
class Person:
    name: str
    age: int
    email: str = ""

@dataclass(frozen=True)
class Point:
    x: float
    y: float</code></pre>`,
            examples: [
                { title: 'With defaults', code: `@dataclass\nclass User:\n    name: str\n    roles: list = field(default_factory=list)`, explanation: 'Use field() for mutable defaults.' },
                { title: 'Post Init', code: `@dataclass\nclass Box:\n    x: float\n    def __post_init__(self):\n        self.x = round(self.x, 2)`, explanation: 'Run logic after initialization.' }
            ],
            exercise: { description: 'Format person data as "Name (Age)".', starterCode: `def solution(person):\n    # person: {'name': 'Alice', 'age': 30}\n    # Return: 'Alice (30)'\n    pass`, hints: ['Access dict keys', 'Use f-string'] },
            tests: [
                { id: 't1', description: 'Format person', input: [{ 'name': 'Alice', 'age': 30 }], expectedOutput: 'Alice (30)', isHidden: false },
                { id: 't2', description: 'Young person', input: [{ 'name': 'Bob', 'age': 5 }], expectedOutput: 'Bob (5)', isHidden: true },
                { id: 't3', description: 'Empty name', input: [{ 'name': '', 'age': 0 }], expectedOutput: ' (0)', isHidden: true }
            ],
            solution: `def solution(person):\n    return f"{person['name']} ({person['age']})"`
        },

        // DAY 22: Context Managers
        {
            language: 'python', day: 22, title: 'Context Managers', difficulty: 6, estimatedMinutes: 40,
            objectives: ['Implement __enter__ and __exit__', 'Use @contextmanager', 'Handle cleanup', 'Apply with statement'],
            contentHtml: `<h2>Context Managers</h2>
<pre><code>class FileManager:
    def __init__(self, filename):
        self.filename = filename
    
    def __enter__(self):
        self.file = open(self.filename)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False</code></pre>`,
            examples: [
                { title: '@contextmanager', code: `from contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    start = time.time()\n    yield\n    print(f"Elapsed: {time.time() - start}")`, explanation: 'Decorator-based context manager.' },
                { title: 'Class based', code: `class MyContext:\n    def __enter__(self):\n        print('Enter')\n    def __exit__(self, *args):\n        print('Exit')`, explanation: 'Class based implementation.' }
            ],
            exercise: { description: 'Simulate resource lifecycle: open, write, close.', starterCode: `def solution(operations):\n    # operations: ['open', 'write', 'close']\n    # Return: ['opened', 'wrote', 'closed']\n    pass`, hints: ['Map each operation to past tense', 'open->opened, write->wrote, close->closed'] },
            tests: [
                { id: 't1', description: 'All ops', input: [['open', 'write', 'close']], expectedOutput: ['opened', 'wrote', 'closed'], isHidden: false },
                { id: 't2', description: 'Just open', input: [['open']], expectedOutput: ['opened'], isHidden: true },
                { id: 't3', description: 'Just close', input: [['close']], expectedOutput: ['closed'], isHidden: true }
            ],
            solution: `def solution(operations):\n    mapping = {'open':'opened','write':'wrote','close':'closed'}\n    return [mapping.get(op, op) for op in operations]`
        },

        // DAY 23: Functional Programming
        {
            language: 'python', day: 23, title: 'Functional Programming', difficulty: 7, estimatedMinutes: 45,
            objectives: ['Use map, filter, reduce', 'Apply functools', 'Work with lambda', 'Implement pure functions'],
            contentHtml: `<h2>Functional Programming</h2>
<pre><code>from functools import reduce

# Map
squares = list(map(lambda x: x**2, [1,2,3]))

# Filter
evens = list(filter(lambda x: x%2==0, [1,2,3,4]))

# Reduce
total = reduce(lambda a,b: a+b, [1,2,3,4], 0)</code></pre>`,
            examples: [
                { title: 'Composition', code: `def compose(*funcs):\n    return reduce(lambda f,g: lambda x: f(g(x)), funcs)`, explanation: 'Compose functions right-to-left.' },
                { title: 'Partial Application', code: `from functools import partial\nadd5 = partial(add, 5)`, explanation: 'Pre-fill arguments.' }
            ],
            exercise: { description: 'Filter even numbers from list.', starterCode: `def solution(numbers):\n    # Return only even numbers\n    pass`, hints: ['Use filter() or list comprehension', 'n % 2 == 0'] },
            tests: [
                { id: 't1', description: 'Mixed', input: [[1, 2, 3, 4, 5]], expectedOutput: [2, 4], isHidden: false },
                { id: 't2', description: 'All evens', input: [[2, 4, 6]], expectedOutput: [2, 4, 6], isHidden: true },
                { id: 't3', description: 'No evens', input: [[1, 3, 5]], expectedOutput: [], isHidden: true }
            ],
            solution: `def solution(numbers):\n    return [n for n in numbers if n % 2 == 0]`
        },

        // DAY 24: Database
        {
            language: 'python', day: 24, title: 'Database with SQLAlchemy', difficulty: 7, estimatedMinutes: 50,
            objectives: ['Define ORM models', 'Create sessions', 'Perform CRUD', 'Write queries'],
            contentHtml: `<h2>SQLAlchemy ORM</h2>
<pre><code>from sqlalchemy import create_engine
from sqlalchemy.orm import Session

engine = create_engine("sqlite:///db.sqlite")
with Session(engine) as session:
    user = User(name="Alice")
    session.add(user)
    session.commit()</code></pre>`,
            examples: [
                { title: 'Query', code: `users = session.query(User).filter(User.age > 18).all()`, explanation: 'Filter with ORM query.' },
                { title: 'Update', code: `user.email = 'new@example.com'\nsession.commit()`, explanation: 'Modify objects and commit.' }
            ],
            exercise: { description: 'Simulate DB operations: insert returns True, select returns data.', starterCode: `def solution(operations):\n    # ops: [{'op':'insert','data':{...}}, {'op':'select','id':1}]\n    pass`, hints: ['Store in dict by id', 'Return data on select'] },
            tests: [
                { id: 't1', description: 'Insert and select', input: [[{ 'op': 'insert', 'data': { 'id': 1, 'name': 'A' } }, { 'op': 'select', 'id': 1 }]], expectedOutput: [true, { 'id': 1, 'name': 'A' }], isHidden: false },
                { id: 't2', description: 'Select missing', input: [[{ 'op': 'select', 'id': 99 }]], expectedOutput: [null], isHidden: true },
                { id: 't3', description: 'Insert only', input: [[{ 'op': 'insert', 'data': { 'id': 2 } }]], expectedOutput: [true], isHidden: true }
            ],
            solution: `def solution(operations):\n    store = {}\n    results = []\n    for op in operations:\n        if op['op'] == 'insert':\n            store[op['data']['id']] = op['data']\n            results.append(True)\n        elif op['op'] == 'select':\n            results.append(store.get(op['id']))\n    return results`
        },

        // DAY 25: Web Scraping
        {
            language: 'python', day: 25, title: 'Web Scraping', difficulty: 6, estimatedMinutes: 40,
            objectives: ['Use BeautifulSoup', 'Parse HTML', 'Extract data', 'Handle pagination'],
            contentHtml: `<h2>BeautifulSoup</h2>
<pre><code>from bs4 import BeautifulSoup

html = '<div class="title">Hello</div>'
soup = BeautifulSoup(html, 'html.parser')
title = soup.find('div', class_='title').text  # 'Hello'</code></pre>`,
            examples: [
                { title: 'Find all', code: `links = soup.find_all('a')\nfor link in links:\n    print(link.get('href'))`, explanation: 'Extract all links.' },
                { title: 'CSS Selectors', code: `items = soup.select('.item > a')`, explanation: 'Use CSS selectors.' }
            ],
            exercise: { description: 'Extract text content from HTML div.', starterCode: `def solution(html):\n    # Extract text from first div\n    pass`, hints: ['Parse with BeautifulSoup', 'find("div").text'] },
            tests: [
                { id: 't1', description: 'Simple div', input: ['<div>Hello</div>'], expectedOutput: 'Hello', isHidden: false },
                { id: 't2', description: 'Nested', input: ['<div><span>World</span></div>'], expectedOutput: 'World', isHidden: true },
                { id: 't3', description: 'Empty div', input: ['<div></div>'], expectedOutput: '', isHidden: true }
            ],
            solution: `def solution(html):\n    import re\n    match = re.search(r'<div[^>]*>(.+?)</div>', html, re.DOTALL)\n    if match:\n        text = re.sub(r'<[^>]+>', '', match.group(1))\n        return text.strip()\n    return ''`
        },

        // DAY 26: REST APIs
        {
            language: 'python', day: 26, title: 'Building REST APIs', difficulty: 7, estimatedMinutes: 50,
            objectives: ['Create Flask/FastAPI routes', 'Handle requests', 'Return JSON', 'Apply validation'],
            contentHtml: `<h2>Building REST APIs with FastAPI</h2>
<p>FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.</p>

<h3>Key Features</h3>
<ul>
  <li><strong>Fast:</strong> Very high performance, on par with NodeJS and Go.</li>
  <li><strong>Fast to code:</strong> Increase the speed to develop features by about 200% to 300%.</li>
  <li><strong>Fewer bugs:</strong> Reduce about 40% of human (developer) induced errors.</li>
  <li><strong>Intuitive:</strong> Great editor support. Completion everywhere. Less time debugging.</li>
  <li><strong>Easy:</strong> Designed to be easy to use and learn. Less time reading docs.</li>
  <li><strong>Short:</strong> Minimize code duplication. Multiple features from each parameter declaration.</li>
</ul>

<h3>Creating a Basic API</h3>
<pre><code>from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    id: int
    name: string

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}

@app.post("/users")
def create_user(user: User):
    return {"message": "User created", "user": user}</code></pre>
<p>FastAPI automatically generates interactive API documentation (using Swagger UI) at <code>/docs</code>.</p>`,
            examples: [
                { title: 'POST', code: `@app.post("/users")\ndef create_user(user: UserCreate):\n    return {"id": 1, **user.dict()}`, explanation: 'Create with Pydantic model.' },
                { title: 'Query Params', code: `@app.get("/items")\ndef list_items(skip: int = 0, limit: int = 10):\n    return items[skip : skip + limit]`, explanation: 'Handle query parameters.' }
            ],
            exercise: { description: 'Route request to handler, extracting path params.', starterCode: `def solution(request):\n    # request: {'method': 'GET', 'path': '/users/1'}\n    # Return: {'handler': 'getUser', 'params': {'id': '1'}}\n    pass`, hints: ['Parse path segments', 'Extract numeric ID'] },
            tests: [
                { id: 't1', description: 'Get user', input: [{ 'method': 'GET', 'path': '/users/1' }], expectedOutput: { 'handler': 'getUser', 'params': { 'id': '1' } }, isHidden: false },
                { id: 't2', description: 'List users', input: [{ 'method': 'GET', 'path': '/users' }], expectedOutput: { 'handler': 'listUsers', 'params': {} }, isHidden: true },
                { id: 't3', description: 'Not found', input: [{ 'method': 'GET', 'path': '/404' }], expectedOutput: { 'handler': 'notFound', 'params': {} }, isHidden: true }
            ],
            solution: `def solution(request):\n    path = request['path']\n    parts = path.strip('/').split('/')\n    if len(parts) == 2 and parts[0] == 'users':\n        return {'handler': 'getUser', 'params': {'id': parts[1]}}\n    elif len(parts) == 1 and parts[0] == 'users':\n        return {'handler': 'listUsers', 'params': {}}\n    return {'handler': 'notFound', 'params': {}}`
        },

        // DAY 27: Logging
        {
            language: 'python', day: 27, title: 'Logging and Debugging', difficulty: 6, estimatedMinutes: 40,
            objectives: ['Configure logging', 'Use log levels', 'Add handlers', 'Debug with pdb'],
            contentHtml: `<h2>Logging and Debugging</h2>
<p>Effective logging and debugging are crucial for maintaining healthy applications. Python's built-in <code>logging</code> module provides a flexible framework for emitting log messages from Python programs.</p>

<h3>Logging Levels</h3>
<ul>
  <li><strong>DEBUG:</strong> Detailed information, typically of interest only when diagnosing problems.</li>
  <li><strong>INFO:</strong> Confirmation that things are working as expected.</li>
  <li><strong>WARNING:</strong> An indication that something unexpected happened, or indicative of some problem in the near future (e.g. 'disk space low'). but the software is still working as expected.</li>
  <li><strong>ERROR:</strong> Due to a more serious problem, the software has not been able to perform some function.</li>
  <li><strong>CRITICAL:</strong> A serious error, indicating that the program itself may be unable to continue running.</li>
</ul>

<h3>Basic Configuration</h3>
<pre><code>import logging

# Configure the logging system
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

logger = logging.getLogger(__name__)

logger.info("Application started")
try:
    result = 10 / 0
except ZeroDivisionError:
    logger.exception("Division by zero occurred")</code></pre>`,
            examples: [
                { title: 'Custom handler', code: `handler = logging.FileHandler('app.log')\nhandler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))\nlogger.addHandler(handler)`, explanation: 'Log to file.' },
                { title: 'Exception Logging', code: `try:\n    1/0\nexcept:\n    logger.exception("Failed")`, explanation: 'Log with stack trace.' }
            ],
            exercise: { description: 'Count log entries by level.', starterCode: `def solution(log_lines):\n    # log_lines: ['INFO msg1', 'ERROR msg2', 'INFO msg3']\n    # Return: {'INFO': 2, 'ERROR': 1}\n    pass`, hints: ['Split on first space', 'Count by level'] },
            tests: [
                { id: 't1', description: 'Count levels', input: [['INFO msg1', 'ERROR msg2', 'INFO msg3']], expectedOutput: { 'INFO': 2, 'ERROR': 1 }, isHidden: false },
                { id: 't2', description: 'Single level', input: [['DEBUG x', 'DEBUG y']], expectedOutput: { 'DEBUG': 2 }, isHidden: true },
                { id: 't3', description: 'Mixed', input: [['INFO a', 'DEBUG b']], expectedOutput: { 'INFO': 1, 'DEBUG': 1 }, isHidden: true }
            ],
            solution: `def solution(log_lines):\n    counts = {}\n    for line in log_lines:\n        level = line.split()[0]\n        counts[level] = counts.get(level, 0) + 1\n    return counts`
        },

        // DAY 28: Concurrency
        {
            language: 'python', day: 28, title: 'Concurrency', difficulty: 8, estimatedMinutes: 50,
            objectives: ['Use threading and multiprocessing', 'Understand GIL', 'Apply ThreadPoolExecutor', 'Handle synchronization'],
            contentHtml: `<h2>Concurrency in Python</h2>
<p>Concurrency is the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the final outcome. Python offers two main approaches: Threading and Multiprocessing.</p>

<h3>Threading vs Multiprocessing</h3>
<ul>
  <li><strong>Threading:</strong> Uses shared memory. Good for I/O-bound tasks (network operations, file I/O). Limited by the Global Interpreter Lock (GIL) for CPU-bound tasks.</li>
  <li><strong>Multiprocessing:</strong> Uses separate memory space (processes). Bypasses the GIL. Ideal for CPU-bound tasks (heavy computations).</li>
</ul>

<h3>Using concurrent.futures</h3>
<p>The <code>concurrent.futures</code> module provides a high-level interface for asynchronously executing callables.</p>
<pre><code>from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import time

def task(n):
    time.sleep(1)
    return n * n

# Thread Pool for I/O tasks
with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(task, range(5)))

# Process Pool for CPU tasks
with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(task, range(5)))</code></pre>`,
            examples: [
                { title: 'Parallel processing', code: `def parallel_sum(lists):\n    with ThreadPoolExecutor() as ex:\n        sums = list(ex.map(sum, lists))\n    return sums`, explanation: 'Sum multiple lists in parallel.' },
                { title: 'Locking', code: `lock = threading.Lock()\nwith lock:\n    x += 1`, explanation: 'Prevent race conditions.' }
            ],
            exercise: { description: 'Find max task time (parallel execution).', starterCode: `def solution(task_times):\n    # Parallel = all run at once, total time = max\n    pass`, hints: ['Use max()'] },
            tests: [
                { id: 't1', description: 'Max time', input: [[3, 5, 2]], expectedOutput: 5, isHidden: false },
                { id: 't2', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: true },
                { id: 't3', description: 'Empty', input: [], expectedOutput: 0, isHidden: true }
            ],
            solution: `def solution(task_times):\n    return max(task_times) if task_times else 0`
        },

        // DAY 29: Performance
        {
            language: 'python', day: 29, title: 'Performance Optimization', difficulty: 8, estimatedMinutes: 50,
            objectives: ['Profile with cProfile', 'Optimize algorithms', 'Use caching', 'Reduce memory'],
            contentHtml: `<h2>Performance Optimization</h2>
<p>Optimizing Python code involves understanding where bottlenecks occur and applying strategies to reduce execution time and memory usage.</p>

<h3>Profiling</h3>
<p>Before optimizing, always measure. The <code>cProfile</code> module is a built-in tool for profiling Python programs.</p>
<pre><code>python -m cProfile myscript.py</code></pre>

<h3>Optimization Techniques</h3>
<ul>
  <li><strong>Algorithmic Improvements:</strong> Choosing the right data structure (e.g., set vs list for lookups) is often the biggest win.</li>
  <li><strong>Caching (Memoization):</strong> Store results of expensive function calls.</li>
  <li><strong>List Comprehensions:</strong> Generally faster than for-loops for creating lists.</li>
  <li><strong>Generator Expressions:</strong> Save memory by processing items one by one.</li>
  <li><strong>Built-in Functions:</strong> Use functions implemented in C (like <code>map</code>, <code>filter</code>, <code>sum</code>) where possible.</li>
</ul>

<h3>Using lru_cache</h3>
<pre><code>from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)</code></pre>`,
            examples: [
                { title: 'Memoization', code: `cache = {}\ndef fib(n):\n    if n in cache:\n        return cache[n]\n    result = fib(n-1) + fib(n-2) if n > 1 else n\n    cache[n] = result\n    return result`, explanation: 'Manual memoization.' },
                { title: 'Profiling', code: `import cProfile\ncProfile.run('main()')`, explanation: 'Profile execution time.' }
            ],
            exercise: { description: 'Calculate Fibonacci with memoization.', starterCode: `def solution(n):\n    # Return nth Fibonacci number\n    # Use memoization for performance\n    pass`, hints: ['Base cases: fib(0)=0, fib(1)=1', 'Cache results'] },
            tests: [
                { id: 't1', description: 'Fib(10)', input: [10], expectedOutput: 55, isHidden: false },
                { id: 't2', description: 'Fib(40)', input: [40], expectedOutput: 102334155, isHidden: false },
                { id: 't3', description: 'Fib(0)', input: [0], expectedOutput: 0, isHidden: true }
            ],
            solution: `def solution(n):\n    cache = {0: 0, 1: 1}\n    def fib(x):\n        if x not in cache:\n            cache[x] = fib(x-1) + fib(x-2)\n        return cache[x]\n    return fib(n)`
        },

        // DAY 30: Capstone
        {
            language: 'python', day: 30, title: 'Capstone Project', difficulty: 10, estimatedMinutes: 90,
            objectives: ['Build complete CLI tool', 'Apply all concepts', 'Write tests', 'Document code'],
            contentHtml: `<h2>Capstone: Task Manager CLI</h2>
<p>For your final project, you will build a robust Command Line Interface (CLI) Task Manager application. This project aggregates many concepts you've learned over the past 30 days, including file I/O, data structures, error handling, argument parsing, and testing.</p>

<h3>Project Requirements</h3>
<ol>
  <li><strong>Task Management:</strong>
    <ul>
      <li>Create new tasks with a title, description, and status (todo, in-progress, done).</li>
      <li>List all tasks or filter by status.</li>
      <li>Update task details or toggle status.</li>
      <li>Delete tasks.</li>
    </ul>
  </li>
  <li><strong>Persistence:</strong> Save tasks to a JSON file so data persists between runs.</li>
  <li><strong>CLI Interface:</strong> Use <code>argparse</code> to handle command-line arguments (e.g., <code>python tasks.py add "Buy milk"</code>).</li>
  <li><strong>Error Handling:</strong> Gracefully handle missing files, invalid IDs, or malformed inputs.</li>
  <li><strong>Testing:</strong> Include a test suite using <code>pytest</code> to verify your logic.</li>
</ol>

<h3>Suggested Architecture</h3>
<p>Separate your concerns: have a <code>Storage</code> class for file operations, a <code>TaskManager</code> class for business logic, and a <code>main.py</code> for parsing arguments and invoking the manager.</p>`,
            examples: [
                { title: 'Task CRUD', code: `class TaskManager:\n    def __init__(self):\n        self.tasks = {}\n        self.next_id = 1\n    \n    def create(self, title):\n        task = {'id': self.next_id, 'title': title}\n        self.tasks[self.next_id] = task\n        self.next_id += 1\n        return task`, explanation: 'In-memory task storage.' },
                { title: 'CLI Args', code: `import sys\ncmd = sys.argv[1]\nif cmd == 'list':\n    list_tasks()`, explanation: 'Handle command line structure.' }
            ],
            exercise: { description: 'Implement task CRUD operations.', starterCode: `def solution(operations):\n    # ops: [{'op': 'create', 'title': 'Task1'}, ...]\n    # Return results of each operation\n    pass`, hints: ['Track tasks by ID', 'Return created task', 'Support create, read, delete'] },
            tests: [
                { id: 't1', description: 'Create task', input: [[{ 'op': 'create', 'title': 'Task 1' }]], expectedOutput: [{ 'id': 1, 'title': 'Task 1' }], isHidden: false },
                { id: 't2', description: 'Create and read', input: [[{ 'op': 'create', 'title': 'A' }, { 'op': 'read', 'id': 1 }]], expectedOutput: [{ 'id': 1, 'title': 'A' }, { 'id': 1, 'title': 'A' }], isHidden: false },
                { id: 't3', description: 'Delete', input: [[{ 'op': 'create', 'title': 'X' }, { 'op': 'delete', 'id': 1 }, { 'op': 'read', 'id': 1 }]], expectedOutput: [{ 'id': 1, 'title': 'X' }, true, null], isHidden: true }
            ],
            solution: `def solution(operations):\n    tasks = {}\n    next_id = 1\n    results = []\n    for op in operations:\n        if op['op'] == 'create':\n            task = {'id': next_id, 'title': op['title']}\n            tasks[next_id] = task\n            next_id += 1\n            results.append(task)\n        elif op['op'] == 'read':\n            results.append(tasks.get(op['id']))\n        elif op['op'] == 'delete':\n            results.append(op['id'] in tasks)\n            tasks.pop(op['id'], None)\n    return results`
        }
    ];
}
