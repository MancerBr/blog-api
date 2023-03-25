export abstract class ISeeder {
  public abstract seed(): Promise<void>;
}
