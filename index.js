var	cheerio = require('cheerio');

exports = module.exports = Obscura;

function Obscura(options) {
	options = options || {};
}

//Expects filters to be an array, content to be a string
Obscura.filterContent = function(filters, content, mode, cb) {
	mode = mode || "html";
	groups = _.groupBy(filters, 'filterType');
	for (var group in groups) {
		if (this.hasOwnProperty(group)) {
			content = this[group](groups[group], content, mode);
		}
	}
	cb(content);
}

Obscura.censorGroup = function(censorClasses, content) {
	for (var i=0; i<censorClasses.length; i++) {
		censorClass = censorClasses[i];
		$ = cheerio.load(content);
		$('.' + censorClass).remove();
		return $.html();
	}
}

Obscura.replaceString = function(replaceRules, content) {
	
	for (i=0;i<replaceRules.length;i++) {
		rule = replaceRules[i];
		$ = cheerio.load(content);
		
		$('#' + rule.target).text(rule.replacement);
		return $.html();
	}
}


