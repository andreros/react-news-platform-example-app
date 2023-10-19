const request = require('supertest');
const api = require('../../src/server/api');
const config = require('../../src/config');

describe('Root Endpoint', () => {
    it('Get root', async () => {
        const res = await request(api).get(`${config.basePath}/`);
        expect(res.statusCode).toEqual(200);
        expect(res.header['content-type']).toContain('application/json');
        expect(res.body.message).toBe('alive');
    });
});
