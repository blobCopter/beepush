(function() {
  'use strict';

  angular
    .module('beepush')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
