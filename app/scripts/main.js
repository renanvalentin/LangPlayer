'use strict';

const
    VideoHandler = require('./scripts/io/VideoHandler')
  , SubtitleHandler = require('./scripts/io/SubtitlesHandler');


class App {
  start() {
    let dropHandler = new DropHandler({ el: 'body' });

    dropHandler.subscribe('dropped', {
      onNotify: function(file) {
        //let videoHandler = new VideoHandler();
        if(file.path.endsWith('.mp4') ||
           file.path.endsWith('.avi') ||
           file.path.endsWith('.webm')
        ) {
          VideoHandler.loadVideo(file);
        } else {
          SubtitleHandler.loadSubtitle(file);
        }
      }
    })
  }
}

let app = new App();
app.start();