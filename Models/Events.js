/* 
 * Events Model
 * 
 */

var db = require('./db.js');
var pool = db.getPoolConnection();

/**
 * Save into the database
 * 
 * @param {string} authToken
 * @param {string} device_id
 * @param {json} data
 * @param {string} label
 * @param {type} callback
 */
exports.insert = function(authToken, device_id, data, label, callback){
    
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