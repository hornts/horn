import { Module } from '@hornts/common';
import { HornApplication, HornFactory } from '@hornts/core';
import { ExpressAdapter } from '@hornts/http-express';
import * as request from 'supertest';

describe('HornFactory', () => {
  let horn: HornApplication<ExpressAdapter>;

  beforeAll(async () => {
    @Module()
    class AppModule {}

    horn = await HornFactory.create(AppModule, new ExpressAdapter(), { logger: false });

    horn.listen(8080);
  });

  it('should init horn app with express', (done) => {
    request(horn.getHttpInstance()).get('/').expect(404, done);
  });
});
