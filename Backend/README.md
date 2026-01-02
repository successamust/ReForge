# ReForge // Backend _

**The Execution Core.**

The backbone of the ReForge platform. A high-performance, secure Node.js environment designed to grade code with ruthless precision.

## System Capabilities

### 1. Sandboxed Execution
Code is never run on the host. Every submission spins up an ephemeral Docker container.
- **Isolation**: Network access disabled. File system read-only.
- **Limits**: 256MB RAM. 5s CPU time.
- **Security**: Root capabilities dropped.

### 2. Progression Engine
A state machine that tracks user rehabilitation.
- **Streak Algorithms**: Timezone-aware expiration logic using Cron + Redis.
- **Rollback Protocol**: Miss 24 hours? You lose the module.

## API Structure

All endpoints are prefixed with `/v1`.

| Context | Route | Purpose |
|---------|-------|---------|
| **Auth** | `/auth/*` | JWT & OAuth management |
| **Practice** | `/submissions/*` | Code queuing & result polling |
| **Logic** | `/lessons/*` | Curriculum content delivery |
| **Admin** | `/admin/*` | System telemetry & user management |

## Deployment

```bash
# 1. Environment
cp .env.example .env

# 2. Database
npm run seed  # Populates initial curriculum

# 3. Launch
npm run dev
```

## Testing

```bash
npm test  # Runs 50+ unit/integration tests
```

---

**TRUST THE METAL.**
