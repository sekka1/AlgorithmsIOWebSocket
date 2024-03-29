/* 
 * Events Model
 * 
 */

var db = require('./db.js');
var pool = db.getPoolConnection();

/**
 * Save into the database.  
 * 
 * Generic data.  The data can be anything but preferably json
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {json} data
 * @param {string} label
 * @param {function} callback
 */
exports.insertGeneric = function (authToken, device_id, data, label, callback) {

    pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO time_series SET ?', {
                auth_token: authToken,
                device_id: device_id,
                data: JSON.stringify(data),
                label: label,
                datetime_created: db.timeNow()},
            function (err, result) {
                if (err) {
                    //throw err;
                    console.log('Error: Models/Events/insertGeneric', err);
                }

                console.log('row id: ' + result.insertId);

                var result = 'success';
                try {
                    callback(null, result);
                } catch (e) {
                    console.log("Error: MySQL mem leak" + e);
                    //console.log(e);
                } finally {
                    // And done with the connection.
                    connection.release();
                }

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
 * @param {function} callback
 */
exports.insertAccelerometerGyroscope = function(authToken, device_id, accelerometer_x, accelerometer_y, accelerometer_z, gyroscope_x, gyroscope_y, gyroscope_z, rotation_x, rotation_y, rotation_z, label, callback){

    pool.getConnection(function(err, connection) {
        connection.query('INSERT INTO time_series_accelerometer_gyroscope SET ?', {auth_token: authToken, 
                                                            device_id: device_id, 
                                                            accelerometer_x: accelerometer_x,
                                                            accelerometer_y: accelerometer_y,
                                                            accelerometer_z: accelerometer_z,
                                                            gyroscope_x: gyroscope_x,
                                                            gyroscope_y: gyroscope_y,
                                                            gyroscope_z: gyroscope_z,
                                                            rotation_x: rotation_x,
                                                            rotation_y: rotation_y,
                                                            rotation_z: rotation_z,
                                                            label: label, 
                                                            datetime_created: db.timeNow()}, 
                                                        function(err, result) {
                                                            if (err){
                                                                //throw err;
                                                                console.log('Error: Models/Events/insertAccelerometerGyroscope', err);
                                                            }

            //console.log('row id: ' + result.insertId);


                                                            var result = 'success';

                                                            try{
                                                                callback(null, result);
                                                            }catch(e){
                                                                console.log("Error: MySQL mem leak" + e);
                                                                //console.log(e);
                                                            }finally{
                                                                // And done with the connection.
                                                                connection.release();
                                                            }

            

        });
    });
};