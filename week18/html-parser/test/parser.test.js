var assert = require('assert');
import {parseHTML} from '../src/parser';

describe('parserHTML', function () {
    it('should parse a single element', function () {
        const element = parseHTML('<div></div>').children[0];
        // console.log(element);
        assert.equal(element.children.length, 0);
        assert.equal(element.tagName, 'div');
    });

    it('should parse a single element with text content', function () {
        const element = parseHTML('<div>test</div>').children[0];
        console.log(parseHTML('<div>test</div>'));
        assert.equal(element.children.length, 1);
        assert.equal(element.tagName, 'div');
    });
});