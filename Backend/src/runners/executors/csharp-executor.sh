#!/bin/bash
# C# code executor for Docker container

set -e

# Decode payload
PAYLOAD=$(echo "$PAYLOAD" | base64 -d)

# Extract code, tests and operation
CODE=$(echo "$PAYLOAD" | jq -r '.code')
TESTS=$(echo "$PAYLOAD" | jq -c '.tests // []')
OPERATION=$(echo "$PAYLOAD" | jq -r '.operation // empty')

# Create project
mkdir -p /sandbox/solution
cd /sandbox/solution

# Create project file
cat > Solution.csproj << 'EOF'
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
EOF

# Write code to file
echo "$CODE" > Program.cs

# Build
dotnet build -c Release --nologo -v q 2>/tmp/compile_error.txt || {
  ERROR_FILE="/tmp/compile_error.txt"
  # Look for pattern Program.cs(5,13): error CS...
  ERROR_LINE=$(grep "Program.cs(" "$ERROR_FILE" | head -n 1)
  ERROR_MSG=$(echo "$ERROR_LINE" | sed 's/"/\\"/g')
  
  if [ -n "$ERROR_LINE" ]; then
    LINE=$(echo "$ERROR_LINE" | grep -oE "\([0-9]+," | tr -d '(,')
    COL=$(echo "$ERROR_LINE" | grep -oE ",[0-9]+\)" | tr -d ',)')
    LOCATION="{\"line\":$LINE,\"column\":$COL}"
  else
    LOCATION="null"
  fi
  
  echo "{\"passed\":false,\"error\":\"$ERROR_MSG\",\"location\":$LOCATION,\"details\":[],\"summary\":{\"passedCount\":0,\"total\":$(echo "$TESTS" | jq '. | length')}}"
  exit 0
}

if [ "$OPERATION" = "lint" ]; then
  # Run and capture output (truncated to 10KB for security)
  OUTPUT=$(timeout 5s dotnet run --no-build -c Release 2>&1 | head -c 10000 | sed 's/"/\\"/g' | tr '\n' ' ')
  echo "{\"passed\":true,\"message\":\"Syntax valid\",\"output\":\"$OUTPUT\"}"
  exit 0
fi

# If linting, we are done
if [ "$OPERATION" = "lint" ]; then
  echo "{\"passed\":true,\"message\":\"Syntax valid\"}"
  exit 0
fi

# Run tests
RESULTS="[]"
PASSED_COUNT=0
TOTAL=$(echo "$TESTS" | jq '. | length')

for i in $(seq 0 $((TOTAL - 1))); do
  TEST=$(echo "$TESTS" | jq -c ".[$i]")
  TEST_ID=$(echo "$TEST" | jq -r '.id')
  INPUT=$(echo "$TEST" | jq -c '.input')
  EXPECTED=$(echo "$TEST" | jq -c '.expectedOutput')
  IS_HIDDEN=$(echo "$TEST" | jq -r '.isHidden // false')
  HINT=$(echo "$TEST" | jq -r '.hint // empty')
  
  START_TIME=$(date +%s%3N)
  
  # Run code with input
  OUTPUT=$(echo "$INPUT" | timeout 5 dotnet run --no-build -c Release 2>&1) || OUTPUT="Execution error"
  
  END_TIME=$(date +%s%3N)
  DURATION=$((END_TIME - START_TIME))
  
  # Check if output matches expected
  if [ "$OUTPUT" = "$EXPECTED" ]; then
    PASSED=true
    PASSED_COUNT=$((PASSED_COUNT + 1))
    HINT_JSON="null"
  else
    PASSED=false
    if [ -n "$HINT" ]; then
      HINT_JSON="\"$HINT\""
    else
      HINT_JSON="null"
    fi
  fi
  
  RESULT=$(jq -n \
    --arg testId "$TEST_ID" \
    --argjson passed "$PASSED" \
    --arg stdout "$OUTPUT" \
    --arg stderr "" \
    --argjson durationMs "$DURATION" \
    --argjson isHidden "$IS_HIDDEN" \
    --argjson hint "$HINT_JSON" \
    '{testId: $testId, passed: $passed, stdout: $stdout, stderr: $stderr, durationMs: $durationMs, isHidden: $isHidden, hint: $hint}')
  
  RESULTS=$(echo "$RESULTS" | jq ". += [$RESULT]")
done

# Output final result
ALL_PASSED=false
if [ "$PASSED_COUNT" -eq "$TOTAL" ]; then
  ALL_PASSED=true
fi

jq -n \
  --argjson passed "$ALL_PASSED" \
  --argjson details "$RESULTS" \
  --argjson passedCount "$PASSED_COUNT" \
  --argjson total "$TOTAL" \
  '{passed: $passed, details: $details, summary: {passedCount: $passedCount, total: $total}}'
