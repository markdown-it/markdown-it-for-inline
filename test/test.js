'use strict';


var path = require('path');


var markdownit  = require('markdown-it');
var generate    = require('markdown-it-testgen');

var inlineEach  = require('..');

describe('markdown-it-for-inline', function () {
  var md;

  md = markdownit().use(inlineEach, 'text_replace', 'text', function(tokens, idx) {
    tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
  });
  generate(path.join(__dirname, 'fixtures/text.txt'), { header: true }, md);


  md = markdownit({ linkify: true })
          .use(inlineEach, 'link_replace', 'link_open', function(tokens, idx) {
            if ((tokens[idx + 2].type !== 'link_close') ||
                (tokens[idx + 1].type !== 'text')) {
              return;
            }
            tokens[idx + 1].content = tokens[idx + 1].content
                                        .replace(/google/g, 'shmugle')
                                        .replace(/^https?:\/\//, '')
                                        .replace(/^www./, '');
          });
  generate(path.join(__dirname, 'fixtures/link.txt'), { header: true }, md);

});
