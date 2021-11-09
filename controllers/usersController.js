const db = require('../db')

const getUsers = async (req, res) => {
    let sql = `SELECT * FROM users`
    db.query(sql, (err, result) => {
        if(err) console.error(err);
        console.log(result)
        res.send(result)
    })
}

const getUser = async (req, res) => {
    let sql = `SELECT * FROM users WHERE id=${req.params.id}`
    db.query(sql, (err, result) => {
        if(err) console.error(err);
        console.log(result)
        res.send(result)
    })
}

const createUser = async (req, res) => {
    let post = {
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password
    };
    let sql = "INSERT INTO users SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.json({
            message: "User Created"
        });
    })
}

module.exports = {
    getUser,
    getUsers,
    createUser
}