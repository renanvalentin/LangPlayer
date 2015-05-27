// Window state (size and position) preservation between app launches.
(function () {
  'use strict';

  var gui = require('nw.gui')
      , win = gui.Window.get();

  var close = document.getElementById('closeApp'),
    minimize = document.getElementById('minimizeApp'),
    maximize = document.getElementById('expandApp');

  $(close).on('click', function () {
    win.close();
  });

  $(minimize).on('click', function () {
    win.minimize();
  });

  $(maximize).on('click', function () {
    win.maximize();
  });
}());
