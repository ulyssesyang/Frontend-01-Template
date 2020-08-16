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
        // console.log(element);
        assert.equal(element.children.length, 1);
        assert.equal(element.tagName, 'div');
        assert.equal(element.children[0].content, 'test');
    });

    it('should not parse if not tag match', function () {
        try {
            const element = parseHTML('<div>test</em>').children[0];
        } catch (e) {
            // console.log(e)
            assert.equal(e.message, "Tag start end doesn't match");
        }
    });

    it('should handle < content case', function () {
        const element = parseHTML('<div>a < b</div>').children[0];
        // console.log(element);
        assert.equal(element.children.length, 1);
        assert.equal(element.tagName, 'div');
        assert.equal(element.children[0].content, 'a < b');
    });

    it('should handle attribute name', function () {
        const element = parseHTML("<div id=a class='b' data=\"abc\" ></div>").children[0];
        // console.log(element);
        let count = 0;
        for (const attribute of element.attributes) {
            if (attribute.name === 'id') {
                assert.equal(attribute.value, 'a');
                count ++;
            }

            if (attribute.name === 'class') {
                assert.equal(attribute.value, 'b');
                count ++;
            }

            if (attribute.name === 'data') {
                assert.equal(attribute.value, 'abc');
                count ++;
            }
        }

        assert.equal(count, 3);
    });

    it('should handle double quote case', function () {
        const element = parseHTML("<div id=a class='b' data=\"abc\"></div>").children[0];
        // console.log(element);
        let count = 0;
        for (const attribute of element.attributes) {
            if (attribute.name === 'id') {
                assert.equal(attribute.value, 'a');
                count ++;
            }

            if (attribute.name === 'class') {
                assert.equal(attribute.value, 'b');
                count ++;
            }

            if (attribute.name === 'data') {
                assert.equal(attribute.value, 'abc');
                count ++;
            }
        }

        assert.equal(count, 3);
    });

    it('should handle self close case', function () {
        const element = parseHTML("<div id=a />");
        // console.log(element);
    });

    it('should handle script tag case', function () {
        const element = parseHTML(`<script>
            <div>adfa</div>
            /script>
            <script>
            <
            </
            </s
            </sc
            </scr
            </scri
            </scrip
            </script
        </script>`);
        // console.log(element);
    });

    it('should handle style tag case', function () {
        const element = parseHTML(`<style>
        .a {
            color: red
        }
        #id {
            color: red
        }
        div {
            color: blue
        }
        div #id .class {
            color: blue
        }
        </style>
        <div class=a id=b>test</div>
        `);
        // console.log(element);
    });

    it('should handle style empty', function () {
        const element = parseHTML(`<style></style>`);
        // console.log(element);
    });

    it('should handle style attribute case', function () {
        const element = parseHTML("<div id=a style='color:red'><div class=b style='color:blue'></div></div>");
        // console.log(element);
    });

    it('should handle EOF case', function () {
        const element = parseHTML("<div id=1>");
        // console.log(element);
    });

    it('should handle attribute case', function () {
        const element = parseHTML("<div id </div>");
        // console.log(element);
    });

    it('should handle after quoted attribute case', function () {
        const element = parseHTML("<div id=\"d\"</div>");
        // console.log(element);
    });

    it('should handle  unquoted attribute case', function () {
        const element = parseHTML("<div id=/>");
        // console.log(element);
    });
});