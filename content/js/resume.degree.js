var DegreeViewModel = function() {
	var self = this;

	self.degreeName = ko.observable().extend({
		required: true,
		message: 'Please enter a name for this degree.'
	});
	self.degreeMajor = ko.observable().extend({
		required: true,
		message: 'Please enter a major for this degree.'
	});
	self.degreeYear = ko.observable().extend({
		required: true,
		number: true,
		message: 'Please enter a year for this degree.'
	});
	self.degreeText = ko.computed(function() {
		return self.degreeName() + ' in ' +
			self.degreeMajor() + ', ' +
			self.degreeYear();
	});

	self.school = ko.observable().extend({
		required: true,
		message: 'Please enter the name of this school.'
	});
	self.city = ko.observable().extend({
		required: true,
		message: 'Please enter the city for this school.'
	});
	self.state = ko.observable().extend({
		required: true,
		message: 'Please enter the state for this school.'
	});
	self.schoolText = ko.computed(function() {
		return self.school() + ', ' +
			self.city() + ', ' +
			self.state();
	});
};