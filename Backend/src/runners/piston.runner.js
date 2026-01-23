import config from '../config/index.js';
import { GradingError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const languageMap = {
    javascript: { language: 'javascript', version: '18.15.0', filename: 'index.js' },
    python: { language: 'python', version: '3.10.0', filename: 'main.py' },
    java: { language: 'java', version: '15.0.2', filename: 'Main.java' },
    go: { language: 'go', version: '1.16.2', filename: 'main.go' },
    csharp: { language: 'csharp.net', version: '5.0.201', filename: 'Program.cs' },
};

export async function runWithPiston(language, code, tests) {
    const startTime = Date.now();
    const langConfig = languageMap[language];
    if (!langConfig) throw new GradingError('Unsupported language: ' + language);

    try {
        const payload = { code, tests };
        const content = getExecutorContent(language, code, payload);

        const response = await fetch(config.runner.pistonApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: langConfig.language,
                version: langConfig.version,
                files: [{ name: langConfig.filename, content: content }],
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error('Piston API Error ' + response.status + ': ' + err);
        }

        const result = await response.json();
        const run = result.run || {};
        const output = (run.stdout || '') + (run.stderr || '');

        try {
            const parsed = extractJson(output);
            parsed.executionTimeMs = Date.now() - startTime;
            return parsed;
        } catch (e) {
            const msg = run.output || run.stderr || run.stdout || 'Unknown error';
            return {
                passed: false,
                details: [],
                summary: { passedCount: 0, total: tests.length },
                error: 'Execution Error: ' + msg.slice(0, 500)
            };
        }
    } catch (error) {
        logger.error('Piston runner error:', error);
        throw new GradingError('Piston execution failed: ' + error.message);
    }
}

function extractJson(output) {
    // Robust Regex to find the result JSON amidst build logs
    // Matches {"passed":... "summary":{...}} which is our specific signature
    const match = output.match(/(\{"passed":.*"summary":\{.*\}\})/);
    if (match && match[1]) {
        return JSON.parse(match[1]);
    }

    const s = output.trim();
    const end = s.lastIndexOf('}');
    if (end === -1) throw new Error('No JSON found');
    const start = s.lastIndexOf('{', end);
    if (start === -1) throw new Error('No JSON found');

    // Attempt parse
    let candidate = s.substring(start, end + 1);
    try {
        const p = JSON.parse(candidate);
        if (p.summary || typeof p.passed === 'boolean' || p.error) return p;
    } catch (e) {
        // Fallback: look for earlier brace
        const outer = s.indexOf('{');
        if (outer !== -1 && outer < start) return JSON.parse(s.substring(outer, end + 1));
        throw e;
    }
    throw new Error('No valid JSON');
}

function getExecutorContent(language, code, payload) {
    const b64 = Buffer.from(JSON.stringify(payload)).toString('base64');

    switch (language) {
        case 'javascript':
            return `const p=JSON.parse(Buffer.from("${b64}","base64").toString());const {code,tests}=p;const res=[];let ok=0;for(const t of tests){const s=Date.now();try{const fn=new Function("input",code+"\\nreturn solution(...(Array.isArray(input)?input:[input]));");const r=fn(t.input);const v=JSON.stringify(r)===JSON.stringify(t.expectedOutput);if(v)ok++;res.push({testId:t.id,passed:v,stdout:JSON.stringify(r),stderr:"",durationMs:Date.now()-s});}catch(e){res.push({testId:t.id,passed:false,stdout:"",stderr:e.message,durationMs:0});}}process.stdout.write(JSON.stringify({passed:ok===tests.length,details:res,summary:{passedCount:ok,total:tests.length}}));`;

        case 'python':
            return `import json,base64,time\np=json.loads(base64.b64decode("${b64}").decode())\nc,t=p["code"],p["tests"]\nres,ok=[],0\nfor test in t:\n    s=time.time()\n    try:\n        ns={};exec(c,ns)\n        f=ns.get("solution") or ns.get("main")\n        inp=test.get("input")\n        r=f(*inp) if isinstance(inp,list) else f(inp)\n        v=json.dumps(r)==json.dumps(test.get("expectedOutput"))\n        if v:ok+=1\n        res.append({"testId":test["id"],"passed":v,"stdout":json.dumps(r),"stderr":"","durationMs":int((time.time()-s)*1000)})\n    except Exception as e:res.append({"testId":test["id"],"passed":False,"stdout":"","stderr":str(e),"durationMs":0})\nprint(json.dumps({"passed":ok==len(t),"details":res,"summary":{"passedCount":ok,"total":len(t)}}))`;

        case 'java':
            return getJavaRunner(payload, code);

        case 'go':
            return getGoRunner(payload, code);

        case 'csharp':
            return getCsRunner(payload, code);

        default:
            return "";
    }
}

function getJavaRunner(payload, code) {
    const tests = payload.tests.map(t => {
        const inputStr = Array.isArray(t.input) ? t.input.map(i => JSON.stringify(i)).join(',') : JSON.stringify(t.input);
        const expectedStr = JSON.stringify(t.expectedOutput).replace(/"/g, '\\"');

        return "try { " +
            "long s = System.currentTimeMillis(); " +
            "Object r = new Solution().solution(" + inputStr + "); " +
            "String rs = String.valueOf(r); " +
            "boolean v = rs.equals(\"" + expectedStr + "\"); " +
            "if(v) p[0]++; " +
            "d.add(String.format(\"{\\\"testId\\\":\\\"" + t.id + "\\\",\\\"passed\\\":%s,\\\"stdout\\\":\\\"%s\\\",\\\"stderr\\\":\\\"\\\",\\\"durationMs\\\":%d}\", v, rs, System.currentTimeMillis() - s)); " +
            "} catch (Exception e) { " +
            "d.add(\"{\\\"testId\\\":\\\"" + t.id + "\\\",\\\"passed\\\":false,\\\"stdout\\\":\\\"\\\",\\\"stderr\\\":\\\"\" + e.toString().replace(\"\\\"\", \"\\\\\\\"\") + \"\\\",\\\"durationMs\\\":0}\"); " +
            "}";
    }).join('\n');

    return "import java.util.*;\n" +
        "public class Main {\n" +
        "  public static void main(String[] args) {\n" +
        "    final int[] p = {0};\n" +
        "    List<String> d = new ArrayList<>();\n" +
        "    " + tests + "\n" +
        "    System.out.println(\"{\\\"passed\\\":\" + (p[0] == " + payload.tests.length + ") + \",\\\"details\\\":[\" + String.join(\",\", d) + \"],\\\"summary\\\":{\\\"passedCount\\\":\" + p[0] + \",\\\"total\\\":" + payload.tests.length + "}}\");\n" +
        "  }\n" +
        "  static class Solution {\n" + code + "\n  }\n" +
        "}";
}

function getGoRunner(payload, code) {
    const tests = payload.tests.map(t => {
        const inputStr = Array.isArray(t.input) ? t.input.map(i => JSON.stringify(i)).join(',') : JSON.stringify(t.input);
        const expectedStr = JSON.stringify(t.expectedOutput).replace(/"/g, '\\"');

        return "func() { " +
            "s := time.Now(); " +
            "r := solution(" + inputStr + "); " +
            "rs := fmt.Sprintf(\"%v\", r); " +
            "v := rs == \"" + expectedStr + "\"; " +
            "if v { p++ }; " +
            "d = append(d, fmt.Sprintf(\"{\\\"testId\\\":\\\"" + t.id + "\\\",\\\"passed\\\":%v,\\\"stdout\\\":\\\"%v\\\",\\\"stderr\\\":\\\"\\\",\\\"durationMs\\\":%d}\", v, rs, time.Since(s).Milliseconds())); " +
            "}()";
    }).join('\n');

    return "package main\n" +
        "import (\"fmt\"; \"time\");\n" +
        code + "\n" +
        "func main() {\n" +
        "  p := 0\n" +
        "  d := []string{}\n" +
        "  " + tests + "\n" +
        "  fmt.Print(\"{\\\"passed\\\":\", p == " + payload.tests.length + ", \",\\\"details\\\":[\") \n" +
        "  for i, s := range d { if i > 0 { fmt.Print(\",\") }; fmt.Print(s) }\n" +
        "  fmt.Print(\"],\\\"summary\\\":{\\\"passedCount\\\":\", p, \",\\\"total\\\":\", " + payload.tests.length + ", \"}}\")\n" +
        "}";
}

function getCsRunner(payload, code) {
    const tests = payload.tests.map(t => {
        const inputStr = Array.isArray(t.input) ? t.input.map(i => JSON.stringify(i)).join(',') : JSON.stringify(t.input);
        const expectedStr = JSON.stringify(t.expectedOutput).replace(/"/g, '\\"');

        return "{" +
            "var s = DateTime.Now; " +
            "try { " +
            "var r = new UserSubmission().Solution(" + inputStr + "); " +
            "var rs = r.ToString(); " +
            "bool v = rs == \"" + expectedStr + "\"; " +
            "if (v) p++; " +
            "d.Add(\"{\\\"testId\\\":\\\"" + t.id + "\\\",\\\"passed\\\": \" + v.ToString().ToLower() + \",\\\"stdout\\\":\\\"\" + rs + \"\\\",\\\"stderr\\\":\\\"\\\",\\\"durationMs\\\": \" + (DateTime.Now - s).TotalMilliseconds + \"}\"); " +
            "} catch (Exception e) { " +
            "d.Add(\"{\\\"testId\\\":\\\"" + t.id + "\\\",\\\"passed\\\":false,\\\"stdout\\\":\\\"\\\",\\\"stderr\\\":\\\"\" + e.Message.Replace(\"\\\"\", \"\\\\\\\"\") + \"\\\",\\\"durationMs\\\":0}\"); " +
            "} " +
            "}";
    }).join('\n');

    return "using System; using System.Collections.Generic;\n" +
        "public class Program {\n" +
        "  public static void Main() {\n" +
        "    int p = 0;\n" +
        "    var d = new List<string>();\n" +
        "    " + tests + "\n" +
        "    Console.WriteLine(\"{\\\"passed\\\":\" + (p == " + payload.tests.length + ").ToString().ToLower() + \",\\\"details\\\":[\" + string.Join(\",\", d) + \"],\\\"summary\\\":{\\\"passedCount\\\":\" + p + \",\\\"total\\\":" + payload.tests.length + "}}\");\n" +
        "  }\n" +
        "}\n" +
        "public class UserSubmission {\n" + code + "\n}";
}
