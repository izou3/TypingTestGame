const path = require("path"); 

module.exports = {
    development: {
        sitename: "Typing Test [Development]", 
        texts: {
            typingtext: path.join(__dirname, "../texts/TypingTexts.json")
        }
    }, 
    production: {
        sitename: "Typing Test", 
        texts: {
            TypingText: path.join(__dirname, "../texts/TypingTexts.json")
        }
    }
}