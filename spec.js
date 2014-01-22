var expect = require('chai').expect;
var sinon = require('sinon');
var Cyclops = require('./cyclops.js');
var testObj;
var c;

beforeEach(function(){
	testObj = { testProp : 'value1' };
	c = new Cyclops(testObj);
});

describe('Cyclops', function(){
	describe('#observe', function(){
		it('should watch an object for changes', function(done){
			var watcher = sinon.spy();
			c.observe('watcher', watcher);
			testObj.testProp = 'value2';
			//setImmediate used to propagate the assertion to the next tick
			setImmediate(function(){
				expect(watcher.calledOnce).to.be.true;
				done();	
			});
		});
		it('should observe if re-activated without callback', function(done){
			var watcher = sinon.spy();
			c.observe('watcher', watcher);
			c.deactivate('watcher');
			c.observe('watcher');
			testObj.testProp = 'value3';
			setImmediate(function(){
				expect(watcher.callCount).to.equal(1);
				done();
			});
		});
		it('should result in error if re-activated with non-existant observer name', function(){
			var throwErr = function(){
				c.observe('watcher');
			};
			expect(throwErr).to.throw(Error);
		});
	});
	describe('#deactivate', function(){
		it('should unobserve existing observers', function(done){
			var watcher = sinon.spy();
			c.observe('watcher', watcher);
			c.deactivate('watcher');
			setImmediate(function(){
				expect(watcher.callCount).to.equal(0);
				done();
			});
		});
	});
	describe('#unobserve', function(){
		it('should delete observers', function(done){
			var watcher = sinon.spy();
			c.observe('watcher', watcher);
			c.unobserve('watcher');
			testObj.testProp = 'value4';
			setImmediate(function(){
				expect(watcher.callCount).to.equal(0);
				done();
			});
		});
		it('should result in error if called with non-existant observer name', function(){
			var throwErr = function(){
				c.unobserve('watcher');
			};
			expect(throwErr).to.throw(Error);
		});
	});
});