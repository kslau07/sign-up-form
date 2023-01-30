'use strict';

// delete me
function testElems() {
	const test1 = document.querySelector('.test1');
	const test2 = document.querySelector('.test2');
	
	const meter = document.querySelector('meter');
	meter.value = 2
}
const testBtn = document.querySelector('#testBtn');
testBtn.addEventListener('click', testElems);

function updatePwdMeter() {
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

	const pwdInitialField = document.getElementById('pwdInitial');
	const inputStr = pwdInitialField.value;
	const noSpcHelp = document.querySelector('.noSpacesHelp');
	noSpcHelp.textContent = '';

	if (/\s/.test(inputStr)) {
		noSpcHelp.textContent = 'No spaces please.';
		meter.value = 0;
	} else if (inputStr.length == 0) {
		 meter.value = 0;
	} else if (inputStr.length < 8) {
		 meter.value = 2;
	};


	return meter.value;
}

function updatePwdValidity(meterValue) {
	const pwdInitialField = document.getElementById('pwdInitial');

	if (meterValue == 0) pwdInitialField.setCustomValidity('')
	
	meterValue < 5 ? pwdInitialField.setCustomValidity('Invalid password.') : pwdInitialField.setCustomValidity('');

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
	const initValue = 0
	const numOfMatches = regexPatterns.reduce((accumulator, pattern) => {
			return pattern.test(inputStr) ? ++accumulator : accumulator;
		}, initValue
	);
	return numOfMatches
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
			emoji.classList.add('emoji-spin')
			emoji.classList.remove('emoji-normal')
			break;
	};

	if (meterValue < 10) {
		emoji.classList.add('emoji-normal')
		emoji.classList.remove('emoji-spin')
	}
}

function confirmPwd() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const pwdConfirmField = document.getElementById('pwdConfirm');
	const pwdConfirmHelpSpan = document.querySelector('.pwdConfirmHelp');
	const errorFields = document.querySelectorAll('.error');
	const pwdInitialStr = pwdInitialField.value
	const pwdConfirmStr = pwdConfirmField.value
	const confirmLength = pwdConfirmStr.length
	const initialSubStr = pwdInitialStr.slice(0, confirmLength)

	// Set custom validity when confirm-pwd doesn't match pwd

	// pwdInitialField.setCustomValidity('Invalid password.')

	if ( pwdConfirmStr != initialSubStr ) {
		pwdConfirmHelpSpan.textContent = 'Passwords do not match.';
	  pwdConfirmField.setCustomValidity('Passwords do not match.')
		pwdConfirmHelpSpan.style.color = 'red';
		// errorFields.forEach((elem) => {elem.style.outline = '2px solid red';});
	} else if ( pwdConfirmStr == pwdInitialStr ) {
		pwdConfirmHelpSpan.textContent = 'Passwords match!';
	  pwdConfirmField.setCustomValidity('')
		pwdConfirmHelpSpan.style.color = 'green';
	}

	if (pwdConfirmStr == '') {
		// remove help if field empty
		pwdConfirmHelpSpan.textContent = '';
		errorFields.forEach((elem) => {elem.style.outline = '';});
	};
}

function pwdToggleVisibility() {
	const pwdInitialField = document.getElementById('pwdInitial');
	const pwdConfirmField = document.getElementById('pwdConfirm');
	const eyeSlashNodeList = document.querySelectorAll('.eyeSlash')
	const eyeNodeList = document.querySelectorAll('.eye')
	const leftEye = document.querySelector('.eye')

	if (window.getComputedStyle(leftEye).visibility == 'hidden') {
		eyeSlashNodeList.forEach(eyeSlash => {eyeSlash.style.visibility = 'hidden';});
		eyeNodeList.forEach(eye => {eye.style.visibility = 'visible';});
		pwdInitialField.type = 'text'
		pwdConfirmField.type = 'text'
	} else {
		eyeSlashNodeList.forEach(eyeSlash => {eyeSlash.style.visibility = 'visible';});
		eyeNodeList.forEach(eye => {eye.style.visibility = 'hidden';});
		pwdInitialField.type = 'password'
		pwdConfirmField.type = 'password'
	};
};

// Add green border and green checkmark if length of "first name" is > 0
function markFieldValidity(field) {
	const checkmarkSpan = document.querySelector(`#${field.id} ~ .checkmark`);
	const exmarkSpan = document.querySelector(`#${field.id} ~ .exmark`);
	const emailPattern = /\w+@\w+\.\w+/


	if (field.id.includes("name")) return validateName(field, checkmarkSpan);
	if (field.id == 'email') return validateEmail(field, checkmarkSpan, exmarkSpan, emailPattern);
	if (field.id == 'phone') return validatePhone(field, checkmarkSpan, exmarkSpan);
};

function validateEmail(field, checkmarkSpan, exmarkSpan, emailPattern) {
	if (field.value == '') {
		field.classList.remove('customValid')
		field.classList.remove('customInvalid')
		checkmarkSpan.style.visibility = 'hidden';
		exmarkSpan.style.visibility = 'hidden';
	} else if (emailPattern.test(field.value)) {
		field.classList.remove('customInvalid')
		field.classList.add('customValid')
		// field.classList.add('customValidSpan')
		checkmarkSpan.style.visibility = 'visible';
		exmarkSpan.style.visibility = 'hidden';
	} else if (!emailPattern.test(field.value)) {
		field.classList.remove('customValid')
		field.classList.add('customInvalid')
		checkmarkSpan.style.visibility = 'hidden';
		exmarkSpan.style.visibility = 'visible';
	};
};

function validatePhone(field, checkmarkSpan, exmarkSpan) {
	// alert(1)
};

function validateName(field, checkmarkSpan) {
	// const checkmarkSpan = document.querySelector(`#${field.id} ~ .checkmark`);

	if (field.value.length > 0) {
		field.classList.add('customValid')
		field.classList.add('customValidSpan')
		checkmarkSpan.style.visibility = 'visible';
	} else if (field.value.length == 0) {
		field.classList.remove('customValid')
		checkmarkSpan.style.visibility = 'hidden';
	};
};


// select all inputs instead of using them individually 

function listenForEvents() {
	const inputFields = document.querySelectorAll('input')

	inputFields.forEach(inputField => {
		inputField.addEventListener('keyup', (e) => markFieldValidity(inputField))
	});


	const pwdConfirmField = document.getElementById('pwdConfirm');
	pwdConfirmField.addEventListener('keyup', confirmPwd);
	
	const pwdInitialField = document.getElementById('pwdInitial');
	pwdInitialField.addEventListener('keyup', (e) => {
		const meterValue = updatePwdMeter();
		updatePwdValidity(meterValue);
		updateEmoji(meterValue);
	});
	
	const pwdToggleBtnNodeList = document.querySelectorAll('.pwdToggle')
	pwdToggleBtnNodeList.forEach(elem => {
		elem.addEventListener('click', pwdToggleVisibility)
	});
}

listenForEvents()
