(function(){
  'use strict';
  var app = angular.module('app', []);

  app.component('menuBar', {
    // defines a two way binding in and out of the component
    bindings: {
      brand:'@'
     },
    // Load the template
    templateUrl: 'components/appComponent.html',
    
    controller: function () {
     
      var vm = this;
      console.log(vm.menu); // May not yet be available!
      console.log(vm.brand);
      vm.$onInit = function() {
          console.log(vm.menu); // Guaranteed to be available!
          console.log(vm.brand);
      }
    // A list of menus
      this.menu = [{
        name: "Home",
        component: "home"
      }, {
        name: "About",
        component: "about"
      }, {
        name: "Contact",
        component: "contact"
      }];
    }
  });
})();