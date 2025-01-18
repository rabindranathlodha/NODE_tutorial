const express = require('express');
const users = require('./MOCK_DATA (1).json');
const mongoose = require('mongoose');
const fs = require('fs');
const e = require('express');

const app = express();
PORT = 3000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    },
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  fs.appendFile('log.txt', `${Date.now().toFixed()} : ${req.method} : ${req.path}\n`, (err, data) => {
    next();
  });
});

app.get('/', (req, res) => {
  res.send('Hello from Home Page');
});

app.get('/users', (req, res) => {
  const html = users.map(user => {
    return `
      <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
      </ul>`}).join('');
  res.send(html);
});

app.get('/api/users', (req, res) => {
  res.setHeader("X-MyName", "Rabindra");
  res.json(users);
});

app.route('/api/users/:id')
.get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id == id);
  if(!user) return res.status(404).send('User not found');
  res.send(user);
})
.patch((req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id == id);
  const body = req.body;
  const updatedUser = {...user, ...body};
  const index = users.indexOf(user);
  users[index] = updatedUser;
  fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users), (err) => {
    if(err) {
      return res.json({status: "Failed"});
    }
    return res.json({status: "Success"});
  });
})
.delete((req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id == id);
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users), (err) => {
    if(err) {
      return res.json({status: "Failed"});
    }
    return res.json({status: "Success"});
  });
});

app.post('/api/users', async (req, res) => {
  const body = req.body;
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender
  });

  console.log(result);
  return res.status(201).json({msg: 'User created successfully'});

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});