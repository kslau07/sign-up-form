'use strict';

// delete me

function testRegexp() {
	// const regexPatterns = [/(?=^.{8,}$)/, 
	// 											 /(?=(.*[0-9]))/,
	// 											 /(?=(.*[a-z]))/,
	// 											 /(?=(.*[A-Z]))/,
	// 											 /(?=(.*[-!@#$%^&*()_+=<>?,./{}|;':"\[\]\\]))/,
	// 											 /\s/
	// ];
	
	const pwdPatterns = [/^.{8,}$/, 
												 /[0-9]/,
												 /[a-z]/,
												 /[A-Z]/,
												 /[-!@#$%^&*()_+=<>?,./{}|;':"\[\]\\]/,
												 /\s/
	];

	exampleStr = '888888-'
	
	const initialValue = 0
	const pwdPatternMatchCount = pwdPatterns.reduce(
		(accumulator, currentPattern) => { 
			return (currentPattern.test(exampleStr) ? ++accumulator : accumulator )
		}, initialValue
	);
	console.log(pwdPatternMatchCount);
};
// testRegexp()

