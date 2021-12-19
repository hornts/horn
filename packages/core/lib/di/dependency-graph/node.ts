import { Controller, Injectable } from '../injectable';
import { Module } from '../module';

export type NodeType = Module | Controller | Injectable;

/**
 * Represents dependency graph node.
 */
export class Node<T extends NodeType> {
  constructor(private readonly data: T) {}

  public getData(): T {
    return this.data;
  }
}
