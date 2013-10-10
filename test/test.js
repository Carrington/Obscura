var assert = require("assert"),
    obscura = require("../index.js"),
    should = require("should");

describe('obscura', function() {
	describe('#filterContent', function() {
		it('should return foo and flarp, but not bar or baz', function() {
			var testString = "foo <span class='censor'>baz</span> <span id='replaceTarget'>baz</span>";
			var filters = [];
			filters[0] = {filterType: "censorGroup", payload: ['censor']};
			filters[1] = {filterType: "replaceString", payload: {target: "replaceTarget", replacement:"bar"}};
			filters[2] = {filterType: "replaceString", payload: {target: "replaceTarget", replacement:"flarp"}};
			var content = '';
			var testContent = function(err, res) {
				content = res;
			}
			obscura.filterContent(filters, testString, 'html', testContent);
			content.should.equal('foo  <span id="replaceTarget">flarp</span>');
		});
	});
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
			replaceRules  = {target: "replaceTarget", replacement: "baz"};
		
			var content = obscura.replaceString(replaceRules, testString);
			content.should.equal('foo <span id="replaceTarget">baz</span>');
		});
	});
});
