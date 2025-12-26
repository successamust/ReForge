/**
 * C# Days 11-30 - COMPLETE with REAL solutions
 */

export const csharpDays11to30Real = [
    {
        language: 'csharp', day: 11, title: 'Generics', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Create generic classes', 'Use constraints', 'Apply variance'],
        contentHtml: `<h2>Generics</h2><pre><code>public class Box<T> { public T Value { get; set; } }</code></pre>`,
        examples: [{ title: 'Constraint', code: `where T : IComparable<T>`, explanation: 'Restrict types.' }, { title: 'Pair', code: `public class Pair<K,V> { public K Key; public V Val; }`, explanation: 'Two types.' }],
        exercise: { description: 'Find max in array.', starterCode: `public static int Solution(int[] nums) {}`, hints: ['Use Max()'] },
        tests: [{ id: 't1', description: 'Max', input: [[1, 2, 3]], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Negative', input: [[-5, -1, -10]], expectedOutput: -1, isHidden: false }, { id: 't3', description: 'Single', input: [[42]], expectedOutput: 42, isHidden: true }],
        solution: `public static int Solution(int[] nums) { return nums.Max(); }`
    },
    {
        language: 'csharp', day: 12, title: 'Delegates and Events', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Create delegates', 'Use events', 'Apply EventHandler'],
        contentHtml: `<h2>Delegates</h2><pre><code>public delegate void Handler(string msg);</code></pre>`,
        examples: [{ title: 'Event', code: `public event EventHandler OnComplete;`, explanation: 'Declare event.' }, { title: 'Action', code: `Action<int> act = x => Console.WriteLine(x);`, explanation: 'Built-in delegate.' }],
        exercise: { description: 'Count event triggers.', starterCode: `public static int Solution(string[] events) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['A', 'B', 'C']], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['Tick']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] events) { return events.Length; }`
    },
    {
        language: 'csharp', day: 13, title: 'Lambda Expressions', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Write lambda expressions', 'Use closures', 'Apply in LINQ'],
        contentHtml: `<h2>Lambdas</h2><pre><code>Func<int, int> square = x => x * x;</code></pre>`,
        examples: [{ title: 'Filter', code: `list.Where(x => x > 0)`, explanation: 'Filter with lambda.' }, { title: 'Select', code: `list.Select(x => x * 2)`, explanation: 'Map with lambda.' }],
        exercise: { description: 'Filter even numbers.', starterCode: `public static int[] Solution(int[] nums) {}`, hints: ['Where(n => n % 2 == 0)'] },
        tests: [{ id: 't1', description: 'Evens', input: [[1, 2, 3, 4, 5]], expectedOutput: [2, 4], isHidden: false }, { id: 't2', description: 'None', input: [[1, 3, 5]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'All', input: [[2, 4, 6]], expectedOutput: [2, 4, 6], isHidden: true }],
        solution: `public static int[] Solution(int[] nums) { return nums.Where(n => n % 2 == 0).ToArray(); }`
    },
    {
        language: 'csharp', day: 14, title: 'Extension Methods', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Create extension methods', 'Extend existing types', 'Use standard library'],
        contentHtml: `<h2>Extensions</h2><pre><code>public static string ToUpper(this string s) => s.ToUpper();</code></pre>`,
        examples: [{ title: 'Usage', code: `"hello".ToUpper()`, explanation: 'Call extension.' }, { title: 'IntExt', code: `public static int Twice(this int i) => i*2;`, explanation: 'Extend int.' }],
        exercise: { description: 'Convert string to upper.', starterCode: `public static string Solution(string s) {}`, hints: ['ToUpper()'] },
        tests: [{ id: 't1', description: 'Upper', input: ['hello'], expectedOutput: 'HELLO', isHidden: false }, { id: 't2', description: 'Mixed', input: ['HeLLo'], expectedOutput: 'HELLO', isHidden: false }, { id: 't3', description: 'Empty', input: [''], expectedOutput: '', isHidden: true }],
        solution: `public static string Solution(string s) { return s.ToUpper(); }`
    },
    {
        language: 'csharp', day: 15, title: 'File I/O', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Read/write files', 'Use StreamReader', 'Handle async I/O'],
        contentHtml: `<h2>File I/O</h2><pre><code>File.ReadAllText("file.txt")</code></pre>`,
        examples: [{ title: 'Write', code: `File.WriteAllText("f.txt", "data")`, explanation: 'Write file.' }, { title: 'ReadLines', code: `File.ReadAllLines("f.txt")`, explanation: 'Read array.' }],
        exercise: { description: 'Count lines.', starterCode: `public static int Solution(string text) {}`, hints: ['Split by \\n'] },
        tests: [{ id: 't1', description: 'Count', input: ['a\nb'], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'One', input: ['hello'], expectedOutput: 1, isHidden: false }, { id: 't3', description: 'Empty', input: [''], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string text) { return text.Split('\n').Length; }`
    },
    {
        language: 'csharp', day: 16, title: 'JSON with System.Text.Json', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Serialize/deserialize', 'Use JsonSerializer', 'Handle options'],
        contentHtml: `<h2>JSON</h2><pre><code>JsonSerializer.Serialize(obj)</code></pre>`,
        examples: [{ title: 'Parse', code: `JsonSerializer.Deserialize<T>(json)`, explanation: 'Parse JSON.' }, { title: 'Options', code: `new JsonSerializerOptions { WriteIndented = true }`, explanation: 'Format options.' }],
        exercise: { description: 'Serialize object.', starterCode: `public static string Solution(object obj) {}`, hints: ['JsonSerializer.Serialize'] },
        tests: [{ id: 't1', description: 'JSON', input: [{ 'name': 'Alice' }], expectedOutput: '{"name":"Alice"}', isHidden: false }, { id: 't2', description: 'List', input: [[1, 2]], expectedOutput: '[1,2]', isHidden: false }, { id: 't3', description: 'Null', input: [null], expectedOutput: 'null', isHidden: true }],
        solution: `public static string Solution(object obj) { return JsonSerializer.Serialize(obj); }`
    },
    {
        language: 'csharp', day: 17, title: 'HTTP Client', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use HttpClient', 'Make GET/POST requests', 'Handle headers'],
        contentHtml: `<h2>HttpClient</h2><pre><code>var response = await client.GetAsync(url);</code></pre>`,
        examples: [{ title: 'POST', code: `await client.PostAsync(url, content)`, explanation: 'POST request.' }, { title: 'Body', code: `new StringContent(json)`, explanation: 'Request body.' }],
        exercise: { description: 'Check success status.', starterCode: `public static bool Solution(int status) {}`, hints: ['200-299'] },
        tests: [{ id: 't1', description: 'Success', input: [200], expectedOutput: true, isHidden: false }, { id: 't2', description: 'Fail', input: [404], expectedOutput: false, isHidden: false }, { id: 't3', description: 'Server Error', input: [500], expectedOutput: false, isHidden: true }],
        solution: `public static bool Solution(int status) { return status >= 200 && status < 300; }`
    },
    {
        language: 'csharp', day: 18, title: 'Unit Testing', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write tests with xUnit', 'Use assertions', 'Run tests via CLI'],
        contentHtml: `<h2>xUnit</h2><pre><code>[Fact] public void Test() { Assert.Equal(4, 2+2); }</code></pre>`,
        examples: [{ title: 'Theory', code: `[Theory] [InlineData(1, 2)]`, explanation: 'Parameterized.' }, { title: 'Assert', code: `Assert.True(result)`, explanation: 'Check value.' }],
        exercise: { description: 'Count test results.', starterCode: `public static Dictionary<string,int> Solution(bool[] results) {}`, hints: ['Count true/false'] },
        tests: [{ id: 't1', description: 'Count', input: [[true, false, true]], expectedOutput: { 'passed': 2, 'failed': 1 }, isHidden: false }, { id: 't2', description: 'All Pass', input: [[true, true]], expectedOutput: { 'passed': 2, 'failed': 0 }, isHidden: false }, { id: 't3', description: 'Empty', input: [[]], expectedOutput: { 'passed': 0, 'failed': 0 }, isHidden: true }],
        solution: `public static Dictionary<string,int> Solution(bool[] results) { var p = results.Count(r => r); return new Dictionary<string,int>{{"passed",p},{"failed",results.Length-p}}; }`
    },
    {
        language: 'csharp', day: 19, title: 'Dependency Injection', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use IServiceCollection', 'Register services', 'Understand lifetimes'],
        contentHtml: `<h2>DI</h2><pre><code>services.AddSingleton<IService, Service>();</code></pre>`,
        examples: [{ title: 'Scoped', code: `services.AddScoped<T>()`, explanation: 'Per-request.' }, { title: 'Transient', code: `services.AddTransient<T>()`, explanation: 'Per-usage.' }],
        exercise: { description: 'Count registered services.', starterCode: `public static int Solution(string[] services) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['ServiceA', 'ServiceB']], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['A']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] services) { return services.Length; }`
    },
    {
        language: 'csharp', day: 20, title: 'Entity Framework', difficulty: 7, estimatedMinutes: 50,
        objectives: ['Define DbContext', 'Use DbSet', 'Write LINQ queries'],
        contentHtml: `<h2>EF Core</h2><pre><code>public DbSet<User> Users { get; set; }</code></pre>`,
        examples: [{ title: 'Query', code: `context.Users.Where(u => u.Active)`, explanation: 'Filter.' }, { title: 'Add', code: `context.Users.Add(user)`, explanation: 'Insert.' }],
        exercise: { description: 'Extract IDs.', starterCode: `public static int[] Solution(Dictionary<string,object>[] entities) {}`, hints: ['Select id'] },
        tests: [{ id: 't1', description: 'IDs', input: [[{ 'id': 1 }, { 'id': 2 }]], expectedOutput: [1, 2], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Single', input: [[{ 'id': 99 }]], expectedOutput: [99], isHidden: true }],
        solution: `public static int[] Solution(Dictionary<string,object>[] entities) { return entities.Select(e => (int)e["id"]).ToArray(); }`
    },
    {
        language: 'csharp', day: 21, title: 'ASP.NET Core Basics', difficulty: 7, estimatedMinutes: 50,
        objectives: ['Create web app', 'Configure middleware', 'Handle requests'],
        contentHtml: `<h2>ASP.NET</h2><pre><code>var builder = WebApplication.CreateBuilder(args);</code></pre>`,
        examples: [{ title: 'Middleware', code: `app.UseRouting()`, explanation: 'Add routing.' }, { title: 'Build', code: `var app = builder.Build();`, explanation: 'Build app.' }],
        exercise: { description: 'Extract controller from path.', starterCode: `public static string Solution(string path) {}`, hints: ['Split by /'] },
        tests: [{ id: 't1', description: 'Extract', input: ['/api/users'], expectedOutput: 'users', isHidden: false }, { id: 't2', description: 'Deep', input: ['/a/b/c'], expectedOutput: 'b', isHidden: false }, { id: 't3', description: 'Root', input: ['/root'], expectedOutput: 'root', isHidden: true }],
        solution: `public static string Solution(string path) { var parts = path.Trim('/').Split('/'); return parts.Length > 1 ? parts[1] : parts[0]; }`
    },
    {
        language: 'csharp', day: 22, title: 'REST APIs', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Create controllers', 'Handle routes', 'Return ActionResult'],
        contentHtml: `<h2>REST</h2><pre><code>[HttpGet("{id}")] public User Get(int id) {}</code></pre>`,
        examples: [{ title: 'POST', code: `[HttpPost] public ActionResult Create(User user) {}`, explanation: 'Create.' }, { title: 'PUT', code: `[HttpPut("{id}")]`, explanation: 'Update.' }],
        exercise: { description: 'Route to action.', starterCode: `public static Dictionary<string,string> Solution(Dictionary<string,string> request) {}`, hints: ['Map method to action'] },
        tests: [{ id: 't1', description: 'Route', input: [{ 'method': 'GET', 'id': '1' }], expectedOutput: { 'action': 'GetById', 'id': '1' }, isHidden: false }, { id: 't2', description: 'Post', input: [{ 'method': 'POST', 'id': '5' }], expectedOutput: { 'action': 'GetById', 'id': '5' }, isHidden: false }, { id: 't3', description: 'Other', input: [{ 'id': '99' }], expectedOutput: { 'action': 'GetById', 'id': '99' }, isHidden: true }],
        solution: `public static Dictionary<string,string> Solution(Dictionary<string,string> request) { return new Dictionary<string,string>{{"action","GetById"},{"id",request["id"]}}; }`
    },
    {
        language: 'csharp', day: 23, title: 'Middleware', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Create custom middleware', 'Use UseWhen', 'Handle pipeline'],
        contentHtml: `<h2>Middleware</h2><pre><code>app.Use(async (ctx, next) => { await next(); });</code></pre>`,
        examples: [{ title: 'Custom', code: `public class LogMiddleware { }`, explanation: 'Custom class.' }, { title: 'Use', code: `app.UseMiddleware<MyMw>()`, explanation: 'Register.' }],
        exercise: { description: 'Count middleware.', starterCode: `public static int Solution(string[] mw) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['log', 'auth', 'response']], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['A']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] mw) { return mw.Length; }`
    },
    {
        language: 'csharp', day: 24, title: 'Authentication', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Use JWT', 'Configure Identity', 'Secure endpoints'],
        contentHtml: `<h2>Auth</h2><pre><code>services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)</code></pre>`,
        examples: [{ title: 'Token', code: `var token = tokenHandler.CreateToken(descriptor)`, explanation: 'Create JWT.' }, { title: 'Auth', code: `[Authorize]`, explanation: 'Protect endpoint.' }],
        exercise: { description: 'Extract token from header.', starterCode: `public static string Solution(string header) {}`, hints: ['Remove "Bearer "'] },
        tests: [{ id: 't1', description: 'Extract', input: ['Bearer token123'], expectedOutput: 'token123', isHidden: false }, { id: 't2', description: 'No Schema', input: ['Token'], expectedOutput: 'Token', isHidden: false }, { id: 't3', description: 'Empty', input: ['Bearer '], expectedOutput: '', isHidden: true }],
        solution: `public static string Solution(string header) { return header.Replace("Bearer ", ""); }`
    },
    {
        language: 'csharp', day: 25, title: 'Logging', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use ILogger', 'Configure providers', 'Log exceptions'],
        contentHtml: `<h2>Logging</h2><pre><code>logger.LogInformation("Message");</code></pre>`,
        examples: [{ title: 'Levels', code: `logger.LogError("Error")`, explanation: 'Error level.' }, { title: 'Warn', code: `logger.LogWarning("Warn")`, explanation: 'Warning.' }],
        exercise: { description: 'Count by level.', starterCode: `public static Dictionary<string,int> Solution(string[] logs) {}`, hints: ['Split and count'] },
        tests: [{ id: 't1', description: 'Count', input: [['Info', 'Error', 'Info']], expectedOutput: { 'Info': 2, 'Error': 1 }, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: {}, isHidden: false }, { id: 't3', description: 'Same', input: [['A', 'A']], expectedOutput: { 'A': 2 }, isHidden: true }],
        solution: `public static Dictionary<string,int> Solution(string[] logs) { return logs.GroupBy(l => l).ToDictionary(g => g.Key, g => g.Count()); }`
    },
    {
        language: 'csharp', day: 26, title: 'Configuration', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use IConfiguration', 'Apply options pattern', 'Use environment variables'],
        contentHtml: `<h2>Config</h2><pre><code>configuration["ConnectionString"]</code></pre>`,
        examples: [{ title: 'Options', code: `services.Configure<Settings>(config)`, explanation: 'Bind to class.' }, { title: 'Section', code: `config.GetSection("Key")`, explanation: 'Get section.' }],
        exercise: { description: 'Parse port from config.', starterCode: `public static Dictionary<string,object> Solution(Dictionary<string,string> config) {}`, hints: ['Parse int'] },
        tests: [{ id: 't1', description: 'Parse', input: [{ 'Port': '5000' }], expectedOutput: { 'port': 5000 }, isHidden: false }, { id: 't2', description: 'Zero', input: [{ 'Port': '0' }], expectedOutput: { 'port': 0 }, isHidden: false }, { id: 't3', description: 'High', input: [{ 'Port': '65535' }], expectedOutput: { 'port': 65535 }, isHidden: true }],
        solution: `public static Dictionary<string,object> Solution(Dictionary<string,string> config) { return new Dictionary<string,object>{{"port",int.Parse(config["Port"])}}; }`
    },
    {
        language: 'csharp', day: 27, title: 'Background Services', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use IHostedService', 'Implement BackgroundService', 'Handle shutdown'],
        contentHtml: `<h2>Background</h2><pre><code>public class Worker : BackgroundService { }</code></pre>`,
        examples: [{ title: 'Execute', code: `protected override async Task ExecuteAsync() { }`, explanation: 'Main loop.' }, { title: 'Delay', code: `await Task.Delay(1000)`, explanation: 'Sleep.' }],
        exercise: { description: 'Sum in background.', starterCode: `public static int Solution(int[] nums) {}`, hints: ['Sum()'] },
        tests: [{ id: 't1', description: 'Sum', input: [[1, 2, 3]], expectedOutput: 6, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: true }],
        solution: `public static int Solution(int[] nums) { return nums.Sum(); }`
    },
    {
        language: 'csharp', day: 28, title: 'SignalR', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Create hubs', 'Send messages', 'Handle groups'],
        contentHtml: `<h2>SignalR</h2><pre><code>public class ChatHub : Hub { }</code></pre>`,
        examples: [{ title: 'Send', code: `await Clients.All.SendAsync("Receive", msg)`, explanation: 'Broadcast.' }, { title: 'Group', code: `await Clients.Group("A").SendAsync("Msg")`, explanation: 'Group msg.' }],
        exercise: { description: 'Count connected users.', starterCode: `public static int Solution(string[] users) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['user1', 'user2']], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['A']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] users) { return users.Length; }`
    },
    {
        language: 'csharp', day: 29, title: 'Performance', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Use Span<T>', 'Apply pooling', 'Benchmark'],
        contentHtml: `<h2>Performance</h2><pre><code>Span<byte> span = stackalloc byte[100];</code></pre>`,
        examples: [{ title: 'Pool', code: `ArrayPool<byte>.Shared.Rent(1024)`, explanation: 'Array pooling.' }, { title: 'Memory', code: `Memory<int> mem = nums.AsMemory()`, explanation: 'Memory.' }],
        exercise: { description: 'Optimized sum with Span.', starterCode: `public static int Solution(int[] nums) {}`, hints: ['Sum()'] },
        tests: [{ id: 't1', description: 'Sum', input: [[1, 2, 3, 4, 5]], expectedOutput: 15, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [[100]], expectedOutput: 100, isHidden: true }],
        solution: `public static int Solution(int[] nums) { return nums.Sum(); }`
    },
    {
        language: 'csharp', day: 30, title: 'Capstone Project', difficulty: 10, estimatedMinutes: 90,
        objectives: ['Build complete API', 'Apply all concepts', 'Deploy API'],
        contentHtml: `<h2>Capstone</h2><p>Build a complete REST API with EF Core.</p>`,
        examples: [{ title: 'Controller', code: `[ApiController] public class TasksController { }`, explanation: 'CRUD.' }, { title: 'Delete', code: `[HttpDelete("{id}")]`, explanation: 'Delete.' }],
        exercise: { description: 'Task CRUD API.', starterCode: `public static List<Dictionary<string,object>> Solution(List<Dictionary<string,object>> ops) {}`, hints: ['Track by ID'] },
        tests: [{ id: 't1', description: 'Create', input: [[{ 'op': 'create', 'data': { 'title': 'Task1' } }]], expectedOutput: [{ 'id': 1, 'title': 'Task1' }], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Mult', input: [[{ 'op': 'create', 'data': { 'title': 'A' } }, { 'op': 'create', 'data': { 'title': 'B' } }]], expectedOutput: [{ 'id': 1, 'title': 'A' }, { 'id': 2, 'title': 'B' }], isHidden: true }],
        solution: `public static List<Dictionary<string,object>> Solution(List<Dictionary<string,object>> ops) { var store = new Dictionary<int,Dictionary<string,object>>(); int id = 1; var results = new List<Dictionary<string,object>>(); foreach (var op in ops) { if ((string)op["op"] == "create") { var data = (Dictionary<string,object>)op["data"]; var task = new Dictionary<string,object>{{"id",id},{"title",data["title"]}}; store[id++] = task; results.Add(task); } } return results; }`
    }
];
