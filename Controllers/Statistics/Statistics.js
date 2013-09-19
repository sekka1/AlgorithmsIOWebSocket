/**
 * Statistics
 * 
 * @author gkan
 */
// Event Model
var statisticModel = require('../../Models/Statistics.js');

/**
 * Get EPS per device_id
 * 
 * @param {object} data
 * @param {function} callback
 */
exports.eps_stat_device = function(data, callback){
        
    statisticModel.getEPSStatPerDevice(data.authToken, data.device_id, function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};
/**
 * Get EPS per auth token
 * 
 * @param {object} data
 * @param {function} callback
 */
exports.eps_stat_auth_token = function(data, callback){
        
    statisticModel.getEPSStatPerAuthToken(data.authToken, function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};

exports.get_rolling_avg_and_std = function(data, callback){
    var result = Math.random();
    callback(null, result);
};