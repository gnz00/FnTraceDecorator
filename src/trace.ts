class TraceDecorator
{
    constructor(...args: any[])
    {
        const [target, name, descriptor] = args;
        const isUndefined = prop => typeof prop === "undefined";

        if (!isUndefined(target) && isUndefined(name) && isUndefined(descriptor))
        {
          TraceDecorator.traceClass(target);
        }
        else if (!isUndefined(target)) 
        {
          TraceDecorator.traceProperty(target, name, descriptor);
        }
    }

    static traceClass(constructor: Function)
    {
      for (let key in constructor.prototype) 
      {
        TraceDecorator.traceProperty(constructor.prototype, key, null);
      }
      
      return constructor;
    }

    static traceProperty(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        if (descriptor || (descriptor = Object.getOwnPropertyDescriptor(target, propertyKey))) 
        {
            let originalMethod = descriptor.value; // save a reference to the original method
            
            Object.defineProperty(descriptor, 'value', { value: function(...args: any[]) {
                console.log("The method args are: " + JSON.stringify(args)); // pre
                let result = originalMethod.apply(this, args);               // run and store the result
                console.log("The return value is: " + result);               // post
                return result;                                               // return the result of the original method
            }});

            Object.defineProperty(target, propertyKey, descriptor);

            return descriptor;
        }
    }
}

export default TraceDecorator