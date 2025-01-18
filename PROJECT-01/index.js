const express = require('express');
const users = require('./MOCK_DATA (1).json');
const fs = require('fs');

const app = express();
PORT = 3000;

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

app.post('/api/users', (req, res) => {
  const body = req.body;
  users.push({...body, id: users.length + 1});
  fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users), (err) => {
    if(err) {
      return res.json({status: "Failed"});
    }
    return res.json({status: "Success", id: users.length});
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});