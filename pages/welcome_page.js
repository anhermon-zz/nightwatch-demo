//CloudShare - Welcome
'use strict';

module.exports = WelcomePage;

var PageObject = require('./page_object.js');
var LoginPage   = require('./login_page.js');
/**
* Inherit {PageObject}
*/
WelcomePage.prototype = new PageObject();
var userMenuSelector = '.cs-top-bar-user-menu-button';
var logOutBtnSelector = '//a[text() = "Logout"]';

var homeTabSelector = '//span[@class="cs-side-menu-item-title"][text() = "Home"]';

var environmentsTabSelector = '//span[@class="cs-side-menu-item-title"][text() = "Environments"]';

var cloudFoldersTabSelector = '//span[@class="cs-side-menu-item-title"][text() = "CloudFolders"]';

var trainingTabSelector = '//span[@class="cs-side-menu-item-title"][text() = "Training"]';

var usersTabSelector = '//span[@class="cs-side-menu-item-title"][text() = "Users"]';

var reportsTabSelector = '//span[@class="cs-side-menu-item-title"][text() = "Reports"]';
/*
* Define concrete {PageObject}
*/
function WelcomePage() {
    PageObject.apply( this, arguments );
}

WelcomePage.prototype.assertPageObject = function load() {
 this.browser.useCss()
          .waitForElementVisible('body', 1000)
          .assert.title('CloudShare - Welcome');
 return this;
};
////
WelcomePage.prototype.doLogout = function doLogout() {
 return this.clickUserMenu()
            .clicklogoutBtn();
};

WelcomePage.prototype.doTabsValidations = function doTabsValidations() {
 return this.assertHomeTabIsPresent()
            .assertCloudFoldersTabIsPresent()
            .assertTrainingTabIsPresent()
            .assertUsersTabIsPresent()
            .assertReportsTabIsPresent()
};
////
WelcomePage.prototype.clickUserMenu = function clickUserMenu() {
    this.browser.useCss()
          .waitForElementVisible(userMenuSelector, 1000)
          .click(userMenuSelector);
    return this;
};
WelcomePage.prototype.clicklogoutBtn = function clicklogoutBtn() {
    this.browser.useXpath()
          .waitForElementVisible(logOutBtnSelector, 1000)
          .click(logOutBtnSelector);
    return new LoginPage(this.browser);
};

WelcomePage.prototype.assertHomeTabIsPresent = function assertHomeTabIsPresent() {
    this.browser.useXpath()
          .waitForElementVisible(homeTabSelector, 1000)
          .assert.elementPresent(homeTabSelector);
    return this;
};

WelcomePage.prototype.assertCloudFoldersTabIsPresent = function assertCloudFoldersTabIsPresent() {
    this.browser.useXpath()
          .waitForElementVisible(cloudFoldersTabSelector, 1000)
          .assert.elementPresent(cloudFoldersTabSelector);
    return this;
};

WelcomePage.prototype.assertTrainingTabIsPresent = function assertTrainingTabIsPresent() {
    this.browser.useXpath()
          .waitForElementVisible(trainingTabSelector, 1000)
          .assert.elementPresent(trainingTabSelector);
    return this;
};

WelcomePage.prototype.assertUsersTabIsPresent = function assertUsersTabIsPresent() {
    this.browser.useXpath()
          .waitForElementVisible(usersTabSelector, 1000)
          .assert.elementPresent(usersTabSelector);
    return this;
};

WelcomePage.prototype.assertReportsTabIsPresent = function assertReportsTabIsPresent() {
    this.browser.useXpath()
          .waitForElementVisible(reportsTabSelector, 1000)
          .assert.elementPresent(reportsTabSelector);
    return this;
};



