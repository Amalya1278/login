const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const authController = require('./auth/authController');
const jwtMiddleware = require('./middleware/jwtMiddleware');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

app.get('/secure', jwtMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to the secure page!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
