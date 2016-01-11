/******************************
*
* Config (config facade)
*
*******************************/
'use strict';
function Config() {}
var config = require('config');
/**
* Get a config value
* @param   {string} key - config key to retrieve
* @param   {string} defaultVal - default value (optional)
* @returns {string} config value
*/
Config.prototype.get = function get (key, defaultVal) {
    try {
        return config.get(key);
    }catch (err) {
        //return default value if one exists
    if (typeof defaultVal !== 'undefined') return defaultVal;//replaces if(defaultVal) with if (arguments.length > 1) to avoid mistaking default value = false as null
            //nothing to do, crash
        throw err;
    }
};

/**
* Checks if a given key exists
* @param   {string} key - config key to lookup
* @returns {boolean} true if exists
*/
Config.prototype.has = function has (key) {
        try {
            return config.has(key);
        } catch (err) {
            throw err;
        }
};
module.exports = new Config();

