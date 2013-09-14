var assert = require("assert"),
    obscura = require("../index.js"),
    should = require("should");

describe('obscura', function() {
	describe('#censorGroup', function() {
		it('should return foo and not bar', function() {
			var testString = "foo <span class='censor'>bar</span>";
			var censors = ['censor'];
			obscura.censorGroup(censors, testString).should.equal('foo ');
		});
	});
	describe('#replaceString', function() {
		it('should replace bar with baz', function () {
			var testString = "foo <span id='replaceTarget'>bar</span>";
			var replaceRules = [];
			replaceRules[0]  = {target: "replaceTarget", replacement: "baz"};
		
			var content = obscura.replaceString(replaceRules, testString);
			content.should.equal('foo <span id="replaceTarget">baz</span>');
		});
	});
});
