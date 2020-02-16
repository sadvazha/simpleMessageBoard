'use strict';

const { dynamoDbInstance: dynamoDb} = require('./db');
const express = require('express');
const serverless = require('serverless-http');
const uuid = require('uuid');

const app = express();

app.use(express.json({
    limit: '256kb',
    strict: true,
}));

const POSTS_TABLE = process.env.POSTS_TABLE;
const ITEMS_LIMIT_PER_REQUEST = 5;

app.get('/v1/posts', async function (req, res) {
    const params = {
        TableName: POSTS_TABLE,
        Limit: ITEMS_LIMIT_PER_REQUEST,
    };
    
    try {
        const posts = [];
        let finished = true;

        while (posts.length < ITEMS_LIMIT_PER_REQUEST && finished) {
            const postList = await dynamoDb.scan(params).promise();
            if (!postList.LastEvaluatedKey) {
                finished = false;
            }
            posts.push(...postList.Items);
        }

        res.json({ posts });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.post('/v1/posts', async function (req, res) {
    if (!req.body.text || typeof req.body.text !== 'string') {
        return res.status(400).json({ error: '"text" must be provided and must be type of string and must not be empty' });
    }

    const { text } = req.body;
    const postId = uuid.v4();

    const post = {
        TableName: POSTS_TABLE,
        Item: {
            postId,
            text,
            date: Date.now(),
        },
    };

    try {
        await dynamoDb.put(post).promise();
        res.status(201).json({ postId });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports.handler = serverless(app);
