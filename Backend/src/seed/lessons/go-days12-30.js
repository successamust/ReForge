/**
 * Go Days 12-30 - COMPLETE with REAL solutions
 */

export const goDays12to30Real = [
    {
        language: 'go', day: 12, title: 'Packages and Modules', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Create modules', 'Organize packages', 'Handle imports'],
        contentHtml: `<h2>Go Modules and Packages</h2>
<p>Go organizes code into packages, and packages are grouped into modules. A module is a collection of related Go packages that are versioned together as a single unit.</p>

<h3>Go Modules</h3>
<pre><code># Initialize a new module
go mod init github.com/username/project

# Add dependencies
go get github.com/gin-gonic/gin

# Tidy up (remove unused deps)
go mod tidy</code></pre>

<h3>Package Visibility</h3>
<p>Names starting with a <strong>Capital Letter</strong> are exported (public). Names starting with a lowercase letter are package-private.</p>
<pre><code>package mathutils

// Exported
func Add(a, b int) int { return a + b }

// Private (only visible inside mathutils package)
func helper() {}</code></pre>`,
        examples: [{ title: 'Import', code: `import "github.com/user/pkg"`, explanation: 'Import packages.' }, { title: 'Multi Import', code: `import (\n  "fmt"\n  "net/http"\n)`, explanation: 'Grouped imports.' }],
        exercise: { description: 'Extract package name from path.', starterCode: `func solution(path string) string {}`, hints: ['Split by /'] },
        tests: [{ id: 't1', description: 'Extract', input: ['math/rand'], expectedOutput: 'rand', isHidden: false }, { id: 't2', description: 'Simple', input: ['fmt'], expectedOutput: 'fmt', isHidden: false }, { id: 't3', description: 'Deep', input: ['github.com/user/project/pkg'], expectedOutput: 'pkg', isHidden: true }],
        solution: `func solution(path string) string { parts := strings.Split(path, "/"); return parts[len(parts)-1] }`
    },
    {
        language: 'go', day: 13, title: 'Testing in Go', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write tests', 'Use table-driven tests', 'Run go test'],
        contentHtml: `<h2>Testing in Go</h2>
<p>Go has a built-in testing framework provided by the <code>testing</code> package. Test files must end in <code>_test.go</code>.</p>

<h3>Writing a Test</h3>
<pre><code>package mathutils

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}</code></pre>

<h3>Tabled-Driven Tests</h3>
<p>A common pattern in Go is defining test cases as a slice of structs.</p>
<pre><code>func TestAddTable(t *testing.T) {
    tests := []struct {
        a, b, want int
    }{
        {1, 1, 2},
        {2, 2, 4},
        {5, 0, 5},
    }
    
    for _, tt := range tests {
        ans := Add(tt.a, tt.b)
        if ans != tt.want {
            t.Errorf("got %d, want %d", ans, tt.want)
        }
    }
}</code></pre>`,
        examples: [{ title: 'Table', code: `tests := []struct{a, b, want int}{}`, explanation: 'Table-driven.' }, { title: 'Subtest', code: `t.Run("name", func(t *testing.T) {})`, explanation: 'Subtests usage.' }],
        exercise: { description: 'Count test results.', starterCode: `func solution(results []bool) map[string]int {}`, hints: ['Count true/false'] },
        tests: [{ id: 't1', description: 'Count', input: [[true, false, true]], expectedOutput: { 'passed': 2, 'failed': 1 }, isHidden: false }, { id: 't2', description: 'All Fail', input: [[false, false]], expectedOutput: { 'passed': 0, 'failed': 2 }, isHidden: false }, { id: 't3', description: 'Empty', input: [[]], expectedOutput: { 'passed': 0, 'failed': 0 }, isHidden: true }],
        solution: `func solution(results []bool) map[string]int { p,f := 0,0; for _,r := range results { if r { p++ } else { f++ } }; return map[string]int{"passed":p,"failed":f} }`
    },
    {
        language: 'go', day: 14, title: 'Benchmarking', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write benchmarks', 'Profile with pprof', 'Analyze results'],
        contentHtml: `<h2>Benchmarking in Go</h2>
<p>Go's testing package also supports benchmarking to measure the performance of your code.</p>

<h3>Writing Benchmarks</h3>
<p>Benchmarks are functions that start with <code>Benchmark</code> and take a <code>*testing.B</code> parameter.</p>
<pre><code>func BenchmarkAdd(b *testing.B) {
    // b.N is automatically adjusted by the test runner
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}</code></pre>

<h3>Running Benchmarks</h3>
<pre><code># Run benchmarks only (skip tests)
go test -bench=. 

# Analyze memory allocation
go test -bench=. -benchmem</code></pre>`,
        examples: [{ title: 'Run', code: `go test -bench=.`, explanation: 'Run benchmarks.' }, { title: 'Reset', code: `b.ResetTimer()`, explanation: 'Reset timer.' }],
        exercise: { description: 'Calculate average.', starterCode: `func solution(nums []float64) float64 {}`, hints: ['Sum/len'] },
        tests: [{ id: 't1', description: 'Avg', input: [[100, 200, 150, 180]], expectedOutput: 157.5, isHidden: false }, { id: 't2', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: false }, { id: 't3', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: true }],
        solution: `func solution(nums []float64) float64 { if len(nums)==0 { return 0 }; s := 0.0; for _,n := range nums { s += n }; return s/float64(len(nums)) }`
    },
    {
        language: 'go', day: 15, title: 'JSON Handling', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Marshal/Unmarshal', 'Use struct tags', 'Handle errors'],
        contentHtml: `<h2>JSON Handling</h2>
<p>The standard <code>encoding/json</code> package provides robust support for parsing (unmarshaling) and generating (marshaling) JSON data.</p>

<h3>Struct Tags</h3>
<p>Use tags to map struct fields to JSON keys.</p>
<pre><code>type User struct {
    Name  string \`json:"full_name"\`
    Age   int    \`json:"age,omitempty"\` // Omit if zero value
    Email string \`json:"-"\`             // Ignore this field
}</code></pre>

<h3>Marshaling and Unmarshaling</h3>
<pre><code>// To JSON
u := User{Name: "Alice", Age: 30}
data, err := json.Marshal(u)

// From JSON
jsonStr := []byte(\`{"full_name": "Bob"}\`)
var u2 User
err := json.Unmarshal(jsonStr, &u2)</code></pre>`,
        examples: [{ title: 'Tags', code: `Name string \`json:"name"\``, explanation: 'JSON tags.' }, { title: 'Unmarshal', code: `json.Unmarshal(data, &v)`, explanation: 'Parse JSON.' }],
        exercise: { description: 'Stringify object.', starterCode: `func solution(obj map[string]interface{}) string {}`, hints: ['Marshal'] },
        tests: [{ id: 't1', description: 'JSON', input: [{ 'name': 'Alice' }], expectedOutput: '{"name":"Alice"}', isHidden: false }, { id: 't2', description: 'Empty', input: [{}], expectedOutput: '{}', isHidden: false }, { id: 't3', description: 'Complex', input: [{ 'a': 1, 'b': true }], expectedOutput: '{"a":1,"b":true}', isHidden: true }],
        solution: `func solution(obj map[string]interface{}) string { data, _ := json.Marshal(obj); return string(data) }`
    },
    {
        language: 'go', day: 16, title: 'HTTP Client', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Make requests', 'Handle responses', 'Set headers'],
        contentHtml: `<h2>HTTP Client</h2>
<p>The <code>net/http</code> package provides a highly capable HTTP client.</p>

<h3>Making Requests</h3>
<pre><code>import (
    "net/http"
    "io"
)

// Simple GET
resp, err := http.Get("https://api.example.com/data")
if err != nil { log.Fatal(err) }
defer resp.Body.Close()

body, _ := io.ReadAll(resp.Body)</code></pre>

<h3>Custom Client with Timeout</h3>
<p>Always use a custom client in production to set timeouts.</p>
<pre><code>client := &http.Client{
    Timeout: 10 * time.Second,
}

req, _ := http.NewRequest("POST", "http://example.com", nil)
req.Header.Add("Authorization", "Bearer token")
resp, _ := client.Do(req)</code></pre>`,
        examples: [{ title: 'POST', code: `http.Post(url, "application/json", body)`, explanation: 'POST.' }, { title: 'NewRequest', code: `http.NewRequest("GET", url, nil)`, explanation: 'Custom request.' }],
        exercise: { description: 'Check success status.', starterCode: `func solution(resp map[string]int) bool {}`, hints: ['200-299'] },
        tests: [{ id: 't1', description: 'Success', input: [{ 'status': 200 }], expectedOutput: true, isHidden: false }, { id: 't2', description: 'NotFound', input: [{ 'status': 404 }], expectedOutput: false, isHidden: false }, { id: 't3', description: 'Error', input: [{ 'status': 500 }], expectedOutput: false, isHidden: true }],
        solution: `func solution(resp map[string]int) bool { s := resp["status"]; return s >= 200 && s < 300 }`
    },
    {
        language: 'go', day: 17, title: 'HTTP Server', difficulty: 6, estimatedMinutes: 45,
        objectives: ['Create handlers', 'Use ServeMux', 'Handle query params'],
        contentHtml: `<h2>HTTP Server</h2>
<p>Building an HTTP server in Go is straightforward with the standard library.</p>

<h3>Handlers</h3>
<p>A handler is an interface with the method <code>ServeHTTP(ResponseWriter, *Request)</code>. The standard library provides <code>http.HandlerFunc</code> adapter to turn functions into handlers.</p>
<pre><code>func hello(w http.ResponseWriter, r *http.Request) {
    if r.Method != "GET" {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    fmt.Fprintf(w, "Hello, world!")
}

func main() {
    http.HandleFunc("/", hello)
    http.ListenAndServe(":8080", nil)
}</code></pre>

<h3>Query Parameters</h3>
<pre><code>// URL: /?name=Alice
name := r.URL.Query().Get("name")</code></pre>`,
        examples: [{ title: 'Path', code: `r.URL.Path`, explanation: 'Get path.' }, { title: 'Listen', code: `http.ListenAndServe(":8080", nil)`, explanation: 'Start server.' }],
        exercise: { description: 'Parse URL and extract ID.', starterCode: `func solution(path string) map[string]string {}`, hints: ['Split path'] },
        tests: [{ id: 't1', description: 'Extract', input: ['/users/123'], expectedOutput: { 'path': '/users/123', 'id': '123' }, isHidden: false }, { id: 't2', description: 'Root', input: ['/'], expectedOutput: { 'path': '/', 'id': '' }, isHidden: false }, { id: 't3', description: 'No ID', input: ['/users'], expectedOutput: { 'path': '/users', 'id': '' }, isHidden: true }],
        solution: `func solution(path string) map[string]string { parts := strings.Split(strings.Trim(path,"/"),"/"); id := ""; if len(parts) > 1 { id = parts[len(parts)-1] }; return map[string]string{"path":path,"id":id} }`
    },
    {
        language: 'go', day: 18, title: 'Middleware Patterns', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Create middleware', 'Chain handlers', 'Handle context'],
        contentHtml: `<h2>Middleware Patterns</h2>
<p>Middleware is reusable logic that wraps an HTTP handler. Common uses include logging, authentication, and headers.</p>

<h3>Writing Middleware</h3>
<p>A middleware function takes an <code>http.Handler</code> and returns a new <code>http.Handler</code>.</p>
<pre><code>func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Println(r.Method, r.URL.Path)
        // Call the next handler
        next.ServeHTTP(w, r)
    })
}

// Usage
http.Handle("/", loggingMiddleware(finalHandler))</code></pre>`,
        examples: [{ title: 'Log', code: `log.Println(r.URL)`, explanation: 'Log requests.' }, { title: 'Handler', code: `http.HandlerFunc(func(w, r) {})`, explanation: 'Handler func.' }],
        exercise: { description: 'Return middleware chain.', starterCode: `func solution(mw []string) []string {}`, hints: ['Return as-is'] },
        tests: [{ id: 't1', description: 'Chain', input: [['log', 'auth']], expectedOutput: ['log', 'auth'], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Single', input: [['log']], expectedOutput: ['log'], isHidden: true }],
        solution: `func solution(mw []string) []string { return mw }`
    },
    {
        language: 'go', day: 19, title: 'Context Package', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use context', 'Handle cancellation', 'Use context values'],
        contentHtml: `<h2>Context Package</h2>
<p>The <code>context</code> package is used to carry deadlines, cancellation signals, and request-scoped values across API boundaries and between processes.</p>

<h3>Creating Contexts</h3>
<pre><code>// Empty root context
ctx := context.Background()

// With Cancellation
ctx, cancel := context.WithCancel(ctx)
defer cancel() // Cancel when done

// With Timeout
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()</code></pre>

<h3>Handling Cancellation</h3>
<pre><code>select {
case <-time.After(2 * time.Second):
    fmt.Println("Overslept")
case <-ctx.Done():
    fmt.Println(ctx.Err()) // context canceled or deadline exceeded
}</code></pre>`,
        examples: [{ title: 'Done', code: `<-ctx.Done()`, explanation: 'Wait for cancel.' }, { title: 'Value', code: `ctx.Value(key)`, explanation: 'Context values.' }],
        exercise: { description: 'Check timeout exceeded.', starterCode: `func solution(ms int) bool {}`, hints: ['> 1000'] },
        tests: [{ id: 't1', description: 'Not exceeded', input: [500], expectedOutput: false, isHidden: false }, { id: 't2', description: 'Exceeded', input: [1500], expectedOutput: true, isHidden: false }, { id: 't3', description: 'Boundary', input: [1000], expectedOutput: false, isHidden: true }],
        solution: `func solution(ms int) bool { return ms > 1000 }`
    },
    {
        language: 'go', day: 20, title: 'Database with GORM', difficulty: 7, estimatedMinutes: 50,
        objectives: ['Define models', 'Perform CRUD', 'Handle relationships'],
        contentHtml: `<h2>Database Access with GORM</h2>
<p>GORM is a popular ORM library for Go, providing developer-friendly features like auto-migration and associations.</p>

<h3>Defining Models</h3>
<pre><code>type Product struct {
    gorm.Model // Adds ID, CreatedAt, UpdatedAt, DeletedAt
    Code  string
    Price uint
}</code></pre>

<h3>CRUD Operations</h3>
<pre><code>db, _ := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

// Create
db.Create(&Product{Code: "D42", Price: 100})

// Read
var product Product
db.First(&product, 1) // find product with integer primary key
db.First(&product, "code = ?", "D42") // find product with code D42

// Update
db.Model(&product).Update("Price", 200)

// Delete
db.Delete(&product, 1)</code></pre>`,
        examples: [{ title: 'Query', code: `db.Find(&users)`, explanation: 'Find all.' }, { title: 'Where', code: `db.Where("name = ?", "jinzhu")`, explanation: 'Condition.' }],
        exercise: { description: 'Count records.', starterCode: `func solution(recs []map[string]interface{}) int {}`, hints: ['len()'] },
        tests: [{ id: 't1', description: 'Count', input: [[{ 'id': 1 }, { 'id': 2 }]], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [[{ 'id': 1 }]], expectedOutput: 1, isHidden: true }],
        solution: `func solution(recs []map[string]interface{}) int { return len(recs) }`
    },
    {
        language: 'go', day: 21, title: 'Generics', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use type parameters', 'Apply constraints', 'Use generic types'],
        contentHtml: `<h2>Generics in Go (1.18+)</h2>
<p>Generics allow you to write code that works with different types without sacrificing type safety.</p>

<h3>Type Parameters</h3>
<pre><code>// T is a type parameter that must be comparable
func Index[T comparable](s []T, x T) int {
    for i, v := range s {
        if v == x {
            return i
        }
    }
    return -1
}

// Usage
ints := []int{10, 20, 30}
Index(ints, 20)

strs := []string{"a", "b"}
Index(strs, "b")</code></pre>

<h3>Constraints</h3>
<p>You can define interface constraints or use the <code>constraints</code> package.</p>
<pre><code>type Number interface {
    int64 | float64
}

func Sum[V Number](m map[string]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}</code></pre>`,
        examples: [{ title: 'Max', code: `if a > b { return a }`, explanation: 'Compare.' }, { title: 'Struct', code: `type List[T any] struct {}`, explanation: 'Generic struct.' }],
        exercise: { description: 'Find max.', starterCode: `func solution(nums []int) int {}`, hints: ['Loop compare'] },
        tests: [{ id: 't1', description: 'Max', input: [[1, 2, 3, 4, 5]], expectedOutput: 5, isHidden: false }, { id: 't2', description: 'Negative', input: [[-10, -5, -20]], expectedOutput: -5, isHidden: false }, { id: 't3', description: 'Single', input: [[100]], expectedOutput: 100, isHidden: true }],
        solution: `func solution(nums []int) int { m := nums[0]; for _,n := range nums[1:] { if n > m { m = n } }; return m }`
    },
    {
        language: 'go', day: 22, title: 'Reflection', difficulty: 8, estimatedMinutes: 50,
        objectives: ['Inspect types', 'Work with values', 'Use struct tags'],
        contentHtml: `<h2>Reflection in Go</h2>
<p>Reflection allows a program to inspect its own structure, particularly through types; it's a form of metaprogramming.</p>

<h3>The reflect Package</h3>
<pre><code>import "reflect"

var x float64 = 3.4
t := reflect.TypeOf(x)  // float64
v := reflect.ValueOf(x) // 3.4

fmt.Println("type:", t)
fmt.Println("value:", v)
fmt.Println("kind:", v.Kind()) // float64</code></pre>

<h3>Modifying Values</h3>
<p>To modify a value via reflection, you must pass a pointer and use <code>Elem()</code>.</p>
<pre><code>x := 10
p := reflect.ValueOf(&x) // Note pointer
v := p.Elem()
v.SetInt(20)
fmt.Println(x) // 20</code></pre>`,
        examples: [{ title: 'Name', code: `t.Name()`, explanation: 'Type name.' }, { title: 'Kind', code: `t.Kind()`, explanation: 'Type kind.' }],
        exercise: { description: 'Return type name.', starterCode: `func solution(name string) string {}`, hints: ['Return as-is'] },
        tests: [{ id: 't1', description: 'Name', input: ['string'], expectedOutput: 'string', isHidden: false }, { id: 't2', description: 'Int', input: ['int'], expectedOutput: 'int', isHidden: false }, { id: 't3', description: 'Bool', input: ['bool'], expectedOutput: 'bool', isHidden: true }],
        solution: `func solution(name string) string { return name }`
    },
    {
        language: 'go', day: 23, title: 'Build and Deploy', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Build binaries', 'Cross-compile', 'Optimize build'],
        contentHtml: `<h2>Build and Deployment</h2>
<p>Go compiles directly to machine code, producing a single static binary. This makes deployment extremely simple.</p>

<h3>Building Binaries</h3>
<pre><code># Build for current OS/Arch
go build -o myapp main.go

# Cross-Compilation
GOOS=linux GOARCH=amd64 go build -o myapp-linux
GOOS=windows GOARCH=amd64 go build -o myapp.exe</code></pre>

<h3>Optimization Flags</h3>
<pre><code># Reduce binary size (strip debug info)
go build -ldflags="-s -w" main.go</code></pre>

<h3>Docker</h3>
<pre><code># Multi-stage build
FROM golang:1.21 as builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server

FROM scratch
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]</code></pre>`,
        examples: [{ title: 'Docker', code: `FROM golang:1.21`, explanation: 'Docker build.' }, { title: 'Env', code: `CGO_ENABLED=0`, explanation: 'Static build.' }],
        exercise: { description: 'Format build target.', starterCode: `func solution(cfg map[string]string) string {}`, hints: ['OS/ARCH'] },
        tests: [{ id: 't1', description: 'Format', input: [{ 'GOOS': 'linux', 'GOARCH': 'amd64' }], expectedOutput: 'linux/amd64', isHidden: false }, { id: 't2', description: 'Windows', input: [{ 'GOOS': 'windows', 'GOARCH': '386' }], expectedOutput: 'windows/386', isHidden: false }, { id: 't3', description: 'Darwin', input: [{ 'GOOS': 'darwin', 'GOARCH': 'arm64' }], expectedOutput: 'darwin/arm64', isHidden: true }],
        solution: `func solution(cfg map[string]string) string { return cfg["GOOS"] + "/" + cfg["GOARCH"] }`
    },
    {
        language: 'go', day: 24, title: 'Logging', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Use log package', 'Structure logs', 'Log to file'],
        contentHtml: `<h2>Logging in Go</h2>
<p>Go 1.21 introduced structured logging with <code>log/slog</code>, setting a new standard for logging.</p>

<h3>Standard Logging</h3>
<pre><code>log.Println("simple message")
log.Fatalf("fatal error: %v", err) // logs and exits</code></pre>

<h3>Structured Logging (slog)</h3>
<pre><code>import "log/slog"

// JSON output
logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

logger.Info("processed request",
    "method", "GET",
    "path", "/users",
    "status", 200,
)
// {"time":"...","level":"INFO","msg":"processed request","method":"GET",...}</code></pre>`,
        examples: [{ title: 'slog', code: `slog.Info("msg")`, explanation: 'Structured.' }, { title: 'Fatal', code: `log.Fatal("die")`, explanation: 'Log and exit.' }],
        exercise: { description: 'Count by level.', starterCode: `func solution(logs []string) map[string]int {}`, hints: ['Split first word'] },
        tests: [{ id: 't1', description: 'Count', input: [['INFO a', 'ERROR b']], expectedOutput: { 'INFO': 1, 'ERROR': 1 }, isHidden: false }, { id: 't2', description: 'Single', input: [['WARN x']], expectedOutput: { 'WARN': 1 }, isHidden: false }, { id: 't3', description: 'Multiple', input: [['INFO a', 'INFO b']], expectedOutput: { 'INFO': 2 }, isHidden: true }],
        solution: `func solution(logs []string) map[string]int { c := map[string]int{}; for _,l := range logs { parts := strings.SplitN(l," ",2); c[parts[0]]++ }; return c }`
    },
    {
        language: 'go', day: 25, title: 'Configuration', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Use env vars', 'Parse config', 'Use flags'],
        contentHtml: `<h2>Configuration Management</h2>
<p>Twelve-Factor Apps store configuration in the environment. Go handles this natively or via libraries.</p>

<h3>Environment Variables</h3>
<pre><code>import "os"

port := os.Getenv("PORT")
if port == "" {
    port = "8080"
}</code></pre>

<h3>Command Line Flags</h3>
<pre><code>import "flag"

var port = flag.Int("port", 8080, "server port")
flag.Parse()

fmt.Println("Port:", *port)</code></pre>

<h3>Viper (Popular Library)</h3>
<p>Viper handles config files (JSON, YAML), env vars, and flags seamlessly.</p>
<pre><code>viper.SetConfigFile("config.yaml")
viper.ReadInConfig()
port := viper.GetInt("server.port")</code></pre>`,
        examples: [{ title: 'Viper', code: `viper.GetInt("port")`, explanation: 'Config lib.' }, { title: 'Flag', code: `flag.Parse()`, explanation: 'CLI flags.' }],
        exercise: { description: 'Parse env config.', starterCode: `func solution(env map[string]string) map[string]interface{} {}`, hints: ['Parse types'] },
        tests: [{ id: 't1', description: 'Parse', input: [{ 'PORT': '8080', 'DEBUG': 'true' }], expectedOutput: { 'port': 8080, 'debug': true }, isHidden: false }, { id: 't2', description: 'Empty', input: [{}], expectedOutput: {}, isHidden: false }, { id: 't3', description: 'Only Port', input: [{ 'PORT': '9000' }], expectedOutput: { 'port': 9000 }, isHidden: true }],
        solution: `func solution(env map[string]string) map[string]interface{} { r := map[string]interface{}{}; if p,ok := env["PORT"]; ok { v,_ := strconv.Atoi(p); r["port"] = v }; if d,ok := env["DEBUG"]; ok { r["debug"] = d == "true" }; return r }`
    },
    {
        language: 'go', day: 26, title: 'gRPC', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Define protobuf', 'Create client/server', 'Define messages'],
        contentHtml: `<h2>gRPC in Go</h2>
<p>gRPC is a high-performance RPC framework using Protocol Buffers.</p>

<h3>Defining a Service (.proto)</h3>
<pre><code>syntax = "proto3";
package user;

service UserService {
  rpc GetUser (UserRequest) returns (UserReply) {}
}

message UserRequest { string id = 1; }
message UserReply { string name = 1; }</code></pre>

<h3>Implementing Server</h3>
<pre><code>type server struct {
    pb.UnimplementedUserServiceServer
}

func (s *server) GetUser(ctx context.Context, in *pb.UserRequest) (*pb.UserReply, error) {
    return &pb.UserReply{Name: "Alice"}, nil
}

func main() {
    lis, _ := net.Listen("tcp", ":50051")
    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &server{})
    s.Serve(lis)
}</code></pre>`,
        examples: [{ title: 'Server', code: `grpc.NewServer()`, explanation: 'Create server.' }, { title: 'Dial', code: `grpc.Dial(addr)`, explanation: 'Client connection.' }],
        exercise: { description: 'Build method path.', starterCode: `func solution(cfg map[string]string) string {}`, hints: ['/service/method'] },
        tests: [{ id: 't1', description: 'Path', input: [{ 'service': 'users', 'method': 'Get' }], expectedOutput: '/users/Get', isHidden: false }, { id: 't2', description: 'Auth', input: [{ 'service': 'auth', 'method': 'Login' }], expectedOutput: '/auth/Login', isHidden: false }, { id: 't3', description: 'Other', input: [{ 'service': 'a', 'method': 'b' }], expectedOutput: '/a/b', isHidden: true }],
        solution: `func solution(cfg map[string]string) string { return "/" + cfg["service"] + "/" + cfg["method"] }`
    },
    {
        language: 'go', day: 27, title: 'WebSockets', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use gorilla/websocket', 'Handle messages', 'Handle errors'],
        contentHtml: `<h2>WebSockets in Go</h2>
<p>WebSockets allow full-duplex communication over a single TCP connection. The <code>github.com/gorilla/websocket</code> package is the industry standard for Go.</p>

<h3>Upgrading to WebSocket</h3>
<pre><code>var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool { return true }, // Allow all origins (dev only)
}

func handleWS(w http.ResponseWriter, r *http.Request) {
    conn, _ := upgrader.Upgrade(w, r, nil)
    defer conn.Close()
    
    for {
        msgType, msg, err := conn.ReadMessage()
        if err != nil { break }
        
        log.Printf("Received: %s", msg)
        
        // Echo back
        conn.WriteMessage(msgType, msg)
    }
}</code></pre>`,
        examples: [{ title: 'Write', code: `conn.WriteMessage(1, []byte("hi"))`, explanation: 'Send.' }, { title: 'Read', code: `conn.ReadMessage()`, explanation: 'Receive.' }],
        exercise: { description: 'Count messages.', starterCode: `func solution(msgs []string) int {}`, hints: ['len()'] },
        tests: [{ id: 't1', description: 'Count', input: [['a', 'b', 'c']], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [['hello']], expectedOutput: 1, isHidden: true }],
        solution: `func solution(msgs []string) int { return len(msgs) }`
    },
    {
        language: 'go', day: 28, title: 'Microservices', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Design services', 'Health checks', 'Implement logging'],
        contentHtml: `<h2>Microservices Architecture in Go</h2>
<p>Go is often the language of choice for microservices due to its small footprint, fast startup, and concurrency support.</p>

<h3>Key Components</h3>
<ul>
  <li><strong>Transport:</strong> HTTP/JSON (REST) or gRPC (Protobuf).</li>
  <li><strong>Service Discovery:</strong> Consul, Etcd, or K8s DNS.</li>
  <li><strong>Health Checks:</strong> Expose <code>/healthz</code> and <code>/readyz</code>.</li>
</ul>

<h3>Resiliency Pattern: Circuit Breaker</h3>
<p>Prevent cascading failures by failing fast when downstream services are down.</p>
<pre><code>cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
    Name: "my-service",
    Timeout: 5 * time.Second,
})

cb.Execute(func() (interface{}, error) {
    return http.Get("http://remote-service")
})</code></pre>`,
        examples: [{ title: 'Health', code: `http.HandleFunc("/health", ...)`, explanation: 'Health endpoint.' }, { title: 'Circuit', code: `gobreaker.New()`, explanation: 'Circuit breaker.' }],
        exercise: { description: 'Check health.', starterCode: `func solution(svc map[string]interface{}) bool {}`, hints: ['Check healthy'] },
        tests: [{ id: 't1', description: 'Healthy', input: [{ 'healthy': true }], expectedOutput: true, isHidden: false }, { id: 't2', description: 'Unhealthy', input: [{ 'healthy': false }], expectedOutput: false, isHidden: false }, { id: 't3', description: 'Missing', input: [{}], expectedOutput: false, isHidden: true }],
        solution: `func solution(svc map[string]interface{}) bool { return svc["healthy"] == true }`
    },
    {
        language: 'go', day: 29, title: 'Performance', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Profile', 'Optimize', 'Analyze trace'],
        contentHtml: `<h2>Performance Optimization in Go</h2>
<p>Go provides powerful tools for understanding program performance.</p>

<h3>pprof (Profiling)</h3>
<p>Enable the pprof http endpoint to serve profiling data.</p>
<pre><code>import _ "net/http/pprof"

func main() {
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()
    // ...
}</code></pre>

<h3>sync.Pool</h3>
<p>Reuse objects to reduce garbage collection pressure.</p>
<pre><code>var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

// Get
b := bufPool.Get().(*bytes.Buffer)
b.Reset()

// Put back
bufPool.Put(b)</code></pre>`,
        examples: [{ title: 'Pool', code: `sync.Pool{}`, explanation: 'Object pool.' }, { title: 'Trace', code: `trace.Start()`, explanation: 'Execution trace.' }],
        exercise: { description: 'Optimized sum.', starterCode: `func solution(nums []int) int {}`, hints: ['Loop add'] },
        tests: [{ id: 't1', description: 'Sum', input: [[1, 2, 3, 4, 5]], expectedOutput: 15, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: true }],
        solution: `func solution(nums []int) int { s := 0; for _,n := range nums { s += n }; return s }`
    },
    {
        language: 'go', day: 30, title: 'Capstone Project', difficulty: 10, estimatedMinutes: 90,
        objectives: ['Build complete service', 'Apply all concepts', 'Deploy application'],
        contentHtml: `<h2>Capstone: Go REST API</h2>
<p>Build a production-ready REST API for a Task Management System.</p>

<h3>Requirements</h3>
<ul>
  <li><strong>Router:</strong> Use <code>chi</code> or standard <code>ServeMux</code> (Go 1.22+).</li>
  <li><strong>Database:</strong> SQLite with GORM or raw SQL with <code>sqlx</code>.</li>
  <li><strong>Config:</strong> Environment variables.</li>
  <li><strong>Docker:</strong> Multi-stage Dockerfile.</li>
</ul>

<h3>Standard Project Layout</h3>
<pre>
/cmd
  /api
    main.go
/internal
  /handler (HTTP handlers)
  /service (Business logic)
  /store   (Database access)
/pkg
  /util    (Shared utilities)
go.mod
Dockerfile
</pre>`,
        examples: [{ title: 'CRUD', code: `store[id] = task`, explanation: 'Store tasks.' }, { title: 'Validation', code: `if name == ""`, explanation: 'Validate input.' }],
        exercise: { description: 'Task CRUD.', starterCode: `func solution(ops []map[string]interface{}) []interface{} {}`, hints: ['Track by ID'] },
        tests: [{ id: 't1', description: 'Create', input: [[{ 'op': 'create', 'data': { 'name': 'A' } }]], expectedOutput: [{ 'id': 1, 'name': 'A' }], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Multiple', input: [[{ 'op': 'create', 'data': { 'name': 'B' } }, { 'op': 'create', 'data': { 'name': 'C' } }]], expectedOutput: [{ 'id': 1, 'name': 'B' }, { 'id': 2, 'name': 'C' }], isHidden: true }],
        solution: `func solution(ops []map[string]interface{}) []interface{} { store := map[int]map[string]interface{}{}; id := 1; r := []interface{}{}; for _,op := range ops { if op["op"] == "create" { d := op["data"].(map[string]interface{}); t := map[string]interface{}{"id":id,"name":d["name"]}; store[id] = t; id++; r = append(r, t) } }; return r }`
    }
];
