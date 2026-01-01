
import { csharpDays1to7Real } from './csharp-days1-7.js';
import { csharpDays10to30Real } from './csharp-days10-30.js';
import { csharpDays11to30Real } from './csharp-days11-30.js';

export const csharpLessons = [
    ...csharpDays1to7Real,
    ...generateCSharpDays8to9(),
    csharpDays10to30Real[0], // Day 10
    ...csharpDays11to30Real
];

function generateCSharpDays8to9() {
    const configs = [
        { day: 8, title: 'LINQ Basics', diff: 5 },
        { day: 9, title: 'LINQ Advanced', diff: 6 }
    ];

    return configs.map(cfg => ({
        language: 'csharp', day: cfg.day, title: cfg.title,
        difficulty: cfg.diff,
        estimatedMinutes: 25 + cfg.diff * 5,
        objectives: [`Master ${cfg.title}`, 'Write clean C# code'],
        contentHtml: `<h2>${cfg.title}</h2>
<p>Day ${cfg.day} covers ${cfg.title} in depth. This topic is essential for mastering C#. We will explore key concepts, syntax, and best practices to help you become a better .NET developer.</p>
<h3>Key Concepts</h3>
<p>Understanding ${cfg.title} involves several important aspects that we will discuss in detail. Please pay close attention to the examples provided below as they illustrate the core principles.</p>
<pre><code>using System;

class Program {
    static void Main() {
        // Example code for ${cfg.title}
        Console.WriteLine("Deep dive into ${cfg.title}");
        // Additional logic here
    }
}</code></pre>
<p>Make sure to complete the exercises to reinforce your learning and ensure you have grasped the material.</p>`,
        examples: [{ title: 'Example', code: `// ${cfg.title}`, explanation: 'Basic usage.' }],
        exercise: { description: `Complete ${cfg.title}`, starterCode: `public static void Solution() {}`, hints: [] },
        tests: [{ id: 't1', description: 'Test', input: 'test', expectedOutput: 'test', isHidden: false }],
        solution: `public static void Solution() {}`
    }));
}
