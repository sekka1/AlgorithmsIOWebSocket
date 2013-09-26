/* 
 * Random Forest Model
 * 
 */

var db = require('./../../db.js');
var pool = db.getPoolConnection();

// Setup output data
// Accelerometer Vars
var avg_accelerometer_x = 0;
var std_accelerometer_x = 0;
var avg_accelerometer_y = 0;
var std_accelerometer_y = 0;
var avg_accelerometer_z = 0;
var std_accelerometer_z = 0;
// Gyroscope vars
var avg_gyroscope_x = 0;
var std_gyroscope_x = 0;
var avg_gyroscope_y = 0;
var std_gyroscope_y = 0;
var avg_gyroscope_z = 0;
var std_gyroscope_z = 0;
// Rotation vars
var avg_rotation_x = 0;
var std_rotation_x = 0;
var avg_rotation_y = 0;
var std_rotation_y = 0;
var avg_rotation_z = 0;
var std_rotation_z = 0;

/**
 * Retrieves rolling sample (avg and std) of accelerometer and gyroscope events for an authToken and device_id
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {function} callback
 */
exports.getRollingSampleAvgSTD = function(authToken, device_id, callback){
    
    pool.getConnection(function(err, connection) {
        connection.query('select auth_token, device_id, avg(accelerometer_x) as avg_accelerometer_x, std(accelerometer_x) as std_accelerometer_x, avg(accelerometer_y) as avg_accelerometer_y, std(accelerometer_y) as std_accelerometer_y, avg(accelerometer_z) as avg_accelerometer_z, std(accelerometer_z) as std_accelerometer_z, avg(gyroscope_x) as avg_gyroscope_x, std(gyroscope_x) as std_gyroscope_x, avg(gyroscope_y) as avg_gyroscope_y, std(gyroscope_y) as std_gyroscope_y, avg(gyroscope_z) as avg_gyroscope_z, std(gyroscope_z) as std_gyroscope_z, avg(rotation_x) as avg_rotation_x, std(rotation_x) as std_rotation_x, avg(rotation_y) as avg_rotation_y, std(rotation_y) as std_rotation_y, avg(rotation_z) as avg_rotation_z, std(rotation_z) as std_rotation_z  from time_series_accelerometer_gyroscope where datetime_created >= now() - interval 1 second group by auth_token, device_id', function(err, result) {

            if (err){
                //throw err;
                console.log('Error: Models/RandomForest/getRollingSampleAvgSTD', err);
            }

            // Setting output vars
            if(typeof result[0] != 'undefined'){
                // Accelerometer Vars
                avg_accelerometer_x = result[0].avg_accelerometer_x;
                std_accelerometer_x = result[0].std_accelerometer_x;
                avg_accelerometer_y = result[0].avg_accelerometer_y;
                std_accelerometer_y = result[0].std_accelerometer_y;
                avg_accelerometer_z = result[0].avg_accelerometer_z;
                std_accelerometer_z = result[0].std_accelerometer_z;
                // Gyroscope vars
                avg_gyroscope_x = result[0].std_gyroscope_x;
                std_gyroscope_x = result[0].std_gyroscope_x;
                avg_gyroscope_y = result[0].std_gyroscope_y;
                std_gyroscope_y = result[0].std_gyroscope_y;
                avg_gyroscope_z = result[0].std_gyroscope_z;
                std_gyroscope_z = result[0].std_gyroscope_z;
                // Rotation vars
                avg_rotation_x = result[0].avg_rotation_x;
                std_rotation_x = result[0].std_rotation_x;
                avg_rotation_y = result[0].avg_rotation_y;
                std_rotation_y = result[0].std_rotation_y;
                avg_rotation_z = result[0].avg_rotation_z;
                std_rotation_z = result[0].std_rotation_z;
            }



            try{
                callback(null, avg_accelerometer_x, std_accelerometer_x, avg_accelerometer_y, std_accelerometer_y, avg_accelerometer_z, std_accelerometer_z, avg_gyroscope_x, std_gyroscope_x, avg_gyroscope_y, std_gyroscope_y, avg_gyroscope_z, std_gyroscope_z, avg_rotation_x, std_rotation_x, avg_rotation_y, std_rotation_y, avg_rotation_z, std_rotation_z);

                // And done with the connection.
                connection.release();
            }catch(e){
                console.log("Error: MySQL mem leak" + e);
                //console.log(e);
            }finally{
                connection.release();
            }
        });
    });
};
