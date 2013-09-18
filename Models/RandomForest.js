/* 
 * Random Forest Model
 * 
 */

var db = require('./db.js');
var pool = db.getPoolConnection();

/**
 * Retrieves rolling sample (avg and std) of accelerometer and gyroscope events for an authToken and device_id
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {json} data
 * @param {string} label
 * @param {type} callback
 */
exports.getRollingSampleAvgSTD = function(authToken, device_id, callback){
    
    pool.getConnection(function(err, connection) {
        connection.query('select auth_token, device_id, avg(accelerometer_x) as avg_accelerometer_x, std(accelerometer_x) as std_accelerometer_x, avg(accelerometer_y) as avg_accelerometer_y, std(accelerometer_y) as std_accelerometer_y, avg(accelerometer_z) as avg_accelerometer_z, std(accelerometer_z) as std_accelerometer_z, avg(gyroscope_x) as avg_gyroscope_x, std(gyroscope_x) as std_gyroscope_x, avg(gyroscope_y) as avg_gyroscope_y, std(gyroscope_y) as std_gyroscope_y, avg(gyroscope_z) as avg_gyroscope_z, std(gyroscope_z) as std_gyroscope_z, avg(rotation_x) as avg_rotation_x, std(rotation_x) as std_rotation_x, avg(rotation_y) as avg_rotation_y, std(rotation_y) as std_rotation_y, avg(rotation_z) as avg_rotation_z, std(rotation_z) as std_rotation_z  from time_series_accelerometer_gyroscope where datetime_created >= now() - interval 1 day group by auth_token, device_id', function(err, result) {
            
            if (err) throw err;

            //console.log('row id: ' + result.insertId);

            //var result = 'success';
            callback(null, result);
            
            // And done with the connection.
            connection.release();
        });
    });
};