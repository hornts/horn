import { Logger, Module } from '@hornts/common';

import { HornApplication, HttpAdapter } from '../lib';

class MockedHttpAdapter extends HttpAdapter {}

describe('HornApplication', () => {
  it('should create horn application without options', () => {
    @Module()
    class RootModule {}

    const loggerSpy = jest.spyOn(Logger.prototype, 'info');

    const app = new HornApplication(RootModule);

    expect(app).toBeInstanceOf(HornApplication);
    expect(loggerSpy).toBeCalled();
  });

  it('should create horn application with options { logger: true }', () => {
    @Module()
    class RootModule {}

    const loggerSpy = jest.spyOn(Logger.prototype, 'info');

    const app = new HornApplication(RootModule, {
      logger: true,
    });

    expect(app).toBeInstanceOf(HornApplication);
    expect(loggerSpy).toBeCalled();
  });

  it('should create horn application with options', async () => {
    @Module()
    class RootModule {}

    const loggerSpy = jest.spyOn(Logger.prototype, 'info');

    const http = new MockedHttpAdapter({});

    const httpSpy = jest.spyOn(http, 'listen').mockImplementation(() => Promise.resolve());

    const app = new HornApplication(RootModule, {
      logger: new Logger(),
      http,
    });

    await app.listen(8080);

    expect(app).toBeInstanceOf(HornApplication);
    expect(loggerSpy).toBeCalled();
    expect(app.getHttpInstance()).toBe(http.getInstance());
    expect(httpSpy).lastCalledWith(8080);
  });
});
