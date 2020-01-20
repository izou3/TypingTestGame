const fs = require("fs"); 
const util = require("util"); 

const readFile = util.promisify(fs.readFile); 

class TextToType {
    
    constructor(fileName) {
        this.dataFile = fileName; 
    }

    async getData() {
        const data = await readFile(this.dataFile, "utf-8"); 
        if (!data) {
            return []; 
        } 
        return JSON.parse(data); 
    }
}

module.exports = TextToType; 