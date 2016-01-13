'user strict';
var googleCommands = {
  submit: function() {
    this.api.pause(1000);
    return this.waitForElementVisible('@submitButton', 1000, 'Submit button is visible')
      .click('@submitButton')
      .waitForElementNotPresent('@submitButton', 1000, 'Submit button is removed');
  }
};

module.exports = {
  url: 'http://google.com',
  commands: [googleCommands],
  elements: {
    searchBar: {
      selector: 'input[type=text]'
    },
    submitButton: {
      selector: 'input[name=btnK]'
    }
  }
};
