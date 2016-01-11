'use strict';

module.exports = LoginPage;

var PageObject = require('./page_object.js');
var WelcomeObject = require('./welcome_page.js');

/**
* Inherit {PageObject}
*/
LoginPage.prototype = new PageObject();
var usernameTBLocator = '#ContentPlaceHolder1_UserName';
var passwordTBLocator = '#ContentPlaceHolder1_Password';
var loginBtnLocator = '#ContentPlaceHolder1_LoginButton';

/*
* Define concrete {PageObject}
*/
function LoginPage() {
    PageObject.apply( this, arguments );
}

LoginPage.prototype.assertPageObject = function load() {
    this.browser.useCss()
          .waitForElementVisible('body', 1000)
          .assert.title('CloudShare | Login');
    return this;
};
////
LoginPage.prototype.doLogin = function doLogin(userName, password) {
    this.typeUsernameTB(userName);
    this.typePasswordTB(password);
    return this.clickLoginBtn();
    //return user page//
};
////
LoginPage.prototype.typeUsernameTB = function typeUsernameTB(username) {
    this.browser.useCss()
        .waitForElementVisible(usernameTBLocator, 1000)
        .setValue(usernameTBLocator, username);
    return this;
};

LoginPage.prototype.typePasswordTB = function typePasswordTB(password) {
    this.browser.useCss()
        .waitForElementVisible(passwordTBLocator, 1000)
        .setValue(passwordTBLocator, password);
    return this;
};

LoginPage.prototype.clickLoginBtn = function clickLoginBtn() {
    this.browser.useCss()
        .waitForElementVisible(loginBtnLocator, 1000)
        .click(loginBtnLocator);
    return new WelcomeObject(this.browser);
};



