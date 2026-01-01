/**
 * Go Days 1-7 - COMPLETE with REAL solutions
 */

export const goDays1to7Real = [
    // DAY 1: Variables and Types
    {
        language: 'go', day: 1, title: 'Variables and Types', difficulty: 2, estimatedMinutes: 30,
        objectives: ['Declare variables with explicit and inferred types', 'Understand Go\'s type system', 'Use short variable declarations', 'Work with constants'],
        contentHtml: `<h2>Variables and Types in Go</h2>
<p>Go is statically typed, meaning variables must have a specific type. However, Go also supports type inference, making code concise while maintaining type safety.</p>

<h3>Variable Declaration</h3>
<pre><code>// Explicit type declaration
var name string = "Alice"
var age int = 30
var price float64 = 19.99

// Type inference (Go infers the type)
var name = "Alice"  // string
var age = 30        // int
var price = 19.99   // float64

// Short variable declaration (most common)
name := "Alice"
age := 30
price := 19.99

// Multiple declarations
var x, y int = 1, 2
a, b := 10, 20

// Variable declaration without initialization
var count int
var message string</code></pre>

<h3>Go's Basic Types</h3>
<pre><code>// Boolean
var isActive bool = true

// String
var name string = "Go"

// Integer types
var small int8 = 127
var medium int16 = 32767
var normal int = 42        // int is 32 or 64 bits depending on platform
var big int64 = 1000000

// Unsigned integers
var u uint = 42
var u8 uint8 = 255

// Floating point
var pi float32 = 3.14
var precise float64 = 3.14159

// Complex numbers
var c complex64 = 1 + 2i
var c2 complex128 = 1 + 2i

// Byte and Rune
var b byte = 'A'  // byte is alias for uint8
var r rune = '中'  // rune is alias for int32 (Unicode code point)</code></pre>

<h3>Constants</h3>
<pre><code>// Single constant
const Pi = 3.14159
const MaxSize = 100

// Typed constant
const Pi float64 = 3.14159

// Multiple constants
const (
    StatusOK = 200
    StatusNotFound = 404
    StatusError = 500
)

// Iota (auto-incrementing)
const (
    Sunday = iota  // 0
    Monday         // 1
    Tuesday        // 2
    Wednesday      // 3
)</code></pre>

<h3>Zero Values</h3>
<pre><code>var i int       // 0
var f float64   // 0.0
var b bool      // false
var s string    // ""
var p *int      // nil
var sl []int    // nil
var m map[string]int  // nil</code></pre>

<h3>Type Conversion</h3>
<pre><code>// Explicit conversion required
var i int = 42
var f float64 = float64(i)
var u uint = uint(i)

// String conversion
var num int = 42
var str string = strconv.Itoa(num)  // "42"
var parsed, _ = strconv.Atoi("42")  // 42</code></pre>`,
        examples: [
            { title: 'Short Declaration', code: `package main\nimport "fmt"\n\nfunc main() {\n    name := "Alice"\n    age := 30\n    fmt.Printf("%s is %d years old\\n", name, age)\n}`, explanation: 'Use := for concise variable declaration.' },
            { title: 'Multiple Assignment', code: `x, y := 10, 20\nx, y = y, x  // Swap values\nfmt.Println(x, y)  // 20, 10`, explanation: 'Go supports multiple assignment and swapping.' }
        ],
        exercise: { description: 'Add two integers and return the result.', starterCode: `func solution(a, b int) int {\n    // Return sum of a and b\n}`, hints: ['Use + operator', 'Return the sum'] },
        tests: [
            { id: 't1', description: 'Add positives', input: [2, 3], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Add with zero', input: [5, 0], expectedOutput: 5, isHidden: false },
            { id: 't3', description: 'Add negatives', input: [-2, -3], expectedOutput: -5, isHidden: true },
            { id: 't4', description: 'Mixed signs', input: [10, -3], expectedOutput: 7, isHidden: true }
        ],
        solution: `func solution(a, b int) int {\n    return a + b\n}`
    },

    // DAY 2: Functions
    {
        language: 'go', day: 2, title: 'Functions', difficulty: 2, estimatedMinutes: 35,
        objectives: ['Define functions with parameters and return values', 'Use multiple return values', 'Work with variadic functions', 'Understand function signatures'],
        contentHtml: `<h2>Functions in Go</h2>
<p>Functions are first-class citizens in Go. They can be passed as arguments, returned from other functions, and assigned to variables.</p>

<h3>Basic Function</h3>
<pre><code>// Function definition
func add(a int, b int) int {
    return a + b
}

// Type can be omitted for consecutive parameters of same type
func multiply(a, b int) int {
    return a * b
}

// No return value
func printMessage(msg string) {
    fmt.Println(msg)
}</code></pre>

<h3>Multiple Return Values</h3>
<pre><code>// Return multiple values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Named return values
func calculate(x, y int) (sum int, product int) {
    sum = x + y
    product = x * y
    return  // Naked return (returns named values)
}

// Usage
result, err := divide(10, 2)
if err != nil {
    fmt.Println("Error:", err)
}</code></pre>

<h3>Variadic Functions</h3>
<pre><code>// Accept variable number of arguments
func sum(numbers ...int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

// Call with any number of arguments
fmt.Println(sum(1, 2, 3))        // 6
fmt.Println(sum(1, 2, 3, 4, 5))  // 15

// Pass slice to variadic function
nums := []int{1, 2, 3}
fmt.Println(sum(nums...))  // Use ... to unpack slice</code></pre>

<h3>Function as Value</h3>
<pre><code>// Assign function to variable
var operation func(int, int) int
operation = add
result := operation(5, 3)  // 8

// Anonymous function
square := func(x int) int {
    return x * x
}
fmt.Println(square(5))  // 25

// Immediately invoked
result := func(x int) int {
    return x * x
}(5)  // 25</code></pre>

<h3>Closures</h3>
<pre><code>func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

c := counter()
fmt.Println(c())  // 1
fmt.Println(c())  // 2
fmt.Println(c())  // 3</code></pre>`,
        examples: [
            { title: 'Error Handling Pattern', code: `func divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, fmt.Errorf("cannot divide by zero")\n    }\n    return a / b, nil\n}\n\nresult, err := divide(10, 2)\nif err != nil {\n    log.Fatal(err)\n}`, explanation: 'Go idiom: return error as second value.' },
            { title: 'Variadic Function', code: `func max(numbers ...int) int {\n    if len(numbers) == 0 {\n        return 0\n    }\n    max := numbers[0]\n    for _, n := range numbers[1:] {\n        if n > max {\n            max = n\n        }\n    }\n    return max\n}`, explanation: 'Functions can accept variable arguments.' }
        ],
        exercise: { description: 'Multiply two numbers and return the result.', starterCode: `func solution(a, b int) int {\n    // Return product of a and b\n}`, hints: ['Use * operator', 'Return the product'] },
        tests: [
            { id: 't1', description: 'Multiply', input: [3, 4], expectedOutput: 12, isHidden: false },
            { id: 't2', description: 'With zero', input: [5, 0], expectedOutput: 0, isHidden: false },
            { id: 't3', description: 'Negatives', input: [-2, 3], expectedOutput: -6, isHidden: true }
        ],
        solution: `func solution(a, b int) int {\n    return a * b\n}`
    },

    // DAY 3: Arrays and Slices
    {
        language: 'go', day: 3, title: 'Arrays and Slices', difficulty: 3, estimatedMinutes: 40,
        objectives: ['Understand arrays vs slices', 'Create and manipulate slices', 'Use append and make', 'Iterate with range'],
        contentHtml: `<h2>Arrays and Slices</h2>
<p>Arrays have fixed size, while slices are dynamic and more commonly used in Go.</p>

<h3>Arrays</h3>
<pre><code>// Array declaration
var arr [5]int              // [0 0 0 0 0]
var arr2 = [5]int{1, 2, 3}  // [1 2 3 0 0]
arr3 := [...]int{1, 2, 3}   // Size inferred: [1 2 3]

// Array length is part of type
var a [5]int
var b [10]int
// a = b  // ERROR: different types!</code></pre>

<h3>Slices</h3>
<pre><code>// Slice declaration (no size)
var s []int                 // nil slice
s := []int{1, 2, 3}         // [1 2 3]
s := make([]int, 5)         // [0 0 0 0 0]
s := make([]int, 0, 10)     // length 0, capacity 10

// Slice from array
arr := [5]int{1, 2, 3, 4, 5}
s := arr[1:4]  // [2 3 4] (includes start, excludes end)

// Slice operations
s = append(s, 6)           // Add element
s = append(s, 7, 8, 9)      // Add multiple
s = append(s, s2...)       // Append another slice</code></pre>

<h3>Slice Internals</h3>
<pre><code>// Slice has length and capacity
s := make([]int, 3, 5)  // len=3, cap=5
fmt.Println(len(s))     // 3
fmt.Println(cap(s))     // 5

// Slicing doesn't copy data
original := []int{1, 2, 3, 4, 5}
slice := original[1:4]  // [2 3 4]
slice[0] = 99           // Modifies original!
// original is now [1 99 3 4 5]</code></pre>

<h3>Range Loop</h3>
<pre><code>// Iterate over slice
numbers := []int{1, 2, 3, 4, 5}

// Index and value
for i, num := range numbers {
    fmt.Printf("%d: %d\\n", i, num)
}

// Only index
for i := range numbers {
    fmt.Println(i)
}

// Only value (use _ to ignore index)
for _, num := range numbers {
    fmt.Println(num)
}</code></pre>`,
        examples: [
            { title: 'Slice Operations', code: `func processSlice(s []int) []int {\n    // Filter even numbers\n    result := []int{}\n    for _, v := range s {\n        if v%2 == 0 {\n            result = append(result, v)\n        }\n    }\n    return result\n}`, explanation: 'Common slice manipulation pattern.' },
            { title: 'Pre-allocate Slice', code: `// More efficient: pre-allocate with known capacity\nresult := make([]int, 0, len(input))\nfor _, v := range input {\n    if condition(v) {\n        result = append(result, v)\n    }\n}`, explanation: 'Pre-allocate when you know approximate size.' }
        ],
        exercise: { description: 'Find the sum of all elements in a slice.', starterCode: `func solution(numbers []int) int {\n    // Return sum of all numbers\n}`, hints: ['Use range loop', 'Add each element to total'] },
        tests: [
            { id: 't1', description: 'Sum positive', input: [[1, 2, 3, 4, 5]], expectedOutput: 15, isHidden: false },
            { id: 't2', description: 'Sum with negatives', input: [[-1, 2, -3, 4]], expectedOutput: 2, isHidden: false },
            { id: 't3', description: 'Empty slice', input: [[]], expectedOutput: 0, isHidden: true }
        ],
        solution: `func solution(numbers []int) int {\n    sum := 0\n    for _, num := range numbers {\n        sum += num\n    }\n    return sum\n}`
    },

    // DAY 4: Maps
    {
        language: 'go', day: 4, title: 'Maps', difficulty: 3, estimatedMinutes: 35,
        objectives: ['Create and initialize maps', 'Add, update, and delete entries', 'Check for key existence', 'Iterate over maps'],
        contentHtml: `<h2>Maps in Go</h2>
<p>Maps are key-value pairs, similar to dictionaries or hash tables in other languages.</p>

<h3>Map Declaration</h3>
<pre><code>// Map declaration
var m map[string]int        // nil map (cannot use until initialized)
m := make(map[string]int)   // Empty map
m := map[string]int{}       // Empty map (literal)

// Map with initial values
ages := map[string]int{
    "Alice": 30,
    "Bob":   25,
    "Charlie": 35,
}</code></pre>

<h3>Map Operations</h3>
<pre><code>// Add or update
m["key"] = 42

// Read
value := m["key"]

// Delete
delete(m, "key")

// Check existence
value, exists := m["key"]
if exists {
    fmt.Println("Found:", value)
}

// Or just check value
if value, ok := m["key"]; ok {
    fmt.Println("Found:", value)
}</code></pre>

<h3>Iterating Maps</h3>
<pre><code>// Range over map (order is random!)
for key, value := range m {
    fmt.Printf("%s: %d\\n", key, value)
}

// Only keys
for key := range m {
    fmt.Println(key)
}

// Only values
for _, value := range m {
    fmt.Println(value)
}</code></pre>

<h3>Map Characteristics</h3>
<pre><code>// Maps are reference types
m1 := map[string]int{"a": 1}
m2 := m1
m2["b"] = 2
// m1 now also has "b": 2

// Zero value of map is nil
var m map[string]int
fmt.Println(m == nil)  // true
// m["key"] = 1  // PANIC: assignment to nil map

// Check if map is nil or empty
if len(m) == 0 {
    fmt.Println("Map is empty")
}</code></pre>`,
        examples: [
            { title: 'Word Count', code: `func wordCount(text string) map[string]int {\n    words := strings.Fields(text)\n    count := make(map[string]int)\n    for _, word := range words {\n        count[word]++\n    }\n    return count\n}`, explanation: 'Count occurrences using map.' },
            { title: 'Safe Map Access', code: `func getValue(m map[string]int, key string) (int, bool) {\n    value, exists := m[key]\n    return value, exists\n}\n\nval, ok := getValue(ages, "Alice")\nif !ok {\n    fmt.Println("Key not found")\n}`, explanation: 'Always check if key exists.' }
        ],
        exercise: { description: 'Count occurrences of each number in a slice and return as map.', starterCode: `func solution(numbers []int) map[int]int {\n    // Return map of number -> count\n}`, hints: ['Create map', 'Iterate and increment count', 'Return map'] },
        tests: [
            { id: 't1', description: 'Count numbers', input: [[1, 2, 2, 3, 3, 3]], expectedOutput: { 1: 1, 2: 2, 3: 3 }, isHidden: false },
            { id: 't2', description: 'Single number', input: [[5, 5, 5]], expectedOutput: { 5: 3 }, isHidden: false },
            { id: 't3', description: 'Empty slice', input: [[]], expectedOutput: {}, isHidden: true }
        ],
        solution: `func solution(numbers []int) map[int]int {\n    count := make(map[int]int)\n    for _, num := range numbers {\n        count[num]++\n    }\n    return count\n}`
    },

    // DAY 5: Structs
    {
        language: 'go', day: 5, title: 'Structs', difficulty: 3, estimatedMinutes: 40,
        objectives: ['Define and use structs', 'Create struct literals', 'Understand struct embedding', 'Work with struct methods'],
        contentHtml: `<h2>Structs in Go</h2>
<p>Structs are collections of fields that group related data together.</p>

<h3>Struct Definition</h3>
<pre><code>// Define struct type
type Person struct {
    Name string
    Age  int
    City string
}

// Create struct instance
var p Person
p.Name = "Alice"
p.Age = 30

// Struct literal
p := Person{
    Name: "Alice",
    Age:  30,
    City: "NYC",
}

// Order matters (can omit field names)
p := Person{"Alice", 30, "NYC"}</code></pre>

<h3>Struct Methods</h3>
<pre><code>// Method with value receiver
func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", p.Name)
}

// Method with pointer receiver (can modify)
func (p *Person) Birthday() {
    p.Age++
}

// Usage
p := Person{Name: "Alice", Age: 30}
fmt.Println(p.Greet())  // "Hello, I'm Alice"
p.Birthday()            // Age is now 31</code></pre>

<h3>Struct Embedding</h3>
<pre><code>// Base struct
type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return "Some sound"
}

// Embed Animal in Dog
type Dog struct {
    Animal  // Embedded (not Animal Animal)
    Breed   string
}

// Dog can use Animal's methods
d := Dog{
    Animal: Animal{Name: "Rex"},
    Breed:  "Shepherd",
}
fmt.Println(d.Speak())  // "Some sound"
fmt.Println(d.Name)     // "Rex"</code></pre>

<h3>Anonymous Structs</h3>
<pre><code>// Inline struct (no type name)
person := struct {
    Name string
    Age  int
}{
    Name: "Bob",
    Age:  25,
}</code></pre>`,
        examples: [
            { title: 'Struct with Methods', code: `type Rectangle struct {\n    Width, Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc (r *Rectangle) Scale(factor float64) {\n    r.Width *= factor\n    r.Height *= factor\n}`, explanation: 'Value receiver for read, pointer receiver for modify.' },
            { title: 'Embedding', code: `type Reader struct {\n    Name string\n}\n\nfunc (r Reader) Read() string {\n    return "reading"\n}\n\ntype Writer struct {\n    Reader  // Embed Reader\n}\n\nw := Writer{Reader: Reader{Name: "File"}}\nw.Read()  // Can use embedded methods`, explanation: 'Composition through embedding.' }
        ],
        exercise: { description: 'Create a Point struct with X and Y coordinates, and a method Distance that calculates distance from origin.', starterCode: `type Point struct {\n    X, Y float64\n}\n\nfunc (p Point) Distance() float64 {\n    // Return distance from origin (0,0)\n    // Formula: sqrt(x^2 + y^2)\n}`, hints: ['Use math.Sqrt', 'Calculate x^2 + y^2', 'Return result'] },
        tests: [
            { id: 't1', description: 'Distance from origin', input: [{ X: 3, Y: 4 }], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Zero distance', input: [{ X: 0, Y: 0 }], expectedOutput: 0, isHidden: false },
            { id: 't3', description: 'Negative coordinates', input: [{ X: -3, Y: -4 }], expectedOutput: 5, isHidden: true }
        ],
        solution: `func (p Point) Distance() float64 {\n    return math.Sqrt(p.X*p.X + p.Y*p.Y)\n}`
    },

    // DAY 6: Pointers
    {
        language: 'go', day: 6, title: 'Pointers', difficulty: 4, estimatedMinutes: 40,
        objectives: ['Understand pointer syntax', 'Use & and * operators', 'Work with nil pointers', 'Understand when to use pointers'],
        contentHtml: `<h2>Pointers in Go</h2>
<p>Pointers hold the memory address of a value. They allow you to pass references and modify values.</p>

<h3>Pointer Basics</h3>
<pre><code>// Get address with &
x := 42
p := &x  // p is pointer to x

// Dereference with *
fmt.Println(*p)  // 42 (value at address)
*p = 21          // Modify value through pointer
fmt.Println(x)   // 21 (x is modified)

// Zero value of pointer is nil
var p *int
fmt.Println(p == nil)  // true</code></pre>

<h3>Pointer Types</h3>
<pre><code>// Pointer to int
var p *int

// Pointer to struct
type Person struct {
    Name string
}
var personPtr *Person

// Create pointer to new value
p := new(int)  // *int, points to zero value
*p = 42

// Or use address of existing value
x := 42
p := &x</code></pre>

<h3>Pointers with Functions</h3>
<pre><code>// Pass by value (copy)
func increment(x int) {
    x++  // Doesn't affect original
}

// Pass by reference (pointer)
func incrementPtr(x *int) {
    *x++  // Modifies original
}

// Usage
num := 10
increment(num)      // num is still 10
incrementPtr(&num)   // num is now 11</code></pre>

<h3>Pointers with Structs</h3>
<pre><code>type Person struct {
    Name string
    Age  int
}

// Pointer receiver (common pattern)
func (p *Person) SetAge(age int) {
    p.Age = age
}

// Value receiver (creates copy)
func (p Person) GetAge() int {
    return p.Age
}

// Usage
person := Person{Name: "Alice"}
person.SetAge(30)  // Go automatically converts to pointer
fmt.Println(person.GetAge())  // 30</code></pre>

<h3>Nil Pointer Safety</h3>
<pre><code>var p *int

// Check before dereferencing
if p != nil {
    fmt.Println(*p)
} else {
    fmt.Println("Pointer is nil")
}

// Safe dereference pattern
if p != nil && *p > 0 {
    fmt.Println("Valid positive value")
}</code></pre>`,
        examples: [
            { title: 'Swap Values', code: `func swap(a, b *int) {\n    *a, *b = *b, *a\n}\n\nx, y := 10, 20\nswap(&x, &y)\nfmt.Println(x, y)  // 20, 10`, explanation: 'Use pointers to modify values.' },
            { title: 'Pointer Receiver', code: `type Counter struct {\n    value int\n}\n\nfunc (c *Counter) Increment() {\n    c.value++\n}\n\nfunc (c Counter) Value() int {\n    return c.value\n}`, explanation: 'Pointer receiver for methods that modify.' }
        ],
        exercise: { description: 'Swap two integers using pointers.', starterCode: `func solution(a, b *int) {\n    // Swap values pointed to by a and b\n}`, hints: ['Use temporary variable', 'Dereference pointers', 'Swap values'] },
        tests: [
            { id: 't1', description: 'Swap positive', input: [10, 20], expectedOutput: [20, 10], isHidden: false },
            { id: 't2', description: 'Swap with zero', input: [0, 5], expectedOutput: [5, 0], isHidden: false },
            { id: 't3', description: 'Swap negatives', input: [-10, -20], expectedOutput: [-20, -10], isHidden: true }
        ],
        solution: `func solution(a, b *int) {\n    temp := *a\n    *a = *b\n    *b = temp\n}`
    },

    // DAY 7: Error Handling
    {
        language: 'go', day: 7, title: 'Error Handling', difficulty: 4, estimatedMinutes: 40,
        objectives: ['Understand Go\'s error handling pattern', 'Create custom errors', 'Use errors.Is and errors.As', 'Handle panic and recover'],
        contentHtml: `<h2>Error Handling in Go</h2>
<p>Go doesn't have exceptions. Instead, functions return errors as values, making error handling explicit.</p>

<h3>Error Interface</h3>
<pre><code>// Error is a built-in interface
type error interface {
    Error() string
}

// Create errors
err := fmt.Errorf("something went wrong: %v", value)
err := errors.New("simple error message")</code></pre>

<h3>Error Handling Pattern</h3>
<pre><code>// Functions return error as last value
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Check error
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)  // or handle appropriately
}
fmt.Println(result)</code></pre>

<h3>Custom Errors</h3>
<pre><code>// Define custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}

// Create and return
func validate(name string) error {
    if name == "" {
        return &ValidationError{
            Field:   "name",
            Message: "cannot be empty",
        }
    }
    return nil
}</code></pre>

<h3>Error Wrapping</h3>
<pre><code>// Wrap errors with context
func processFile(filename string) error {
    data, err := readFile(filename)
    if err != nil {
        return fmt.Errorf("failed to process %s: %w", filename, err)
    }
    // ... process data
    return nil
}

// Unwrap errors
if err != nil {
    if wrappedErr := errors.Unwrap(err); wrappedErr != nil {
        fmt.Println("Original error:", wrappedErr)
    }
}</code></pre>

<h3>errors.Is and errors.As</h3>
<pre><code>// Check if error is specific type
var ErrNotFound = errors.New("not found")

if errors.Is(err, ErrNotFound) {
    fmt.Println("Resource not found")
}

// Check and extract error type
var validationErr *ValidationError
if errors.As(err, &validationErr) {
    fmt.Println("Field:", validationErr.Field)
}</code></pre>

<h3>Panic and Recover</h3>
<pre><code>// Panic stops normal execution
func risky() {
    panic("something terrible happened")
}

// Recover catches panic (only in deferred function)
func safe() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from:", r)
        }
    }()
    risky()  // Panic is caught
    fmt.Println("This won't execute if panic occurs")
}</code></pre>`,
        examples: [
            { title: 'Error Wrapping', code: `func readConfig(path string) error {\n    data, err := os.ReadFile(path)\n    if err != nil {\n        return fmt.Errorf("config file error: %w", err)\n    }\n    // ... process config\n    return nil\n}`, explanation: 'Add context to errors.' },
            { title: 'Custom Error', code: `type APIError struct {\n    Code    int\n    Message string\n}\n\nfunc (e *APIError) Error() string {\n    return fmt.Sprintf("API error %d: %s", e.Code, e.Message)\n}`, explanation: 'Create structured errors.' }
        ],
        exercise: { description: 'Validate that a number is positive. Return error if not.', starterCode: `func solution(num int) error {\n    // Return error if num <= 0\n    // Return nil if num > 0\n}`, hints: ['Check if num <= 0', 'Return fmt.Errorf for error', 'Return nil for success'] },
        tests: [
            { id: 't1', description: 'Positive number', input: [5], expectedOutput: null, isHidden: false },
            { id: 't2', description: 'Zero', input: [0], expectedOutput: 'error', isHidden: false },
            { id: 't3', description: 'Negative', input: [-5], expectedOutput: 'error', isHidden: true }
        ],
        solution: `func solution(num int) error {\n    if num <= 0 {\n        return fmt.Errorf("number must be positive, got %d", num)\n    }\n    return nil\n}`
    }
];

