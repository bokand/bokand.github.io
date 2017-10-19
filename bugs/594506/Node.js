(function() {
  var _ = {};
  
  var ArrayProto = Array.prototype;
  var FuncProto = Function.prototype;
  
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  var breaker = {};

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };
  
    // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };
  
    // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };
  
  var testFunction = function() {
	var objects = {};
	for (var i = 0; i < 100; i++) {
		objects["object"+i] = {};
		for (var j = 0; j < 20; j++) {
			objects["object"+i]["propterty"+j] = {};
		}
	}		
	
    var failures = 0;
    var successes = 0;
	_.each(objects, function (properties, uidKey){
      _.each(properties, function(pset, uidValue){
		if (_.find({"version":{"_relationshipMinorType":"ASSET_VERSION"}}, function(port){
          return port._relationshipMinorType === "ASSET_VERSION"}) === undefined) {
			failures++;
		} else {
			successes++;
		}
      });
    });
    console.log('Successes: ' + successes + ' Failures: ' + failures);

  };

  for (var i = 0; i < 10; i++) {
    testFunction();
  }

})();