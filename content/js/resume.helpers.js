/* Formatting Functions */
var FormatPhoneNumber = function(number) {
	return String(number).substring(0, 3) + '-' + 
		String(number).substring(3, 6) + '-' + 
		String(number).substring(6, 10);
};