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
  //  this.loadFile(file).then(function (data) {
      this.createTemplate(file);
      this.applyVideoJs();

      this.lastPlayerId = this.playerId;
    //}.bind(this));
  }

  createTemplate(file) {
    var t = document.querySelector('#video-template');

    this.playerId = this.createPlayerId();

    t.content.querySelector('video').id = this.playerId;
    t.content.querySelector('source').src = file.path;
    t.content.querySelector('source').type = file.type;

    var clone = document.importNode(t.content, true);
    document.body.appendChild(clone);
  }

  applyVideoJs() {
    if(this.lastPlayerId) {
      var oldPlayer = document.getElementById(this.lastPlayerId);
      videojs(oldPlayer).dispose();
    }

    //var s = document.createElement("script");
    //s.type = "text/javascript";
    //s.src = "bower_components/video.js/dist/video-js/video.dev.js";
    //document.head.appendChild(s);


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