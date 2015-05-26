'use strict';

const
  window = require('../nw-context.js').window()
  , $ = window.$;

const prepareData = data => {
  let paragraph = '';
  let formattedData = data.map((item) => {
    let definitions = {};

    if (item[4] && item[4] != paragraph && item[2]) {
      paragraph = item[4];
    } else if (!item[2] && item[4] == "\n") {
      paragraph = item[4];
    }

    definitions.originalWord = item[0];
    if (item[2]) {
      definitions.translated = item[2][0][0];
    } else {
      definitions.translated = item[4];
    }
    definitions.paragraph = paragraph;
    definitions.index = item[3].map((position) => {
      return {
        starts: position[0],
        ends: position[1]
      }
    });

    return definitions;
  });

  return formattedData;
};


const addText = translations => {
  let html = translations.reduce((a, b) => {
    if (b.translated == '\n') {
      return a + `<br>`;
    }

    return a + `<span>${b.translated}</span> `;
  }, '');

  var translation = $('<div class="translation"/>');
  translation.html(html);

  $('.subtitles').append(translation);
};

const find = (text, store) => {

  let result = store.filter((item) => {
    return item.translated === text;
  });

  return result[0];
};

const hightlightWords = (text, index) => {
  let lastWords = text;
  let brokenWords = [];
  index.forEach((item, index, list) => {
    let lastEnd = 0;
    if (list[index - 1]) {
      lastEnd = list[index - 1].ends;
    }

    let starts = item.starts - lastEnd;
    let ends = item.ends - lastEnd;

    brokenWords.push(lastWords.slice(0, starts));
    brokenWords.push(`<span>${lastWords.slice(starts, ends)}</span>`);
    lastWords = lastWords.slice(ends, lastWords.length);

  });

  brokenWords.push(lastWords);

  return brokenWords.join('');
};

module.exports = {prepareData, addText, find, hightlightWords};