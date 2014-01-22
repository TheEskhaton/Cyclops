var Cyclops = function(obj){
	var self = this;
	if(!self instanceof Cyclops) 
	{
		return new Cyclops();
	}
	var _obj = obj;
	var _observers = new Map();
	var _observerWrappers = new Map();
	var _inactive = new Set();
	self.observe = function(name, cb){
		if(!cb){
			if(_inactive.has(name)){
				_inactive.delete(name);
				return;
			}
			else{
				throw new Error("No observer with the name "+name + " was provided");
			}
		}
		_observers.set(name,function(change){
			if(!_inactive.has(name)){
				cb(change);
			}
		});
		var observerWrapper = function(changes){
			changes.forEach(_observers.get(name));
		};
		_observerWrappers.set(name, observerWrapper);
		Object.observe(_obj, observerWrapper);
	};
	self.deactivate = function(name){
		if(!_observers.has(name)){
			throw new Error("No observer with the name "+name + " was provided");
		}
		_inactive.add(name);
	};

	self.unobserve = function(name){
		if(!_observers.has(name)){
			throw new Error("No observer with the name "+name + " was provided");
		}

		Object.unobserve(_obj, _observerWrappers.get(name));
		_observerWrappers.delete(name);
		_observers.delete(name);
	};
	return self;
};

if(module){
	module.exports = Cyclops;
}
else{
	window.Cyclops = Cyclops;
}