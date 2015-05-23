'use strict';

var request = require('request');

function translate(query) {

  request('https://translate.google.com/translate_a/single?client=t&sl=en&tl=pt&hl=pt-BR&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&srcrom=1&ssel=0&tsel=0&kc=1&tk=521108|851292&q=' + encodeURIComponent(query), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body); // Show the HTML for the Modulus homepage.
      $('.translate').remove();

      var div = $('<div />');
      div.addClass('translate');

      let parse = eval(body);
      let result = {
        translation: parse[0],
        dictionary: parse[5]
      };

      console.log(result);

      div.html(body.match(/\[\[\["(.*?)",/).pop());

      $('.video-js').append(div);

      global.setTimeout(function () {
        div.hide();
        div.remove();
      }, 2000);
    }
  });
//
}

$(document).on('mouseup', '.subtitles', function () {
  var selection = window.getSelection();
  var text = selection.anchorNode.data;

  if (selection != '') {
    var query = ''
    if (selection.focusOffset > selection.anchorOffset) {
      query = text.substr(selection.anchorOffset, selection.focusOffset - selection.anchorOffset);
    } else {
      query = text.substr(selection.focusOffset, selection.anchorOffset - selection.focusOffset);
    }

    translate(query);
  }
});

//
//global.setTimeout(function () {
//  var test2 = new Bubbles.videoJS('example_video_1_html5_api');
//  test2.subtitles(false,
//    {
//      "English": {
//        language: "English",
//        file: "video/Mars.Attacks.1996.720p.BrRip.x264.YIFY.srt"
//      }
//    }
//  );
//  console.log(test2);
//}, 500);


