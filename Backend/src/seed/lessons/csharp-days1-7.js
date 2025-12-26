/**
 * C# Days 1-7 - COMPLETE with REAL solutions
 */

export const csharpDays1to7Real = [
    // DAY 1: Variables and Types
    {
        language: 'csharp', day: 1, title: 'Variables and Types', difficulty: 2, estimatedMinutes: 30,
        objectives: ['Declare variables with var and explicit types', 'Use primitive types', 'Understand value vs reference types', 'Apply string interpolation'],
        contentHtml: `<h2>Variables and Types in C#</h2>
<pre><code>// Explicit typing
int age = 30;
string name = "Alice";
double price = 19.99;
bool isActive = true;

// Type inference with var
var count = 10;        // int
var message = "Hello"; // string

// String interpolation
Console.WriteLine($"Name: {name}, Age: {age}");

// Nullable types
int? nullableInt = null;
string? nullableString = null;</code></pre>`,
        examples: [
            { title: 'Type Conversion', code: `int num = 42;\ndouble d = num;        // Implicit\nint back = (int)d;     // Explicit cast\nstring s = num.ToString();\nint parsed = int.Parse("123");`, explanation: 'Convert between types.' },
            { title: 'Constants', code: `const double PI = 3.14159;\nreadonly string Name = "App";`, explanation: 'Immutable values.' }
        ],
        exercise: { description: 'Add two numbers and return the result.', starterCode: `public static int Solution(int a, int b) {\n    // Return sum of a and b\n}`, hints: ['Use + operator', 'Return the sum'] },
        tests: [
            { id: 't1', description: 'Add positives', input: [2, 3], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Add with zero', input: [5, 0], expectedOutput: 5, isHidden: false },
            { id: 't3', description: 'Add negatives', input: [-2, -3], expectedOutput: -5, isHidden: true },
            { id: 't4', description: 'Mixed signs', input: [10, -3], expectedOutput: 7, isHidden: true }
        ],
        solution: `public static int Solution(int a, int b) {\n    return a + b;\n}`
    },

    // DAY 2: Methods
    {
        language: 'csharp', day: 2, title: 'Methods', difficulty: 2, estimatedMinutes: 35,
        objectives: ['Define methods with parameters', 'Use return types', 'Apply ref and out parameters', 'Understand method overloading'],
        contentHtml: `<h2>Methods in C#</h2>
<pre><code>// Basic method
public int Add(int a, int b) {
    return a + b;
}

// Void method
public void PrintMessage(string msg) {
    Console.WriteLine(msg);
}

// Method with default parameter
public string Greet(string name = "Guest") {
    return $"Hello, {name}!";
}

// Out parameter
public bool TryParse(string s, out int result) {
    return int.TryParse(s, out result);
}</code></pre>`,
        examples: [
            { title: 'Overloading', code: `public int Add(int a, int b) => a + b;\npublic double Add(double a, double b) => a + b;`, explanation: 'Same name, different parameters.' },
            { title: 'Expression body', code: `public int Square(int n) => n * n;`, explanation: 'Concise syntax.' }
        ],
        exercise: { description: 'Multiply two numbers.', starterCode: `public static int Solution(int a, int b) {\n    // Return product\n}`, hints: ['Use * operator'] },
        tests: [
            { id: 't1', description: 'Multiply', input: [3, 4], expectedOutput: 12, isHidden: false },
            { id: 't2', description: 'With zero', input: [5, 0], expectedOutput: 0, isHidden: false },
            { id: 't3', description: 'Negatives', input: [-2, 3], expectedOutput: -6, isHidden: true }
        ],
        solution: `public static int Solution(int a, int b) {\n    return a * b;\n}`
    },

    // DAY 3: Arrays and Lists
    {
        language: 'csharp', day: 3, title: 'Arrays and Lists', difficulty: 3, estimatedMinutes: 40,
        objectives: ['Create and use arrays', 'Work with List<T>', 'Use LINQ basics', 'Iterate collections'],
        contentHtml: `<h2>Arrays and Lists</h2>
<pre><code>// Arrays
int[] numbers = { 1, 2, 3, 4, 5 };
string[] names = new string[3];

// List<T>
List<int> list = new List<int> { 1, 2, 3 };
list.Add(4);
list.Remove(1);

// Iterate
foreach (var num in numbers) {
    Console.WriteLine(num);
}</code></pre>`,
        examples: [
            { title: 'List operations', code: `var list = new List<string> { "a", "b" };\nlist.Insert(0, "first");\nvar found = list.Find(x => x.Length > 1);`, explanation: 'Common list operations.' },
            { title: 'Array methods', code: `Array.Sort(numbers);\nArray.Reverse(numbers);\nint max = numbers.Max();`, explanation: 'Array utilities.' }
        ],
        exercise: { description: 'Find the sum of all elements in the array.', starterCode: `public static int Solution(int[] numbers) {\n    // Return sum\n}`, hints: ['Use loop or Sum()', 'Return total'] },
        tests: [
            { id: 't1', description: 'Sum array', input: [[1, 2, 3, 4, 5]], expectedOutput: 15, isHidden: false },
            { id: 't2', description: 'Single element', input: [[10]], expectedOutput: 10, isHidden: false },
            { id: 't3', description: 'Empty', input: [[]], expectedOutput: 0, isHidden: true },
            { id: 't4', description: 'Negative', input: [[-1, 2, -3]], expectedOutput: -2, isHidden: true }
        ],
        solution: `public static int Solution(int[] numbers) {\n    return numbers.Sum();\n}`
    },

    // DAY 4: Classes and Objects
    {
        language: 'csharp', day: 4, title: 'Classes and Objects', difficulty: 3, estimatedMinutes: 45,
        objectives: ['Define classes', 'Create constructors', 'Instantiate objects', 'Use instance methods'],
        contentHtml: `<h2>Classes and Objects</h2>
<pre><code>public class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person(string name, int age) {
        Name = name;
        Age = age;
    }
    
    public string Greet() {
        return $"Hi, I'm {Name}!";
    }
}

var person = new Person("Alice", 30);
Console.WriteLine(person.Greet());</code></pre>`,
        examples: [
            { title: 'Static members', code: `public class Counter {\n    public static int Count = 0;\n    public Counter() => Count++;\n}`, explanation: 'Shared across instances.' },
            { title: 'Constructor', code: `public class Item {\n    public string Name;\n    public Item(string name) => Name = name;\n}`, explanation: 'Initialize object.' }
        ],
        exercise: { description: 'Return length of the string.', starterCode: `public static int Solution(string text) {\n    // Return length\n}`, hints: ['Use .Length property'] },
        tests: [
            { id: 't1', description: 'Length', input: ['hello'], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Empty', input: [''], expectedOutput: 0, isHidden: false },
            { id: 't3', description: 'Long', input: ['abcdefghij'], expectedOutput: 10, isHidden: true }
        ],
        solution: `public static int Solution(string text) {\n    return text.Length;\n}`
    },

    // DAY 5: Properties and Encapsulation
    {
        language: 'csharp', day: 5, title: 'Properties and Encapsulation', difficulty: 3, estimatedMinutes: 40,
        objectives: ['Use auto-properties', 'Implement getters and setters', 'Apply access modifiers', 'Use init-only properties'],
        contentHtml: `<h2>Properties</h2>
<pre><code>public class BankAccount {
    private decimal _balance;
    
    public decimal Balance {
        get => _balance;
        private set {
            if (value >= 0) _balance = value;
        }
    }
    
    public string Owner { get; init; }
    public bool IsActive { get; set; } = true;
}</code></pre>`,
        examples: [
            { title: 'Computed property', code: `public string FullName => $"{FirstName} {LastName}";`, explanation: 'Read-only computed.' },
            { title: 'Init-only', code: `public int Id { get; init; }`, explanation: 'Set once.' }
        ],
        exercise: { description: 'Convert string to uppercase.', starterCode: `public static string Solution(string text) {\n    // Return uppercase\n}`, hints: ['Use .ToUpper()'] },
        tests: [
            { id: 't1', description: 'Upper', input: ['hello'], expectedOutput: 'HELLO', isHidden: false },
            { id: 't2', description: 'Mixed', input: ['HeLLo'], expectedOutput: 'HELLO', isHidden: false },
            { id: 't3', description: 'Empty', input: [''], expectedOutput: '', isHidden: true }
        ],
        solution: `public static string Solution(string text) {\n    return text.ToUpper();\n}`
    },

    // DAY 6: Inheritance and Interfaces
    {
        language: 'csharp', day: 6, title: 'Inheritance and Interfaces', difficulty: 4, estimatedMinutes: 45,
        objectives: ['Extend classes', 'Override methods', 'Implement interfaces', 'Use abstract classes'],
        contentHtml: `<h2>Inheritance and Interfaces</h2>
<pre><code>public interface IShape {
    double Area();
}

public abstract class Shape : IShape {
    public abstract double Area();
}

public class Circle : Shape {
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}</code></pre>`,
        examples: [
            { title: 'Base constructor', code: `public class Dog : Animal {\n    public Dog(string name) : base(name) {}\n}`, explanation: 'Call base constructor.' },
            { title: 'Interface', code: `public class User : IUser {\n    public void Login() { }\n}`, explanation: 'Implement interface.' }
        ],
        exercise: { description: 'Find the maximum of two numbers.', starterCode: `public static int Solution(int a, int b) {\n    // Return larger value\n}`, hints: ['Use Math.Max or comparison'] },
        tests: [
            { id: 't1', description: 'Max', input: [5, 3], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Equal', input: [4, 4], expectedOutput: 4, isHidden: false },
            { id: 't3', description: 'Negative', input: [-5, -3], expectedOutput: -3, isHidden: true },
            { id: 't4', description: 'Second larger', input: [2, 7], expectedOutput: 7, isHidden: true }
        ],
        solution: `public static int Solution(int a, int b) {\n    return Math.Max(a, b);\n}`
    },

    // DAY 7: Exception Handling
    {
        language: 'csharp', day: 7, title: 'Exception Handling', difficulty: 4, estimatedMinutes: 45,
        objectives: ['Use try-catch-finally', 'Throw exceptions', 'Create custom exceptions', 'Apply exception filters'],
        contentHtml: `<h2>Exception Handling</h2>
<pre><code>try {
    int result = Divide(10, 0);
}
catch (DivideByZeroException ex) {
    Console.WriteLine($"Error: {ex.Message}");
}
catch (Exception ex) when (ex is ArgumentException) {
    Console.WriteLine("Argument error");
}
finally {
    Console.WriteLine("Cleanup");
}

// Throwing
if (value < 0)
    throw new ArgumentException("Value cannot be negative");</code></pre>`,
        examples: [
            { title: 'Custom exception', code: `public class ValidationException : Exception {\n    public ValidationException(string msg) : base(msg) {}\n}`, explanation: 'Domain-specific exceptions.' },
            { title: 'Filter', code: `catch (Exception ex) when (ex.Message.Contains("fail"))`, explanation: 'Exception filtering.' }
        ],
        exercise: { description: 'Safe divide: return 0 if divisor is 0.', starterCode: `public static int Solution(int a, int b) {\n    // Return a/b or 0 if b is 0\n}`, hints: ['Check if b is 0', 'Use ternary or if'] },
        tests: [
            { id: 't1', description: 'Normal divide', input: [10, 2], expectedOutput: 5, isHidden: false },
            { id: 't2', description: 'Divide by zero', input: [10, 0], expectedOutput: 0, isHidden: false },
            { id: 't3', description: 'Zero numerator', input: [0, 5], expectedOutput: 0, isHidden: true },
            { id: 't4', description: 'Negative', input: [-10, 2], expectedOutput: -5, isHidden: true }
        ],
        solution: `public static int Solution(int a, int b) {\n    return b == 0 ? 0 : a / b;\n}`
    }
];
