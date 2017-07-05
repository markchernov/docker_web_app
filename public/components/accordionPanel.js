(function() {
  'use strict';
  var app = angular.module('app');
  // accordion-panel controller
  function AccordionPanelController() {
    var self = this;
    // register the panel in init
    self.$onInit = function () {
      self.parent.addPanel(self);
    };
    // Turns on the panel by changing selected to true
    self.turnOn = function () {
      self.selected = true;
    };
    // Turns off the panel by changing selected to false
    self.turnOff = function () {
      self.selected = false;
    };
    // Selects a the current selected panel
    self.select = function () {
      self.parent.selectPanel(self);
    };
  }
// Register the accordion-panel component
  app.component('accordionPanel', {
    transclude: true,
    // require the parent component, in this case accordion component
    require: {
      'parent': '^accordion'
    },
    // specify attribute binding
    // https://docs.angularjs.org/api/ng/service/$compile#-scope-
    bindings: {
      heading: '@'
    },
    // Accordion-panel template
    template: `
      <div class="panel panel-default">
        <div class="panel-heading" ng-click="$ctrl.select()">
          <h3 class="panel-title">{{$ctrl.heading}}</h3>
        </div>
        <div class="panel-body" ng-transclude ng-if="$ctrl.selected">
        </div>
      </div>
     `,
    controller: AccordionPanelController,
  });

})();