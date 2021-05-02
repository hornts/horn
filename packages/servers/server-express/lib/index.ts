import { ServerAdapter } from '@hornts/core';
import { Express } from 'express';
import * as express from 'express';

export class ExpressAdapter extends ServerAdapter {
  constructor(app?: Express) {
    super(app || express());
  }
}
