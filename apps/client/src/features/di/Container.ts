/* eslint-disable @typescript-eslint/no-explicit-any */

export class Container {
  private singletons = new Map<string, any>();
  private factories = new Map<string, () => any>();

  registerSingleton<T>(key: string, instance: T) {
    this.singletons.set(key, instance);
  }

  registerTransient<T>(key: string, factory: () => T) {
    this.factories.set(key, factory);
  }

  resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key);
    }

    const factory = this.factories.get(key);
    if (factory) {
      const instance = factory();
      return instance;
    }

    throw new Error(`No binding found for key: ${key}`);
  }
}
