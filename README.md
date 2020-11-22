# Matches

## Getting Started

These steps will get you a copy of the project up and running for development.

## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Install  **mongoDB** _latest stable version_
4.  Clone the Project
5.  **In Server Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
    
6.  **In client Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
7.  In the **Server/.env** file change the  `DB_HOST`,  `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` and `DB_PORT`  variables to match the credentials of the database you just created. 

8.  In the **Server/.env** file change the  `PORT`  variable to the port that you want server work on.

9. In the **client/.env** file change the  `REACT_APP_BACKEND_URL`  variable to the server URL.

    
## Usage

1. In the **Server** directory, run the following command to launch the Server in development mode:  `npm start`
2. In the **client** directory, run the following command to launch the client:  `npm start`


## Built With

[Nodejs](https://nodejs.org/en/) and [Reactjs](https://reactjs.org/)

