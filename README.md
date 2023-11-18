# MERN Recipe App

## Overview

This is a full-stack recipe application built with the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features

- **User Authentication**: Secure user authentication system implemented for a personalized experience.
- **Recipe Creation**: Users can create and share their favorite recipes, including details such as ingredients,
  instructions, and images.
- **Recipe Storage**: Save your favorite recipes to access them later conveniently.
- **Recipe Deletion**: Users can remove recipes they no longer need.

## Technology Stack

- **Frontend**:
    - React.js: A JavaScript library for building user interfaces.
    - React Query: A library for managing, caching, and updating server state.
    - Axios: A promise-based HTTP client for making requests to the server.
    - Tailwind CSS: A utility-first CSS framework for rapid UI development.
    - React Router DOM: Enables navigation and routing in the React application.
    - React Hot Toast: A lightweight toast notification library for React.

- **Backend**:
    - Express.js: A minimal and flexible Node.js web application framework.
    - MongoDB: A NoSQL database for storing recipe and user data.
    - Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution.
    - JSON Web Token (jsonwebtoken): Used for creating and verifying web tokens for user authentication.
    - Bcrypt: A library for hashing passwords.

## Installation

1. Clone the repository: `git clone https://github.com/korngsamnang/mern-recipe-app`
2. Install dependencies: `npm install` in both the client and server directories.
3. Set up MongoDB and configure the connection string in the server's `.env` file.
4. Run the development server: `npm run dev` for both the client and server.

Feel free to contribute, report issues, or suggest improvements. Happy cooking!
