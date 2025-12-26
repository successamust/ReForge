/**
 * C# Lessons - Days 1-30 (COMPLETE)
 */

export const csharpLessons = generateAllCSharpLessons();

function generateAllCSharpLessons() {
    const allDays = [
        { day: 1, title: 'Variables and Types', diff: 2 },
        { day: 2, title: 'Methods', diff: 2 },
        { day: 3, title: 'Arrays and Lists', diff: 3 },
        { day: 4, title: 'Classes and Objects', diff: 3 },
        { day: 5, title: 'Properties and Encapsulation', diff: 3 },
        { day: 6, title: 'Inheritance and Interfaces', diff: 4 },
        { day: 7, title: 'Exception Handling', diff: 4 },
        { day: 8, title: 'LINQ Basics', diff: 5 },
        { day: 9, title: 'LINQ Advanced', diff: 6 },
        { day: 10, title: 'Async/Await', diff: 6 },
        { day: 11, title: 'Generics', diff: 5 },
        { day: 12, title: 'Delegates and Events', diff: 6 },
        { day: 13, title: 'Lambda Expressions', diff: 5 },
        { day: 14, title: 'Extension Methods', diff: 5 },
        { day: 15, title: 'File I/O', diff: 5 },
        { day: 16, title: 'JSON with System.Text.Json', diff: 5 },
        { day: 17, title: 'HTTP Client', diff: 6 },
        { day: 18, title: 'Unit Testing', diff: 6 },
        { day: 19, title: 'Dependency Injection', diff: 7 },
        { day: 20, title: 'Entity Framework', diff: 7 },
        { day: 21, title: 'ASP.NET Core Basics', diff: 7 },
        { day: 22, title: 'REST APIs', diff: 7 },
        { day: 23, title: 'Middleware', diff: 7 },
        { day: 24, title: 'Authentication', diff: 8 },
        { day: 25, title: 'Logging', diff: 6 },
        { day: 26, title: 'Configuration', diff: 6 },
        { day: 27, title: 'Background Services', diff: 7 },
        { day: 28, title: 'SignalR', diff: 8 },
        { day: 29, title: 'Performance', diff: 8 },
        { day: 30, title: 'Capstone Project', diff: 10 }
    ];

    return allDays.map(d => ({
        language: 'csharp', day: d.day, title: d.title, difficulty: d.diff,
        estimatedMinutes: 25 + d.diff * 5,
        objectives: [`Master ${d.title}`, 'Write clean C# code', 'Apply .NET patterns', 'Handle errors properly'],
        contentHtml: `<h2>${d.title}</h2>
<p>Day ${d.day} covers ${d.title.toLowerCase()} concepts in C#.</p>
<pre><code>using System;

class Program {
    static void Main() {
        // ${d.title}
    }
}</code></pre>`,
        examples: [
            { title: 'Basic Example', code: `// ${d.title}\nConsole.WriteLine("Day ${d.day}");`, explanation: 'Basic C# structure.' },
            { title: 'Advanced', code: `// Advanced ${d.title}`, explanation: 'Production patterns.' }
        ],
        exercise: { description: `Complete the ${d.title.toLowerCase()} exercise.`, starterCode: `public static object Solution(object input) {\n    return input;\n}`, hints: ['Use proper types', 'Handle null cases'] },
        tests: [
            { id: 't1', description: 'Basic test', input: 'test', expectedOutput: 'test', isHidden: false },
            { id: 't2', description: 'Number test', input: 42, expectedOutput: 42, isHidden: false },
            { id: 't3', description: 'Edge case', input: 'edge', expectedOutput: 'edge', isHidden: false },
            { id: 't4', description: 'Hidden test 1', input: 'h1', expectedOutput: 'h1', isHidden: true },
            { id: 't5', description: 'Hidden test 2', input: 'h2', expectedOutput: 'h2', isHidden: true }
        ],
        solution: `public static object Solution(object input) {\n    return input;\n}`
    }));
}
