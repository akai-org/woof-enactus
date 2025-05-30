interface Dependency<T = unknown> {
  instance: T;
}

type DependencyKey = string;
type DependencyFactory<T> = () => T;

export class Container {
  private readonly _singletons = new Map<DependencyKey, Dependency>();
  private readonly _factories = new Map<
    DependencyKey,
    DependencyFactory<unknown>
  >();

  public registerSingleton<T>(key: DependencyKey, instance: T): T {
    if (this.isDependencyRegistered(key)) {
      throw new Error(
        `Dependency with key: ${key} has already been registered.`,
      );
    }

    const dependency: Dependency<T> = {
      instance,
    };

    this._singletons.set(key, dependency);
    return instance;
  }

  public registerTransient<T>(
    key: DependencyKey,
    factory: DependencyFactory<T>,
  ): void {
    if (this.isDependencyRegistered(key)) {
      throw new Error(
        `Dependency with key: ${key} has already been registered.`,
      );
    }

    this._factories.set(key, factory as DependencyFactory<unknown>);
  }

  public resolve<T>(key: DependencyKey): T {
    const dependency = this._singletons.get(key) as Dependency<T> | undefined;
    if (dependency) {
      return dependency.instance;
    }

    const factory = this._factories.get(key) as
      | DependencyFactory<T>
      | undefined;
    if (factory) {
      return factory();
    }

    throw new Error(`No binding found for key: ${key}`);
  }

  private isDependencyRegistered(key: DependencyKey): boolean {
    return this._singletons.has(key) || this._factories.has(key);
  }
}
