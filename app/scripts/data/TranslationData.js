'use strict';

const TranslationData = {
  _store: new Map()

  , get: (translation) => {
    return this._store.get(translation);
  }

  , add: (key, translation) => {
    this._store.set(key, translation);
  }
};

module.exports = TranslationData;
