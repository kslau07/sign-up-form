# sign-up-form

> This project spec is at [Project: Sign-Up Form](https://www.theodinproject.com/lessons/intermediate-html-and-css-sign-up-form)

## Project description

Create a simple sign-up page that has the contains the following fields:

- First name
- Last name
- Email
- Phone number
- Password
- Confirm password

It should also display a large picture on the left-hand side with a logo overlaid.

> The design should look approximately like this:
[Page layout](https://cdn.statically.io/gh/TheOdinProject/curriculum/5f37d43908ef92499e95a9b90fc3cc291a95014c/html_css/project-sign-up-form/sign-up-form.png)

## My goals for this project

Since the purpose of this project is to apply what we've learned about forms, in this project I will try to utilize:

- Field targeting depending on input by user
- Design that follows WCAG 
	* aria-labels for required fields
- Design with better/easier UX in mind
- Various input validation techniques
	* Use of JS, `pattern` for regexp, and html attributes (`minlength`, etc.)

We've learned a lot of CSS lately and I will use this project to practice some of those techniques. The list includes (but is not limited to):

- Use of CSS custom properties and functions:
	* `min()`, `max()`, `clamp()`, `calc()`
- Use of a CSS reset
- Use of more CSS units:
	* `em`, `ch`, `px`, `%`, `vw`, `vh`, `vmin`, `vmax`
- Use of hsla() for color selection
- Use of advanced CSS selectors:
	* `:first-child`, `:first-of-type`, `:nth-of-type`, etc.
	* other pseudo-classes and pseudo-elements
- Use of functions for responsive typography
- Letter spacing (on logo, text content)
- Use of Emmet to speed up repetitive code
- A custom SVG image
- Animating widgets (the button, etc.)

## After project comments

This project was about creating forms, which is pretty straightforward to learn. I wanted to create a better UX by not showing red borders on invalid input fields until after the user started typing, which I achieved using JS. However, later I learned I could've accomplished the same using :placeholder-shown, which may be a better approach. I wanted to implement a password strength meter although the specs didn't call for it. That was also fairly simple to create, utilizing an Array to store each of the regexp patterns to match against. I paid special attention to different resolutions on this one, trying to implement some responsiveness although we haven't quite touch on it in the course. Overall, I am happy with the way the form turned out but there were a few techniques I didn't get to use this time around which I will implement on my next form (tooltips, a mask for the phone number to name two). 
