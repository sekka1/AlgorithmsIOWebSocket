/**
 * Events Controller
 * 
 * @author gkan
 */

// Event Model
var eventsModel = require('../../Models/Events.js');

/**
 * Save an event.  This is a generic data event.  The data is a text field.
 * 
 * We do prefer the data to be in json though.
 * 
 * @param {object} params
 * @param {function} callback
 */
exports.saveGeneric = function(params, callback){
    
    eventsModel.insertGeneric(params.authToken, params.device_id, params.data, params.label, function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};

/**
 * Save an event.  This is specific to time_series_accelerometer_gyroscope
 * 
 * The accelerometer x, y , z and gyroscope x, y, z are passed in
 * 
 * @param {object} params
 * @param {function} callback
 */
exports.saveAccelerometerGyroscope = function(params, callback){

    eventsModel.insertAccelerometerGyroscope(params.authToken, params.device_id, params.accelerometer_x, params.accelerometer_y, params.accelerometer_z, params.gyroscope_x, params.gyroscope_y, params.gyroscope_z, params.rotation_x, params.rotation_y, params.rotation_z, params.label, function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};