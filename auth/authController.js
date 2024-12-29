const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');
const logsFile = path.join(__dirname, '../data/logs.json');

const readJSON = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJSON = (filePath, data) => {
  const newData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, newData);
};

const log = (message) => {
  const logs = readJSON(logsFile);
  logs.push({ date: new Date(), message });
  writeJSON(logsFile, logs);
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(usersFile);

  if (users[username]) {
    return res.send("user already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  users[username] = { username, password: hashedPassword };
console.log("added")
  writeJSON(usersFile, users);
  
  log(username)


  res.send("user registered");
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(usersFile);
  const user = users[username];

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.send("invalid username or pasword");
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  log('Successful login');

  res.status(200).json({ token });
};
