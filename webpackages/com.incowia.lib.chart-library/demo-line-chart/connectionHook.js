/**
 * Created by ega on 12.04.2016.
 */
(function(){
  'use strict';

  window.demoBaseChartConnectionHookStringToArray = function(value, next) {
    var array = value === '' ? null : JSON.parse(value);
    next(array)
  }
})();
