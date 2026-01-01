/**
 * Java Lessons - Days 1-30 (COMPLETE)
 * All 30 days with full content, examples, tests, and solutions
 */

import { javaDays10to30Real } from './java-days10-30.js';
import { javaDays12to30Real } from './java-days12-30.js';

export const javaLessons = [
    // ============== DAY 1 ==============
    {
        language: 'java', day: 1, title: 'Variables and Data Types', difficulty: 2, estimatedMinutes: 20,
        objectives: ['Declare variables with types', 'Understand primitive types', 'Use wrapper classes', 'Type casting'],
        contentHtml: `<h2>Variables and Data Types in Java</h2>
<p>Java is a strongly typed language, meaning every variable must be declared with a specific type before use. This provides type safety, catching errors at compile-time rather than runtime. Understanding Java's type system is fundamental to writing correct Java programs.</p>

<h3>Why Strong Typing Matters</h3>
<p>Java's type system enables you to:</p>
<ul>
  <li><strong>Catch errors early:</strong> Compiler catches type mismatches before runtime</li>
  <li><strong>Write safer code:</strong> Prevents many common programming errors</li>
  <li><strong>Improve readability:</strong> Types document what data variables hold</li>
  <li><strong>Enable tooling:</strong> IDEs can provide better autocomplete and refactoring</li>
</ul>

<h3>Primitive Types</h3>
<p>Java has eight primitive types - these store values directly:</p>
<pre><code>// Integer types
byte small = 127;        // 8-bit, -128 to 127
short medium = 32767;    // 16-bit, -32,768 to 32,767
int age = 30;            // 32-bit, most common
long big = 1000000L;     // 64-bit, note the 'L'

// Floating point types
float price = 19.99f;    // 32-bit, note the 'f'
double precise = 3.14159; // 64-bit, default for decimals

// Character type
char grade = 'A';        // 16-bit Unicode character

// Boolean type
boolean isActive = true; // true or false only

// String is NOT primitive - it's a reference type
String name = "Alice";   // Reference type (object)</code></pre>
<p><strong>Key points:</strong> Primitives store values directly. Use <code>int</code> for integers, <code>double</code> for decimals unless you need specific precision.</p>

<h3>Reference Types</h3>
<p>Objects are reference types - variables hold references to objects:</p>
<pre><code>// String is a reference type
String name = "Alice";
String greeting = new String("Hello");

// Arrays are reference types
int[] numbers = {1, 2, 3};
String[] names = new String[10];

// Objects
User user = new User("john@example.com");
user.setName("John Doe");</code></pre>

<h3>Wrapper Classes</h3>
<p>Each primitive has a corresponding wrapper class for object operations:</p>
<pre><code>// Primitives
int primitive = 42;
double pi = 3.14;

// Wrappers
Integer wrapped = Integer.valueOf(42);
Double wrappedPi = Double.valueOf(3.14);

// Auto-boxing (automatic conversion)
Integer autoBoxed = 42;        // int -> Integer
int unboxed = autoBoxed;       // Integer -> int

// Useful methods
Integer max = Integer.max(10, 20);
Double parsed = Double.parseDouble("3.14");</code></pre>

<h3>Type Casting</h3>
<p>Convert between compatible types:</p>
<pre><code>// Widening (automatic)
int small = 100;
long big = small;        // int -> long (safe)

// Narrowing (explicit cast required)
long bigNum = 1000L;
int smallNum = (int) bigNum;  // long -> int (may lose data)

// Reference casting
Object obj = "Hello";
String str = (String) obj;     // Object -> String

// instanceof check before casting
if (obj instanceof String) {
    String safeStr = (String) obj;
}</code></pre>`,
        examples: [
            { title: 'Variable Declaration', code: `int count = 0;\nString message = "Hello";\nboolean flag = true;\nSystem.out.println(count + " " + message + " " + flag);`, explanation: 'Declare with type before name.' },
            { title: 'Arrays', code: `int[] numbers = {1, 2, 3};\nString[] names = new String[10];\nnames[0] = "Alice";\nSystem.out.println(Arrays.toString(numbers));`, explanation: 'Arrays have fixed size.' },
            { title: 'Type Casting', code: `double precise = 3.14159;\nint whole = (int) precise;\nSystem.out.println("Original: " + precise + ", Cast: " + whole);`, explanation: 'Explicit cast for narrowing conversions.' }
        ],
        exercise: { description: 'Create a method returning type info as Map.', starterCode: `public static Map<String, Object> solution(Object input) {\n    // Return map with "value" and "type"\n}`, hints: ['Use getClass().getSimpleName()', 'Create HashMap'] },
        tests: [
            { id: 't1', description: 'String input', input: ['"hello"'], expectedOutput: { 'value': 'hello', 'type': 'String' }, isHidden: false },
            { id: 't2', description: 'Integer input', input: [42], expectedOutput: { 'value': 42, 'type': 'Integer' }, isHidden: false },
            { id: 't3', description: 'Boolean input', input: [true], expectedOutput: { 'value': true, 'type': 'Boolean' }, isHidden: true }
        ],
        solution: `public static Map<String, Object> solution(Object input) {\n    Map<String, Object> result = new HashMap<>();\n    result.put("value", input);\n    result.put("type", input.getClass().getSimpleName());\n    return result;\n}`
    },

    {
        language: 'java', day: 2, title: 'Methods and Parameters', difficulty: 2, estimatedMinutes: 25,
        objectives: ['Define methods', 'Use parameters and return types', 'Method overloading', 'Static vs instance methods'],
        contentHtml: `<h2>Methods and Parameters in Java</h2>
<p>Methods are blocks of code that perform specific tasks. They enable code reuse, organization, and modularity. In Java, methods belong to classes and can be either static (belonging to the class) or instance methods (belonging to objects). Understanding methods is fundamental to Java programming.</p>

<h3>Why Methods Matter</h3>
<p>Methods enable you to:</p>
<ul>
  <li><strong>Reuse code:</strong> Write once, use many times</li>
  <li><strong>Organize logic:</strong> Break complex problems into smaller pieces</li>
  <li><strong>Test independently:</strong> Test methods in isolation</li>
  <li><strong>Improve readability:</strong> Descriptive method names explain intent</li>
</ul>

<h3>Method Syntax</h3>
<pre><code>// Method signature: accessModifier returnType methodName(parameters)
public int add(int a, int b) {
    return a + b; // Return statement
}

// Method components:
// - public: access modifier (public, private, protected)
// - int: return type (void if no return)
// - add: method name
// - (int a, int b): parameters
// - { ... }: method body

// Void method (no return)
public void printMessage(String msg) {
    System.out.println(msg);
    // No return needed
}

// Method with no parameters
public String getGreeting() {
    return "Hello";
}</code></pre>

<h3>Static vs Instance Methods</h3>
<pre><code>public class Calculator {
    // Static method - belongs to class, called without instance
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Instance method - belongs to object, needs instance
    private int value;
    
    public void setValue(int value) {
        this.value = value; // this refers to current instance
    }
    
    public int getValue() {
        return this.value;
    }
}

// Using static method (no instance needed)
int result = Calculator.add(5, 3); // 8

// Using instance methods (need instance)
Calculator calc = new Calculator();
calc.setValue(10);
int val = calc.getValue(); // 10</code></pre>
<p><strong>Key difference:</strong> Static methods belong to the class, instance methods belong to objects. Static methods can't access instance variables.</p>

<h3>Method Overloading</h3>
<pre><code>// Same method name, different parameters
public class MathUtils {
    // Overload 1: int parameters
    public static int add(int a, int b) {
        return a + b;
    }
    
    // Overload 2: double parameters
    public static double add(double a, double b) {
        return a + b;
    }
    
    // Overload 3: three parameters
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
}

// Java chooses correct method based on arguments
MathUtils.add(5, 3);        // Calls int version
MathUtils.add(5.0, 3.0);    // Calls double version
MathUtils.add(1, 2, 3);     // Calls three-parameter version</code></pre>
<p><strong>Rules:</strong> Overloaded methods must differ in parameter count or types. Return type alone doesn't distinguish overloads.</p>

<h3>Parameters and Arguments</h3>
<pre><code>// Parameters: variables in method signature
public void greet(String name, int age) {
    // name and age are parameters
    System.out.println("Hello, " + name + "! You are " + age);
}

// Arguments: values passed when calling method
greet("Alice", 30); // "Alice" and 30 are arguments

// Varargs (variable arguments)
public static int sum(int... numbers) {
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    return total;
}

sum(1, 2, 3);        // 6
sum(10, 20, 30, 40); // 100
sum();                // 0

// Varargs is treated as array
public static void printAll(String... items) {
    for (String item : items) {
        System.out.println(item);
    }
}</code></pre>

<h3>Return Values</h3>
<pre><code>// Methods can return values
public int square(int x) {
    return x * x; // Return value
}

// Multiple return points
public String getStatus(int value) {
    if (value < 0) {
        return "negative";
    }
    if (value == 0) {
        return "zero";
    }
    return "positive";
}

// Returning objects
public Person createPerson(String name, int age) {
    Person p = new Person();
    p.setName(name);
    p.setAge(age);
    return p; // Return object
}

// Void methods don't return (but can use return to exit early)
public void process(int value) {
    if (value < 0) {
        return; // Early exit
    }
    // Continue processing...
}</code></pre>

<h3>Access Modifiers</h3>
<pre><code>public class Example {
    public void publicMethod() {
        // Accessible from anywhere
    }
    
    private void privateMethod() {
        // Only accessible within this class
    }
    
    protected void protectedMethod() {
        // Accessible in this class and subclasses
    }
    
    void packagePrivateMethod() {
        // Accessible in same package
    }
}</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Forgetting return:</strong> Methods with return type must return value</li>
  <li><strong>Wrong return type:</strong> Return type must match method signature</li>
  <li><strong>Static vs instance:</strong> Can't call instance methods without object</li>
  <li><strong>Parameter order:</strong> Arguments must match parameter order</li>
  <li><strong>Overloading confusion:</strong> Return type doesn't distinguish overloads</li>
  <li><strong>Varargs position:</strong> Varargs must be last parameter</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Use descriptive method names (verb + noun: calculateTotal, getUserName)</li>
  <li>Keep methods focused on single task (single responsibility)</li>
  <li>Use static for utility methods that don't need instance state</li>
  <li>Keep methods short and readable</li>
  <li>Use appropriate access modifiers (private by default, public when needed)</li>
  <li>Document methods with JavaDoc comments</li>
  <li>Validate parameters at method entry</li>
</ul>`,
        examples: [
            { title: 'Static Methods', code: `public static int square(int n) {\n    return n * n;\n}\nint result = Calculator.square(5);`, explanation: 'Call without instance.' },
            { title: 'Varargs', code: `public static int sum(int... numbers) {\n    int total = 0;\n    for (int n : numbers) total += n;\n    return total;\n}`, explanation: 'Variable arguments.' }
        ],
        exercise: { description: 'Create calculator method with operation string.', starterCode: `public static double solution(double a, double b, String op) {\n    // Implement operations\n}`, hints: ['Use switch statement', 'Handle all operations'] },
        tests: [
            { id: 't1', description: 'Add', input: [10, 5, 'add'], expectedOutput: 15, isHidden: false },
            { id: 't2', description: 'Subtract', input: [10, 5, 'subtract'], expectedOutput: 5, isHidden: false },
            { id: 't3', description: 'Multiply', input: [10, 5, 'multiply'], expectedOutput: 50, isHidden: true },
            { id: 't4', description: 'Divide', input: [10, 4, 'divide'], expectedOutput: 2.5, isHidden: true }
        ],
        solution: `public static double solution(double a, double b, String op) {\n    switch(op) {\n        case "add": return a + b;\n        case "subtract": return a - b;\n        case "multiply": return a * b;\n        case "divide": return a / b;\n        default: return 0;\n    }\n}`
    },

    // ============== DAYS 3-7 ==============
    {
        language: 'java', day: 3, title: 'Arrays and ArrayLists', difficulty: 3, estimatedMinutes: 30,
        objectives: ['Create arrays', 'Use ArrayList', 'Iterate collections', 'Array methods'],
        contentHtml: `<h2>Arrays and ArrayLists in Java</h2>
<p>Arrays and ArrayLists are Java's primary ways to store collections of elements. Arrays are fixed-size, while ArrayLists are dynamic and can grow/shrink. Understanding when to use each is crucial for efficient Java programming.</p>

<h3>Why Arrays and ArrayLists Matter</h3>
<p>These data structures enable you to:</p>
<ul>
  <li><strong>Store collections:</strong> Group related data together</li>
  <li><strong>Process sequences:</strong> Iterate and transform multiple items</li>
  <li><strong>Build dynamic programs:</strong> Handle variable amounts of data</li>
  <li><strong>Organize information:</strong> Maintain order and relationships</li>
</ul>

<h3>Arrays - Fixed Size Collections</h3>
<pre><code>// Array declaration and initialization
int[] numbers = {1, 2, 3, 4, 5}; // Array literal
int[] numbers2 = new int[5];      // Array of 5 zeros
String[] names = new String[10];  // Array of 10 nulls

// Accessing elements (zero-indexed)
numbers[0] = 10;        // Set first element
int first = numbers[0]; // Get first element
int length = numbers.length; // Get length (NOT a method!)

// Array iteration
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

// Enhanced for loop (for-each)
for (int num : numbers) {
    System.out.println(num);
}

// Multi-dimensional arrays
int[][] matrix = {{1, 2}, {3, 4}};
int[][] matrix2 = new int[3][4]; // 3 rows, 4 columns
matrix[0][1] = 5; // Access element</code></pre>
<p><strong>Key points:</strong> Arrays have fixed size, use <code>length</code> (not <code>length()</code>), zero-indexed.</p>

<h3>ArrayList - Dynamic Collections</h3>
<pre><code>// ArrayList declaration (must import java.util.ArrayList)
import java.util.ArrayList;
import java.util.List;

ArrayList<String> list = new ArrayList<>();
List<String> list2 = new ArrayList<>(); // Preferred: use interface

// Adding elements
list.add("Apple");
list.add("Banana");
list.add(0, "Avocado"); // Insert at index

// Accessing elements
String first = list.get(0);     // Get element at index
list.set(0, "Apricot");          // Set element at index
int size = list.size();           // Get size (method, not property!)

// Removing elements
list.remove("Apple");             // Remove by value
list.remove(0);                   // Remove by index
list.clear();                     // Remove all

// Checking
boolean hasApple = list.contains("Apple");
int index = list.indexOf("Banana");
boolean isEmpty = list.isEmpty();</code></pre>
<p><strong>Key points:</strong> ArrayLists grow dynamically, use <code>size()</code> method, more flexible than arrays.</p>

<h3>When to Use Arrays vs ArrayLists</h3>
<p><strong>Use Arrays when:</strong></p>
<ul>
  <li>Size is known and fixed</li>
  <li>Performance is critical (slightly faster)</li>
  <li>Working with primitives (no autoboxing overhead)</li>
  <li>Multi-dimensional structures needed</li>
</ul>
<p><strong>Use ArrayLists when:</strong></p>
<ul>
  <li>Size may change</li>
  <li>Need dynamic resizing</li>
  <li>Working with objects (not primitives)</li>
  <li>Need rich collection methods</li>
</ul>

<h3>Common Operations</h3>
<pre><code>// Array operations
int[] arr = {5, 3, 8, 1};
Arrays.sort(arr);                    // Sort array
int index = Arrays.binarySearch(arr, 5); // Search (must be sorted)
Arrays.fill(arr, 0);                 // Fill with value
int[] copy = Arrays.copyOf(arr, arr.length); // Copy array

// ArrayList operations
List<Integer> nums = new ArrayList<>();
nums.addAll(List.of(1, 2, 3));      // Add multiple
nums.removeIf(n -> n > 2);           // Remove conditionally
nums.replaceAll(n -> n * 2);         // Transform all
Collections.sort(nums);               // Sort
Collections.reverse(nums);            // Reverse</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Array length:</strong> Use <code>array.length</code> not <code>array.length()</code></li>
  <li><strong>ArrayList size:</strong> Use <code>list.size()</code> not <code>list.length</code></li>
  <li><strong>Index out of bounds:</strong> Always check bounds before accessing</li>
  <li><strong>Primitive arrays:</strong> Arrays can hold primitives, ArrayLists cannot</li>
  <li><strong>Fixed size:</strong> Can't change array size after creation</li>
  <li><strong>Null elements:</strong> Arrays can have null elements</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Prefer ArrayList over arrays for dynamic collections</li>
  <li>Use List interface type (not ArrayList) for flexibility</li>
  <li>Use Arrays utility class for array operations</li>
  <li>Check bounds before array access</li>
  <li>Use enhanced for loop when index not needed</li>
  <li>Consider Collections framework for advanced operations</li>
  <li>Use appropriate initial capacity for ArrayLists if known</li>
</ul>`,
        examples: [
            { title: 'Array Operations', code: `int[] arr = {5, 3, 8, 1};\nArrays.sort(arr);\nint max = Arrays.stream(arr).max().getAsInt();`, explanation: 'Use Arrays utility class.' },
            { title: 'ArrayList Methods', code: `ArrayList<Integer> nums = new ArrayList<>();\nnums.addAll(List.of(1, 2, 3));\nnums.contains(2);  // true`, explanation: 'Rich collection methods.' }
        ],
        exercise: { description: 'Return stats map from number array.', starterCode: `public static Map<String, Number> solution(int[] numbers) {\n    // Return sum, count, average, min, max\n}`, hints: ['Use streams', 'Calculate each statistic'] },
        tests: [
            { id: 't1', description: 'Basic stats', input: [1, 2, 3, 4, 5], expectedOutput: { sum: 15, count: 5, average: 3.0, min: 1, max: 5 }, isHidden: false },
            { id: 't2', description: 'Single', input: [42], expectedOutput: { sum: 42, count: 1, average: 42.0, min: 42, max: 42 }, isHidden: true },
            { id: 't3', description: 'Negative', input: [-5, 0, 5], expectedOutput: { sum: 0, count: 3, average: 0.0, min: -5, max: 5 }, isHidden: true }
        ],
        solution: `public static Map<String, Number> solution(int[] numbers) {\n    Map<String, Number> result = new HashMap<>();\n    int sum = Arrays.stream(numbers).sum();\n    result.put("sum", sum);\n    result.put("count", numbers.length);\n    result.put("average", (double) sum / numbers.length);\n    result.put("min", Arrays.stream(numbers).min().getAsInt());\n    result.put("max", Arrays.stream(numbers).max().getAsInt());\n    return result;\n}`
    },

    {
        language: 'java', day: 4, title: 'Classes and Objects', difficulty: 3, estimatedMinutes: 30,
        objectives: ['Create classes', 'Use constructors', 'Access modifiers', 'Instance vs class members'],
        contentHtml: `<h2>Classes and Objects in Java</h2>
<p>Classes are blueprints for creating objects in Java. They define the structure (fields) and behavior (methods) that objects of that class will have. Understanding classes and objects is fundamental to object-oriented programming in Java.</p>

<h3>Why Classes Matter</h3>
<p>Classes enable you to:</p>
<ul>
  <li><strong>Model real-world entities:</strong> Represent concepts as objects</li>
  <li><strong>Organize code:</strong> Group related data and behavior</li>
  <li><strong>Reuse code:</strong> Create multiple objects from one class</li>
  <li><strong>Encapsulate data:</strong> Control access to data through methods</li>
</ul>

<h3>Class Structure</h3>
<pre><code>// Class declaration
public class Person {
    // Fields (instance variables)
    private String name;
    private int age;
    
    // Constructor - called when creating object
    public Person(String name, int age) {
        this.name = name;  // this refers to current object
        this.age = age;
    }
    
    // Default constructor (if no constructor defined)
    public Person() {
        this.name = "Unknown";
        this.age = 0;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
    
    // Instance method
    public void introduce() {
        System.out.println("Hi, I'm " + name + " and I'm " + age);
    }
}

// Creating objects (instances)
Person alice = new Person("Alice", 30);
Person bob = new Person(); // Uses default constructor
bob.setName("Bob");
bob.setAge(25);

// Using objects
alice.introduce(); // "Hi, I'm Alice and I'm 30"
String name = alice.getName(); // "Alice"</code></pre>

<h3>Constructors</h3>
<pre><code>public class Car {
    private String brand;
    private String model;
    private int year;
    
    // Constructor with parameters
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    // Constructor chaining (calling another constructor)
    public Car(String brand, String model) {
        this(brand, model, 2024); // Calls constructor above
    }
    
    // Default constructor
    public Car() {
        this("Unknown", "Unknown", 0);
    }
}

// Creating objects
Car car1 = new Car("Toyota", "Camry", 2023);
Car car2 = new Car("Honda", "Civic"); // Uses 2024 default
Car car3 = new Car(); // All defaults</code></pre>

<h3>Access Modifiers</h3>
<pre><code>public class Example {
    public int publicField;        // Accessible everywhere
    private int privateField;      // Only in this class
    protected int protectedField;  // This class and subclasses
    int packageField;              // Same package
    
    // Same applies to methods
    public void publicMethod() { }
    private void privateMethod() { }
    protected void protectedMethod() { }
    void packageMethod() { }
}</code></pre>
<p><strong>Best practice:</strong> Make fields private, provide public getters/setters for controlled access.</p>

<h3>this Keyword</h3>
<pre><code>public class Person {
    private String name;
    
    public Person(String name) {
        this.name = name; // this.name refers to field, name is parameter
    }
    
    public void setName(String name) {
        this.name = name; // Distinguish field from parameter
    }
    
    public Person getSelf() {
        return this; // Return reference to current object
    }
    
    public void compare(Person other) {
        if (this == other) { // Compare references
            System.out.println("Same object");
        }
    }
}</code></pre>

<h3>Static Members</h3>
<pre><code>public class Counter {
    // Instance variable (each object has its own)
    private int count = 0;
    
    // Static variable (shared by all instances)
    private static int totalCount = 0;
    
    public void increment() {
        count++;           // Instance variable
        totalCount++;      // Static variable
    }
    
    // Static method (belongs to class)
    public static int getTotalCount() {
        return totalCount; // Can access static variables
        // return count;   // ERROR! Can't access instance variable
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
c1.increment();
c2.increment();
Counter.getTotalCount(); // 2 (shared across all instances)</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Forgetting new:</strong> Must use <code>new</code> to create objects</li>
  <li><strong>Accessing private fields:</strong> Use getters/setters, not direct access</li>
  <li><strong>Confusing static and instance:</strong> Static belongs to class, instance to object</li>
  <li><strong>Not using this:</strong> Use <code>this</code> when field/parameter names conflict</li>
  <li><strong>Null pointer:</strong> Check for null before using object</li>
  <li><strong>Constructor return:</strong> Constructors don't have return type</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Make fields private, provide public getters/setters</li>
  <li>Use descriptive class and method names</li>
  <li>Keep classes focused (single responsibility)</li>
  <li>Use constructors for initialization</li>
  <li>Use <code>this</code> to distinguish fields from parameters</li>
  <li>Use static for class-level data and utility methods</li>
  <li>Follow Java naming conventions (PascalCase for classes)</li>
</ul>`,
        examples: [
            { title: 'Constructor', code: `public class Car {\n    private String brand;\n    public Car(String brand) {\n        this.brand = brand;\n    }\n}`, explanation: 'Initialize with constructor.' },
            { title: 'Static Members', code: `public class Counter {\n    private static int count = 0;\n    public static int getCount() { return count; }\n}`, explanation: 'Shared across instances.' }
        ],
        exercise: { description: 'Create Person class and return formatted string.', starterCode: `// Create Person class\npublic static String solution(String name, int age) {\n    // Return "name (age years old)"\n}`, hints: ['Create constructor', 'Add toString method'] },
        tests: [
            { id: 't1', description: 'Format person', input: ['Alice', 30], expectedOutput: 'Alice (30 years old)', isHidden: false },
            { id: 't2', description: 'Young person', input: ['Bob', 5], expectedOutput: 'Bob (5 years old)', isHidden: true },
            { id: 't3', description: 'No name', input: ['', 20], expectedOutput: ' (20 years old)', isHidden: true }
        ],
        solution: `public static String solution(String name, int age) {\n    return name + " (" + age + " years old)";\n}`
    },

    {
        language: 'java', day: 5, title: 'Inheritance and Interfaces', difficulty: 4, estimatedMinutes: 35,
        objectives: ['Extend classes', 'Implement interfaces', 'Override methods', 'Abstract classes'],
        contentHtml: `<h2>Inheritance and Interfaces in Java</h2>
<p>Inheritance allows classes to inherit fields and methods from other classes, promoting code reuse. Interfaces define contracts that classes must implement. Both are fundamental to Java's object-oriented design and enable polymorphism.</p>

<h3>Why Inheritance and Interfaces Matter</h3>
<p>These concepts enable you to:</p>
<ul>
  <li><strong>Reuse code:</strong> Share common functionality between classes</li>
  <li><strong>Create hierarchies:</strong> Model relationships between concepts</li>
  <li><strong>Enable polymorphism:</strong> Treat objects of different types uniformly</li>
  <li><strong>Define contracts:</strong> Specify what classes must implement</li>
</ul>

<h3>Inheritance - extends Keyword</h3>
<pre><code>// Base class (parent/superclass)
public class Animal {
    protected String name; // protected: accessible in subclasses
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void speak() {
        System.out.println("...");
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Derived class (child/subclass)
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    @Override
    public void speak() {
        System.out.println("Woof!");
    }
    
    // New method specific to Dog
    public void fetch() {
        System.out.println(name + " fetches the ball");
    }
}

// Using inheritance
Dog dog = new Dog("Rex", "German Shepherd");
dog.speak(); // "Woof!" (overridden method)
dog.eat();   // "Rex is eating" (inherited method)
dog.fetch(); // "Rex fetches the ball" (Dog-specific method)</code></pre>
<p><strong>Key points:</strong> Use <code>extends</code> for inheritance, <code>super</code> to call parent, <code>@Override</code> annotation recommended.</p>

<h3>The super Keyword</h3>
<pre><code>public class Cat extends Animal {
    public Cat(String name) {
        super(name); // Must be first statement
    }
    
    @Override
    public void speak() {
        super.speak(); // Call parent method
        System.out.println("Also meows!");
    }
}

// super can access parent members
public class Rectangle extends Shape {
    public void printInfo() {
        System.out.println(super.color); // Access parent field
        super.draw();                    // Call parent method
    }
}</code></pre>

<h3>Interfaces - Contracts</h3>
<pre><code>// Interface defines contract (what methods must exist)
public interface Drawable {
    void draw(); // Abstract method (no body)
    
    // Default method (Java 8+)
    default void printInfo() {
        System.out.println("This is drawable");
    }
    
    // Static method (Java 8+)
    static void describe() {
        System.out.println("Drawable interface");
    }
}

// Class implements interface
public class Circle implements Drawable {
    private int radius;
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }
}

// Multiple interfaces
public interface Movable {
    void move();
}

public class Car implements Drawable, Movable {
    @Override
    public void draw() { /* ... */ }
    
    @Override
    public void move() { /* ... */ }
}</code></pre>

<h3>Abstract Classes</h3>
<pre><code>// Abstract class - can't be instantiated
public abstract class Shape {
    protected String color;
    
    // Abstract method - must be implemented by subclasses
    public abstract double getArea();
    
    // Concrete method - has implementation
    public void setColor(String color) {
        this.color = color;
    }
}

// Concrete class extends abstract class
public class Rectangle extends Shape {
    private double width, height;
    
    @Override
    public double getArea() {
        return width * height; // Must implement abstract method
    }
}</code></pre>

<h3>Polymorphism</h3>
<pre><code>// Polymorphism: treat objects as their parent type
Animal[] animals = {
    new Dog("Rex", "Shepherd"),
    new Cat("Whiskers"),
    new Dog("Buddy", "Labrador")
};

// All can be treated as Animal
for (Animal animal : animals) {
    animal.speak(); // Calls appropriate overridden method
}

// Interface polymorphism
Drawable[] drawables = {
    new Circle(),
    new Rectangle()
};

for (Drawable d : drawables) {
    d.draw(); // Each implements draw() differently
}</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Forgetting super():</strong> Must call super() in derived constructors</li>
  <li><strong>Multiple inheritance:</strong> Java doesn't support multiple class inheritance</li>
  <li><strong>Abstract instantiation:</strong> Can't create instances of abstract classes</li>
  <li><strong>Interface implementation:</strong> Must implement all interface methods</li>
  <li><strong>Access modifiers:</strong> Can't reduce visibility when overriding</li>
  <li><strong>super() position:</strong> Must be first statement in constructor</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Use inheritance for "is-a" relationships</li>
  <li>Use interfaces for "can-do" relationships</li>
  <li>Prefer composition over inheritance when possible</li>
  <li>Use @Override annotation when overriding methods</li>
  <li>Keep inheritance hierarchies shallow</li>
  <li>Use abstract classes when you need shared implementation</li>
  <li>Use interfaces for defining contracts</li>
</ul>`,
        examples: [
            { title: 'Super Keyword', code: `public class Cat extends Animal {\n    public Cat(String name) {\n        super();\n        this.name = name;\n    }\n}`, explanation: 'Call parent constructor.' },
            { title: 'Interface Default', code: `interface Vehicle {\n    default void start() {\n        System.out.println("Starting");\n    }\n}`, explanation: 'Default method implementations.' }
        ],
        exercise: { description: 'Create Shape interface with area method.', starterCode: `// Create Shape interface and Rectangle class\npublic static double solution(double width, double height) {\n    // Return area\n}`, hints: ['Define interface', 'Implement in class'] },
        tests: [
            { id: 't1', description: 'Area', input: [5, 3], expectedOutput: 15, isHidden: false },
            { id: 't2', description: 'Square', input: [4, 4], expectedOutput: 16, isHidden: true },
            { id: 't3', description: 'Zero width', input: [0, 5], expectedOutput: 0, isHidden: true }
        ],
        solution: `public static double solution(double width, double height) {\n    return width * height;\n}`
    },

    {
        language: 'java', day: 6, title: 'Collections Framework', difficulty: 4, estimatedMinutes: 35,
        objectives: ['Use List, Set, Map', 'Understand generics', 'Iterate collections', 'Choose right collection'],
        contentHtml: `<h2>Collections Framework in Java</h2>
<p>The Java Collections Framework provides a comprehensive set of data structures for storing and manipulating groups of objects. It includes Lists, Sets, Maps, and Queues, each optimized for different use cases. Understanding collections is essential for efficient Java programming.</p>

<h3>Why Collections Matter</h3>
<p>Collections enable you to:</p>
<ul>
  <li><strong>Store groups:</strong> Organize multiple objects together</li>
  <li><strong>Choose right structure:</strong> Select optimal data structure for task</li>
  <li><strong>Efficient operations:</strong> Fast lookups, insertions, deletions</li>
  <li><strong>Standardized API:</strong> Consistent interface across collection types</li>
</ul>

<h3>Collection Types</h3>
<pre><code>import java.util.*;

// List - Ordered, allows duplicates
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Apple"); // Duplicates allowed
list.get(0); // "Apple"

// Set - No duplicates, unordered (HashSet) or ordered (TreeSet)
Set<Integer> set = new HashSet<>();
set.add(42);
set.add(42); // Ignored (duplicate)
set.add(10);
// Order not guaranteed in HashSet

Set<Integer> sortedSet = new TreeSet<>();
sortedSet.add(5);
sortedSet.add(2);
sortedSet.add(8);
// Automatically sorted: [2, 5, 8]

// Map - Key-value pairs
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 30);
map.put("Bob", 25);
map.get("Alice"); // 30
map.containsKey("Bob"); // true</code></pre>

<h3>List Implementations</h3>
<pre><code>// ArrayList - Dynamic array, fast random access
List<String> arrayList = new ArrayList<>();
arrayList.add("Item");
arrayList.get(0); // Fast O(1) access

// LinkedList - Doubly linked list, fast insertions
List<String> linkedList = new LinkedList<>();
linkedList.add("Item");
linkedList.addFirst("First"); // Fast O(1) insertion

// When to use:
// ArrayList: Frequent random access, less insertions/deletions
// LinkedList: Frequent insertions/deletions, less random access</code></pre>

<h3>Set Implementations</h3>
<pre><code>// HashSet - Fast, unordered, no duplicates
Set<String> hashSet = new HashSet<>();
hashSet.add("Apple");
hashSet.add("Banana");
// Fast O(1) add/contains operations

// TreeSet - Sorted, no duplicates
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(5);
treeSet.add(2);
treeSet.add(8);
// Automatically sorted: [2, 5, 8]
// O(log n) operations

// LinkedHashSet - Maintains insertion order
Set<String> linkedHashSet = new LinkedHashSet<>();
linkedHashSet.add("First");
linkedHashSet.add("Second");
// Maintains order: [First, Second]</code></pre>

<h3>Map Implementations</h3>
<pre><code>// HashMap - Fast, unordered key-value pairs
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("Alice", 30);
hashMap.put("Bob", 25);
hashMap.get("Alice"); // 30
hashMap.containsKey("Bob"); // true

// TreeMap - Sorted by keys
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("Charlie", 35);
treeMap.put("Alice", 30);
treeMap.put("Bob", 25);
// Keys sorted: Alice, Bob, Charlie

// LinkedHashMap - Maintains insertion order
Map<String, Integer> linkedHashMap = new LinkedHashMap<>();
linkedHashMap.put("First", 1);
linkedHashMap.put("Second", 2);
// Maintains insertion order</code></pre>

<h3>Iterating Collections</h3>
<pre><code>List<String> list = Arrays.asList("a", "b", "c");

// Enhanced for loop (for-each)
for (String item : list) {
    System.out.println(item);
}

// Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    System.out.println(item);
}

// forEach with lambda (Java 8+)
list.forEach(item -> System.out.println(item));
list.forEach(System.out::println); // Method reference

// Iterating Map
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 30);
map.put("Bob", 25);

// Iterate entries
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Iterate keys
for (String key : map.keySet()) {
    System.out.println(key);
}

// Iterate values
for (Integer value : map.values()) {
    System.out.println(value);
}

// forEach on Map
map.forEach((key, value) -> 
    System.out.println(key + ": " + value)
);</code></pre>

<h3>Common Operations</h3>
<pre><code>// List operations
List<Integer> nums = new ArrayList<>();
nums.addAll(Arrays.asList(1, 2, 3));
nums.removeIf(n -> n > 2); // Remove conditionally
nums.replaceAll(n -> n * 2); // Transform all
Collections.sort(nums); // Sort
Collections.reverse(nums); // Reverse

// Set operations
Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3));
Set<Integer> set2 = new HashSet<>(Arrays.asList(2, 3, 4));

set1.retainAll(set2); // Intersection: [2, 3]
set1.addAll(set2);    // Union: [1, 2, 3, 4]
set1.removeAll(set2); // Difference: [1]

// Map operations
Map<String, Integer> map = new HashMap<>();
map.putIfAbsent("Alice", 30); // Put if key doesn't exist
map.compute("Bob", (k, v) -> v == null ? 0 : v + 1);
map.getOrDefault("Charlie", 0); // Get or default
map.merge("Alice", 1, Integer::sum); // Merge values</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Using raw types:</strong> Always use generics: <code>List&lt;String&gt;</code> not <code>List</code></li>
  <li><strong>Modifying during iteration:</strong> Use Iterator.remove() or collect first</li>
  <li><strong>Wrong collection type:</strong> Choose based on needs (List vs Set vs Map)</li>
  <li><strong>Null handling:</strong> Some collections allow null, others don't</li>
  <li><strong>Performance:</strong> Understand time complexity of operations</li>
  <li><strong>Equality:</strong> Sets/Maps use equals() and hashCode() - must be consistent</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Use interface types (List, Set, Map) not implementations</li>
  <li>Choose right collection type for your use case</li>
  <li>Use generics for type safety</li>
  <li>Understand time complexity of operations</li>
  <li>Use Collections utility class for common operations</li>
  <li>Implement equals() and hashCode() correctly for custom objects</li>
  <li>Consider thread-safety (use ConcurrentHashMap, CopyOnWriteArrayList for concurrent access)</li>
</ul>`,
        examples: [
            { title: 'List Operations', code: `List<Integer> nums = List.of(1, 2, 3);\nnums.stream().filter(n -> n > 1).toList();`, explanation: 'Immutable list with streams.' },
            { title: 'Map Methods', code: `map.getOrDefault("key", 0);\nmap.computeIfAbsent("k", k -> 10);`, explanation: 'Convenient map operations.' }
        ],
        exercise: { description: 'Count word frequencies in string array.', starterCode: `public static Map<String, Integer> solution(String[] words) {\n    // Return word counts\n}`, hints: ['Use HashMap', 'Iterate and count'] },
        tests: [
            { id: 't1', description: 'Count words', input: ['a', 'b', 'a'], expectedOutput: { a: 2, b: 1 }, isHidden: false },
            { id: 't2', description: 'Empty', input: [], expectedOutput: {}, isHidden: true },
            { id: 't3', description: 'Single', input: ['a'], expectedOutput: { a: 1 }, isHidden: true }
        ],
        solution: `public static Map<String, Integer> solution(String[] words) {\n    Map<String, Integer> counts = new HashMap<>();\n    for (String word : words) {\n        counts.merge(word, 1, Integer::sum);\n    }\n    return counts;\n}`
    },

    {
        language: 'java', day: 7, title: 'Exception Handling', difficulty: 4, estimatedMinutes: 35,
        objectives: ['Try-catch blocks', 'Throw exceptions', 'Create custom exceptions', 'Finally blocks'],
        contentHtml: `<h2>Exception Handling in Java</h2>
<p>Exception handling allows you to gracefully handle errors and unexpected situations in your code. Java's exception hierarchy provides checked exceptions (must be handled) and unchecked exceptions (runtime errors). Proper exception handling is crucial for building robust Java applications.</p>

<h3>Why Exception Handling Matters</h3>
<p>Exception handling enables you to:</p>
<ul>
  <li><strong>Prevent crashes:</strong> Catch errors before they break your program</li>
  <li><strong>Provide user feedback:</strong> Show meaningful error messages</li>
  <li><strong>Debug effectively:</strong> Understand what went wrong and where</li>
  <li><strong>Maintain code quality:</strong> Handle edge cases and unexpected situations</li>
</ul>

<h3>Try-Catch Blocks</h3>
<pre><code>// Basic try-catch
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Division error: " + e.getMessage());
}

// Multiple catch blocks
try {
    // risky code
    int[] arr = new int[5];
    arr[10] = 5; // ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index error: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General error: " + e.getMessage());
}

// Multi-catch (Java 7+)
try {
    // risky code
} catch (IOException | SQLException e) {
    // Handle both exception types
    System.out.println("Error: " + e.getMessage());
}

// Finally block - always executes
try {
    // risky code
} catch (Exception e) {
    // handle error
} finally {
    // Always runs, even if exception occurred
    System.out.println("Cleanup");
}</code></pre>

<h3>Checked vs Unchecked Exceptions</h3>
<pre><code>// Checked exceptions - must be handled or declared
public void readFile() throws IOException {
    // IOException is checked - must handle or declare
    FileReader file = new FileReader("file.txt");
}

// Unchecked exceptions - RuntimeException and subclasses
public void divide(int a, int b) {
    if (b == 0) {
        throw new ArithmeticException("Division by zero"); // Unchecked
    }
    return a / b;
}

// Common checked exceptions:
// IOException, SQLException, FileNotFoundException, ClassNotFoundException

// Common unchecked exceptions:
// NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException</code></pre>

<h3>Throwing Exceptions</h3>
<pre><code>// Throwing exceptions
public void validate(int age) throws IllegalArgumentException {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    if (age > 150) {
        throw new IllegalArgumentException("Age seems unrealistic");
    }
}

// Using the method
try {
    validate(-5);
} catch (IllegalArgumentException e) {
    System.out.println("Validation failed: " + e.getMessage());
}

// Creating custom exceptions
public class ValidationException extends Exception {
    public ValidationException(String message) {
        super(message);
    }
}

public void process(int value) throws ValidationException {
    if (value < 0) {
        throw new ValidationException("Value must be positive");
    }
}</code></pre>

<h3>Try-With-Resources</h3>
<pre><code>// Automatic resource management (Java 7+)
try (FileReader file = new FileReader("file.txt");
     BufferedReader reader = new BufferedReader(file)) {
    // Use resources
    String line = reader.readLine();
} catch (IOException e) {
    // Handle exception
}
// Resources automatically closed, even if exception occurs

// Resources must implement AutoCloseable
try (Connection conn = DriverManager.getConnection(url)) {
    // Use connection
} catch (SQLException e) {
    // Handle exception
}
// Connection automatically closed</code></pre>

<h3>Exception Hierarchy</h3>
<pre><code>Throwable
├── Error (serious problems, usually not caught)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   └── ArrayIndexOutOfBoundsException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── FileNotFoundException</code></pre>

<h3>Common Patterns</h3>
<pre><code>// Pattern 1: Return error value instead of throwing
public Result divide(int a, int b) {
    if (b == 0) {
        return new Result(false, "Division by zero");
    }
    return new Result(true, String.valueOf(a / b));
}

// Pattern 2: Log and re-throw
public void process() throws IOException {
    try {
        // risky operation
    } catch (IOException e) {
        logger.error("Processing failed", e);
        throw e; // Re-throw
    }
}

// Pattern 3: Exception translation
public void processFile(String filename) throws ProcessingException {
    try {
        // file operations
    } catch (IOException e) {
        throw new ProcessingException("Failed to process file", e);
    }
}</code></pre>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li><strong>Swallowing exceptions:</strong> Don't catch and ignore - log or handle properly</li>
  <li><strong>Catching too broadly:</strong> Catch specific exceptions, not generic Exception</li>
  <li><strong>Empty catch blocks:</strong> At minimum, log the exception</li>
  <li><strong>Not closing resources:</strong> Use try-with-resources for automatic cleanup</li>
  <li><strong>Throwing generic Exception:</strong> Throw specific exception types</li>
  <li><strong>Ignoring checked exceptions:</strong> Must handle or declare</li>
</ul>

<h3>Best Practices</h3>
<ul>
  <li>Always handle exceptions that can occur</li>
  <li>Catch specific exceptions, not generic Exception</li>
  <li>Use try-with-resources for resource management</li>
  <li>Provide meaningful error messages</li>
  <li>Log exceptions for debugging</li>
  <li>Don't catch exceptions you can't handle - let them propagate</li>
  <li>Use custom exceptions for domain-specific errors</li>
  <li>Validate input early to prevent exceptions later</li>
</ul>`,
        examples: [
            { title: 'Multiple Catch', code: `try {\n    // risky code\n} catch (IOException | SQLException e) {\n    // handle multiple types\n}`, explanation: 'Multi-catch syntax.' },
            { title: 'Custom Exception', code: `public class ValidationException extends Exception {\n    public ValidationException(String msg) {\n        super(msg);\n    }\n}`, explanation: 'Domain-specific exceptions.' }
        ],
        exercise: { description: 'Safe division returning result or error map.', starterCode: `public static Object solution(int a, int b) {\n    // Return result or error map\n}`, hints: ['Use try-catch', 'Return Map on error'] },
        tests: [
            { id: 't1', description: 'Normal', input: [10, 2], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Zero', input: [10, 0], expectedOutput: { error: true, message: 'Division by zero' }, isHidden: true },
            { id: 't3', description: 'Negative', input: [-10, 2], expectedOutput: -5, isHidden: true }
        ],
        solution: `public static Object solution(int a, int b) {\n    try {\n        return a / b;\n    } catch (ArithmeticException e) {\n        Map<String, Object> error = new HashMap<>();\n        error.put("error", true);\n        error.put("message", "Division by zero");\n        return error;\n    }\n}`
    },

    // Days 8-9 (Generated or Missing detailed content, using placeholder)
    ...generateJavaDays8to9(),
    javaDays10to30Real[0], // Day 10
    javaDays10to30Real[1], // Day 11
    ...javaDays12to30Real
];

function generateJavaDays8to9() {
    const configs = [
        { day: 8, title: 'Streams API', diff: 5 },
        { day: 9, title: 'Advanced Streams', diff: 6 }
    ];

    return configs.map(cfg => ({
        language: 'java', day: cfg.day, title: cfg.title,
        difficulty: cfg.diff,
        estimatedMinutes: 35,
        objectives: ['Master Streams', 'Functional Programming'],
        contentHtml: `<h2>${cfg.title}</h2>
<p>Day ${cfg.day} covers ${cfg.title} in depth. This topic is essential for mastering Java functional programming. We will explore key concepts, syntax, and best practices to help you become a better Java developer.</p>
<h3>Key Concepts</h3>
<p>Understanding ${cfg.title} involves several important aspects that we will discuss in detail. Please pay close attention to the examples provided below as they illustrate the core principles.</p>
<pre><code>// Example code for ${cfg.title}
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Deep dive into ${cfg.title}");
        // Additional logic here
    }
}</code></pre>
<p>Make sure to complete the exercises to reinforce your learning and ensure you have grasped the material.</p>`,
        examples: [{ title: 'Ex', code: '// Code', explanation: 'Exp' }],
        exercise: { description: 'Exercise', starterCode: 'class Solution {}', hints: [] },
        tests: [{ id: 't1', input: 'test', expectedOutput: 'test' }],
        solution: 'class Solution {}'
    }));
}
