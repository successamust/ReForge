# 30-Day Coding Challenge Platform - Backend

A production-ready backend system for a 30-day progressive coding challenge platform supporting 5 languages with automated grading, rollback punishment rules, and secure sandboxed execution.

## Features

- **5 Supported Languages**: JavaScript, Python, Java, Go, C#
- **30 Sequential Days**: Progressive difficulty from fundamentals to senior-level
- **Automated Grading**: Docker-based sandboxed code execution
- **Rollback Punishment**: Timezone-aware calendar-day window with strict enforcement
- **Admin Tools**: Advanced System Dashboard, Lesson CRUD, progress override, audit logging
- **Gamification**: Daily streaks, points system, and milestone achievements
- **Monetization**: Tiered access (Free/Premium) with Stripe integration
- **Social Auth**: Google and GitHub OAuth 2.0 support
- **Monitoring**: Real-time error tracking and performance profiling via Sentry
- **Certification**: Automated PDF certificate generation upon completion

## Tech Stack

- **Runtime**: Node.js 20+ (ES Modules)
- **Framework**: Express.js (Versioned API /v1)
- **Database**: MongoDB with Mongoose
- **Queue**: BullMQ with Redis
- **Security**: Strict rate limiting, Helmet, and fail-fast environment validation
- **Execution**: Docker containers for sandboxed grading

## Quick Start

### Prerequisites

- Node.js 20+
- MongoDB, Redis, and Docker

### Installation

```bash
cd Backend
npm install
cp .env.example .env
# Edit .env and provide JWT_SECRET (32+ chars)
```

### Development

```bash
# Seed the database
npm run seed

# Start development server
npm run dev
```

## API Documentation (v1)

Base URL: `http://localhost:3000/api/v1`

| Area | Endpoints |
|------|-----------|
| **Auth** | `/auth/register`, `/auth/login`, `/auth/google`, `/auth/github` |
| **Lessons** | `/lessons/:language`, `/lessons/:language/:day` |
| **Submission** | `/submissions`, `/submissions/:id/poll` |
| **Progress** | `/progress`, `/progress/achievements`, `/progress/:language/certificate/generate` |
| **Payments** | `/payments/checkout`, `/payments/webhook` |
| **Admin** | `/admin/dashboard`, `/admin/users`, `/admin/users/:id/tier` |

Full Swagger UI available at: `http://localhost:3000/api-docs`

## Verification

```bash
# Run 38 unit and integration tests
npm test
```

## License

MIT
