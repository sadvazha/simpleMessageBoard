'use strict';

// const { assert } = require('chai');
const bent = require('bent');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const successfulPost = bent(path.join(BASE_URL, '/v1'), 'POST', 'json', 201);
const successfulGet = bent(path.join(BASE_URL, '/v1'), 'GET', 'json', 200);
const badRequsestPost = bent(path.join(BASE_URL, '/v1'), 'POST', 'json', 400);

describe('Tests:', () => {
    describe('POST /posts', () => {
        describe('201:', () => {
            it('Create a post', async () => {
                await successfulPost('/posts', {
                    text: 'test',
                }, {
                    'Content-type': 'application/json',
                });
            });
        });

        describe('400:', () => {
            it('Empty body', async () => {
                await badRequsestPost('/posts', {}, {
                    'Content-type': 'application/json',
                });
            });

            it('Wrong text format', async () => {
                await badRequsestPost('/posts', {
                    text: 1,
                }, {
                    'Content-type': 'application/json',
                });
            });
        });
    });

    describe('GET /posts', () => {
        describe('200:', () => {
            it('Get posts', async () => {
                await successfulGet('/posts');
            });
        });
    });
});
