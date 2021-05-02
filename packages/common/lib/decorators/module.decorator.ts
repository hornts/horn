import { IModule } from '../interfaces';

export function Module(config?: IModule): ClassDecorator {
  return () => {};
}
