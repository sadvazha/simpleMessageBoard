'use strict';

const AWS = require('aws-sdk');
const express = require('express');
const serverless = require('serverless-http');
const uuid = require('uuid');

const app = express();

app.use(express.json());

const POSTS_TABLE = process.env.POSTS_TABLE;

const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.get('/v1/posts', async function (req, res, next) {
    const params = {
        TableName: POSTS_TABLE,
        Limit: 5,
    };
    
    try {
        const postList = await dynamoDb.scan(params).promise();
        res.json({ postList });
    } catch (e) {
        res.status(404).json({error});
    }
});

app.post('/v1/posts', async function (req, res, next) {
    if (!req.body.text || typeof req.body.text !== 'string') {
        res.status(400).json({ error: '"text" must be provided and must be type of string and must not be empty' });
    }

    const { text } = req.body;
    const postId = uuid.v4();

    const post = {
        TableName: POSTS_TABLE,
        Item: {
            postId,
            text,
        },
    };

    try {
        await dynamoDb.put(post).promise();
        res.json({ postId, text });
    } catch (err) {
        res.status(500).json({error});
    }
});

module.exports.handler = serverless(app);