# BMI Calculator Website using Node.js

## Getting Started

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node root.js`.
4. Access the website at [http://localhost:3000](http://localhost:3000).

## Overview

This project is a BMI (Body Mass Index) Calculator website developed using Node.js. The application allows users to calculate their BMI based on input values such as age, gender, height, and weight. The project includes server-side logic for BMI calculation, validation, and a history feature to store past calculations.

## File Structure

The project has the following folder structure:

- **public:** Contains static files (CSS, images, etc.).
- **routes:** Handles route handling, including `bmiRoutes.js`.
- **views:** HTML templates for rendering pages.
- **data:** JSON files for inputting and outputting history.

## Route Structure

- **/:** Main page that handles GET request and has brief information about the BMI Calculator.
- **/bmiCalculator:** BMI Calculator page that handles both GET and POST methods and has query parameters:
  - `unitType: metric`
  - `unitType: US`
- **/history:** History page that handles GET request and outputs history of BMI calculations.

## HTML Template

The HTML template is well-structured with a responsive design, incorporating Bootstrap for a clean look. It includes a navigation bar for a professional appearance and JavaScript validation for input fields. The footer displays the name and group information.

## Express Server (root.js)

Express.js is used for handling the server, running on port 3000 (`const port = 3000;`). Routes are organized, with the main logic in `bmiRoutes.js`.

## BMI Calculation Logic

The `/` route serves the home page, and the `/bmicalculator` route handles both GET and POST requests. BMI calculation logic is implemented on the server side and not in the HTML file. The BMI result is displayed along with appropriate messages.

## Integration of NPM Packages

Six npm packages related to the project topic are integrated into the root JavaScript file: 
- **body-parser**
- **ejs**
- **express**
- **fs**
- **nodemon**
- **path**

## Enhanced UI

The UI includes input fields for age, gender. A dropdown allows users to select units (US or Metric) for weight and height. The calculated BMI result is displayed with a meaningful interpretation, and the styling enhances visual appeal.

## History

The project includes a history feature that stores past BMI calculations with timestamps. A route is implemented to view the history of BMI calculations.

Feel free to explore and contribute to this BMI Calculator project!
