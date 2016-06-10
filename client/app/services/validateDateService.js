(function(angular) {
    function ValidateDateService() {
        return {
            isValidDate: function(input) {
                var inputDate = Date.parse(input);
                return !isNaN(inputDate);
            }
        }
    };

    angular.module('book-inventory-app.services')
        .factory('ValidateDateService', ValidateDateService);
})(angular);