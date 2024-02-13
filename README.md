# Online Shopping Application

## Downloading and Installing the Project

To download and run the project, follow these steps:

1.  Clone the project and server:
    git clone https://github.com/emrekazaz-hub/online-shopping-app-full-stack.git
    git clone https://github.com/emrekazaz-hub/online-shopping-server.git

2.  Navigate to the project directory:
    cd online-shopping-server   

3.  Install necessary packages:
    npm install

4.  Run the project:
    npm start


## Project Overview

The project currently serves as a prototype for an online shopping application. Products are stored and listed in an array for demonstration purposes. Users can browse, search, add/remove items to/from their cart, and manage favorites.

User information is stored in a PostgreSQL database via a Node.js server. Express is used for the server, while Knex is employed for database operations. Users can perform actions such as logging in/out, creating new accounts, viewing and updating profile information, and managing card and address details. All these operations are currently managed and stored in the database without security measures.

## Planned Features

* Implement secure authentication and session management using JWT/cookies.
* Integrate Google Maps API for address handling.
* Fetch products from the database and enable special product operations for users with tokens.
* Enhance the user interface, currently in the prototype stage, with scroll animations (GSAP) and improved layout design.