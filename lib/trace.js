"use strict";
var TraceDecorator = (function () {
    function TraceDecorator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var target = args[0], name = args[1], descriptor = args[2];
        var isUndefined = function (prop) { return typeof prop === "undefined"; };
        if (!isUndefined(target) && isUndefined(name) && isUndefined(descriptor)) {
            TraceDecorator.traceClass(target);
        }
        else if (!isUndefined(target)) {
            TraceDecorator.traceProperty(target, name, descriptor);
        }
    }
    TraceDecorator.traceClass = function (constructor) {
        for (var key in constructor.prototype) {
            TraceDecorator.traceProperty(constructor.prototype, key, null);
        }
        return constructor;
    };
    TraceDecorator.traceProperty = function (target, propertyKey, descriptor) {
        if (descriptor || (descriptor = Object.getOwnPropertyDescriptor(target, propertyKey))) {
            var originalMethod_1 = descriptor.value; // save a reference to the original method
            Object.defineProperty(descriptor, 'value', { value: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    console.log("The method args are: " + JSON.stringify(args)); // pre
                    var result = originalMethod_1.apply(this, args); // run and store the result
                    console.log("The return value is: " + result); // post
                    return result; // return the result of the original method
                } });
            Object.defineProperty(target, propertyKey, descriptor);
            return descriptor;
        }
    };
    return TraceDecorator;
}());
exports.__esModule = true;
exports["default"] = TraceDecorator;
