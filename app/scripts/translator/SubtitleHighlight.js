'use strict';

const
  GoogleTranslateService = require('../services/GoogleTranslateService')
  , GoogleTranslateFilter = require('./GoogleTranslateFilter')
  , TranslationData = require('../data/TranslationData')
  , window = require('../nw-context.js').window()
  , document = window.document
  , $ = window.$;


const SubtitleHighlight = {
  register() {
    $(document).on('click', '.subtitles', this.click);
    $(document).on('mouseover', '.translation span', this.highlight)
               .on('mouseleave', 'span', this.removeHighlight);
  }

  , click() {
    let service = new GoogleTranslateService();
    service.get($('.subtitle_original').html().replace(/<br>/g, '\n')).then((result) => {
      let data = GoogleTranslateFilter.prepareData(result.dictionary);

      TranslationData.add($('.subtitle_original').text(), data);

      GoogleTranslateFilter.addText(data);
    });
  }

  , removeHighlight() {
    $('.highlighted').remove();
  }

  , highlight(e) {
    let text = $(e.currentTarget).html();
    let container = $('<div />');

    let originalText = $('.subtitle_original').html();
    let store = TranslationData.get($('.subtitle_original').text());

    let word = GoogleTranslateFilter.find(text, store);

    let highlightedText = GoogleTranslateFilter.hightlightWords(word.paragraph, word.index);

    highlightedText = originalText.replace(word.paragraph, highlightedText);

    container.addClass('highlighted');
    container.html(highlightedText);

    container.css({
      width: $('.subtitle_original').width()
    });

    container.appendTo('.subtitles');
  }
};

module.exports = SubtitleHighlight;