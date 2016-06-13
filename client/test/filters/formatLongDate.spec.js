'use strict';

describe('Filter - Format Long Date Filter', function() {

    var formatLongDateFilter;

    beforeEach(function() {
        module('book-inventory-app.filters');
        
        inject(function($filter) {
            formatLongDateFilter = $filter('formatLongDate');
        });
    });

    it('should return an empty string if there is no input', function() {
        expect(formatLongDateFilter('')).toEqual('');
    });

    it('should return a string in the format of Month DD, YYYY for a valid date input', function() {
        expect(formatLongDateFilter('1/1/16')).toEqual('January 01, 2016');
    });
});