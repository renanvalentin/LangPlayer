'use strict';

const
  FileHandler = require('./FileHandler')
  , window = require('../nw-context.js').window()
  , document = window.document
  , videojs = window.videojs;

const VideoHandler = {
  lastPlayerId: null
  , playerId: null

  , loadVideo: (file) => {
    this.createTemplate(file);
    this.applyVideoJs();

    this.lastPlayerId = this.playerId;
  }

  , createTemplate: (file)=> {
    var t = document.querySelector('#video-template');

    this.playerId = this.createPlayerId();

    t.content.querySelector('video').id = this.playerId;
    t.content.querySelector('source').src = file.path;
    t.content.querySelector('source').type = file.type;

    var clone = document.importNode(t.content, true);
    document.body.appendChild(clone);
  }

  , applyVideoJs: () => {
    if (this.lastPlayerId) {
      var oldPlayer = document.getElementById(this.lastPlayerId);
      videojs(oldPlayer).dispose();
    }

    videojs(document.getElementById(this.playerId), {
      "controls": true,
      "autoplay": true,
      "preload": "auto"
    }, function () {
    });
  }

  , createPlayerId: () => {
    return `player_${Date.now()}`;
  },

  pause: () => {
    let player = videojs(this.playerId);
    player.pause();
  }
};

module.exports = VideoHandler;