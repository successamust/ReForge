/**
 * C# Days 11-30 - COMPLETE with REAL solutions
 */

export const csharpDays11to30Real = [
    {
        language: 'csharp', day: 11, title: 'Generics', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Create generic classes', 'Use constraints', 'Apply variance'],
        contentHtml: `<h2>Generics in C#</h2>
<p>Generics introduce the concept of type parameters to .NET, allowing you to design classes and methods that defer the specification of one or more types.</p>

<h3>Generic Classes</h3>
<pre><code>public class Box&lt;T&gt; {
    private T _value;
    
    public Box(T value) {
        _value = value;
    }
    
    public T GetValue() { return _value; }
}</code></pre>

<h3>Constraints</h3>
<p>You can restrict what types can be used as arguments.</p>
<pre><code>public class Repository&lt;T&gt; where T : class, new() {
    public T Create() { return new T(); }
}</code></pre>`,
        examples: [{ title: 'Constraint', code: `where T : IComparable<T>`, explanation: 'Restrict types.' }, { title: 'Pair', code: `public class Pair<K,V> { public K Key; public V Val; }`, explanation: 'Two types.' }],
        exercise: { description: 'Find max in array.', starterCode: `public static int Solution(int[] nums) {}`, hints: ['Use Max()'] },
        tests: [{ id: 't1', description: 'Max', input: [[1, 2, 3]], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Negative', input: [[-5, -1, -10]], expectedOutput: -1, isHidden: false }, { id: 't3', description: 'Single', input: [[42]], expectedOutput: 42, isHidden: true }],
        solution: `public static int Solution(int[] nums) { return nums.Max(); }`
    },
    {
        language: 'csharp', day: 12, title: 'Delegates and Events', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Create delegates', 'Use events', 'Apply EventHandler'],
        contentHtml: `<h2>Delegates and Events</h2>
<p>A delegate is a type that represents references to methods with a particular parameter list and return type.</p>

<h3>Delegates</h3>
<pre><code>public delegate int Operation(int x, int y);

public int Add(int x, int y) => x + y;

Operation op = Add;
int result = op(2, 3); // 5</code></pre>

<h3>Events</h3>
<p>Events enable a class or object to notify other classes or objects when something of interest occurs.</p>
<pre><code>public class Alarm {
    public event EventHandler OnRing;

    public void Ring() {
        OnRing?.Invoke(this, EventArgs.Empty);
    }
}</code></pre>`,
        examples: [{ title: 'Event', code: `public event EventHandler OnComplete;`, explanation: 'Declare event.' }, { title: 'Action', code: `Action<int> act = x => Console.WriteLine(x);`, explanation: 'Built-in delegate.' }],
        exercise: { description: 'Count event triggers.', starterCode: `public static int Solution(string[] events) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['A', 'B', 'C']], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['Tick']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] events) { return events.Length; }`
    },
    {
        language: 'csharp', day: 13, title: 'Lambda Expressions', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Write lambda expressions', 'Use closures', 'Apply in LINQ'],
        contentHtml: `<h2>Lambda Expressions</h2>
<p>A lambda expression is an anonymous function that you can use to create delegates or expression tree types.</p>

<h3>Syntax</h3>
<pre><code>(input-parameters) => expression</code></pre>

<h3>Func and Action</h3>
<p>.NET provides built-in generic delegates:</p>
<ul>
  <li><code>Action&lt;T&gt;</code>: Returns void.</li>
  <li><code>Func&lt;T, Result&gt;</code>: Returns generic Result.</li>
</ul>

<pre><code>Func&lt;int, int&gt; square = x => x * x;
Action&lt;string&gt; greet = name => Console.WriteLine($"Hello {name}");

Console.WriteLine(square(5)); // 25
greet("Alice");</code></pre>`,
        examples: [{ title: 'Filter', code: `list.Where(x => x > 0)`, explanation: 'Filter with lambda.' }, { title: 'Select', code: `list.Select(x => x * 2)`, explanation: 'Map with lambda.' }],
        exercise: { description: 'Filter even numbers.', starterCode: `public static int[] Solution(int[] nums) {}`, hints: ['Where(n => n % 2 == 0)'] },
        tests: [{ id: 't1', description: 'Evens', input: [[1, 2, 3, 4, 5]], expectedOutput: [2, 4], isHidden: false }, { id: 't2', description: 'None', input: [[1, 3, 5]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'All', input: [[2, 4, 6]], expectedOutput: [2, 4, 6], isHidden: true }],
        solution: `public static int[] Solution(int[] nums) { return nums.Where(n => n % 2 == 0).ToArray(); }`
    },
    {
        language: 'csharp', day: 14, title: 'Extension Methods', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Create extension methods', 'Extend existing types', 'Use standard library'],
        contentHtml: `<h2>Extension Methods</h2>
<p>Extension methods allow you to "add" methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type.</p>

<h3>Defining Extension Methods</h3>
<p>They must be static methods in a static class, using the <code>this</code> keyword on the first parameter.</p>
<pre><code>public static class StringExtensions {
    public static int WordCount(this string str) {
        return str.Split(new char[] { ' ', '.', '?' }, 
                         StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

// Usage
string s = "Hello world";
int i = s.WordCount(); // 2</code></pre>`,
        examples: [{ title: 'Usage', code: `"hello".ToUpper()`, explanation: 'Call extension.' }, { title: 'IntExt', code: `public static int Twice(this int i) => i*2;`, explanation: 'Extend int.' }],
        exercise: { description: 'Convert string to upper.', starterCode: `public static string Solution(string s) {}`, hints: ['ToUpper()'] },
        tests: [{ id: 't1', description: 'Upper', input: ['hello'], expectedOutput: 'HELLO', isHidden: false }, { id: 't2', description: 'Mixed', input: ['HeLLo'], expectedOutput: 'HELLO', isHidden: false }, { id: 't3', description: 'Empty', input: [''], expectedOutput: '', isHidden: true }],
        solution: `public static string Solution(string s) { return s.ToUpper(); }`
    },
    {
        language: 'csharp', day: 15, title: 'File I/O', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Read/write files', 'Use StreamReader', 'Handle async I/O'],
        contentHtml: `<h2>File I/O in C#</h2>
<p>The <code>System.IO</code> namespace contains types that allow reading and writing to files and data streams.</p>

<h3>Reading Files</h3>
<pre><code>// Read all text
string text = File.ReadAllText("data.txt");

// Read lines
string[] lines = File.ReadAllLines("data.txt");

// StreamReader (efficient for large files)
using (StreamReader sr = new StreamReader("data.txt")) {
    string line;
    while ((line = sr.ReadLine()) != null) {
        Console.WriteLine(line);
    }
}</code></pre>

<h3>Writing Files</h3>
<pre><code>File.WriteAllText("out.txt", "Hello World");

using (StreamWriter sw = new StreamWriter("log.txt", true)) {
    sw.WriteLine("Append this line");
}</code></pre>`,
        examples: [{ title: 'Write', code: `File.WriteAllText("f.txt", "data")`, explanation: 'Write file.' }, { title: 'ReadLines', code: `File.ReadAllLines("f.txt")`, explanation: 'Read array.' }],
        exercise: { description: 'Count lines.', starterCode: `public static int Solution(string text) {}`, hints: ['Split by \\n'] },
        tests: [{ id: 't1', description: 'Count', input: ['a\nb'], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'One', input: ['hello'], expectedOutput: 1, isHidden: false }, { id: 't3', description: 'Empty', input: [''], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string text) { return text.Split('\n').Length; }`
    },
    {
        language: 'csharp', day: 16, title: 'JSON with System.Text.Json', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Serialize/deserialize', 'Use JsonSerializer', 'Handle options'],
        contentHtml: `<h2>JSON with System.Text.Json</h2>
<p>System.Text.Json is the modern, high-performance JSON library built into .NET.</p>

<h3>Serialization</h3>
<pre><code>using System.Text.Json;

var person = new Person { Name = "Alice", Age = 30 };
string json = JsonSerializer.Serialize(person);</code></pre>

<h3>Deserialization</h3>
<pre><code>string json = "{\"Name\":\"Alice\",\"Age\":30}";
Person person = JsonSerializer.Deserialize&lt;Person&gt;(json);</code></pre>

<h3>Configuration</h3>
<p>Use <code>JsonSerializerOptions</code> to control behavior, like case insensitivity.</p>
<pre><code>var options = new JsonSerializerOptions {
    PropertyNameCaseInsensitive = true,
    WriteIndented = true
};</code></pre>`,
        examples: [{ title: 'Parse', code: `JsonSerializer.Deserialize<T>(json)`, explanation: 'Parse JSON.' }, { title: 'Options', code: `new JsonSerializerOptions { WriteIndented = true }`, explanation: 'Format options.' }],
        exercise: { description: 'Serialize object.', starterCode: `public static string Solution(object obj) {}`, hints: ['JsonSerializer.Serialize'] },
        tests: [{ id: 't1', description: 'JSON', input: [{ 'name': 'Alice' }], expectedOutput: '{"name":"Alice"}', isHidden: false }, { id: 't2', description: 'List', input: [[1, 2]], expectedOutput: '[1,2]', isHidden: false }, { id: 't3', description: 'Null', input: [null], expectedOutput: 'null', isHidden: true }],
        solution: `public static string Solution(object obj) { return JsonSerializer.Serialize(obj); }`
    },
    {
        language: 'csharp', day: 17, title: 'HTTP Client', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use HttpClient', 'Make GET/POST requests', 'Handle headers'],
        contentHtml: `<h2>HTTP Client</h2>
<p>The <code>HttpClient</code> class provides a base class for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.</p>

<h3>Basic GET Request</h3>
<pre><code>using HttpClient client = new HttpClient();
string response = await client.GetStringAsync("https://api.example.com/data");</code></pre>

<h3>Using Filter (IHttpClientFactory)</h3>
<p>In production apps, use <code>IHttpClientFactory</code> to manage client lifecycles and avoid socket exhaustion.</p>
<pre><code>// In Startup/Program.cs
services.AddHttpClient();

// In Service
public class MyService {
    private readonly HttpClient _client;
    public MyService(IHttpClientFactory factory) {
        _client = factory.CreateClient();
    }
}</code></pre>`,
        examples: [{ title: 'POST', code: `await client.PostAsync(url, content)`, explanation: 'POST request.' }, { title: 'Body', code: `new StringContent(json)`, explanation: 'Request body.' }],
        exercise: { description: 'Check success status.', starterCode: `public static bool Solution(int status) {}`, hints: ['200-299'] },
        tests: [{ id: 't1', description: 'Success', input: [200], expectedOutput: true, isHidden: false }, { id: 't2', description: 'Fail', input: [404], expectedOutput: false, isHidden: false }, { id: 't3', description: 'Server Error', input: [500], expectedOutput: false, isHidden: true }],
        solution: `public static bool Solution(int status) { return status >= 200 && status < 300; }`
    },
    {
        language: 'csharp', day: 18, title: 'Unit Testing', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write tests with xUnit', 'Use assertions', 'Run tests via CLI'],
        contentHtml: `<h2>Unit Testing with xUnit</h2>
<p>xUnit is the premier unit testing tool for .NET Core.</p>

<h3>Writing Tests</h3>
<ul>
    <li><code>[Fact]</code>: Use for tests that maintain invariant conditions.</li>
    <li><code>[Theory]</code>: Use for tests that are true only for a particular set of data (parameterized).</li>
</ul>

<pre><code>public class CalculatorTests {
    [Fact]
    public void Add_ShouldReturnSum() {
        var calc = new Calculator();
        int result = calc.Add(2, 3);
        Assert.Equal(5, result);
    }
    
    [Theory]
    [InlineData(2, 2, 4)]
    [InlineData(5, 5, 10)]
    public void Add_Theory(int a, int b, int expected) {
        Assert.Equal(expected, new Calculator().Add(a, b));
    }
}</code></pre>`,
        examples: [{ title: 'Theory', code: `[Theory] [InlineData(1, 2)]`, explanation: 'Parameterized.' }, { title: 'Assert', code: `Assert.True(result)`, explanation: 'Check value.' }],
        exercise: { description: 'Count test results.', starterCode: `public static Dictionary<string,int> Solution(bool[] results) {}`, hints: ['Count true/false'] },
        tests: [{ id: 't1', description: 'Count', input: [[true, false, true]], expectedOutput: { 'passed': 2, 'failed': 1 }, isHidden: false }, { id: 't2', description: 'All Pass', input: [[true, true]], expectedOutput: { 'passed': 2, 'failed': 0 }, isHidden: false }, { id: 't3', description: 'Empty', input: [[]], expectedOutput: { 'passed': 0, 'failed': 0 }, isHidden: true }],
        solution: `public static Dictionary<string,int> Solution(bool[] results) { var p = results.Count(r => r); return new Dictionary<string,int>{{"passed",p},{"failed",results.Length-p}}; }`
    },
    {
        language: 'csharp', day: 19, title: 'Dependency Injection', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use IServiceCollection', 'Register services', 'Understand lifetimes'],
        contentHtml: `<h2>Dependency Injection</h2>
<p>ASP.NET Core supports the dependency injection (DI) software design pattern, which is a technique for achieving Inversion of Control (IoC).</p>

<h3>Service Lifetimes</h3>
<ul>
  <li><strong>Transient:</strong> Created each time they are requested.</li>
  <li><strong>Scoped:</strong> Created once per client request (connection).</li>
  <li><strong>Singleton:</strong> Created the first time they are requested (or when instance specified).</li>
</ul>

<h3>Registration</h3>
<pre><code>var builder = WebApplication.CreateBuilder(args);
builder.Services.AddTransient&lt;IMyService, MyService&gt;();
builder.Services.AddScoped&lt;IUserContext, UserContext&gt;();
builder.Services.AddSingleton&lt;ICache, MemoryCache&gt;();</code></pre>`,
        examples: [{ title: 'Scoped', code: `services.AddScoped<T>()`, explanation: 'Per-request.' }, { title: 'Transient', code: `services.AddTransient<T>()`, explanation: 'Per-usage.' }],
        exercise: { description: 'Count registered services.', starterCode: `public static int Solution(string[] services) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['ServiceA', 'ServiceB']], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['A']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] services) { return services.Length; }`
    },
    {
        language: 'csharp', day: 20, title: 'Entity Framework', difficulty: 7, estimatedMinutes: 50,
        objectives: ['Define DbContext', 'Use DbSet', 'Write LINQ queries'],
        contentHtml: `<h2>Entity Framework Core</h2>
<p>EF Core is a lightweight, extensible, open source and cross-platform version of the popular Entity Framework data access technology.</p>

<h3>Defining the DbContext</h3>
<pre><code>public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions&lt;AppDbContext&gt; options) : base(options) { }
    
    public DbSet&lt;User&gt; Users { get; set; }
}

public class User {
    public int Id { get; set; }
    public string Name { get; set; }
}</code></pre>

<h3>Basic Usage</h3>
<pre><code>// Create
context.Users.Add(new User { Name = "Alice" });
await context.SaveChangesAsync();

// Read
var user = await context.Users.FindAsync(1);

// Query with LINQ
var active = await context.Users.Where(u => u.IsActive).ToListAsync();</code></pre>`,
        examples: [{ title: 'Query', code: `context.Users.Where(u => u.Active)`, explanation: 'Filter.' }, { title: 'Add', code: `context.Users.Add(user)`, explanation: 'Insert.' }],
        exercise: { description: 'Extract IDs.', starterCode: `public static int[] Solution(Dictionary<string,object>[] entities) {}`, hints: ['Select id'] },
        tests: [{ id: 't1', description: 'IDs', input: [[{ 'id': 1 }, { 'id': 2 }]], expectedOutput: [1, 2], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Single', input: [[{ 'id': 99 }]], expectedOutput: [99], isHidden: true }],
        solution: `public static int[] Solution(Dictionary<string,object>[] entities) { return entities.Select(e => (int)e["id"]).ToArray(); }`
    },
    {
        language: 'csharp', day: 21, title: 'ASP.NET Core Basics', difficulty: 7, estimatedMinutes: 50,
        objectives: ['Create web app', 'Configure middleware', 'Handle requests'],
        contentHtml: `<h2>ASP.NET Core Basics</h2>
<p>ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, Internet-connected applications.</p>

<h3>Program.cs</h3>
<p>The entry point for the application. It builds the host, configures services, and the request handling pipeline.</p>
<pre><code>var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();</code></pre>`,
        examples: [{ title: 'Middleware', code: `app.UseRouting()`, explanation: 'Add routing.' }, { title: 'Build', code: `var app = builder.Build();`, explanation: 'Build app.' }],
        exercise: { description: 'Extract controller from path.', starterCode: `public static string Solution(string path) {}`, hints: ['Split by /'] },
        tests: [{ id: 't1', description: 'Extract', input: ['/v1/users'], expectedOutput: 'users', isHidden: false }, { id: 't2', description: 'Deep', input: ['/a/b/c'], expectedOutput: 'b', isHidden: false }, { id: 't3', description: 'Root', input: ['/root'], expectedOutput: 'root', isHidden: true }],
        solution: `public static string Solution(string path) { var parts = path.Trim('/').Split('/'); return parts.Length > 1 ? parts[1] : parts[0]; }`
    },
    {
        language: 'csharp', day: 22, title: 'REST APIs', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Create controllers', 'Handle routes', 'Return ActionResult'],
        contentHtml: `<h2>REST APIs with ASP.NET Core</h2>
<p>Controllers are responsible for handling incoming requests and returning responses to the client.</p>

<h3>ApiController Attribute</h3>
<p>The <code>[ApiController]</code> attribute enables opinionated API behaviors like automatic HTTP 400 responses on validation errors.</p>
<pre><code>[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase {
    
    [HttpGet]
    public ActionResult&lt;IEnumerable&lt;string&gt;&gt; Get() {
        return new string[] { "value1", "value2" };
    }

    [HttpGet("{id}")]
    public ActionResult&lt;string&gt; Get(int id) {
        if (id == 0) return NotFound();
        return "value";
    }
}</code></pre>`,
        examples: [{ title: 'POST', code: `[HttpPost] public ActionResult Create(User user) {}`, explanation: 'Create.' }, { title: 'PUT', code: `[HttpPut("{id}")]`, explanation: 'Update.' }],
        exercise: { description: 'Route to action.', starterCode: `public static Dictionary<string,string> Solution(Dictionary<string,string> request) {}`, hints: ['Map method to action'] },
        tests: [{ id: 't1', description: 'Route', input: [{ 'method': 'GET', 'id': '1' }], expectedOutput: { 'action': 'GetById', 'id': '1' }, isHidden: false }, { id: 't2', description: 'Post', input: [{ 'method': 'POST', 'id': '5' }], expectedOutput: { 'action': 'GetById', 'id': '5' }, isHidden: false }, { id: 't3', description: 'Other', input: [{ 'id': '99' }], expectedOutput: { 'action': 'GetById', 'id': '99' }, isHidden: true }],
        solution: `public static Dictionary<string,string> Solution(Dictionary<string,string> request) { return new Dictionary<string,string>{{"action","GetById"},{"id",request["id"]}}; }`
    },
    {
        language: 'csharp', day: 23, title: 'Middleware', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Create custom middleware', 'Use UseWhen', 'Handle pipeline'],
        contentHtml: `<h2>Middleware in ASP.NET Core</h2>
<p>Middleware are software components that are assembled into an application pipeline to handle requests and responses.</p>

<h3>Custom Middleware</h3>
<pre><code>public class RequestLoggingMiddleware {
    private readonly RequestDelegate _next;

    public RequestLoggingMiddleware(RequestDelegate next) {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context) {
        // Logic before next delegate
        Console.WriteLine($"Request: {context.Request.Path}");

        await _next(context);

        // Logic after next delegate
    }
}

// Registration in Program.cs
app.UseMiddleware&lt;RequestLoggingMiddleware&gt;();</code></pre>`,
        examples: [{ title: 'Custom', code: `public class LogMiddleware { }`, explanation: 'Custom class.' }, { title: 'Use', code: `app.UseMiddleware<MyMw>()`, explanation: 'Register.' }],
        exercise: { description: 'Count middleware.', starterCode: `public static int Solution(string[] mw) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['log', 'auth', 'response']], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['A']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] mw) { return mw.Length; }`
    },
    {
        language: 'csharp', day: 24, title: 'Authentication', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Use JWT', 'Configure Identity', 'Secure endpoints'],
        contentHtml: `<h2>Authentication in ASP.NET Core</h2>
