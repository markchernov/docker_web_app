(function() {
  'use strict'
  var app = angular.module('app');
  // Accordion controler
  function AccordionController () {
    var self = this;
    var panels = [];
    // here we take the panel and add to our list of panels
    // to preselect the first panel we call turnOn function on the first panel
    self.addPanel = function (panel) {
      panels.push(panel);
      if (panels.length > 0) {
        panels[0].turnOn();
      }
    };
    // when a panel is selected we would want to open the contets
    // here we take the panel find it in our array and turn if on if not selected
    // and off it it is.
    self.selectPanel = function (panel) {
      for (var i in panels) {
        if (panel === panels[i]) {
          panels[i].turnOn();
        } else {
          panels[i].turnOff();
        }
      }
    };
  }
// Register the component to the app
  app.component('accordion', {
    transclude: true,
    template:'<div class="panel-group" ng-transclude></div>',
    controller: AccordionController
  });

})()