/*
 * Random Forest algorithm Controller
 *
 */
var http = require('http');
var randomForestsModel = require('../../Models/Algorithms/RandomForest/RandomForestRollingSamples.js');

var restAlgorithmURLPath = '/jobs/swagger/54';

/**
 * Runs the Random Forest Algorithm.  The user passes in the "test" data into
 * the algorithm.
 * 
 * @param {object} params
 * @param {function} callback
 */
exports.getResult = function(params, callback){

    // Call Algorithms.io REST API
    var querystring = require('querystring');

    // Add default params
    params.method = 'sync';
    params.outputType = 'json';

    // Put all passed in variables into the post data
    var postData = querystring.stringify(params);

    var options = {
            host: 'api.algorithms.io',
            port: 80,
            path: restAlgorithmURLPath,
            method: 'POST',
            headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
            }
    };

    // Emit the response back to the client
    var req = http.request(options, function(res) {
                            console.log('STATUS: ' + res.statusCode);
                            console.log('HEADERS: ' + JSON.stringify(res.headers));
                            res.setEncoding('utf8');
                            res.on('data', function (chunk) {
                                console.log('BODY: ' + chunk);
                                //socket.emit('algorithms_io_api', { data: chunk });
                                callback(null,chunk);
                             });
                             req.on('error', function(e) {
                                console.log('problem with request: ' + e.message);
                                callback(err,null);
                             });
             });

        req.write(postData);
        req.end();
  
};
/**
 * Runs the Random Forest Algorithm.  It will query the DB for the last second's
 * avg and std samples and pass that data in the "test" param into the algorithm.
 * 
 * @param {object} params
 * @param {function} callback
 */
exports.getResultRollingSamples = function(params, callback){

    randomForestsModel.getRollingSampleAvgSTD(params.authToken, params.device_id, function(err, avg_accelerometer_x, std_accelerometer_x, avg_accelerometer_y, std_accelerometer_y, avg_accelerometer_z, std_accelerometer_z, avg_gyroscope_x, std_gyroscope_x, avg_gyroscope_y, std_gyroscope_y, avg_gyroscope_z, std_gyroscope_z, avg_rotation_x, std_rotation_x, avg_rotation_y, std_rotation_y, avg_rotation_z, std_rotation_z){
        if(err){
            callback(err,null);
        }else{
            // Post Params
            params.test = '{"Accelerometer.X.avg":'+avg_accelerometer_x+',"Accelerometer.X.std":'+std_accelerometer_x+',"Accelerometer.Y.avg":'+avg_accelerometer_y+',"Accelerometer.Y.std":'+std_accelerometer_y+',"Accelerometer.Z.avg":'+avg_accelerometer_z+',"Accelerometer.Z.std":'+std_accelerometer_z+',"Gyroscope.X.avg":'+avg_gyroscope_x+',"Gyroscope.X.std":'+std_gyroscope_x+',"Gyroscope.Y.avg":'+avg_gyroscope_y+',"Gyroscope.Y.std":'+std_gyroscope_y+',"Gyroscope.Z.avg":'+avg_gyroscope_z+',"Gyroscope.Z.std":'+std_gyroscope_z+',"Rotation.X.avg":'+avg_rotation_x+',"Rotation.X.std":'+std_rotation_x+',"Rotation.Y.avg":'+avg_rotation_y+',"Rotation.Y.std":'+std_rotation_y+',"Rotation.Z.avg":'+avg_rotation_z+',"Rotation.Z.std":'+std_rotation_z+'}';
            params.method = 'sync';
            params.outputType = 'json';

            // Call Algorithms.io REST API
            var querystring = require('querystring');

            // Put all passed in variables into the post data
            var postData = querystring.stringify(params);

            var options = {
                host: 'api.algorithms.io',
                port: 80,
                path: '/jobs/swagger/54',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            };

            // Emit the response back to the client
            var req = http.request(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                    //socket.emit('algorithms_io_api', { data: chunk });
                    callback(null,chunk);
                });
                req.on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                    callback(err,null);
                });
            });

            req.write(postData);
            req.end();


        }
    });
};