<p>Authentication is the process of determining a user's identity. ASP.NET Core supports various authentication mechanisms, with JWT (JSON Web Tokens) being a common choice for APIs.</p>

<h3>JWT Authentication</h3>
<p>JWTs are stateless, self-contained tokens used to securely transmit information between parties.</p>

<pre><code>// 1. Configure services in Program.cs
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "your-issuer",
        ValidAudience = "your-audience",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret-key"))
    };
});

// 2. Enable middleware
app.UseAuthentication();
app.UseAuthorization();

// 3. Protect endpoints
[Authorize]
[HttpGet("secure")]
public IActionResult SecureEndpoint()
{
    return Ok("This is secure");
}</code></pre>

<h3>Generating Logic</h3>
<pre><code>var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.ASCII.GetBytes("secret-key");
var tokenDescriptor = new SecurityTokenDescriptor
{
    Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
    Expires = DateTime.UtcNow.AddDays(7),
    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
};
var token = tokenHandler.CreateToken(tokenDescriptor);
var tokenString = tokenHandler.WriteToken(token);</code></pre>`,
        examples: [{ title: 'Token', code: `var token = tokenHandler.CreateToken(descriptor)`, explanation: 'Create JWT.' }, { title: 'Auth', code: `[Authorize]`, explanation: 'Protect endpoint.' }],
        exercise: { description: 'Extract token from header.', starterCode: `public static string Solution(string header) {}`, hints: ['Remove "Bearer "'] },
        tests: [{ id: 't1', description: 'Extract', input: ['Bearer token123'], expectedOutput: 'token123', isHidden: false }, { id: 't2', description: 'No Schema', input: ['Token'], expectedOutput: 'Token', isHidden: false }, { id: 't3', description: 'Empty', input: ['Bearer '], expectedOutput: '', isHidden: true }],
        solution: `public static string Solution(string header) { return header.Replace("Bearer ", ""); }`
    },
    {
        language: 'csharp', day: 25, title: 'Logging', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use ILogger', 'Configure providers', 'Log exceptions'],
        contentHtml: `<h2>Logging in ASP.NET Core</h2>
