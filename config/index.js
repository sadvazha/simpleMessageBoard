module.exports = {
    server: {
        port: 80,
        host: 'localhost',
    },

    expressJsonBodyParserOptions: {
        inflate: true,
        limit: 4096,
        reviver: null,
        strict: true,
        type: 'application/json',
        verify: undefined,
    },
};