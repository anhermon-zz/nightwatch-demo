'user strict';
module.exports = PageObject;
/**
 * Abstract page object
 * Contains common behaviour of all page objects
 * @author Angel Hermon
 * @param browser [driver]
 */
function PageObject(browser) {
  this.browser = browser;
  this.assertPageObject();
}
/**
* Assert page obejct matches current page
*/
PageObject.prototype.assertPageObject = function() {

};



