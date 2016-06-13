'use strict';

describe('Services - Validate Date Service', function() {

    var validateDateService;

    beforeEach(function() {
        module('book-inventory-app.services');

        inject(function(ValidateDateService) {
            validateDateService = ValidateDateService;
        });
    });

    it('should return true for a valid date input', function() {
        expect(validateDateService.isValidDate('1/1/2016')).toEqual(true);
    });

    it ('should return false for an invalid date input', function() {
        expect(validateDateService.isValidDate('ABC')).toEqual(false);
    });
});