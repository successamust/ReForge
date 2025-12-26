/**
 * JavaScript Days 23-30 - COMPLETE with real exercises
 * Replaces placeholder content with actual working lessons
 */

export const javascriptDays23to30Real = [
  // ============== DAY 23: Web Workers ==============
  {
    language: 'javascript', day: 23, title: 'Web Workers', difficulty: 7, estimatedMinutes: 45,
    objectives: ['Create and communicate with Web Workers', 'Transfer data between main thread and workers', 'Handle errors in workers', 'Use SharedArrayBuffer for shared memory'],
    contentHtml: `<h2>Web Workers</h2>
<p>Web Workers allow running JavaScript in background threads, keeping the main thread responsive.</p>

<h3>Creating a Worker</h3>
<pre><code>// main.js
const worker = new Worker('worker.js');

worker.postMessage({ task: 'calculate', data: [1, 2, 3, 4, 5] });

worker.onmessage = (event) => {
  console.log('Result:', event.data);
};

worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};

// worker.js
self.onmessage = (event) => {
  const { task, data } = event.data;
  if (task === 'calculate') {
    const sum = data.reduce((a, b) => a + b, 0);
    self.postMessage(sum);
  }
};</code></pre>

<h3>Transferable Objects</h3>
<pre><code>// Transfer ArrayBuffer (zero-copy)
const buffer = new ArrayBuffer(1024);
worker.postMessage(buffer, [buffer]);
// buffer is now unusable in main thread</code></pre>

<h3>Terminating Workers</h3>
<pre><code>worker.terminate(); // Immediately stops worker</code></pre>`,
    examples: [
      { title: 'Heavy Computation Worker', code: `// Offload Fibonacci calculation\nconst worker = new Worker('fib-worker.js');\nworker.postMessage(40);\nworker.onmessage = (e) => console.log('Fib(40) =', e.data);\n\n// fib-worker.js\nfunction fib(n) {\n  return n <= 1 ? n : fib(n-1) + fib(n-2);\n}\nself.onmessage = (e) => self.postMessage(fib(e.data));`, explanation: 'Keeps UI responsive during heavy computation.' },
      { title: 'Worker Pool', code: `class WorkerPool {\n  constructor(size, script) {\n    this.workers = Array(size).fill().map(() => new Worker(script));\n    this.queue = [];\n    this.available = [...this.workers];\n  }\n  \n  execute(data) {\n    return new Promise((resolve) => {\n      const task = { data, resolve };\n      const worker = this.available.pop();\n      if (worker) this.runTask(worker, task);\n      else this.queue.push(task);\n    });\n  }\n  \n  runTask(worker, task) {\n    worker.onmessage = (e) => {\n      task.resolve(e.data);\n      const next = this.queue.shift();\n      if (next) this.runTask(worker, next);\n      else this.available.push(worker);\n    };\n    worker.postMessage(task.data);\n  }\n}`, explanation: 'Reuse workers for multiple tasks.' }
    ],
    exercise: { description: 'Simulate parallel task processing: given tasks with execution times, process them across N workers and return total time.', starterCode: `function solution(numWorkers, tasks) {\n  // tasks: array of execution times [3, 5, 2, 1]\n  // Return minimum time to complete all tasks with numWorkers parallel workers\n}`, hints: ['Model workers as array of current workloads', 'Assign each task to least loaded worker', 'Return max workload across workers'] },
    tests: [
      { id: 't1', description: '2 workers, balanced', input: [2, [4, 4]], expectedOutput: 4, isHidden: false },
      { id: 't2', description: '2 workers, unbalanced', input: [2, [1, 2, 3, 4]], expectedOutput: 5, isHidden: false },
      { id: 't3', description: '1 worker', input: [1, [1, 2, 3]], expectedOutput: 6, isHidden: false },
      { id: 't4', description: 'More workers than tasks', input: [5, [2, 3]], expectedOutput: 3, isHidden: true },
      { id: 't5', description: 'Empty tasks', input: [3, []], expectedOutput: 0, isHidden: true },
      { id: 't6', description: 'Large workload', input: [3, [7, 2, 5, 10, 8]], expectedOutput: 11, isHidden: true }
    ],
    solution: `function solution(numWorkers, tasks) {
  const workers = new Array(numWorkers).fill(0);
  for (const task of tasks) {
    const minIdx = workers.indexOf(Math.min(...workers));
    workers[minIdx] += task;
  }
  return Math.max(...workers, 0);
}`
  },

  // ============== DAY 24: WebSockets ==============
  {
    language: 'javascript', day: 24, title: 'WebSockets', difficulty: 7, estimatedMinutes: 45,
    objectives: ['Establish WebSocket connections', 'Send and receive messages', 'Handle connection lifecycle events', 'Implement reconnection logic'],
    contentHtml: `<h2>WebSockets</h2>
<p>WebSockets provide full-duplex communication channels over a single TCP connection.</p>

<h3>Client Connection</h3>
<pre><code>const ws = new WebSocket('wss://example.com/socket');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'hello' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onclose = (event) => {
  console.log('Disconnected:', event.code, event.reason);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};</code></pre>

<h3>Reconnection Pattern</h3>
<pre><code>function connect() {
  const ws = new WebSocket(url);
  ws.onclose = () => {
    console.log('Reconnecting in 3s...');
    setTimeout(connect, 3000);
  };
  return ws;
}</code></pre>`,
    examples: [
      { title: 'Message Queue', code: `class MessageQueue {\n  constructor(ws) {\n    this.ws = ws;\n    this.queue = [];\n    this.ready = false;\n    ws.onopen = () => {\n      this.ready = true;\n      this.flush();\n    };\n    ws.onclose = () => this.ready = false;\n  }\n  \n  send(msg) {\n    this.queue.push(msg);\n    if (this.ready) this.flush();\n  }\n  \n  flush() {\n    while (this.queue.length && this.ready) {\n      this.ws.send(this.queue.shift());\n    }\n  }\n}`, explanation: 'Queue messages until connection is ready.' },
      { title: 'Heartbeat', code: `function setupHeartbeat(ws, interval = 30000) {\n  const ping = () => {\n    if (ws.readyState === WebSocket.OPEN) {\n      ws.send(JSON.stringify({ type: 'ping' }));\n    }\n  };\n  const timer = setInterval(ping, interval);\n  ws.onclose = () => clearInterval(timer);\n}`, explanation: 'Keep connection alive with periodic pings.' }
    ],
    exercise: { description: 'Implement a message queue that buffers messages and delivers them in order. Support enqueue, dequeue, and peek operations.', starterCode: `function solution(operations) {\n  // operations: [{op: 'enqueue', value: X}, {op: 'dequeue'}, {op: 'peek'}]\n  // Return array of results from dequeue and peek operations\n}`, hints: ['Use array as queue', 'shift() for dequeue', 'Return undefined for empty queue'] },
    tests: [
      { id: 't1', description: 'Basic queue', input: [{ op: 'enqueue', value: 1 }, { op: 'enqueue', value: 2 }, { op: 'dequeue' }], expectedOutput: [1], isHidden: false },
      { id: 't2', description: 'Peek', input: [{ op: 'enqueue', value: 5 }, { op: 'peek' }, { op: 'dequeue' }], expectedOutput: [5, 5], isHidden: false },
      { id: 't3', description: 'Empty dequeue', input: [{ op: 'dequeue' }], expectedOutput: [undefined], isHidden: false },
      { id: 't4', description: 'Multiple ops', input: [{ op: 'enqueue', value: 'a' }, { op: 'enqueue', value: 'b' }, { op: 'dequeue' }, { op: 'dequeue' }, { op: 'dequeue' }], expectedOutput: ['a', 'b', undefined], isHidden: true },
      { id: 't5', description: 'Peek empty', input: [{ op: 'peek' }], expectedOutput: [undefined], isHidden: true }
    ],
    solution: `function solution(operations) {
  const queue = [];
  const results = [];
  for (const {op, value} of operations) {
    if (op === 'enqueue') queue.push(value);
    else if (op === 'dequeue') results.push(queue.shift());
    else if (op === 'peek') results.push(queue[0]);
  }
  return results;
}`
  },

  // ============== DAY 25: Security Best Practices ==============
  {
    language: 'javascript', day: 25, title: 'Security Best Practices', difficulty: 8, estimatedMinutes: 50,
    objectives: ['Prevent XSS attacks', 'Sanitize user input', 'Use Content Security Policy', 'Implement secure authentication patterns'],
    contentHtml: `<h2>Security Best Practices</h2>

<h3>XSS Prevention</h3>
<pre><code>// NEVER do this
element.innerHTML = userInput;

// Safe: textContent
element.textContent = userInput;

// Safe: escape HTML
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}</code></pre>

<h3>Input Validation</h3>
<pre><code>function validateEmail(email) {
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return pattern.test(email);
}

function sanitizeString(str) {
  return str.replace(/[<>&"']/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}</code></pre>

<h3>Content Security Policy</h3>
<pre><code>// HTTP Header
Content-Security-Policy: default-src 'self'; script-src 'self'</code></pre>`,
    examples: [
      { title: 'Safe DOM Manipulation', code: `function createSafeElement(tag, text) {\n  const el = document.createElement(tag);\n  el.textContent = text; // Safe\n  return el;\n}\n\n// Instead of innerHTML\nconst item = createSafeElement('li', userInput);\nlist.appendChild(item);`, explanation: 'textContent is safe from XSS.' },
      { title: 'URL Sanitization', code: `function sanitizeUrl(url) {\n  try {\n    const parsed = new URL(url);\n    if (!['http:', 'https:'].includes(parsed.protocol)) {\n      return '';\n    }\n    return parsed.href;\n  } catch {\n    return '';\n  }\n}`, explanation: 'Prevent javascript: URLs.' }
    ],
    exercise: { description: 'Implement an HTML escape function that converts <, >, &, ", and \' to their HTML entities.', starterCode: `function solution(input) {\n  // Escape HTML special characters\n  // Return escaped string\n}`, hints: ['Replace each special char', 'Use object mapping', '& must be first'] },
    tests: [
      { id: 't1', description: 'Escape tags', input: '<script>alert("xss")</script>', expectedOutput: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;', isHidden: false },
      { id: 't2', description: 'Escape ampersand', input: 'Tom & Jerry', expectedOutput: 'Tom &amp; Jerry', isHidden: false },
      { id: 't3', description: 'Escape quotes', input: "It's \"cool\"", expectedOutput: "It&#39;s &quot;cool&quot;", isHidden: false },
      { id: 't4', description: 'No special chars', input: 'Hello World', expectedOutput: 'Hello World', isHidden: true },
      { id: 't5', description: 'All special chars', input: '<>&"\'', expectedOutput: '&lt;&gt;&amp;&quot;&#39;', isHidden: true },
      { id: 't6', description: 'Empty string', input: '', expectedOutput: '', isHidden: true }
    ],
    solution: `function solution(input) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return input.replace(/[&<>"']/g, char => entities[char]);
}`
  },

  // ============== DAY 26: TypeScript Basics ==============
  {
    language: 'javascript', day: 26, title: 'TypeScript Basics', difficulty: 7, estimatedMinutes: 45,
    objectives: ['Understand type annotations', 'Use interfaces and types', 'Apply generics', 'Work with union and intersection types'],
    contentHtml: `<h2>TypeScript Basics</h2>

<h3>Type Annotations</h3>
<pre><code>let name: string = 'Alice';
let age: number = 30;
let active: boolean = true;
let items: string[] = ['a', 'b'];

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}</code></pre>

<h3>Interfaces</h3>
<pre><code>interface User {
  id: number;
  name: string;
  email?: string;  // Optional
  readonly createdAt: Date;
}

function createUser(data: User): User {
  return { ...data, createdAt: new Date() };
}</code></pre>

<h3>Generics</h3>
<pre><code>function identity<T>(value: T): T {
  return value;
}

interface Box<T> {
  value: T;
}

const numBox: Box<number> = { value: 42 };</code></pre>`,
    examples: [
      { title: 'Type Guards', code: `function isString(value: unknown): value is string {\n  return typeof value === 'string';\n}\n\nfunction process(value: string | number) {\n  if (isString(value)) {\n    return value.toUpperCase();\n  }\n  return value * 2;\n}`, explanation: 'Type guards narrow types at runtime.' },
      { title: 'Generic Constraints', code: `interface HasLength {\n  length: number;\n}\n\nfunction logLength<T extends HasLength>(value: T): number {\n  console.log(value.length);\n  return value.length;\n}\n\nlogLength('hello'); // 5\nlogLength([1, 2, 3]); // 3`, explanation: 'Constrain generics to types with certain properties.' }
    ],
    exercise: { description: 'Validate an object against a schema. Return {valid: true} or {valid: false, errors: [...]} with missing required fields.', starterCode: `function solution(obj, schema) {\n  // schema: {fieldName: {type: 'string'|'number'|'boolean', required: boolean}}\n  // Return validation result\n}`, hints: ['Check each schema field', 'Verify required fields exist', 'Check types with typeof'] },
    tests: [
      { id: 't1', description: 'Valid object', input: [{ name: 'Alice', age: 30 }, { name: { type: 'string', required: true }, age: { type: 'number', required: true } }], expectedOutput: { valid: true }, isHidden: false },
      { id: 't2', description: 'Missing required', input: [{ name: 'Alice' }, { name: { type: 'string', required: true }, age: { type: 'number', required: true } }], expectedOutput: { valid: false, errors: ['age is required'] }, isHidden: false },
      { id: 't3', description: 'Wrong type', input: [{ name: 123 }, { name: { type: 'string', required: true } }], expectedOutput: { valid: false, errors: ['name must be string'] }, isHidden: false },
      { id: 't4', description: 'Optional field', input: [{}, { email: { type: 'string', required: false } }], expectedOutput: { valid: true }, isHidden: true },
      { id: 't5', description: 'Multiple errors', input: [{}, { a: { type: 'string', required: true }, b: { type: 'number', required: true } }], expectedOutput: { valid: false, errors: ['a is required', 'b is required'] }, isHidden: true }
    ],
    solution: `function solution(obj, schema) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    const value = obj[field];
    if (rules.required && value === undefined) {
      errors.push(\`\${field} is required\`);
    } else if (value !== undefined && typeof value !== rules.type) {
      errors.push(\`\${field} must be \${rules.type}\`);
    }
  }
  return errors.length ? {valid: false, errors} : {valid: true};
}`
  },

  // ============== DAY 27: Node.js Fundamentals ==============
  {
    language: 'javascript', day: 27, title: 'Node.js Fundamentals', difficulty: 7, estimatedMinutes: 45,
    objectives: ['Work with the fs module', 'Use path module for cross-platform paths', 'Handle process arguments', 'Create CLI applications'],
    contentHtml: `<h2>Node.js Fundamentals</h2>

<h3>File System</h3>
<pre><code>import fs from 'fs/promises';
import path from 'path';

// Read file
const content = await fs.readFile('file.txt', 'utf-8');

// Write file
await fs.writeFile('output.txt', 'Hello');

// Read directory
const files = await fs.readdir('./src');</code></pre>

<h3>Path Module</h3>
<pre><code>path.join('src', 'utils', 'index.js'); // src/utils/index.js
path.resolve('./file.txt');  // Absolute path
path.basename('/a/b/c.txt'); // 'c.txt'
path.extname('file.js');     // '.js'
path.dirname('/a/b/c.txt');  // '/a/b'</code></pre>

<h3>Process Arguments</h3>
<pre><code>// node script.js --name=Alice --age=30
const args = process.argv.slice(2);
const parsed = {};
for (const arg of args) {
  const [key, value] = arg.replace('--', '').split('=');
  parsed[key] = value;
}</code></pre>`,
    examples: [
      { title: 'CLI Argument Parser', code: `function parseArgs(args) {\n  const result = { flags: {}, positional: [] };\n  for (const arg of args) {\n    if (arg.startsWith('--')) {\n      const [key, val] = arg.slice(2).split('=');\n      result.flags[key] = val ?? true;\n    } else if (arg.startsWith('-')) {\n      result.flags[arg.slice(1)] = true;\n    } else {\n      result.positional.push(arg);\n    }\n  }\n  return result;\n}`, explanation: 'Parse flags and positional arguments.' },
      { title: 'Recursive Directory Walk', code: `async function walk(dir) {\n  const files = [];\n  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {\n    const full = path.join(dir, entry.name);\n    if (entry.isDirectory()) {\n      files.push(...await walk(full));\n    } else {\n      files.push(full);\n    }\n  }\n  return files;\n}`, explanation: 'Recursively list all files in directory.' }
    ],
    exercise: { description: 'Parse command-line arguments into an object. Support --key=value and --flag (boolean true) formats.', starterCode: `function solution(args) {\n  // args: ['--name=Alice', '--verbose', '--count=5']\n  // Return: {name: 'Alice', verbose: true, count: '5'}\n}`, hints: ['Filter args starting with --', 'Split on = for key-value', 'No = means boolean true'] },
    tests: [
      { id: 't1', description: 'Key-value pairs', input: ['--name=Alice', '--age=30'], expectedOutput: { name: 'Alice', age: '30' }, isHidden: false },
      { id: 't2', description: 'Boolean flags', input: ['--verbose', '--dry-run'], expectedOutput: { verbose: true, 'dry-run': true }, isHidden: false },
      { id: 't3', description: 'Mixed', input: ['--output=file.txt', '--force'], expectedOutput: { output: 'file.txt', force: true }, isHidden: false },
      { id: 't4', description: 'Empty args', input: [], expectedOutput: {}, isHidden: true },
      { id: 't5', description: 'Value with equals', input: ['--url=http://a=b'], expectedOutput: { url: 'http://a=b' }, isHidden: true }
    ],
    solution: `function solution(args) {
  const result = {};
  for (const arg of args) {
    if (arg.startsWith('--')) {
      const content = arg.slice(2);
      const eqIndex = content.indexOf('=');
      if (eqIndex === -1) {
        result[content] = true;
      } else {
        result[content.slice(0, eqIndex)] = content.slice(eqIndex + 1);
      }
    }
  }
  return result;
}`
  },

  // ============== DAY 28: Express Middleware ==============
  {
    language: 'javascript', day: 28, title: 'Express Middleware', difficulty: 8, estimatedMinutes: 50,
    objectives: ['Create custom middleware', 'Build middleware chains', 'Handle errors in middleware', 'Apply middleware conditionally'],
    contentHtml: `<h2>Express Middleware</h2>

<h3>Middleware Basics</h3>
<pre><code>// Middleware function signature
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass to next middleware
}

app.use(logger); // Apply globally</code></pre>

<h3>Error Handling Middleware</h3>
<pre><code>// Error middleware has 4 parameters
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

// Must be last
app.use(errorHandler);</code></pre>

<h3>Async Middleware</h3>
<pre><code>const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));</code></pre>`,
    examples: [
      { title: 'Authentication Middleware', code: `function authMiddleware(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) {\n    return res.status(401).json({ error: 'No token' });\n  }\n  try {\n    req.user = jwt.verify(token, SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: 'Invalid token' });\n  }\n}`, explanation: 'Verify JWT and attach user to request.' },
      { title: 'Request Timing', code: `function timing(req, res, next) {\n  const start = Date.now();\n  res.on('finish', () => {\n    const duration = Date.now() - start;\n    console.log(\`\${req.method} \${req.url} - \${duration}ms\`);\n  });\n  next();\n}`, explanation: 'Log request duration after response.' }
    ],
    exercise: { description: 'Simulate middleware chain execution. Each middleware can call next() to proceed or stop. Return the final result.', starterCode: `function solution(middlewares, initialContext) {\n  // middlewares: [{name, action: 'next'|'stop'|'modify', value?}]\n  // Return: {completed: boolean, context: finalContext, stoppedAt?: name}\n}`, hints: ['Process middlewares in order', 'Stop if action is "stop"', '"modify" updates context with value'] },
    tests: [
      { id: 't1', description: 'All next', input: [[{ name: 'a', action: 'next' }, { name: 'b', action: 'next' }], {}], expectedOutput: { completed: true, context: {} }, isHidden: false },
      { id: 't2', description: 'Stop early', input: [[{ name: 'a', action: 'next' }, { name: 'b', action: 'stop' }], {}], expectedOutput: { completed: false, context: {}, stoppedAt: 'b' }, isHidden: false },
      { id: 't3', description: 'Modify context', input: [[{ name: 'a', action: 'modify', value: { user: 'Alice' } }], {}], expectedOutput: { completed: true, context: { user: 'Alice' } }, isHidden: false },
      { id: 't4', description: 'Empty chain', input: [[], { initial: true }], expectedOutput: { completed: true, context: { initial: true } }, isHidden: true },
      { id: 't5', description: 'First stops', input: [[{ name: 'first', action: 'stop' }], {}], expectedOutput: { completed: false, context: {}, stoppedAt: 'first' }, isHidden: true }
    ],
    solution: `function solution(middlewares, initialContext) {
  let context = {...initialContext};
  for (const mw of middlewares) {
    if (mw.action === 'stop') {
      return {completed: false, context, stoppedAt: mw.name};
    }
    if (mw.action === 'modify' && mw.value) {
      context = {...context, ...mw.value};
    }
  }
  return {completed: true, context};
}`
  },

  // ============== DAY 29: REST API Design ==============
  {
    language: 'javascript', day: 29, title: 'REST API Design', difficulty: 8, estimatedMinutes: 50,
    objectives: ['Design RESTful endpoints', 'Use proper HTTP methods and status codes', 'Implement pagination and filtering', 'Handle API versioning'],
    contentHtml: `<h2>REST API Design Principles</h2>

<h3>Resource-Based URLs</h3>
<pre><code>GET    /users          - List users
GET    /users/:id      - Get user
POST   /users          - Create user
PUT    /users/:id      - Update user
DELETE /users/:id      - Delete user

// Nested resources
GET    /users/:id/posts
POST   /users/:id/posts</code></pre>

<h3>HTTP Status Codes</h3>
<pre><code>200 OK           - Success
201 Created      - Resource created
204 No Content   - Success, no body
400 Bad Request  - Invalid input
401 Unauthorized - Auth required
403 Forbidden    - No permission
404 Not Found    - Resource missing
500 Server Error - Internal error</code></pre>

<h3>Pagination</h3>
<pre><code>GET /users?page=2&limit=20

{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}</code></pre>`,
    examples: [
      { title: 'Route Handler', code: `app.get('/users/:id', async (req, res) => {\n  const user = await User.findById(req.params.id);\n  if (!user) {\n    return res.status(404).json({ error: 'User not found' });\n  }\n  res.json(user);\n});\n\napp.post('/users', async (req, res) => {\n  const user = await User.create(req.body);\n  res.status(201).json(user);\n});`, explanation: 'Proper status codes for CRUD operations.' },
      { title: 'Query Filtering', code: `app.get('/products', async (req, res) => {\n  const query = {};\n  if (req.query.category) query.category = req.query.category;\n  if (req.query.minPrice) query.price = { $gte: Number(req.query.minPrice) };\n  \n  const products = await Product.find(query)\n    .skip((req.query.page - 1) * 20)\n    .limit(20);\n  res.json(products);\n});`, explanation: 'Filter and paginate results.' }
    ],
    exercise: { description: 'Route a request to the correct handler based on method and path. Return the matched handler name or 404.', starterCode: `function solution(routes, method, path) {\n  // routes: [{method, path, handler}]\n  // path may have params like /users/:id\n  // Return: {handler, params} or {error: 404}\n}`, hints: ['Split paths into segments', 'Match :param as wildcard', 'Capture param values'] },
    tests: [
      { id: 't1', description: 'Exact match', input: [[{ method: 'GET', path: '/users', handler: 'listUsers' }], 'GET', '/users'], expectedOutput: { handler: 'listUsers', params: {} }, isHidden: false },
      { id: 't2', description: 'With param', input: [[{ method: 'GET', path: '/users/:id', handler: 'getUser' }], 'GET', '/users/123'], expectedOutput: { handler: 'getUser', params: { id: '123' } }, isHidden: false },
      { id: 't3', description: 'No match', input: [[{ method: 'GET', path: '/users', handler: 'x' }], 'POST', '/users'], expectedOutput: { error: 404 }, isHidden: false },
      { id: 't4', description: 'Multiple params', input: [[{ method: 'GET', path: '/users/:userId/posts/:postId', handler: 'getPost' }], 'GET', '/users/1/posts/2'], expectedOutput: { handler: 'getPost', params: { userId: '1', postId: '2' } }, isHidden: true },
      { id: 't5', description: 'First match wins', input: [[{ method: 'GET', path: '/a', handler: 'first' }, { method: 'GET', path: '/a', handler: 'second' }], 'GET', '/a'], expectedOutput: { handler: 'first', params: {} }, isHidden: true }
    ],
    solution: `function solution(routes, method, path) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const routeParts = route.path.split('/');
    const pathParts = path.split('/');
    if (routeParts.length !== pathParts.length) continue;
    const params = {};
    let match = true;
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }
    if (match) return {handler: route.handler, params};
  }
  return {error: 404};
}`
  },

  // ============== DAY 30: Capstone Project ==============
  {
    language: 'javascript', day: 30, title: 'Capstone: Full Stack App', difficulty: 10, estimatedMinutes: 90,
    objectives: ['Build a complete CRUD API', 'Implement authentication', 'Add validation and error handling', 'Structure code for maintainability'],
    contentHtml: `<h2>Capstone Project: Task Management API</h2>

<h3>Project Structure</h3>
<pre><code>src/
  ├── routes/
  │   ├── auth.js
  │   └── tasks.js
  ├── middleware/
  │   ├── auth.js
  │   └── validate.js
  ├── models/
  │   └── Task.js
  ├── services/
  │   └── taskService.js
  └── app.js</code></pre>

<h3>Task Model</h3>
<pre><code>const TaskSchema = {
  id: string,
  title: string,
  description: string,
  status: 'pending' | 'in_progress' | 'done',
  priority: 1 | 2 | 3,
  createdAt: Date,
  updatedAt: Date
};</code></pre>

<h3>API Endpoints</h3>
<pre><code>POST   /tasks        - Create task
GET    /tasks        - List tasks (filter by status)
GET    /tasks/:id    - Get task
PUT    /tasks/:id    - Update task
DELETE /tasks/:id    - Delete task</code></pre>`,
    examples: [
      { title: 'Task CRUD Service', code: `class TaskService {\n  constructor() {\n    this.tasks = new Map();\n    this.nextId = 1;\n  }\n  \n  create(data) {\n    const task = {\n      id: String(this.nextId++),\n      ...data,\n      status: 'pending',\n      createdAt: new Date()\n    };\n    this.tasks.set(task.id, task);\n    return task;\n  }\n  \n  findAll(filter = {}) {\n    let tasks = [...this.tasks.values()];\n    if (filter.status) {\n      tasks = tasks.filter(t => t.status === filter.status);\n    }\n    return tasks;\n  }\n  \n  findById(id) {\n    return this.tasks.get(id);\n  }\n  \n  update(id, data) {\n    const task = this.tasks.get(id);\n    if (!task) return null;\n    const updated = {...task, ...data, updatedAt: new Date()};\n    this.tasks.set(id, updated);\n    return updated;\n  }\n  \n  delete(id) {\n    return this.tasks.delete(id);\n  }\n}`, explanation: 'In-memory task storage with CRUD operations.' },
      { title: 'Validation', code: `function validateTask(data) {\n  const errors = [];\n  if (!data.title || data.title.length < 3) {\n    errors.push('Title must be at least 3 characters');\n  }\n  if (data.priority && ![1, 2, 3].includes(data.priority)) {\n    errors.push('Priority must be 1, 2, or 3');\n  }\n  if (data.status && !['pending', 'in_progress', 'done'].includes(data.status)) {\n    errors.push('Invalid status');\n  }\n  return errors;\n}`, explanation: 'Validate task data before saving.' }
    ],
    exercise: { description: 'Implement a complete in-memory task store with create, read, update, delete, and list operations. Return operation results.', starterCode: `function solution(operations) {\n  // operations: [{op: 'create'|'read'|'update'|'delete'|'list', id?, data?, filter?}]\n  // Return: array of results for each operation\n}`, hints: ['Use Map for storage', 'Generate IDs', 'list supports filter.status'] },
    tests: [
      { id: 't1', description: 'Create and read', input: [{ op: 'create', data: { title: 'Task 1' } }, { op: 'read', id: '1' }], expectedOutput: [{ id: '1', title: 'Task 1' }, { id: '1', title: 'Task 1' }], isHidden: false },
      { id: 't2', description: 'Update', input: [{ op: 'create', data: { title: 'A' } }, { op: 'update', id: '1', data: { title: 'B' } }, { op: 'read', id: '1' }], expectedOutput: [{ id: '1', title: 'A' }, { id: '1', title: 'B' }, { id: '1', title: 'B' }], isHidden: false },
      { id: 't3', description: 'Delete', input: [{ op: 'create', data: { title: 'X' } }, { op: 'delete', id: '1' }, { op: 'read', id: '1' }], expectedOutput: [{ id: '1', title: 'X' }, true, null], isHidden: false },
      { id: 't4', description: 'List with filter', input: [{ op: 'create', data: { title: 'A', status: 'done' } }, { op: 'create', data: { title: 'B', status: 'pending' } }, { op: 'list', filter: { status: 'done' } }], expectedOutput: [{ id: '1', title: 'A', status: 'done' }, { id: '2', title: 'B', status: 'pending' }, [{ id: '1', title: 'A', status: 'done' }]], isHidden: true },
      { id: 't5', description: 'Read missing', input: [{ op: 'read', id: '999' }], expectedOutput: [null], isHidden: true },
      { id: 't6', description: 'List all', input: [{ op: 'create', data: { title: 'A' } }, { op: 'create', data: { title: 'B' } }, { op: 'list' }], expectedOutput: [{ id: '1', title: 'A' }, { id: '2', title: 'B' }, [{ id: '1', title: 'A' }, { id: '2', title: 'B' }]], isHidden: true }
    ],
    solution: `function solution(operations) {
  const store = new Map();
  let nextId = 1;
  const results = [];
  
  for (const op of operations) {
    switch (op.op) {
      case 'create': {
        const item = {id: String(nextId++), ...op.data};
        store.set(item.id, item);
        results.push(item);
        break;
      }
      case 'read': {
        results.push(store.get(op.id) || null);
        break;
      }
      case 'update': {
        const existing = store.get(op.id);
        if (existing) {
          const updated = {...existing, ...op.data};
          store.set(op.id, updated);
          results.push(updated);
        } else {
          results.push(null);
        }
        break;
      }
      case 'delete': {
        results.push(store.delete(op.id));
        break;
      }
      case 'list': {
        let items = [...store.values()];
        if (op.filter?.status) {
          items = items.filter(i => i.status === op.filter.status);
        }
        results.push(items);
        break;
      }
    }
  }
  return results;
}`
  }
];
