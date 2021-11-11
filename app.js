const express = require('express')
const jwt = require('jsonwebtoken')
const { getMaxListeners } = require('./db')
const db = require('./db')
const posts = require("./routes/posts")
const users = require("./routes/users")
const app = express()
const port = 3000

// connect to database
db.connect((err) => {
    if(err) throw err;
    console.log("connected successfully.")
  })

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
// using user json inputs
app.use(express.json())

//ROUTES
// app.use('/api/v1/posts', posts); //POSTS
app.use('/api/v1/users', users); //Users
app.post('/api/v1/posts', verifyToken, (req, res) => {
  jwt.verify(req.headers.token, 'secretKey', (err, authData) => {
    if(err) res.sendStatus(403)
    let post = {title: req.body.title, body: req.body.body};
    let sql = "INSERT INTO posts SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.json({
          message: "Post Created",
          authData
        });
    })
  })
})
app.use('/login', (req, res) => {
  const user = {
    email: 'john@getMaxListeners.com',
    password: 'john1234'
  };

  // jwt.sign({user: user}, 'secretKey', (err, token) => {
  //   res.json({
  //     token: token,
  //     user: user
  //   })
  // });

  jwt.sign(user, 'secretKey', (err, token) => {
    res.json({
      user,
      token
    })
  })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
  // get token
  const bearerHeader = req.headers['authorization'];
  // check if bearer header is defined
  if(typeof bearerHeader === 'undefined'){
    res.sendStatus(403);
  }
  //split the header
  const bearer = bearerHeader.split(' ');
  // set the token
  req.headers.token = bearer[1];
  //next middleware
  next();
}

app.listen(port, () => console.log(`Node MySql app is listening on port ${port}`))
