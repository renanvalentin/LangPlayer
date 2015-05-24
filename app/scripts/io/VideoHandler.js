'use strict';

const
  FileHandler = require('./FileHandler')
  , window = require('../nw-context.js').window()
  , document = window.document
  , videojs = window.videojs;

class VideoHandler extends FileHandler {
  constructor() {
    this.lastPlayerId = null;
    this.playerId = null;
  }

  loadVideo(file) {
    this.loadFile(file).then(function (data) {
      this.createTemplate(data);
      this.applyVideoJs();

      this.lastPlayerId = this.playerId;
    }.bind(this));
  }

  createTemplate(data) {
    var t = document.querySelector('#video-template');

    this.playerId = this.createPlayerId();

    t.content.querySelector('video').id = this.playerId;
    t.content.querySelector('source').src = data.file.path;
    t.content.querySelector('source').type = data.file.type;

    var clone = document.importNode(t.content, true);
    document.body.appendChild(clone);
  }

  applyVideoJs() {
    if(this.lastPlayerId) {
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

  createPlayerId() {
    return `player_${Date.now()}`;
  }
}

module.exports = VideoHandler;