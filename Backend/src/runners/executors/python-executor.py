#!/usr/bin/env python3
"""
Python code executor
Runs inside Docker container
"""

import json
import os
import base64
import sys
import time
from io import StringIO

# Get payload from environment
payload = json.loads(base64.b64decode(os.environ['PAYLOAD']).decode())
code = payload['code']
tests = payload.get('tests', [])
operation = payload.get('operation')

def run_tests():
    if operation == 'lint':
        try:
            compile(code, '<string>', 'exec')
            
            # If valid, run to capture output
            import io
            import contextlib
            
            f = io.StringIO()
            with contextlib.redirect_stdout(f):
                try:
                    exec(code, {'__name__': '__main__'})
                    passed = True
                    message = 'Syntax valid'
                except Exception as run_e:
                    passed = True # Still passed syntax check
                    message = f'Syntax valid (Runtime error: {str(run_e)})'
                    print(f'Runtime Error: {run_e}')
            
            output_captured = f.getvalue()
            if len(output_captured) > 10000:
                output_captured = output_captured[:10000] + '\n... [Output Truncated for Security]'

            print(json.dumps({
                'passed': passed, 
                'message': message,
                'output': output_captured
            }))
        except SyntaxError as e:
            print(json.dumps({
                'passed': False, 
                'error': str(e),
                'location': {
                    'line': e.lineno,
                    'column': e.offset
                }
            }))
        return

    results = []
    passed_count = 0
    
    for test in tests:
        test_result = run_single_test(test)
        results.append(test_result)
        if test_result['passed']:
            passed_count += 1
    
    output = {
        'passed': passed_count == len(tests),
        'details': results,
        'summary': {
            'passedCount': passed_count,
            'total': len(tests)
        }
    }
    
    print(json.dumps(output))

def run_single_test(test):
    test_id = test['id']
    test_input = test.get('input')
    expected_output = test.get('expectedOutput')
    is_hidden = test.get('isHidden', False)
    hint = test.get('hint')
    
    start_time = time.time()
    
    try:
        # Create a new namespace for execution
        namespace = {}
        
        # Execute user code
        exec(code, namespace)
        
        # Find and call the solution function
        if 'solution' in namespace:
            if isinstance(test_input, list):
                result = namespace['solution'](*test_input)
            else:
                result = namespace['solution'](test_input)
        elif 'main' in namespace:
            if isinstance(test_input, list):
                result = namespace['main'](*test_input)
            else:
                result = namespace['main'](test_input)
        else:
            raise Exception('No solution or main function found')
        
        # Compare result
        passed = json.dumps(result) == json.dumps(expected_output)
        
        return {
            'testId': test_id,
            'passed': passed,
            'stdout': json.dumps(result),
            'stderr': '',
            'durationMs': int((time.time() - start_time) * 1000),
            'isHidden': is_hidden,
            'hint': hint if not passed and hint else None
        }
    except Exception as e:
        return {
            'testId': test_id,
            'passed': False,
            'stdout': '',
            'stderr': str(e),
            'durationMs': int((time.time() - start_time) * 1000),
            'isHidden': is_hidden,
            'hint': hint
        }

if __name__ == '__main__':
    try:
        run_tests()
    except Exception as e:
        print(json.dumps({
            'passed': False,
            'details': [],
            'summary': {'passedCount': 0, 'total': len(tests) if tests else 0},
            'error': str(e)
        }))
        sys.exit(1)
