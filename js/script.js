'use strict';

function listenForEvents() {
	const inputFields = document.querySelectorAll('input');

	inputFields.forEach(inputField => {
		inputField.addEventListener('keyup', (e) => updateField(inputField));
	});

	const pwdToggleBtnNodeList = document.querySelectorAll('.pwdToggle')
	pwdToggleBtnNodeList.forEach(elem => {
		elem.addEventListener('click', pwdToggleVisibility);
	});

	const btnSbmt = document.querySelector('.btnSubmit');
	btnSbmt.addEventListener('click', submitDialog)
};

listenForEvents()

function updateField(field) {
	const checkmarkSpan = document.querySelector(`#${field.id} ~ .checkmark`);
	const exmarkSpan = document.querySelector(`#${field.id} ~ .exmark`);


	if (field.hasAttribute('required')) {
		return updateRequiredFieldValidity(field, checkmarkSpan, exmarkSpan, isValid(field))
		
	} else {
		return updateOptionalFieldValidity(field, checkmarkSpan, isValid(field));
	};
};

function isValid(field) {
	if (field.id == 'pwdInitial') return isValidPwdInitial(field);
	if (field.id == 'pwdConfirm') return isValidPwdConfirm(field);

	const pattern = {
		email: /\w+@\w+\.\w+/,
		phone: /^\D?(\d{3})\D*(\d{3})\D*(\d{4})$/,
		firstname: /.+/,
		lastname: /.+/,
	}[field.id];
	
	return pattern.test(field.value)
};


function updateOptionalFieldValidity(field, checkmarkSpan, isValid) {
	if (isValid) {
		field.classList.add('customValid');
		field.classList.add('customValidSpan');
		checkmarkSpan.style.visibility = 'visible';
	} else if (field.value.length == 0) {
		field.classList.remove('customValid');
		checkmarkSpan.style.visibility = 'hidden';
	};
};

function updateRequiredFieldValidity(field, checkmarkSpan, exmarkSpan, isValid) {
	
	const pwdConfirmIndeterminate = isPwdConfirmIndeterminate();

	if (field.value == '' || (field.id == 'pwdConfirm' && pwdConfirmIndeterminate)) {
		field.classList.remove('customValid');
		field.classList.remove('customInvalid');
		checkmarkSpan.style.visibility = 'hidden';
		exmarkSpan.style.visibility = 'hidden';
		field.setCustomValidity('Please fill out this field.');
	} else if (isValid) {
		field.classList.add('customValid');
		checkmarkSpan.style.visibility = 'visible';
		field.classList.remove('customInvalid');
		exmarkSpan.style.visibility = 'hidden';
		field.setCustomValidity('');
	} else if (!isValid) {
		field.classList.add('customInvalid');
		exmarkSpan.style.visibility = 'visible';
		field.classList.remove('customValid');
		checkmarkSpan.style.visibility = 'hidden';
		field.setCustomValidity('Please fill out this field.');
	};

	noSpacesHelp()
	confirmHelp()
};

function isPwdConfirmIndeterminate() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const pwdConfirmField = document.getElementById('pwdConfirm');
	const confirmLength = pwdConfirmField.value.length;
	const initialSubStr = pwdInitialField.value.slice(0, confirmLength);

	return (pwdConfirmField.value == initialSubStr && initialSubStr != pwdInitialField.value) ? true : false;
}

function isValidPwdInitial(field) {
	const meterValue = calcPwdMeter();
	updateEmoji(meterValue);
	return meterValue >= 5 ? true : false; 
};

function numOfPatternMatches() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const inputStr = pwdInitialField.value;
	const regexPatterns = [/^.{12,}$/, 
												 /[0-9]/,
												 /[a-z]/,
												 /[A-Z]/,
												 /[-!@#$%^&*()_+=<>?,./{}|;':"\[\]\\]/,
	];
	const initValue = 0;
	const numOfMatches = regexPatterns.reduce((accumulator, pattern) => {
			return pattern.test(inputStr) ? ++accumulator : accumulator;
		}, initValue
	);
	return numOfMatches;
};

