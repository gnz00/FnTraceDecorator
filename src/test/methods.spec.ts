import trace from '../trace'
import * as sinon from 'sinon';
import { expect, assert } from 'chai';

class TestClass
{
    @trace
    method1(arg1: number)
    {
        return arg1;
    }
}



describe("methods", () => {
    var subject : TestClass;
    var log : string;
    var myLogSpy;
    var originalLog = console.log;
    
    beforeEach(() => {
        log = "";
        subject = new TestClass();
        myLogSpy = sinon.spy();
        console.log = (message, ...args) => {
            myLogSpy.call(this, message, ...args);
            originalLog.call(this, message, ...args)
        };
    })

    afterEach(() => {
        console.log = originalLog;
    })

    it("should log the arguments and return value", (done) => {
        subject.method1(1);
        expect(myLogSpy.calledTwice, "Log was called twice for the method...");
        assert(myLogSpy.calledWith("The method args are: [1]"));
        assert(myLogSpy.calledWith("The return value is: 1"));
        done();
    });

})