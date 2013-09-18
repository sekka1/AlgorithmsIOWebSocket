var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , http = require('http')
  , algorithmsRandomForest = require('./Controllers/Algorithms/RandomForest.js')
  , events = require('./Controllers/Events/Events.js')
  , query = require('./Controllers/Queries/Queries.js')
  , statistics = require('./Controllers/Statistics/Statistics.js');

//console.log(process.env);
server.listen(process.env.PORT, process.env.IP); 

// Accessing via HTTP
app.get('/*', function (req, res) {
  res.sendfile(__dirname + '/staticFiles/index.json');
});

io.sockets.on('connection', function (socket) {

  socket.on('algorithm_random_forest', function(data){
        console.log('Running algorithm_random_forest');
      
        algorithmsRandomForest.getResult(data, function(err,result){
            if(err){
                socket.emit('algorithms_io_api', { data: err });
            }else{
                socket.emit('algorithms_io_api', { data: result });
            }
        });
        //algorithms.run('randomForest', data);
        //algorithms.run('svm', data);
  });
  socket.on('algorithm_svm', function(data){
        console.log('Running algorithm_svm');
        
        algorithmsRandomForest.getResult(data, function(err,result){
            if(err){
                socket.emit('algorithms_io_api', { data: err });
            }else{
                socket.emit('algorithms_io_api', { data: result });
            }
        });
  });
  socket.on('event_save', function(data){
        console.log('Running event_save');
        
        // Save the event
        events.saveGeneric(data, function(err,result){
            if(err){
                socket.emit('event_save_output', { data: err });
            }else{
                socket.emit('event_save_output', { data: result });
            }
        });
  });
  socket.on('event_save_accelerometer_gyroscope', function(data){
        console.log('Running event_save_accelerometer_gyroscope');
        
        // Save the event
        events.saveAccelerometerGyroscope(data, function(err,result){
            if(err){
                socket.emit('event_save_output', { data: err });
            }else{
                socket.emit('event_save_output', { data: result });
            }
        });
  });
  socket.on('query_get_data_by_range', function(data){
        console.log('Running query_get_data_by_range');
        
        // Save the event
        query.get_data_by_range(data, function(err,result){
            if(err){
                socket.emit('query_get_data_by_range', { data: err });
            }else{
                socket.emit('query_get_data_by_range', { data: result });
            }
        });
  });
  socket.on('statistic_eps_stat_device', function(data){

        console.log('Running statistic_eps_stat_device');

        statistics.eps_stat_device(data, function(err,result){
            if(err){
                socket.emit('statistic_eps_stat_device', { data: err });
            }else{
                socket.emit('statistic_eps_stat_device', { data: result });
            }
        });
  });
    socket.on('statistic_eps_stat_auth_token', function(data){

        console.log('Running statistic_eps_stat_auth_token');

        statistics.eps_stat_auth_token(data, function(err,result){
            if(err){
                socket.emit('statistic_eps_stat_auth_token', { data: err });
            }else{
                socket.emit('statistic_eps_stat_auth_token', { data: result });
            }
        });
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
});


