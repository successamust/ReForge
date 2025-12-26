import request from 'supertest';
import app from '../../src/app.js';
import { User, Lesson } from '../../src/models/index.js';

describe('Auth API', () => {
    describe('POST /api/v1/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'newuser@example.com',
                    password: 'password123',
                    firstName: 'Test',
                    lastName: 'User',
                    timezone: 'UTC',
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.user.email).toBe('newuser@example.com');
            expect(res.body.data.token).toBeDefined();
        });

        it('should reject duplicate email', async () => {
            await User.create({
                email: 'existing@example.com',
                passwordHash: 'password123',
                firstName: 'Existing',
                lastName: 'User',
            });

            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'existing@example.com',
                    password: 'password123',
                    firstName: 'Test',
                    lastName: 'User',
                });

            expect(res.status).toBe(409);
        });

        it('should reject invalid email', async () => {
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'invalid-email',
                    password: 'password123',
                    firstName: 'Test',
                    lastName: 'User',
                });

            expect(res.status).toBe(400);
        });
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(async () => {
            await User.create({
                email: 'test@example.com',
                passwordHash: 'password123',
                firstName: 'Login',
                lastName: 'User',
            });
        });

        it('should login with valid credentials', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.token).toBeDefined();
        });

        it('should reject invalid password', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                });

            expect(res.status).toBe(401);
        });
    });

    describe('GET /api/v1/auth/profile', () => {
        let token;

        beforeEach(async () => {
            const registerRes = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'profile@example.com',
                    password: 'password123',
                    firstName: 'Profile',
                    lastName: 'User',
                    timezone: 'UTC',
                });
            expect(registerRes.status).toBe(201);
            token = registerRes.body.data.token;
        });

        it('should return user profile with valid token', async () => {
            const res = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data.user.email).toBe('profile@example.com');
        });

        it('should reject without token', async () => {
            const res = await request(app).get('/api/v1/auth/profile');

            expect(res.status).toBe(401);
        });
    });
});

describe('Lessons API', () => {
    beforeEach(async () => {
        await Lesson.create({
            language: 'javascript',
            day: 1,
            title: 'Test Lesson',
            objectives: ['Obj 1', 'Obj 2', 'Obj 3'],
            contentHtml: '<p>Content</p>',
            examples: [
                { title: 'Ex 1', code: 'code', explanation: 'exp' },
                { title: 'Ex 2', code: 'code', explanation: 'exp' },
            ],
            exercise: { description: 'Do this', starterCode: '', hints: [] },
            tests: [
                { id: 't1', description: 'Test 1', input: 'a', expectedOutput: 'a', isHidden: false },
                { id: 't2', description: 'Test 2', input: 'b', expectedOutput: 'b', isHidden: false },
                { id: 't3', description: 'Hidden', input: 'c', expectedOutput: 'c', isHidden: true },
            ],
            solution: 'solution code',
            difficulty: 1,
            estimatedMinutes: 15,
        });
    });

    describe('GET /api/v1/lessons/:language', () => {
        it('should return lesson list for language', async () => {
            const res = await request(app).get('/api/v1/lessons/javascript');

            expect(res.status).toBe(200);
            expect(res.body.data.lessons).toHaveLength(1);
            expect(res.body.data.lessons[0].title).toBe('Test Lesson');
        });
    });

    describe('GET /api/v1/lessons/:language/:day', () => {
        it('should return lesson without solution and hidden tests', async () => {
            const res = await request(app).get('/api/v1/lessons/javascript/1');

            expect(res.status).toBe(200);
            expect(res.body.data.lesson.solution).toBeUndefined();
            expect(res.body.data.lesson.tests).toHaveLength(2); // Hidden test filtered
        });

        it('should return 404 for non-existent lesson', async () => {
            const res = await request(app).get('/api/v1/lessons/javascript/2');

            expect(res.status).toBe(404);
        });
    });
});

describe('Health Check', () => {
    it('should return healthy status', async () => {
        const res = await request(app).get('/api/v1/health');

        expect(res.status).toBe(200);
        expect(res.body.data.status).toBe('healthy');
    });
});
