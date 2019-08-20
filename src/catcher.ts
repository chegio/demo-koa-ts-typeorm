export default class errorHandler {
  constructor(handle: Function = console.log) {
    handle: handle;
    console.log("here is in error handler ...");
  }

  static runTarget(fn: Function): any {
    return fn.constructor.name === "AsyncFunction"
      ? async (...args) => {
          try {
            await fn.apply(this, args);
          } catch (err) {
            console.log(err);
          }
        }
      : (...args) => {
          try {
            const res = fn.apply(args);
            if (res instanceof Promise) res.catch(err => console.log(err));
          } catch (error) {
            console.log(error);
          }
        };
  }

  static catcher<T>(): any {
    return (
      target: Function,
      propertyKey?: string,
      descriptor?: TypedPropertyDescriptor<T>
    ) => {
      if (typeof target === "function") return this.runTarget(target);
      let func: Function;
      let descriptorItemName: string;
      const getter = descriptor.get;
      const value: any = descriptor.value;
      [func, descriptorItemName] = getter ? [getter, "get"] : [value, "value"];
      return {
        ...descriptor,
        [descriptorItemName]: this.runTarget(func)
      };
    };
  }
}
