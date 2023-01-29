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
	const pwdInitialField = document.getElementById('pwdInitial');
	const inputStr = pwdInitialField.value;
	const meter = document.querySelector('meter');

	if (/\s/.test(inputStr)) return meter.value = 0;
	if (inputStr.length == 0) return meter.value = 0;
	if (inputStr.length < 8) return meter.value = 2;

	
	const regexPatterns = [/^.{12,}$/, 
											 /[0-9]/,
											 /[a-z]/,
											 /[A-Z]/,
											 /[-!@#$%^&*()_+=<>?,./{}|;':"\[\]\\]/,
	];

	const initValue = 0
	const totalMatches = regexPatterns.reduce(
		(accumulator, pattern) => {
			if (pattern.test(inputStr)) {
				accumulator += 1
			}
			return accumulator
		}, initValue
	);

	switch (totalMatches) {
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
}

// test pattern match

function matchPattern() {
	const pwdInitialField = document.getElementById('pwdInitial');

	const testPattern = /(?=^.{3,}$)/;
	// const testPattern = /abc/;
	
	// test1.textContent = pwdInitialField.match(testPattern);
	// test1.textContent = pwdInitialField.value.match(testPattern);
	test1.textContent = testPattern.test(pwdInitialField.value);
};

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
		// alert(pwdConfirmStr.length)
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

// get rid of global variables below, how?

const pwdConfirmField = document.getElementById('pwdConfirm');
pwdConfirmField.addEventListener('keyup', confirmPwd);

const pwdInitialField = document.getElementById('pwdInitial');
pwdInitialField.addEventListener('keyup', updatePwdMeter);

const pwdToggleBtnNodeList = document.querySelectorAll('.pwdToggle')
pwdToggleBtnNodeList.forEach(elem => {
	elem.addEventListener('click', pwdToggleVisibility)
});
