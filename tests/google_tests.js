'use strict';

var HomePage = require("../pages/home_page");
var config = require("../lib/config");

//console.log(config.get("user.tests.user"));

module.exports = {
  '@tags': ['example'],
  'Test': function (client) {
    var google = client.page.google();
    google
        .navigate()
        .setValue('@searchBar', 'nightwatch')
        .submit();
    client.end();
  }
};