<p>ASP.NET Core supports a logging API that works with a variety of built-in and third-party logging providers.</p>

<h3>ILogger</h3>
<pre><code>public class HomeController : Controller {
    private readonly ILogger&lt;HomeController&gt; _logger;

    public HomeController(ILogger&lt;HomeController&gt; logger) {
        _logger = logger;
    }

    public IActionResult Index() {
        _logger.LogInformation("Index page visited at {Time}", DateTime.UtcNow);
        return View();
    }
}</code></pre>

<h3>Log Levels</h3>
<ul>
    <li>Trace, Debug, Information, Warning, Error, Critical</li>
</ul>`,
        examples: [{ title: 'Levels', code: `logger.LogError("Error")`, explanation: 'Error level.' }, { title: 'Warn', code: `logger.LogWarning("Warn")`, explanation: 'Warning.' }],
        exercise: { description: 'Count by level.', starterCode: `public static Dictionary<string,int> Solution(string[] logs) {}`, hints: ['Split and count'] },
        tests: [{ id: 't1', description: 'Count', input: [['Info', 'Error', 'Info']], expectedOutput: { 'Info': 2, 'Error': 1 }, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: {}, isHidden: false }, { id: 't3', description: 'Same', input: [['A', 'A']], expectedOutput: { 'A': 2 }, isHidden: true }],
        solution: `public static Dictionary<string,int> Solution(string[] logs) { return logs.GroupBy(l => l).ToDictionary(g => g.Key, g => g.Count()); }`
    },
    {
        language: 'csharp', day: 26, title: 'Configuration', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Use IConfiguration', 'Apply options pattern', 'Use environment variables'],
        contentHtml: `<h2>Configuration in ASP.NET Core</h2>
