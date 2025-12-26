/**
 * Go Days 12-30 - COMPLETE with REAL solutions
 */

export const goDays12to30Real = [
    {
        language: 'go', day: 12, title: 'Packages and Modules', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Create modules', 'Organize packages', 'Handle imports'],
        contentHtml: `<h2>Go Modules</h2><pre><code>go mod init myproject</code></pre>`,
        examples: [{ title: 'Import', code: `import "github.com/user/pkg"`, explanation: 'Import packages.' }, { title: 'Multi Import', code: `import (\n  "fmt"\n  "net/http"\n)`, explanation: 'Grouped imports.' }],
        exercise: { description: 'Extract package name from path.', starterCode: `func solution(path string) string {}`, hints: ['Split by /'] },
        tests: [{ id: 't1', description: 'Extract', input: ['math/rand'], expectedOutput: 'rand', isHidden: false }, { id: 't2', description: 'Simple', input: ['fmt'], expectedOutput: 'fmt', isHidden: false }, { id: 't3', description: 'Deep', input: ['github.com/user/project/pkg'], expectedOutput: 'pkg', isHidden: true }],
        solution: `func solution(path string) string { parts := strings.Split(path, "/"); return parts[len(parts)-1] }`
    },
    {
        language: 'go', day: 13, title: 'Testing in Go', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write tests', 'Use table-driven tests', 'Run go test'],
        contentHtml: `<h2>Testing</h2><pre><code>func TestAdd(t *testing.T) { }</code></pre>`,
        examples: [{ title: 'Table', code: `tests := []struct{a, b, want int}{}`, explanation: 'Table-driven.' }, { title: 'Subtest', code: `t.Run("name", func(t *testing.T) {})`, explanation: 'Subtests usage.' }],
        exercise: { description: 'Count test results.', starterCode: `func solution(results []bool) map[string]int {}`, hints: ['Count true/false'] },
        tests: [{ id: 't1', description: 'Count', input: [[true, false, true]], expectedOutput: { 'passed': 2, 'failed': 1 }, isHidden: false }, { id: 't2', description: 'All Fail', input: [[false, false]], expectedOutput: { 'passed': 0, 'failed': 2 }, isHidden: false }, { id: 't3', description: 'Empty', input: [[]], expectedOutput: { 'passed': 0, 'failed': 0 }, isHidden: true }],
        solution: `func solution(results []bool) map[string]int { p,f := 0,0; for _,r := range results { if r { p++ } else { f++ } }; return map[string]int{"passed":p,"failed":f} }`
    },
    {
        language: 'go', day: 14, title: 'Benchmarking', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Write benchmarks', 'Profile with pprof', 'Analyze results'],
        contentHtml: `<h2>Benchmarks</h2><pre><code>func BenchmarkX(b *testing.B) {}</code></pre>`,
        examples: [{ title: 'Run', code: `go test -bench=.`, explanation: 'Run benchmarks.' }, { title: 'Reset', code: `b.ResetTimer()`, explanation: 'Reset timer.' }],
        exercise: { description: 'Calculate average.', starterCode: `func solution(nums []float64) float64 {}`, hints: ['Sum/len'] },
        tests: [{ id: 't1', description: 'Avg', input: [[100, 200, 150, 180]], expectedOutput: 157.5, isHidden: false }, { id: 't2', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: false }, { id: 't3', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: true }],
        solution: `func solution(nums []float64) float64 { if len(nums)==0 { return 0 }; s := 0.0; for _,n := range nums { s += n }; return s/float64(len(nums)) }`
    },
    {
        language: 'go', day: 15, title: 'JSON Handling', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Marshal/Unmarshal', 'Use struct tags', 'Handle errors'],
        contentHtml: `<h2>JSON</h2><pre><code>json.Marshal(obj)</code></pre>`,
        examples: [{ title: 'Tags', code: `Name string \`json:"name"\``, explanation: 'JSON tags.' }, { title: 'Unmarshal', code: `json.Unmarshal(data, &v)`, explanation: 'Parse JSON.' }],
        exercise: { description: 'Stringify object.', starterCode: `func solution(obj map[string]interface{}) string {}`, hints: ['Marshal'] },
        tests: [{ id: 't1', description: 'JSON', input: [{ 'name': 'Alice' }], expectedOutput: '{"name":"Alice"}', isHidden: false }, { id: 't2', description: 'Empty', input: [{}], expectedOutput: '{}', isHidden: false }, { id: 't3', description: 'Complex', input: [{ 'a': 1, 'b': true }], expectedOutput: '{"a":1,"b":true}', isHidden: true }],
        solution: `func solution(obj map[string]interface{}) string { data, _ := json.Marshal(obj); return string(data) }`
    },
    {
        language: 'go', day: 16, title: 'HTTP Client', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Make requests', 'Handle responses', 'Set headers'],
        contentHtml: `<h2>HTTP Client</h2><pre><code>http.Get(url)</code></pre>`,
        examples: [{ title: 'POST', code: `http.Post(url, "application/json", body)`, explanation: 'POST.' }, { title: 'NewRequest', code: `http.NewRequest("GET", url, nil)`, explanation: 'Custom request.' }],
        exercise: { description: 'Check success status.', starterCode: `func solution(resp map[string]int) bool {}`, hints: ['200-299'] },
        tests: [{ id: 't1', description: 'Success', input: [{ 'status': 200 }], expectedOutput: true, isHidden: false }, { id: 't2', description: 'NotFound', input: [{ 'status': 404 }], expectedOutput: false, isHidden: false }, { id: 't3', description: 'Error', input: [{ 'status': 500 }], expectedOutput: false, isHidden: true }],
        solution: `func solution(resp map[string]int) bool { s := resp["status"]; return s >= 200 && s < 300 }`
    },
    {
        language: 'go', day: 17, title: 'HTTP Server', difficulty: 6, estimatedMinutes: 45,
        objectives: ['Create handlers', 'Use ServeMux', 'Handle query params'],
        contentHtml: `<h2>Server</h2><pre><code>http.HandleFunc("/", handler)</code></pre>`,
        examples: [{ title: 'Path', code: `r.URL.Path`, explanation: 'Get path.' }, { title: 'Listen', code: `http.ListenAndServe(":8080", nil)`, explanation: 'Start server.' }],
        exercise: { description: 'Parse URL and extract ID.', starterCode: `func solution(path string) map[string]string {}`, hints: ['Split path'] },
        tests: [{ id: 't1', description: 'Extract', input: ['/users/123'], expectedOutput: { 'path': '/users/123', 'id': '123' }, isHidden: false }, { id: 't2', description: 'Root', input: ['/'], expectedOutput: { 'path': '/', 'id': '' }, isHidden: false }, { id: 't3', description: 'No ID', input: ['/users'], expectedOutput: { 'path': '/users', 'id': '' }, isHidden: true }],
        solution: `func solution(path string) map[string]string { parts := strings.Split(strings.Trim(path,"/"),"/"); id := ""; if len(parts) > 1 { id = parts[len(parts)-1] }; return map[string]string{"path":path,"id":id} }`
    },
    {
        language: 'go', day: 18, title: 'Middleware Patterns', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Create middleware', 'Chain handlers', 'Handle context'],
        contentHtml: `<h2>Middleware</h2><pre><code>func mw(next http.Handler) http.Handler {}</code></pre>`,
        examples: [{ title: 'Log', code: `log.Println(r.URL)`, explanation: 'Log requests.' }, { title: 'Handler', code: `http.HandlerFunc(func(w, r) {})`, explanation: 'Handler func.' }],
        exercise: { description: 'Return middleware chain.', starterCode: `func solution(mw []string) []string {}`, hints: ['Return as-is'] },
        tests: [{ id: 't1', description: 'Chain', input: [['log', 'auth']], expectedOutput: ['log', 'auth'], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Single', input: [['log']], expectedOutput: ['log'], isHidden: true }],
        solution: `func solution(mw []string) []string { return mw }`
    },
    {
        language: 'go', day: 19, title: 'Context Package', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use context', 'Handle cancellation', 'Use context values'],
        contentHtml: `<h2>Context</h2><pre><code>ctx, cancel := context.WithTimeout(ctx, time.Second)</code></pre>`,
        examples: [{ title: 'Done', code: `<-ctx.Done()`, explanation: 'Wait for cancel.' }, { title: 'Value', code: `ctx.Value(key)`, explanation: 'Context values.' }],
        exercise: { description: 'Check timeout exceeded.', starterCode: `func solution(ms int) bool {}`, hints: ['> 1000'] },
        tests: [{ id: 't1', description: 'Not exceeded', input: [500], expectedOutput: false, isHidden: false }, { id: 't2', description: 'Exceeded', input: [1500], expectedOutput: true, isHidden: false }, { id: 't3', description: 'Boundary', input: [1000], expectedOutput: false, isHidden: true }],
        solution: `func solution(ms int) bool { return ms > 1000 }`
    },
    {
        language: 'go', day: 20, title: 'Database with GORM', difficulty: 7, estimatedMinutes: 50,
        objectives: ['Define models', 'Perform CRUD', 'Handle relationships'],
        contentHtml: `<h2>GORM</h2><pre><code>db.Create(&user)</code></pre>`,
        examples: [{ title: 'Query', code: `db.Find(&users)`, explanation: 'Find all.' }, { title: 'Where', code: `db.Where("name = ?", "jinzhu")`, explanation: 'Condition.' }],
        exercise: { description: 'Count records.', starterCode: `func solution(recs []map[string]interface{}) int {}`, hints: ['len()'] },
        tests: [{ id: 't1', description: 'Count', input: [[{ 'id': 1 }, { 'id': 2 }]], expectedOutput: 2, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [[{ 'id': 1 }]], expectedOutput: 1, isHidden: true }],
        solution: `func solution(recs []map[string]interface{}) int { return len(recs) }`
    },
    {
        language: 'go', day: 21, title: 'Generics', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use type parameters', 'Apply constraints', 'Use generic types'],
        contentHtml: `<h2>Generics</h2><pre><code>func Max[T constraints.Ordered](a, b T) T {}</code></pre>`,
        examples: [{ title: 'Max', code: `if a > b { return a }`, explanation: 'Compare.' }, { title: 'Struct', code: `type List[T any] struct {}`, explanation: 'Generic struct.' }],
        exercise: { description: 'Find max.', starterCode: `func solution(nums []int) int {}`, hints: ['Loop compare'] },
        tests: [{ id: 't1', description: 'Max', input: [[1, 2, 3, 4, 5]], expectedOutput: 5, isHidden: false }, { id: 't2', description: 'Negative', input: [[-10, -5, -20]], expectedOutput: -5, isHidden: false }, { id: 't3', description: 'Single', input: [[100]], expectedOutput: 100, isHidden: true }],
        solution: `func solution(nums []int) int { m := nums[0]; for _,n := range nums[1:] { if n > m { m = n } }; return m }`
    },
    {
        language: 'go', day: 22, title: 'Reflection', difficulty: 8, estimatedMinutes: 50,
        objectives: ['Inspect types', 'Work with values', 'Use struct tags'],
        contentHtml: `<h2>Reflection</h2><pre><code>reflect.TypeOf(x)</code></pre>`,
        examples: [{ title: 'Name', code: `t.Name()`, explanation: 'Type name.' }, { title: 'Kind', code: `t.Kind()`, explanation: 'Type kind.' }],
        exercise: { description: 'Return type name.', starterCode: `func solution(name string) string {}`, hints: ['Return as-is'] },
        tests: [{ id: 't1', description: 'Name', input: ['string'], expectedOutput: 'string', isHidden: false }, { id: 't2', description: 'Int', input: ['int'], expectedOutput: 'int', isHidden: false }, { id: 't3', description: 'Bool', input: ['bool'], expectedOutput: 'bool', isHidden: true }],
        solution: `func solution(name string) string { return name }`
    },
    {
        language: 'go', day: 23, title: 'Build and Deploy', difficulty: 6, estimatedMinutes: 40,
        objectives: ['Build binaries', 'Cross-compile', 'Optimize build'],
        contentHtml: `<h2>Build</h2><pre><code>GOOS=linux go build</code></pre>`,
        examples: [{ title: 'Docker', code: `FROM golang:1.21`, explanation: 'Docker build.' }, { title: 'Env', code: `CGO_ENABLED=0`, explanation: 'Static build.' }],
        exercise: { description: 'Format build target.', starterCode: `func solution(cfg map[string]string) string {}`, hints: ['OS/ARCH'] },
        tests: [{ id: 't1', description: 'Format', input: [{ 'GOOS': 'linux', 'GOARCH': 'amd64' }], expectedOutput: 'linux/amd64', isHidden: false }, { id: 't2', description: 'Windows', input: [{ 'GOOS': 'windows', 'GOARCH': '386' }], expectedOutput: 'windows/386', isHidden: false }, { id: 't3', description: 'Darwin', input: [{ 'GOOS': 'darwin', 'GOARCH': 'arm64' }], expectedOutput: 'darwin/arm64', isHidden: true }],
        solution: `func solution(cfg map[string]string) string { return cfg["GOOS"] + "/" + cfg["GOARCH"] }`
    },
    {
        language: 'go', day: 24, title: 'Logging', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Use log package', 'Structure logs', 'Log to file'],
        contentHtml: `<h2>Logging</h2><pre><code>log.Println("msg")</code></pre>`,
        examples: [{ title: 'slog', code: `slog.Info("msg")`, explanation: 'Structured.' }, { title: 'Fatal', code: `log.Fatal("die")`, explanation: 'Log and exit.' }],
        exercise: { description: 'Count by level.', starterCode: `func solution(logs []string) map[string]int {}`, hints: ['Split first word'] },
        tests: [{ id: 't1', description: 'Count', input: [['INFO a', 'ERROR b']], expectedOutput: { 'INFO': 1, 'ERROR': 1 }, isHidden: false }, { id: 't2', description: 'Single', input: [['WARN x']], expectedOutput: { 'WARN': 1 }, isHidden: false }, { id: 't3', description: 'Multiple', input: [['INFO a', 'INFO b']], expectedOutput: { 'INFO': 2 }, isHidden: true }],
        solution: `func solution(logs []string) map[string]int { c := map[string]int{}; for _,l := range logs { parts := strings.SplitN(l," ",2); c[parts[0]]++ }; return c }`
    },
    {
        language: 'go', day: 25, title: 'Configuration', difficulty: 5, estimatedMinutes: 35,
        objectives: ['Use env vars', 'Parse config', 'Use flags'],
        contentHtml: `<h2>Config</h2><pre><code>os.Getenv("PORT")</code></pre>`,
        examples: [{ title: 'Viper', code: `viper.GetInt("port")`, explanation: 'Config lib.' }, { title: 'Flag', code: `flag.Parse()`, explanation: 'CLI flags.' }],
        exercise: { description: 'Parse env config.', starterCode: `func solution(env map[string]string) map[string]interface{} {}`, hints: ['Parse types'] },
        tests: [{ id: 't1', description: 'Parse', input: [{ 'PORT': '8080', 'DEBUG': 'true' }], expectedOutput: { 'port': 8080, 'debug': true }, isHidden: false }, { id: 't2', description: 'Empty', input: [{}], expectedOutput: {}, isHidden: false }, { id: 't3', description: 'Only Port', input: [{ 'PORT': '9000' }], expectedOutput: { 'port': 9000 }, isHidden: true }],
        solution: `func solution(env map[string]string) map[string]interface{} { r := map[string]interface{}{}; if p,ok := env["PORT"]; ok { v,_ := strconv.Atoi(p); r["port"] = v }; if d,ok := env["DEBUG"]; ok { r["debug"] = d == "true" }; return r }`
    },
    {
        language: 'go', day: 26, title: 'gRPC', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Define protobuf', 'Create client/server', 'Define messages'],
        contentHtml: `<h2>gRPC</h2><pre><code>service UserService { rpc GetUser(Req) returns (User); }</code></pre>`,
        examples: [{ title: 'Server', code: `grpc.NewServer()`, explanation: 'Create server.' }, { title: 'Dial', code: `grpc.Dial(addr)`, explanation: 'Client connection.' }],
        exercise: { description: 'Build method path.', starterCode: `func solution(cfg map[string]string) string {}`, hints: ['/service/method'] },
        tests: [{ id: 't1', description: 'Path', input: [{ 'service': 'users', 'method': 'Get' }], expectedOutput: '/users/Get', isHidden: false }, { id: 't2', description: 'Auth', input: [{ 'service': 'auth', 'method': 'Login' }], expectedOutput: '/auth/Login', isHidden: false }, { id: 't3', description: 'Other', input: [{ 'service': 'a', 'method': 'b' }], expectedOutput: '/a/b', isHidden: true }],
        solution: `func solution(cfg map[string]string) string { return "/" + cfg["service"] + "/" + cfg["method"] }`
    },
    {
        language: 'go', day: 27, title: 'WebSockets', difficulty: 7, estimatedMinutes: 45,
        objectives: ['Use gorilla/websocket', 'Handle messages', 'Handle errors'],
        contentHtml: `<h2>WebSocket</h2><pre><code>upgrader.Upgrade(w, r, nil)</code></pre>`,
        examples: [{ title: 'Write', code: `conn.WriteMessage(1, []byte("hi"))`, explanation: 'Send.' }, { title: 'Read', code: `conn.ReadMessage()`, explanation: 'Receive.' }],
        exercise: { description: 'Count messages.', starterCode: `func solution(msgs []string) int {}`, hints: ['len()'] },
        tests: [{ id: 't1', description: 'Count', input: [['a', 'b', 'c']], expectedOutput: 3, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [['hello']], expectedOutput: 1, isHidden: true }],
        solution: `func solution(msgs []string) int { return len(msgs) }`
    },
    {
        language: 'go', day: 28, title: 'Microservices', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Design services', 'Health checks', 'Implement logging'],
        contentHtml: `<h2>Microservices</h2><pre><code>{"status":"UP"}</code></pre>`,
        examples: [{ title: 'Health', code: `http.HandleFunc("/health", ...)`, explanation: 'Health endpoint.' }, { title: 'Circuit', code: `gobreaker.New()`, explanation: 'Circuit breaker.' }],
        exercise: { description: 'Check health.', starterCode: `func solution(svc map[string]interface{}) bool {}`, hints: ['Check healthy'] },
        tests: [{ id: 't1', description: 'Healthy', input: [{ 'healthy': true }], expectedOutput: true, isHidden: false }, { id: 't2', description: 'Unhealthy', input: [{ 'healthy': false }], expectedOutput: false, isHidden: false }, { id: 't3', description: 'Missing', input: [{}], expectedOutput: false, isHidden: true }],
        solution: `func solution(svc map[string]interface{}) bool { return svc["healthy"] == true }`
    },
    {
        language: 'go', day: 29, title: 'Performance', difficulty: 8, estimatedMinutes: 55,
        objectives: ['Profile', 'Optimize', 'Analyze trace'],
        contentHtml: `<h2>Perf</h2><pre><code>import _ "net/http/pprof"</code></pre>`,
        examples: [{ title: 'Pool', code: `sync.Pool{}`, explanation: 'Object pool.' }, { title: 'Trace', code: `trace.Start()`, explanation: 'Execution trace.' }],
        exercise: { description: 'Optimized sum.', starterCode: `func solution(nums []int) int {}`, hints: ['Loop add'] },
        tests: [{ id: 't1', description: 'Sum', input: [[1, 2, 3, 4, 5]], expectedOutput: 15, isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: false }, { id: 't3', description: 'Single', input: [[10]], expectedOutput: 10, isHidden: true }],
        solution: `func solution(nums []int) int { s := 0; for _,n := range nums { s += n }; return s }`
    },
    {
        language: 'go', day: 30, title: 'Capstone Project', difficulty: 10, estimatedMinutes: 90,
        objectives: ['Build complete service', 'Apply all concepts', 'Deploy application'],
        contentHtml: `<h2>Capstone</h2><p>Build a REST API.</p>`,
        examples: [{ title: 'CRUD', code: `store[id] = task`, explanation: 'Store tasks.' }, { title: 'Validation', code: `if name == ""`, explanation: 'Validate input.' }],
        exercise: { description: 'Task CRUD.', starterCode: `func solution(ops []map[string]interface{}) []interface{} {}`, hints: ['Track by ID'] },
        tests: [{ id: 't1', description: 'Create', input: [[{ 'op': 'create', 'data': { 'name': 'A' } }]], expectedOutput: [{ 'id': 1, 'name': 'A' }], isHidden: false }, { id: 't2', description: 'Empty', input: [[]], expectedOutput: [], isHidden: false }, { id: 't3', description: 'Multiple', input: [[{ 'op': 'create', 'data': { 'name': 'B' } }, { 'op': 'create', 'data': { 'name': 'C' } }]], expectedOutput: [{ 'id': 1, 'name': 'B' }, { 'id': 2, 'name': 'C' }], isHidden: true }],
        solution: `func solution(ops []map[string]interface{}) []interface{} { store := map[int]map[string]interface{}{}; id := 1; r := []interface{}{}; for _,op := range ops { if op["op"] == "create" { d := op["data"].(map[string]interface{}); t := map[string]interface{}{"id":id,"name":d["name"]}; store[id] = t; id++; r = append(r, t) } }; return r }`
    }
];
