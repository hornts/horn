export abstract class ServerAdapter {
  constructor(private readonly server: any) {}

  public abstract get();

  public abstract post();

  public abstract delete();

  public abstract put();

  public abstract listen();
}
