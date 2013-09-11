var 	async = require('async'),
	_ = require('underscore'),
	request = require('request'),
	cheerio = require('lib/cheerio');

exports = module.exports = Obscura;


//Expects filters to be an array, content to be a string
Obscura.filterContent(filters, content, cb) {
	groups = _.groupBy(filters, 'filterType');
	for (var group in groups) {
		if (this.hasOwnProperty(group)) {
			content = this[group](groups[group], content);
		}
	}
	cb(content);
}

Obscura.censorGroup(censorClasses, content, mode='html') {
	for (var censorClass in censorClasses) {
		$ = cheerio.load(content);
		$('.' + censorClass).text('');
	}
}
