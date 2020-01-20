var express = require("express"); 
var router = express.Router(); 
const mysql = require("mysql"); 
const bodyParser = require("body-parser"); 
const config = require("../functions/dbCreds.js"); 
const allUser = require("../data/User.js"); 

module.exports = (param) => {

    const { texts } = param; 

    router.use(bodyParser.urlencoded({extended: true}));  

    router.get('/', (req, res) => {
        return res.render("index.pug", {
            page: "Home"
        }); 
    }); 

    router.get('/signup', (req, res) => {
        return res.render("signup.pug", {
            page: "Sign Up", 
            error: false
        }); 
    }); 

    router.post('/signup', async (req, res, next) => {
        var emailV = /\S+@\S+\.\S+/;
        var timeV = /^\(?([0-9]{2})\)?[:]?([0-9]{2})[:]?([0-9]{2})$/;
        const first = req.body.first.trim(); 
        const last = req.body.last.trim(); 
        const email = req.body.email.trim(); 
        const time = req.body.time.trim(); 

        //TODO: check length of strings. Preferably call an error validation function 
        if (!timeV.test(time) || !emailV.test(email) || !first || !last) {
            res.render("signup.pug", {
                page: "Sign Up", 
                error: true, 
                first, 
                last, 
                email, 
                time
            })
        } else {
            let userArr = [first, last, email, time]; 
            let connection = mysql.createConnection(config); 
            await connection.connect((err) => {
                if (err) {
                    next(err); 
                }
                let postUser = new allUser(connection); 

                postUser.postUser(userArr)
                    .then(() => res.redirect("/user"))
                    .catch((err) => {
                        connection.destroy(); 
                        next(err); 
                    }); 
            })
        }
    }); 

    router.get('/user', async (req, res, next) => {
        let connection = mysql.createConnection(config); 
        await connection.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                next(err); 
            }
            let allUsers = new allUser(connection);
            
            allUsers.getAllUsers()
                .then((data) => {
                    res.render("user.pug", {
                        page: "Users", 
                        data
                    }); 
                    console.log(data);
                })
                .then(() => {
                    connection.end((error) => {
                        if(error) {
                            return next(err); 
                        } 
                        console.log("Disconnected"); 
                    }); 
                })
                .catch((err) => {
                    connection.destroy(); 
                    next(err); 
                }); 
        }); 

    }); 

    router.use((err, req, res, next) => {
        res.locals.message = err.message; 
        const status = err.status || 500; 
        res.locals.status = status; 
        res.locals.error = req.app.get("env") === "development"? err: {}; 
        res.status(status); 
        res.render("error"); 
    }); 

    return router; 
}; 

