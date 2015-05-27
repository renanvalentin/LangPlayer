'use strict';

const
  window = require('../nw-context.js').window()
  , $ = window.$;

const PlayerInfo = {
  getVideoName: () => {
    let name = $('source')
                    .attr('src')
                    .split('/')
                    .pop();

    return name;
  }
};

module.exports = PlayerInfo;