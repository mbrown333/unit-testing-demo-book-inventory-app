'use strict';

describe('Filter - Format Name Filter', function() {

    var formatNameFilter;

    beforeEach(function() {
        module('book-inventory-app.filters');
        
        inject(function($filter) {
            formatNameFilter = $filter('formatName');
        })
    });

    it('should return the input with the first letter in each work capitalized and the rest un lower case', function() {
        expect(formatNameFilter('JOHN DOE')).toEqual('John Doe');
        expect(formatNameFilter('jOHN dOE')).toEqual('John Doe');
        expect(formatNameFilter('john doe')).toEqual('John Doe');
        expect(formatNameFilter('John Doe')).toEqual('John Doe');
    });

    it('should return an empty string for empty input', function() {
        expect(formatNameFilter('')).toEqual('');
    });
});