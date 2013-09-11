var 	async = require('async'),
	_ = require('underscore'),
	request = require('request'),
	cheerio = require('lib/cheerio');

exports = module.exports = Obscura;


//Expects filters to be an array, content to be a string
Obscura.filterContent(filters, content, mode, cb) {
	mode = (typeof mode === "undefined") ? "html" : mode;
	groups = _.groupBy(filters, 'filterType');
	for (var group in groups) {
		if (this.hasOwnProperty(group)) {
			content = this[group](groups[group], content, mode);
		}
	}
	cb(content);
}

Obscura.censorGroup(censorClasses, content, mode) {
	for (var censorClass in censorClasses) {
		$ = cheerio.load(content);
		$('.' + censorClass).text('');
	}
}

Obscura.replaceString(replaceRules, content, mode) {
	for (var rule in replaceRules) {
		$ = cheerio.load(content);
		$("#" + rule['target']).text(rule['replacement']);
	}
}


