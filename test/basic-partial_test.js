var expect = require('chai').expect;
var reverseMustacheUtils = require('./utils/reverse-mustache');

describe('A mustache template with a partial token', function () {
  describe('when reversed', function () {
    reverseMustacheUtils.save({
      template: 'hello {{> place}}',
      content: 'hello moon',
      partials: {
        place: 'moon'
      }
    });

    it('returns meta information', function () {
      expect(this.result).to.not.equal(null);
      expect(this.result).to.be.an('object');
    });
  });

  describe('when reversed with a variable', function () {
    reverseMustacheUtils.save({
      template: 'hello {{> place}}',
      content: 'hello moon',
      partials: {
        place: '{{place}}'
      }
    });

    it.only('returns meta information', function () {
      expect(this.result).to.not.equal(null);
      expect(this.result).to.deep.equal({place: 'moon'});
    });
  });

  describe('when reversed in a loop and inner variable', function () {
    reverseMustacheUtils.save({
      template: 'hello {{#place}}{{> name}}{{/place}}',
      content: 'hello moon',
      partials: {
        place: '{{name}}'
      }
    });

    it('returns meta information', function () {
      expect(this.result).to.not.equal(null);
      expect(this.result).to.deep.equal({place: {name: 'moon'}});
    });
  });
});
