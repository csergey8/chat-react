const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('pusher-chatkit-server');

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:fb42d51f-260c-47be-a0b8-05d73e4aae3a',
  key: '8e1ad918-36ab-4b84-b220-138e5f11c08f:EvdoHuW5BzYtG2jlLOYgwKjUJMzOwKN7+gbhK0Gv2LY=',
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  
  const { username } = req.body;
  chatkit
    .createUser({
      "id": username,
      "name": username
    })
    .then(() => res.sendStatus(201))
    .catch( error => {
      if (error.error_type === 'services/chatkit/user/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.sendStatus(error.statusCode).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body;
  res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id}))
  console.log(res);
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
