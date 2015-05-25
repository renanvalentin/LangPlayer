'use strict';

const
    FileTransfer = require('./scripts/io/FileTransfer')
  , GoogleTranslateService = require('./scripts/services/GoogleTranslateService')
  , GoogleTranslateFilter = require('./scripts/translator/GoogleTranslateFilter');

class App {
  start() {
    let dropHandler = new DropHandler({ el: 'body' });

    dropHandler.subscribe('dropped', {
      onNotify: function(file) {
        FileTransfer.process(file);
      }
    });
    //var chooser = document.querySelector('#fileDialog');
    //chooser.addEventListener("change", function(evt) {
    //  console.log(this.value);
    //  FileTransfer.process(this.files[0]);
    //}, false);

    //FileTransfer.process(file);

    let store = [];

    $(document).on('click', '.subtitles', function (e) {
      let service = new GoogleTranslateService();
      service.get($('.subtitle_original').html().replace(/<br>/g, '\n')).then((result) => {
        store = GoogleTranslateFilter.prepareData(result.dictionary);
        GoogleTranslateFilter.addText(store);
      });
    });

    $(document).on('mouseover', '.translation span', (e) => {
      let text = $(e.currentTarget).html();
      let container = $('<div />');

      let originalText = $('.subtitle_original').html();

      let word = GoogleTranslateFilter.find(text, store);
      console.log(word);

      let highlightedText = GoogleTranslateFilter.hightlightWords(word.paragraph, word.index);

      highlightedText = originalText.replace(word.paragraph, highlightedText);

      container.addClass('highlighted');
      container.html(highlightedText);

      let offset = $('.subtitle_original').offset();

      container.css({
        //left: offset.left + 'px',
        //top: offset.top + 'px',
        width: $('.subtitle_original').width()
      });

      container.appendTo('.subtitles');
    }).on('mouseleave', 'span', () => {
      $('.highlighted').remove();
    });
  }
}

let app = new App();
app.start();