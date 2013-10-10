var	cheerio = require('cheerio');
var	_ = require('underscore');

exports = module.exports = Obscura;

function Obscura(options) {
	options = options || {};
}

//Expects filters to be an array, content to be a string
Obscura.filterContent = function(filters, content, mode, cb) {
	mode = mode || "html";
	if (filters.length == 0)
		cb('', content);
	groups = _.groupBy(filters, 'filterType');

	for (var group in groups) {
		if (this.hasOwnProperty(group)) {
			for (i=0;i<groups[group].length;i++) {
				content = this[group](groups[group][i].payload, content, mode);
			}
		}
	}
	cb('', content);
}

Obscura.censorGroup = function(censorClasses, content) {
	$ = cheerio.load(content);
	for (var i=0; i<censorClasses.length; i++) {
		censorClass = censorClasses[i];
		$('.' + censorClass).remove();
	}
	return $.html();
}

Obscura.replaceString = function(replaceRules, content) {
	$ = cheerio.load(content);
	rule = replaceRules;
	$('#' + rule.target).text(rule.replacement);
	
	return $.html();
}


