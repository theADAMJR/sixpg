import request from 'supertest';
import { app } from '../../../../src/api/server';
import Deps from '../../../../src/utils/deps';

describe('routes/api/guilds', () => {
    let url: string;

    beforeEach(() => {
        url = '/api/guilds';
        Deps.testing = true;
    });

    describe('GET /:id/log', () => {
        it('found guild, returns guild', (done) => {
            url += `/${config.tests.guild}/public`;

            request(app).get(url)
                .expect(200)
                .end(done);
        });
    });
    
    describe('GET /:id/public', () => {
        it('found guild, returns guild', (done) => {
            url += `/${config.tests.guild}/public`;

            request(app).get(url)
                .expect(200)
                .end(done);
        });

        it('unknown guild, returns undefined', (done) => {
            url += '/321/public';

            request(app).get(url)
                .expect(200)
                .expect(undefined)
                .end(done);
        });
    });
        
    describe('GET /', () => {
        it('no key, returns 400', (done) => {
            request(app).get(url)
                .expect(400)
                .end(done);
        });
    });
    
    describe('POST /', () => {
        it('no key, returns 400', (done) => {
            request(app).get(url)
                .expect(400)
                .end(done);
        });
    });
    
    describe('GET /:id/users', () => {
        url += '/123/users';

        it('unknown guild, returns 404', (done) => {
            request(app).get(url)
                .expect(404)
                .end(done);
        });
    });
});