function calcPwdMeter() {
	const meter = document.querySelector('meter');
	const numOfMatches = numOfPatternMatches()
	
	switch (numOfMatches) {
		case 0:
			meter.value = 0;
			break;
		case 1:
			meter.value = 2;
			break;
		case 3:
			meter.value = 5;
			break;
		case 4:
			meter.value = 8;
			break;
		case 5:
			meter.value = 10;
			break;
	};

	return meter.value;
};

function noSpacesHelp() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const noSpcHelp = document.querySelector('.noSpacesHelp');
	const inputStr = pwdInitialField.value;
	const meter = document.querySelector('meter');

	noSpcHelp.textContent = '';

	if (/\s/.test(inputStr)) {
		noSpcHelp.textContent = 'No spaces please.';
		meter.value = 0;
	} else if (inputStr.length == 0) {
		 meter.value = 0;
	} else if (inputStr.length < 8) {
		 meter.value = 2;
	};
}

function updateEmoji(meterValue) {
	const emoji = document.getElementById('idEmoji');

	switch (meterValue) {
		case 0:
			emoji.textContent = '😐️';
			break;
		case 2:
			emoji.textContent = '😐️';
			break;
		case 5:
			emoji.textContent = '🤔️';
			break;
		case 8:
			emoji.textContent = '😀️';
			break;
		case 10:
			emoji.textContent = '😎️';
			emoji.classList.add('emoji-spin');
			emoji.classList.remove('emoji-normal');
			break;
	};

	if (meterValue < 10) {
		emoji.classList.add('emoji-normal');
		emoji.classList.remove('emoji-spin');
	};
};

function isValidPwdConfirm(field) {
	const pwdInitialField = document.getElementById('pwdInitial');
	const pwdConfirmField = document.getElementById('pwdConfirm');
	const confirmLength = pwdConfirmField.value.length;
	const initialSubStr = pwdInitialField.value.slice(0, confirmLength);


	if (pwdConfirmField.value != initialSubStr) {
		return false;
	} else if (pwdConfirmField.value == pwdInitialField.value) {
		return true
	};
};

function confirmHelp() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const pwdConfirmField = document.getElementById('pwdConfirm');
	const pwdConfirmHelpSpan = document.querySelector('.pwdConfirmHelp');
	const confirmLength = pwdConfirmField.value.length;
	const initialSubStr = pwdInitialField.value.slice(0, confirmLength);

	if (pwdInitialField.value == '') return;

	if (pwdConfirmField.value != initialSubStr) {
		pwdConfirmHelpSpan.textContent = 'Passwords do not match.';
		pwdConfirmHelpSpan.style.color = 'red';
	} else if (pwdConfirmField.value == pwdInitialField.value ) {
		pwdConfirmHelpSpan.textContent = 'Passwords match!';
		pwdConfirmHelpSpan.style.color = 'green';
	} else {
		pwdConfirmHelpSpan.textContent = '';
	} 
};

function pwdToggleVisibility() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const pwdConfirmField = document.getElementById('pwdConfirm');
	const eyeSlashNodeList = document.querySelectorAll('.eyeSlash');
	const eyeNodeList = document.querySelectorAll('.eye');
	const leftEye = document.querySelector('.eye');

	if (window.getComputedStyle(leftEye).visibility == 'hidden') {
		eyeSlashNodeList.forEach(eyeSlash => {eyeSlash.style.visibility = 'hidden';});
		eyeNodeList.forEach(eye => {eye.style.visibility = 'visible';});
		pwdInitialField.type = 'text';
		pwdConfirmField.type = 'text';
	} else {
		eyeSlashNodeList.forEach(eyeSlash => {eyeSlash.style.visibility = 'visible';});
		eyeNodeList.forEach(eye => {eye.style.visibility = 'hidden';});
		pwdInitialField.type = 'password';
		pwdConfirmField.type = 'password';
	};
};

function submitDialog() {
	if (confirm("Submit form?")) {
		txt = "Form submitted.";
		window.location.reload();
	} else {
		txt = "Submit cancelled";
	}
};
