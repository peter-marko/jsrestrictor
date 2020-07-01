

(function() {
	var wrappers = [
		{
			parent_object: "navigator.geolocation",
			parent_object_property: "getCurrentPosition",
						
			wrapped_objects: [
				{
					original_name: "navigator.geolocation.getCurrentPosition",
					wrapped_name: "originalGetCurrentPosition",
				},
			],
			helping_code: rounding_function + noise_function +
			`
			var setAllGpsDataToZero = false;
			if (args[0] == "b") {
			}
			setAllGPSDataToZero = args[0];
			var latitudePrecisionInDecimalPlaces = args[1];
			var longitudePrecisionInDecimalPlaces = args[2];
			var altitudePrecisionInDecimalPlaces = args[3];
			var accuracyPrecisionInDecimalPlaces = args[4];
			var altitudeAccuracyPrecisionInDecimalPlaces = args[5];
			var headingPrecisionInDecimalPlaces = args[6];
			var speedPrecisionInDecimalPlaces = args[7];
			var timestampPrecisionInDecimalPlaces = args[8];
			var func = rounding_function;
			if (args[8]) {
				func = noise_function;
			}
			`,
			wrapping_function_args: "successCallback",
			wrapping_function_body: `
				function error(err) {
						console.warn('ERROR(' + err.code + '): ' + err.message);
				}

				function error(err) {
						console.warn('ERROR(' + err.code + '): ' + err.message);
				}

				var options = {
					enableHighAccuracy: false,
					timeout: 5000,
					maximumAge: 0
				};
				originalGetCurrentPosition.call(navigator.geolocation, processOriginalGPSDataObject, error, options);

				function processOriginalGPSDataObject(originalPositionObject) {
					var newLatitude = 0;
					var newLongitude = 0;
					var newAltitude = 0;
					var newAccuracy = 0;
					var newAltitudeAccuracy = 0;
					var newHeading = 0;
					var newSpeed = 0;
					var newTimestamp = 0;
			
					if (!setAllGpsDataToZero) {
						if (originalPositionObject.coords.latitude != null && originalPositionObject.coords.latitude != Infinity && originalPositionObject.coords.latitude >= 0) {
								newLatitude = rounding_function(originalPositionObject.coords.latitude, latitudePrecisionInDecimalPlaces);
						}
						if (originalPositionObject.coords.longitude != null && originalPositionObject.coords.longitude != Infinity && originalPositionObject.coords.longitude >= 0) {
							newLongitude = rounding_function(originalPositionObject.coords.longitude, longitudePrecisionInDecimalPlaces);
						}
						if (originalPositionObject.coords.altitude != null && originalPositionObject.coords.altitude != Infinity && originalPositionObject.coords.altitude >= 0) {
							newAltitude = rounding_function(originalPositionObject.coords.altitude, altitudePrecisionInDecimalPlaces);
						}
						if (originalPositionObject.coords.accuracy != null && originalPositionObject.coords.accuracy != Infinity && originalPositionObject.coords.accuracy >= 0) {
							newAccuracy = rounding_function(originalPositionObject.coords.accuracy, accuracyPrecisionInDecimalPlaces);
						}
						if (originalPositionObject.coords.altitudeAccuracy != null && originalPositionObject.coords.altitudeAccuracy != Infinity && originalPositionObject.coords.altitudeAccuracy >= 0) {
							newAltitudeAccuracy = rounding_function(originalPositionObject.coords.altitudeAccuracy, altitudeAccuracyPrecisionInDecimalPlaces);
						}
						if (originalPositionObject.coords.heading != null && originalPositionObject.coords.heading != Infinity && originalPositionObject.coords.heading >= 0) {
							newHeading = rounding_function(originalPositionObject.coords.heading, headingPrecisionInDecimalPlaces);
						}
						if (originalPositionObject.coords.speed != null && originalPositionObject.coords.speed != Infinity && originalPositionObject.coords.speed >= 0) {
							newSpeed = rounding_function(originalPositionObject.coords.speed, speedPrecisionInDecimalPlaces);
						}
						if (originalPositionObject.timestamp != null && originalPositionObject.timestamp != Infinity && originalPositionObject.timestamp >= 0) {
							newTimestamp = rounding_function(originalPositionObject.timestamp, timestampPrecisionInDecimalPlaces);
						}
					}
			
					const editedPositionObject = {
						coords: {
							latitude: newLatitude,
							longitude: newLongitude,
							altitude: newAltitude,
							accuracy: newAccuracy,
							altitudeAccuracy: newAltitudeAccuracy,
							heading: newHeading,
							speed: newSpeed,
							__proto__: originalPositionObject.coords.__proto__
						},
						timestamp: newTimestamp,
						__proto__: originalPositionObject.__proto__
					};
					successCallback(editedPositionObject);
				}
			`,
		},
		{
			parent_object: "navigator.geolocation",
			parent_object_property: "watchPosition",
			wrapped_objects: [
				{
					original_name: "navigator.geolocation.watchPosition",
					wrapped_name: "originalWatchPosition",
				},
			],
			helping_code: "",
			wrapping_function_args: "successCallBack",
			wrapping_function_body: `
			function error(err) {
					console.warn('ERROR(' + err.code + '): ' + err.message);
			}

			var options = {
				enableHighAccuracy: false,
				timeout: 5000,
				maximumAge: 0
			};

			return originalWatchPosition.call(navigator.geolocation, successCallBack, error, options);
			`,
		},
		{
			parent_object: "navigator.geolocation",
			parent_object_property: "clearWatch",
			wrapped_objects: [
				{
					original_name: "navigator.geolocation.clearWatch",
					wrapped_name: "originalClearWatch",
				},
			],
			helping_code: "",
			wrapping_function_args: "id",
			wrapping_function_body: `
				originalClearWatch.call(navigator.geolocation, id);
			`,
		}
	]
	add_wrappers(wrappers);
})();