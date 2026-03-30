const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/casestudies', require('./routes/casestudies'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/leads', require('./routes/leads'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   🚀  Stérn Kraft Media Server               ║
  ║                                              ║
  ║   Local:  http://localhost:${PORT}              ║
  ║   API:    http://localhost:${PORT}/api          ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
});
