(function(angular) {
	'use strict';

	angular.module('book-inventory-app', [])
		.config(['$compileProvider', '$logProvider', function($compileProvider, $logProvider) {
			$compileProvider.debugInfoEnabled(false);
			$logProvider.debugEnabled(false);
		}]);
})(angular);