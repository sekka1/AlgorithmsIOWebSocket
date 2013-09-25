/**
* Queries
 * 
 * @author gkan
 */
// Query Model
var queryModel = require('../../Models/Queries/Queries.js');

exports.get_data_by_range = function(data, callback){
    var result = '1';
    callback(null, result);
};

/**
 * Get EPS per device_id
 *
 * @param {object} data
 * @param {function} callback
 */
exports.get_last_motion_data = function(data, callback){

    queryModel.getLastMotionData(data.authToken, data.device_id, function(err, accelerometer_x, accelerometer_y, accelerometer_z, gyroscope_x, gyroscope_y, gyroscope_z, rotation_x, rotation_y, rotation_z){
        if(err){
            callback(err,null);
        }else{

            var result = {
                accelerometer_x: accelerometer_x,
                accelerometer_y: accelerometer_y,
                accelerometer_z: accelerometer_z,
                gyroscope_x: gyroscope_x,
                gyroscope_y: gyroscope_y,
                gyroscope_z: gyroscope_z,
                rotation_x: rotation_x,
                rotation_y: rotation_y,
                rotation_z: rotation_z
            };

            callback(null,result);
        }
    });
};