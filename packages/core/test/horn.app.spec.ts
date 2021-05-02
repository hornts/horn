import { Module } from '@hornts/common';
import { HornApplication, HornFactory } from '@hornts/core';
import { ExpressAdapter } from '@hornts/http-express';
import * as request from 'supertest';

describe('HornFactory', () => {
  let horn: HornApplication<ExpressAdapter>;

  beforeAll(() => {
    @Module()
    class AppModule {}

    horn = HornFactory.create(AppModule, new ExpressAdapter());

    horn.listen(8080);
  });

  it('should init horn app with express', (done) => {
    request(horn.http.server).get('/').expect(404, done);
  });
});
