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

// Help message for space, value = 0

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

	if (/\s/.test(inputStr)) {
		meter.value = 0;
	} else if (inputStr.length == 0) {
		 meter.value = 0;
	} else if (inputStr.length < 8) {
		 meter.value = 2;
	};

	return meter.value;
}

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
	const numOfMatches = regexPatterns.reduce(
		(accumulator, pattern) => {
			if (pattern.test(inputStr)) {
				accumulator += 1
			}
			return accumulator
		}, initValue
	);

	return numOfMatches
}

function updateEmoji(meterValue) {
	const emoji = document.querySelector('.emoji');

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
			break;
	};
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

	if ( pwdConfirmStr != initialSubStr ) {
		pwdConfirmHelpSpan.textContent = 'Passwords do not match.';
		pwdConfirmHelpSpan.style.color = 'red';
		errorFields.forEach((elem) => {elem.style.outline = '2px solid red';});
	} else if ( pwdConfirmStr == pwdInitialStr ) {
		pwdConfirmHelpSpan.textContent = 'Passwords match!';
		pwdConfirmHelpSpan.style.color = 'green';
	}

	if (pwdConfirmStr == '') {
		// remove help if field empty
		pwdConfirmHelpSpan.textContent = '';
		errorFields.forEach((elem) => {elem.style.outline = '';});
	};
}

// Visibility buttons
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

function listenForEvents() {
	const pwdConfirmField = document.getElementById('pwdConfirm');
	pwdConfirmField.addEventListener('keyup', confirmPwd);
	
	const pwdInitialField = document.getElementById('pwdInitial');
	pwdInitialField.addEventListener('keyup', (e) => {
		const meterValue = updatePwdMeter()
		updateEmoji(meterValue)

	});
	
	const pwdToggleBtnNodeList = document.querySelectorAll('.pwdToggle')
	pwdToggleBtnNodeList.forEach(elem => {
		elem.addEventListener('click', pwdToggleVisibility)
	});
}

listenForEvents()