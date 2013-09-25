/* 
 * Quuries Model
 * 
 */

var db = require('./../db.js');
var pool = db.getPoolConnection();

// Table to calculate EPS stats on.
var tableName = 'time_series_accelerometer_gyroscope';


/**
 * Retrieves the last motion data for the given authToken and device_id
 *
 * @param {string} authToken
 * @param {string} device_id
 * @param {function} callback
 */
exports.getLastMotionData = function(authToken, device_id, callback){

    pool.getConnection(function(err, connection) {
        connection.query('select accelerometer_x, accelerometer_y, accelerometer_z, gyroscope_x, gyroscope_y, gyroscope_z, rotation_x, rotation_y, rotation_z, label, datetime_created as count from '+tableName+' where  auth_token = "'+authToken+'" and device_id = "'+device_id+'" order by datetime_created desc limit 1', function(err, result) {

            if (err) throw err;


            if(typeof result[0] != 'undefined'){
                callback(null, result[0].accelerometer_x, result[0].accelerometer_y, result[0].accelerometer_z, result[0].gyroscope_x, result[0].gyroscope_y, result[0].gyroscope_z, result[0].rotation_x, result[0].rotation_y, result[0].rotation_z);
            }else{
                // No results.  User might not have inserted any events yet for this device
                callback(null, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            }



            // And done with the connection.
            connection.release();
        });
    });
};