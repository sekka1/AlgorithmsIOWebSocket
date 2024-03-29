var io = require('socket.io');
var ClusterStore = require('strong-cluster-socket.io-store')(io);

var
    algorithmsRandomForest = require('./Controllers/Algorithms/RandomForest.js')
    , events = require('./Controllers/Events/Events.js')
    , query = require('./Controllers/Queries/Queries.js')
    , statistics = require('./Controllers/Statistics/Statistics.js');

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        var exitCode = worker.process.exitCode;
        console.log('worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
        cluster.fork();
    });
} else {
    // Start a socket.io server, configure it to use ClusterStore.

    var PORT = 8080;
    var options = { store: new ClusterStore() };
    var server = io.listen(PORT, options);

    server.on('connection', function(socket) {

        // Interval Vars
        var interval_statistic_eps_stat_device;
        var interval_statistic_eps_stat_auth_token;
        var interval_query_get_last_motion_data;

        /////////////////////////////////////////////////////////////////////////////
        //
        // Algorithms
        //
        /////////////////////////////////////////////////////////////////////////////
        socket.on('algorithm_random_forest', function(data){
            console.log('Running algorithm_random_forest');

            algorithmsRandomForest.getResult(data, function(err,result){
                if(err){
                    socket.emit('algorithm_random_forest_result', { data: err });
                }else{
                    socket.emit('algorithm_random_forest_result', { data: result });
                }
            });
            //algorithms.run('randomForest', data);
            //algorithms.run('svm', data);
        });
        socket.on('algorithm_random_forest_rolling_samples', function(data){
            console.log('Running algorithm_random_forest_rolling_samples');

            algorithmsRandomForest.getResultRollingSamples(data, function(err,result){
                if(err){
                    socket.emit('algorithm_random_forest_rolling_samples_result', { data: err });
                }else{
                    socket.emit('algorithm_random_forest_rolling_samples_result', { data: result });
                }
            });
        });
        socket.on('algorithm_svm', function(data){
            console.log('Running algorithm_svm');

            algorithmsRandomForest.getResult(data, function(err,result){
                if(err){
                    socket.emit('algorithm_svm_result', { data: err });
                }else{
                    socket.emit('algorithm_svm_result', { data: result });
                }
            });
        });
        /////////////////////////////////////////////////////////////////////////////
        //
        // Events
        //
        /////////////////////////////////////////////////////////////////////////////
        socket.on('event_save', function(data){
            console.log('Running event_save');

            // Save the event
            events.saveGeneric(data, function(err,result){
                if(err){
                    socket.emit('event_save_result', { data: err });
                }else{
                    socket.emit('event_save_result', { data: result });
                }
            });
        });
        socket.on('event_save_motion', function(data){
            //console.log('Running event_save_motion');

            // Save the event
            events.saveAccelerometerGyroscope(data, function(err,result){
                if(err){
                    socket.emit('event_save_motion_result', { data: err });
                }else{
                    socket.emit('event_save_motion_result', { data: result });
                }
            });
        });
        /////////////////////////////////////////////////////////////////////////////
        //
        // Queries
        //
        /////////////////////////////////////////////////////////////////////////////
        socket.on('query_get_data_by_range', function(data){
            console.log('Running query_get_data_by_range');

            query.get_data_by_range(data, function(err,result){
                if(err){
                    socket.emit('query_get_data_by_range', { data: err });
                }else{
                    socket.emit('query_get_data_by_range', { data: result });
                }
            });
        });
        socket.on('query_get_last_motion_data', function(data){

            // Run interval at 1 second
            interval_query_get_last_motion_data = setInterval(function(){
                console.log('Running query_get_last_motion_data');


                query.get_last_motion_data(data, function(err,result){
                    if(err){
                        socket.emit('query_get_last_motion_data', { data: err });
                    }else{
                        socket.emit('query_get_last_motion_data', { data: result });
                    }
                });
            }, 250);
        });
        /////////////////////////////////////////////////////////////////////////////
        //
        // Statistics
        //
        /////////////////////////////////////////////////////////////////////////////
        socket.on('statistic_eps_stat_device', function(data){

            // Run interval at 1 second
            interval_statistic_eps_stat_device = setInterval(function(){

                console.log('Running statistic_eps_stat_device');

                statistics.eps_stat_device(data, function(err,result){
                    if(err){
                        socket.emit('statistic_eps_stat_device', { data: err });
                    }else{
                        socket.emit('statistic_eps_stat_device', { data: result });
                    }
                });

            }, 1000);

        });
        socket.on('statistic_eps_stat_auth_token', function(data){

            // Run interval at 1 second
            interval_statistic_eps_stat_auth_token = setInterval(function(){

                console.log('Running statistic_eps_stat_auth_token');

                statistics.eps_stat_auth_token(data, function(err,result){
                    if(err){
                        socket.emit('statistic_eps_stat_auth_token', { data: err });
                    }else{
                        socket.emit('statistic_eps_stat_auth_token', { data: result });
                    }
                });
            }, 1000);
        });
        socket.on('statistic_get_rolling_avg_and_std', function(data){
            console.log('Running statistic_get_rolling_avg_and_std');

            // Save the event
            statistics.get_rolling_avg_and_std(data, function(err,result){
                if(err){
                    socket.emit('statistic_get_rolling_avg_and_std', { data: err });
                }else{
                    socket.emit('statistic_get_rolling_avg_and_std', { data: result });
                }
            });
        });

        /////////////////////////////////////////////////////////////////////////////
        //
        // Disconnection/Clean up
        //
        /////////////////////////////////////////////////////////////////////////////
        socket.on('disconnect', function() {

            console.log('Connection disconnected...');

            // Run clean up for interval methods
            clearInterval(interval_statistic_eps_stat_device);
            clearInterval(interval_statistic_eps_stat_auth_token);
            clearInterval(interval_query_get_last_motion_data);
        })




    });

}