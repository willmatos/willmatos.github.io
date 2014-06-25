var JobHighlightViewModel = function() {
	var self = this;

	self.order = ko.observable();
	self.note = ko.observable();
};

var JobViewModel = function() {
	var self = this;

	self.startYear = ko.observable().extend({
		required: true,
		pattern: '^[0-9]{4}$',
		message: 'Please enter your start year.'
	});

	self.endYear = ko.observable().extend({
		pattern: '^[0-9]{4}$',
		message: 'Please enter your end year.'
	});

	self.tenure = ko.computed(function() {
		if(self.endYear() === self.startYear()) {
			return self.endYear();
		}
		else if (!self.endYear()) {
			return self.startYear();
		}
		else {
			return self.startYear() + ' - ' + self.endYear();
		}
	});

	self.company = ko.observable().extend({
		required: true,
		message: 'Please enter your company name.'
	});

	self.jobTitle = ko.observable().extend({
		required: true,
		message: 'Please enter a title.'
	});

	self.city = ko.observable().extend({
		required: true,
		message: 'Please enter the city.'
	});

	self.state = ko.observable().extend({
		required: true,
		message: 'Please enter the state.'
	});

	self.companyInformation = ko.computed(function(){
		return self.company() + ', ' + self.city() + ', ' + self.state();
	});

	self.highlights = ko.observableArray(null);

	//false id for the job
	self.jobId = ko.computed(function() {
		return self.tenure() + '-' + self.jobTitle() + '-' + self.company();
	});
};