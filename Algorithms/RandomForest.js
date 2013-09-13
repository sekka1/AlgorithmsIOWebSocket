/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var http = require('http');

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
