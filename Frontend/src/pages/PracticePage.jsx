import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { CodeFile, Processor, RunPlay, VerifiedCheck } from '../components/icons/CustomIcons';
import { practiceService } from '../services/practice.service';
import { AppContext } from '../context/AppContext';
import SEO from '../components/SEO';

const PracticePage = () => {
    const { isAuthenticated, addNotification } = useContext(AppContext);
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('// Write your code here and check syntax...');
    const [output, setOutput] = useState([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsHeaderScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const languages = [
        { id: 'javascript', name: 'JavaScript', ext: 'js' },
        { id: 'python', name: 'Python', ext: 'py' },
        { id: 'java', name: 'Java', ext: 'java' },
        { id: 'go', name: 'Go', ext: 'go' },
        { id: 'csharp', name: 'C#', ext: 'cs' },
    ];

    const currentExt = languages.find(l => l.id === language)?.ext || 'js';

    const handleVerify = async () => {
        if (!isAuthenticated) {
            addNotification({
                type: 'warning',
                message: 'Please login to verify code'
            });
            return;
        }

        setIsVerifying(true);
        setOutput([{ type: 'info', text: 'Linting code in sterile environment...' }]);

        try {
            const response = await practiceService.verifySyntax(language, code);
            const result = response?.data?.result || response?.result || response;

            if (result.passed) {
                const isRuntimeError = (result.output && result.output.includes('Runtime Error:')) ||
                    (result.message && result.message.includes('Runtime error'));

                const newOutput = [
                    { type: 'success', text: '✓ Syntax analysis complete.' },
                    isRuntimeError
                        ? { type: 'warning', text: '⚠ Runtime anomaly detected. Execution halted.' }
                        : { type: 'success', text: '✓ Logic structure valid. No anomalies detected.' }
                ];

                if (result.output) {
                    newOutput.push({ type: 'info', text: '--- EXECUTION OUTPUT ---' });
                    result.output.split('\n').forEach(line => {
                        if (line.trim()) {
                            newOutput.push({ type: 'info', text: `> ${line}` });
                        }
                    });
                }

                setOutput(newOutput);
            } else {
                const locationInfo = result.location
                    ? ` [Line ${result.location.line}${result.location.column ? `, Col ${result.location.column}` : ''}]`
                    : '';

                const newOutput = [
                    { type: 'error', text: `✗ Syntax violation detected${locationInfo}.` },
                    { type: 'error', text: result.error || 'Unknown parsing error' }
                ];

                if (result.output) {
                    newOutput.push({ type: 'info', text: '--- PARTIAL OUTPUT ---' });
                    result.output.split('\n').forEach(line => {
                        if (line.trim()) {
                            newOutput.push({ type: 'info', text: `> ${line}` });
                        }
                    });
                }

                setOutput(newOutput);
            }
        } catch (error) {
            console.error('Verification failed:', error);
            setOutput([{
                type: 'error',
                text: `Service Error: ${error.response?.data?.message || error.message || 'Worker connection failed'}`
            }]);
        } finally {
            setIsVerifying(false);
        }
    };

    const backdropRef = useRef(null);
    const terminalRef = useRef(null);
    const lineNumbersRef = useRef(null);

    // Auto-scroll terminal to bottom when output changes
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    const highlightCode = (code, lang) => {
        if (!code) return '';

        // Escape HTML
        let escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const keywords = [
            'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while',
            'import', 'export', 'await', 'async', 'try', 'catch', 'new', 'class',
            'extends', 'super', 'switch', 'case', 'break', 'default', 'true', 'false', 'null',
            'def', 'elif', 'lambda', 'with', 'yield', 'pass', 'func', 'package', 'type',
            'interface', 'struct', 'chan', 'go', 'select', 'using', 'namespace', 'public',
            'private', 'protected', 'internal', 'static', 'readonly', 'void', 'bool',
            'string', 'int', 'float', 'double', 'decimal'
        ];

        const commentRegex = lang === 'python' ? `(#.*$)` : `(\\/\\/.*$|\\/\\*[\\s\\S]*?\\*\\/)`;

        const regex = new RegExp(
            `${commentRegex}|` +
            `(".*?"|'.*?'|\`.*?\`)|` +
            `\\b(${keywords.join('|')})\\b|` +
            `(\\b\\d+\\b)`,
            'gm'
        );

        return escaped.replace(regex, (match, p1, p2, p3, p4) => {
            if (p1) return `<span style="color: rgba(255,255,255,0.3); font-style: italic;">${p1}</span>`;
            if (p2) return `<span style="color: #4ade80;">${p2}</span>`;
            if (p3) return `<span style="color: #A855F7; font-weight: bold;">${p3}</span>`;
            if (p4) return `<span style="color: #60a5fa;">${p4}</span>`;
            return match;
        });
    };

    const handleScroll = (e) => {
        if (backdropRef.current) {
            backdropRef.current.scrollTop = e.target.scrollTop;
            backdropRef.current.scrollLeft = e.target.scrollLeft;
        }
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const handleKeyDown = (e) => {
        const { key, target, metaKey, ctrlKey } = e;
        const { selectionStart, selectionEnd, value } = target;

        if (key === '/' && (metaKey || ctrlKey)) {
            e.preventDefault();
            const prefix = language === 'python' ? '#' : '//';

            // Get all lines that are at least partially selected
            const startPos = Math.min(selectionStart, selectionEnd);
            const endPos = Math.max(selectionStart, selectionEnd);

            const before = value.substring(0, startPos);
            const after = value.substring(endPos);

            const selectionBefore = before.lastIndexOf('\n') + 1;
            let selectionAfter = value.indexOf('\n', endPos);
            if (selectionAfter === -1) selectionAfter = value.length;

            const selectedText = value.substring(selectionBefore, selectionAfter);
            const lines = selectedText.split('\n');
            const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const prefixRegex = new RegExp(`^(\\s*)${escapedPrefix}\\s?`);

            // Determine if we should comment or uncomment
            const allComments = lines.every(line => !line.trim() || line.trim().startsWith(prefix));
            const shouldUncomment = allComments;

            const transformedLines = lines.map(line => {
                if (!line.trim()) return line;
                if (shouldUncomment) {
                    return line.replace(prefixRegex, '$1');
                } else {
                    return prefix + ' ' + line;
                }
            });

            const newText = transformedLines.join('\n');
            const newValue = value.substring(0, selectionBefore) + newText + after;

            setCode(newValue);

            // Adjust selection range
            setTimeout(() => {
                const diff = newText.length - selectedText.length;
                target.setSelectionRange(startPos, endPos + diff);
            }, 0);
            return;
        }

        if (key === 'Tab') {
            e.preventDefault();
            const tab = '  ';
            const newValue = value.substring(0, selectionStart) + tab + value.substring(selectionEnd);
            setCode(newValue);
            setTimeout(() => {
                target.setSelectionRange(selectionStart + tab.length, selectionStart + tab.length);
            }, 0);
        }

        if (key === 'Enter') {
            e.preventDefault();
            const linesBefore = value.substring(0, selectionStart).split('\n');
            const currentLine = linesBefore[linesBefore.length - 1];
            const indentMatch = currentLine.match(/^\s*/);
            const indent = indentMatch ? indentMatch[0] : '';
            let extraIndent = '';
            if (currentLine.trim().endsWith('{') || currentLine.trim().endsWith('(') || currentLine.trim().endsWith('[')) {
                extraIndent = '  ';
            }
            const insertion = '\n' + indent + extraIndent;
            const newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
            setCode(newValue);
            setTimeout(() => {
                target.setSelectionRange(selectionStart + insertion.length, selectionStart + insertion.length);
            }, 0);
        }

        const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
        if (pairs[key]) {
            const charAfter = value.charAt(selectionStart);
            const shouldClose = !charAfter || /\s|\)|\}|\]|;/.test(charAfter);
            if (shouldClose) {
                e.preventDefault();
                const closing = pairs[key];
                const newValue = value.substring(0, selectionStart) + key + closing + value.substring(selectionEnd);
                setCode(newValue);
                setTimeout(() => {
                    target.setSelectionRange(selectionStart + 1, selectionStart + 1);
                }, 0);
            }
        }
    };

    return (
        <>
            <SEO title="Drill Zone" description="Stateless practice environment to rebuild your manual coding muscle." />
            <div className={`relative min-h-screen bg-black transition-all duration-500 flex flex-col ${isHeaderScrolled ? 'pt-16' : 'pt-24'}`}>
                <div className="flex-1 container mx-auto px-6 py-8 flex flex-col gap-8 max-w-6xl">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="px-3 py-1 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 inline-block">
                                Sterile Environment
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                                Drill Station<span className="text-white/20">.</span>
                            </h1>
                            <p className="text-white/40 font-light max-w-xl">
                                Pure repetition. No progress tracking. No AI. Just you, the syntax, and the machine.
                            </p>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex flex-wrap gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-lg">
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setLanguage(lang.id)}
                                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded ${language === lang.id
                                        ? 'bg-white text-black'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                        {/* Editor Pane */}
                        <div className="lg:col-span-2 flex flex-col">
                            <div className="bg-black border border-white/10 overflow-hidden rounded flex flex-col h-full">
                                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <CodeFile size={14} className="text-white/60" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                            sandbox.{currentExt}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest hidden sm:inline">
                                            Manual Mode Active
                                        </span>
                                        <Button
                                            size="sm"
                                            onClick={handleVerify}
                                            isLoading={isVerifying}
                                            icon={VerifiedCheck}
                                            className="text-[10px] uppercase h-8"
                                        >
                                            Check Syntax
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex bg-black/50 flex-1 relative overflow-hidden min-h-[500px]">
                                    {/* Line Numbers */}
                                    <div
                                        ref={lineNumbersRef}
                                        className="w-12 bg-black/40 border-r border-white/5 py-6 text-right pr-3 font-mono text-[14px] text-white/10 select-none overflow-hidden"
                                    >
                                        {code.split('\n').map((_, i) => (
                                            <div key={i} style={{ height: '22.75px', lineHeight: '22.75px' }}>
                                                {i + 1}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative flex-1 overflow-hidden">
                                        {/* Backdrop for highlighting */}
                                        <div
                                            ref={backdropRef}
                                            className="editor-layer editor-backdrop"
                                            dangerouslySetInnerHTML={{ __html: highlightCode(code, language) + '\n ' }}
                                        />

                                        {/* Hidden Textarea for Input */}
                                        <textarea
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            onScroll={handleScroll}
                                            wrap="off"
                                            onPaste={(e) => {
                                                e.preventDefault();
                                                addNotification({
                                                    type: 'warning',
                                                    message: 'Manual reconstruction required. Pasting forbidden.'
                                                });
                                            }}
                                            className="editor-layer editor-textarea"
                                            placeholder="Forge your logic here..."
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terminal / Info Pane */}
                        <div className="flex flex-col gap-6">
                            {/* Output Terminal */}
                            <div className="flex-1 bg-black border border-white/10 rounded flex flex-col overflow-hidden min-h-[300px]">
                                <div className="px-6 py-3 border-b border-white/10 bg-white/[0.02] flex items-center gap-3">
                                    <Processor size={14} className="text-white/40" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Diagnostic Output</span>
                                </div>
                                <div
                                    ref={terminalRef}
                                    className="flex-1 p-6 font-mono text-xs overflow-y-auto custom-scrollbar"
                                >
                                    <div className="space-y-2">
                                        {output.length === 0 && (
                                            <p className="text-white/20 italic">Awaiting transmission...</p>
                                        )}
                                        {output.map((line, i) => (
                                            <p
                                                key={i}
                                                className={
                                                    line.type === 'success'
                                                        ? 'text-green-400 font-bold'
                                                        : line.type === 'error'
                                                            ? 'text-red-400 font-bold'
                                                            : line.type === 'warning'
                                                                ? 'text-yellow-400 font-bold'
                                                                : 'text-white/60'
                                                }>
                                                {line.text}
                                            </p>
                                        ))}
                                        {isVerifying && (
                                            <motion.span
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                className="inline-block w-2 h-4 bg-white align-middle ml-1"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Rules / Constraints Card */}
                            <div className="p-6 border border-white/5 bg-white/[0.02] rounded-lg">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-4">Station Rules</h3>
                                <ul className="space-y-3">
                                    {[
                                        'No Autocomplete assistance',
                                        'No Copypaste transmission',
                                        'Stateless verification only',
                                        'Pure manual reconstruction'
                                    ].map((rule, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs text-white/40 font-light">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PracticePage;
