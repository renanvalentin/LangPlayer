'use strict';

const
  window = require('../nw-context.js').window()
  , FileReader = window.FileReader
  , VideoHandler = require('./VideoHandler')
  , SubtitlesHandler = require('./SubtitlesHandler');


const
  videoHandler = new VideoHandler()
  , subtitlesHandler = new SubtitlesHandler();


const FileTransferFactory = {
  process: (file) => {
    if (file.path.endsWith('.mp4') ||
      file.path.endsWith('.avi') ||
      file.path.endsWith('.webm')
    ) {
      videoHandler.loadVideo(file);
    }
    else {
      subtitlesHandler.loadSubtitle(file);
    }
  }
};

module.exports = FileTransferFactory;