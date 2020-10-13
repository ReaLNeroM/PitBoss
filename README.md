# [PitBoss](https://github.com/realnerom/PitBoss) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/realnerom/PitBoss/blob/master/LICENSE)

[Link to running website](https://realnerom.github.io/PitBoss)

Colleges offer little choice besides picking up food yourself on-campus, even when showing symptoms
for COVID-19. To make the situation safer for students, PitBoss allows volunteers to deliver food
for quarantining students.

To achieve this goal, each student's request is added to a feed of requests, and volunteers offer to
deliver pending requests. To ensure successful delivery, volunteers receive a request's GrubHub
details (student name, which food station, what the order number is), and the requesting student's
location (dormitory and room).

The service is entirely on a volunteer, not-for-profit basis.

## 📚Table of contents

- [Technical stack](#technical-stack)
- [Features](#features)
- [Running](#running)
- [Todo](#todo)
- [Author](#author)
- [License](#license)

## 🛠Technical stack

- Programming language(s): TypeScript, JavaScript, HTML & CSS
- Frameworks/Technologies: React, Bootstrap, NPM, MongoDB

## 🚀Features

- CRUD operations on this domain e.g. create food delivery order
- User accounts, with authentication and authorization.
    - Each API call revealing personal data is required to be authorized.
    - Authentication is done using salted hashing. Each salt is different.
- Single-page React application, resulting in a lightning-fast UI and low server burden.

## ⬇Running

Prerequisite: MongoDB. To check if it's working, run

    mongo

in a terminal.

To run the back-end service, execute in a bash terminal the following:

    cd server
    npm install
    MONGO_URI=localhost/pitboss DEV=dev npm run dev

To run the front-end react application, execute in a bash terminal the following:

    cd client
    npm install
    REACT_APP_API_URL=http://localhost:8443 npm run start


## 📝Todo

- Prevent data leakage from API calls.
- Add support for more request states e.g. Currently Delivering, Delivered, Successful delivery.

## 👨‍💻Author

- [Vladimir Maksimovski](https://github.com/realnerom) <br/>
Bachelor of Science in Computer Science.
University of Rochester '22.

## 📄 License

The PitBoss website code is [MIT licensed](./LICENSE).