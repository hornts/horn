import { HttpAdapter } from '@hornts/core';
import { Express } from 'express';
import * as express from 'express';

export class ExpressAdapter extends HttpAdapter {
  constructor(app?: Express) {
    super(app || express());
  }
}
