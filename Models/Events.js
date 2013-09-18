/* 
 * Events Model
 * 
 */

var db = require('./db.js');
var pool = db.getPoolConnection();

/**
 * Save into the database.  
 * 
 * Generic data.  The data can be anything but preferablly json
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {json} data
 * @param {string} label
 * @param {type} callback
 */
exports.insertGeneric = function(authToken, device_id, data, label, callback){
    
    pool.getConnection(function(err, connection) {
        connection.query('INSERT INTO time_series SET ?', {auth_token: authToken, 
                                                            device_id: device_id, 
                                                            data: data, 
                                                            label: label, 
                                                            datetime_created: db.timeNow()}, 
                                                        function(err, result) {
            if (err) throw err;

            console.log('row id: ' + result.insertId);

            var result = 'success';
            callback(null, result);
            
            // And done with the connection.
            connection.release();
        });
    });
};

/**
 * Save into the database.  
 * 
 * Specifically for time_series_accelerometer_gyroscope data.  There are specific
 * fields for them.
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {json} data
 * @param {string} label
 * @param {type} callback
 */
exports.insertAccelerometerGyroscope = function(authToken, device_id, accelerometer_x, accelerometer_y, accelerometer_z, gyroscope_x, gyroscope_y, gyroscope_z, label, callback){
    
    pool.getConnection(function(err, connection) {
        connection.query('INSERT INTO time_series_accelerometer_gyroscope SET ?', {auth_token: authToken, 
                                                            device_id: device_id, 
                                                            accelerometer_x: accelerometer_x,
                                                            accelerometer_y: accelerometer_y,
                                                            accelerometer_z: accelerometer_z,
                                                            gyroscope_x: gyroscope_x,
                                                            gyroscope_y: gyroscope_y,
                                                            gyroscope_z: gyroscope_z,
                                                            label: label, 
                                                            datetime_created: db.timeNow()}, 
                                                        function(err, result) {
            if (err) throw err;

            console.log('row id: ' + result.insertId);

            var result = 'success';
            callback(null, result);
            
            // And done with the connection.
            connection.release();
        });
    });
};