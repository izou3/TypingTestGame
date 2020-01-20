# Node.js TypingTestGame
A Typing Test Game 

This is a simple Typing Test Game built on NodeJS where users test their time to type match a certain text. Users can sign up for the leaderboards which connects and queries to a MySQL database from the server. 

## About 
<br />
This is just a sample project that to pratice using Promises as well as the MySQL module. Further improvements could be to use JWT tokens for authentication so users can have individual accounts to track scores as well as separating the front-end and improving the UI. 

### Repository Contents
* `/public` stores all the static files 
* `/server` server files that routes and renders pug files 

## SetUp 
<br /> 
### Pre-requisites
* Node.js
* MySQL Server (8.0) 

### Installation
1. Clone the Repository

2. Install npm dependencies by navigating to the `/TypingSpeedGame` main directory and running the npm command 
```
$ cd /TypingSpeedGame
$ npm install
```

3. Run the npm start command to serve the site locally on `http://localhost:3000`

### MySQL SetUp
1. Will need to setup a MySQL server or use an existing one 

2. Create a database called TypingGame 
```
CREATE DATABASE TypingGame
```

3. Execute the following commands to create the table to be rendered on the app
```USE TypingGame 
CREATE TABLE users(
ID INT NOT NULL AUTO_INCREMENT,
First_Name VARCHAR(20), 
Last_Name VARCHAR(20), 
Email VARCHAR(50), 
High_Score TIME, 
PRIMARY_KEY(ID)
);
```

4. Navigate to `/server/functions/dbCreds.js` and enter the SQL server credentials there 






