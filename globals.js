'use strict';
var allure = require("nightwatch-allure-adapter");
var difido = require("./lib/difido-binder.js");

module.exports = {
    reporter: difido.write
};
