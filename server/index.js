const express = require("express"); 
const path = require("path"); 
const routes = require("./routes/index");
const createError = require("http-errors");  
const configs = require("./config/index.js"); 
const texts = require("./data/TextToType.js"); 
const PORT = 3000; 

const app = express();

const config = configs[app.get("env")]; //sets the environment 
app.locals.title = config.sitename; 
const TypingText = new texts(config.texts.typingtext);

app.set("view engine", "pug"); 
app.set("views", path.join(__dirname, "./views")); //pug files are in views dir

app.use(express.static("public")); //relative to application root 

app.locals.title = config.sitename; 
app.use("/", routes(TypingText)); 

//Error Handling
app.use((req, res, next) => {
    return next(createError(404, "File Not Found")); 
}); 

app.use((err, req, res, next) => {
    res.locals.message = err.message; 
    const status = err.status || 500; 
    res.locals.status = status; 
    res.locals.error = req.app.get("env") === "development"? err: {}; 
    res.status(status); 
    res.render("error"); 
}); 

app.listen(PORT, () => {
    console.log(`Starting Server on ${PORT}`); 
}); 
module.exports = app; 