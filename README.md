# QuickNotes App

A clean, responsive, client-side note-taking web application built with vanilla HTML, CSS, and JavaScript.

## Features
- Add notes with custom categories (Personal, Work, Study).
- Real-time input validation with helpful error messages.
- Persistent storage using browser localStorage.
- Live search filtering across all stored notes.
- Dynamic note deletion using modern DOM manipulation and event listeners.

## Local Setup Instructions

To run this project locally on your machine, follow these steps:

1. Clone the repository to your local machine using Git Bash by running:
git clone https://github.com/SandisiweP/quicknotes-app.git

2. Navigate into the project directory by running:
cd quicknotes-app

3. Open the project folder in Visual Studio Code.

4. Open index.html and use the Live Server extension in VS Code to preview the application locally in your browser.

## What I learned

1. DOM API Construction: Learned how to safely construct complex card elements programmatically using document.createElement and textContent instead of relying on innerHTML, completely eliminating potential cross-site scripting security risks.
2. Event Handling: Gained hands-on experience attaching addEventListener directly to dynamically generated elements rather than relying on global scope functions or inline event handlers.
3. Responsive Flexbox Layouts: Mastered designing desktop-first horizontal form layouts using Flexbox and seamlessly adapting them into vertical columns using mobile media queries.