<p>Configuration in ASP.NET Core is performed using one or more configuration providers (JSON files, environment variables, command line arguments).</p>

<h3>Accessing Configuration</h3>
<pre><code>public class MyService {
    private readonly IConfiguration _config;

    public MyService(IConfiguration config) {
        _config = config;
    }

    public void DoWork() {
        string key = _config["MyKey"];
        int val = _config.GetValue&lt;int&gt;("MyInt", 5);
        
        // Binding options pattern
        var settings = new MySettings();
        _config.GetSection("Settings").Bind(settings);
    }
}</code></pre>

<h3>appsettings.json</h3>
<pre><code>{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },\n  "MyKey": "MyValue"
}</code></pre>`,
        examples: [{ title: 'Options', code: `services.Configure<Settings>(config)`, explanation: 'Bind to class.' }, { title: 'Section', code: `config.GetSection("Key")`, explanation: 'Get section.' }],
        exercise: { description: 'Parse port from config.', starterCode: `public static Dictionary<string,object> Solution(Dictionary<string,string> config) {}`, hints: ['Parse int'] },
        tests: [{ id: 't1', description: 'Parse', input: [{ 'Port': '5000' }], expectedOutput: { 'port': 5000 }, isHidden: false }, { id: 't2', description: 'Zero', input: [{ 'Port': '0' }], expectedOutput: { 'port': 0 }, isHidden: false }, { id: 't3', description: 'High', input: [{ 'Port': '65535' }], expectedOutput: { 'port': 65535 }, isHidden: true }],
        solution: `public static Dictionary<string,object> Solution(Dictionary<string,string> config) { return new Dictionary<string,object>{{"port",int.Parse(config["Port"])}}; }`
    },
    {
        language: 'csharp', day: 27, title: 'Background Services', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use IHostedService', 'Implement BackgroundService', 'Handle shutdown'],
        contentHtml: `<h2>Background Services</h2>
