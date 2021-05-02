import { HttpAdapter } from '@hornts/core';
import { fastify, FastifyInstance } from 'fastify';

export class FastifyAdapter extends HttpAdapter {
  constructor(app?: FastifyInstance) {
    super(app || fastify());
  }
}
