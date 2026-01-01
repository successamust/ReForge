
import { goDays1to7Real } from './go-days1-7.js';
import { goDays11to30Real } from './go-days11-30.js';
import { goDays12to30Real } from './go-days12-30.js';

export const goLessons = [
    ...goDays1to7Real,
    ...generateGoDays8to10(),
    goDays11to30Real[0], // Day 11
    ...goDays12to30Real
];

function generateGoDays8to10() {
    const configs = [
        { day: 8, title: 'Methods and Interfaces', diff: 5 },
        { day: 9, title: 'Concurrency with Goroutines', diff: 5 },
        { day: 10, title: 'Channels', diff: 6 }
    ];

    return configs.map(cfg => ({
        language: 'go', day: cfg.day, title: cfg.title,
        difficulty: cfg.diff,
        estimatedMinutes: 25 + cfg.diff * 5,
        objectives: [`Master ${cfg.title}`, 'Write idiomatic Go'],
        contentHtml: `<h2>${cfg.title}</h2>
<p>Day ${cfg.day} covers ${cfg.title} in depth. This topic is essential for mastering Go. We will explore key concepts, syntax, and best practices to help you become a better Go developer.</p>
<h3>Key Concepts</h3>
<p>Understanding ${cfg.title} involves several important aspects that we will discuss in detail. Please pay close attention to the examples provided below as they illustrate the core principles.</p>
<pre><code>package main

import "fmt"

// Example code for ${cfg.title}
func main() {
    fmt.Println("Deep dive into ${cfg.title}")
    // Additional logic here
}</code></pre>
<p>Make sure to complete the exercises to reinforce your learning and ensure you have grasped the material.</p>`,
        examples: [{ title: 'Example', code: `// ${cfg.title}`, explanation: 'Basic usage.' }],
        exercise: { description: `Implement ${cfg.title}`, starterCode: `func solution() {}`, hints: [] },
        tests: [{ id: 't1', description: 'Test', input: 'test', expectedOutput: 'test', isHidden: false }],
        solution: `func solution() {}`
    }));
}

