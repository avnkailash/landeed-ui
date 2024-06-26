# Landeed UI

This project is created using create-react-app. I have intentionally left out other options like Next.js and Remix to keep it simple. The backend for this app is created using FastAPI in python.

## Prerequisites

1. Ensure you are using the following node and npm versions.
   Node: v19.4.0
   NPM: 9.2.0
2. Ensure the backend instance is up and running to ensure the UI is able to fetch the forms data.

## Installation

1. Clone the repository

```
git clone git@github.com:avnkailash/landeed-ui.git
```

2. Install the dependencies

```
npm install
```

3. Run the app using the following command

```
npm run start
```

4. Visit http://localhost:3000 to view the UI.

## User Interest Form.

While the UI has been created to let the test user select any form from the BE, the default form can be accessed at: http://localhost:3000/form/c0ed5ef2-f5d1-4cca-ac32-07a625c0e5af

Since the DB being used is a sqlite one, the data include the created test records is included in the back end codebase. If this URL does not work for any reason, request you to open the localhost URL and select the User data form.
