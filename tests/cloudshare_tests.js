'use strict';

var HomePage = require("../pages/home_page");
var config = require("../lib/config");

//console.log(config.get("user.tests.user"));

module.exports = {
  '@tags': ['login', 'sanity'],
  'Basic test for cloudShare home page' : function (browser) {
      browser.url('http://www.cloudshare.com');
      browser.windowMaximize('current');
      new HomePage(browser)
          .pressLoginBtn()
          .doLogin(config.get('tests.user'), config.get('tests.password'))
          .doTabsValidations()
          .doLogout();
      browser.end();

//      homePage.load();


//    browser
//      .url('https://www.npmjs.com')
//      .waitForElementVisible('body', 1000)
//      .setValue('input[type=search]', 'nightwatch')
//      .waitForElementVisible('input[type=submit]', 1000)
//      .click('input[type=submit]')
//      .pause(1000)
//      .assert.elementPresent('a[href="/packages/nightwatch"]', 'The Night Watch')
//      .end();
//  }
  }
};

//module.exports = {
//  tags: [ 'sandbox' ],
//  'Demo test Npmjs' : function (browser) {
//    browser
//      .url('https://www.npmjs.com')
//      .assert.title('npm')
//      .end();
//  }
//};