<p>ASP.NET Core supports running background tasks as hosted services.</p>

<h3>BackgroundService Class</h3>
<p>Implement the <code>BackgroundService</code> class (which implements <code>IHostedService</code>) to define long-running tasks.</p>
<pre><code>public class Worker : BackgroundService {
    private readonly ILogger&lt;Worker&gt; _logger;

    public Worker(ILogger&lt;Worker&gt; logger) {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
        while (!stoppingToken.IsCancellationRequested) {
            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await Task.Delay(1000, stoppingToken);
        }
    }
}

// In Program.cs
builder.Services.AddHostedService&lt;Worker&gt;();</code></pre>`,
        examples: [{ title: 'Execute', code: `protected override async Task ExecuteAsync() { }`, explanation: 'Main loop.' }, { title: 'Delay', code: `await Task.Delay(1000)`, explanation: 'Sleep.' }],
        exercise: { description: 'Sum in background.', starterCode: `public static int Solution(int[] nums) {}`, hints: ['Sum()'] },
        tests: [{ id: 't1', description: 'Sum', input: [[1, 2, 3]], expectedOutput: 6, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: true }],
        solution: `public static int Solution(int[] nums) { return nums.Sum(); }`
    },
    {
        language: 'csharp', day: 28, title: 'SignalR', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Create hubs', 'Send messages', 'Handle groups'],
        contentHtml: `<h2>Real-time with SignalR</h2>
