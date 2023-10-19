const request = require('supertest');
const api = require('../../../src/server/api');
const config = require('../../../src/config');

describe('Articles Endpoints', () => {
    it('Get articles list by user email', async () => {
        const res = await request(api).get(`${config.basePath}/articles?userEmail=andreros@gmail.com`);
        expect(res.statusCode).toEqual(200);
        expect(res.header['content-type']).toContain('application/json');
        expect(res.body.data).toBeDefined();
        expect(res.body.data).toHaveLength(10);
        expect(res.body.meta).toBeDefined();
        expect(res.body.meta.page).toBeDefined();
        expect(res.body.meta.page).toBe(1);
        expect(res.body.meta.total).toBeDefined();
    });
});
