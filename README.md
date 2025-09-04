# MERN Recipe App

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
-   [Deployment](#deployment) (very interesting)
-   [Docker Deployment](#docker-deployment) (new)

## Overview

This is a full-stack recipe application built with the MERN (MongoDB, Express.js, React, Node.js) stack.

> A full-stack recipe app built with the MERN stack.
> ![](https://github.com/korngsamnang/mern-recipe-app/assets/99709883/3bb17d35-4fac-48b9-b901-78bdbe514bc9)

## Features

-   **User Authentication**: User authentication system implemented using JWT mechanism.
-   **Recipe Creation**: Users can create and share their favorite recipes, including details such as ingredients,
    instructions, and images.
-   **Recipe Storage**: Save your favorite recipes to access them later conveniently.
-   **Recipe Deletion**: Users can remove recipes they no longer need.

## Technologies Used

-   **Frontend**:

    -   [React.js]: A JavaScript library for building user interfaces.
    -   [React Query]: A library for managing, caching, and updating server state.
    -   [Axios]: A promise-based HTTP client for making requests to the server.
    -   [Tailwind CSS]: A utility-first CSS framework for rapid UI development.
    -   [React Router DOM]: Enables navigation and routing in the React application.
    -   [React Hot Toast]: A lightweight toast notification library for React.

-   **Backend**:
    -   [Express.js]: A minimal and flexible Node.js web application framework.
    -   [MongoDB]: A NoSQL database for storing recipe and user data.
    -   [Mongoose]: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution.
    -   [JSON Web Token (jsonwebtoken)]: Used for creating and verifying web tokens for user authentication.
    -   [Bcrypt]: A library for hashing passwords.

## Getting Started

1. Clone the repository: `git clone https://github.com/korngsamnang/mern-recipe-app`
2. Install dependencies: `npm install` in both the client and server directories.
3. Set up MongoDB and configure the connection string in the server's `.env` file.
4. Run the development server: `npm run dev` for both the client and server.

## Deployment

For this project, I deployed the backend and frontend separately to different cloud service platforms by just using this
single repository.

-   For the backend, I used [Heroku](https://www.heroku.com/) to deploy the server.
-   For the frontend, I used [Netlify](https://www.netlify.com/) to deploy the client.

The problem was authentication. I used [JWT](https://jwt.io/) (json web token) to implement authentication. So the token
needs to be
sent
from the server to the client, and the client needs to be sent back to the server. So instead of using an authorization
header or local storage for storing cookies, I use
an [HTTP-only cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). The cookie is always sent through an
HTTP
connection automatically.

It's perfectly fine if we have the backend and frontend on the same domain, but if not, it's very hard to configure it
to send cookies from one to another because the HTTP-only cookie design is very secure to
prevent [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting).

However, it is possible to do that by doing some configuration in both the backend and frontend.

### Steps 1: Configure the backend

We need to properly set up cors along with `credentials` set to `true`.

```javascript
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
```

### Steps 2: Configure the frontend

I use Axios, so along with baseURL, we need to add `withCredentials: true`.

```javascript
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});
```

### Steps 3: Configure cookie settings

When sending a cookie from the backend to the frontend, we have to specify options like this:

```javascript
res.cookie("jwt", token, {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    withCredentials: true,
    sameSite: "None",
    httpOnly: true,
    secure: true,
});
```

Check out the documentation to learn more about these options.

-   [sameSite: "None"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
-   [httpOnly: true](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)
-   [secure: true](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)

That's it.

Feel free to contribute, report issues, or suggest improvements. Happy cooking!

[React.js]: https://react.dev/
[React Query]: https://tanstack.com/query/latest/
[Axios]: https://axios-http.com/docs/intro/
[Tailwind CSS]: https://tailwindcss.com//
[React Router DOM]: https://reactrouter.com/en/main/
[React Hot Toast]: https://react-hot-toast.com//
[Express.js]: https://expressjs.com//
[MongoDB]: https://www.mongodb.com//
[Mongoose]: https://mongoosejs.com//
[JSON Web Token (jsonwebtoken)]: https://jwt.io//
[Bcrypt]: https://www.npmjs.com/package/bcrypt/

## Docker Deployment

Checkout to the branch: [feature/docker](https://github.com/korngsamnang/mern-recipe-app/tree/feature/docker)
