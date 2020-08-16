var assert = require('assert');
var add    = require('../src/add');

describe('Add 3 and 4', function () {
    it('should return 7', function () {
        assert.equal(add(3, 4), 7);
    });
});