/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var http = require('http');
var randomForestsModel = require('../../Models/RandomForest.js');

/**
 * Runs the Random Forest Algorithm.  The user passes in the "test" data into
 * the algorithm.
 * 
 * @param {type} params
 * @param {type} callback
 * @returns {undefined}
 */
exports.getResult = function(params, callback){
    
    // Save and remove the rest path from the data obj
    var restPath = params.algorithmPath;
    delete params.algorithmPath;

    // Call Algorithms.io REST API
    var querystring = require('querystring');

    // Put all passed in variables into the post data
    var postData = querystring.stringify(params);

    var options = {
            host: 'api.algorithms.io',
            port: 80,
            path: restPath,
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
 * @param {type} params
 * @param {type} callback
 * @returns {undefined}
 */
exports.getResultRollingSamples = function(params, callback){

    randomForestsModel.getRollingSampleAvgSTD(params.authToken, params.device_id, function(err,result){
        if(err){
            callback(err,null);
        }else{
            // Accelerometer Vars
            var avg_accelerometer_x = result[0].avg_accelerometer_x;
            var std_accelerometer_x = result[0].std_accelerometer_x;
            var avg_accelerometer_y = result[0].avg_accelerometer_y;
            var std_accelerometer_y = result[0].std_accelerometer_y;
            var avg_accelerometer_z = result[0].avg_accelerometer_z;
            var std_accelerometer_z = result[0].std_accelerometer_z;
            // Gyroscope vars
            var avg_gyroscope_x = result[0].std_gyroscope_x;
            var std_gyroscope_x = result[0].std_gyroscope_x;
            var avg_gyroscope_y = result[0].std_gyroscope_y;
            var std_gyroscope_y = result[0].std_gyroscope_y;
            var avg_gyroscope_z = result[0].std_gyroscope_z;
            var std_gyroscope_z = result[0].std_gyroscope_z;
            // Rotation vars
            var avg_rotation_x = result[0].avg_rotation_x;
            var std_rotation_x = result[0].std_rotation_x;
            var avg_rotation_y = result[0].avg_rotation_y;
            var std_rotation_y = result[0].std_rotation_y;
            var avg_rotation_z = result[0].avg_rotation_z;
            var std_rotation_z = result[0].std_rotation_z;

            console.log('xxxxxxxx' + '{"Accelerometer.X.avg":'+avg_accelerometer_x+',"Accelerometer.X.std":'+std_accelerometer_x+',"Accelerometer.Y.avg":'+avg_accelerometer_y+',"Accelerometer.Y.std":'+std_accelerometer_y+',"Accelerometer.Z.avg":'+avg_accelerometer_z+',"Accelerometer.Z.std":'+std_accelerometer_z+',"Gyroscope.X.avg":'+avg_gyroscope_x+',"Gyroscope.X.std":'+std_gyroscope_x+',"Gyroscope.Y.avg":'+avg_gyroscope_x+',"Gyroscope.Y.std":'+std_gyroscope_x+',"Gyroscope.Z.avg":'+avg_gyroscope_x+',"Gyroscope.Z.std":'+std_gyroscope_x+',"Rotation.X.avg":'+avg_rotation_x+',"Rotation.X.std":'+std_rotation_x+',"Rotation.Y.avg":'+avg_rotation_y+',"Rotation.Y.std":'+std_rotation_y+',"Rotation.Z.avg":'+avg_rotation_z+',"Rotation.Z.std":'+std_rotation_z+'}');

            // Post Params
            var postParams = {};
            params.test = '{"Accelerometer.X.avg":'+avg_accelerometer_x+',"Accelerometer.X.std":'+std_accelerometer_x+',"Accelerometer.Y.avg":'+avg_accelerometer_y+',"Accelerometer.Y.std":'+std_accelerometer_y+',"Accelerometer.Z.avg":'+avg_accelerometer_z+',"Accelerometer.Z.std":'+std_accelerometer_z+',"Gyroscope.X.avg":'+avg_gyroscope_x+',"Gyroscope.X.std":'+std_gyroscope_x+',"Gyroscope.Y.avg":'+avg_gyroscope_x+',"Gyroscope.Y.std":'+std_gyroscope_x+',"Gyroscope.Z.avg":'+avg_gyroscope_x+',"Gyroscope.Z.std":'+std_gyroscope_x+',"Rotation.X.avg":'+avg_rotation_x+',"Rotation.X.std":'+std_rotation_x+',"Rotation.Y.avg":'+avg_rotation_y+',"Rotation.Y.std":'+std_rotation_y+',"Rotation.Z.avg":'+avg_rotation_z+',"Rotation.Z.std":'+std_rotation_z+'}';
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