/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

exports.eps_stat_device = function(data, callback){
    var result = Math.floor((Math.random()*1000)+1);
    callback(null, result);
};

exports.get_rolling_avg_and_std = function(data, callback){
    var result = Math.random();
    callback(null, result);
};