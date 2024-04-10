# Online Shopping Application

## Downloading and Installing the Project

To download and run the project, follow these steps:

1.  Clone the project :
    git clone https://github.com/emrekazaz-hub/online-shopping-app-full-stack.git

2. Clone the server :
    git clone https://github.com/emrekazaz-hub/online-shopping-server.git

3.  Navigate to the project directory:
    cd online-shopping-server   

4.  Install necessary packages:
    npm install

5.  Run the project:
    npm start

### INFORMATION
To run the application correctly, you must first run the server. You also need to have a Google Maps API key to add addresses. 
You can generate the API key from: https://developers.google.com/maps


## Project Overview

The project currently serves as a prototype for an online shopping application. Its aim is to facilitate users to both sell and purchase products. There is an admin panel where sellers can add and sell their products, manage inventory, and view details such as the list of buyers and monthly revenue index.

Users can search for products, apply filters based on their desired categories, browse through shopping carts, add or remove items from their carts, and manage their favorites. Additionally, users can save multiple card and address details in their profiles and proceed to complete their purchases with their selected address and card. Upon completion of the purchase, a receipt containing shipping and shopping information is sent to users via email as a PDF file. Furthermore, Google Maps API is utilized for the address registration process of users.

## Planned Features

* Adding promotional ads to the home page
* Implement secure authentication and session management using JWT/cookies.
* Fetch products from the database and enable special product operations for users with tokens.
* Enhance the user interface, currently in the prototype stage, with scroll animations (GSAP) and improved layout design.