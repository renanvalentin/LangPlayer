'use strict';

const
  window = require('../nw-context.js').window()
  , document = window.document
  , $ = window.$
  , localStorage = window.localStorage;

const UserPreferences = {
  register: () => {
    $(document).on('click', '#user_language', this.save.bind(this));

    return this;
  }

  , load: () => {
    let language = localStorage.getItem('language');

    if(language) {
      $('#user_language').val(language);
    }
  }

  , get: () => {
    let language = localStorage.getItem('language');

    if(language) {
      return language;
    }

    return $('#user_language').val();
  }

   , save: (e) => {
    localStorage.setItem('language', $(e.currentTarget).val());
  }
};

module.exports = UserPreferences;
