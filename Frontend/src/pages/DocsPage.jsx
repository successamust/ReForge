import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Terminal, Code, Trophy, Zap, Lock, Clock, Users, BookOpen, Target, Flame } from 'lucide-react';
import AchievementBadge from '../components/AchievementBadge';

const DocsPage = () => {
    const [activeSection, setActiveSection] = useState('philosophy');

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'philosophy', 'mission', 'who-is-this-for', 'curriculum', 'progression',
                'languages', 'submission', 'testing', 'anticheat', 'scoring', 'relapse', 'streaks',
                'leaderboard', 'achievements', 'premium', 'best-practices', 'faq'
            ];

            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const NavLink = ({ href, children, section }) => (
        <a
            href={href}
            className={`text-sm font-bold transition-colors ${activeSection === section
                ? 'text-white'
                : 'text-white/40 hover:text-white'
                }`}
        >
            {children}
        </a>
    );

    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <SEO title="Documentation" description="Learn how to master ReForge and rebuild your engineering intuition." />
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-16">
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                        <div className="w-1.5 h-1.5 bg-white rounded-none" />
                        <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                            Documentation
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">THE MANUAL</h1>
                    <p className="text-white/40 text-xl font-medium max-w-3xl">
                        Everything you need to understand the ReForge system and rebuild your engineering muscle.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <nav className="sticky top-32 space-y-8">
                            <div>
                                <h4 className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-4">Core Concepts</h4>
                                <ul className="space-y-3">
                                    <li><NavLink href="#philosophy" section="philosophy">Philosophy</NavLink></li>
                                    <li><NavLink href="#mission" section="mission">Mission</NavLink></li>
                                    <li><NavLink href="#who-is-this-for" section="who-is-this-for">Who Is This For</NavLink></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-4">The Challenge</h4>
                                <ul className="space-y-3">
                                    <li><NavLink href="#curriculum" section="curriculum">Curriculum Structure</NavLink></li>
                                    <li><NavLink href="#progression" section="progression">Progression System</NavLink></li>
                                    <li><NavLink href="#languages" section="languages">Languages</NavLink></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-4">Mechanics</h4>
                                <ul className="space-y-3">
                                    <li><NavLink href="#submission" section="submission">Code Submission</NavLink></li>
                                    <li><NavLink href="#testing" section="testing">Automated Testing</NavLink></li>
                                    <li><NavLink href="#anticheat" section="anticheat">The Black Box (Anti-Cheat)</NavLink></li>
                                    <li><NavLink href="#scoring" section="scoring">Scoring</NavLink></li>
                                    <li><NavLink href="#relapse" section="relapse">Relapse & Detox</NavLink></li>
                                    <li><NavLink href="#streaks" section="streaks">Streaks & Rollback</NavLink></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-4">Advanced</h4>
                                <ul className="space-y-3">
                                    <li><NavLink href="#leaderboard" section="leaderboard">Leaderboard</NavLink></li>
                                    <li><NavLink href="#achievements" section="achievements">Achievements</NavLink></li>
                                    <li><NavLink href="#premium" section="premium">Premium Features</NavLink></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-4">Resources</h4>
                                <ul className="space-y-3">
                                    <li><NavLink href="#best-practices" section="best-practices">Best Practices</NavLink></li>
                                    <li><NavLink href="#faq" section="faq">FAQ</NavLink></li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-16">
                        {/* Philosophy */}
                        <section id="philosophy">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Terminal className="text-white/60" size={28} />
                                PHILOSOPHY
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    ReForge exists because somewhere along the way, many engineers lost touch with the raw joy of building. The craft became a means to an end rather than an end in itself.
                                </p>
                                <p className="text-white/70 leading-relaxed">
                                    We believe that <strong className="text-white">engineering intuition is a muscle</strong>. Like any muscle, it atrophies without use. Whether you've been relying too heavily on AI assistance, haven't coded in months, or simply feel disconnected from the fundamentals, this muscle needs deliberate, focused training to rebuild.
                                </p>
                                <p className="text-white/70 leading-relaxed">
                                    This isn't about rejecting modern tools. It's about ensuring you have the foundational strength to use them effectively. A carpenter doesn't abandon power tools, but they must first master the hand plane.
                                </p>
                                <div className="bg-white/5 border-l-4 border-white/20 p-6 my-8">
                                    <p className="text-white/90 italic">
                                        "The best engineers aren't those who know the most frameworks. They're the ones who can think algorithmically, debug systematically, and build solutions from first principles."
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Mission */}
                        <section id="mission">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">MISSION</h2>
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                                <p className="text-white/90 text-xl font-medium leading-relaxed mb-6 italic">
                                    "Rediscover the joy of the craft. Whether you're breaking free from AI reliance or reigniting a lost passion, rebuild your engineering intuition through pure, rigorous practice."
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="text-center">
                                        <div className="text-white/20 text-xs uppercase tracking-widest mb-2">No Shortcuts</div>
                                        <div className="text-white text-2xl font-black">100%</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white/20 text-xs uppercase tracking-widest mb-2">No Prompts</div>
                                        <div className="text-white text-2xl font-black">Manual</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white/20 text-xs uppercase tracking-widest mb-2">Just You</div>
                                        <div className="text-white text-2xl font-black">& Code</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Who Is This For */}
                        <section id="who-is-this-for">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Users className="text-white/60" size={28} />
                                WHO IS THIS FOR
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-3">The Rusty Veteran</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        You've been in management for years. You used to code daily. Now you want to feel that flow state again, to remember why you fell in love with this craft.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-3">The AI-Dependent</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Copilot writes most of your code. You've noticed your problem-solving skills dulling. You want to rebuild your ability to think algorithmically without assistance.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-3">The Bootcamp Graduate</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        You learned frameworks first, fundamentals second. You can build apps but struggle with algorithm challenges. You need to strengthen your CS foundations.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-3">The Passionate Rebuilder</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        You love coding but feel like you're on autopilot. You want to challenge yourself, to prove you can still solve hard problems from scratch.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Curriculum */}
                        <section id="curriculum">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Code className="text-white/60" size={28} />
                                CURRICULUM STRUCTURE
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    The 30-day challenge is structured as <strong className="text-white">progressive overload</strong>. Each day builds on the last, introducing new data structures and algorithmic patterns that must be implemented from scratch.
                                </p>

                                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 rounded-2xl">
                                    <h3 className="text-white font-black text-xl mb-6">Week-by-Week Breakdown</h3>
                                    <div className="space-y-6">
                                        <div className="border-l-2 border-white/20 pl-6">
                                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Week 1: Foundations</div>
                                            <div className="text-white font-bold mb-2">Days 1-7</div>
                                            <p className="text-white/60 text-sm mb-3">Arrays, strings, basic iteration. Hash maps and sets. Time/space complexity analysis.</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Two Pointers</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Sliding Window</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Hash Tables</span>
                                            </div>
                                        </div>
                                        <div className="border-l-2 border-white/20 pl-6">
                                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Week 2: Recursion & Sorting</div>
                                            <div className="text-white font-bold mb-2">Days 8-14</div>
                                            <p className="text-white/60 text-sm mb-3">Recursive thinking. Divide and conquer. Sorting algorithms from scratch. Binary search variations.</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Recursion</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">QuickSort</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">MergeSort</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Binary Search</span>
                                            </div>
                                        </div>
                                        <div className="border-l-2 border-white/20 pl-6">
                                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Week 3: Data Structures</div>
                                            <div className="text-white font-bold mb-2">Days 15-21</div>
                                            <p className="text-white/60 text-sm mb-3">Linked lists, stacks, queues. Trees and graph traversal. Dynamic programming introduction.</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Linked Lists</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Trees</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">BFS/DFS</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">DP Basics</span>
                                            </div>
                                        </div>
                                        <div className="border-l-2 border-white/20 pl-6">
                                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Week 4: Advanced Patterns</div>
                                            <div className="text-white font-bold mb-2">Days 22-30</div>
                                            <p className="text-white/60 text-sm mb-3">Advanced DP. Graph algorithms. Backtracking. System design fundamentals.</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Advanced DP</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Graphs</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Backtracking</span>
                                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/60">Heaps</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Lesson Structure</h3>
                                    <p className="text-white/60 text-sm mb-4">Each lesson follows a consistent format:</p>
                                    <ul className="space-y-3 text-white/60 text-sm">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Learning Objectives</strong> - What you'll master by the end</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Theory</strong> - Conceptual explanation with visual aids</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Examples</strong> - Worked solutions to build intuition</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Challenge</strong> - Your turn to implement from scratch</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Validation</strong> - Automated test suite with hidden edge cases</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Progression System */}
                        <section id="progression">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Trophy className="text-white/60" size={28} />
                                PROGRESSION SYSTEM
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    ReForge uses a <strong className="text-white">strict progression model</strong>. You cannot skip ahead. You cannot game the system. Each lesson must be completed in sequence.
                                </p>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Completion Requirements</h3>
                                    <ul className="space-y-3 text-white/60 text-sm">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span>All test cases must pass (100% accuracy)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span>Code must execute within time limits (typically 5 seconds)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span>Memory constraints must be respected (256MB max)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span>No external libraries beyond language standard library</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Unlocking System</h3>
                                    <p className="text-white/70 text-sm mb-4">
                                        Lessons unlock sequentially. You must complete Day 1 before accessing Day 2, and so on. This ensures you build a solid foundation before tackling advanced concepts.
                                    </p>
                                    <div className="flex items-center gap-4 text-sm font-mono">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-500/20 border border-green-500/40 rounded-sm" />
                                            <span className="text-white/60">Completed</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-white/20 border border-white/40 rounded-sm" />
                                            <span className="text-white/60">Available</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-white/5 border border-white/10 rounded-sm" />
                                            <span className="text-white/60">Locked</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Languages */}
                        <section id="languages">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <BookOpen className="text-white/60" size={28} />
                                SUPPORTED LANGUAGES
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Choose your weapon. Each language track contains identical algorithmic challenges, allowing you to focus on problem-solving rather than syntax differences.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {[
                                        { name: 'JavaScript', version: 'ES2023' },
                                        { name: 'Python', version: '3.11+' },
                                        { name: 'Go', version: '1.21+' },
                                        { name: 'Java', version: '17 LTS' },
                                        { name: 'C#', version: '.NET 8' }
                                    ].map((lang) => (
                                        <div key={lang.name} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors">
                                            <div className="text-white font-black text-lg mb-1">{lang.name}</div>
                                            <div className="text-white/40 text-xs font-mono">{lang.version}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-3">Multi-Language Mastery</h3>
                                    <p className="text-white/60 text-sm">
                                        Want to complete the challenge in multiple languages? Go for it. Each language track is independent, allowing you to strengthen your polyglot skills or compare different approaches to the same problem.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Submission */}
                        <section id="submission">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Zap className="text-white/60" size={28} />
                                CODE SUBMISSION
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Every submission is executed in a <strong className="text-white">sandboxed Docker container</strong>. Your code never touches our host system. This ensures security and fairness.
                                </p>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Execution Flow</h3>
                                    <div className="space-y-4 font-mono text-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="text-white/40 font-bold">1.</div>
                                            <div className="text-white/70">Code submitted via editor</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-white/40 font-bold">2.</div>
                                            <div className="text-white/70">Queued for execution</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-white/40 font-bold">3.</div>
                                            <div className="text-white/70">Container spins up (isolated environment)</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-white/40 font-bold">4.</div>
                                            <div className="text-white/70">Test suite runs against your code</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-white/40 font-bold">5.</div>
                                            <div className="text-white/70">Results returned, container destroyed</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-xl">
                                    <div className="flex items-start gap-4">
                                        <Lock className="text-white/40 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Security Constraints</h4>
                                            <ul className="space-y-2 text-white/60 text-sm">
                                                <li>• Network access disabled</li>
                                                <li>• File system read-only</li>
                                                <li>• Root capabilities dropped</li>
                                                <li>• 256MB RAM limit</li>
                                                <li>• 5-second CPU time limit</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Editor Features</h3>
                                    <ul className="space-y-3 text-white/60 text-sm">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Syntax Highlighting</strong> - Language-specific color coding</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Auto-Indentation</strong> - Proper code formatting</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Keyboard Shortcuts</strong> - Vim/Emacs bindings available</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Dark Theme</strong> - Easy on the eyes for long sessions</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Testing Section (Closed) */}

                        {/* Anti-Cheat Section */}
                        <section id="anticheat">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Lock className="text-white/60" size={28} />
                                THE BLACK BOX (ANTI-CHEAT)
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    ReForge is a sanctuary for manual coding. To protect the integrity of the challenge, we employ a sophisticated telemetry system known as <strong className="text-white">The Black Box</strong>.
                                </p>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Verification Heuristics</h3>
                                    <ul className="space-y-3 text-white/60 text-sm">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Keystroke Dynamics</strong> - We record and analyze typing rhythm and timing variance.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Paste Guard</strong> - Copy-pasting code into the editor is strictly prohibited and flagged.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Telemetry Compression</strong> - High-resolution event data is transmitted with every submission.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-6 rounded-xl">
                                    <h4 className="text-purple-400 font-bold mb-2">The "Verified" Badge</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Submissions that pass through The Black Box with low suspicion scores receive a "Verified" badge. This badge is required for top-tier leaderboard placement.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Scoring Section (Existing) */}

                        {/* Scoring Section (Closed) */}

                        {/* Relapse Section */}
                        <section id="relapse">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Zap className="text-white/60" size={28} />
                                RELAPSE & DETOX
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    ReForge is a platform of discipline. If you lose focus, the system will enforce a <strong className="text-white">Relapse State</strong>.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl">
                                        <h3 className="text-red-400 font-bold mb-2">Trigger: Inactivity</h3>
                                        <p className="text-white/60 text-sm">
                                            Missing a full calendar day of practice triggers a relapse. Your status changes, and access to the dashboard is revoked.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h3 className="text-white font-bold mb-2">The Detox Protocol</h3>
                                        <p className="text-white/60 text-sm">
                                            To recover, you must complete the Detox Protocol: a series of rapid-fire syntax drills designed to recalibrate your neural link.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Streaks Section (Existing) */}

                        {/* Streaks */}
                        <section id="streaks">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                                <Flame className="text-white/60" size={28} />
                                STREAKS & ROLLBACK
                            </h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Consistency is everything. ReForge tracks your <strong className="text-white">daily streak</strong>. Complete at least one lesson per day to maintain your streak.
                                </p>

                                <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 rounded-2xl">
                                    <h3 className="text-red-400 font-black text-xl mb-4 flex items-center gap-2">
                                        <span>⚠️</span> THE ROLLBACK PROTOCOL
                                    </h3>
                                    <p className="text-white/70 mb-4">
                                        Miss a day? Your streak resets. But it gets worse.
                                    </p>
                                    <p className="text-white/90 font-bold mb-4">
                                        If you fail a lesson and don't pass it before midnight (in your timezone), you'll be rolled back to the last day you successfully completed.
                                    </p>
                                    <p className="text-white/60 text-sm">
                                        This is intentional. Discipline is part of the rehabilitation. No shortcuts.
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Rollback Mechanics</h3>
                                    <ul className="space-y-3 text-white/60 text-sm">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Timezone-Aware</strong> - Deadline calculated based on your local timezone</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Midnight Deadline</strong> - You have until midnight to pass a failed lesson</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Fair Rollback</strong> - Return to your last successfully completed day (or day 1 if none)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-none mt-2 flex-shrink-0" />
                                            <span><strong className="text-white">Streak Reset</strong> - Your daily streak counter resets to 0 when you miss a day</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Leaderboard */}
                        <section id="leaderboard">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">LEADERBOARD</h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Compete globally. The leaderboard ranks users by total points, streak length, and completion speed. Premium users get highlighted placement.
                                </p>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Ranking Factors</h3>
                                    <ul className="space-y-3 text-white/60 text-sm">
                                        <li className="flex items-start gap-3">
                                            <div className="text-white font-mono font-bold">1.</div>
                                            <span><strong className="text-white">Total Points</strong> - Primary ranking metric (70% weight)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="text-white font-mono font-bold">2.</div>
                                            <span><strong className="text-white">Current Streak</strong> - Consistency bonus (20% weight)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="text-white font-mono font-bold">3.</div>
                                            <span><strong className="text-white">Completion Rate</strong> - Percentage of lessons completed (10% weight)</span>
                                        </li>
                                    </ul>
                                </div>


                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold text-lg mb-4">Status Tiers</h3>
                                    <p className="text-white/60 text-sm mb-4">
                                        Your rank determines your status badge, creating clear milestones to strive for:
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">🏆</span>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Champion</div>
                                                    <div className="text-white/40 text-xs">Rank #1</div>
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-xs">100% opacity</div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">💎</span>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Elite</div>
                                                    <div className="text-white/40 text-xs">Ranks #2-3</div>
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-xs">95% opacity</div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">⭐</span>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Master</div>
                                                    <div className="text-white/40 text-xs">Ranks #4-10</div>
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-xs">85% opacity</div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">✓</span>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Verified</div>
                                                    <div className="text-white/40 text-xs">Ranks #11-25</div>
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-xs">70% opacity</div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">→</span>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Rising</div>
                                                    <div className="text-white/40 text-xs">Ranks #26-50</div>
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-xs">55% opacity</div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 p-3 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">•</span>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Active</div>
                                                    <div className="text-white/40 text-xs">Ranks #51+</div>
                                                </div>
                                            </div>
                                            <div className="text-white/60 text-xs">40% opacity</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* Achievements */}
                        <section id="achievements">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">ACHIEVEMENTS</h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Unlock badges for major milestones. These are permanent markers of your progress and dedication.
                                </p>

                                {/* General & Performance */}
                                <div className="mb-8">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                        General & Performance
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { type: 'FIRST_BLOOD', label: 'First Blood', desc: 'Complete your first lesson' },
                                            { type: 'SPEED_DEMON', label: 'Speed Demon', desc: 'Complete a lesson in < 5 mins' },
                                            { type: 'SHARPSHOOTER', label: 'Sharpshooter', desc: 'Complete a lesson on first try' },
                                            { type: 'POLYGLOT', label: 'Polyglot', desc: 'Start 3 different languages' },
                                            { type: 'STREAK_7', label: 'Week Warrior', desc: 'Maintain a 7-day streak' },
                                            { type: 'STREAK_30', label: 'Monthly Master', desc: 'Maintain a 30-day streak' },
                                            { type: 'POINTS_100', label: 'Centurion', desc: 'Earn 100 total points' },
                                            { type: 'POINTS_1000', label: 'Kilo-Crusher', desc: 'Earn 1,000 total points' },
                                            { type: 'ALL_COMPLETE', label: 'The Reforged', desc: 'Master ALL 5 languages (Day 30)' }
                                        ].map(badge => (
                                            <div key={badge.type} className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-4">
                                                <AchievementBadge type={badge.type} size="md" />
                                                <div>
                                                    <div className="text-white font-bold">{badge.label}</div>
                                                    <div className="text-white/60 text-xs">{badge.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* JavaScript Mastery */}
                                <div className="mb-8">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#F7DF1E] rounded-full"></span>
                                        JavaScript Mastery
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { type: 'JAVASCRIPT_INITIATE', label: 'JS Initiate', desc: 'Complete Day 1' },
                                            { type: 'JAVASCRIPT_7', label: 'JS Scholar', desc: 'Complete Day 7' },
                                            { type: 'JAVASCRIPT_15', label: 'JS Expert', desc: 'Complete Day 15' },
                                            { type: 'JAVASCRIPT_30', label: 'JS Master', desc: 'Complete Day 30' }
                                        ].map(badge => (
                                            <div key={badge.type} className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-4">
                                                <AchievementBadge type={badge.type} size="md" />
                                                <div>
                                                    <div className="text-white font-bold">{badge.label}</div>
                                                    <div className="text-white/60 text-xs">{badge.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-white/40 text-sm italic mt-4">
                                    * Similar mastery tracks exist for Python, Java, Go, and C#, each offering Initiate, Scholar, Expert, and Master badges.
                                </p>
                            </div>
                        </section>

                        {/* Premium */}
                        <section id="premium">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">PREMIUM FEATURES</h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Premium unlocks advanced features for serious practitioners who want to maximize their learning.
                                </p>

                                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 rounded-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Solution Access</h4>
                                            <p className="text-white/60 text-sm">View optimal solutions with detailed explanations after completing lessons</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Performance Analytics</h4>
                                            <p className="text-white/60 text-sm">Detailed metrics on your solving patterns, weak areas, and improvement trends</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Custom Practice</h4>
                                            <p className="text-white/60 text-sm">Generate additional problems by topic or difficulty level</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Priority Execution</h4>
                                            <p className="text-white/60 text-sm">Faster code execution queue during peak hours</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Streak Freeze</h4>
                                            <p className="text-white/60 text-sm">2 freeze tokens per month to protect your streak</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Leaderboard Highlight</h4>
                                            <p className="text-white/60 text-sm">Stand out with premium badge and profile customization</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Best Practices */}
                        <section id="best-practices">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">BEST PRACTICES</h2>
                            <div className="space-y-6">
                                <p className="text-white/70 leading-relaxed">
                                    Maximize your learning with these proven strategies from top performers.
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-white/5 border-l-4 border-white/20 p-6">
                                        <h3 className="text-white font-bold mb-2">Read the Problem Twice</h3>
                                        <p className="text-white/60 text-sm">
                                            Most mistakes come from misunderstanding requirements. Read carefully, identify constraints, and clarify edge cases before writing code.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border-l-4 border-white/20 p-6">
                                        <h3 className="text-white font-bold mb-2">Plan Before Coding</h3>
                                        <p className="text-white/60 text-sm">
                                            Spend 5-10 minutes sketching your approach. Write pseudocode. Think about time/space complexity. This saves debugging time later.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border-l-4 border-white/20 p-6">
                                        <h3 className="text-white font-bold mb-2">Test Incrementally</h3>
                                        <p className="text-white/60 text-sm">
                                            Don't write all the code then test. Build and verify piece by piece. Use console logs to validate your logic at each step.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border-l-4 border-white/20 p-6">
                                        <h3 className="text-white font-bold mb-2">Learn from Failures</h3>
                                        <p className="text-white/60 text-sm">
                                            Failed submissions are learning opportunities. Analyze what went wrong. Was it logic? Edge cases? Performance? Adjust and retry.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 border-l-4 border-white/20 p-6">
                                        <h3 className="text-white font-bold mb-2">Consistency Over Intensity</h3>
                                        <p className="text-white/60 text-sm">
                                            One lesson per day is better than seven in one day. Your brain needs time to consolidate learning. Trust the process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* FAQ */}
                        <section id="faq">
                            <h2 className="text-3xl font-black text-white mb-8 tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-2">Can I skip lessons I already know?</h3>
                                    <p className="text-white/60 text-sm">
                                        No. The sequential progression is intentional. Even if you know the concept, implementing it from scratch reinforces muscle memory.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-2">What happens if I fail a lesson multiple times?</h3>
                                    <p className="text-white/60 text-sm">
                                        There's no penalty for failed attempts. Keep trying. Learn from the feedback. The lesson unlocks only when you pass all tests.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-2">Can I use external libraries or frameworks?</h3>
                                    <p className="text-white/60 text-sm">
                                        No. Only the language's standard library is allowed. The goal is to build from fundamentals, not rely on abstractions.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-2">How long does each lesson take?</h3>
                                    <p className="text-white/60 text-sm">
                                        Varies by difficulty and experience. Early lessons: 20-40 minutes. Advanced lessons: 1-2 hours. Budget accordingly.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-2">Is there a mobile app?</h3>
                                    <p className="text-white/60 text-sm">
                                        Not yet. ReForge is optimized for desktop/laptop use. Serious coding requires a proper development environment.
                                    </p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-white font-bold mb-2">Can I pause my subscription?</h3>
                                    <p className="text-white/60 text-sm">
                                        Yes. Premium subscriptions can be paused for up to 3 months. Your progress is saved. Resume anytime.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Final CTA */}
                        <div className="mt-16 p-12 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl text-center">
                            <h3 className="text-white font-black text-2xl mb-4">READY TO BEGIN?</h3>
                            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                                The journey back to engineering mastery starts with a single commit. No AI. No shortcuts. Just you, the code, and 30 days of focused practice.
                            </p>
                            <a
                                href="/lessons"
                                className="inline-block px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-all"
                            >
                                View Curriculum
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocsPage;
