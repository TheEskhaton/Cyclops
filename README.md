### Cyclops.js - EXPERIMENTAL Object.observe wrapper library ###

**Contributing**

Requires node version 0.11.x
 - clone this repository
 - run ```npm install --dev``` to install dependencies
 - use ```npm test``` to run tests

**Example**

``` javascript
var testObj = { testProp : 'value1' };
var c = new Cyclops(testObj);
c.observe('watcherName', function(change){
	//Object.observe callback with native "change" object
});
c.unobserve('watcherName'); // temporarily disables watcherName observer
c.observe('watcherName'); // activates the watcherName observer
c.deleteObserver('watcherName'); //deletes the watcherName observer (c.observe('watcherName') throws error)
