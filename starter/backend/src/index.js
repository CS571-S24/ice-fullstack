// !!! IMPORTANT !!!
// Be sure to run 'npm run dev' from a
// terminal in the 'backend' directory!

import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'

const app = express();
const port = 53706;

const GET_POST_SQL = 'SELECT * FROM BadgerComment;'
const GET_SPECIFIC_POST_SQL = 'SELECT * FROM BadgerComment WHERE id = ?;'
const INSERT_POST_SQL = 'INSERT INTO BadgerComment(comment, created) VALUES (?, ?) RETURNING id;'
const DELETE_POST_SQL = "DELETE FROM BadgerComment WHERE id = ?;"

const db = await open({
    filename: process.env['MINI_BADGERCHAT_DB_LOC'] ?? "./db.db",
    driver: sqlite3.Database
});

await db.exec("CREATE TABLE IF NOT EXISTS BadgerComment(id INTEGER PRIMARY KEY UNIQUE, comment TEXT NOT NULL, created TIMESTAMP NOT NULL);")

applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

app.get('/api/hello-world', (req, res) => {
    res.status(200).send({
        msg: "Hello! :)"
    })
})

app.get('/api/comments', async (req, res) => {
    res.status(200).send([
        {
            id: 7163,
            comment: "I need to implement BadgerChat Nano!",
            created: new Date()
        }
    ])
})

app.post('/api/comments', async (req, res) => {
    const comment = req.body.comment;

    res.status(200).send({
        msg: "I should create a comment."
    })
})

app.delete('/api/comments', async (req, res) => {
    const commentId = req.query.id;
   
    res.status(200).send({
        msg: "I should delete a comment."
    })
});

applyErrorCatching(app);

// Open server for business!
app.listen(port, () => {
    console.log(`My API has been opened on :${port}`)
});
