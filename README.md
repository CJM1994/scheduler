# Interview Scheduler

Interview Scheduler is a single page application (SPA) I built using React in order to learn the framework.  
The application allows you to create/edit/delete appointments on each day of the week based on the interviewers available for that day.  
Data is persisted by the API server using a PostgreSQL database.  
The client application communicates with an API server over HTTP, using the JSON format.  

Jest tests, Storybook and Cypress were used through the development of the project for testing. CircleCi runs tests automatically on deployment and pushes tested code to the production branch  

## App is now deployed with Netlify & Heroku, try it live here!
https://schedulerlhlapp.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/9a0f6783-9140-4b59-9233-e6a0d35fedee/deploy-status)](https://app.netlify.com/sites/schedulerlhlapp/deploys)
(Give Heroku a few seconds to start up the back end)

## Screenshots

### Home Page
!["Fullscreen"](docs/fullscreen.png)

### Adding / Editing Appointments
!["Adding/Editing"](docs/edit⁄create.png)

### Delete Appointments
!["Adding/Editing"](docs/delete.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```
(if running into issues with npm start try using nvm to switch to node v12)

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress End-to-End Tests

```sh
npm run cypress
```

## Future Todos

* Refactor useApplicationData to use a reducer hook for the state - IN PROGRESS
* Deploy application to Heroku - GOAL COMPLETE
