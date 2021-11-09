const express = require('express')
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
app.use('/api/v1/posts', posts); //POSTS
app.use('/api/v1/users', users); //Users
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Node MySql app is listening on port ${port}`))
