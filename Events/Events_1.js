/**
 * Events
 * 
 * @author gkan
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'AlgorithmsIOWebSocket',
  password : 'sunshine',
});

connection.connect(function(err) {
  if (err) throw err;
});

/**
 * Save an event into the database
 * 
 * @param {type} params
 * @param {type} callback
 * @returns {undefined}
 */
exports.save = function(params, callback){
    //var result = 'success';
    //callback(null, result);
    
    var now = new Date();
    var mysql_now = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds();
    console.log(mysql_now);
    
    connection.query('INSERT INTO time_series SET ?', {auth_token: params.authToken, 
                                                        device_id: params.device_id, 
                                                        data: params.data, 
                                                        label: params.label, 
                                                        datetime_created: mysql_now}, 
                                                    function(err, result) {
        if (err) throw err;

        console.log('row id: ' + result.insertId);
        
        var result = 'success';
        callback(null, result);
    });
};