import { Controller, Injectable } from '../injectable';
import { Module } from '../module';

export type NodeTypes = Module | Controller | Injectable;

/**
 * Represents dependency graph node.
 */
export class Node<T extends NodeTypes> {
  constructor(private readonly data: T) {}

  public getData(): T {
    return this.data;
  }
}
