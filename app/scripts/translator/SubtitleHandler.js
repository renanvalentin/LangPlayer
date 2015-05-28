'use strict';

const
  GoogleTranslateService = require('../services/GoogleTranslateService')
  , GoogleTranslateFilter = require('./GoogleTranslateFilter')
  , TranslationData = require('../data/TranslationData')
  , VideoHanlder = require('../io/VideoHandler')
  , window = require('../nw-context.js').window()
  , document = window.document
  , $ = window.$;

const SubtitleHandler = {
  register() {
    $(document).on('click', '.original_subtitle', this.click);
    $(document).on('mouseover', '.translation span', this.highlight)
      .on('mouseleave', 'span', this.removeHighlight);
  }

  , click() {
    VideoHanlder.pause();

    let text = $('.original_subtitle').html().replace(/<br>/g, '\n');

    if (SubtitleHandler.alreadyExist() || $('.original_subtitle').hasClass('loading')) {
      return;
    }

    SubtitleHandler.addMarker(text);
    SubtitleHandler.addLoading();

    GoogleTranslateService.get(text).then((result) => {
      let data = GoogleTranslateFilter.prepareData(result.dictionary);

      TranslationData.add($('.original_subtitle').text(), data);

      GoogleTranslateFilter.addText(data);
    }).then(() => {
      SubtitleHandler.removeLoading();
    });
  }

  , alreadyExist() {
    return $('.translation').length > 0;
  }

  , removeHighlight() {
    $('.highlighted').remove();
  }

  , highlight(e) {
    let text = $(e.currentTarget).html();
    let container = $('<div />');

    let originalText = $('.original_subtitle').html();
    let store = TranslationData.get($('.original_subtitle').text());

    let word = GoogleTranslateFilter.find(text, store);

    let highlightedText = GoogleTranslateFilter.hightlightWords(word.paragraph, word.index);

    highlightedText = originalText.replace(word.paragraph, highlightedText);

    container.addClass('highlighted');
    container.html(highlightedText);

    container.css({
      width: $('.original_subtitle').width()
    });

    container.appendTo('.subtitles');
  }

  , addMarker(text) {
    if ($('.marker').data(text)) {
      return;
    }

    let marker = $('<div class="marker" />');

    marker.css({
      left: $('.vjs-seek-handle')[0].style.left
    });

    marker.data(text);

    marker.appendTo($('.vjs-control-bar'));
  }

  , addLoading() {
    $('.original_subtitle').addClass('loading');
  }

  , removeLoading() {
    $('.original_subtitle').removeClass('loading');
  }
};

module.exports = SubtitleHandler;