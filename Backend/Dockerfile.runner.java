FROM eclipse-temurin:17-jdk-jammy

# Install dependencies (bash, jq)
RUN apt-get update && apt-get install -y bash jq && rm -rf /var/lib/apt/lists/*

WORKDIR /runner

# Install JUnit for testing
RUN mkdir -p /runner/lib
ADD https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.1/junit-platform-console-standalone-1.10.1.jar /runner/lib/junit.jar

# Create sandbox user with limited permissions
RUN groupadd -g 1001 sandbox && \
    useradd -m -u 1001 -g sandbox -s /bin/bash sandbox

# Create directories for code execution
RUN mkdir -p /sandbox && chown sandbox:sandbox /sandbox

# Copy runner script
COPY src/runners/executors/java-executor.sh /runner/executor.sh
RUN chmod +x /runner/executor.sh

USER sandbox
WORKDIR /sandbox

# Default command (will be overridden)
CMD ["java", "--version"]
