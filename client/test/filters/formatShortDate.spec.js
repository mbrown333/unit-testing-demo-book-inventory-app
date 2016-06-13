'use strict';

describe('Filter - Format Long Date Filter', function() {

    var formatShortDateFilter;

    beforeEach(function() {
        module('book-inventory-app.filters')
        
        inject(function($filter) {
            formatShortDateFilter = $filter('formatShortDate');
        });
    });

    it('should return an empty string if there is no input', function() {
        expect(formatShortDateFilter('')).toEqual('');
    });

    it('should return a string in the format of MM/DD/YYYY for a valid date input', function() {
        expect(formatShortDateFilter('1/1/16')).toEqual('01/01/2016');
    });
});