/* 
 * Statistic Model
 * 
 */

var db = require('./db.js');
var pool = db.getPoolConnection();

/**
 * Get EPS per device_id
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {function} callback
 */
exports.getEPSStatPerDevice = function(authToken, device_id, callback){
    
    pool.getConnection(function(err, connection) {
        connection.query('select count(*) as count from time_series where  auth_token = "'+authToken+'" and device_id = "'+device_id+'" and datetime_created BETWEEN DATE_SUB(NOW(), INTERVAL 1 SECOND) AND NOW()', function(err, result) {
            
            if (err) throw err;

            //console.log('row id: ' + result.insertId);

            //var result = 'success';
            callback(null, result[0].count);
            
            // And done with the connection.
            connection.release();
        });
    });
};
/**
 * Get EPS per auth token
 * 
 * @param {string} authToken
 * @param {function} callback
 */
exports.getEPSStatPerAuthToken = function(authToken, callback){
    
    pool.getConnection(function(err, connection) {
        connection.query('select count(*) as count from time_series where  auth_token = "'+authToken+'" and datetime_created BETWEEN DATE_SUB(NOW(), INTERVAL 1 SECOND) AND NOW()', function(err, result) {
            
            if (err) throw err;

            //console.log('row id: ' + result.insertId);

            //var result = 'success';
            callback(null, result[0].count);
            
            // And done with the connection.
            connection.release();
        });
    });
};