<p>SignalR is a library for ASP.NET Core that simplifies adding real-time web functionality to apps.</p>

<h3>Creating a Hub</h3>
<pre><code>public class ChatHub : Hub {
    public async Task SendMessage(string user, string message) {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}

// Program.cs
builder.Services.AddSignalR();
// ...
app.MapHub&lt;ChatHub&gt;("/chatHub");</code></pre>

<h3>Client-Side</h3>
<pre><code>// JavaScript Client
connection.on("ReceiveMessage", (user, message) => {
    // Update UI
});</code></pre>`,
        examples: [{ title: 'Send', code: `await Clients.All.SendAsync("Receive", msg)`, explanation: 'Broadcast.' }, { title: 'Group', code: `await Clients.Group("A").SendAsync("Msg")`, explanation: 'Group msg.' }],
        exercise: { description: 'Count connected users.', starterCode: `public static int Solution(string[] users) {}`, hints: ['Return length'] },
        tests: [{ id: 't1', description: 'Count', input: [['user1', 'user2']], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [['A']], expectedOutput: 1, isHidden: true }],
        solution: `public static int Solution(string[] users) { return users.Length; }`
    },
    {
        language: 'csharp', day: 29, title: 'Performance', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Use Span<T>', 'Apply pooling', 'Benchmark'],
        contentHtml: `<h2>Performance and Caching</h2>
<p>Improving performance often involves caching data to avoid expensive database or API calls.</p>

<h3>In-Memory Caching</h3>
<pre><code>public class CachedService {
    private readonly IMemoryCache _cache;

    public CachedService(IMemoryCache cache) {
        _cache = cache;
    }

    public string GetData() {
        return _cache.GetOrCreate("myKey", entry => {
            entry.SlidingExpiration = TimeSpan.FromMinutes(5);
            return DateTime.Now.ToString();
        });
    }
}</code></pre>

<h3>Distributed Caching (Redis)</h3>
<p>Use <code>IDistributedCache</code> for sharing cache across multiple server instances.</p>`,
        examples: [{ title: 'Pool', code: `ArrayPool<byte>.Shared.Rent(1024)`, explanation: 'Array pooling.' }, { title: 'Memory', code: `Memory<int> mem = nums.AsMemory()`, explanation: 'Memory.' }],
        exercise: { description: 'Optimized sum with Span.', starterCode: `public static int Solution(int[] nums) {}`, hints: ['Sum()'] },
        tests: [{ id: 't1', description: 'Sum', input: [[1, 2, 3, 4, 5]], expectedOutput: 15, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'One', input: [[100]], expectedOutput: 100, isHidden: true }],
        solution: `public static int Solution(int[] nums) { return nums.Sum(); }`
    },
    {
        language: 'csharp', day: 30, title: 'Capstone Project', difficulty: 10, estimatedMinutes: 90,
        objectives: ['Build complete API', 'Apply all concepts', 'Deploy API'],
        contentHtml: `<h2>Capstone: Task Manager Web API</h2>
<p>Build a comprehensive Web API for task management using ASP.NET Core.</p>

<h3>Requirements</h3>
<ol>
  <li><strong>API:</strong> RESTful endpoints for Tasks (GET, POST, PUT, DELETE).</li>
  <li><strong>Database:</strong> Entity Framework Core with SQLite/SQL Server.</li>
  <li><strong>Authentication:</strong> JWT Bearer Authentication.</li>
  <li><strong>Validation:</strong> FluentValidation or Data Annotations.</li>
  <li><strong>Architecture:</strong> Repository Pattern or Mediator Pattern (MediatR).</li>
  <li><strong>Documentation:</strong> Swagger/OpenAPI.</li>
</ol>

<h3>Directory Structure</h3>
<pre>
/Controllers
  TasksController.cs
/Models
  TaskItem.cs
/Data
  AppDbContext.cs
/Services
  ITaskService.cs
Program.cs
</pre>`,
        examples: [{ title: 'Controller', code: `[ApiController] public class TasksController { }`, explanation: 'CRUD.' }, { title: 'Delete', code: `[HttpDelete("{id}")]`, explanation: 'Delete.' }],
        exercise: { description: 'Task CRUD API.', starterCode: `public static List<Dictionary<string,object>> Solution(List<Dictionary<string,object>> ops) {}`, hints: ['Track by ID'] },
        tests: [{ id: 't1', description: 'Create', input: [[{ 'op': 'create', 'data': { 'title': 'Task1' } }]], expectedOutput: [{ 'id': 1, 'title': 'Task1' }], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Mult', input: [[{ 'op': 'create', 'data': { 'title': 'A' } }, { 'op': 'create', 'data': { 'title': 'B' } }]], expectedOutput: [{ 'id': 1, 'title': 'A' }, { 'id': 2, 'title': 'B' }], isHidden: true }],
        solution: `public static List<Dictionary<string,object>> Solution(List<Dictionary<string,object>> ops) { var store = new Dictionary<int,Dictionary<string,object>>(); int id = 1; var results = new List<Dictionary<string,object>>(); foreach (var op in ops) { if ((string)op["op"] == "create") { var data = (Dictionary<string,object>)op["data"]; var task = new Dictionary<string,object>{{"id",id},{"title",data["title"]}}; store[id++] = task; results.Add(task); } } return results; }`
    }
];
