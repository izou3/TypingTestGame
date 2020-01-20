 const mysql = require("mysql"); 

 class User {

    constructor(connection) {
        this.connection = connection; 
    }

    async getAllUsers() {
        let sql = "SELECT * FROM users"; 
        return this.queryDB(sql)
            .then((res) => {
                console.log("returning data"); 
                return res; 
            })
            .catch((err) => {return Promise.reject(err); }); 
    }

    async postUser(values) {
        let sql = "INSERT INTO users(first_name, last_name, email, high_score) VALUES(?,?,?,?)"; 
        return this.queryDB(sql, values)
            .then((res) => console.log("Success"))
            .catch((err) => {
                return Promise.reject(err); 
            }); 
    }

    async queryDB(sql, arr = []) {
        let sqlQuery = mysql.format(sql, arr); 
        let promise = new Promise((resolve, reject) => {
            this.connection.query(sqlQuery, (err, res) => {
                if(err){ 
                    console.log(sqlQuery); 
                    console.log("error with database"); 
                    reject(new Error("Error with the database")); 
                } 
                resolve(res); 
            }); 
        }); 

        return promise 
            .then((res) => {
                return res; 
            })
            .catch((err) => {
                return Promise.reject(err);  
            }); 
    }
 }

 module.exports = User; 