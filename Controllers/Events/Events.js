/**
 * Events
 * 
 * @author gkan
 */

// Event Model
var eventsModel = require('../../Models/Events.js');

/**
 * Save an event
 * 
 * @param {type} params
 * @param {type} callback
 * @returns {undefined}
 */
exports.save = function(params, callback){
    
    eventsModel.insert(params.authToken, params.device_id, params.data, params.label, function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
};