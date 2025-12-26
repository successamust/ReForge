FROM node:20-alpine

WORKDIR /runner

# Install additional tools for testing
RUN npm install -g jest

# Create sandbox user with limited permissions
RUN addgroup -g 1001 -S sandbox && \
    adduser -S sandbox -u 1001 -G sandbox

# Create directories for code execution
RUN mkdir -p /sandbox && chown sandbox:sandbox /sandbox

# Copy runner script
COPY src/runners/executors/js-executor.js /runner/executor.js

USER sandbox
WORKDIR /sandbox

# Default command (will be overridden)
CMD ["node", "--version"]
