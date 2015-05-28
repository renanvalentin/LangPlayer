'use strict';

const
  window = require('../nw-context.js').window()
  , FileReader = window.FileReader
  , VideoHandler = require('./VideoHandler')
  , SubtitlesHandler = require('./SubtitlesHandler');

const FileTransferFactory = {
  process: (files) => {
   [].forEach.call(files, (file, index) => {
      if (file.path.endsWith('.mp4') ||
        file.path.endsWith('.avi') ||
        file.path.endsWith('.webm') ||
        file.path.endsWith('.mkv')
      ) {
        VideoHandler.loadVideo(file);
      }
      else {
        SubtitlesHandler.loadSubtitle(file);
      }
    });
  }
};

module.exports = FileTransferFactory;