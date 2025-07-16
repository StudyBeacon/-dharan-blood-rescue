const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

// Create minimal Express app
const express = require('express');
const authRouter = require('../routes/auth');
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

// Configure test environment
let mongoServer;
jest.setTimeout(30000); // 30 seconds timeout

beforeAll(async () => {
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe('Auth Endpoints', () => {
  test('POST /register - creates user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@bloodconnect.com',
        password: 'Test@1234',
        phone: '9876543210',
        role: 'donor'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test('POST /login - authenticates user', async () => {
    // First register a user
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@bloodconnect.com',
        password: 'Test@1234',
        phone: '9876543210',
        role: 'donor'
      });

    // Then test login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@bloodconnect.com',
        password: 'Test@1234'
      });
    
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});