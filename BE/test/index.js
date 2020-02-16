'use strict';

// const { assert } = require('chai');
const bent = require('bent');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const createPost = bent(path.join(BASE_URL, '/v1'), 'POST', 'json', 201);
const getPosts = bent(path.join(BASE_URL, '/v1'), 'GET', 'json', 200);

describe('Tests:', () => {
    describe('POST /posts', () => {
        it('Create a post', async () => {
            await createPost('/posts', {
                text: 'test',
            }, {
                'Content-type': 'application/json',
            });
        });
    });

    describe('GET /posts', () => {
        it('Get posts', async () => {
            await getPosts('/posts');
        });
    });
});
