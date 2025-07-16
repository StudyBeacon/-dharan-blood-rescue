require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const socketService = require('./services/socket');
const { globalErrorHandler } = require('./utils/errorHandler');

// Constants
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CLIENT_URL = NODE_ENV === 'production' 
  ? process.env.CLIENT_URL 
  : 'http://localhost:3000';

// Database Connection
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

// Express App
const app = express();
const server = http.createServer(app);

// 1. Security Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", CLIENT_URL]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);

// Data Sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: ['bloodGroup', 'urgency', 'status']
}));

// 2. Initialize Socket.io
socketService.init(server);

// 3. Routes
app.get('/api/health', (req, res) => res.status(200).json({ 
  status: 'healthy',
  timestamp: new Date(),
  dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/donor', require('./routes/donor'));
app.use('/api/patient', require('./routes/patient'));
app.use('/api/driver', require('./routes/driver'));
app.use('/api/requests', require('./routes/shared/requests'));
// Add this with your other routes
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to BloodConnect API',
    endpoints: {
      auth: '/api/auth',
      donor: '/api/donor',
      patient: '/api/patient',
      driver: '/api/driver'
    }
  });
});

// 4. Static Files (Production)
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// 5. Error Handling
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});
app.use(globalErrorHandler);

// 6. Graceful Shutdown
const gracefulShutdown = () => {
  console.log('🛑 Received shutdown signal. Starting graceful shutdown...');
  
  server.close(async () => {
    console.log('🔒 HTTP server closed');
    
    await mongoose.connection.close(false);
    console.log('🗄️  MongoDB connection closed');
    
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⏰ Could not close connections in time, forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// 7. Start Server
const startServer = async () => {
  try {
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

  } catch (err) {
    console.error('❌ Server startup failed:', err);
    process.exit(1);
  }
};

startServer();