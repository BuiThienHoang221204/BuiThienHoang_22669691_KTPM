const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// SECRET KEY
const ACCESS_TOKEN_SECRET = 'ACCESS_SECRET_123';
const REFRESH_TOKEN_SECRET = 'REFRESH_SECRET_456';

// giả lập DB
const users = [
  { id: 1, username: 'admin', password: '123', role: 'admin' },
  { id: 2, username: 'guest', password: '123', role: 'guest' }
];

let refreshTokens = [];

/* ================= LOGIN ================= */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Login failed' });
  }

  const payload = {
    userId: user.id,
    role: user.role
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '30s'
  });

  const refreshToken = jwt.sign(
    { tokenId: uuidv4(), userId: user.id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

/* ================= REFRESH TOKEN ================= */
app.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.status(403).json({ message: 'Token expired' });

    const accessToken = jwt.sign(
      { userId: data.userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    res.json({ accessToken });
  });
});

/* ================= MIDDLEWARE AUTH ================= */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

/* ================= API TEST ================= */
app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'User profile',
    user: req.user
  });
});

app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

/* ================= START ================= */
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
