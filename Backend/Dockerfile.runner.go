FROM golang:1.21-alpine

# Install dependencies (bash, jq)
RUN apk add --no-cache bash jq

WORKDIR /runner

# Create sandbox user with limited permissions
RUN addgroup -g 1001 -S sandbox && \
    adduser -S sandbox -u 1001 -G sandbox

# Create directories for code execution
RUN mkdir -p /sandbox && chown sandbox:sandbox /sandbox

# Copy runner script
COPY src/runners/executors/go-executor.sh /runner/executor.sh
RUN chmod +x /runner/executor.sh

USER sandbox
WORKDIR /sandbox

# Default command (will be overridden)
CMD ["go", "version"]
