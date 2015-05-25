'use strict';

const
    FileHandler = require('./FileHandler')
  , window = require('../nw-context.js').window()
  , document = window.document
  , Bubbles = window.Bubbles;

class SubtitlesHandler extends FileHandler {
  constructor() {
    this.lastPlayerId = null;
    this.playerId = null;
  }

  loadSubtitle(file) {
    //this.loadFile(file).then(function (data) {
      this.applySubtitle(file);
    //}.bind(this));
  }

  applySubtitle(file) {
    var subtitles = new Bubbles.videoJS(document.querySelector('video').id);
    subtitles.subtitles(false,
      {
        "English": {
          language: "English",
          file: file.path
        }
      }
    );
  }
}

module.exports = SubtitlesHandler;

