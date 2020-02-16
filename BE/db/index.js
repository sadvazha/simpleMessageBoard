'use strict';

const AWS = require('aws-sdk');

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDbInstance;
if (IS_OFFLINE === 'true') {
  dynamoDbInstance = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
} else {
  dynamoDbInstance = new AWS.DynamoDB.DocumentClient();
};

module.exports = {
    dynamoDbInstance,
};