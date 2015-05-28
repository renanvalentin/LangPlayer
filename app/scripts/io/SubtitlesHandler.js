'use strict';

const
    FileHandler = require('./FileHandler')
  , window = require('../nw-context.js').window()
  , document = window.document
  , Bubbles = window.Bubbles;

const SubtitlesHandler = {
  loadSubtitle(file) {
      this.applySubtitle(file);
  }

  , applySubtitle(file) {
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
};

module.exports = SubtitlesHandler;

