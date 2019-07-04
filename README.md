# City of Chicago Employee Dashboard

Created by Christopher Lam

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is usable on all screen sizes through the use of CSS media queries.

Click on the table to focus on a row, and press UP or DOWN on arrow keys to focus onto a roll. Pressing ENTER will into the employee's details.

In employee's details, pressing UP or DOWN shows the previous/next employee.

App is deployed on Heroku here: https://data-theo.herokuapp.com/

- This uses the API endpoint deployed at: https://dt-interviews.appspot.com/
- Dataset: http://catalog.data.gov/dataset/current-employee-names-salaries-and-position-titles-840f7.
- The web server's source code is available at https://bitbucket.org/datatheorem/public-frontend-coding-exercise/ .
- Documentation of the server's API is available at https://dt-interviews.appspot.com/docs .

Libraries/Resources used:

- ReactJS Context API
- Ant Design
- Styled Components
- Reach Router
- Axios
- Google Firebase (for database)
- React-Highlight-Words (to highlight searched words)
- Placeholder images are from: [thispersondoesnotexist.com](https://thispersondoesnotexist.com/)

## Available Scripts

### `yarn`

To install dependencies.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
