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
    this.loadFile(file).then(function (data) {
      this.applySubtitle(data);
    }.bind(this));
  }

  applySubtitle(data) {
    var subtitles = new Bubbles.videoJS(document.querySelector('video').id);
    subtitles.subtitles(false,
      {
        "English": {
          language: "English",
          file: data.file.path
        }
      }
    );
  }
}

module.exports = SubtitlesHandler;

