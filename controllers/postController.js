const db = require('../db')
// const Post = require("../models/Post")

const getAllPosts = async (req, res) => {
    let sql = "SELECT * FROM posts";
    db.query(sql, (err, result) => {
        if(err) console.error(err);
        console.log(result)
        res.send(result)
    })
}

const getPost = async (req, res) => {
    let sql = `SELECT * FROM posts WHERE id=${req.params.id}`
    db.query(sql, (err, result) => {
        if(err) console.error(err);
        console.log(result)
        res.send(result)
    })
}

const createPost = async (req, res) => {
    let post = {title: req.body.title, body: req.body.body};
    let sql = "INSERT INTO posts SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.json({
            message: "Post Created"
        });
    })
}

const updatePost = async (req, res) => {
    let post = req.body;
    let sql = `UPDATE posts SET ? WHERE id = ${req.params.id}`;
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.json({
            message: "Post Updated"
        });
    })
}

const deletePost = async (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({
            message: "Post Deleted"
        });
    })
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}
