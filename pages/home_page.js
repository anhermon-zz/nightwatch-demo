'use strict';

module.exports = HomePage;

var PageObject = require('./page_object.js');
var LoginPage = require('./login_page.js');

/**
* Inherit {PageObject}
*/
HomePage.prototype = new PageObject();

/**
* Selector relevant for this page
**/
var loginBtnLocator= '#button-login';
var buyNowBtnLocator= '#button-get-started';

/*
* Define concrete {PageObject}
*/
function HomePage() {
    PageObject.apply( this, arguments );
}

HomePage.prototype.assertPageObject = function load() {
    this.browser.useCss()
          .waitForElementVisible('body', 1000)
          .assert.title('The Easiest Way to Bring Your Business Applications to the Cloud!');
    return this;
};

/**
* Actions relevant for that page
 */
HomePage.prototype.pressLoginBtn = function pressLoginBtn() {
    this.browser.useCss()
        .waitForElementVisible('body', 1000)
        .click(loginBtnLocator);
    return new LoginPage(this.browser);
};

HomePage.prototype.pressBuyNowBtn = function pressLoginBtn() {
    this.browser.useCss()
        .waitForElementVisible('body', 1000)
        .click(buyNowBtnLocator);
    /*TODO:return relevant page object*/
};


