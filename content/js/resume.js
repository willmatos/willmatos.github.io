var ResumeViewModel = function() {
	var self = this;

	self.firstName = ko.observable().extend({
		required: true,
		message: 'Please enter a first name.'
	});
	self.lastName = ko.observable().extend({
		required: true,
		message: 'Please enter a last name.'
	});
	self.name = ko.computed(function() {
		return self.firstName() + ' ' + self.lastName();
	});

	// Address Information
	self.streetAddress1 = ko.observable().extend({
		required: true,
		message: 'Please enter a street address.'
	});
	self.streetAddress2 = ko.observable();
	self.streetAddressText = ko.computed(function() {		
		return (self.streetAddress2()) ? self.streetAddress1() + ' ' + self.streetAddress2() : self.streetAddress1();
	});
	self.city = ko.observable();
	self.state = ko.observable().extend({
		required: true,
		message: 'Please enter a state for your address.'
	});
	self.zip = ko.observable().extend({
		required: true,
		pattern: '^[0-9]{5}$',
		message: 'Please enter your zip code.'
	});
	self.addressText = ko.computed(function (){
		return self.streetAddressText() + ' | ' +
			self.city() + ', ' + self.state() + ' ' + self.zip(); 
	});

	// Contact Information
	self.cellPhoneNumber = ko.observable().extend({
		required: true,
		pattern: '^[0-9]{10}$',
		message: 'Please enter your cell phone number.'
	});
	self.cellPhoneNumberText = ko.computed(function(){
		return FormatPhoneNumber(self.cellPhoneNumber());
	});
	self.cellPhoneNumberLink = ko.computed(function(){
		return 'tel:' + self.cellPhoneNumber();
	})

	self.emailAddress = ko.observable().extend({
		required: true,
		email: true,
		message: 'Please enter your email.'
	});
	self.emailAddressLink = ko.computed(function(){
		return 'mailto:' + self.emailAddress();
	})

	// Education Information
	self.degrees = ko.observableArray(null);//new DegreeViewModel()

	// Skills Information
	self.skills = ko.observableArray(null);

	// Experience Information
	self.jobs = ko.observableArray(null);//new JobViewModel()

	// Load the data
	self.loadData = function(data) {
		if(data) {
			//for JSON string when ajax: ko.mapping.fromJSON(willsResume, self);
			//debugger;
			//ko.mapping.fromJS(data, self);

			//lets map this manually
			if (data.firstName) { self.firstName(data.firstName); }
			if (data.lastName) { self.lastName(data.lastName); }
			if (data.streetAddress1) { self.streetAddress1(data.streetAddress1); }
			if (data.streetAddress2) { self.streetAddress2(data.streetAddress2); }
			if (data.city) { self.city(data.city); }
			if (data.state) { self.state(data.state); }
			if (data.zip) { self.zip(data.zip); }
			if (data.cellPhoneNumber) { self.cellPhoneNumber(data.cellPhoneNumber); }
			if (data.emailAddress) { self.emailAddress(data.emailAddress); }
		
			if (data.degrees.length > 0){
				data.degrees.forEach(function(degree) {
					var dvm = new DegreeViewModel();

					//lets map this manually
					if (degree.degreeName) { dvm.degreeName(degree.degreeName); }
					if (degree.degreeMajor) { dvm.degreeMajor(degree.degreeMajor); }
					if (degree.degreeYear) { dvm.degreeYear(degree.degreeYear); }
					if (degree.school) { dvm.school(degree.school); }
					if (degree.city) { dvm.city(degree.city); }
					if (degree.state) { dvm.state(degree.state); }

					self.degrees.push(dvm);
				});
			}

			if (data.skills.length > 0) {
				data.skills.forEach(function(skill) {
					var svm = new SkillViewModel();

					if (skill.order) { svm.order(skill.order); }
					if (skill.description) { svm.description(skill.description); }

					self.skills.push(svm);
				});
			}

			if (data.jobs.length > 0){
				data.jobs.forEach(function(job) {
					var jvm = new JobViewModel();

					//lets map this manually
					if (job.startYear) { jvm.startYear(job.startYear); }
					if (job.endYear) { jvm.endYear(job.endYear); }
					if (job.company) { jvm.company(job.company); }
					if (job.jobTitle) { jvm.jobTitle(job.jobTitle); }
					if (job.city) { jvm.city(job.city); }
					if (job.state) { jvm.state(job.state); }

					if(job.highlights.length > 0) {
						job.highlights.forEach(function(highlight) {
							var jhvm = new JobHighlightViewModel();

							if(highlight.order) { jhvm.order(highlight.order); }
							if(highlight.note) { jhvm.note(highlight.note); }

							jvm.highlights.push(jhvm);
						});
					}

					self.jobs.push(jvm);
				});
			}
		};
	};
};