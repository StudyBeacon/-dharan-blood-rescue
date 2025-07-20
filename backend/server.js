require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const socketService = require('./services/socket');
const { globalErrorHandler } = require('./utils/errorHandler');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CLIENT_URL = NODE_ENV === 'production'
  ? process.env.CLIENT_URL
  : 'http://localhost:5173';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 50,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

const app = express();
const server = http.createServer(app);

// Security & parsing
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", CLIENT_URL]
    }
  },
  crossOriginEmbedderPolicy: false
}));
app.use(cors({ origin: CLIENT_URL, credentials: true, methods: ['GET','POST','PUT','DELETE'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(rateLimit({ windowMs: 15*60*1000, max: 100, standardHeaders: true, legacyHeaders: false }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: ['bloodGroup','urgency','status'] }));

socketService.init(server);

// Routes
app.get('/api/health', (req, res) =>
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/donor', require('./routes/donor'));
app.use('/api/patient', require('./routes/patient'));
app.use('/api/driver', require('./routes/driver'));
app.use('/api/requests', require('./routes/shared/requests'));

app.all('*', (req, res) => res.status(404).json({
  status: 'fail',
  message: `Can't find ${req.originalUrl} on this server!`
}));

app.use(globalErrorHandler);

const gracefulShutdown = () => {
  console.log('🛑 Received shutdown signal. Starting graceful shutdown...');
  server.close(async () => {
    console.log('🔒 HTTP server closed');
    await mongoose.connection.close(false);
    console.log('🗄️  MongoDB connection closed');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('⏰ Forced shutdown');
    process.exit(1);
  }, 10000);
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`
      🚀 BloodConnect API running in ${NODE_ENV} mode
      📡 Listening on port ${PORT}
      🗄️  Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}
      ⏰ Started at: ${new Date().toLocaleString()}
      🌐 CORS Enabled for: ${CLIENT_URL}
    `);
  });
};
startServer();